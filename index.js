const express = require('express');
const router = require('./routes/textShare.route');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{

    res.json({
        message: 'Welcome to PasteItNow backend',
        status: 'Server is running',
        version: '1.0.0'
    });
});

app.use("/text", router);

app.listen(process.env.PORT || 8000 , ()=>{
    console.log("PasteItNow server running on port 8000");
});