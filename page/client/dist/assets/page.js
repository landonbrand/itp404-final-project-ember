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
define('page/components/class-list-item', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    shouldBeShown: _ember['default'].computed('className', function () {
      if (this.get("className") == 'selected-region') {
        return false;
      } else {
        return true;
      }
      return true;
    }),
    actions: {
      changeClass: function changeClass() {
        this.get("changeClassFunction")();
      },
      fieldFocused: function fieldFocused(event) {
        this.get("focusFunction")(event);
        return false;
      },
      fieldBlurred: function fieldBlurred(event) {
        this.get("blurFunction")(event);
        return false;
      }
    }
  });
});
define('page/components/class-list', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({});
});
define('page/components/content-editable', ['exports', 'ember-content-editable/components/content-editable'], function (exports, _emberContentEditableComponentsContentEditable) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberContentEditableComponentsContentEditable['default'];
    }
  });
});
define("page/components/css-rules", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    actions: {
      change: function change(event) {
        var ruleName = event.target.previousElementSibling.textContent.trim();
        var selector = event.target.parentNode.children[0].textContent;
        var ruleValue = event.target.textContent;
        ruleName = ruleName.slice(0, -1);
        this.get("changeCssFunction")(selector, ruleName, ruleValue);
      },
      focus: function focus(event) {
        this.get("focusFunction")(event);
      },
      blur: function blur(event) {
        this.get("blurFunction")(event);
      },
      addRuleClicked: function addRuleClicked(event) {
        var selector = event.target.parentNode.children[0].textContent;
        this.get("addCssRuleFunction")(selector);
      },
      addStyleClicked: function addStyleClicked(event) {
        this.get("addCssStyleFunction")();
      },
      removeStyleClicked: function removeStyleClicked(event) {
        var selector = event.target.parentNode.children[0].textContent;
        this.get("removeCssStyleFunction")(selector);
      }
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
define('page/components/tag-id', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tagName: "span",

    changeObserver: _ember['default'].observer('region', function () {
      var node = document.getElementById("tagId-unfocusable");
      node.textContent = this.get("region").anchorElement.id;
    }),

    actions: {
      changeId: function changeId() {
        this.get("changeIdFunction")();
      },
      fieldFocused: function fieldFocused(event) {
        this.get("focusFunction")(event);
        console.log(this.get("region"));
        return false;
      },
      fieldBlurred: function fieldBlurred(event) {
        this.get("blurFunction")(event);
        return false;
      }
    }
  });
});
define('page/components/tag-name', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    _onReady: function _onReady() {
      this.get("region");
    },

    changeObserver: _ember['default'].observer('region', function () {
      var node = document.getElementById("tagName");
      node.textContent = this.get("region").anchorElement.nodeName;
    }),

    tagName: "span",

    actions: {
      keyUp: function keyUp() {
        this.get("changeTagFunction")();
      },
      fieldFocused: function fieldFocused(event) {
        var node = document.getElementById("tagName");
        node.textContent = this.get("region").anchorElement.nodeName;
        this.get("focusFunction")(event);
        return false;
      },
      fieldBlurred: function fieldBlurred(event) {
        this.get("blurFunction")(event);
        var node = document.getElementById("tagName");
        node.textContent = this.get("region").anchorElement.nodeName;
        return false;
      }
    }
  });
});
define('page/controllers/editing-tests', ['exports', 'ember', 'page/components/class-list-item'], function (exports, _ember, _pageComponentsClassListItem) {
  exports['default'] = _ember['default'].Controller.extend({
    selectedRegion: false,
    selectedClasses: [],
    stylesheet: {},

    actions: {
      deselect: function deselect() {
        var elems = document.querySelectorAll(".selected-region");
        [].forEach.call(elems, function (el) {
          el.classList.remove("selected-region");
        });
        this.set("selectedRegion", false);
        return false;
      },

      mouseUpOnEdits: function mouseUpOnEdits() {
        var selected = window.getSelection();
        selected = new Region(selected.anchorNode, selected.extentNode, selected.anchorOffset, selected.extentOffset);
        this.send("selectRegion", selected);
      },

      save: function save() {
        var pageNodes = document.getElementById("edit");
        var selectedNodes = pageNodes.getElementsByClassName("selected-region");

        for (var i = 0; i < selectedNodes.length; i++) {
          selectedNodes[i].classList.remove("selected-region");
        }
        console.log("selectedNodes", selectedNodes);

        var pageContent = pageNodes.innerHTML;
        var styleSheet = document.styleSheets[2];
        var cssArray = [];
        for (var i = 0; i < styleSheet.cssRules.length; i++) {
          cssArray.push(styleSheet.cssRules[i].cssText);
        }
        var pageCSS = cssArray.join(" ");
        console.log("pageCSS: ", pageCSS);

        var htmlData = {
          html: pageContent,
          css: pageCSS
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
        return false;
      },

      newNode: function newNode() {
        var node = insertNode(this.get("selectedRegion"));
        this.send("selectNode", node);
      },

      changeTag: function changeTag() {
        var selectedRegion = this.get("selectedRegion");
        var tagNameElement = document.getElementById("tagName");
        var newNode = changeNodeType(selectedRegion.anchorElement, tagNameElement.innerHTML.replace(/&nbsp;/gi, '').trim());
        this.send("selectNode", newNode);
        Caret.goToEndOfNode(event.target);
        return false;
      },

      changeId: function changeId() {
        var selectedRegion = this.get("selectedRegion");
        var tagIdElement = document.getElementById("tagId-unfocusable");
        tagIdElement.focus();
        selectedRegion.anchorElement.setAttribute("id", tagIdElement.innerHTML.replace(/&nbsp;/gi, '').trim());
        return false;
      },

      fieldFocused: function fieldFocused(event) {
        event.target.classList.add("selected");
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
        var elems = document.querySelectorAll(".selected-region");
        [].forEach.call(elems, function (el) {
          el.classList.remove("selected-region");
        });

        region.anchorElement.classList.add("selected-region");

        this.set("selectedRegion", region);

        this.send("updateClassList", region.anchorElement);
        this.send("updateCssRules", region.anchorElement);
      },

      selectNode: function selectNode(node) {
        var selected = new Region(node, node, 0, 0);
        this.send("selectRegion", selected);
      },

      updateClassList: function updateClassList(node) {
        var classList = [];
        node.classList.forEach(function (val) {
          classList.push({
            name: val
          });
        });
        this.set("selectedClasses", classList);
      },

      updateCssRules: function updateCssRules(node) {
        var newRules = css(node);
        var formattedNewRules = newRules.map(function (val) {
          if (val.selectorText !== ".selected-region") {
            var obj = {};
            obj.selector = val.selectorText;
            obj.rules = [];
            for (var i = 0; i < val.style.length; i++) {
              obj.rules.push({ name: val.style[i] });
              obj.rules[i].value = val.style[obj.rules[i].name];
            }
            return obj;
          }
        });

        formattedNewRules = formattedNewRules.filter(function (n) {
          return n != undefined;
        });
        this.set("selectedCssRules", formattedNewRules);
      },

      changeClass: function changeClass() {
        var region = this.get("selectedRegion");
        var classListItems = _ember['default'].$(".class-list-item");
        var newClass = [];
        for (var i = 0; i < classListItems.length; i++) {
          newClass.push(classListItems[i].textContent.trim());
        }
        region.anchorElement.className = newClass.join(" ");
        return false;
      },

      changeCssRules: function changeCssRules(selector, ruleName, ruleValue) {
        var styleSheet = document.styleSheets[2];
        for (var i = 0; i < styleSheet.cssRules.length; i++) {
          if (styleSheet.cssRules[i].selectorText == selector) {
            if (ruleName == "" || ruleValue == "") {
              styleSheet.cssRules[i].style[camelCase(ruleName)] = "";
              styleSheet.cssRules[i].style.removeProperty(camelCase(ruleName));
              console.log("tryna delete this shi");
            } else {
              styleSheet.cssRules[i].style[camelCase(ruleName)] = ruleValue;
            }
          }
        }
      },

      addClass: function addClass() {
        var region = this.get("selectedRegion");
        region.anchorElement.className = region.anchorElement.className + " new-class";
        this.set("selectedRegion", region);
        this.send("updateClassList", this.get("selectedRegion").anchorElement);
      },

      addCssRule: function addCssRule(selector) {
        var styleSheet = document.styleSheets[2];
        for (var i = 0; i < styleSheet.cssRules.length; i++) {
          if (styleSheet.cssRules[i].selectorText == selector) {
            styleSheet.cssRules[i].style.setProperty("counter-reset", "value");
            console.log("style: ", styleSheet.cssRules[i].style);
            break;
          }
        }

        console.log("cssRules: ", styleSheet.cssRules);
        this.send("updateCssRules", this.get("selectedRegion").anchorElement);
        console.log("adding Css Rule!");
      },

      selectParentNode: function selectParentNode() {
        var region = this.get("selectedRegion");
        if (region.anchorElement.parentNode.id != "edit") {
          this.send("selectNode", region.anchorElement.parentNode);
        }
      },

      addCssStyle: function addCssStyle() {
        console.log("adding CSS Style!!!");
        var sheet = document.styleSheets[2];
        var region = this.get("selectedRegion");
        var selector = region.anchorElement.nodeName;
        for (var i = 0; i < region.anchorElement.classList.length; i++) {
          if (!(region.anchorElement.classList[i] == 'selected-region')) {
            selector += ".";
            selector += region.anchorElement.classList[i];
          }
        }
        console.log("selector: ", selector);
        sheet.addRule(selector, "color: red", 1);
        this.send("updateCssRules", this.get("selectedRegion").anchorElement);
        console.log("Sheet:", document.styleSheets[2]);
      },

      removeCssStyle: function removeCssStyle(selector) {
        console.log('removing!');
        var styleSheet = document.styleSheets[2];
        for (var i = 0; i < styleSheet.cssRules.length; i++) {
          if (styleSheet.cssRules[i].selectorText == selector) {
            console.log("styleSheet from remove:", styleSheet);
            styleSheet.deleteRule(i);
          }
        }
        this.send("updateCssRules", this.get("selectedRegion").anchorElement);
      },

      deleteCurrentNode: function deleteCurrentNode() {
        var region = this.get("selectedRegion");
        var element = region.anchorElement;
        this.send("selectNode", region.anchorElement.parentNode);
        element.outerHTML = "";
      }
    },

    modelObserver: _ember['default'].observer('model', function () {
      var edit = document.getElementById("edit");
      if (edit != null) {
        edit.innerHTML = this.get("model");
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
    do {
      new_element.appendChild(element.firstChild);
    } while (element.firstChild);

    // replace element
    element.parentNode.replaceChild(new_element, element);
    return new_element;
  }

  function insertNode(selectedNode) {
    var new_element;
    // create a node after selectedNode
    if (selectedNode.extentNode.length <= selectedNode.extentOffset) {
      new_element = document.createElement("h6");
      new_element.textContent = "new element";
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
          if (selectedNode.extentNode == selectedNode.anchorNode) {
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

  document.onkeyup = function (e) {
    console.log("keyup: ", e.keyCode);
    if (e.keyCode == 27) {
      var controller = Page.__container__.lookup("controller:editing-tests");
      var boundSend = controller.send.bind(controller);
      boundSend('deselect');
    }
  };

  document.addEventListener("keydown", function (e) {
    if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();
      var controller = Page.__container__.lookup("controller:editing-tests");
      var boundSend = controller.send.bind(controller);
      boundSend('save');
      console.log("saved");
    }
  }, false);

  var CssPage = function CssPage() {
    var styleElement = document.createElement('style');
    document.head.appendChild(styleElement);
    this.setDocument = function (string) {
      styleElement.innerHTML = string;
    };
  };

  var cssPage = new CssPage();

  var promise = $.ajax({
    url: "http://localhost:3000/api/spoofhtml",
    type: 'get'
  });
  promise.then(function (response) {
    console.log("response's css: ", response);
    cssPage.setDocument(response.css);
  });

  function css(a) {
    var sheets = document.styleSheets,
        o = [];
    a.matches = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector || a.oMatchesSelector;
    for (var i in sheets) {
      var rules = sheets[i].rules || sheets[i].cssRules;
      for (var r in rules) {
        if (a.matches(rules[r].selectorText)) {
          o.push(rules[r]);
        }
      }
    }
    return o;
  }

  var camelCase = function camelCase(str) {
    console.log("str: ", str);
    return str.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });
  };
});
define("page/helpers/class-id", ["exports", "ember"], function (exports, _ember) {
  exports.classId = classId;

  function classId(params) {

    return "class-id-" + params;
  }

  exports["default"] = _ember["default"].Helper.helper(classId);
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
    this.route('home', { path: "/" });
    this.route('create');
    this.route('template-tests');
    this.route('editing-tests');
    this.route('login');
    this.route('signup');
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
define('page/routes/login', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('page/routes/navtest', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define("page/routes/signup", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    model: function model() {
      console.log("model running");
      var promise = _ember["default"].$.ajax({
        url: "http://192.241.235.59:1111/api/getuser",
        type: 'get'
      });
      return "hi";
    },
    actions: {
      authenticateUser: function authenticateUser() {
        console.log("Authenticating...");
        window.open("http://192.241.235.59:1111/auth/github");
        var promise = _ember["default"].$.ajax({
          url: "http://192.241.235.59:1111/api/getuser",
          type: 'get',
          success: function success(res) {
            console.log(res);
          }
        });
      }
    }
  });

  jQuery.getCORS = function (url, callback) {
    if (callback == undefined) callback = function () {};
    return $.ajax({
      type: 'GET',
      url: url,
      contentType: 'application/x-www-form-urlencoded',
      // xhrFields: {
      //   withCredentials: true
      // },
      success: function success(res) {
        callback(res);
      }, error: function error() {
        console.log("ERROR on jQuery.getCORS");
        callback({});
      }
    });
  };
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
define("page/templates/components/class-list-item", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 11,
              "column": 0
            }
          },
          "moduleName": "page/templates/components/class-list-item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "class", "field class-list-item");
          dom.setAttribute(el1, "contenteditable", "true");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(5);
          morphs[0] = dom.createAttrMorph(element0, 'id');
          morphs[1] = dom.createAttrMorph(element0, 'onkeyup');
          morphs[2] = dom.createAttrMorph(element0, 'onfocus');
          morphs[3] = dom.createAttrMorph(element0, 'onblur');
          morphs[4] = dom.createMorphAt(element0, 1, 1);
          return morphs;
        },
        statements: [["attribute", "id", ["subexpr", "class-id", [["get", "className", ["loc", [null, [4, 22], [4, 31]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [4, 33]]], 0, 0], 0, 0, 0, 0], ["attribute", "onkeyup", ["subexpr", "action", ["changeClass"], [], ["loc", [null, [null, null], [6, 40]]], 0, 0], 0, 0, 0, 0], ["attribute", "onfocus", ["subexpr", "action", ["fieldFocused"], [], ["loc", [null, [null, null], [7, 41]]], 0, 0], 0, 0, 0, 0], ["attribute", "onblur", ["subexpr", "action", ["fieldBlurred"], [], ["loc", [null, [null, null], [8, 40]]], 0, 0], 0, 0, 0, 0], ["content", "className", ["loc", [null, [9, 4], [9, 17]]], 0, 0, 0, 0]],
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
            "line": 12,
            "column": 0
          }
        },
        "moduleName": "page/templates/components/class-list-item.hbs"
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
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]], 0, 0, 0, 0], ["block", "if", [["get", "shouldBeShown", ["loc", [null, [2, 6], [2, 19]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [2, 0], [11, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("page/templates/components/class-list", ["exports"], function (exports) {
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
              "line": 9,
              "column": 2
            }
          },
          "moduleName": "page/templates/components/class-list.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "class-list-item", [], ["className", ["subexpr", "@mut", [["get", "item.name", ["loc", [null, [4, 32], [4, 41]]], 0, 0, 0, 0]], [], [], 0, 0], "focusFunction", ["subexpr", "@mut", [["get", "focusFunction", ["loc", [null, [5, 36], [5, 49]]], 0, 0, 0, 0]], [], [], 0, 0], "blurFunction", ["subexpr", "@mut", [["get", "blurFunction", ["loc", [null, [6, 35], [6, 47]]], 0, 0, 0, 0]], [], [], 0, 0], "changeClassFunction", ["subexpr", "@mut", [["get", "changeClassFunction", ["loc", [null, [7, 42], [7, 61]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [4, 4], [8, 6]]], 0, 0]],
        locals: ["item"],
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
            "line": 12,
            "column": 0
          }
        },
        "moduleName": "page/templates/components/class-list.hbs"
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
        dom.setAttribute(el1, "id", "classlist");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]], 0, 0, 0, 0], ["block", "each", [["get", "list", ["loc", [null, [3, 10], [3, 14]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [3, 2], [9, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("page/templates/components/css-rules", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "revision": "Ember@2.8.2",
            "loc": {
              "source": null,
              "start": {
                "line": 9,
                "column": 6
              },
              "end": {
                "line": 25,
                "column": 6
              }
            },
            "moduleName": "page/templates/components/css-rules.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "contenteditable", "true");
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode(":\n        ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "field");
            dom.setAttribute(el1, "contenteditable", "true");
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("br");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var element1 = dom.childAt(fragment, [3]);
            var morphs = new Array(9);
            morphs[0] = dom.createAttrMorph(element0, 'id');
            morphs[1] = dom.createAttrMorph(element0, 'onkeyup');
            morphs[2] = dom.createAttrMorph(element0, 'onfocus');
            morphs[3] = dom.createAttrMorph(element0, 'onblur');
            morphs[4] = dom.createMorphAt(element0, 1, 1);
            morphs[5] = dom.createAttrMorph(element1, 'onkeyup');
            morphs[6] = dom.createAttrMorph(element1, 'onfocus');
            morphs[7] = dom.createAttrMorph(element1, 'onblur');
            morphs[8] = dom.createMorphAt(element1, 1, 1);
            return morphs;
          },
          statements: [["attribute", "id", ["subexpr", "class-id", [["get", "rule.name", ["loc", [null, [10, 28], [10, 37]]], 0, 0, 0, 0]], [], ["loc", [null, [null, null], [10, 39]]], 0, 0], 0, 0, 0, 0], ["attribute", "onkeyup", ["subexpr", "action", ["change"], [], ["loc", [null, [null, null], [12, 41]]], 0, 0], 0, 0, 0, 0], ["attribute", "onfocus", ["subexpr", "action", ["focus"], [], ["loc", [null, [null, null], [13, 40]]], 0, 0], 0, 0, 0, 0], ["attribute", "onblur", ["subexpr", "action", ["blur"], [], ["loc", [null, [null, null], [14, 38]]], 0, 0], 0, 0, 0, 0], ["content", "rule.name", ["loc", [null, [15, 10], [15, 23]]], 0, 0, 0, 0], ["attribute", "onkeyup", ["subexpr", "action", ["change"], [], ["loc", [null, [null, null], [19, 41]]], 0, 0], 0, 0, 0, 0], ["attribute", "onfocus", ["subexpr", "action", ["focus"], [], ["loc", [null, [null, null], [20, 40]]], 0, 0], 0, 0, 0, 0], ["attribute", "onblur", ["subexpr", "action", ["blur"], [], ["loc", [null, [null, null], [21, 38]]], 0, 0], 0, 0, 0, 0], ["content", "rule.value", ["loc", [null, [22, 10], [22, 24]]], 0, 0, 0, 0]],
          locals: ["rule"],
          templates: []
        };
      })();
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
              "line": 30,
              "column": 2
            }
          },
          "moduleName": "page/templates/components/css-rules.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "field-group");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("span");
          var el3 = dom.createElement("b");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("button");
          dom.setAttribute(el2, "class", "add-css-rule");
          var el3 = dom.createTextNode("add rule");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("button");
          dom.setAttribute(el2, "class", "add-css-rule bg-red");
          var el3 = dom.createTextNode("remove this style");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element2 = dom.childAt(fragment, [1]);
          var element3 = dom.childAt(element2, [7]);
          var element4 = dom.childAt(element2, [9]);
          var morphs = new Array(4);
          morphs[0] = dom.createMorphAt(dom.childAt(element2, [1, 0]), 0, 0);
          morphs[1] = dom.createMorphAt(element2, 5, 5);
          morphs[2] = dom.createAttrMorph(element3, 'onclick');
          morphs[3] = dom.createAttrMorph(element4, 'onclick');
          return morphs;
        },
        statements: [["content", "style.selector", ["loc", [null, [7, 15], [7, 33]]], 0, 0, 0, 0], ["block", "each", [["get", "style.rules", ["loc", [null, [9, 14], [9, 25]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [9, 6], [25, 15]]]], ["attribute", "onclick", ["subexpr", "action", ["addRuleClicked"], [], ["loc", [null, [null, null], [26, 70]]], 0, 0], 0, 0, 0, 0], ["attribute", "onclick", ["subexpr", "action", ["removeStyleClicked"], [], ["loc", [null, [null, null], [27, 81]]], 0, 0], 0, 0, 0, 0]],
        locals: ["style"],
        templates: [child0]
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
            "line": 33,
            "column": 0
          }
        },
        "moduleName": "page/templates/components/css-rules.hbs"
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
        var el1 = dom.createElement("section");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "class", "add-css-rule padding-6");
        var el3 = dom.createTextNode("add style");
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
        var element5 = dom.childAt(fragment, [2]);
        var element6 = dom.childAt(element5, [7]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(element5, 5, 5);
        morphs[2] = dom.createAttrMorph(element6, 'onclick');
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]], 0, 0, 0, 0], ["block", "each", [["get", "list", ["loc", [null, [5, 10], [5, 14]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [5, 2], [30, 11]]]], ["attribute", "onclick", ["subexpr", "action", ["addStyleClicked"], [], ["loc", [null, [null, null], [31, 77]]], 0, 0], 0, 0, 0, 0]],
      locals: [],
      templates: [child0]
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
              "column": 30
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
          var el1 = dom.createTextNode("Sign Up");
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
          var el1 = dom.createTextNode("login");
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
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]], 0, 0, 0, 0], ["block", "link-to", ["home"], [], 0, null, ["loc", [null, [3, 2], [3, 37]]]], ["block", "link-to", ["signup"], [], 1, null, ["loc", [null, [4, 2], [4, 42]]]], ["block", "link-to", ["login"], [], 2, null, ["loc", [null, [5, 2], [5, 39]]]]],
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
define("page/templates/components/tag-id", ["exports"], function (exports) {
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
            "line": 14,
            "column": 0
          }
        },
        "moduleName": "page/templates/components/tag-id.hbs"
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
        var el1 = dom.createElement("span");
        dom.setAttribute(el1, "id", "tagId");
        dom.setAttribute(el1, "class", "field");
        dom.setAttribute(el1, "contenteditable", "false");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        dom.setAttribute(el2, "class", "no-padding");
        var el3 = dom.createTextNode("#");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        dom.setAttribute(el2, "id", "tagId-unfocusable");
        dom.setAttribute(el2, "tabindex", "-1");
        dom.setAttribute(el2, "class", "no-padding no-focus");
        dom.setAttribute(el2, "contenteditable", "true");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 3]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createAttrMorph(element0, 'onkeyup');
        morphs[2] = dom.createAttrMorph(element0, 'onfocus');
        morphs[3] = dom.createAttrMorph(element0, 'onblur');
        morphs[4] = dom.createMorphAt(element0, 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]], 0, 0, 0, 0], ["attribute", "onkeyup", ["subexpr", "action", ["changeId"], [], ["loc", [null, [null, null], [8, 39]]], 0, 0], 0, 0, 0, 0], ["attribute", "onfocus", ["subexpr", "action", ["fieldFocused"], [], ["loc", [null, [null, null], [9, 43]]], 0, 0], 0, 0, 0, 0], ["attribute", "onblur", ["subexpr", "action", ["fieldBlurred"], [], ["loc", [null, [null, null], [10, 42]]], 0, 0], 0, 0, 0, 0], ["content", "region.anchorElement.id", ["loc", [null, [11, 6], [11, 33]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("page/templates/components/tag-name", ["exports"], function (exports) {
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
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "page/templates/components/tag-name.hbs"
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
        var el1 = dom.createElement("span");
        dom.setAttribute(el1, "id", "tagName");
        dom.setAttribute(el1, "class", "field big");
        dom.setAttribute(el1, "contenteditable", "true");
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
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createAttrMorph(element0, 'onkeyup');
        morphs[2] = dom.createAttrMorph(element0, 'onfocus');
        morphs[3] = dom.createAttrMorph(element0, 'onblur');
        morphs[4] = dom.createMorphAt(element0, 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]], 0, 0, 0, 0], ["attribute", "onkeyup", ["subexpr", "action", ["keyUp"], [], ["loc", [null, [null, null], [5, 32]]], 0, 0], 0, 0, 0, 0], ["attribute", "onfocus", ["subexpr", "action", ["fieldFocused"], [], ["loc", [null, [null, null], [6, 39]]], 0, 0], 0, 0, 0, 0], ["attribute", "onblur", ["subexpr", "action", ["fieldBlurred"], [], ["loc", [null, [null, null], [7, 38]]], 0, 0], 0, 0, 0, 0], ["content", "region.anchorElement.nodeName", ["loc", [null, [8, 2], [8, 35]]], 0, 0, 0, 0]],
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
              "line": 36,
              "column": 2
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
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("section");
          dom.setAttribute(el1, "id", "sidebar-top");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("button");
          dom.setAttribute(el2, "id", "viewRoot");
          dom.setAttribute(el2, "class", "up");
          var el3 = dom.createTextNode("up");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("button");
          dom.setAttribute(el2, "id", "viewRoot");
          dom.setAttribute(el2, "class", "up");
          var el3 = dom.createTextNode("deleteNode");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("button");
          dom.setAttribute(el2, "id", "newNode");
          var el3 = dom.createTextNode("create tag");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("section");
          dom.setAttribute(el1, "id", "sidebar-classes");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("button");
          dom.setAttribute(el2, "id", "newClass");
          dom.setAttribute(el2, "class", "class");
          var el3 = dom.createTextNode("add class");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var element2 = dom.childAt(element0, [3]);
          var element3 = dom.childAt(element0, [7]);
          var element4 = dom.childAt(fragment, [3]);
          var element5 = dom.childAt(element4, [1]);
          var morphs = new Array(8);
          morphs[0] = dom.createElementMorph(element1);
          morphs[1] = dom.createElementMorph(element2);
          morphs[2] = dom.createElementMorph(element3);
          morphs[3] = dom.createMorphAt(element0, 9, 9);
          morphs[4] = dom.createMorphAt(element0, 11, 11);
          morphs[5] = dom.createElementMorph(element5);
          morphs[6] = dom.createMorphAt(element4, 3, 3);
          morphs[7] = dom.createMorphAt(fragment, 5, 5, contextualElement);
          return morphs;
        },
        statements: [["element", "action", ["selectParentNode"], [], ["loc", [null, [5, 39], [5, 68]]], 0, 0], ["element", "action", ["deleteCurrentNode"], [], ["loc", [null, [6, 39], [6, 69]]], 0, 0], ["element", "action", ["newNode"], ["bubbles", false], ["loc", [null, [8, 27], [8, 61]]], 0, 0], ["inline", "tag-name", [], ["changeTagFunction", ["subexpr", "action", ["changeTag"], [], ["loc", [null, [9, 36], [9, 56]]], 0, 0], "focusFunction", ["subexpr", "action", ["fieldFocused"], [], ["loc", [null, [10, 32], [10, 55]]], 0, 0], "blurFunction", ["subexpr", "action", ["fieldBlurred"], [], ["loc", [null, [11, 31], [11, 54]]], 0, 0], "region", ["subexpr", "@mut", [["get", "selectedRegion", ["loc", [null, [12, 25], [12, 39]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [9, 6], [13, 8]]], 0, 0], ["inline", "tag-id", [], ["changeIdFunction", ["subexpr", "action", ["changeId"], [], ["loc", [null, [14, 35], [14, 54]]], 0, 0], "focusFunction", ["subexpr", "action", ["parentFieldFocused"], [], ["loc", [null, [15, 32], [15, 61]]], 0, 0], "blurFunction", ["subexpr", "action", ["parentFieldBlurred"], [], ["loc", [null, [16, 31], [16, 60]]], 0, 0], "region", ["subexpr", "@mut", [["get", "selectedRegion", ["loc", [null, [17, 25], [17, 39]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [14, 6], [18, 8]]], 0, 0], ["element", "action", ["addClass"], ["bubbles", false], ["loc", [null, [21, 42], [21, 77]]], 0, 0], ["inline", "class-list", [], ["list", ["subexpr", "@mut", [["get", "selectedClasses", ["loc", [null, [22, 25], [22, 40]]], 0, 0, 0, 0]], [], [], 0, 0], "focusFunction", ["subexpr", "action", ["fieldFocused"], [], ["loc", [null, [23, 34], [23, 57]]], 0, 0], "blurFunction", ["subexpr", "action", ["fieldBlurred"], [], ["loc", [null, [24, 33], [24, 56]]], 0, 0], "changeClassFunction", ["subexpr", "action", ["changeClass"], [], ["loc", [null, [25, 40], [25, 62]]], 0, 0]], ["loc", [null, [22, 6], [26, 8]]], 0, 0], ["inline", "css-rules", [], ["list", ["subexpr", "@mut", [["get", "selectedCssRules", ["loc", [null, [28, 21], [28, 37]]], 0, 0, 0, 0]], [], [], 0, 0], "focusFunction", ["subexpr", "action", ["fieldFocused"], [], ["loc", [null, [29, 30], [29, 53]]], 0, 0], "blurFunction", ["subexpr", "action", ["fieldBlurred"], [], ["loc", [null, [30, 29], [30, 52]]], 0, 0], "changeCssFunction", ["subexpr", "action", ["changeCssRules"], [], ["loc", [null, [31, 34], [31, 59]]], 0, 0], "addCssRuleFunction", ["subexpr", "action", ["addCssRule"], [], ["loc", [null, [32, 35], [32, 56]]], 0, 0], "addCssStyleFunction", ["subexpr", "action", ["addCssStyle"], [], ["loc", [null, [33, 36], [33, 58]]], 0, 0], "removeCssStyleFunction", ["subexpr", "action", ["removeCssStyle"], [], ["loc", [null, [34, 39], [34, 64]]], 0, 0]], ["loc", [null, [28, 4], [35, 6]]], 0, 0]],
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
              "line": 36,
              "column": 2
            },
            "end": {
              "line": 37,
              "column": 2
            }
          },
          "moduleName": "page/templates/editing-tests.hbs"
        },
        isEmpty: true,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
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
            "line": 47,
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
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
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
        var element6 = dom.childAt(fragment, [4]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        morphs[2] = dom.createElementMorph(element6);
        morphs[3] = dom.createUnsafeMorphAt(dom.childAt(element6, [1, 1]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0], ["block", "if", [["get", "selectedRegion", ["loc", [null, [3, 8], [3, 22]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [3, 2], [37, 9]]]], ["element", "action", ["mouseUpOnEdits"], [], ["loc", [null, [40, 23], [40, 50]]], 0, 0], ["content", "model", ["loc", [null, [43, 6], [43, 17]]], 0, 0, 0, 0]],
      locals: [],
      templates: [child0, child1]
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
            "line": 15,
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
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "main-site");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "centerizer");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("section");
        dom.setAttribute(el3, "class", "limit-width centered");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h1");
        dom.setAttribute(el4, "class", "main-heading");
        var el5 = dom.createTextNode("Page");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h2");
        var el5 = dom.createTextNode("Spend more time building and less time writing code.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("Page is a web application that allows you to create and edit HTML and CSS documents online with an intuitive interface. ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "centerizer pad-top");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        var el6 = dom.createTextNode("Get Started");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
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
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2, 1]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0], ["content", "nav-bar", ["loc", [null, [4, 4], [4, 15]]], 0, 0, 0, 0]],
      locals: [],
      templates: []
    };
  })());
});
define("page/templates/login", ["exports"], function (exports) {
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
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "page/templates/login.hbs"
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
        dom.setAttribute(el1, "id", "main-site");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "centerizer");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("section");
        dom.setAttribute(el3, "class", "limit-width centered");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("login");
        dom.appendChild(el4, el5);
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
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2, 1]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0], ["content", "nav-bar", ["loc", [null, [4, 4], [4, 15]]], 0, 0, 0, 0]],
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
define("page/templates/signup", ["exports"], function (exports) {
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
        "moduleName": "page/templates/signup.hbs"
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
        dom.setAttribute(el1, "id", "main-site");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "centerizer");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("section");
        dom.setAttribute(el3, "class", "limit-width centered");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("h1");
        dom.setAttribute(el4, "class", "main-heading");
        var el5 = dom.createTextNode("Sign Up");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "centerizer pad-top");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        var el6 = dom.createTextNode("Name");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("input");
        dom.setAttribute(el5, "type", "text");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        var el6 = dom.createTextNode("Sign Up with Github");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        var el6 = dom.createTextNode("User: ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
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
        var element0 = dom.childAt(fragment, [2, 1]);
        var element1 = dom.childAt(element0, [3, 3]);
        var element2 = dom.childAt(element1, [11]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(element0, 1, 1);
        morphs[2] = dom.createElementMorph(element2);
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [15]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0], ["content", "nav-bar", ["loc", [null, [4, 4], [4, 15]]], 0, 0, 0, 0], ["element", "action", ["authenticateUser"], [], ["loc", [null, [13, 16], [13, 45]]], 0, 0], ["content", "model", ["loc", [null, [15, 20], [15, 29]]], 0, 0, 0, 0]],
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
  require("page/app")["default"].create({"name":"page","version":"0.0.0+827dd37f"});
}

/* jshint ignore:end */
//# sourceMappingURL=page.map
