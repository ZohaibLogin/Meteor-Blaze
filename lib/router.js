FlowRouter.route( '/', {
  action: function() {
    BlazeLayout.render( 'applicationLayout', { main: 'fileList' } );
  }
});

FlowRouter.route( '/uploadFile', {
  action: function() {
    BlazeLayout.render( 'applicationLayout', { main: 'uploadFile' } );
  }
});
