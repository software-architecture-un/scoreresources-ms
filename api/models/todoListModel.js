'use strict';


var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://scoreresources-db/dummy-app');

autoIncrement.initialize(connection);


var TaskSchema = new Schema({
  //service: String,
  //service_id: Number,

  name: String,
  description: String,
  latitude: Number,
  longitude: Number,
  user_id: Number
});




TaskSchema.plugin(autoIncrement.plugin, 'Tasks');
module.exports = mongoose.model('Tasks', TaskSchema);
