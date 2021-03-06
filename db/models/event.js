var mongoose = require('mongoose');
var Student = require('./student');

var eventSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	number: String,
	// type: {
	// 	type: String,
	// 	required: true
	// },
	groups: [{
		groupType: String,
		name: String
	}],
	date: {
		type: Date,
		required: true
	},
	startTime: Date,
	endTime: Date,
	description: String,
	teachers: [String],
	admin: String,
	//students: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
	students: [{
		id: String,
		name: String,
		lastName: String
	}],
	materials: [{
		id: String,
		name: String
	}],
	criteria: [{
		id: String,
		name: String,
		value: Number
	}],
	studentsCount: Number,
	guestsCount: Number
	// students: [Student.studentSchema],	//from edx course
	// marks: [{name: String, value: Number}]	//mixed
});

eventSchema.statics.deleteAndFetchAll = function (id) {
	let shemaObj = this;
	return this.remove({_id : id}).exec().then(function (res) {
		return shemaObj.find();
    })
};

eventSchema.statics.getById = function (id) {
	return this.find({_id : id});
};

eventSchema.statics.updateById = function (event) {
	return this.update({_id : event._id},event);
};

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;