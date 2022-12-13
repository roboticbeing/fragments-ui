// src/app.js

import { Auth, getUser } from './auth';
import { getUserFragments, getUserFragmentsExpanded, postFragments, deleteFragments } from './api';
import {CheckList} from './dom';

async function init() {
  // Get our UI elements
  const userSection = document.querySelector('#user');
  const loginBtn = document.querySelector('#login');
  const logoutBtn = document.querySelector('#logout');
  const formEl = document.querySelector('.form');
  const formEl2 = document.querySelector('.form2');
  var checkedBoxes = document.querySelectorAll('input[name=mycheckboxes]:checked');

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
  const fragment = await getUserFragments(user);

  CheckList(fragment.fragments);

  

  if (!user) {
    // Disable the Logout button
    logoutBtn.disabled = true;
    return;
  }

  // Log the user info for debugging purposes
  console.log({ user });

  console.log(getUserFragmentsExpanded(user));

  // Update the UI to welcome the user
  userSection.hidden = false;

  // Show the user's username
  userSection.querySelector('.username').innerText = user.username;

  // Disable the Login button
  loginBtn.disabled = true;

  formEl.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(formEl);
    console.log('Posted: ' + formData.get('fragment') + ' with content-type: ' + formData.get('type'));
    postFragments(user, formData.get('fragment'), formData.get('type'));
  })

  formEl2.addEventListener('submit', event => {
    event.preventDefault();
    console.log(checkedBoxes.innerText)
   // const formData = new FormData(formEl2);
    //console.log('Deleted: ' + formData.get('action') + ' with content-type: ' + formData.get('type'));
   // deleteFragments(user, checkedBoxes.innerText);
  })
}

// Wait for the DOM to be ready, then start the app
addEventListener('DOMContentLoaded', init);