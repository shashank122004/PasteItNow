const {PutCommand,GetCommand} = require("@aws-sdk/lib-dynamodb");
const ddbDocClient = require('../db.js');

const uploadText = async (req , res)=>{
    try{
        const{pasteId,content} = req.body;
        const checkExistingPasteId = await ddbDocClient.send(new GetCommand({
            TableName: "pasteItNow_text",
            Key: {
                pasteId: pasteId
            }       
        }))
        if(checkExistingPasteId.Item){
            return res.status(409).json({
                message: "Paste ID already exists. Please enter a different one.",
                status: "already_exists"
            })
        }
        const params = {
            TableName: process.env.TABLE_NAME,
            Item: {
                pasteId: pasteId,
                content: content
            }
        }
        await ddbDocClient.send(new PutCommand(params));
        return res.status(200).json({
            message: "Text uploaded successfully",
            status: "success",
        })
    }
    catch(error){
        console.log("Error uploading text:", error);
        return res.status(500).json({
            message: "Error uploading text",
            status: "error",
            error: error.message
        })
    }
}

const getText = async(req,res)=>{
    try{
        const {pasteId} =req.params;
        const result = await ddbDocClient.send(new GetCommand({
            TableName: process.env.TABLE_NAME,
            Key:{
                pasteId: pasteId
            }
        }))
        if(!result.Item){
            return res.status(404).json({
                message: "INVALID PASTE ID",
                status: "not_found"
            })
        }
        return res.status(200).json({
            message: "Text retrieved successfully",
            status: "success",
            content: result.Item.content
        })
    }
    catch(error){
        console.log("Error retrieving text:", error);
        return res.status(500).json({
            message: "Error retrieving text",
            status: "error",
            error: error.message
        })
    }
}
module.exports = {
    uploadText,
    getText
}