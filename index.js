module.exports = {
  name: 'ember-waypoints',

  included: function(app) {
    var options = app.options['ember-waypoints'] || {};
    
    this._super.included(app);
    
    app.import(app.bowerDirectory + '/waypoints/lib/noframework.waypoints.js');
    if (options.sticky) {
      app.import(app.bowerDirectory + '/waypoints/lib/shortcuts/sticky.js');
    }
    app.import('vendor/shims/waypoints.js');
  }
}
