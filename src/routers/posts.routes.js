require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");
const postController = require("../controllers/posts.controller");

const fileStorage = new GridFsStorage({
    url : process.env.DB_URL+process.env.DB_NAME,
    file : (req, file) => {
        return {
            bucketName : process.env.DB_COLLECTION,
            filename : `${Date.now()}_${file.originalname}`
        }
    }
});


const fileUpload = multer({
    storage : fileStorage
});

router.post("/post", fileUpload.single("image"), postController.post);

router.get("/posts", postController.get);

//Preview and See Image
router.get("/image/:name", postController.load)

module.exports = router;