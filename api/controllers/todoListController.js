'use strict';

var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');



exports.list_all_tasks = function (req, res) {

  Task.find({}, function (err, task) {
    if (err) {
      res.send(createAnswer(null, err.message, 404));
    } else {
      let places = task
      res.json(createAnswer(places, 'Todos los lugares', 200));
    }
  });
};

exports.read_a_taskuser = function (req, res) {
  Task.find({ user_id: req.params.user_id }, function (err, task) {
    if (err) {
      res.send(createAnswer(null, err.message, err.status));
    } else {
      let response = null;
      if (task === null) {
        response = createAnswer(task, 'Lugares no encontrados', 404);
      } else {
        response = createAnswer(task, 'OK', 200);
      }
      res.json(response);
    }
  });
};

exports.read_a_taskusernumber = function (req, res) {
  Task.find({ user_id: req.params.user_id }, function (err, task) {
    if (err)
      res.send(err);
    if (task.length > 0) {
      res.json({ total: task.length });
    } else {
      res.json({ total: 0 });
    }

  });
};


exports.create_a_task = function (req, res) {
  var new_task = new Task(req.body);
  new_task.save(function (err, task) {
    if (err) {
      res.send(createAnswer(null, err.message, 500));
    } else {
       res.json(createAnswer(task, 'OK', 201));
    }
  });
};

exports.read_a_task = function (req, res) {
  Task.findById(req.params.taskId, function (err, task) {
    if (err) {
      res.send(createAnswer(null, err, err.status));
    } else {
      let response = null;
      if (task === null) {
        response = createAnswer(task, 'Lugar no encontrado', 404)
      } else {
        response = createAnswer(task, 'OK', 200);
      }
      res.json(response);
    }
  });
};

exports.update_a_task = function (req, res) {
  Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, function (err, task) {
    if (err){
      res.send(createAnswer(null, err.message, 500));
    }else{
    res.json(createAnswer(task, 'El lugar fue actualizado!', 200));
  }
  });
};
// Task.remove({}).exec(function(){});
exports.delete_a_task = function (req, res) {

  Task.remove({
    _id: req.params.taskId
  }, function (err, task) {
    if (err)
      res.send(createAnswer(null, err.message, 500));
    res.json(createAnswer(null, 'Lugar borrado con exito', 200));
  });
};

function createAnswer(content, msg, status) {
  let result = {
    content: "",
    message: "",
    status: ""
  };
 
  result.content = (content === null) ? {} : content;
  result.message = msg;
  result.status = status;

  return result
}
