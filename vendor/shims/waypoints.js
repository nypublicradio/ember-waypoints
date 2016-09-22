(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['Waypoint'] };
  }

  define('waypoints', [], vendorModule);
})();
