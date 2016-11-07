define("page/helpers/tag-start", ["exports", "ember"], function (exports, _ember) {
  exports.tagStart = tagStart;

  function tagStart(inputNode) {

    var renderNode = function renderNode(node) {
      console.log(node);
      var tag = node.tag;
      var content = node.content;
      var outputArray = [];
      if (tag != "") {
        outputArray.push("<" + tag + ">");
      }
      if (typeof content === "string") {
        outputArray.push(content);
      } else if (typeof content === "object" && content !== "null") {
        outputArray.push(loopThroughNodes(content));
      }
      if (tag != "") {
        outputArray.push("</" + tag + ">");
      }
      var renderedNodes = outputArray.join("");
      console.log(renderedNodes);
      return renderedNodes;
    };

    var loopThroughNodes = function loopThroughNodes(items) {
      var renderedNodes = [];
      for (var i = 0; i < items.length; i++) {
        renderedNodes.push(renderNode(items[i]));
      }
      return renderedNodes.join("");
    };

    return loopThroughNodes(inputNode);
  }

  exports["default"] = _ember["default"].Helper.helper(tagStart);
});