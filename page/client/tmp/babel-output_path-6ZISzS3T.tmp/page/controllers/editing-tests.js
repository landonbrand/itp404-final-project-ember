define("page/controllers/editing-tests", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({
    selectedTags: {
      data: ["null", "null", "null"]
    },

    selectedTag: {},

    actions: {
      deselect: function deselect() {
        console.log("deselect firing!");
        var elems = document.querySelectorAll(".selected-region");
        [].forEach.call(elems, function (el) {
          el.classList.remove("selected-region");
        });
        console.log("deselecting. SelectedTag: ", this.get("selectedTag"));
        return false;
      },

      mouseUpOnEdits: function mouseUpOnEdits() {
        // remove .selected-region from all elements
        console.log("mouseUpOnEdits firing!");
        var elems = document.querySelectorAll(".selected-region");
        [].forEach.call(elems, function (el) {
          el.classList.remove("selected-region");
        });

        // get selection, then change all relevant elements
        var selected = window.getSelection();
        console.log("Selected: ", selected);
        selected = new SelectedRegion(selected.anchorNode, selected.extentNode, selected.anchorOffset, selected.extentOffset);
        console.log("SelectedRegion: ", selected);
        this.set("selectedTag", selected);
        var elements = {};
        var treeViewer = document.getElementById("treeViewer");
        if (selected.anchorNode == selected.extentNode) {
          if (selected.anchorNode.nodeName == "#text") {
            elements.lastChild = selected.anchorNode.parentElement;
            elements.midChild = elements.lastChild.parentElement;
            elements.parent = elements.midChild.parentElement;

            elements.lastChild.classList.add("selected-region");
            elements.midChild.classList.add("selected-region");
            elements.parent.classList.add("selected-region");

            this.set("selectedTags", {
              data: [elements.lastChild, elements.midChild, elements.parent]
            });
          } else {
            elements.lastChild = selected.anchorNode;
            elements.midChild = elements.lastChild.parentElement;
            elements.parent = elements.midChild.parentElement;
          }
        } else {}
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

      onChange: function onChange() {
        var selectedTag = this.get("selectedTag");
        console.log("selectedTag from onChange: ", selectedTag);
        changeNodeType(selectedTag.anchorNode.parentNode, "h3");

        console.log("onChange fired. SelectedTag: ", selectedTag);
        return false;
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

  function changeNodeType(selectedNode, newType) {
    var element = selectedNode;
    var new_element = document.createElement('h3'),
        old_attributes = element.attributes,
        new_attributes = new_element.attributes;
    // console.log("old attributes", old_attributes);
    // console.log("New attributes", new_attributes);

    // copy attributes
    if (typeof old_attributes !== "undefined") {
      for (var i = 0, len = old_attributes.length; i < len; i++) {
        new_attributes.setNamedItem(old_attributes.item(i).cloneNode());
      }
    }

    // copy child nodes
    console.log("new element", new_element);
    console.log("changeNodeType firing. element: ", element);
    do {
      new_element.appendChild(element.firstChild);
    } while (element.firstChild);

    // replace element
    element.parentNode.replaceChild(new_element, element);
  }

  function byValue(obj) {
    var clonedObj = Object.create(obj).__proto__;
    return clonedObj;
  }

  function SelectedRegion(anchorNode, extentNode, anchorOffset, extentOffset) {
    this.anchorNode = anchorNode;
    this.extentNode = extentNode;
    this.anchorOffset = anchorOffset;
    this.extentOffset = extentOffset;
  }
});