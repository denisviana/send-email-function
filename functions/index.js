const functions = require('firebase-functions');
const admin = require('firebase-admin');
var fetch = require('isomorphic-fetch');
var btoa = require('btoa');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: true }));

admin.initializeApp();

exports.onNewUserRegistered = functions.firestore
.document('users/{userId}')
.onCreate((snap, context) => {

  const hiredList = 'idList1';
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

app.post('/',(req, res)=> {

  var body = req.body;
  var key = req.get('x-key');
  console.log(req.body);
  console.log(body.email);
  if(key === 'xuLa2AvexeKCt6n^WtxYs2?PXS44S+$7wZJSw'){
      return admin.auth().createUser({
        email: body.email,
        password : body.password
      })
      .then(function(userRecord){
        return admin.auth().setCustomUserClaims(userRecord.uid,{admin:true}).then((result)=>{
          return res.status(201).send("User created");
        }).catch((error)=>{
          return res.status(500).send("Failed: "+error);
        });
      }).catch(function(error){
        return res.status(500).send("Failed: "+error);
      });
  }else
    return res.status(401).send("Unauthorized");
});

exports.newUser = functions.https.onRequest(app);

function subscribeUser(firstName,emailAddress, listID) {  
  var MAILCHIMP_API_KEY = 'API_KEY'
  var url = 'https://usxx.api.mailchimp.com/3.0/lists/' + listID + '/members'
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

