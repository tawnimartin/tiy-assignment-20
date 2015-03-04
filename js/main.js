var Employee = Backbone.Model.extend ({

});

var EmployeesCollection = Backbone.Collection.extend ({

	url: "js/employees.json",

	model: Employee

});

var EmployeeView = (function() {

	var template = JST["employee"];

	function EmployeeView(model) {

		_.extend(this, Backbone.Events);
		this.model = model;
		
	}

	EmployeeView.prototype = {
		render: function() {
			return $(template(this.model.toJSON()) );
		}
	}

	return EmployeeView;

})();




$(function() {

	var employees = new EmployeesCollection();

		var headerTemplate = JST["table_header"];

		$("body").append(headerTemplate);

		employees.fetch().done(function() {

		  employees.each(function(model) {

		  	var employeeView = new EmployeeView(model);
		  	$("tbody").append(employeeView.render());

		  });


			var headings = employees.first().keys();

			_.each(headings, function(key) {

				$("thead tr").append($("<th />").text(key));

			});
		//
		  //console.log(headings);
		  //window.employees = employees;

	});

});