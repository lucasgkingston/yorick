// Includes file dependencies
define([
	"jquery",
	"backbone",
    "marionette",
    "text!../templates/patronage-list-item.html",
    "backform",
    "bootstrap-datepicker",
    "moment"
], function( $, Backbone, Marionette, patronage_html, Backform, datepicker, moment ) {

    // Extends Backbone.View
    var View = Backbone.View.extend( {
        initialize: function(options) {
            var view = this;
            view.options = options;
            var momentFormat = 'MM/DD/YYYY';
            var datepickerFormat = 'mm/dd/yyyy';
            var backmodel = view.model.clone();
            backmodel.set("owner", backmodel.get("owner").id);
            backmodel.set("paidOn", moment(backmodel.get("paidOn")).format(momentFormat));
            backmodel.set("expiresOn", moment(backmodel.get("expiresOn")).format(momentFormat));
            var ownerOptions = options.users.map(function (u) {
                return {
                    label: "" + u.get("username") + " " + u.get("realname") + " " + u.get("email"),
                    value: u.id
                }
            });
            view.form = new Backform.Form({
                el: view.$el,
                model: backmodel,
                fields: [
                    {
                        name: "owner",
                        label: "Owner",
                        control: "select",
                        options: ownerOptions
                    },
                    {
                        name: "paidOn",
                        label: "Paid on",
                        control: "datepicker",
                        type: "text",
                        options: {
                            autoclose: true,
                            format: datepickerFormat
                        }
                    },
                    {
                        name: "expiresOn",
                        label: "Expires on",
                        control: "datepicker",
                        type: "text",
                        options: {
                            autoclose: true,
                            format: datepickerFormat
                        }
                    },
                    {
                        name: "submit",
                        control: "button",
                        label: "Save Changes"
                    }
                ],
                events: {
                    "submit": function (e) {
                        var self = this;
                        e.preventDefault();
                        var oid = self.model.get("owner");
                        var dau = view.options.users.get(oid);
                        view.model.set({
                            "paidOn": moment(self.model.get("paidOn"), momentFormat).toDate(),
                            "expiresOn": moment(self.model.get("expiresOn"), momentFormat).toDate(),
                            "owner": new Parse.User({id: self.model.get("owner")})
                        })
                        view.model.save().then(function () {
                            self.fields.at(3).set({status: "success", message: "Save completed"});
                            _.defer(function () {
                                $("body").enhanceWithin();
                            });
                        }).fail(function(error) {
                            self.model.errorModel.set("owner", _.escape(error.message));
                        })
                    }
                }
            });
        },
        tagName: 'form',
        render: function() {
            this.form.render();
            this.$el.enhanceWithin();

            return this;
        }
    } );

    // Returns the View class
    return View;

} );