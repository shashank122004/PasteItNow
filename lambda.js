const serverless = require("serverless-http");
const app = require("./app");

module.exports.handler = async (event, context) => {
  console.log("Lambda file loaded");
  console.log("EVENT:", JSON.stringify(event, null, 2));
  const handler = serverless(app);
  return handler(event, context);
};