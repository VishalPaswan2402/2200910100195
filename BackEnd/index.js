import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import urlShort from './Model/urlSchema.js';

const app = express();
app.use(express.json());
const port = 3000;

const corsOption = {
    origin: "http://localhost:5173",
    credentials: true
}

app.use(cors(corsOption));

const db_url = "mongodb://127.0.0.1:27017/shortUrl";

mongoose.connect(db_url)
    .then(() => console.log("Connected to shortUrl DB!"))
    .catch(err => console.log("Mongoose Error", err));

app.post("/shortUrl", async (req, res) => {
    const { ...data } = req.body;
    console.log(data.url);
    console.log("Reach");
    try {
        if (!data.url) {
            return res.status(500).json({
                success: false,
                message: "Please Enter Url"
            });
        }
        const randomValue = "shortedUrl" + Math.floor((Math.random() * 100) + 1);
        // console.log(randomValue);
        // console.log(`http://localhost:5173/${randomValue}`);
        const newUrl = new urlShort({
            originalUrl: data.url,
            shortUrl: `http://localhost:5173/${randomValue}`,
        })
        await newUrl.save();
        return res.status(200).json({
            success: true,
            savedUrl,
            message: "Url added successfully"

        });
    }
    catch (e) {
        console.log("Error");
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
})

app.get('/allUrl', async (req, res) => {
    try {
        const savedUrl = await urlShort.find();
        console.log(savedUrl);
        return res.status(200).json({
            success: true,
            savedUrl,
            message: "All urls"

        });
    }
    catch (e) {
        console.log("Error");
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
})

app.get("/", (req, res) => {
    res.send("URL Shortner");
})

app.listen(port, () => {
    console.log("Server is running on port :", port);
})