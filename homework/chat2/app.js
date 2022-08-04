//express nodemon socket.io

const fs = require("fs");
const express = require("express");
const socketio = require("socket.io");
const app = express();
const PORT = 3011;
const server = app.listen(PORT, () => {
  console.log(`${PORT}번 포트 연결`);
});

const io = socketio(server);

// 주소 접속시 메인 페이지 출력
app.get("/", (req, res) => {
  fs.readFile("page.html", (err, data) => {
    res.end(data);
  });
});
// 소켓 연결
io.on("connection", (socket) => {
  console.log("소켓 연결~!");
  // 로그인
  socket.on("logIn", (room, user_id) => {
    console.log(room);
    console.log(user_id);
    socket.join(room);
    io.to(room).emit("logIn", room, user_id, socket.id);
  });
  socket.on("message", (room, user_id, user_msg) => {
    io.to(room).emit("message", user_id, user_msg);
  });
});
