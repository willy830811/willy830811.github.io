// import axios from 'axios';

function Edit(userID) {
    window.location.href = "/edit?userID=" + userID;
}
function Delete(userID) {
    var rs = confirm('Confirm to delete?');
    if (rs) {
        window.location.href = "http://localhost/userDelete?userID=" + userID;
    }
}
function Search() {
    var userID = document.getElementsByName('suserID')[0].value;
    window.location.href = "/?userID=" + userID;
}

let data;
console.log(yoyo);
axios({
    method: 'get',
    baseURL: 'http://localhost:3000/',
    'Content-Type': 'application/json',
}).then((result) => {
    data = JSON.parse(result);
}).catch((err) => {
    console.log(err);
})

for(let i = 0; i < data.length; i++) {
    document.getElementById('accountList').innerHTML = (
        `<tr>${data[i].userID}</tr>
        <tr>${data[i].name}</tr>
        <tr>${data[i].phnoeNum}</tr>
        <tr>${data[i].addTime}</tr>
        <tr>${data[i].renewTime}</tr>`
    )
}