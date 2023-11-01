"use strict";

var socket = io();

if (!localStorage.Authorization) {
  window.location.href = '/';
}