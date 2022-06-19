import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
const app = express();
dotenv.config();
const PORT = process.env.PORT;

const mobiles = [
  {
    model: "OnePlus 9 5G",
    img: "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
    company: "Oneplus",
  },
  {
    model: "Iphone 13 mini",
    img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
    company: "Apple",
  },
  {
    model: "Samsung s21 ultra",
    img: "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
    company: "Samsung",
  },
  {
    model: "xiaomi mi 11",
    img: "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
    company: "xiaomi",
  },
];
app.use(cors());
app.use(express.json());
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongdb is Connected ✌😊");
  return client;
}

const client = await createConnection();

app.get("/", function (req, res) {
  res.send("Hello World 🤡🥳🌍");
});

//  /mobiles

app.get("/mobiles", async function (req, res) {
  //db.mobiles.find({})
  const mobiles = await client
    .db("ecommerce")
    .collection("mobiles")
    .find({})
    .toArray();
  res.send(mobiles);
});
app.post("/mobiles", async function (req, res) {
  const data = req.body;
  console.log(data);
  //db.mobiles.insertMany(data)
  const result = await client
    .db("ecommerce")
    .collection("mobiles")
    .insertMany(data);
  res.send(result);
});

app.listen(PORT, () => console.log("App listening on port " + PORT));
