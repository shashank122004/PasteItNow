const {DynamoDBClient} = require("@aws-sdk/client-dynamodb") 
const {DynamoDBDocumentClient} = require("@aws-sdk/lib-dynamodb")
const dotenv = require('dotenv');
dotenv.config();

const client = new DynamoDBClient({
    region: 'ap-south-1'
});

const ddbDocClient = DynamoDBDocumentClient.from(client);

module.exports = ddbDocClient;