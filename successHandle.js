var mongoose = require("mongoose");
const Post = require("./models/postModel");
const headers = require("./corsHeaders");

async function successRes(res) {
  const posts = await Post.find();
  res.writeHeader(200, headers);
  res.write(
    JSON.stringify({
      state: "success",
      posts,
    })
  );
  res.end();
}

module.exports = successRes;
