const headers = require("./corsHeaders");

function sendMessagge(res, code, message) {
  res.writeHeader(code, headers);
  res.write(
    JSON.stringify({
      state: "false",
      message,
    })
  );
  res.end();
}

function errorNotfound(res) {
  sendMessagge(res, 404, "Not Found");
}

function errorJSON(res) {
  sendMessagge(res, 400, "JSON 格式錯誤");
}
function errorField(res) {
  sendMessagge(res, 400, "欄位錯誤、未填寫");
}
function errorID(res) {
  sendMessagge(res, 400, "ID 錯誤");
}
module.exports = {
  errorNotfound,
  errorJSON,
  errorField,
  errorID,
};
