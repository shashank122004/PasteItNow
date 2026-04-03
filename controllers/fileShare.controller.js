const {S3Client, PutObjectCommand, GetObjectCommand} =require("@aws-sdk/client-s3");
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner"); 
const ddbDocClient = require('../db.js');
const {PutCommand} = require("@aws-sdk/lib-dynamodb");

const s3Client= new S3Client(
    {
        region: "ap-south-1"
    }
)

const PutObjectUrl = async (req, res) => {
    try {
        const { fileKey, contentType, originalFileName } = req.body;

        if (!fileKey) {
            return res.status(400).json({
                message: "fileKey is required",
                status: "error"
            });
        }

        const finalKey = `${fileKey}`;

        const command = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: finalKey,
            ContentType: contentType || "application/octet-stream"
        });

        const presignedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 3600
        });

        const metadata = {
            fileKey: finalKey,
            originalFileName: originalFileName || fileKey,
            contentType: contentType || "application/octet-stream",
            uploadTime: new Date().toISOString()
        };

        await ddbDocClient.send(
            new PutCommand({
                TableName: process.env.FILE_TABLE_NAME,
                Item: metadata
            })
        );

        return res.status(200).json({
            message: "Presigned URL generated successfully",
            status: "success",
            presignedUrl,
            fileKey: finalKey
        });
    } catch (error) {
        console.log("Error generating presigned URL:", error);
        return res.status(500).json({
            message: "Error generating presigned URL",
            status: "error",
            error: error.message
        });
    }
};

const getObjectUrl = async (req, res) => {
    try {
        const { fileKey } = req.params;

        const command = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: fileKey
        });

        const presignedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 3600
        });

        return res.status(200).json({
            message: "Download URL generated successfully",
            status: "success",
            url: presignedUrl
        });
    } catch (error) {
        console.log("Error generating presigned URL:", error);
        return res.status(500).json({
            message: "Error generating presigned URL",
            status: "error",
            error: error.message
        });
    }
};

module.exports = {
    PutObjectUrl,
    getObjectUrl
};