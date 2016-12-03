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
          "line": 10,
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
      var el1 = dom.createElement("span");
      dom.setAttribute(el1,"class","field class-list-item");
      dom.setAttribute(el1,"contenteditable","true");
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
      var morphs = new Array(6);
      morphs[0] = dom.createMorphAt(fragment,0,0,contextualElement);
      morphs[1] = dom.createAttrMorph(element0, 'id');
      morphs[2] = dom.createAttrMorph(element0, 'onkeyup');
      morphs[3] = dom.createAttrMorph(element0, 'onfocus');
      morphs[4] = dom.createAttrMorph(element0, 'onblur');
      morphs[5] = dom.createMorphAt(element0,1,1);
      dom.insertBoundary(fragment, 0);
      return morphs;
    },
    statements: [
      ["content","yield",["loc",[null,[1,0],[1,9]]],0,0,0,0],
      ["attribute","id",["subexpr","class-id",[["get","className",["loc",[null,[3,20],[3,29]]],0,0,0,0]],[],["loc",[null,[null,null],[3,31]]],0,0],0,0,0,0],
      ["attribute","onkeyup",["subexpr","action",["changeClass"],[],["loc",[null,[null,null],[5,38]]],0,0],0,0,0,0],
      ["attribute","onfocus",["subexpr","action",["fieldFocused"],[],["loc",[null,[null,null],[6,39]]],0,0],0,0,0,0],
      ["attribute","onblur",["subexpr","action",["fieldBlurred"],[],["loc",[null,[null,null],[7,38]]],0,0],0,0,0,0],
      ["content","className",["loc",[null,[8,2],[8,15]]],0,0,0,0]
    ],
    locals: [],
    templates: []
  };
}()));