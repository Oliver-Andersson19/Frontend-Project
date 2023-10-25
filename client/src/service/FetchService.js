/**
 * @author niklas Nguyen
 * @description this service exports a finnish fetch build for json or a server response
 */

import cacheService from "./CacheService";

async function fetchOptions(url, method, data) {
  // const token = cacheService.getLocalValue("jwtToken")

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // if(token !== undefined) options.headers = {
  //     "authorization": `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //     };

  if (method !== "GET") fetchOptions.body = JSON.stringify(data);

  return await fetch(url, options);
}

async function fetchJson(url, method, data) {
  return await (await fetchOptions(url, method, data)).json();
}

async function fetchRes(url, method, data) {
  return await fetchOptions(url, method, data);
}

const fetchService = { fetchJson, fetchRes };
export default fetchService;
