define("page/controllers/editing-tests", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Controller.extend({
    selectedTags: {
      data: ["null", "null", "null"]
    },

    actions: {
      mouseUp: function mouseUp() {
        console.log(this.get("selectedTags"));
        var selected = window.getSelection();
        var elements = {};
        var treeViewer = document.getElementById("treeViewer");
        // document.getElementById("treeViewer").textContent = "innerHTML";
        if (selected.anchorNode == selected.extentNode) {
          if (selected.anchorNode.nodeName == "#text") {
            elements.lastChild = selected.anchorNode.parentElement;
            elements.midChild = elements.lastChild.parentElement;
            elements.parent = elements.midChild.parentElement;
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

      invalidateModel: function invalidateModel() {
        this.refresh();
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
        console.log("cancel edits");
        this.refresh();
        console.log(this.get('model'));
      }

    }
  });
});