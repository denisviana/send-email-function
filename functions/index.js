const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const axios = require('axios')
const { api_key } = 'key-us20'

const cors = require('cors')({
    origin: true,
});

exports.onNewUserRegistered = functions.firestore
.document('users/{userId}')
.onCreate((snap, context) => {

    var user = snap.data();
    console.log(user);
    console.log('checking user type...');
    if(user.comprador){
        console.log('subscribing user...');
        subscribeUser(user.email, user.firstName, user.lastName).then(response => {
            console.log('successful');
            return Promise.all();
        }).catch(error =>{
            console.log('error :'+error);
            return Promise.all();
        });

    }else
        console.log('exiting...');

return Promise.all();
});

function subscribeUser (emailAddress, firstName, lastName) {

  const mailchimpApiUrl = 'https://usxx.api.mailchimp.com/3.0';
  const listID = 'id';

  const options = {
        method: 'POST',
        url: mailchimpApiUrl+'/lists/'+listID+'/members/',
        headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    auth: {
      username: 'anystring',
      password: api_key
    },
    data: {
      email_address: emailAddress,
      status: 'subscribed',
      merge_fields: {
        'FNAME': firstName,
        'LNAME': lastName
      }
    }
  }
  
  return axios(options)
}

/* 
export const subscribeUser = async (request, res) => {
    return cors(request, res, () => {
      const { emailAddress, firstName, lastName } = request.body
  
      subscribeUserToMailchimp(emailAddress, firstName, lastName).then(response => {
        // handle success logic
      }).catch(error => {
        // handle error logic
      })
    })
  }
  */
