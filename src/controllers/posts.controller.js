require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const client = new MongoClient(process.env.DB_URL);
const Posts = require("../models/posts");

let exportRoutes = {};

exportRoutes.post = async function(req,res){
    try
    {
        let post = await new Posts({
            ...req.body,
            image : `image/${req.file.filename}`
        })
        post = await post.save();
        res.status(200).json({status:"Success", message : "Successfully posted", result : post});
    }
    catch(err)
    {
        res.status(400).json({status: "failed", message : err.message})
    }
};

exportRoutes.get = async function(req,res){
    try{
        let posts = await Posts.find();
        res.status(200).json({status:"Success", result : posts});
    }
    catch(err)
    {
        res.status(400).json({status:"failed", message : err.message});
    }
};

exportRoutes.load = async function(req, res){
    try{
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const collection = new GridFSBucket(db, {
            bucketName : process.env.DB_COLLECTION
        });
        const loadImage = collection.openDownloadStreamByName(req.params.name);
        loadImage.on("data", data => res.status(200).write(data));
        loadImage.on("error", (err) => {
            res.status(400).send({status:"failed to load", message: err.message});
        });
        loadImage.on("end", () => {
            res.end();
        });
    }
    catch(err)
    {
        res.status(500).send({status:"Server Error", message : err.message});
    }
};

module.exports = exportRoutes;