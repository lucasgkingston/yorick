// Includes File Dependencies
require([
    "jquery",
    "parse",
    "app/routers/mobileRouter",
    "app/collections/BNSMETV1_ClanRules",
    "moment"
], function ( $, Parse, Mobile, ClanRules, moment ) {

    $( document ).on( "mobileinit",

        // Set up the "mobileinit" handler before requiring jQuery Mobile's module
        function () {

            // Prevents all anchor click handling including the addition of active button state and alternate link bluring.
            $.mobile.linkBindingEnabled = false;

            // Disabling this will prevent jQuery Mobile from handling hash changes
            $.mobile.hashListeningEnabled = false;

            $( "[data-role='navbar']" ).navbar();
            $( "[data-role='header'], [data-role='footer']" ).toolbar();
        }
    )

    $( document ).on( "pagecontainerchange", function() {
        // Each of the four pages in this demo has a data-title attribute
        // which value is equal to the text of the nav button
        // For example, on first page: <div data-role="page" data-title="Info">
        var current = $( ".ui-page-active" ).jqmData( "title" );
        // Change the heading
        $( "[data-role='header'] h1" ).text( current );
        // Remove active class from nav buttons
        $( "[data-role='navbar'] a.ui-btn-active" ).removeClass( "ui-btn-active" );
        // Add active class to current nav button
        $( "[data-role='navbar'] a" ).each(function() {
            if ( $( this ).text() === current ) {
                $( this ).addClass( "ui-btn-active" );
            }
        });
    });

    require( [ "jquerymobile" ], function () {

        Parse.$ = $;

        Parse.initialize("rXfLuSWZZs1xxyeX4IzlG1ZCuglbIoDlGHwg68Ru", "yymp8UWnJ7Va32Y2Q4uzvWxfPTYuDvZSA8kdhmdR");

        // Instantiates a new Backbone.js Mobile Router
        this.router = new Mobile();

        // Instantiates global rule access
        this.BNSMETV1_ClanRules = new ClanRules;
        this.BNSMETV1_ClanRules.fetch();
    });
});
