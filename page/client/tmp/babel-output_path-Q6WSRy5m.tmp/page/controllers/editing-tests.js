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
        region.anchorElement.parentNode.classList.add("selected-region");
        region.anchorElement.parentNode.parentNode.classList.add("selected-region");

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
        console.log("styleSheets ", document.styleSheets);
        var newRules = css(node);
        console.log("css of node", newRules);
        var formattedNewRules = newRules.map(function (val) {
          if (val.selectorText !== ".selected-region") {
            var obj = {};
            obj.selector = val.selectorText;
            obj.rules = [];
            for (var i = 0; i < val.style.length; i++) {
              obj.rules.push({ name: val.style[i] });
              console.log("value's style at position rules", val.style);
              console.log("obj.rules[i].value", obj.rules[i].value);
              obj.rules[i].value = val.style[obj.rules[i].name];
            }
            return obj;
            console.log("in map", val);
          }
        });

        formattedNewRules = formattedNewRules.filter(function (n) {
          return n != undefined;
        });
        console.log("formattedNewRules: ", formattedNewRules);
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

        console.log("adding Css Rule!");
      },

      selectParentNode: function selectParentNode() {
        var region = this.get("selectedRegion");
        if (region.anchorElement.parentNode.id != "edit") {
          this.send("selectNode", region.anchorElement.parentNode);
        }
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