define('page/helpers/tag-start', ['exports', 'ember'], function (exports, _ember) {
  exports.tagStart = tagStart;

  function tagStart(html) {
    return html;
  }

  exports['default'] = _ember['default'].Helper.helper(tagStart);
});