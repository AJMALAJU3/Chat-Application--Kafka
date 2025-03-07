import express from "express"
import http from "http"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./config/db.config"
import messageRouter from "./routes/messageRoute"
import { initKafka, runConsumer } from "./utils/kafkaUtil"
import userRouter from './routes/userRoute'
import chatRouter from './routes/chatRoute'
import { initializeSocket } from "./utils/socket"

dotenv.config();
const app = express();
const server = http.createServer(app);
initializeSocket(server)
app.use(cors());
app.use(express.json());
connectDB();
initKafka();
runConsumer();


app.use('/message', messageRouter)
app.use('/chat', chatRouter)
app.use('/auth', userRouter)



server.listen(3000, () => console.log("Server running on port 3000"));
