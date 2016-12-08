import Ember from 'ember';

export default Ember.Controller.extend({
  selectedRegion: false,
  selectedClasses: [],
  stylesheet: {},

  actions: {
    deselect: function() {
      var elems = document.querySelectorAll(".selected-region");
      [].forEach.call(elems, function(el) {
          el.classList.remove("selected-region");
      });
      this.set("selectedRegion", false);
      return false;
    },

    mouseUpOnEdits: function() {
      var selected = window.getSelection();
      selected = new Region(selected.anchorNode, selected.extentNode,
          selected.anchorOffset, selected.extentOffset);
      this.send("selectRegion", selected);
    },

    save: function(){
      var pageNodes = document.getElementById("edit");
      var selectedNodes = pageNodes.getElementsByClassName("selected-region");

      for(var i = 0; i < selectedNodes.length; i++){
        selectedNodes[i].classList.remove("selected-region");
      }
      console.log("selectedNodes2", selectedNodes);

      var pageContent = pageNodes.innerHTML;
      var styleSheet = document.styleSheets[2];
      var cssArray = [];
      var pageCSS;
      console.log(styleSheet.cssRules);
      if(styleSheet.cssRules != null){
        for(i = 0; i < styleSheet.cssRules.length; i++){
          cssArray.push(styleSheet.cssRules[i].cssText);
        }
        pageCSS = cssArray.join(" ");
        console.log("pageCSS: ", pageCSS);
      }
      console.log("model: ", this.get("model"));
      var htmlData = {
        name: this.get("model").name,
        html: pageContent,
        css: pageCSS
      };
      var promise =  Ember.$.post({
        url: "http://192.241.235.59:1111/api/setPage",
        data: JSON.stringify(htmlData),
        dataType: "text"
      });
      promise.then(function(response){
        console.log(response);
      });
    },

    cancelEdits: function() {
      var edit = document.getElementById("edit");
      this.send("cancelEditsOnModel");
      edit.innerHTML = this.get("model");
    },

    noBubble: function(){
      return false;
    },

    newNode: function(){
      var node = insertNode(this.get("selectedRegion"));
      this.send("selectNode", node);
    },

    changeTag: function(){
      var selectedRegion = this.get("selectedRegion");
      var tagNameElement = document.getElementById("tagName");
      var newNode = changeNodeType(selectedRegion.anchorElement, tagNameElement.innerHTML.replace(/&nbsp;/gi,'').trim());
      this.send("selectNode", newNode);
      Caret.goToEndOfNode(event.target);
      return false;
    },

    changeId: function(){
      var selectedRegion = this.get("selectedRegion");
      var tagIdElement = document.getElementById("tagId-unfocusable");
      tagIdElement.focus();
      selectedRegion.anchorElement.setAttribute("id", tagIdElement.innerHTML.replace(/&nbsp;/gi,'').trim());
      return false;
    },

    fieldFocused: function(event){
      event.target.classList.add("selected");
      Caret.highlightNodeContents(event.target);
      return false;
    },

    fieldBlurred: function(event){
      event.target.classList.remove("selected");
      return false;
    },

    parentFieldFocused: function(event){
      event.target.parentNode.classList.add("selected");
      Caret.highlightNodeContents(event.target);
      return false;
    },

    parentFieldBlurred: function(event){
      event.target.parentNode.classList.remove("selected");
      return false;
    },

    selectRegion: function(region){
      var elems = document.querySelectorAll(".selected-region");
      [].forEach.call(elems, function(el) {
          el.classList.remove("selected-region");
      });

      region.anchorElement.classList.add("selected-region");

      this.set("selectedRegion", region);

      this.send("updateClassList", region.anchorElement);
      this.send("updateCssRules", region.anchorElement);
    },

    selectNode: function(node){
      var selected = new Region(node, node, 0, 0);
      this.send("selectRegion", selected);
    },

    updateClassList: function(node){
      var classList = [];
      node.classList.forEach(function(val){
        classList.push({
          name: val
        });
      });
      this.set("selectedClasses", classList);
    },

    updateCssRules: function(node){
      var newRules = css(node);
      var formattedNewRules = newRules.map(function(val){
        if(val.selectorText !== ".selected-region"){
          var obj = {};
          obj.selector = val.selectorText;
          obj.rules = [];
          for(var i = 0; i < val.style.length; i++){
            obj.rules.push({name: val.style[i]});
            obj.rules[i].value = val.style[obj.rules[i].name];
          }
          return obj;
        }
      });

      formattedNewRules = formattedNewRules.filter(function(n){ return n !== undefined; });
      this.set("selectedCssRules", formattedNewRules);
    },

    changeClass: function(){
      var region = this.get("selectedRegion");
      var classListItems = Ember.$(".class-list-item");
      var newClass = [];
      for(var i = 0; i < classListItems.length; i++){
        newClass.push(classListItems[i].textContent.trim());
      }
      region.anchorElement.className = newClass.join(" ");
      return false;
    },

    changeCssRules: function(selector, ruleName, ruleValue){
      var styleSheet = document.styleSheets[2];
      for(var i = 0; i < styleSheet.cssRules.length; i++){
        if(styleSheet.cssRules[i].selectorText === selector){
          if(ruleName === "" || ruleValue === ""){
            styleSheet.cssRules[i].style[camelCase(ruleName)] = "";
            styleSheet.cssRules[i].style.removeProperty(camelCase(ruleName));
            console.log("tryna delete this shi");
          } else {
            styleSheet.cssRules[i].style[camelCase(ruleName)] = ruleValue;
          }
        }
      }
    },

    addClass: function(){
      var region = this.get("selectedRegion");
      region.anchorElement.className = region.anchorElement.className + " new-class";
      this.set("selectedRegion", region);
      this.send("updateClassList", this.get("selectedRegion").anchorElement);
    },

    addCssRule: function(selector){
      var styleSheet = document.styleSheets[2];
      for(var i = 0; i < styleSheet.cssRules.length; i++){
        if(styleSheet.cssRules[i].selectorText === selector){
          styleSheet.cssRules[i].style.setProperty("counter-reset", "value");
          console.log("style: ", styleSheet.cssRules[i].style);
          break;
        }
      }

      console.log("cssRules: ", styleSheet.cssRules);
      this.send("updateCssRules", this.get("selectedRegion").anchorElement);
      console.log("adding Css Rule!");
    },

    selectParentNode: function(){
      var region = this.get("selectedRegion");
      if(region.anchorElement.parentNode.id !== "edit"){
        this.send("selectNode", region.anchorElement.parentNode);
      }
    },

    addCssStyle: function(){
      console.log("adding CSS Style!!!");
      var sheet = document.styleSheets[2];
      var region = this.get("selectedRegion");
      var selector = region.anchorElement.nodeName;
      for(var i = 0 ; i < region.anchorElement.classList.length; i++){
        if( region.anchorElement.classList[i] !== 'selected-region' ){
          selector += ".";
          selector += region.anchorElement.classList[i];
        }
      }
      console.log("selector: ", selector);
      sheet.addRule(selector, "color: red", 1);
      this.send("updateCssRules", this.get("selectedRegion").anchorElement);
      console.log("Sheet:", document.styleSheets[2]);
    },

    removeCssStyle: function(selector){
      console.log('removing!');
      var styleSheet = document.styleSheets[2];
      for(var i = 0; i < styleSheet.cssRules.length; i++){
        if(styleSheet.cssRules[i].selectorText === selector){
          console.log("styleSheet from remove:", styleSheet);
          styleSheet.deleteRule(i);
        }
      }
      this.send("updateCssRules", this.get("selectedRegion").anchorElement);
    },

    deleteCurrentNode: function(){
      var region = this.get("selectedRegion");
      var element = region.anchorElement;
      this.send("selectNode", region.anchorElement.parentNode);
      element.outerHTML = "";
    }
  },

  modelObserver: Ember.observer('model', function() {
    var edit = document.getElementById("edit");
    if(edit != null){
      edit.innerHTML = this.get("model");
    }
  })
});

// useful functions

function changeNodeType(element, newType){
  var new_element = document.createElement(newType),
    old_attributes = element.attributes,
    new_attributes = new_element.attributes;

  // copy attributes
  if(typeof old_attributes !== "undefined"){
    for(var i = 0, len = old_attributes.length; i < len; i++) {
      new_attributes.setNamedItem(old_attributes.item(i).cloneNode());
    }
  }

  // copy child nodes
  do {
    new_element.appendChild(element.firstChild);
  }
  while(element.firstChild);

  // replace element
  element.parentNode.replaceChild(new_element, element);
  return new_element;
}

function insertNode(selectedNode){
  var new_element;
  // create a node after selectedNode
  if(selectedNode.extentNode.length <= selectedNode.extentOffset){
    new_element = document.createElement("h6");
    new_element.textContent = "new element";
    var nextSibling = selectedNode.extentNode.parentNode.nextSibling;
    nextSibling.parentNode.insertBefore(new_element, nextSibling);
  // create a node before selectedNode
} else if (selectedNode.extentOffset === 0){
    new_element = document.createElement("h6");
    new_element.textContent = "new element";
    var parent = selectedNode.extentNode.parentNode;
    parent.parentNode.insertBefore(new_element, parent);
  // create a node inside selectedNode
  } else {
    var selectedAnchor = selectedNode.anchorNode;
    if(selectedNode.extentNode === selectedNode.anchorNode){
      var textNode1Content = selectedAnchor.textContent.slice(
          0, selectedNode.anchorOffset);
      var newNodeContent = selectedAnchor.textContent.slice(
          selectedNode.anchorOffset, selectedNode.extentOffset);
      var textNode2Content = selectedAnchor.textContent.slice(
          selectedNode.extentOffset);

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

function Region(anchorNode, extentNode, anchorOffset, extentOffset){
  this.anchorNode = anchorNode;
  this.extentNode = extentNode;
  this.anchorOffset = anchorOffset;
  this.extentOffset = extentOffset;
  if(anchorNode.nodeName === "#text"){
    this.anchorElement = anchorNode.parentNode;
  } else {
    this.anchorElement = anchorNode;
  }
  if(extentNode.nodeName === "#text"){
    this.extentElement = extentNode.parentNode;
  } else {
    this.extentElement = extentNode;
  }
}

var Caret = {
  highlightNodeContents: function(el){
    setTimeout(function(){
      var range = document.createRange();
      var sel = window.getSelection();
      range.selectNodeContents(el);
      sel.removeAllRanges();
      sel.addRange(range);
    });
  },
  goToEndOfNode: function(el){
    setTimeout(function(){
      var range = document.createRange();
      var sel = window.getSelection();
      range.selectNodeContents(el);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    });
  }
};

document.onkeyup = function(e){
  console.log("keyup: ", e.keyCode);
  if(e.keyCode === 27){
    var controller = Page.__container__.lookup("controller:editing-tests");
    var boundSend = controller.send.bind(controller);
    boundSend('deselect');
  }
};

document.addEventListener("keydown", function(e) {
  if (e.keyCode === 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    e.preventDefault();
    var controller = Page.__container__.lookup("controller:page");
    var boundSend = controller.send.bind(controller);
    boundSend('save');
    console.log("saved!!!");
  }
}, false);


var CssPage = function () {
    var styleElement = document.createElement('style');
    document.head.appendChild(styleElement);
    this.setDocument = function(string){
        styleElement.innerHTML = string;
    };
};

var cssPage = new CssPage();

var promise =  Ember.$.ajax({
  url: "http://192.241.235.59:1111/api/spoofhtml",
  type: 'get'
});
promise.then(function(response){
  console.log("response's css: ", response);
  cssPage.setDocument(response.css);
});

function css(a) {
  var sheets = document.styleSheets, o = [];
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

var camelCase = function(str){
  console.log("str: ", str);
  return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
};
