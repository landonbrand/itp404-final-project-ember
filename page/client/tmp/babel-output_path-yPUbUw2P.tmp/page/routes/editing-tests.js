define('page/routes/editing-tests', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      var cursorPos = 0;
      var nodes;

      var promise = $.ajax({
        url: "http://localhost:3000/api/spoofnodes",
        type: 'get'
      });
      return promise.then(function (response) {
        return response.data;
      });
    },

    actions: {
      invalidateModel: function invalidateModel() {
        this.refresh();
      },

      save: function save() {
        var parseNode = function parseNode(node) {
          if (node.childNodes.length > 1) {
            var obj = {};
            obj.tag = node.nodeName;
            obj.content = [];
            // console.log(node.innerText);
            var text = node.textContent;
            var snipLoc = text.indexOf(node.children[0].textContent);
            var lastSnip = 0;
            for (var i = 0; i < node.children.length; i++) {
              if (snipLoc > 0) {
                var subText = text.slice(lastSnip, snipLoc);
                obj.content.push({
                  tag: "",
                  content: subText
                });
              }
              obj.content.push(parseNode(node.children[i]));
              lastSnip = text.indexOf(node.children[i].textContent) + node.children[i].textContent.length;
              snipLoc = text.indexOf(node.children[i].textContent);
            }
            if (text.length > lastSnip) {
              var subText = text.slice(lastSnip, text.length);
              obj.content.push({
                tag: "",
                content: subText
              });
            }
          } else {
            var obj = {
              tag: node.nodeName,
              content: node.innerText
            };
            // console.log(obj);
          }
          return obj;
        };

        var rootNode = document.getElementById("edit");
        var nodes = [];
        for (var i = 0; i < rootNode.childNodes.length; i++) {
          if (rootNode.childNodes[i].nodeName != "#text") {
            nodes.push(parseNode(rootNode.childNodes[i]));
          }
        }
        var nodesObject = {
          data: nodes
        };
        // console.log(nodesObject);
        var nodesJSON = JSON.stringify(nodesObject);
        // nodesJSON = nodesJSON.slice(0, -2);
        // var nodesJSON = nodesObject;
        // console.log(nodesJSON);
        var promise = $.post({
          url: "http://localhost:3000/api/saveTest",
          data: nodesJSON,
          dataType: "text"
        });
        promise.then(function (response) {
          // console.log(response);
        });
      },

      cancelEdits: function cancelEdits() {
        this.refresh();
      }

    }
  });
});