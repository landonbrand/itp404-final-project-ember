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

    invalidateModel: function() {
      this.refresh();
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

    cancelEdits: function(){
      console.log("cancel edits");
      this.refresh();
      console.log(this.get('model'));
    }


  }
});
