/**
 * @see https://www.aleksandrhovhannisyan.com/blog/serializing-html-form-data-with-javascript/
 *
 * @param {Object<string, string>|FormData} data
 * @return {string}
 */
const serializeData = function (data) {
  return new URLSearchParams(data).toString()
}

/**
 * @param {URL|string|null} endpoint
 * @param {FormData|Object<string, string>} data
 * @param {('DELETE'|'GET'|'HEAD'|'OPTIONS'|'PATCH'|'POST'|'PUT')} method
 * @param {Headers|Object<string, string>} headers
 * @param {(function(Object): *)|null} callback
 * @param {Boolean} debug
 *
 * @return {Promise<Response>}
 * @constructor
 */
export const ApiRequest = function (endpoint = null, data = {}, method = 'GET', headers = {}, callback = null, debug = false) {
  const
      url = (endpoint instanceof URL) ? endpoint : new URL(endpoint || '', window.location.href),
      headersObj = (headers instanceof Headers) ? headers : new Headers(headers)

  headersObj.append('X-Requested-With', 'XMLHttpRequest')
  if (data instanceof FormData) {
    headersObj.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
  } else {
    headersObj.append('Content-Type', 'application/json; charset=UTF-8')
  }

  callback = callback || function (json) {
    return json
  }

  let request = {
    method: method || 'GET',
    headers: headersObj,
    redirect: 'follow'
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    if (data instanceof FormData) {
      request.body = serializeData(data)
    } else {
      request.body = JSON.stringify(data)
    }
  } else {
    url.search = serializeData(data)
  }

  return fetch(url.toString(), request).then(function (response) {
    if (response.redirected) {
      window.location.href = response.url
    } else if (response.ok) {
      return response.json()
    } else {
      return Promise.reject(response)
    }
  }).then(callback).catch(function (err) {
    debug && console.warn('Something went wrong.', err)
  })
}

/**
 * @param {URL|string|null} endpoint
 * @param {FormData|Object<string, string>} data
 * @param {Headers|Object<string, string>} headers
 * @param {(function(Object): *)|null} callback
 * @param {Boolean} debug
 *
 * @return {Promise<Response>}
 * @constructor
 */
export const ApiGet = function (endpoint, data = {}, headers = {}, callback = null, debug = false) {
  return ApiRequest(endpoint, data, 'GET', headers, callback, debug)
}

/**
 * @param {URL|string|null} endpoint
 * @param {FormData|Object<string, string>} data
 * @param {Headers|Object<string, string>} headers
 * @param {(function(Object): *)|null} callback
 * @param {Boolean} debug
 *
 * @return {Promise<Response>}
 * @constructor
 */
export const ApiHead = function (endpoint, data = {}, headers = {}, callback = null, debug = false) {
  return ApiRequest(endpoint, data, 'HEAD', headers, callback, debug)
}

/**
 * @param {URL|string|null} endpoint
 * @param {FormData|Object<string, string>} data
 * @param {Headers|Object<string, string>} headers
 * @param {(function(Object): *)|null} callback
 * @param {Boolean} debug
 *
 * @return {Promise<Response>}
 * @constructor
 */
export const ApiPost = function (endpoint, data = {}, headers = {}, callback = null, debug = false) {
  return ApiRequest(endpoint, data, 'POST', headers, callback, debug)
}

/**
 * @param {URL|string|null} endpoint
 * @param {FormData|Object<string, string>} data
 * @param {Headers|Object<string, string>} headers
 * @param {(function(Object): *)|null} callback
 * @param {Boolean} debug
 *
 * @return {Promise<Response>}
 * @constructor
 */
export const ApiPut = function (endpoint, data = {}, headers = {}, callback = null, debug = false) {
  return ApiRequest(endpoint, data, 'PUT', headers, callback, debug)
}

/**
 * @param {URL|string|null} endpoint
 * @param {FormData|Object<string, string>} data
 * @param {Headers|Object<string, string>} headers
 * @param {(function(Object): *)|null} callback
 * @param {Boolean} debug
 *
 * @return {Promise<Response>}
 * @constructor
 */
export const ApiDelete = function (endpoint, data = {}, headers = {}, callback = null, debug = false) {
  return ApiRequest(endpoint, data, 'DELETE', headers, callback, debug)
}

/**
 * @param {URL|string|null} endpoint
 * @param {FormData|Object<string, string>} data
 * @param {Headers|Object<string, string>} headers
 * @param {(function(Object): *)|null} callback
 * @param {Boolean} debug
 *
 * @return {Promise<Response>}
 * @constructor
 */
export const ApiOptions = function (endpoint, data = {}, headers = {}, callback = null, debug = false) {
  return ApiRequest(endpoint, data, 'OPTIONS', headers, callback, debug)
}

/**
 * @param {URL|string|null} endpoint
 * @param {FormData|Object<string, string>} data
 * @param {Headers|Object<string, string>} headers
 * @param {(function(Object): *)|null} callback
 * @param {Boolean} debug
 *
 * @return {Promise<Response>}
 * @constructor
 */
export const ApiPatch = function (endpoint, data = {}, headers = {}, callback = null, debug = false) {
  return ApiRequest(endpoint, data, 'PATCH', headers, callback, debug)
}
