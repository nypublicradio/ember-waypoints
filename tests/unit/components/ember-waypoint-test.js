import { keys } from '@ember/polyfills';
import { run } from '@ember/runloop';
import $ from 'jquery';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('component:way-point', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.teardown = function() {
      $.waypoints('destroy');
    };
  });

  test('sets up waypoint after render', function(assert) {
    assert.equal($.waypoints().vertical.length, 0, 'precond - no waypoints exist');

    this.render();

    assert.equal($.waypoints().vertical.length, 1, 'waypoint was created');
  });

  test('sets up horizontal waypoint after render', function(assert) {
    assert.equal($.waypoints().horizontal.length, 0, 'precond - no waypoints exist');

    this.owner.factoryFor('component:way-point').create({
      horizontal: true
    });

    this.render();

    assert.equal($.waypoints().horizontal.length, 1, 'waypoint was created');
  });

  test('clears waypoint after teardown', function(assert) {
    this.render();
    assert.equal($.waypoints().vertical.length, 1, 'precond - waypoint was created');

    run(this.owner.factoryFor('component:way-point').create(), 'destroy');
    assert.equal($.waypoints().vertical.length, 0, 'precond - no waypoints exist');
  });

  test('passes offset through to waypoints', function(assert) {
    assert.expect(1);

    this.owner.factoryFor('component:way-point').create({
      waypoint: function(options) {
        if (options !== 'destroy') {
          assert.equal(options.offset, 200, 'offset is passed on');
        }
      },
      offset: 200
    });

    this.render();
  });

  test('passes horizontal through to waypoints', function(assert) {
    assert.expect(1);

    this.owner.factoryFor('component:way-point').create({
      waypoint: function(options) {
        if (options !== 'destroy') {
          assert.equal(options.horizontal, true, 'horizontal is passed on');
        }
      },

      horizontal: true
    });

    this.render();
  });

  test('passes triggerOnce through to waypoints', function(assert) {
    assert.expect(1);

    this.owner.factoryFor('component:way-point').create({
      waypoint: function(options) {
        if (options !== 'destroy') {
          assert.equal(options.triggerOnce, true, 'triggerOnce is passed on');
        }
      },

      triggerOnce: true
    });

    this.render();
  });

  test('passes continuous through to waypoints', function(assert) {
    assert.expect(1);

    this.owner.factoryFor('component:way-point').create({
      waypoint: function(options) {
        if (options !== 'destroy') {
          assert.equal(options.continuous, true, 'continuous is passed on');
        }
      },

      continuous: true
    });

    this.render();
  });

  test('passes contextElementId through to waypoints', function(assert) {
    assert.expect(2);

    this.owner.factoryFor('component:way-point').create({
      waypoint: function(options) {
        if (options !== 'destroy') {
          assert.equal(options.context.id, 'ember-testing', 'context is a DOM node');
          assert.equal(options.context.tagName, 'DIV', 'context is a DOM node');
        }
      },

      contextElementId: 'ember-testing'
    });

    this.render();
  });

  test('does not pass on defaulted (non-set) props', function(assert) {
    assert.expect(1);

    this.owner.factoryFor('component:way-point').create({
      waypoint: function(options) {
        if (options !== 'destroy') {
          assert.deepEqual(keys(options), ['handler'], 'only handler is present by default');
        }
      }
    });

    this.render();
  });

  test('sends actions when handler is called', function(assert) {
    var handler;
    var triggeredActions = [];

    this.owner.factoryFor('component:way-point').create({
      waypoint: function(options) {
        handler = options.handler;
      },

      sendAction: function(name) {
        triggeredActions.push(name);
      }
    });

    this.render();

    handler('up');
    assert.deepEqual(triggeredActions, ['on-up', 'action'], 'actions are triggered');

    triggeredActions = [];
    handler('down');
    assert.deepEqual(triggeredActions, ['on-down', 'action'], 'actions are triggered');
  });
});
