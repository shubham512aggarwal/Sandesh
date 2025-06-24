const AUTH_URL = import.meta.env.VITE_AUTH_BASE_URL;

export async function authAction(method, data){
    try{
        const response = await fetch(`${AUTH_URL}/${method}`, {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if(!response.ok) throw Error(result.message || "Something went wrong");
        return result;
    }
    catch(error){
        console.log(`API error: ${method}`, error)
        throw error;
    }
}