import Ember from 'ember';

export function tagStart(inputNode) {

  var renderNode = function(node){
    // console.log(node);
    var tag = node.tag;
    var content = node.content;
    var outputArray = [];
    if(tag != ""){
      outputArray.push("<" + tag + ">");

    }
    if(typeof content === "string"){
      outputArray.push(content);
    } else if(typeof content === "object" && content !== "null"){
      outputArray.push(loopThroughNodes(content));
    }
    if(tag != ""){
      outputArray.push("</" + tag + ">");
    }
    var renderedNodes = outputArray.join("");
    // console.log(renderedNodes);
    return renderedNodes;
  };


  var loopThroughNodes = function(items){
    var renderedNodes = [];
    for(var i = 0; i < items.length; i++){
      renderedNodes.push(renderNode(items[i]));
    }
    return renderedNodes.join("");
  }


  return loopThroughNodes(inputNode)
}

export default Ember.Helper.helper(tagStart);
