let CLIENT_ID = '951450672419-1f057vlvdvspimp5spujh32utcachngm.apps.googleusercontent.com'
let ORG_CHART_SHEET_ID = '1GEZId7qG4uMk76j0bEMukLI5tGP00zhY4u5Tz663EEY'

let nameIndex = 0
let departmentIndex = 1
let roleIndex = 2
let managerIndex = 3
let emailIndex = 4
let locationIndex = 6
let fallbackEmailIndex = 7
let departments = {}


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