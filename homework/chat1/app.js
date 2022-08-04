/*
귓속말 기능
해당 이름 입력하고 귓속말 보내기 버튼 누르면 이름의 유저에게 귓속말 보내기
*/

const fs = require("fs");
const express = require("express");
const socketio = require("socket.io");
const app = express();
const PORT = 3010;
const server = app.listen(PORT, () => {
  console.log(`${PORT}번 포트 연결`);
});
const io = socketio(server);

app.get("/", (req, res) => {
  fs.readFile("page.html", (err, data) => {
    console.log("페이지 로드");
    res.end(data);
  });
});

io.on("connection", (socket) => {
  console.log("소켓연결!");
  socket.on("joinRoom", (room, username) => {
    console.log(socket.id);
    socket.join(room);
    io.to(room).emit("joinRoom", room, username, socket.id);
  });
  socket.on("leaveRoom", (room, username) => {
    socket.leave(room);
    io.to(room).emit("leaveRoom", room, username);
  });
  socket.on("chat", (room, username, msg) => {
    io.to(room).emit("chat", username, msg);
  });
  socket.on("secrit", (username, msg) => {
    alert(msg);
  });
});

// app.get("/secrit.html", (req, res) => {
//   fs.readFile("secrit.html", (err, data) => {
//     res.end(data);
//   });
// });
// app.post("/secrit", (req, res) => {
//   console.log(req);
//   console.log(res);
//   socket.on("secrit", (res) => {});
// });
