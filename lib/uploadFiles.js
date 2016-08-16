YourFileCollection = new FS.Collection("yourFileCollection", {
    stores: [new FS.Store.FileSystem("yourFileCollection")],
});

YourFileCollection.allow({


    insert: function(userId, doc) {
        return true;
    },
    update: function(userId, doc) {
        return true;
    },
    remove: function(userId, doc) {
        return true;
    },
    download: function(userId, doc) {
        return true;
    }
});

if (Meteor.isClient) {

    Template.uploadFile.events({

        'change #your-upload-class': function(event, template) {
            console.log("uploading...");

            FS.Utility.eachFile(event, function(file) {

                console.log("each file...");

                var yourFile = new FS.File(file);
                yourFile.owner = Meteor.userId();
                console.log(yourFile.owner);
                YourFileCollection.insert(yourFile, function(err, fileObj) {

                    console.log("callback for the insert, err: ", err);

                    if (!err && isAudio) {
                        console.log("inserted without error");
                    } else {
                        console.log("there was an error", err);
                    }
                });
            });
        }
    });
}
if (Meteor.isServer) {

    Meteor.publish("fileUploads", function() {
        console.log("publishing fileUploads");
        return YourFileCollection.find();
    });
}
