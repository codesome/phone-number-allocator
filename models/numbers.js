var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var numSchema = new Schema({

	number: Number,

});

numSchema.index({ _id: 1, number: 1 }, { unique: true });

var num = mongoose.model( 'numbers' , numSchema );

module.exports = num;
