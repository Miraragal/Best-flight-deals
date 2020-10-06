

//Token to be sent to the GEST request:
export const postSearch= (token, from, to, departDate, returnDate, passenger)=> async (dispatch)=>{
    
    return fetch(url,{
      method: "GET",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    })
    .then()
  
  
  }
  