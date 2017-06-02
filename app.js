const express = require('express');
const AWS = require('aws-sdk');
const fs = require('fs');
const app = express();

// Params
var bucketParams = {
    Bucket: 'GeorgeBucket545'
};

var bucketPath = 'GeorgeBucket545';
var s3Options = {
    region: 'us-east-1',
    accessKeyId: "AKIAI6A5DBVWOENKNQ6Q",
    secretAccessKey:"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"
};
var uploadParams = {Bucket: 'GeorgeBucket545', Key: '', Body: ''};


// AWS Configuration
AWS.config.loadFromPath('./config.json');
var s3 = new AWS.S3({apiVersion:'2006-03-01'});


// Requests
app.get('/createBucket', function(req, res){
    s3.createBucket(bucketParams, function(err, data){
        if(err){
            console.log("Error: ", err);
            return res.status(500).json(err);
        }else{
            return res.status(200).json(data);
        }
    });
});

app.get('/listAllBuckets', function (req, res) {    
    s3.listBuckets(function(err, data){
        if(err){
            console.log("Error: ", err);
            return res.status(500).json(err);
        }else{
            return res.status(200).json(data);
        }
    });
});

app.get('/uploadFile', function (req, res) {    
    var S3FS = require('s3fs');
    var fsImpl = new S3FS(bucketPath, s3Options);
    
    fsImpl.writeFile('message.txt', 'Ramon listens to the song Need you now', {flag:'a'}).then(function() {
        console.log('It\'s saved!');
        res.send("It\'s saved!");
    }, function(reason) {
        throw reason;
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});