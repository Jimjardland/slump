import express from 'express';
import http from 'http';

const router = express.Router();
const app = express();

const randomize = (arr) => {
	return arr[Math.floor(Math.random()*arr.length)];
};


app.get('/items', (req, res) => res.send(randomize(['a', 'b', 'c', 'd'])));
app.get('/', (req, res) => res.send(randomize((req.query.items.split(','))));




const server = http.createServer(app);
const PORT = process.env.PORT || 1337;

server.listen(PORT, () => {
	console.log(`listening on ${PORT}`);
})