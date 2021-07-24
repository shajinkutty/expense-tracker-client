import io from "socket.io-client";

const ENDPOINT = "https://expense-tracker-private.herokuapp.com";
export const socket = io(ENDPOINT);
