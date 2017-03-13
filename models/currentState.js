var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var stateSchema = new Schema({

	currentNumber: Number

});

stateSchema.index({ _id: 1}, { unique: true });

var currentState = mongoose.model( 'currentState' , stateSchema );

module.exports = currentState;
