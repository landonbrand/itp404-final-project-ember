define('page/controllers/editing-tests', ['exports', 'ember', 'page/components/class-list-item'], function (exports, _ember, _pageComponentsClassListItem) {
  exports['default'] = _ember['default'].Controller.extend({
    selectedRegion: false,
    selectedClasses: [],

    actions: {
      deselect: function deselect() {
        var elems = document.querySelectorAll(".selected-region");
        [].forEach.call(elems, function (el) {
          el.classList.remove("selected-region");
        });
        this.set("selectedRegion", false);
        return false;
      },

      mouseUpOnEdits: function mouseUpOnEdits() {
        var selected = window.getSelection();
        selected = new Region(selected.anchorNode, selected.extentNode, selected.anchorOffset, selected.extentOffset);
        this.send("selectRegion", selected);
      },

      save: function save() {
        var pageContent = document.getElementById("edit").innerHTML;
        console.log(pageContent);
        var htmlData = {
          html: pageContent
        };
        var promise = $.post({
          url: "http://localhost:3000/api/saveTest",
          data: JSON.stringify(htmlData),
          dataType: "text"
        });
        promise.then(function (response) {
          console.log(response);
        });
      },

      cancelEdits: function cancelEdits() {
        var edit = document.getElementById("edit");
        this.send("cancelEditsOnModel");
        edit.innerHTML = this.get("model");
      },

      noBubble: function noBubble() {
        return false;
      },

      newNode: function newNode() {
        var node = insertNode(this.get("selectedRegion"));
        this.send("selectNode", node);
      },

      changeTag: function changeTag() {
        var selectedRegion = this.get("selectedRegion");
        var tagNameElement = document.getElementById("tagName");
        var newNode = changeNodeType(selectedRegion.anchorElement, tagNameElement.innerHTML.replace(/&nbsp;/gi, '').trim());
        this.send("selectNode", newNode);
        Caret.goToEndOfNode(event.target);
        return false;
      },

      changeId: function changeId() {
        var selectedRegion = this.get("selectedRegion");
        var tagIdElement = document.getElementById("tagId-unfocusable");
        tagIdElement.focus();
        selectedRegion.anchorElement.setAttribute("id", tagIdElement.innerHTML.replace(/&nbsp;/gi, '').trim());
        return false;
      },

      fieldFocused: function fieldFocused(event) {
        event.target.classList.add("selected");
        Caret.highlightNodeContents(event.target);
        return false;
      },

      fieldBlurred: function fieldBlurred(event) {
        event.target.classList.remove("selected");
        return false;
      },

      parentFieldFocused: function parentFieldFocused(event) {
        event.target.parentNode.classList.add("selected");
        Caret.highlightNodeContents(event.target);
        return false;
      },

      parentFieldBlurred: function parentFieldBlurred(event) {
        event.target.parentNode.classList.remove("selected");
        return false;
      },

      selectRegion: function selectRegion(region) {
        var elems = document.querySelectorAll(".selected-region");
        [].forEach.call(elems, function (el) {
          el.classList.remove("selected-region");
        });

        region.anchorElement.classList.add("selected-region");
        region.anchorElement.parentNode.classList.add("selected-region");
        region.anchorElement.parentNode.parentNode.classList.add("selected-region");

        this.set("selectedRegion", region);

        // document.getElementById("tagName").innerHTML = region.anchorElement.nodeName;
        // document.getElementById("tagId-unfocusable").innerHTML = region.anchorElement.id;
        this.send("updateClassList", region.anchorElement);
      },

      selectNode: function selectNode(node) {
        var selected = new Region(node, node, 0, 0);
        this.send("selectRegion", selected);
      },

      updateClassList: function updateClassList(node) {
        var classList = [];
        node.classList.forEach(function (val) {
          classList.push({
            name: val
          });
        });
        this.set("selectedClasses", classList);
      },

      changeClass: function changeClass() {
        // console.log("change Class!!");
        var region = this.get("selectedRegion");
        // console.log(region);
        var newClassList = [];
        var classListItems = _ember['default'].$(".class-list-item");
        var cl = region.anchorElement.classList;
        console.log(region.anchorElement.classList);
        for (var i = 0; i < classListItems.length; i++) {
          // if(!(region.))
          cl.remove(cl[i]);
          console.log(cl[i].textContent);
          cl.add(cl[i].textContent);
        }
        // console.log()
        this.set("selectedRegion", region);
        console.log(region.anchorElement.classList);
        return false;
      }
    },

    modelObserver: _ember['default'].observer('model', function () {
      var edit = document.getElementById("edit");
      if (edit != null) {
        edit.innerHTML = this.get("model");
      }
    })
  });

  // useful functions

  function changeNodeType(element, newType) {
    var new_element = document.createElement(newType),
        old_attributes = element.attributes,
        new_attributes = new_element.attributes;

    // copy attributes
    if (typeof old_attributes !== "undefined") {
      for (var i = 0, len = old_attributes.length; i < len; i++) {
        new_attributes.setNamedItem(old_attributes.item(i).cloneNode());
      }
    }

    // copy child nodes
    do {
      new_element.appendChild(element.firstChild);
    } while (element.firstChild);

    // replace element
    element.parentNode.replaceChild(new_element, element);
    return new_element;
  }

  function insertNode(selectedNode) {
    var new_element;
    // create a node after selectedNode
    if (selectedNode.extentNode.length <= selectedNode.extentOffset) {
      new_element = document.createElement("h6");
      new_element.textContent = "new element";
      var nextSibling = selectedNode.extentNode.parentNode.nextSibling;
      nextSibling.parentNode.insertBefore(new_element, nextSibling);
      // create a node before selectedNode
    } else if (selectedNode.extentOffset == 0) {
        new_element = document.createElement("h6");
        new_element.textContent = "new element";
        var parent = selectedNode.extentNode.parentNode;
        parent.parentNode.insertBefore(new_element, parent);
        // create a node inside selectedNode
      } else {
          var selectedAnchor = selectedNode.anchorNode;
          if (selectedNode.extentNode == selectedNode.anchorNode) {
            var textNode1Content = selectedAnchor.textContent.slice(0, selectedNode.anchorOffset);
            var newNodeContent = selectedAnchor.textContent.slice(selectedNode.anchorOffset, selectedNode.extentOffset);
            var textNode2Content = selectedAnchor.textContent.slice(selectedNode.extentOffset);

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

  function byValue(obj) {
    var clonedObj = Object.create(obj).__proto__;
    return clonedObj;
  }

  function Region(anchorNode, extentNode, anchorOffset, extentOffset) {
    this.anchorNode = anchorNode;
    this.extentNode = extentNode;
    this.anchorOffset = anchorOffset;
    this.extentOffset = extentOffset;
    if (anchorNode.nodeName == "#text") {
      this.anchorElement = anchorNode.parentNode;
    } else {
      this.anchorElement = anchorNode;
    }
    if (extentNode.nodeName == "#text") {
      this.extentElement = extentNode.parentNode;
    } else {
      this.extentElement = extentNode;
    }
  }

  var Caret = {
    highlightNodeContents: function highlightNodeContents(el) {
      setTimeout(function () {
        var range = document.createRange();
        var sel = window.getSelection();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
      });
    },
    goToEndOfNode: function goToEndOfNode(el) {
      setTimeout(function () {
        var range = document.createRange();
        var sel = window.getSelection();
        range.selectNodeContents(el);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      });
    }
  };

  document.onkeyup = function (e) {
    console.log("keyup: ", e.keyCode);
    if (e.keyCode == 27) {
      console.log(Page);
      var controller = Page.__container__.lookup("controller:editing-tests");
      var boundSend = controller.send.bind(controller);
      boundSend('deselect');
    }
  };
});