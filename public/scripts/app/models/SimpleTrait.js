// Category Model
// ==============

// Includes file dependencies
define([
	"jquery",
	"parse"
], function( $, Parse ) {

    // The Model constructor
    var Model = Parse.Object.extend( "SimpleTrait", {
        linkId: function() {
            return this.id || this.cid;
        },

        get_base_name: function() {
            var self = this;
            var s = self.get("name").split(": ");
            return s[0];
        },

        get_specialization: function() {
            var self = this;
            var s = self.get("name").split(": ");
            return s[1];
        },

        set_specialization: function(specialization) {
            var self = this;
            self.set("name", self.get_base_name() + ": " + specialization);

            return self;
        }
    } );

    // Returns the Model class
    return Model;

} );