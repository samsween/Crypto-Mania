import { io } from "socket.io-client";

let socket;

process.env.NODE_ENV === "production"
  ? (socket = io())
  : (socket = io("http://localhost:3000"));

export default socket;
