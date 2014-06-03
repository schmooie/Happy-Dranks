'use strict';

var mongoose = require('mongoose'),
    Bar = mongoose.model('Bar');

exports.allBars = function(req, res) {
  return Bar.find(function (err, Bars) {
    if (!err) {
      return res.json(Bars);
    } else {
      return res.send(err);
    }
  });
};

exports.searchBars = function(req,res) {
	return Bar.find(req.query, function (err, Bars){
		if (!err) {
			return res.json(Bars);
		} else {
			return res.send(err);
		}
	});
};