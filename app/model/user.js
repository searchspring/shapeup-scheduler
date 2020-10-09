const m = require('mithril')
const User = {
    token: '',
    user: null,
    signIn: () => {

        let clientId = '951450672419-1f057vlvdvspimp5spujh32utcachngm.apps.googleusercontent.com'

        gapi.load('client:auth2', () => {
            var SCOPE = 'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/admin.directory.user https://www.googleapis.com/auth/admin.directory.user.readonly'
            gapi.client.init({
                'clientId': clientId,
                'scope': SCOPE,
                'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
            }).then(function () {
                gapi.auth2.getAuthInstance().isSignedIn.listen(User.updateSignInStatus);
                User.updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            }).catch((e)=>{
                alert(JSON.stringify(e))
            })
        });
    },
    updateSignInStatus: (isSignedIn) => {
        if (isSignedIn) {
            User.user = gapi.auth2.getAuthInstance().currentUser.get()
            User.token = User.user.getAuthResponse()['access_token']
            m.redraw()
        } else {
            gapi.auth2.getAuthInstance().signIn()
        }

    }
}
module.exports = User