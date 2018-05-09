import Route from '@ember/routing/route';

export default Route.extend({

  actions: {
    'waypointUp': function(component) {
      console.log('waypointUp triggered on:', component);
    },

    'waypointDown': function(component) {
      console.log('waypointDown triggered on:', component);
    },

    'waypoint': function(direction, component) {
      console.log('waypoint (' + direction + ') triggered on:', component);
    }
  }
});
