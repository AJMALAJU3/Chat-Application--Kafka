import { Server } from "socket.io";

export class Socket {
    private io: Server;

    constructor(server: any) {
        this.io = new Server(server, {
            cors: {
                origin: "http://localhost:5173",
                methods: ["GET", "POST"]
            }
        });

        this.io.on("connection", (socket) => {
            console.log("User connected:", socket.id);
        });
    }
}
