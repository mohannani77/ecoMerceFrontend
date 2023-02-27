export const setHeaders=()=>{
    const headers={
        headers:{
            "x-auth":localStorage.getItem("token")
        }
    }
    return headers;
}

export const api="https://mernecomerceappbackend.onrender.com/api"