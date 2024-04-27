var http = require("http");
var mongoose = require("mongoose");
var dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
var port = process.env.PORT || 8081;
const headers = require("./corsHeaders");
const {
  errorNotfound,
  errorJSON,
  errorField,
  errorID,
} = require("./errorHandle");
const Post = require("./models/postModel");
const successRes = require("./successHandle");

mongoose
  .connect(process.env.DATABASE.replace("<password>", process.env.DATABASE_PWD))
  .then(() => {
    console.log("資料庫連線成功");
  })
  .catch((err) => {
    console.log(err);
  });

const requestFn = async (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk;
  });
  if (req.url == "/posts" && req.method == "GET") {
    successRes(res);
  } else if (req.url == "/posts" && req.method == "POST") {
    req.on("end", () => {
      try {
        const post = JSON.parse(body);
        Post.create(post)
          .then(() => {
            successRes(res);
          })
          .catch(() => {
            errorField(res);
          });
      } catch (error) {
        errorJSON(res);
      }
    });
  } else if (req.url == "/posts" && req.method == "DELETE") {
    await Post.deleteMany({});
    successRes(res);
  } else if (req.url.startsWith("/posts/") && req.method == "DELETE") {
    const id = req.url.split("/").pop();
    Post.findByIdAndDelete(id)
      .then(() => {
        successRes(res);
      })
      .catch(() => {
        errorID(res);
      });
  } else if (req.url.startsWith("/posts/") && req.method == "PATCH") {
    req.on("end", () => {
      try {
        const id = req.url.split("/").pop();
        const post = JSON.parse(body);
        Post.findByIdAndUpdate(id, {
          name: post.name,
          tags: post.tags,
          type: post.type,
          content: post.content,
        })
          .then(() => {
            successRes(res);
          })
          .catch(() => {
            errorID(res);
          });
      } catch (error) {
        errorJSON(res);
      }
    });
  } else if (req.method == "OPTIONS") {
    res.writeHeader(200, headers);
    res.end();
  } else {
    errorNotfound(res);
  }
};

const server = http.createServer(requestFn);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
