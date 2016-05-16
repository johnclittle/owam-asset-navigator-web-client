import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return new Ember.RSVP.Promise(function(resolve){
				Ember.$.getJSON("http://localhost:3000/assets", function(data){
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
		})
	}
});
