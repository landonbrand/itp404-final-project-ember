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
      dom.setAttribute(el1,"id","sidebar");
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("div");
      dom.setAttribute(el2,"id","treeViewer");
      var el3 = dom.createTextNode("\n    ");
      dom.appendChild(el2, el3);
      var el3 = dom.createElement("div");
      dom.setAttribute(el3,"class","tree-view-box");
      dom.setAttribute(el3,"contenteditable","true");
      var el4 = dom.createElement("span");
      var el5 = dom.createTextNode("\n      ");
      dom.appendChild(el4, el5);
      var el5 = dom.createComment("");
      dom.appendChild(el4, el5);
      var el5 = dom.createTextNode("\n      ");
      dom.appendChild(el4, el5);
      var el5 = dom.createElement("div");
      dom.setAttribute(el5,"class","tree-view-box");
      dom.setAttribute(el5,"contenteditable","true");
      var el6 = dom.createElement("span");
      var el7 = dom.createTextNode("\n        ");
      dom.appendChild(el6, el7);
      var el7 = dom.createComment("");
      dom.appendChild(el6, el7);
      var el7 = dom.createTextNode("\n        ");
      dom.appendChild(el6, el7);
      var el7 = dom.createElement("div");
      dom.setAttribute(el7,"class","tree-view-box");
      dom.setAttribute(el7,"contenteditable","true");
      var el8 = dom.createElement("span");
      var el9 = dom.createTextNode("\n          ");
      dom.appendChild(el8, el9);
      var el9 = dom.createComment("");
      dom.appendChild(el8, el9);
      var el9 = dom.createTextNode("\n          ");
      dom.appendChild(el8, el9);
      var el9 = dom.createElement("div");
      dom.setAttribute(el9,"class","tree-view-box");
      dom.setAttribute(el9,"contenteditable","true");
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
      morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
      morphs[1] = dom.createElementMorph(element1);
      morphs[2] = dom.createMorphAt(element2,1,1);
      morphs[3] = dom.createMorphAt(element3,1,1);
      morphs[4] = dom.createMorphAt(dom.childAt(element3, [3, 0]),1,1);
      morphs[5] = dom.createElementMorph(element4);
      morphs[6] = dom.createElementMorph(element5);
      dom.insertBoundary(fragment, 0);
      return morphs;
    },
    statements: [
      ["content","yield",["loc",[null,[1,0],[1,9]]],0,0,0,0],
      ["element","action",["onChange"],[],["loc",[null,[3,23],[3,44]]],0,0],
      ["content","selectedTags.2.nodeName",["loc",[null,[5,6],[5,35]]],0,0,0,0],
      ["content","selectedTags.1.nodeName",["loc",[null,[7,8],[7,37]]],0,0,0,0],
      ["content","selectedTags.0.nodeName",["loc",[null,[9,10],[9,39]]],0,0,0,0],
      ["element","action",["h1"],[],["loc",[null,[17,10],[17,25]]],0,0],
      ["element","action",["noStyle"],[],["loc",[null,[18,10],[18,30]]],0,0]
    ],
    locals: [],
    templates: []
  };
}()));