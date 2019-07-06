'use strict';


var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://scoreresources-db/dummy-app');

autoIncrement.initialize(connection);


var TaskSchema = new Schema({
  //service: String,
  //service_id: Number,

  name: {
    type: String,
    required: false
  } ,
  description: {
    type: String,
  required : false  
  },
  latitude: {
    type: Number,
    required: [true, 'Falta Latitud']
  },
  longitude: {
    type: Number,
    required: [true, 'Falta Longitud']
  },
  user_id: {
    type: Number,
    required: [true, 'Falta User_id']
  }
});




TaskSchema.plugin(autoIncrement.plugin, 'Tasks');
module.exports = mongoose.model('Tasks', TaskSchema);
