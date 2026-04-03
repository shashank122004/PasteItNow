const express = require('express');
const router = require('./routes/textShare.route');
const app = express();
const cors = require('cors');
const FileRouter = require('./routes/fileShare.route');

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log("Express received:", req.method, req.path);
    next();
});

app.get("/default/", (req,res)=>{
    console.log("inside the root");
    
    res.json({
        message: 'Welcome to PasteItNow backend',
        status: 'Server is running',
        version: '1.0.0'
    });
});

app.use("/default/text", router);
app.use("/default/file", require('./routes/fileShare.route'));

module.exports = app;