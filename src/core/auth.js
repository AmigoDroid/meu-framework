// src/core/auth.js

let currentUser = null;

export function login(user) {
  currentUser = user;
}

export function getUser() {
  return currentUser;
}

export function logout() {
  currentUser = null;
}