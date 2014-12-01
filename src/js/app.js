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

	initialize: function() {
		this.workoutCollection = new WorkoutCollection();
    this.listenTo(this.workoutCollection, "reset sync remove", this.render);
    this.workoutCollection.fetch({dataType: "json"});
	},

	render: function() {
		var coll = this.workoutCollection.toJSON();
		console.log(coll.length);
		console.log(coll);
		
		var template = _.template($('#workout-list-template').html(), {workouts: coll});
		this.$el.html(template);

	},

});

var app = new ExerciseApp