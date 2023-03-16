const express = require("express");
const app = express();
const fs = require("fs");
const port = 5003;
const axios = require("axios");
const NodeRSA = require("node-rsa");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello this is assignment 3");
});

const robURL = "http://44.202.179.158:8080/start";

function task() {
  axios({
    method: "post",
    url: robURL,
    data: {
      banner: "B00917946",
      ip: "34.201.161.218:5003",
    },
  }).then(function (res) {
    console.log(res.data);
  });
}

task();

app.post("/decrypt", (req, res) => {
  const encryptedString = req.body.message;
  const privateKey = fs.readFileSync("private_key.txt", "utf8");
  console.log(privateKey);
  const rsa = new NodeRSA(privateKey);
  const decrypted = rsa.decrypt(encryptedString, "utf8");
  res.status(200).json({
    response: decrypted,
  });
});

app.post("/encrypt", (req, res) => {
  const simpleString = req.body.message;
  const publicKey = fs.readFileSync("public_key.txt", "utf8");
  console.log(publicKey);
  const rsa = new NodeRSA(publicKey);
  const encrypted = rsa.encrypt(simpleString, "base64");
  res.status(200).json({
    data: encrypted,
  });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
