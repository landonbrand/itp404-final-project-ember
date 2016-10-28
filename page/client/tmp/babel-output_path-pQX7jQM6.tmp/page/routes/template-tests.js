define("page/routes/template-tests", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    model: function model() {
      var nodes = [{
        tag: "h1",
        content: "Hello, World!"
      }, {
        tag: "h2",
        content: "This is the first page I'm trying to create."
      }, {
        tag: "p",
        content: "Let's see if this works.... I guess."
      }, {
        tag: "p",
        content: [{
          tag: "",
          content: "In this sentence, there is"
        }, {
          tag: "a href='#'",
          content: "a link"
        }, {
          tag: "",
          content: "."
        }]
      }, {
        tag: "p",
        content: [{
          tag: "h1",
          content: "what does this heading look like"
        }, {
          tag: "p",
          content: [{
            tag: "a href='#'",
            content: "what happens to dis link"
          }, {
            tag: "b",
            content: [{
              tag: "i",
              content: "How deep can we go??"
            }, {
              tag: "a style='color:red'",
              content: "DEEP AF"
            }]
          }]
        }]
      }, {
        tag: "p",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      }];
      return nodes;
    }
  });
});