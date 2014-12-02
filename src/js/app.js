// Application Model
var Workouts = Backbone.Model.extend({

	defaults: function() {
    return {
      title: "My Workout",
      felt: "Good"
    };
   },

});

// Application Collection
var WorkoutCollection = Backbone.Collection.extend({

	model : Workouts,
	url: '/data/tracker.json'
});

// Main
var ExerciseApp = Backbone.View.extend({

	el: "#exercise_app",
	template: null,

	initialize: function() {
		this.workoutCollection = new WorkoutCollection();
	    this.listenTo(this.workoutCollection, "reset sync remove", this.render);
	    this.workoutCollection.fetch({dataType: "json"});

	    this.template = _.template($('#workout-table-template').html());
	},

	render: function() {
		var coll = this.workoutCollection.toJSON();
		this.$el.html(this.template({workouts: coll}));
	},

});

$( document ).ready(function() {
	var app = new ExerciseApp
});
