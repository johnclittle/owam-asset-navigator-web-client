import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		return Ember.RSVP.hash({
			asset: new Ember.RSVP.Promise(function(resolve){ 
				resolve(Ember.$.getJSON("http://localhost:3000/assets/" + params.asset_id ));
			}),
			cost: new Ember.RSVP.Promise(function(resolve){ 
				resolve(Ember.$.getJSON("http://localhost:3000/assets/" + params.asset_id  + "/cost" ));
			}),
			children: new Ember.RSVP.Promise(function(resolve){ 
				resolve(Ember.$.getJSON("http://localhost:3000/assets/" + params.asset_id + "/children" ));
			})
		});
	}
});
