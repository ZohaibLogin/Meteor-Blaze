if (Meteor.isClient) {

    Meteor.subscribe("fileUploads");
    Template.player.helpers({
        theFiles: function() {
            return YourFileCollection.find();
        }
    });
}
