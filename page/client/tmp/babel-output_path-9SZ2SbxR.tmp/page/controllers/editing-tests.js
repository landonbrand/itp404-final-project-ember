define("page/controllers/editing-tests", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({
    selectedRegion: {},

    actions: {
      deselect: function deselect() {
        console.log("deselect firing!");
        var elems = document.querySelectorAll(".selected-region");
        [].forEach.call(elems, function (el) {
          el.classList.remove("selected-region");
        });
        console.log("deselecting. selectedRegion: ", this.get("selectedRegion"));
        return false;
      },

      mouseUpOnEdits: function mouseUpOnEdits() {
        var selected = window.getSelection();
        console.log("Selected: ", selected);
        selected = new Region(selected.anchorNode, selected.extentNode, selected.anchorOffset, selected.extentOffset);
        console.log("selectedRegion: ", selected);
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
        console.log("noBubble");
        return false;
      },

      newNode: function newNode() {
        var node = insertNode(this.get("selectedRegion"));
        console.log("newNode's node: ", node);
        this.send("selectNode", node);
      },

      changeTag: function changeTag() {
        var selectedRegion = this.get("selectedRegion");
        var tagNameElement = document.getElementById("tagName");
        tagNameElement.focus();
        console.log("selectedRegion from onChange: ", selectedRegion);
        var newNode = changeNodeType(selectedRegion.anchorElement, tagNameElement.innerHTML.replace(/&nbsp;/gi, '').trim());
        this.send("selectNode", newNode);
        console.log("onChange fired. selectedRegion: ", selectedRegion);
        setWindowSelection(tagNameElement, 1, 1);
        return false;
      },

      changeId: function changeId() {
        var selectedRegion = this.get("selectedRegion");
        var tagIdElement = document.getElementById("tagId-unfocusable");
        tagIdElement.focus();
        console.log("selectedRegion from changeId: ", selectedRegion);
        selectedRegion.anchorElement.setAttribute("id", tagIdElement.innerHTML.replace(/&nbsp;/gi, '').trim());
        setWindowSelection(tagNameElement, 1, 1);
        return false;
      },

      fieldFocused: function fieldFocused(event) {
        event.target.classList.add("selected");
        console.log(event.target);
        setWindowSelection(event.target, 0, event.target.textContent.length);
        return false;
      },

      fieldBlurred: function fieldBlurred(event) {
        event.target.classList.remove("selected");
        return false;
      },

      parentFieldFocused: function parentFieldFocused(event) {
        event.target.parentNode.classList.add("selected");
        setWindowSelection(event.target, 0, event.target.textContent.length);
        return false;
      },

      parentFieldBlurred: function parentFieldBlurred(event) {
        event.target.parentNode.classList.remove("selected");
        return false;
      },

      selectRegion: function selectRegion(region) {
        console.log("region: ", region);
        var elems = document.querySelectorAll(".selected-region");
        [].forEach.call(elems, function (el) {
          el.classList.remove("selected-region");
        });

        region.anchorElement.classList.add("selected-region");
        region.anchorElement.parentNode.classList.add("selected-region");
        region.anchorElement.parentNode.parentNode.classList.add("selected-region");

        this.set("selectedRegion", region);

        document.getElementById("tagName").innerHTML = region.anchorElement.nodeName;
        document.getElementById("tagId-unfocusable").innerHTML = region.anchorElement.id;
      },

      selectNode: function selectNode(node) {
        console.log("node: ", node);
        var selected = new Region(node, node, 0, 0);
        console.log("selectedFromSelectNode: ", selected);
        this.send("selectRegion", selected);
      }
    },

    modelObserver: _ember["default"].observer('model', function () {
      var edit = document.getElementById("edit");
      console.log(edit);
      if (edit != null) {
        edit.innerHTML = this.get("model");
        console.log("changing edit's html");
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
    console.log("new element", new_element);
    console.log("element: ", element);
    console.log("firstChild: ", element.firstChild);
    do {
      new_element.appendChild(element.firstChild);
    } while (element.firstChild);

    // replace element
    element.parentNode.replaceChild(new_element, element);
    return new_element;
  }

  function insertNode(selectedNode) {
    console.log("node inserted");
    console.log(selectedNode);
    var new_element;
    // create a node after selectedNode
    if (selectedNode.extentNode.length <= selectedNode.extentOffset) {
      new_element = document.createElement("h6");
      new_element.textContent = "new element";
      console.log("NEED TO CREATE NEW NODE");
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
          console.log("YO LETS NEST THESE NODES INSIDE EACHOTHER");
          if (selectedNode.extentNode == selectedNode.anchorNode) {
            console.log("easy peasy");
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
    console.log("New_element: ", new_element);
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
    console.log("new Region", this);
  }

  function setWindowSelection(el, start, end) {
    setTimeout(function () {
      var range = document.createRange();
      var sel = window.getSelection();
      range.setStart(el, start);
      range.collapse(true);
      range.setEndAfter(el, end);
      sel.removeAllRanges();
      sel.addRange(range);
      console.log("changed range");
    }, 10);
  }
});