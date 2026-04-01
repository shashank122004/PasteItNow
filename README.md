📌 PasteItNow

A simple Pastebin / JustPasteIt-style web app built using:

⚛️ Frontend: HTML, CSS, JavaScript (deployed on Vercel)

🚀 Backend: Express.js → AWS Lambda

🗄️ Database: AWS DynamoDB

✨ Features (Phase 1)

📝 Upload text with custom Paste ID

🔍 Retrieve text using Paste ID

🌙 Dark mode support

⚡ Fast serverless backend using AWS Lambda

🔐 Unique paste ID validation

🏗️ Architecture
Frontend (Vercel)
        ↓
API Gateway (HTTP API)
        ↓
AWS Lambda (Express wrapped using serverless-http)
        ↓
DynamoDB (NoSQL storage)
📂 Project Structure
backend/
│
├── app.js                # Express app
├── server.js             # Local development server
├── lambda.js             # Lambda handler
├── db.js                 # DynamoDB config
│
├── routes/
│   └── textShare.route.js
│
├── controllers/
│   └── textShare.controller.js
│
└── package.json

frontend/
└── index.html
⚙️ Setup Instructions
🔹 1. Clone Repository
git clone https://github.com/your-username/pasteitnow.git
cd pasteitnow
🔹 2. Backend Setup
cd backend
npm install
🔹 3. Configure AWS
aws configure

Enter:

AWS Access Key

AWS Secret Key

Region: ap-south-1

🔹 4. Environment Variables

Create .env:

AWS_REGION=ap-south-1
TABLE_NAME=pasteItNow_text
🔹 5. Run Locally
node server.js

Server runs on:

http://localhost:8000
📡 API Endpoints
➕ Upload Text
POST /text/upload-text
Body:
{
  "pasteId": "test123",
  "content": "Hello World"
}
📥 Get Text
GET /text/get-text/:pasteId
Example:
/text/get-text/test123
☁️ Deployment
🚀 Backend (AWS Lambda)

Install dependency:

npm install serverless-http

Create lambda.js:

const serverless = require("serverless-http");
const app = require("./app");

module.exports.handler = serverless(app);

Zip and upload to AWS Lambda

Attach API Gateway (HTTP API)

Enable CORS

🌐 Frontend (Vercel)

Push frontend to GitHub

Import project in Vercel

Set environment variable:

VITE_API_BASE_URL=https://your-api-url
🗄️ DynamoDB Schema
Table Name:
pasteItNow_text
Primary Key:
pasteId (String)
Example Item:
{
  "pasteId": "abc123",
  "content": "Hello world",
  "createdAt": 1711970000
}
🚧 Future Improvements (Phase 2)

📂 File upload using S3

⏳ Expiry (TTL)

🔐 Password-protected pastes

📊 Analytics (views count)

🔗 Shareable links

🎨 Syntax highlighting

💡 Learnings

Express → Lambda conversion

DynamoDB CRUD operations

Serverless architecture design

API design (REST vs query params)

Frontend + backend integration

👨‍💻 Author

Shashank Singh
📌 Engineering Student | Full Stack Developer

⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!