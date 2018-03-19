
/**
 * Very basic and simple tool functions
 * to interact with a remote session.
 * Use the localStorage to keep the session ID.
 */

// returns the remote session if exists
const _getRemote = async ssid => {
  const response = await fetch(`${API_URL}/sessions/${ssid}`)
  return await response.json()
}

// creates the remote session and local SSID
export async function create() {
  const response = await fetch(`${API_URL}/sessions`, { method: 'POST' })
  const session = await response.json()
  localStorage.setItem(SESSION_KEY, session._id)
  return session
}

// removes the remote session and local SSID
export async function remove() {
  const ssid = localStorage.getItem(SESSION_KEY)
  if (ssid) {
    await fetch(`${API_URL}/sessions/${ssid}`, { method: 'DELETE' })
    localStorage.removeItem(SESSION_KEY)
  }
}

// retieves the session (local or creates it)
// it's the main access point for using the mecanism.
export async function retrieve() {
  const ssid = localStorage.getItem(SESSION_KEY)
  if (!ssid) {
    return create()
  }
  const session = await _getRemote(ssid)
  return session._id ? session : create()
}

// requete the remote session item (e.g. the history views)
export async function request(uri, opts = {}) {
  const { _id } = await retrieve()
  return fetch(`${API_URL}/sessions/${_id}/${uri}`, opts)
}

// saves a remote session item
export async function push(uri, opts = {}) {
  return request(uri, { ...opts, method: 'POST' })
}

export default { create, retrieve, request, push }
