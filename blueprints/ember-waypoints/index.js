module.exports = {
  description: 'Add bower dependencies for waypoints',

  normalizeEntityName: function() {}, // no-op since we're just adding dependencies

  afterInstall: function() {
    return this.addBowerPackageToProject('waypoints', '~4.0.0');
  }
};
