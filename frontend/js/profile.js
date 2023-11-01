const socket = io();

if(!localStorage.Authorization){
    window.location.href = '/';
}   