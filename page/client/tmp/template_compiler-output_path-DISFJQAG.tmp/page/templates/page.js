export default Ember.HTMLBars.template((function() {
  var child0 = (function() {
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
            "line": 37,
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
        dom.setAttribute(el1,"id","sidebar-classes");
        var el2 = dom.createTextNode("\n      ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2,"id","newClass");
        dom.setAttribute(el2,"class","class");
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
        morphs[3] = dom.createMorphAt(element0,9,9);
        morphs[4] = dom.createMorphAt(element0,11,11);
        morphs[5] = dom.createElementMorph(element5);
        morphs[6] = dom.createMorphAt(element4,3,3);
        morphs[7] = dom.createMorphAt(fragment,5,5,contextualElement);
        return morphs;
      },
      statements: [
        ["element","action",["selectParentNode"],[],["loc",[null,[6,39],[6,68]]],0,0],
        ["element","action",["deleteCurrentNode"],[],["loc",[null,[7,39],[7,69]]],0,0],
        ["element","action",["newNode"],["bubbles",false],["loc",[null,[9,27],[9,61]]],0,0],
        ["inline","tag-name",[],["changeTagFunction",["subexpr","action",["changeTag"],[],["loc",[null,[10,36],[10,56]]],0,0],"focusFunction",["subexpr","action",["fieldFocused"],[],["loc",[null,[11,32],[11,55]]],0,0],"blurFunction",["subexpr","action",["fieldBlurred"],[],["loc",[null,[12,31],[12,54]]],0,0],"region",["subexpr","@mut",[["get","selectedRegion",["loc",[null,[13,25],[13,39]]],0,0,0,0]],[],[],0,0]],["loc",[null,[10,6],[14,8]]],0,0],
        ["inline","tag-id",[],["changeIdFunction",["subexpr","action",["changeId"],[],["loc",[null,[15,35],[15,54]]],0,0],"focusFunction",["subexpr","action",["parentFieldFocused"],[],["loc",[null,[16,32],[16,61]]],0,0],"blurFunction",["subexpr","action",["parentFieldBlurred"],[],["loc",[null,[17,31],[17,60]]],0,0],"region",["subexpr","@mut",[["get","selectedRegion",["loc",[null,[18,25],[18,39]]],0,0,0,0]],[],[],0,0]],["loc",[null,[15,6],[19,8]]],0,0],
        ["element","action",["addClass"],["bubbles",false],["loc",[null,[22,42],[22,77]]],0,0],
        ["inline","class-list",[],["list",["subexpr","@mut",[["get","selectedClasses",["loc",[null,[23,25],[23,40]]],0,0,0,0]],[],[],0,0],"focusFunction",["subexpr","action",["fieldFocused"],[],["loc",[null,[24,34],[24,57]]],0,0],"blurFunction",["subexpr","action",["fieldBlurred"],[],["loc",[null,[25,33],[25,56]]],0,0],"changeClassFunction",["subexpr","action",["changeClass"],[],["loc",[null,[26,40],[26,62]]],0,0]],["loc",[null,[23,6],[27,8]]],0,0],
        ["inline","css-rules",[],["list",["subexpr","@mut",[["get","selectedCssRules",["loc",[null,[29,21],[29,37]]],0,0,0,0]],[],[],0,0],"focusFunction",["subexpr","action",["fieldFocused"],[],["loc",[null,[30,30],[30,53]]],0,0],"blurFunction",["subexpr","action",["fieldBlurred"],[],["loc",[null,[31,29],[31,52]]],0,0],"changeCssFunction",["subexpr","action",["changeCssRules"],[],["loc",[null,[32,34],[32,59]]],0,0],"addCssRuleFunction",["subexpr","action",["addCssRule"],[],["loc",[null,[33,35],[33,56]]],0,0],"addCssStyleFunction",["subexpr","action",["addCssStyle"],[],["loc",[null,[34,36],[34,58]]],0,0],"removeCssStyleFunction",["subexpr","action",["removeCssStyle"],[],["loc",[null,[35,39],[35,64]]],0,0]],["loc",[null,[29,4],[36,6]]],0,0]
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
            "line": 37,
            "column": 2
          },
          "end": {
            "line": 38,
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
          "line": 48,
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
      var el1 = dom.createComment("");
      dom.appendChild(el0, el1);
      var el1 = dom.createTextNode("\n");
      dom.appendChild(el0, el1);
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
      var element6 = dom.childAt(fragment, [6]);
      var morphs = new Array(5);
      morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
      morphs[1] = dom.createMorphAt(fragment,2,2,contextualElement);
      morphs[2] = dom.createMorphAt(dom.childAt(fragment, [4]),1,1);
      morphs[3] = dom.createElementMorph(element6);
      morphs[4] = dom.createUnsafeMorphAt(dom.childAt(element6, [1, 1]),1,1);
      dom.insertBoundary(fragment, 0);
      return morphs;
    },
    statements: [
      ["content","navbar",["loc",[null,[1,0],[1,10]]],0,0,0,0],
      ["content","outlet",["loc",[null,[2,0],[2,10]]],0,0,0,0],
      ["block","if",[["get","selectedRegion",["loc",[null,[4,8],[4,22]]],0,0,0,0]],[],0,1,["loc",[null,[4,2],[38,9]]]],
      ["element","action",["mouseUpOnEdits"],[],["loc",[null,[41,23],[41,50]]],0,0],
      ["content","model.html",["loc",[null,[44,6],[44,22]]],0,0,0,0]
    ],
    locals: [],
    templates: [child0, child1]
  };
}()));