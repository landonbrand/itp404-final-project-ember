export default Ember.HTMLBars.template((function() {
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
          "line": 36,
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
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("section");
      dom.setAttribute(el2,"id","sidebar-top");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("button");
      dom.setAttribute(el3,"id","viewRoot");
      dom.setAttribute(el3,"class","up");
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
      dom.setAttribute(el3,"id","newNode");
      var el4 = dom.createTextNode("+");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("span");
      dom.setAttribute(el3,"id","tagName");
      dom.setAttribute(el3,"class","field big");
      dom.setAttribute(el3,"contenteditable","true");
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
      dom.setAttribute(el3,"id","tagId");
      dom.setAttribute(el3,"class","field");
      dom.setAttribute(el3,"contenteditable","false");
      var el4 = dom.createTextNode("\n      ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("span");
      dom.setAttribute(el4,"class","no-padding");
      var el5 = dom.createTextNode("#");
      dom.appendChild(el4, el5);
      dom.appendChild(el3, el4);
      var el4 = dom.createTextNode("\n        ");
      dom.appendChild(el3, el4);
      var el4 = dom.createElement("span");
      dom.setAttribute(el4,"id","tagId-unfocusable");
      dom.setAttribute(el4,"tabindex","-1");
      dom.setAttribute(el4,"class","no-padding no-focus");
      dom.setAttribute(el4,"contenteditable","true");
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
      dom.setAttribute(el2,"id","sidebar-classes");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("button");
      dom.setAttribute(el3,"id","newClass");
      dom.setAttribute(el3,"class","class");
      var el4 = dom.createTextNode("+");
      dom.appendChild(el3, el4);
      dom.appendChild(el2, el3);
      var el3 = dom.createTextNode("\n  ");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("section");
      dom.setAttribute(el2,"id","sidebar-styles");
      var el3 = dom.createTextNode("\n\n  ");
      dom.appendChild(el2, el3);
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
      var element0 = dom.childAt(fragment, [2]);
      var element1 = dom.childAt(element0, [1]);
      var element2 = dom.childAt(element1, [5]);
      var element3 = dom.childAt(element1, [7]);
      var element4 = dom.childAt(element1, [9, 3]);
      var element5 = dom.childAt(element0, [3, 1]);
      var element6 = dom.childAt(fragment, [4]);
      var morphs = new Array(14);
      morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
      morphs[1] = dom.createElementMorph(element0);
      morphs[2] = dom.createElementMorph(element2);
      morphs[3] = dom.createAttrMorph(element3, 'onkeyup');
      morphs[4] = dom.createAttrMorph(element3, 'onfocus');
      morphs[5] = dom.createAttrMorph(element3, 'onblur');
      morphs[6] = dom.createElementMorph(element3);
      morphs[7] = dom.createMorphAt(element3,1,1);
      morphs[8] = dom.createAttrMorph(element4, 'onfocus');
      morphs[9] = dom.createAttrMorph(element4, 'onblur');
      morphs[10] = dom.createMorphAt(element4,1,1);
      morphs[11] = dom.createElementMorph(element5);
      morphs[12] = dom.createElementMorph(element6);
      morphs[13] = dom.createUnsafeMorphAt(dom.childAt(element6, [1, 1]),1,1);
      dom.insertBoundary(fragment, 0);
      return morphs;
    },
    statements: [
      ["content","outlet",["loc",[null,[1,0],[1,10]]],0,0,0,0],
      ["element","action",["deselect"],[],["loc",[null,[2,18],[2,39]]],0,0],
      ["element","action",["newNode"],["bubbles",false],["loc",[null,[6,25],[6,59]]],0,0],
      ["attribute","onkeyup",["subexpr","action",["changeTag"],[],["loc",[null,[null,null],[9,40]]],0,0],0,0,0,0],
      ["attribute","onfocus",["subexpr","action",["fieldFocused"],[],["loc",[null,[null,null],[10,43]]],0,0],0,0,0,0],
      ["attribute","onblur",["subexpr","action",["fieldBlurred"],[],["loc",[null,[null,null],[11,42]]],0,0],0,0,0,0],
      ["element","action",["noBubble"],["bubbles",false],["loc",[null,[8,10],[8,45]]],0,0],
      ["content","selectedTag.anchorNode.parentNode.nodeName",["loc",[null,[12,6],[12,52]]],0,0,0,0],
      ["attribute","onfocus",["subexpr","action",["parentFieldFocused"],[],["loc",[null,[null,null],[16,141]]],0,0],0,0,0,0],
      ["attribute","onblur",["subexpr","action",["parentFieldBlurred"],[],["loc",[null,[null,null],[16,180]]],0,0],0,0,0,0],
      ["content","selectedTag.anchorNode.parentNode.id",["loc",[null,[17,10],[17,50]]],0,0,0,0],
      ["element","action",["newClass"],["bubbles",false],["loc",[null,[22,40],[22,75]]],0,0],
      ["element","action",["mouseUpOnEdits"],[],["loc",[null,[29,23],[29,50]]],0,0],
      ["content","model",["loc",[null,[32,6],[32,17]]],0,0,0,0]
    ],
    locals: [],
    templates: []
  };
}()));