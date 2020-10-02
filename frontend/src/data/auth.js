import { clientSecret, clientId, url } from "./config";


        

//token to be sent to the POST request
export async function getToken()  {
    console.log('getting token')
     let response =  await fetch(url, {
        method: "POST", 
        body: new URLSearchParams({
                    'grant_type': 'client_credentials',
                    'client_id': clientId,
                    'client_secret': clientSecret,
                  }),
        headers : {
            "Content-Type": "application/x-www-form-urlencoded"
        },
    })
    if(response.ok){
        let json = await response.json();
        return json
    }else{
        alert("http error")
    }
    
}

export function showToken(){
    getToken().then(function(response){
        console.log(response['access_token'])
        return response
    })
}


