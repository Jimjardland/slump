import mongoose from 'mongoose';

var eventSchema = mongoose.Schema({
    user: String,
	title: String,
	selected: String,
	session: String,
	options: Array,
	date: { type: Date, default: Date.now }
});

eventSchema.methods.setSelected = function () {
	const arr = this.options;
	console.log(arr);
	this.selected = arr[Math.floor(Math.random()*arr.length)]
}

module.exports = mongoose.model('Event', eventSchema);