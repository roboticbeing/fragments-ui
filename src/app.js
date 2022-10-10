// src/app.js

import { Auth, getUser } from './auth';
import { getUserFragments, postFragments } from './api';
import { button } from 'aws-amplify';

async function init() {
  // Get our UI elements
  const userSection = document.querySelector('#user');
  const loginBtn = document.querySelector('#login');
  const logoutBtn = document.querySelector('#logout');
  const fragmentTxt = document.querySelector('#fragment');
  const submit = document.getElementById('submit');



  // Wire up event handlers to deal with login and logout.
  loginBtn.onclick = () => {
    // Sign-in via the Amazon Cognito Hosted UI (requires redirects), see:
    // https://docs.amplify.aws/lib/auth/advanced/q/platform/js/#identity-pool-federation
    Auth.federatedSignIn();
  };
  logoutBtn.onclick = () => {
    // Sign-out of the Amazon Cognito Hosted UI (requires redirects), see:
    // https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js/#sign-out
    Auth.signOut();
  };


  // See if we're signed in (i.e., we'll have a `user` object)
  const user = await getUser();

  getUserFragments(user);

  if (!user) {
    // Disable the Logout button
    logoutBtn.disabled = true;
    return;
  }

  // Log the user info for debugging purposes
  console.log({ user });

  // Update the UI to welcome the user
  userSection.hidden = false;

  // Show the user's username
  userSection.querySelector('.username').innerText = user.username;

  // Disable the Login button
  loginBtn.disabled = true;

  submit.onsubmit = postFragments(user, fragmentTxt);
}

// Wait for the DOM to be ready, then start the app
addEventListener('DOMContentLoaded', init);