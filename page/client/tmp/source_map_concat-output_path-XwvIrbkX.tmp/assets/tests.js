'use strict';

define('page/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('page/tests/components/nav-bar.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | components/nav-bar.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/nav-bar.js should pass jshint.');
  });
});
define('page/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('page/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('page/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'ember', 'page/tests/helpers/start-app', 'page/tests/helpers/destroy-app'], function (exports, _qunit, _ember, _pageTestsHelpersStartApp, _pageTestsHelpersDestroyApp) {
  var Promise = _ember['default'].RSVP.Promise;

  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _pageTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Promise.resolve(afterEach).then(function () {
          return (0, _pageTestsHelpersDestroyApp['default'])(_this.application);
        });
      }
    });
  };
});
define('page/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('page/tests/helpers/resolver', ['exports', 'page/resolver', 'page/config/environment'], function (exports, _pageResolver, _pageConfigEnvironment) {

  var resolver = _pageResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _pageConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _pageConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('page/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('page/tests/helpers/start-app', ['exports', 'ember', 'page/app', 'page/config/environment'], function (exports, _ember, _pageApp, _pageConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _pageConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _pageApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('page/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('page/tests/helpers/tag-start.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/tag-start.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'helpers/tag-start.js should pass jshint.\nhelpers/tag-start.js: line 10, col 14, Expected \'!==\' and instead saw \'!=\'.\nhelpers/tag-start.js: line 19, col 14, Expected \'!==\' and instead saw \'!=\'.\nhelpers/tag-start.js: line 34, col 4, Missing semicolon.\nhelpers/tag-start.js: line 37, col 37, Missing semicolon.\n\n4 errors');
  });
});
define('page/tests/integration/components/nav-bar-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForComponent)('nav-bar', 'Integration | Component | nav bar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template((function () {
      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 1,
              'column': 11
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [['content', 'nav-bar', ['loc', [null, [1, 0], [1, 11]]], 0, 0, 0, 0]],
        locals: [],
        templates: []
      };
    })()));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template((function () {
      var child0 = (function () {
        return {
          meta: {
            'revision': 'Ember@2.8.2',
            'loc': {
              'source': null,
              'start': {
                'line': 2,
                'column': 4
              },
              'end': {
                'line': 4,
                'column': 4
              }
            }
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode('      template block text\n');
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();

      return {
        meta: {
          'revision': 'Ember@2.8.2',
          'loc': {
            'source': null,
            'start': {
              'line': 1,
              'column': 0
            },
            'end': {
              'line': 5,
              'column': 2
            }
          }
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode('\n');
          dom.appendChild(el0, el1);
          var el1 = dom.createComment('');
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode('  ');
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [['block', 'nav-bar', [], [], 0, null, ['loc', [null, [2, 4], [4, 16]]]]],
        locals: [],
        templates: [child0]
      };
    })()));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('page/tests/integration/components/nav-bar-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | integration/components/nav-bar-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/nav-bar-test.js should pass jshint.');
  });
});
define('page/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('page/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('page/tests/routes/about.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/about.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/about.js should pass jshint.');
  });
});
define('page/tests/routes/create.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/create.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/create.js should pass jshint.');
  });
});
define('page/tests/routes/home.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/home.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/home.js should pass jshint.');
  });
});
define('page/tests/routes/navtest.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/navtest.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/navtest.js should pass jshint.');
  });
});
define('page/tests/routes/template-tests.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | routes/template-tests.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/template-tests.js should pass jshint.\nroutes/template-tests.js: line 70, col 6, Missing semicolon.\n\n1 error');
  });
});
define('page/tests/test-helper', ['exports', 'page/tests/helpers/resolver', 'ember-qunit'], function (exports, _pageTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_pageTestsHelpersResolver['default']);
});
define('page/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('page/tests/unit/helpers/tag-start-test', ['exports', 'page/helpers/tag-start', 'qunit'], function (exports, _pageHelpersTagStart, _qunit) {

  (0, _qunit.module)('Unit | Helper | tag start');

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    var result = (0, _pageHelpersTagStart.tagStart)([42]);
    assert.ok(result);
  });
});
define('page/tests/unit/helpers/tag-start-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/helpers/tag-start-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/helpers/tag-start-test.js should pass jshint.');
  });
});
define('page/tests/unit/routes/about-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:about', 'Unit | Route | about', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('page/tests/unit/routes/about-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/about-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/about-test.js should pass jshint.');
  });
});
define('page/tests/unit/routes/create-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:create', 'Unit | Route | create', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('page/tests/unit/routes/create-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/create-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/create-test.js should pass jshint.');
  });
});
define('page/tests/unit/routes/home-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:home', 'Unit | Route | home', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('page/tests/unit/routes/home-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/home-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/home-test.js should pass jshint.');
  });
});
define('page/tests/unit/routes/navtest-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:navtest', 'Unit | Route | navtest', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('page/tests/unit/routes/navtest-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/navtest-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/navtest-test.js should pass jshint.');
  });
});
define('page/tests/unit/routes/template-tests-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:template-tests', 'Unit | Route | template tests', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('page/tests/unit/routes/template-tests-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/routes/template-tests-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/template-tests-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('page/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map
