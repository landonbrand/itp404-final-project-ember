import Ember from 'ember';

export default Ember.Controller.extend({
  selectedTags: {
    data: ["null", "null", "null"]
  },

  actions: {
    mouseUp: function() {
      console.log(this.get("selectedTags"));
      var selected = window.getSelection();
      var elements = {};
      var treeViewer = document.getElementById("treeViewer");
      // document.getElementById("treeViewer").textContent = "innerHTML";
      if(selected.anchorNode == selected.extentNode){
        if(selected.anchorNode.nodeName == "#text"){
          elements.lastChild = selected.anchorNode.parentElement;
          elements.midChild = elements.lastChild.parentElement;
          elements.parent = elements.midChild.parentElement;
          this.set("selectedTags", {
            data: [elements.lastChild, elements.midChild, elements.parent]
          });
        }
        else {
          elements.lastChild = selected.anchorNode;
          elements.midChild = elements.lastChild.parentElement;
          elements.parent = elements.midChild.parentElement;
        }
      }
      else{
      }
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
