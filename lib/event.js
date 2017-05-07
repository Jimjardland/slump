import Event from '../models/event';


const _get = (query) => {
    return new Promise ((resolve, reject) => {
        Event.find(query, (err, events) => {
            if (err) reject(err);
            resolve(events);
        });
    });
}

const getFromUser = (user) => _get({ 'user': user });
const getSession = (session) => _get({ 'session': session });

const save = (req) => {
    return new Promise((resolve, reject) => {
        	const event = new Event({ title: req.title,
							options: req.options.split(',').map(Function.prototype.call, String.prototype.trim),
							user: req.user,
							session: req.session });

        event.setSelected();
        event.save(function (err, event) {
            if (err) return console.error(err);
            resolve({ messsage: `succesfully saved: ${event.selected}!` });
        });
    });
}

const remove = (id) => {
    console.log(id);
    const promise = new Promise((resolve, reject) => {
        Event.remove({
             _id: id
              }, (err, event) => {
                resolve({ message: 'Successfully deleted' });
        });
    });
    return promise;
}

module.exports = {
    getFromUser,
    getSession,
    save,
    remove
}