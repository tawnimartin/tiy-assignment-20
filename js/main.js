var Employee = Backbone.Model.extend ({
	url: "js/employees.json"

});


var EmployeeView = (function() {

	var template = JST["employee"];

	function EmployeeView(model) {

		_.extend(this, Backbone.Events);
		this.model = model;
		
		
		this.listenTo(model, "change", function() {
			this.render();
		});
	}

	EmployeeView.prototype = {
		render: function() {
			return $(template(this.model.toJSON()) );
		}
	}

	return EmployeeView;

})();

$(function() {

	$.ajax("js/employees.json").done(function(data) {


		var headerTemplate = JST["table_header"];

		$("body").append(headerTemplate);

		var keysArray = _.keys(data[0]);

		_.each(keysArray, function(key) {

			$("thead tr").append($("<th />").text(key));

		});
		//
	
		_.each(data, function(datum) {

			var employeeModel = new Employee(datum);

			var employeeView = new EmployeeView(employeeModel);

			$("tbody").append(employeeView.render());
	
		});

	});


});