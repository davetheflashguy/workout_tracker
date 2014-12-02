// Users Model
var Users = Backbone.Model.extend({
	defaults: function() {
	    return {
	    	avatar: "" // generic Avatar if none supplied by users
	    };
	}
});

/// Workouts Collection
var UserCollection = Backbone.Collection.extend({

	model : Users,
	url: '/data/users.json',
	parse: function (responses) {
		return responses;
	}

});
// Workouts Model
var Workouts = Backbone.Model.extend({

	defaults: function() {
	    return {
	    	felt: "Good"
	    };
   	},

});

// Workouts Collection
var WorkoutCollection = Backbone.Collection.extend({

	model : Workouts,
	url: '/data/tracker.json',
	parse: function (responses) {
		var data = [];
		_.each(responses, function(response){

			// format durations
			var x = response.duration;
			var d = moment.duration(x, 'milliseconds');
			var hours = Math.floor(d.asHours());
			var mins = Math.floor(d.asMinutes()) - hours * 60;
			var seconds = Math.floor(d.asSeconds()) - mins * 60;
			var duration = "";

			if (hours > 0) {
				duration += hours + " hours ";
			}

			if (mins > 0) {
				duration += mins + " minutes ";
			}

			if (seconds > 0) {
				duration += seconds + " seconds ";
			}

			response.duration = duration;

			// format workout dates
			var y = response.date;
			var z = moment(y).format('dddd, MMM Do YYYY');

			response.date = z;
		});
		
      return responses;
   	}
});

// Main
var ExerciseApp = Backbone.View.extend({

	el: "#exercise_app",
	template: null,

	initialize: function() {

		this.workoutCollection = new WorkoutCollection();
	    this.listenTo(this.workoutCollection, "reset sync remove", this.usersLoaded);
	    this.workoutCollection.fetch({dataType: "json"});
	    this.template = _.template($('#workout-table-template').html());

	},

	usersLoaded: function() {

		this.userCollection = new UserCollection();
	    this.listenTo(this.userCollection, "reset sync remove", this.render);
	    this.userCollection.fetch({dataType: "json"});
	    
	},

	render: function() {

		console.log('on render')
		console.log(this.userCollection.toJSON());
		var coll = this.workoutCollection.toJSON();
		this.$el.html(this.template({workouts: coll}));
		
	},

});

$(document).ready(function() {
	var app = new ExerciseApp
});
