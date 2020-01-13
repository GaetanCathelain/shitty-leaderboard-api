import express from "express";
import redis from "redis";
import cors from "cors";

const app = express();

let redisClient = redis.createClient({
  port: 65433, // replace with your port
  host: "127.0.0.1" // replace with your hostanme or IP address
  //    password  : '',    // replace with your password
});

app.use(cors());

app.get("/", (req, res) => {
  redisClient.set("lulz", "42", function(err) {
    if (err) {
      throw err; /* in production, handle errors more gracefully */
    } else {
      redisClient.get("lulz", function(err, value) {
        if (err) {
          throw err;
        } else {
          console.log("Value:", value);
        }
      });
    }
  });
  res.send("Hello World!");
});

app.listen(65432, () => console.log("Example app listening on port 65432!"));
