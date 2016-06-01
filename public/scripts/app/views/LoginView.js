// Includes file dependencies
define([
    "jquery",
    "backbone",
    "parse",
    "hello",
    "../helpers/PromiseFailReport",
    "../helpers/InjectAuthData"
], function( $, Backbone, Parse, hello, PromiseFailReport, InjectAuthData ) {

    // Extends Backbone.View
    var LoginView = Backbone.View.extend( {
        events: {
            "submit form.login-form": "logIn",
            "click #login-with-facebook": "logInWithFacebook",
        },

        el: "#login",

        initialize: function() {
            _.bindAll(this, "logIn");
            this.render();
        },

        logInWithFacebook: function (e) {
            var self = this;
            e.preventDefault();
            self.undelegateEvents();
            self.$(".login-form .error").hide();
            this.$(".login-form button").attr("disabled", "disabled");

            Parse.FacebookUtils.logIn("email").then(function (user) {
                return Parse.User._currentAsync();
            }).then(function (user) {
                return hello('facebook').api('/me');
            }).then(function (r) {
                return Parse.Cloud.run("submit_facebook_profile_data", r);
            }).then(function (id) {
                return new Parse.Query("UserFacebookData").get(id);
            }).then(function (storage) {
                var r = storage.attributes;
                var user = Parse.User.current();
                console.log(user.get("authData").facebook.access_token);
                if (!user.has("email"))
                    user.set("email", r.email);
                if (!user.has("realname"))
                    user.set("realname", r.name);
                InjectAuthData(user);

                console.log(user.get("authData").facebook.access_token);
                console.log(hello('facebook').getAuthResponse().access_token);
                return user.save();
            }).then(function () {
                var b = $.mobile.changePage(window.location.hash, {allowSamePageTransition: true, changeHash: false});
                var a = Parse.history.loadUrl();
            }, function (error) {
                console.log(JSON.stringify(error));
                if (!_.isUndefined(trackJs))
                    trackJs.console.error("Error in promise", JSON.stringify(error));
                self.$(".login-form .error").html(_.escape(error.message)).show();
                self.$(".login-form button").removeAttr("disabled");
                self.delegateEvents();
            });
        },

        logIn: function(e) {
            var self = this;
            self.$(".login-form .error").hide();
            var username = this.$("#login-username").val();
            var password = this.$("#login-password").val();
            e.preventDefault();
            self.undelegateEvents();
            Parse.User.logIn(username, password, {
                success: function(user) {
                    location.reload();
                },

                error: function(user, error) {
                    self.$(".login-form .error").html(_.escape(error.message)).show();
                    self.$(".login-form button").removeAttr("disabled");
                    self.delegateEvents();
                }
            });

            return false;
        },

        render: function() {
            this.template = _.template($("#login-template").html())();
            this.$el.find("div[role='main']").html(this.template);
            this.$el.enhanceWithin();
            this.delegateEvents();
        }
    });

    // Returns the View class
    return LoginView;

} );