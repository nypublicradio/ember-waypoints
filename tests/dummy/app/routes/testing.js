import { A } from '@ember/array';
import Route from '@ember/routing/route';
import { set, get } from '@ember/object';

function generateWaypointActionHandler(actionName) {
  return function() {
    var firedActions = get(this, 'router.namespace.firedActions');
    var displayActionName = actionName;
    var elementId;

    if (actionName === 'action') {
      displayActionName = actionName + ' - ' + arguments[0];
      elementId = arguments[1].elementId;
    } else {
      elementId = arguments[0].elementId;
    }

    firedActions.pushObject({action: displayActionName, id: elementId});
  };
}

export default Route.extend({
  init: function() {
    this._super();

    var firedActions = A();
    set(this, 'router.namespace.firedActions', firedActions);
  },

  actions: {
    'up':      generateWaypointActionHandler('on-up'),
    'down':    generateWaypointActionHandler('on-down'),
    'default': generateWaypointActionHandler('action')
  }
});
