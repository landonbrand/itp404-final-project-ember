import Ember from 'ember';

export default Ember.Controller.extend({
  selectedTag: {},

  actions: {
    deselect: function() {
      console.log("deselect firing!");
      var elems = document.querySelectorAll(".selected-region");
      [].forEach.call(elems, function(el) {
          el.classList.remove("selected-region");
      });
      console.log("deselecting. SelectedTag: ", this.get("selectedTag"));
      return false;
    },

    mouseUpOnEdits: function() {
      var selected = window.getSelection();
      console.log("Selected: ", selected);
      selected = new SelectedRegion(selected.anchorNode, selected.extentNode,
          selected.anchorOffset, selected.extentOffset);
      console.log("SelectedRegion: ", selected);
      this.send("selectNode", selected);
    },

    save: function(){
      var pageContent = document.getElementById("edit").innerHTML;
      console.log(pageContent);
      var htmlData = {
        html: pageContent
      };
      var promise =  $.post({
        url: "http://localhost:3000/api/saveTest",
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
      console.log("noBubble");
      return false;
    },

    newNode: function(){
      insertNode(this.get("selectedTag"));
    },

    changeTag: function(){
      var selectedTag = this.get("selectedTag");
      console.log("selectedTag from onChange: ", selectedTag);
      changeNodeType(selectedTag.anchorNode.parentNode, document.getElementById("tagName").innerHTML.replace(/&nbsp;/gi,'').trim());

      console.log("onChange fired. SelectedTag: ", selectedTag);
      return false;
    },

    fieldFocused: function(event){
      event.target.classList.add("selected");
      return false;
    },

    fieldBlurred: function(event){
      event.target.classList.remove("selected");
      return false;
    },

    parentFieldFocused: function(event){
      event.target.parentNode.classList.add("selected");
      return false;
    },

    parentFieldBlurred: function(event){
      event.target.parentNode.classList.remove("selected");
      return false;
    },

    selectNode: function(selection){
      if(selection.anchorNode.nodeName == "#text"){
        var node = selection.anchorNode.parentNode;
      } else {
        var node = selection.anchorNode;
      }
      var parent = node.parentNode;
      var grandParent = node.parentNode.parentNode;

      // remove .selected-region from all elements
      var elems = document.querySelectorAll(".selected-region");
      [].forEach.call(elems, function(el) {
          el.classList.remove("selected-region");
      });

      node.classList.add("selected-region");
      parent.classList.add("selected-region");
      grandParent.classList.add("selected-region");

      document.getElementById("tagName").innerHTML = node.nodeName;
    }
  },

  modelObserver: Ember.observer('model', function() {
    var edit = document.getElementById("edit");
    console.log(edit);
    if(edit != null){
      edit.innerHTML = this.get("model");
      console.log("changing edit's html");
    }
  })
});

// useful functions

function changeNodeType(selectedNode, newType){
  var element = selectedNode;
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
  console.log("new element", new_element);
  console.log("changeNodeType firing. element: ", element);
  do {
    new_element.appendChild(element.firstChild);
  }
  while(element.firstChild);

  // replace element
  element.parentNode.replaceChild(new_element, element);
}

function insertNode(selectedNode){
  console.log("node inserted");
  console.log(selectedNode);
  var new_element = document.createElement("h6");
  new_element.textContent = "new element";

  // create a node after selectedNode
  if(selectedNode.extentNode.length <= selectedNode.extentOffset){
    console.log("NEED TO CREATE NEW NODE");
    var nextSibling = selectedNode.extentNode.parentNode.nextSibling;
    nextSibling.parentNode.insertBefore(new_element, nextSibling);
  // create a node before selectedNode
  } else if (selectedNode.extentOffset == 0){
    var parent = selectedNode.extentNode.parentNode;
    parent.parentNode.insertBefore(new_element, parent);
  // create a node inside selectedNode
  } else {
    var selectedAnchor = selectedNode.anchorNode;
    console.log("YO LETS NEST THESE NODES INSIDE EACHOTHER");
    if(selectedNode.extentNode == selectedNode.anchorNode){
      console.log("easy peasy");
      var textNode1Content = selectedAnchor.textContent.slice(
          0, selectedNode.anchorOffset);
      var newNodeContent = selectedAnchor.textContent.slice(
          selectedNode.anchorOffset, selectedNode.extentOffset);
      var textNode2Content = selectedAnchor.textContent.slice(
          selectedNode.extentOffset);

      var textNode1 = document.createTextNode(textNode1Content);
      var newTextNode = document.createTextNode(newNodeContent);
      var textNode2 = document.createTextNode(textNode2Content);
      var newNode = document.createElement("b");
      newNode.appendChild(newTextNode);
      selectedAnchor.parentNode.insertBefore(textNode1, selectedAnchor);
      selectedAnchor.parentNode.insertBefore(newNode, selectedAnchor);
      selectedAnchor.parentNode.insertBefore(textNode2, selectedAnchor);
      selectedAnchor.remove();
    } else {
      console.log("this looks tough...");
    }

    document.getElementById("tagName").focus();
  }

  // create a node as a sibling of selectedNode

}

function byValue(obj){
  var clonedObj = Object.create(obj).__proto__;
  return clonedObj;
}

function SelectedRegion(anchorNode, extentNode, anchorOffset, extentOffset){
  this.anchorNode = anchorNode;
  this.extentNode = extentNode;
  this.anchorOffset = anchorOffset;
  this.extentOffset = extentOffset;
}
