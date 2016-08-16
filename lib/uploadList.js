var playerID = 0;
var preID = 0;
var wavesurfer =  "";
var Urls = [];
var Ids =[];
if (Meteor.isClient) {

    Meteor.subscribe("fileUploads");
    Template.fileList.helpers({
        theFiles: function() {
            return YourFileCollection.find();
        },
        urlHelper: function(p1, p2){
          Urls.push(p1);
          Ids.push(p2);
        }


    });

    Template.fileList.onRendered(function() {

      wavesurfer = Object.create(WaveSurfer);

      var options = {
          container: '#waveform',
          barWidth: '100',
          height: '50',
      };

      wavesurfer.init(options);
    });


    Template.fileList.events({

        'click #deleteFileButton ': function(event) {
            var option = confirm("Your file is going to be delete... \nYou you sure you want to delete File !")
            if (option) {

                console.log("deleteFile button ", this);
                YourFileCollection.remove({
                    _id: this._id
                });
            }
        },
        'click #playBtn': function(event, template) {

            var dis = document.getElementById(this._id);
            var player = document.getElementById(this._id);
            var hide = document.getElementById(preID);
            var prevPlayer = document.getElementById(preID);

            if (preID == 0) {

                dis.style.display = "inherit";
                console.log(this);
                player.play();

            } else {

                hide.style.display = "none";
                dis.style.display = "inherit";

                if (this._id == preID) {
                    if (prevPlayer.pause)
                        player.play();
                    else
                        player.pause();
                } else {
                    prevPlayer.pause();
                    player.play();
                }

            }

            preID = this._id;

            var index = Ids.indexOf(this._id);
            console.log(index);
            wavesurfer.load(Urls[index]);

            wavesurfer.on('ready', function () {
              wavesurfer.toggleMute();
              wavesurfer.play();
            });

        }

    });

}
