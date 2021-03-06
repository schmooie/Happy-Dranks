'use strict';

var mongoose = require('mongoose');

var Bar;
var Schema = mongoose.Schema;

var barSchema = new Schema({
  name: String,
  price: String,
  happyHour: String,
  rating: Number,
  numRatings: Number,
  neighborhood: String,
  borough: String,
  category: String,
  checkins: Number,
  url: String,
  coords: {longitude: Number, latitude: Number}
});

mongoose.model('Bar', barSchema);