define('page/controllers/dashboard', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({

    auth0: new Auth0({
      domain: 'landonbrand.auth0.com',
      clientID: 'JLAa4IzlUImrFFUqkri3OFyeCRgDArox',
      callbackURL: 'http://localhost:4200/dashboard',
      responseType: 'token'
    }),

    isLoggedIn: _ember['default'].computed('auth0', function () {
      var auth0 = this.get("auth0");
      var result = auth0.parseHash(window.location.hash);
      if (result != null) {
        return true;
      } else {
        return false;
      }
    }),

    nickname: "",
    pages: [],

    init: function init() {

      var auth0 = this.get("auth0");
      var result = auth0.parseHash(window.location.hash);
      var _this = this;

      if (result && result.idToken) {
        auth0.getProfile(result.idToken, function (err, profile) {
          _this.set("nickname", profile.nickname);
          var obj = { nickname: _this.get("nickname") };
          var promise = _ember['default'].$.ajax({
            url: "http://192.241.235.59:1111/api/getuserspages",
            data: obj,
            dataType: "text",
            type: 'get'
          });
          return promise.then(function (response) {
            _this.set("pages", JSON.parse(response).pages);
          });
        });
      }
    },
    actions: {

      authenticateUser: function authenticateUser(e) {
        this.get("auth0").login({
          connection: 'github'
        }, function (err) {
          if (err) return alert('Something went wrong: ' + err.message);
          return alert('success signup without login!');
        });
      },

      getPages: function getPages(_this) {
        var obj = { nickname: _this.get("nickname") };
        var promise = _ember['default'].$.ajax({
          url: "http://192.241.235.59:1111/api/getuserspages",
          data: obj,
          dataType: "text",
          type: 'get'
        });
        return promise.then(function (response) {
          _this.set("pages", JSON.parse(response).pages);
        });
      },

      addPage: function addPage() {
        var pageToAdd = document.getElementById("page-to-add");
        var _this = this;
        var data = {
          nickname: this.get("nickname"),
          page: document.getElementById("page-to-add").value
        };
        var promise = _ember['default'].$.post({
          url: "http://192.241.235.59:1111/api/addUsersPage",
          data: JSON.stringify(data),
          dataType: "text"
        });
        promise.then(function (response) {
          _this.send("getPages", _this);
        });
      }
    }
  });
});