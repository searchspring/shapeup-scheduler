let CLIENT_ID = '951450672419-1f057vlvdvspimp5spujh32utcachngm.apps.googleusercontent.com'

let GS = {}

gapi.load('client:auth2', () => {
    var SCOPE = 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/admin.directory.user https://www.googleapis.com/auth/admin.directory.user.readonly'
    gapi.client.init({
        'clientId': CLIENT_ID,
        'scope': SCOPE,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    })
})


function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        GS.user = gapi.auth2.getAuthInstance().currentUser.get()
        GS.token = GS.user.getAuthResponse()['access_token']
    } else {
        gapi.auth2.getAuthInstance().signIn()
    }
}