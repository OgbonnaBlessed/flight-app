import axios from 'axios';
import qs from 'qs';

const getAmadeusToken = async () => {
  const client_id = '6g5d9oC2IP82qAYBBjazs1ZiDr0BSOay'; // Replace with actual client_id
  const client_secret = 'rMNqwmFnCsWdrAtD'; // Replace with actual client_secret
  const url = 'https://test.api.amadeus.com/v1/security/oauth2/token';
  
  try {
    const data = qs.stringify({
      grant_type: 'client_credentials',
      client_id: client_id,
      client_secret: client_secret,
    });

    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Amadeus token:', error.response?.data || error.message);
    return null;
  }
};

export default getAmadeusToken;