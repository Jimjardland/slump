import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from './lib/session';
import event from './lib/event';

const router = express.Router();
const app = express();


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.get('/', (req, res) => res.send(session.getRandom()));

mongoose.Promise = Promise;
mongoose.connect('mongodb://admin:123456@mongo/slump', { auth: { authdb: 'admin' } } );
 

// TODO:
// -Cronjob that removes every session that have reached the time limit of 24 hours
// -Check if random session name exist and only resolve if it does
// -Create account, passport maybe?


router.route('/saveEvent').post((req, res) => {
	console.log(req.body)
	event.save(req.body).then(response => {
		res.send(response);
	});
});

router.delete('/delete/:event_id', (req, res) => {
	event.remove(req.params.event_id).then(response => {
		res.send(response);
	});
});

router.get('/getEventsFromUser', (req, res) => {
	event.getFromUser(req.query.user).then(events => {
		res.send(events);
	});
});

router.get('/getSessionName', (req, res) => {
	session.getRandom().then(session => {
		res.send(session);
	});
});

router.get('/getBySession', (req, res) => {
	event.getSession(req.query.session).then(events => {
		res.send(events);
	});
});

app.use('/api', router);
const server = http.createServer(app);
const PORT = process.env.PORT || 9000;

server.listen(PORT, () => {
	console.log(`listening on ${PORT}`, new Date());
})