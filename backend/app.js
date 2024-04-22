import { MongoClient, ServerApiVersion } from "mongodb";
import { v4 as uuid } from "uuid";

import bodyParser from "body-parser";
import express from "express";
import multer, { memoryStorage } from "multer";
import { uploadToS3 } from "./s3.js";

const app = express();

app.use(express.static("images"));
app.use(bodyParser.json());

const storage = memoryStorage();
const upload = multer({ storage });

const uri =
  "mongodb+srv://kiran:zEcBbdWQgxxaV6Ha@react-learning-cluster.lh9glqy.mongodb.net?retryWrites=true&w=majority&appName=React-learning-cluster";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.post("/result/save", upload.single("image"), async (req, res) => {
  try {
    let imageUrlList = req.body.imageUrls ? req.body.imageUrls.split(",") : [];
    let documentToSave = {
      prompt: req.body.prompt,
      result: req.body.result,
      time: req.body.time,
      imageUrls: imageUrlList,
    };

    //Saving to mongo db
    console.log("Connecting mongo db" + client);
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to mongo db" + client);

    const dbName = "pgd-react-apps";
    const collectionName = "searches";
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    try {
      await collection.insertOne(documentToSave);
      console.log("document successfully inserted");
    } catch (err) {
      console.error(
        `Something went wrong trying to insert the new documents: ${err}\n`
      );
    }
  } finally {
    await client.close();
  }

  return res
    .status(200)
    .json({ message: "Search document saved successfully" });
});

app.post("/upload", upload.single("image"), async (req, res) => {
  let imageUrl;
  const { file } = req;
  if (file) {
    var fileTypeSplitArray = file.mimetype.split("/");
    const type = fileTypeSplitArray[fileTypeSplitArray.length - 1];
    const key = uuid() + "." + type;
    imageUrl = createS3Url(key);

    console.log("Uploading image");
    uploadToS3(file, key);
    console.log("Uploaded to url" + imageUrl);
  }
  return res.status(200).json({ imageUrl: imageUrl });
});

app.get("/results", upload.single("image"), async (req, res) => {
  await client.connect();
  await client.db("admin").command({ ping: 1 });

  const dbName = "pgd-react-apps";
  const collectionName = "searches";
  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  let response;
  try {
    response = await collection.find({}).toArray(function (err, result) {
      if (err) throw err;
      console.log("documents fetched successfully");
    });
  } catch (err) {
    console.error(
      `Something went wrong trying to insert the new documents: ${err}\n`
    );
  } finally {
    await client.close();
  }
  res.status(200).json({ searches: response });
});

function createS3Url(key) {
  const BUCKET = "pgd-react-app";
  return "https://" + BUCKET + ".s3.amazonaws.com/" + key;
}

app.listen(3000);
