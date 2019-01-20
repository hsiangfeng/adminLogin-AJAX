const sendPost = document.getElementById('sendPost');
const sendPostLogin = document.getElementById('sendPostLogin');
const sendJSON = document.getElementById('sendJSON');
const sendJSONLogin = document.getElementById('sendJSONLogin');

sendPost.addEventListener('click', signupPost);
sendPostLogin.addEventListener('click', signinPost);
sendJSON.addEventListener('click', signupJSON);
sendJSONLogin.addEventListener('click', signinJSON);

const resultList = document.querySelector('.resultList');

const admingObj = {
    lineModel: 'POST',
    signinUrl: 'https://hexschool-tutorial.herokuapp.com/api/signin',
    signupUrl: 'https://hexschool-tutorial.herokuapp.com/api/signup',
    postHeader: 'application/x-www-form-urlencoded',
    jsonHeader: 'application/json',
}

Object.freeze(admingObj);


function signinPost(e) {
    e.preventDefault();
    const emailPost = document.getElementById('emailPost');
    const passwdPost = document.getElementById('passwdPost');
    const str = `email=${emailPost.value}&password=${passwdPost.value}`;
    XHRCall(admingObj.lineModel, admingObj.signinUrl, admingObj.postHeader, str, 'POST');
}

function signupPost(e) {
    e.preventDefault();
    const emailPost = document.getElementById('emailPost');
    const passwdPost = document.getElementById('passwdPost');
    const str = `email=${emailPost.value}&password=${passwdPost.value}`;
    XHRCall(admingObj.lineModel, admingObj.signupUrl, admingObj.postHeader, str, 'POST');
}

function signinJSON(e) {
    e.preventDefault();
    const emailJSON = document.getElementById('emailJSON');
    const passwdJSON = document.getElementById('passwdJSON');
    const data = {
        email: emailJSON.value,
        password: passwdJSON.value
    }
    const str = JSON.stringify(data);
    XHRCall(admingObj.lineModel, admingObj.signinUrl, admingObj.jsonHeader, str, 'JSON');
}

function signupJSON(e) {
    e.preventDefault();
    const emailJSON = document.getElementById('emailJSON');
    const passwdJSON = document.getElementById('passwdJSON');
    const data = {
        email: emailJSON.value,
        password: passwdJSON.value
    }
    const str = JSON.stringify(data);
    XHRCall(admingObj.lineModel, admingObj.signupUrl, admingObj.jsonHeader, str, 'JSON');
}

function XHRCall(lineModel, url, header, sendStr, modelText) {
    const xhr = new XMLHttpRequest();
    xhr.open(lineModel, url);
    xhr.setRequestHeader('Content-type', header);
    xhr.send(sendStr);
    xhr.onload = function () {
        const _data = JSON.parse(xhr.responseText);
        resultListFu(_data, modelText);
    }
}

function resultListFu(item, model) {
    let resultStr = document.createElement('p');
    let date = new Date;
    let nowDateTime = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    switch (true) {
        case item.message == '帳號註冊成功':
            resultStr.textContent = `帳號註冊成功 - 您現在使用${model}模式 - 時間：${nowDateTime}`;
            resultStr.setAttribute('class', 'text-success');
            resultList.appendChild(resultStr);
            break;
        case item.message == '此帳號已被使用':
            resultStr.textContent = `此帳號已經被使用 - 您現在使用${model}模式 - 時間：${nowDateTime}`;
            resultStr.setAttribute('class', 'text-warning');
            resultList.appendChild(resultStr);
            break;
        case item.message == '登入成功':
            resultStr.textContent = `登入成功 - 您現在使用${model}模式登入 - 時間：${nowDateTime}`;
            resultStr.setAttribute('class', 'text-primary');
            resultList.appendChild(resultStr);
            break;
        case item.message == '此帳號不存在或帳號密碼錯誤':
            resultStr.textContent = `此帳號不存在或帳號密碼錯誤 - 您現在使用${model}模式 - 時間：${nowDateTime}`;
            resultStr.setAttribute('class', 'text-warnimg');
            resultList.appendChild(resultStr);
            break;
        case item.message == 'Email 格式不正確':
            resultStr.textContent = `Email格式不正確，請重新輸入 - 您現在使用${model}模式 - 時間：${nowDateTime}`;
            resultStr.setAttribute('class', 'text-danger');
            resultList.appendChild(resultStr);
            break;
        default:
            resultStr.textContent = `Error - 您現在使用${model}模式 - 時間：${nowDateTime}`;
            resultStr.setAttribute('class', 'text-danger');
            resultList.appendChild(resultStr);
            break;
    }
}