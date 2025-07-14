const AUTH_URL = import.meta.env.VITE_AUTH_BASE_URL;
const CHAT_URL = import.meta.env.VITE_CHAT_BASE_URL;

export async function authAction(method, data){
    try{
        const response = await fetch(`${AUTH_URL}/${method}`, {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
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

export async function chatAction(method, data = {}, type = 'POST') {
  try {
    let url = `${CHAT_URL}/${method}`;
    const fetchOptions = {
      method: type,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (type.toUpperCase() === 'GET') {
      const queryParams = new URLSearchParams(data).toString();
      url += `?${queryParams}`;
    } else {
      fetchOptions.body = JSON.stringify(data);
    }

    const response = await fetch(url, fetchOptions);
    const result = await response.json();

    if (!response.ok) throw new Error(result.message || 'Something went wrong');
    return result;
  } catch (error) {
    console.error(`API error: ${method}`, error);
    throw error;
  }
}