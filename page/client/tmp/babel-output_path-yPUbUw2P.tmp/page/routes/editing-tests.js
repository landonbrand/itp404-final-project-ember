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

      // save: function(){
      //   var parseNode = function(node){
      //     if(node.childNodes.length > 1){
      //       var obj = {};
      //       obj.tag = node.nodeName;
      //       obj.content = [];
      //       for(var i = 0; i < node.children.length; i++){
      //         obj.content.push(parseNode(node.children[i]));
      //       }
      //     }
      //     else {
      //       var obj = {
      //         tag: node.nodeName,
      //         content: node.innerText
      //       }
      //     }
      //     return obj;
      //   };
      //   var rootNode = document.getElementById("edit");
      //   var nodes = [];
      //   for(var i = 0; i < rootNode.childNodes.length; i++){
      //     if(rootNode.childNodes[i].nodeName != "#text"){
      //       nodes.push(parseNode(rootNode.childNodes[i]));
      //     }
      //   }
      //   console.log(nodes);
      //
      //   $.ajax({
      //     url: "/api/saveTest",
      //
      //   })
      // },

      save: function save() {
        var parseNode = function parseNode(node) {
          if (node.childNodes.length > 1) {
            var obj = {};
            obj.tag = node.nodeName;
            obj.content = [];
            for (var i = 0; i < node.children.length; i++) {
              obj.content.push(parseNode(node.children[i]));
            }
          } else {
            var obj = {
              tag: node.nodeName,
              content: node.innerText
            };
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
        var nodesJSON = JSON.stringify(nodesObject);
        // nodesJSON = nodesJSON.slice(0, -2);
        // var nodesJSON = nodesObject;
        console.log(nodesJSON);
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
        console.log(this.get('model'));
      }

    }
  });
});