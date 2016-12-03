define("page/helpers/class-id", ["exports", "ember"], function (exports, _ember) {
  exports.classId = classId;

  function classId(params) {

    return "class-id-" + params;
  }

  exports["default"] = _ember["default"].Helper.helper(classId);
});