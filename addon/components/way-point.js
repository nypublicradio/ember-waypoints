import Component from '@ember/component';
import { bind } from '@ember/runloop';
import { getProperties } from '@ember/object';
import { isNone } from '@ember/utils'
import Waypoint from 'waypoints';

export default Component.extend({
  contextElement: null,
  offset: null,
  triggerOnce: null,
  continuous: null,
  horizontal: null,

  waypoint(options) {
    if (typeof document === 'undefined') {
      return;
    }
    let waypoint;

    if (options.sticky) {
      waypoint = new Waypoint.Sticky(options);
    } else {
      waypoint = new Waypoint(options);
    }

    this.set('_waypoint', waypoint);
  },

  didInsertElement() {
    this.waypoint(this.buildOptions());
  },

  willDestroyElement() {
    this.get('_waypoint').destroy();
  },

  buildOptions: function() {
    var options = getProperties(this, ['contextElementId', 'offset', 'triggerOnce', 'continuous', 'horizontal', 'sticky', 'wrapper', 'element', 'stuckClass']);
    options.handler = bind(this, this.waypointTriggered);

    for (var option in options) {
      if (isNone(options[option])) {
        delete options[option];
      }
    }

    if (options.contextElementId) {
      options.context = document.getElementById(options.contextElementId);
      delete options.contextElementId;
    }

    return options;
  },

  waypointTriggered: function(direction) {
    this.sendAction('on-' + direction, this); // eslint-disable-line
    this.sendAction('action', direction, this); // eslint-disable-line
  }
});
