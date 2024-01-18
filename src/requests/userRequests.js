import axios from 'axios';
const baseUrl = process.env.REACT_APP_API_URL;

const userRequests = {};
userRequests.createUsers = function(userData){
    return axios.post(`${baseUrl}/users`, userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response;
    }).catch((error) => {
        return error;
    });
    
}

userRequests.loginUsers = function(userData){
    return axios.post(`${baseUrl}/users/login`, userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response;
    }).catch((error) => {
        return error;
    });
    
}

export default userRequests;