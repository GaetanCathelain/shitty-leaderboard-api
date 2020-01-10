import express from "express";
import redis from "redis";

const app = express();

let client = redis.createClient({
  port: 65433, // replace with your port
  host: "127.0.0.1" // replace with your hostanme or IP address
  //    password  : '',    // replace with your password
});

app.get("/", (req, res) => {
  client.set("lulz", "42", function(err) {
    if (err) {
      throw err; /* in production, handle errors more gracefully */
    } else {
      client.get("lulz", function(err, value) {
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
