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
      if (this.get("className") === 'selected-region') {
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
      addStyleClicked: function addStyleClicked() {
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
define('page/controllers/dashboard', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({

    auth0: new Auth0({
      domain: 'landonbrand.auth0.com',
      clientID: 'JLAa4IzlUImrFFUqkri3OFyeCRgDArox',
      callbackURL: 'http://localhost:4200/dashboard',
      responseType: 'token'
    }),

    isLoggedIn: _ember['default'].computed('auth0', function () {
      var auth0 = this.get("auth0");
      var result = auth0.parseHash(window.location.hash);
      if (result != null) {
        return true;
      } else {
        return false;
      }
    }),

    nickname: "",
    pages: [],

    init: function init() {

      var auth0 = this.get("auth0");
      var result = auth0.parseHash(window.location.hash);
      var _this = this;

      if (result && result.idToken) {
        auth0.getProfile(result.idToken, function (err, profile) {
          _this.set("nickname", profile.nickname);
          var obj = { nickname: _this.get("nickname") };
          var promise = _ember['default'].$.ajax({
            url: "http://192.241.235.59:1111/api/getuserspages",
            data: obj,
            dataType: "text",
            type: 'get'
          });
          return promise.then(function (response) {
            _this.set("pages", JSON.parse(response).pages);
          });
        });
      }
    },
    actions: {

      authenticateUser: function authenticateUser(e) {
        this.get("auth0").login({
          connection: 'github'
        }, function (err) {
          if (err) return alert('Something went wrong: ' + err.message);
          return alert('success signup without login!');
        });
      },

      getPages: function getPages(_this) {
        var obj = { nickname: _this.get("nickname") };
        var promise = _ember['default'].$.ajax({
          url: "http://192.241.235.59:1111/api/getuserspages",
          data: obj,
          dataType: "text",
          type: 'get'
        });
        return promise.then(function (response) {
          _this.set("pages", JSON.parse(response).pages);
        });
      },

      addPage: function addPage() {
        var pageToAdd = document.getElementById("page-to-add");
        var _this = this;
        var data = {
          nickname: this.get("nickname"),
          page: document.getElementById("page-to-add").value
        };
        var promise = _ember['default'].$.post({
          url: "http://192.241.235.59:1111/api/addUsersPage",
          data: JSON.stringify(data),
          dataType: "text"
        });
        promise.then(function (response) {
          _this.send("getPages", _this);
        });
      }
    }
  });
});
define("page/controllers/page", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({
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

        var pageContent = pageNodes.innerHTML;
        var styleSheet = document.styleSheets[2];
        var cssArray = [];
        var pageCSS;
        if (styleSheet.cssRules != null) {
          for (i = 0; i < styleSheet.cssRules.length; i++) {
            cssArray.push(styleSheet.cssRules[i].cssText);
          }
          pageCSS = cssArray.join(" ");
        }
        var htmlData = {
          name: this.get("model").name,
          html: pageContent,
          css: pageCSS
        };
        var promise = _ember["default"].$.post({
          url: "http://192.241.235.59:1111/api/setPage",
          data: JSON.stringify(htmlData),
          dataType: "text"
        });
        promise.then(function (response) {});
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
          return n !== undefined;
        });
        this.set("selectedCssRules", formattedNewRules);
      },

      changeClass: function changeClass() {
        var region = this.get("selectedRegion");
        var classListItems = _ember["default"].$(".class-list-item");
        var newClass = [];
        for (var i = 0; i < classListItems.length; i++) {
          newClass.push(classListItems[i].textContent.trim());
        }
        region.anchorElement.className = newClass.join(" ");
        return false;
      },

      changeCssRules: function changeCssRules(selector, ruleName, ruleValue) {
        var styleSheet = document.styleSheets[3];
        for (var i = 0; i < styleSheet.cssRules.length; i++) {
          if (styleSheet.cssRules[i].selectorText === selector) {
            if (ruleName === "" || ruleValue === "") {
              styleSheet.cssRules[i].style[camelCase(ruleName)] = "";
              styleSheet.cssRules[i].style.removeProperty(camelCase(ruleName));
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
          if (styleSheet.cssRules[i].selectorText === selector) {
            styleSheet.cssRules[i].style.setProperty("counter-reset", "value");
            break;
          }
        }

        this.send("updateCssRules", this.get("selectedRegion").anchorElement);
      },

      selectParentNode: function selectParentNode() {
        var region = this.get("selectedRegion");
        if (region.anchorElement.parentNode.id !== "edit") {
          this.send("selectNode", region.anchorElement.parentNode);
        }
      },

      addCssStyle: function addCssStyle() {
        var sheet = document.styleSheets[3];
        var region = this.get("selectedRegion");
        var selector = region.anchorElement.nodeName;
        for (var i = 0; i < region.anchorElement.classList.length; i++) {
          if (region.anchorElement.classList[i] !== 'selected-region') {
            selector += ".";
            selector += region.anchorElement.classList[i];
          }
        }
        sheet.addRule(selector, "color: red", 0);
        this.send("updateCssRules", this.get("selectedRegion").anchorElement);
      },

      removeCssStyle: function removeCssStyle(selector) {
        var styleSheet = document.styleSheets[3];
        for (var i = 0; i < styleSheet.cssRules.length; i++) {
          if (styleSheet.cssRules[i].selectorText === selector) {
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

    modelObserver: _ember["default"].observer('model', function () {
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
    } else if (selectedNode.extentOffset === 0) {
        new_element = document.createElement("h6");
        new_element.textContent = "new element";
        var parent = selectedNode.extentNode.parentNode;
        parent.parentNode.insertBefore(new_element, parent);
        // create a node inside selectedNode
      } else {
          var selectedAnchor = selectedNode.anchorNode;
          if (selectedNode.extentNode === selectedNode.anchorNode) {
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

  function Region(anchorNode, extentNode, anchorOffset, extentOffset) {
    this.anchorNode = anchorNode;
    this.extentNode = extentNode;
    this.anchorOffset = anchorOffset;
    this.extentOffset = extentOffset;
    if (anchorNode.nodeName === "#text") {
      this.anchorElement = anchorNode.parentNode;
    } else {
      this.anchorElement = anchorNode;
    }
    if (extentNode.nodeName === "#text") {
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
    if (e.keyCode === 27) {
      var controller = Page.__container__.lookup("controller:editing-tests");
      var boundSend = controller.send.bind(controller);
      boundSend('deselect');
    }
  };

  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();
      var controller = Page.__container__.lookup("controller:page");
      var boundSend = controller.send.bind(controller);
      boundSend('save');
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
    this.route('home', { path: "/" });
    this.route('page', { path: '/page/:page_name' });
    this.route('dashboard');
  });

  exports['default'] = Router;
});
define('page/routes/dashboard', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('page/routes/home', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('page/routes/page', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      var promise = _ember['default'].$.ajax({
        url: "http://192.241.235.59:1111/api/getPage",
        data: { name: params.page_name },
        type: 'get'
      });
      return promise.then(function (response) {
        return response;
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
define('page/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
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
              "column": 35
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
          var el1 = dom.createTextNode("Dashboard");
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
            "line": 6,
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
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(element0, 1, 1);
        morphs[2] = dom.createMorphAt(element0, 3, 3);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]], 0, 0, 0, 0], ["block", "link-to", ["home"], [], 0, null, ["loc", [null, [3, 2], [3, 37]]]], ["block", "link-to", ["dashboard"], [], 1, null, ["loc", [null, [4, 2], [4, 47]]]]],
      locals: [],
      templates: [child0, child1]
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
define("page/templates/dashboard", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "revision": "Ember@2.8.2",
              "loc": {
                "source": null,
                "start": {
                  "line": 12,
                  "column": 12
                },
                "end": {
                  "line": 12,
                  "column": 45
                }
              },
              "moduleName": "page/templates/dashboard.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
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
            statements: [["content", "page", ["loc", [null, [12, 37], [12, 45]]], 0, 0, 0, 0]],
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
                "line": 11,
                "column": 10
              },
              "end": {
                "line": 14,
                "column": 10
              }
            },
            "moduleName": "page/templates/dashboard.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("            ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n            ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("br");
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
          statements: [["block", "link-to", ["page", ["get", "page", ["loc", [null, [12, 30], [12, 34]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [12, 12], [12, 57]]]]],
          locals: ["page"],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 6
            },
            "end": {
              "line": 19,
              "column": 6
            }
          },
          "moduleName": "page/templates/dashboard.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h1");
          var el2 = dom.createTextNode("Dashboard");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("p");
          var el2 = dom.createTextNode("Welcome back, ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("\n          ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h3");
          var el3 = dom.createTextNode("My Pages:");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("        ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("input");
          dom.setAttribute(el1, "id", "page-to-add");
          dom.setAttribute(el1, "class", "no-margin");
          dom.setAttribute(el1, "value", "Add a new page");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          var el2 = dom.createTextNode(" Add page ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [9]);
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [3]), 1, 1);
          morphs[1] = dom.createMorphAt(dom.childAt(fragment, [5]), 3, 3);
          morphs[2] = dom.createElementMorph(element1);
          return morphs;
        },
        statements: [["content", "nickname", ["loc", [null, [8, 25], [8, 37]]], 0, 0, 0, 0], ["block", "each", [["get", "pages", ["loc", [null, [11, 18], [11, 23]]], 0, 0, 0, 0]], [], 0, null, ["loc", [null, [11, 10], [14, 19]]]], ["element", "action", ["addPage"], [], ["loc", [null, [17, 16], [17, 36]]], 0, 0]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 6
            },
            "end": {
              "line": 25,
              "column": 6
            }
          },
          "moduleName": "page/templates/dashboard.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h1");
          dom.setAttribute(el1, "class", "main-heading");
          var el2 = dom.createTextNode("Log In");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "centerizer pad-top");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("button");
          dom.setAttribute(el2, "class", "signup-db");
          var el3 = dom.createTextNode("Log In with Github");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [5, 1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [["element", "action", ["authenticateUser"], [], ["loc", [null, [23, 34], [23, 63]]], 0, 0]],
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
            "line": 29,
            "column": 0
          }
        },
        "moduleName": "page/templates/dashboard.hbs"
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
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("    ");
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
        var element2 = dom.childAt(fragment, [2, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(element2, 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [3]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0], ["content", "nav-bar", ["loc", [null, [4, 4], [4, 15]]], 0, 0, 0, 0], ["block", "if", [["get", "isLoggedIn", ["loc", [null, [6, 12], [6, 22]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [6, 6], [25, 13]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("page/templates/home", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 17
            },
            "end": {
              "line": 10,
              "column": 52
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
          var el1 = dom.createTextNode("Get Started");
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
        var el6 = dom.createTextNode(" ");
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
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(element0, 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [3, 7, 1]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0], ["content", "nav-bar", ["loc", [null, [4, 4], [4, 15]]], 0, 0, 0, 0], ["block", "link-to", ["dashboard"], [], 0, null, ["loc", [null, [10, 17], [10, 64]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("page/templates/page", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
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
              "line": 38,
              "column": 2
            }
          },
          "moduleName": "page/templates/page.hbs"
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
        statements: [["element", "action", ["selectParentNode"], [], ["loc", [null, [7, 39], [7, 68]]], 0, 0], ["element", "action", ["deleteCurrentNode"], [], ["loc", [null, [8, 39], [8, 69]]], 0, 0], ["element", "action", ["newNode"], ["bubbles", false], ["loc", [null, [10, 27], [10, 61]]], 0, 0], ["inline", "tag-name", [], ["changeTagFunction", ["subexpr", "action", ["changeTag"], [], ["loc", [null, [11, 36], [11, 56]]], 0, 0], "focusFunction", ["subexpr", "action", ["fieldFocused"], [], ["loc", [null, [12, 32], [12, 55]]], 0, 0], "blurFunction", ["subexpr", "action", ["fieldBlurred"], [], ["loc", [null, [13, 31], [13, 54]]], 0, 0], "region", ["subexpr", "@mut", [["get", "selectedRegion", ["loc", [null, [14, 25], [14, 39]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [11, 6], [15, 8]]], 0, 0], ["inline", "tag-id", [], ["changeIdFunction", ["subexpr", "action", ["changeId"], [], ["loc", [null, [16, 35], [16, 54]]], 0, 0], "focusFunction", ["subexpr", "action", ["parentFieldFocused"], [], ["loc", [null, [17, 32], [17, 61]]], 0, 0], "blurFunction", ["subexpr", "action", ["parentFieldBlurred"], [], ["loc", [null, [18, 31], [18, 60]]], 0, 0], "region", ["subexpr", "@mut", [["get", "selectedRegion", ["loc", [null, [19, 25], [19, 39]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [16, 6], [20, 8]]], 0, 0], ["element", "action", ["addClass"], ["bubbles", false], ["loc", [null, [23, 42], [23, 77]]], 0, 0], ["inline", "class-list", [], ["list", ["subexpr", "@mut", [["get", "selectedClasses", ["loc", [null, [24, 25], [24, 40]]], 0, 0, 0, 0]], [], [], 0, 0], "focusFunction", ["subexpr", "action", ["fieldFocused"], [], ["loc", [null, [25, 34], [25, 57]]], 0, 0], "blurFunction", ["subexpr", "action", ["fieldBlurred"], [], ["loc", [null, [26, 33], [26, 56]]], 0, 0], "changeClassFunction", ["subexpr", "action", ["changeClass"], [], ["loc", [null, [27, 40], [27, 62]]], 0, 0]], ["loc", [null, [24, 6], [28, 8]]], 0, 0], ["inline", "css-rules", [], ["list", ["subexpr", "@mut", [["get", "selectedCssRules", ["loc", [null, [30, 21], [30, 37]]], 0, 0, 0, 0]], [], [], 0, 0], "focusFunction", ["subexpr", "action", ["fieldFocused"], [], ["loc", [null, [31, 30], [31, 53]]], 0, 0], "blurFunction", ["subexpr", "action", ["fieldBlurred"], [], ["loc", [null, [32, 29], [32, 52]]], 0, 0], "changeCssFunction", ["subexpr", "action", ["changeCssRules"], [], ["loc", [null, [33, 34], [33, 59]]], 0, 0], "addCssRuleFunction", ["subexpr", "action", ["addCssRule"], [], ["loc", [null, [34, 35], [34, 56]]], 0, 0], "addCssStyleFunction", ["subexpr", "action", ["addCssStyle"], [], ["loc", [null, [35, 36], [35, 58]]], 0, 0], "removeCssStyleFunction", ["subexpr", "action", ["removeCssStyle"], [], ["loc", [null, [36, 39], [36, 64]]], 0, 0]], ["loc", [null, [30, 4], [37, 6]]], 0, 0]],
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
              "line": 38,
              "column": 2
            },
            "end": {
              "line": 39,
              "column": 2
            }
          },
          "moduleName": "page/templates/page.hbs"
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
    var child2 = (function () {
      return {
        meta: {
          "revision": "Ember@2.8.2",
          "loc": {
            "source": null,
            "start": {
              "line": 44,
              "column": 2
            },
            "end": {
              "line": 44,
              "column": 45
            }
          },
          "moduleName": "page/templates/page.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("return to dashboard");
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
            "line": 54,
            "column": 0
          }
        },
        "moduleName": "page/templates/page.hbs"
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
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "id", "sidebar");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("CMD + S to save");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("Click on elements in the page to edit them ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
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
        var element6 = dom.childAt(fragment, [5]);
        var element7 = dom.childAt(fragment, [7]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        morphs[2] = dom.createMorphAt(element6, 1, 1);
        morphs[3] = dom.createMorphAt(element6, 11, 11);
        morphs[4] = dom.createElementMorph(element7);
        morphs[5] = dom.createUnsafeMorphAt(dom.childAt(element7, [1, 1]), 1, 1);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [2, 0], [2, 10]]], 0, 0, 0, 0], ["content", "navbar", ["loc", [null, [3, 0], [3, 10]]], 0, 0, 0, 0], ["block", "if", [["get", "selectedRegion", ["loc", [null, [5, 8], [5, 22]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [5, 2], [39, 9]]]], ["block", "link-to", ["dashboard"], [], 2, null, ["loc", [null, [44, 2], [44, 57]]]], ["element", "action", ["mouseUpOnEdits"], [], ["loc", [null, [47, 23], [47, 50]]], 0, 0], ["content", "model.html", ["loc", [null, [50, 6], [50, 22]]], 0, 0, 0, 0]],
      locals: [],
      templates: [child0, child1, child2]
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
