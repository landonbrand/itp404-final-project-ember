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
      dom.setAttribute(el1,"id","tagId");
      dom.setAttribute(el1,"class","field");
      dom.setAttribute(el1,"contenteditable","false");
      var el2 = dom.createTextNode("\n  ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("span");
      dom.setAttribute(el2,"class","no-padding");
      var el3 = dom.createTextNode("#");
      dom.appendChild(el2, el3);
      dom.appendChild(el1, el2);
      var el2 = dom.createTextNode("\n    ");
      dom.appendChild(el1, el2);
      var el2 = dom.createElement("span");
      dom.setAttribute(el2,"id","tagId-unfocusable");
      dom.setAttribute(el2,"tabindex","-1");
      dom.setAttribute(el2,"class","no-padding no-focus");
      dom.setAttribute(el2,"contenteditable","true");
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
      morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
      morphs[1] = dom.createAttrMorph(element0, 'onkeyup');
      morphs[2] = dom.createAttrMorph(element0, 'onfocus');
      morphs[3] = dom.createAttrMorph(element0, 'onblur');
      morphs[4] = dom.createMorphAt(element0,1,1);
      dom.insertBoundary(fragment, 0);
      return morphs;
    },
    statements: [
      ["content","yield",["loc",[null,[1,0],[1,9]]],0,0,0,0],
      ["attribute","onkeyup",["subexpr","action",["changeId"],[],["loc",[null,[null,null],[8,39]]],0,0],0,0,0,0],
      ["attribute","onfocus",["subexpr","action",["fieldFocused"],[],["loc",[null,[null,null],[9,43]]],0,0],0,0,0,0],
      ["attribute","onblur",["subexpr","action",["fieldBlurred"],[],["loc",[null,[null,null],[10,42]]],0,0],0,0,0,0],
      ["content","region.anchorElement.id",["loc",[null,[11,6],[11,33]]],0,0,0,0]
    ],
    locals: [],
    templates: []
  };
}()));