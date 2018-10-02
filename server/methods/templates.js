if(Meteor.isClient) {
    Template.script_template.onRendered(function() {
        $(document).ready(function() {
            $('.js-example-basic-single').select2();
        });
    });
}