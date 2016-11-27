"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('page/app', ['exports', 'ember', 'page/resolver', 'ember-load-initializers', 'page/config/environment'], function (exports, _ember, _pageResolver, _emberLoadInitializers, _pageConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _pageConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _pageConfigEnvironment['default'].podModulePrefix,
    Resolver: _pageResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _pageConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('page/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'page/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _pageConfigEnvironment) {

  var name = _pageConfigEnvironment['default'].APP.name;
  var version = _pageConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('page/components/content-editable', ['exports', 'ember-content-editable/components/content-editable'], function (exports, _emberContentEditableComponentsContentEditable) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberContentEditableComponentsContentEditable['default'];
    }
  });
});
define('page/components/nav-bar', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('page/components/side-bar', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    // selectedTagsObserver: Ember.observer('selectedTags', function(){
    //   console.log(this.get('selectedTags'));
    // }),
    actions: {}
  });
});
define("page/controllers/editing-tests", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({
    selectedRegion: {},

    actions: {
      deselect: function deselect() {
        console.log("deselect firing!");
        var elems = document.querySelectorAll(".selected-region");
        [].forEach.call(elems, function (el) {
          el.classList.remove("selected-region");
        });
        console.log("deselecting. selectedRegion: ", this.get("selectedRegion"));
        return false;
      },

      mouseUpOnEdits: function mouseUpOnEdits() {
        var selected = window.getSelection();
        console.log("Selected: ", selected);
        selected = new Region(selected.anchorNode, selected.extentNode, selected.anchorOffset, selected.extentOffset);
        console.log("selectedRegion: ", selected);
        this.send("selectRegion", selected);
      },

      save: function save() {
        var pageContent = document.getElementById("edit").innerHTML;
        console.log(pageContent);
        var htmlData = {
          html: pageContent
        };
        var promise = $.post({
          url: "http://localhost:3000/api/saveTest",
          data: JSON.stringify(htmlData),
          dataType: "text"
        });
        promise.then(function (response) {
          console.log(response);
        });
      },

      cancelEdits: function cancelEdits() {
        var edit = document.getElementById("edit");
        this.send("cancelEditsOnModel");
        edit.innerHTML = this.get("model");
      },

      noBubble: function noBubble() {
        console.log("noBubble");
        return false;
      },

      newNode: function newNode() {
        var node = insertNode(this.get("selectedRegion"));
        console.log("newNode's node: ", node);
        this.send("selectNode", node);
      },

      changeTag: function changeTag() {
        var selectedRegion = this.get("selectedRegion");
        var tagNameElement = document.getElementById("tagName");
        console.log("selectedRegion from onChange: ", selectedRegion);
        var newNode = changeNodeType(selectedRegion.anchorElement, tagNameElement.innerHTML.replace(/&nbsp;/gi, '').trim());
        this.send("selectNode", newNode);
        console.log("onChange fired. selectedRegion: ", selectedRegion);
        Caret.goToEndOfNode(event.target);
        return false;
      },

      changeId: function changeId() {
        var selectedRegion = this.get("selectedRegion");
        var tagIdElement = document.getElementById("tagId-unfocusable");
        tagIdElement.focus();
        console.log("selectedRegion from changeId: ", selectedRegion);
        selectedRegion.anchorElement.setAttribute("id", tagIdElement.innerHTML.replace(/&nbsp;/gi, '').trim());
        return false;
      },

      fieldFocused: function fieldFocused(event) {
        event.target.classList.add("selected");
        console.log(event.target);
        Caret.highlightNodeContents(event.target);
        return false;
      },

      fieldBlurred: function fieldBlurred(event) {
        event.target.classList.remove("selected");
        return false;
      },

      parentFieldFocused: function parentFieldFocused(event) {
        event.target.parentNode.classList.add("selected");
        Caret.highlightNodeContents(event.target);
        return false;
      },

      parentFieldBlurred: function parentFieldBlurred(event) {
        event.target.parentNode.classList.remove("selected");
        return false;
      },

      selectRegion: function selectRegion(region) {
        console.log("region: ", region);
        var elems = document.querySelectorAll(".selected-region");
        [].forEach.call(elems, function (el) {
          el.classList.remove("selected-region");
        });

        region.anchorElement.classList.add("selected-region");
        region.anchorElement.parentNode.classList.add("selected-region");
        region.anchorElement.parentNode.parentNode.classList.add("selected-region");

        this.set("selectedRegion", region);

        document.getElementById("tagName").innerHTML = region.anchorElement.nodeName;
        document.getElementById("tagId-unfocusable").innerHTML = region.anchorElement.id;
      },

      selectNode: function selectNode(node) {
        console.log("node: ", node);
        var selected = new Region(node, node, 0, 0);
        console.log("selectedFromSelectNode: ", selected);
        this.send("selectRegion", selected);
      }
    },

    modelObserver: _ember["default"].observer('model', function () {
      var edit = document.getElementById("edit");
      console.log(edit);
      if (edit != null) {
        edit.innerHTML = this.get("model");
        console.log("changing edit's html");
      }
    })
  });

  // useful functions

  function changeNodeType(element, newType) {
    var new_element = document.createElement(newType),
        old_attributes = element.attributes,
        new_attributes = new_element.attributes;

    // copy attributes
    if (typeof old_attributes !== "undefined") {
      for (var i = 0, len = old_attributes.length; i < len; i++) {
        new_attributes.setNamedItem(old_attributes.item(i).cloneNode());
      }
    }

    // copy child nodes
    console.log("new element", new_element);
    console.log("element: ", element);
    console.log("firstChild: ", element.firstChild);
    do {
      new_element.appendChild(element.firstChild);
    } while (element.firstChild);

    // replace element
    element.parentNode.replaceChild(new_element, element);
    return new_element;
  }

  function insertNode(selectedNode) {
    console.log("node inserted");
    console.log(selectedNode);
    var new_element;
    // create a node after selectedNode
    if (selectedNode.extentNode.length <= selectedNode.extentOffset) {
      new_element = document.createElement("h6");
      new_element.textContent = "new element";
      console.log("NEED TO CREATE NEW NODE");
      var nextSibling = selectedNode.extentNode.parentNode.nextSibling;
      nextSibling.parentNode.insertBefore(new_element, nextSibling);
      // create a node before selectedNode
    } else if (selectedNode.extentOffset == 0) {
        new_element = document.createElement("h6");
        new_element.textContent = "new element";
        var parent = selectedNode.extentNode.parentNode;
        parent.parentNode.insertBefore(new_element, parent);
        // create a node inside selectedNode
      } else {
          var selectedAnchor = selectedNode.anchorNode;
          console.log("YO LETS NEST THESE NODES INSIDE EACHOTHER");
          if (selectedNode.extentNode == selectedNode.anchorNode) {
            console.log("easy peasy");
            var textNode1Content = selectedAnchor.textContent.slice(0, selectedNode.anchorOffset);
            var newNodeContent = selectedAnchor.textContent.slice(selectedNode.anchorOffset, selectedNode.extentOffset);
            var textNode2Content = selectedAnchor.textContent.slice(selectedNode.extentOffset);

            var textNode1 = document.createTextNode(textNode1Content);
            var newTextNode = document.createTextNode(newNodeContent);
            var textNode2 = document.createTextNode(textNode2Content);
            new_element = document.createElement("b");
            new_element.appendChild(newTextNode);
            selectedAnchor.parentNode.insertBefore(textNode1, selectedAnchor);
            selectedAnchor.parentNode.insertBefore(new_element, selectedAnchor);
            selectedAnchor.parentNode.insertBefore(textNode2, selectedAnchor);
            selectedAnchor.remove();
          }
        }
    console.log("New_element: ", new_element);
    document.getElementById("tagName").focus();
    return new_element;
  }

  function byValue(obj) {
    var clonedObj = Object.create(obj).__proto__;
    return clonedObj;
  }

  function Region(anchorNode, extentNode, anchorOffset, extentOffset) {
    this.anchorNode = anchorNode;
    this.extentNode = extentNode;
    this.anchorOffset = anchorOffset;
    this.extentOffset = extentOffset;
    if (anchorNode.nodeName == "#text") {
      this.anchorElement = anchorNode.parentNode;
    } else {
      this.anchorElement = anchorNode;
    }
    if (extentNode.nodeName == "#text") {
      this.extentElement = extentNode.parentNode;
    } else {
      this.extentElement = extentNode;
    }
    console.log("new Region", this);
  }

  var Caret = {
    highlightNodeContents: function highlightNodeContents(el) {
      setTimeout(function () {
        var range = document.createRange();
        var sel = window.getSelection();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
      });
    },
    goToEndOfNode: function goToEndOfNode(el) {
      setTimeout(function () {
        var range = document.createRange();
        var sel = window.getSelection();
        range.selectNodeContents(el);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      });
    }
  };
});
define('page/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('page/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('page/helpers/tag-start', ['exports', 'ember'], function (exports, _ember) {
  exports.tagStart = tagStart;

  function tagStart(html) {
    return html;
  }

  exports['default'] = _ember['default'].Helper.helper(tagStart);
});
define('page/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'page/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _pageConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_pageConfigEnvironment['default'].APP.name, _pageConfigEnvironment['default'].APP.version)
  };
});
define('page/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('page/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('page/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('page/initializers/export-application-global', ['exports', 'ember', 'page/config/environment'], function (exports, _ember, _pageConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_pageConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _pageConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_pageConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('page/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('page/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('page/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("page/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('page/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('page/router', ['exports', 'ember', 'page/config/environment'], function (exports, _ember, _pageConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _pageConfigEnvironment['default'].locationType,
    rootURL: _pageConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('navtest');
    this.route('home');
    this.route('about');
    this.route('create');
    this.route('template-tests');
    this.route('editing-tests');
  });

  exports['default'] = Router;
});
define('page/routes/about', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('page/routes/create', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('page/routes/editing-tests', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      var cursorPos = 0;
      var nodes;
      var promise = $.ajax({
        url: "http://localhost:3000/api/spoofhtml",
        type: 'get'
      });
      return promise.then(function (response) {
        return response.html;
      });
    },

    actions: {
      cancelEditsOnModel: function cancelEditsOnModel() {
        console.log("refreshing...");
        this.refresh();
      },

      invalidateModel: function invalidateModel() {
        this.refresh();
      }
    }
  });
});
define('page/routes/home', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('page/routes/navtest', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('page/routes/template-tests', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      var nodes;

      var promise = $.ajax({
        url: "http://localhost:3000/api/spoofnodes",
        type: 'get'
      });
      return promise.then(function (response) {
        return response;
      });
    },

    actions: {
      invalidateModel: function invalidateModel() {
        this.refresh();
      }
    }
  });
});
define('page/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("page/templates/about", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "page/templates/about.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        return morphs;
      },
      statements: [["content", "nav-bar", ["loc", [null, [2, 0], [2, 11]]], 0, 0, 0, 0], ["content", "outlet", ["loc", [null, [3, 0], [3, 10]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("page/templates/components/nav-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 2
            },
            "end": {
              "line": 3,
              "column": 25
            }
          },
          "moduleName": "page/templates/components/nav-bar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Home");
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
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 2
            },
            "end": {
              "line": 4,
              "column": 27
            }
          },
          "moduleName": "page/templates/components/nav-bar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("About");
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
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 2
            },
            "end": {
              "line": 5,
              "column": 29
            }
          },
          "moduleName": "page/templates/components/nav-bar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Create");
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
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "page/templates/components/nav-bar.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("nav");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(element0, 1, 1);
        morphs[2] = dom.createMorphAt(element0, 3, 3);
        morphs[3] = dom.createMorphAt(element0, 5, 5);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]], 0, 0, 0, 0], ["block", "link-to", ["home"], [], 0, null, ["loc", [null, [3, 2], [3, 37]]]], ["block", "link-to", ["about"], [], 1, null, ["loc", [null, [4, 2], [4, 39]]]], ["block", "link-to", ["create"], [], 2, null, ["loc", [null, [5, 2], [5, 41]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("page/templates/components/side-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 0
          }
        },
        "moduleName": "page/templates/components/side-bar.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "sidebar");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "id", "treeViewer");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "tree-view-box");
        dom.setAttribute(el3, "contenteditable", "true");
        var el4 = dom.createElement("span");
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "tree-view-box");
        dom.setAttribute(el5, "contenteditable", "true");
        var el6 = dom.createElement("span");
        var el7 = dom.createTextNode("\n        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createComment("");
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7, "class", "tree-view-box");
        dom.setAttribute(el7, "contenteditable", "true");
        var el8 = dom.createElement("span");
        var el9 = dom.createTextNode("\n          ");
        dom.appendChild(el8, el9);
        var el9 = dom.createComment("");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n          ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("div");
        dom.setAttribute(el9, "class", "tree-view-box");
        dom.setAttribute(el9, "contenteditable", "true");
        var el10 = dom.createElement("span");
        var el11 = dom.createTextNode("\n            \n          ");
        dom.appendChild(el10, el11);
        dom.appendChild(el9, el10);
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n        ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n      ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n    ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("H1");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        var el3 = dom.createTextNode("No Style");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [1, 0]);
        var element3 = dom.childAt(element2, [3, 0]);
        var element4 = dom.childAt(element0, [3]);
        var element5 = dom.childAt(element0, [5]);
        var morphs = new Array(7);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createElementMorph(element1);
        morphs[2] = dom.createMorphAt(element2, 1, 1);
        morphs[3] = dom.createMorphAt(element3, 1, 1);
        morphs[4] = dom.createMorphAt(dom.childAt(element3, [3, 0]), 1, 1);
        morphs[5] = dom.createElementMorph(element4);
        morphs[6] = dom.createElementMorph(element5);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]], 0, 0, 0, 0], ["element", "action", ["onChange"], [], ["loc", [null, [3, 23], [3, 44]]], 0, 0], ["content", "selectedTags.2.nodeName", ["loc", [null, [5, 6], [5, 35]]], 0, 0, 0, 0], ["content", "selectedTags.1.nodeName", ["loc", [null, [7, 8], [7, 37]]], 0, 0, 0, 0], ["content", "selectedTags.0.nodeName", ["loc", [null, [9, 10], [9, 39]]], 0, 0, 0, 0], ["element", "action", ["h1"], [], ["loc", [null, [17, 10], [17, 25]]], 0, 0], ["element", "action", ["noStyle"], [], ["loc", [null, [18, 10], [18, 30]]], 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("page/templates/create", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "page/templates/create.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "nav-bar", ["loc", [null, [1, 0], [1, 11]]], 0, 0, 0, 0], ["content", "outlet", ["loc", [null, [2, 0], [2, 10]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("page/templates/editing-tests", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 42,
            "column": 0
          }
        },
        "moduleName": "page/templates/editing-tests.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "sidebar");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        dom.setAttribute(el2, "id", "sidebar-top");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "id", "viewRoot");
        dom.setAttribute(el3, "class", "up");
        var el4 = dom.createTextNode("up");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "id", "newNode");
        var el4 = dom.createTextNode("+");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        dom.setAttribute(el3, "id", "tagName");
        dom.setAttribute(el3, "class", "field big");
        dom.setAttribute(el3, "contenteditable", "true");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        dom.setAttribute(el3, "id", "tagId");
        dom.setAttribute(el3, "class", "field");
        dom.setAttribute(el3, "contenteditable", "false");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "class", "no-padding");
        var el5 = dom.createTextNode("#");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        dom.setAttribute(el4, "id", "tagId-unfocusable");
        dom.setAttribute(el4, "tabindex", "-1");
        dom.setAttribute(el4, "class", "no-padding no-focus");
        dom.setAttribute(el4, "contenteditable", "true");
        var el5 = dom.createTextNode("\n          ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        dom.setAttribute(el2, "id", "sidebar-classes");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "id", "newClass");
        dom.setAttribute(el3, "class", "class");
        var el4 = dom.createTextNode("+");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        dom.setAttribute(el2, "id", "sidebar-styles");
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "page");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "id", "edit");
        dom.setAttribute(el3, "contenteditable", "true");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [5]);
        var element3 = dom.childAt(element1, [7]);
        var element4 = dom.childAt(element1, [9, 3]);
        var element5 = dom.childAt(element0, [3, 1]);
        var element6 = dom.childAt(fragment, [4]);
        var morphs = new Array(15);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createElementMorph(element0);
        morphs[2] = dom.createElementMorph(element2);
        morphs[3] = dom.createAttrMorph(element3, 'onkeyup');
        morphs[4] = dom.createAttrMorph(element3, 'onfocus');
        morphs[5] = dom.createAttrMorph(element3, 'onblur');
        morphs[6] = dom.createElementMorph(element3);
        morphs[7] = dom.createMorphAt(element3, 1, 1);
        morphs[8] = dom.createAttrMorph(element4, 'onkeyup');
        morphs[9] = dom.createAttrMorph(element4, 'onfocus');
        morphs[10] = dom.createAttrMorph(element4, 'onblur');
        morphs[11] = dom.createMorphAt(element4, 1, 1);
        morphs[12] = dom.createElementMorph(element5);
        morphs[13] = dom.createElementMorph(element6);
        morphs[14] = dom.createUnsafeMorphAt(dom.childAt(element6, [1, 1]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0], ["element", "action", ["deselect"], [], ["loc", [null, [2, 18], [2, 39]]], 0, 0], ["element", "action", ["newNode"], ["bubbles", false], ["loc", [null, [6, 25], [6, 59]]], 0, 0], ["attribute", "onkeyup", ["subexpr", "action", ["changeTag"], [], ["loc", [null, [null, null], [9, 40]]], 0, 0], 0, 0, 0, 0], ["attribute", "onfocus", ["subexpr", "action", ["fieldFocused"], [], ["loc", [null, [null, null], [10, 43]]], 0, 0], 0, 0, 0, 0], ["attribute", "onblur", ["subexpr", "action", ["fieldBlurred"], [], ["loc", [null, [null, null], [11, 42]]], 0, 0], 0, 0, 0, 0], ["element", "action", ["noBubble"], ["bubbles", false], ["loc", [null, [8, 10], [8, 45]]], 0, 0], ["content", "selectedTag.anchorNode.parentNode.nodeName", ["loc", [null, [12, 6], [12, 52]]], 0, 0, 0, 0], ["attribute", "onkeyup", ["subexpr", "action", ["changeId"], [], ["loc", [null, [null, null], [20, 43]]], 0, 0], 0, 0, 0, 0], ["attribute", "onfocus", ["subexpr", "action", ["parentFieldFocused"], [], ["loc", [null, [null, null], [21, 53]]], 0, 0], 0, 0, 0, 0], ["attribute", "onblur", ["subexpr", "action", ["parentFieldBlurred"], [], ["loc", [null, [null, null], [22, 52]]], 0, 0], 0, 0, 0, 0], ["content", "selectedTag.anchorNode.parentNode.id", ["loc", [null, [23, 10], [23, 50]]], 0, 0, 0, 0], ["element", "action", ["newClass"], ["bubbles", false], ["loc", [null, [28, 40], [28, 75]]], 0, 0], ["element", "action", ["mouseUpOnEdits"], [], ["loc", [null, [35, 23], [35, 50]]], 0, 0], ["content", "model", ["loc", [null, [38, 6], [38, 17]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("page/templates/home", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 0
          }
        },
        "moduleName": "page/templates/home.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "nav-bar", ["loc", [null, [1, 0], [1, 11]]], 0, 0, 0, 0], ["content", "outlet", ["loc", [null, [3, 0], [3, 10]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("page/templates/navtest", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "page/templates/navtest.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0], ["content", "nav-bar", ["loc", [null, [2, 0], [2, 11]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("page/templates/template-tests", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 4
            },
            "end": {
              "line": 6,
              "column": 4
            }
          },
          "moduleName": "page/templates/template-tests.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createUnsafeMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "tag-start", [["get", "node", ["loc", [null, [5, 19], [5, 23]]], 0, 0, 0, 0]], [], ["loc", [null, [5, 6], [5, 26]]], 0, 0]],
        locals: ["node"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 0
          }
        },
        "moduleName": "page/templates/template-tests.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "page");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2, 1]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0], ["block", "each", [["get", "model", ["loc", [null, [4, 12], [4, 17]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [4, 4], [6, 13]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('page/config/environment', ['ember'], function(Ember) {
  var prefix = 'page';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("page/app")["default"].create({"name":"page","version":"0.0.0+bc7addef"});
}

/* jshint ignore:end */
//# sourceMappingURL=page.map
