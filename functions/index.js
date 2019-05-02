const functions = require('firebase-functions');
const admin = require('firebase-admin');
var fetch = require('isomorphic-fetch')
var btoa = require('btoa');

admin.initializeApp();

exports.onNewUserRegistered = functions.firestore
.document('users/{userId}')
.onCreate((snap, context) => {

  const hiredList = '9106632cb1';
  const hirerList = 'idList2';

    var user = snap.data();

    console.log(user);
    console.log('checking user type...');
    if(user.role === "contratado"){
      console.log('subscribing user on list '+hiredList);
        return subscribeUser(user.fullName,user.email,hiredList)
    }else if(user.role === "contratante"){
      console.log('subscribing user on list '+hirerList);
        return subscribeUser(user.fullName,user.email,hirerList)
    }else
        console.log('exiting...');

return Promise.all([]);
});

function subscribeUser(firstName,emailAddress, listID) {  
  var MAILCHIMP_API_KEY = 'b6f02a5596fd8689b535302be9b99a20-us20'
  var url = 'https://us20.api.mailchimp.com/3.0/lists/' + listID + '/members'
  var method = 'POST'
  var headers = {
    'authorization': "Basic " + btoa('randomstring:' + MAILCHIMP_API_KEY),
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  var body = JSON.stringify({email_address: emailAddress,
    status: 'subscribed',
    merge_fields: {
      'FNAME': firstName,
    }
  });

  return fetch(url, {
    method,
    headers,
    body
  }).then(resp => {
    console.log('successful');
    return resp.json();
  })
  .catch(error => {
    console.log(resp)
  })
}

