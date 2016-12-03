export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
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
            "line": 28,
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
        dom.setAttribute(el1,"id","sidebar-top");
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2,"id","viewRoot");
        dom.setAttribute(el2,"class","up");
        var el3 = dom.createTextNode("up");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2,"id","viewRoot");
        dom.setAttribute(el2,"class","up");
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
        dom.setAttribute(el2,"id","newNode");
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
        dom.setAttribute(el1,"id","sidebar-classes");
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2,"id","newClass");
        dom.setAttribute(el2,"class","class");
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
        var morphs = new Array(7);
        morphs[0] = dom.createElementMorph(element1);
        morphs[1] = dom.createElementMorph(element2);
        morphs[2] = dom.createElementMorph(element3);
        morphs[3] = dom.createMorphAt(element0,9,9);
        morphs[4] = dom.createMorphAt(element0,11,11);
        morphs[5] = dom.createElementMorph(element5);
        morphs[6] = dom.createMorphAt(element4,3,3);
        return morphs;
      },
      statements: [
        ["element","action",["selectParentNode"],[],["loc",[null,[5,39],[5,68]]],0,0],
        ["element","action",["deleteCurrentNode"],[],["loc",[null,[6,39],[6,69]]],0,0],
        ["element","action",["newNode"],["bubbles",false],["loc",[null,[8,27],[8,61]]],0,0],
        ["inline","tag-name",[],["changeTagFunction",["subexpr","action",["changeTag"],[],["loc",[null,[9,36],[9,56]]],0,0],"focusFunction",["subexpr","action",["fieldFocused"],[],["loc",[null,[10,32],[10,55]]],0,0],"blurFunction",["subexpr","action",["fieldBlurred"],[],["loc",[null,[11,31],[11,54]]],0,0],"region",["subexpr","@mut",[["get","selectedRegion",["loc",[null,[12,25],[12,39]]],0,0,0,0]],[],[],0,0]],["loc",[null,[9,6],[13,8]]],0,0],
        ["inline","tag-id",[],["changeIdFunction",["subexpr","action",["changeId"],[],["loc",[null,[14,35],[14,54]]],0,0],"focusFunction",["subexpr","action",["parentFieldFocused"],[],["loc",[null,[15,32],[15,61]]],0,0],"blurFunction",["subexpr","action",["parentFieldBlurred"],[],["loc",[null,[16,31],[16,60]]],0,0],"region",["subexpr","@mut",[["get","selectedRegion",["loc",[null,[17,25],[17,39]]],0,0,0,0]],[],[],0,0]],["loc",[null,[14,6],[18,8]]],0,0],
        ["element","action",["addClass"],["bubbles",false],["loc",[null,[21,42],[21,77]]],0,0],
        ["inline","class-list",[],["list",["subexpr","@mut",[["get","selectedClasses",["loc",[null,[22,25],[22,40]]],0,0,0,0]],[],[],0,0],"focusFunction",["subexpr","action",["fieldFocused"],[],["loc",[null,[23,34],[23,57]]],0,0],"blurFunction",["subexpr","action",["fieldBlurred"],[],["loc",[null,[24,33],[24,56]]],0,0],"changeClassFunction",["subexpr","action",["changeClass"],[],["loc",[null,[25,40],[25,62]]],0,0]],["loc",[null,[22,6],[26,8]]],0,0]
      ],
      locals: [],
      templates: []
    };
  }());
  var child1 = (function() {
    return {
      meta: {
        "revision": "Ember@2.8.2",
        "loc": {
          "source": null,
          "start": {
            "line": 28,
            "column": 2
          },
          "end": {
            "line": 29,
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
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }());
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
          "line": 43,
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
      dom.setAttribute(el1,"id","sidebar");
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createComment("");
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n");
      dom.appendChild(el1, el2);
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n\n");
      dom.appendChild(el0, el1);
      var el1 = dom.createElement("div");
      dom.setAttribute(el1,"class","container");
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"class","page");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"id","edit");
      dom.setAttribute(el3,"contenteditable","true");
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
      var element6 = dom.childAt(fragment, [2]);
      var element7 = dom.childAt(fragment, [4]);
      var morphs = new Array(5);
      morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
      morphs[1] = dom.createMorphAt(element6,1,1);
      morphs[2] = dom.createMorphAt(element6,3,3);
      morphs[3] = dom.createElementMorph(element7);
      morphs[4] = dom.createUnsafeMorphAt(dom.childAt(element7, [1, 1]),1,1);
      dom.insertBoundary(fragment, 0);
      return morphs;
    },
    statements: [
      ["content","outlet",["loc",[null,[1,0],[1,10]]],0,0,0,0],
      ["block","if",[["get","selectedRegion",["loc",[null,[3,8],[3,22]]],0,0,0,0]],[],0,1,["loc",[null,[3,2],[29,9]]]],
      ["inline","css-rules",[],["list",["subexpr","@mut",[["get","selectedCssRules",["loc",[null,[30,19],[30,35]]],0,0,0,0]],[],[],0,0],"focusFunction",["subexpr","action",["fieldFocused"],[],["loc",[null,[31,28],[31,51]]],0,0],"blurFunction",["subexpr","action",["fieldBlurred"],[],["loc",[null,[32,27],[32,50]]],0,0],"changeCssFunction",["subexpr","action",["changeCssRules"],[],["loc",[null,[33,32],[33,57]]],0,0]],["loc",[null,[30,2],[33,59]]],0,0],
      ["element","action",["mouseUpOnEdits"],[],["loc",[null,[36,23],[36,50]]],0,0],
      ["content","model",["loc",[null,[39,6],[39,17]]],0,0,0,0]
    ],
    locals: [],
    templates: [child0, child1]
  };
}()));