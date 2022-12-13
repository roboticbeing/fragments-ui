// src/api.js

// fragments microservice API, defaults to localhost:8080
const apiUrl = process.env.API_URL || 'http://localhost:8080';

/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
export async function getUserFragments(user) {
  console.log('Requesting user fragments data...');
  try {
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Got user fragments data', { data });
    return data;
  } catch (err) {
    console.error('Unable to call GET /v1/fragment', { err });
  }
}

export async function getUserFragmentsExpanded(user) {
  console.log('Requesting user fragments expanded data...');
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/?expand=1`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Got user fragments expanded data', { data });
  } catch (err) {
    console.error('Unable to call GET /v1/fragment/?expand=1', { err });
  }
}

export async function postFragments(user, fragment, type) {
  console.log('Post fragments data...');
  try {
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: {'Authorization': 'Bearer ' + user.idToken,
                'Content-Type': type
              },
      method: 'POST',
      body: fragment
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Posted fragments data', { data });
  } catch (err) {
    console.error('Unable to call POST /v1/fragment', { err });
  }
}

export async function deleteFragments(user, id) {
  console.log('Delete fragments data...');
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: {'Authorization': 'Bearer ' + user.idToken
              },
      method: 'DELETE'
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Deleted fragments data', { data });
  } catch (err) {
    console.error('Unable to call DELETE /v1/fragment', { err });
  }
}

export async function updateFragments(user, id) {
  console.log('Update fragments data...');
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
      // Generate headers with the proper Authorization bearer token to pass
      headers: {'Authorization': 'Bearer ' + user.idToken
              },
      method: 'PUT'
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log('Updated fragments data', { data });
  } catch (err) {
    console.error('Unable to call PUT /v1/fragment', { err });
  }
}