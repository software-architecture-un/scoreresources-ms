'use strict';

module.exports = function(app) {
	var todoList = require('../controllers/todoListController');

	// todoList Routes
	app.route('/scoreservice')
		.get(todoList.list_all_tasks)
		.post(todoList.create_a_task);

	app.route('/scoreservice/:taskId')
		.get(todoList.read_a_task)
		.put(todoList.update_a_task)
		.delete(todoList.delete_a_task);
	
	app.route('/scoreserviceUs/:user_id')
		.get(todoList.read_a_taskuser)
	app.route('/scoreserviceUsn/:user_id')
		.get(todoList.read_a_taskusernumber);



};
