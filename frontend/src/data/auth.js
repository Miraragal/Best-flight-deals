import { clientSecret, clientId, url } from "./config";

//Token to be sent to the POST request : 
//Remember: The return from ASYNC functions are always wrapped in a PROMISE
export async function getToken() {
  let response = await fetch(url, { 
    //Await for fetch to get the content of the url and declare its response(a promise) in the variable response
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  let json = await response.json(); 
  // Await for the response to be complete and then convert the content to a {json object} and declare the info inside vble json

  if (response.status !== 200) {
    throw Error("Token missed");
  }
  return json.access_token 
  //return the value of key[access_token] ofthe json object wrapped in a Promise
}

//To unwrap the promise. We define an anonymous async function that will be called inmediantly when declared
(async function () {  
  try {
    const token = await getToken(); 
    //Await for the getToken() to complete and declare the result in the vble token
    console.log("Token: " + token);
  } catch (err) {
    console.log("Error: " + err);
  }
})();
