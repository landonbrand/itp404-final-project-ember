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
              "line": 30,
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
          var el2 = dom.createElement("br");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("button");
          dom.setAttribute(el2, "id", "newNode");
          var el3 = dom.createTextNode("+");
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
          var el3 = dom.createTextNode("+");
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
          var el1 = dom.createElement("section");
          dom.setAttribute(el1, "id", "sidebar-styles");
          var el2 = dom.createTextNode("\n\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [5]);
          var element2 = dom.childAt(fragment, [3]);
          var element3 = dom.childAt(element2, [1]);
          var morphs = new Array(5);
          morphs[0] = dom.createElementMorph(element1);
          morphs[1] = dom.createMorphAt(element0, 7, 7);
          morphs[2] = dom.createMorphAt(element0, 9, 9);
          morphs[3] = dom.createElementMorph(element3);
          morphs[4] = dom.createMorphAt(element2, 3, 3);
          return morphs;
        },
        statements: [["element", "action", ["newNode"], ["bubbles", false], ["loc", [null, [7, 27], [7, 61]]], 0, 0], ["inline", "tag-name", [], ["changeTagFunction", ["subexpr", "action", ["changeTag"], [], ["loc", [null, [8, 36], [8, 56]]], 0, 0], "focusFunction", ["subexpr", "action", ["fieldFocused"], [], ["loc", [null, [9, 32], [9, 55]]], 0, 0], "blurFunction", ["subexpr", "action", ["fieldBlurred"], [], ["loc", [null, [10, 31], [10, 54]]], 0, 0], "region", ["subexpr", "@mut", [["get", "selectedRegion", ["loc", [null, [11, 25], [11, 39]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [8, 6], [12, 8]]], 0, 0], ["inline", "tag-id", [], ["changeIdFunction", ["subexpr", "action", ["changeId"], [], ["loc", [null, [13, 35], [13, 54]]], 0, 0], "focusFunction", ["subexpr", "action", ["parentFieldFocused"], [], ["loc", [null, [14, 32], [14, 61]]], 0, 0], "blurFunction", ["subexpr", "action", ["parentFieldBlurred"], [], ["loc", [null, [15, 31], [15, 60]]], 0, 0], "region", ["subexpr", "@mut", [["get", "selectedRegion", ["loc", [null, [16, 25], [16, 39]]], 0, 0, 0, 0]], [], [], 0, 0]], ["loc", [null, [13, 6], [17, 8]]], 0, 0], ["element", "action", ["addClass"], ["bubbles", false], ["loc", [null, [20, 42], [20, 77]]], 0, 0], ["inline", "class-list", [], ["list", ["subexpr", "@mut", [["get", "selectedClasses", ["loc", [null, [21, 25], [21, 40]]], 0, 0, 0, 0]], [], [], 0, 0], "focusFunction", ["subexpr", "action", ["fieldFocused"], [], ["loc", [null, [22, 34], [22, 57]]], 0, 0], "blurFunction", ["subexpr", "action", ["fieldBlurred"], [], ["loc", [null, [23, 33], [23, 56]]], 0, 0], "changeClassFunction", ["subexpr", "action", ["changeClass"], [], ["loc", [null, [24, 40], [24, 62]]], 0, 0]], ["loc", [null, [21, 6], [25, 8]]], 0, 0]],
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
              "line": 30,
              "column": 2
            },
            "end": {
              "line": 31,
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
        var element4 = dom.childAt(fragment, [4]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        morphs[2] = dom.createElementMorph(element4);
        morphs[3] = dom.createUnsafeMorphAt(dom.childAt(element4, [1, 1]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]], 0, 0, 0, 0], ["block", "if", [["get", "selectedRegion", ["loc", [null, [3, 8], [3, 22]]], 0, 0, 0, 0]], [], 0, 1, ["loc", [null, [3, 2], [31, 9]]]], ["element", "action", ["mouseUpOnEdits"], [], ["loc", [null, [35, 23], [35, 50]]], 0, 0], ["content", "model", ["loc", [null, [38, 6], [38, 17]]], 0, 0, 0, 0]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});