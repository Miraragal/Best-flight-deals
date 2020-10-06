
import {urlGetFlights} from "./config"

//Token to be sent to the GEST request:
export async function postSearch (urlParams,token){
    await fetch(urlGetFlights+'?'+urlParams,{
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(response => response.ok ? response : "Error")
    .then(response => response.json())
    .then(response=> {
      JSON.stringify(response)
      console.log(JSON.stringify(response))
      return JSON.stringify(response)})
  }

 
  
  

