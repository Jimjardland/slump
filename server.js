import express from 'express';
import http from 'http';

const router = express.Router();
const app = express();

app.get('/', (req, res) => res.send('Hello world again!!'));


const server = http.createServer(app);
const PORT = process.env.PORT || 1337;

server.listen(PORT, () => {
	console.log(`listening on ${PORT}`);
})