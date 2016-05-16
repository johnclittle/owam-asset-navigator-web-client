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
			// children: new Ember.RSVP.Promise(function(resolve){ 
			// 	resolve(Ember.$.getJSON("http://localhost:3000/assets/" + params.asset_id + "/children" ));
			// })
			children: new Ember.RSVP.Promise(function(resolve){ 
				Ember.$.getJSON("http://localhost:3000/assets/" + params.asset_id + "/children" , function(data){
					var groups = {};
					//group the assets by type
					Ember.$.each(data, function(i, item) {
					    var level = item.ASSET_TYPE;

					    delete item.ASSET_TYPE;

					    if(groups[level]) {
					        groups[level].push(item);
					    } else {
					        groups[level] = [item];
					    }
					});
					//switch out key
					var result = Ember.$.map(groups, function(group, key) {
					    var obj = {};
					    obj.type = key;
					    obj['assets'] = group;

					    return obj;
					});

					// console.log(result);
					resolve(result);
				})
			}),
			parents: new Ember.RSVP.Promise(function(resolve){
				Ember.$.getJSON("http://localhost:3000/assets/" + params.asset_id + "/parents" , function(data){
					var result = data.toArray().reverse();
					// console.log(result);
					resolve(result);
				})
			})
		});
	}
});
