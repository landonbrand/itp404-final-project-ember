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