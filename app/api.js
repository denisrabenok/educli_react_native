import Base64 from "./utils/Base64";
import consts from "./const";
import queryString from "query-string";
import { Alert } from 'react-native';
import FormData from 'FormData';
// work with api goes here

export function getNotifications(token, idUser) {
    const params = queryString.stringify({
        idUser: idUser,
    });
    var formData = new FormData();
    formData.append('token', token);
    return fetch(`https://www.educli.com/ajax/api-get-notes?${params}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    })
        .then((response) => response.json())
        .then((responsJson) => {
            // Alert.alert('api result: ' + responsJson.data.userProfile.passport);
            return responsJson;
        })
        .catch((error) => {
            console.log(error);
        });
}


export function updateUserInfo(token, idUser, userinfo) {
    const params = queryString.stringify({
        idUser: idUser,
    });
    state = {
        firstName: '',
        surName: '',
        email: '',
        confirmemail: '',
        address: '',
        phone: '',
        mobile: '',
        passportnumber: '',
        expirydate: '',
        issuedate: '',
        dateofbirth: ''
    }
    var formData = new FormData();
    formData.append('token', token);
    formData.append('name', userinfo.firstName);
    formData.append('surname', userinfo.surName);
    formData.append('email', userinfo.email);
    formData.append('address', userinfo.address);
    formData.append('phone', userinfo.phone);
    formData.append('mobile', userinfo.mobile);
    formData.append('passport', userinfo.passportnumber);
    formData.append('passportIssueDate', userinfo.issuedate);
    formData.append('passportExpiryDate', userinfo.expirydate);
    formData.append('birthDate', userinfo.dateofbirth);
    return fetch(`https://www.educli.com/ajax/user-update?${params}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    })
        .then((response) => response.json())
        .then((responsJson) => {
            // Alert.alert('api result: ' + responsJson.data.userProfile.passport);
            return responsJson;
        })
        .catch((error) => {
            console.log(error);
        });
}
export function getUserInfo(token, idUser) {
    const params = queryString.stringify({
        idUser: idUser,
    });
    var formData = new FormData();
    formData.append('token', token);
    return fetch(`https://www.educli.com/ajax/user-info?${params}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    })
        .then((response) => response.json())
        .then((responsJson) => {
            // Alert.alert('api result: ' + responsJson.data.userProfile.passport);
            return responsJson;
        })
        .catch((error) => {
            console.log(error);
        });
}


export function getStudentAttendance(token, idUser) {
    // idUser = '8417'
    const params = queryString.stringify({
        idUser: idUser,
    });
    var formData = new FormData();
    formData.append('token', token);
    return fetch(`https://www.educli.com/ajax/get-student-attendance?${params}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    })
        .then((response) => response.json())
        .then((responsJson) => {
            // Alert.alert('api result: ' + responsJson.data.userProfile.passport);
            // console.log(responsJson.data.timetables);
            return responsJson.data.timetables;
        })
        .catch((error) => {
            console.log(error);
        });
}


export function getStudentCourses(token, idUser) {
    // idUser = '8417'
    const params = queryString.stringify({
        idUser: idUser,
    });
    var formData = new FormData();
    formData.append('token', token);
    return fetch(`https://www.educli.com/ajax/get-student-courses?${params}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    })
        .then((response) => response.json())
        .then((responsJson) => {
            // Alert.alert('api result: ' + responsJson.data.userProfile.passport);
            // console.log(responsJson.data.timetables);
            return responsJson.data;
        })
        .catch((error) => {
            console.log(error);
        });
}


export function getStudentAcademicProgress(token, idUser) {
    // idUser = '8417'
    const params = queryString.stringify({
        idUser: idUser,
    });
    var formData = new FormData();
    formData.append('token', token);
    return fetch(`https://www.educli.com/ajax/get-student-academic?${params}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    })
        .then((response) => response.json())
        .then((responsJson) => {
            // Alert.alert('api result: ' + responsJson.data.userProfile.passport);
            // console.log(responsJson.data.timetables);
            return responsJson.data;
        })
        .catch((error) => {
            console.log(error);
        });
}


export function getPayments(token, idUser) {
    // idUser = '8417'
    const params = queryString.stringify({
        idUser: idUser,
    });
    var formData = new FormData();
    formData.append('token', token);
    return fetch(`http://www.educli.com/ajax/api-get-installments?${params}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    })
        .then((response) => response.json())
        .then((responsJson) => {
            // Alert.alert('api result: ' + responsJson.data.userProfile.passport);
            // console.log(responsJson.data.timetables);
            return responsJson.data;
        })
        .catch((error) => {
            console.log(error);
        });
}

export function login(email, password) {
    // Alert.alert('api: ' + email + ' ' + password);
    // email = 'yanni_au@hotmail.com';
    // password = '123456789';
    var formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    return fetch('https://www.educli.com/ajax/user-login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    })
        .then((response) => response.json())
        .then((responsJson) => {
            // Alert.alert('api test: ' + email + ' ' + password)
            // Alert.alert('api result: ' + responsJson.status);
            return responsJson;
        })
        .catch((error) => {
            console.log(error);
        });
}


export function signup(email, password) {
    Alert.alert('api: ' + email + ' ' + password);
    // email = 'yanni_au@hotmail.com';
    // password = '123456789';
    var formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    return fetch('https://www.educli.com/ajax/user-signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    })
        .then((response) => response.json())
        .then((responsJson) => {
            // Alert.alert('api test: ' + email + ' ' + password)
            // Alert.alert('api result: ' + responsJson.status);
            return responsJson;
        })
        .catch((error) => {
            console.log(error);
        });
}

export function logOut(authId, username, password) {
    return fetch(`https://api.github.com/authorizations/${authId}`, {
        method: 'DELETE',
        headers: getAuthHeader(username, password)
    })
        .then((user) => {
            return user.json();
        })
        .catch((error) => {
            console.log(error);
        });
}
function getAuthHeader(username, password) {
    const baseString = Base64.btoa(`${username}:${password}`).replace('\n', '\\n');
    return {
        ...consts.BASE_HEADER,
        "Authorization": `Basic ${baseString}`
    }
}