
const axios = require('axios')
const { api_key } = 'b6f02a5596fd8689b535302be9b99a20-us20'//functions.config().mailchimp

const subscribeUser = (emailAddress, firstName, lastName) => {

    const mailchimpApiUrl = 'https://us20.api.mailchimp.com/3.0'
    const listID = '9106632cb1'
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
