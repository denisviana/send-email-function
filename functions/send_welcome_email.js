
const axios = require('axios')
const { api_key } = 'key'//functions.config().mailchimp

const subscribeUser = (emailAddress, firstName, lastName) => {

    const mailchimpApiUrl = 'https://usxx.api.mailchimp.com/3.0'
    const listID = 'id'
    const options = {
          method: 'POST',
          url: `${mailchimpApiUrl}/lists/${listID}/members/`,
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
