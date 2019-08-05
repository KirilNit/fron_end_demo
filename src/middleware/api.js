let api = {
    get(url){
        return {
            getNote: () => fetch(url,{
                method: 'GET'
            }).then((res) => {
                if(res.status === 401){
                    return Promise.reject(new Error("Status 401"));
                }
                if(res.status === 403){

                    return Promise.reject(new Error("Status 403"));
                }
                return res;
            }).then((resp) => resp.json())
        }
    },
    post(url, body){
        return{
            postNote: () => fetch(url,{
                method: 'POST',
                body: body,
                headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                        }
            }).then((res) => {
                if(res.status === 401){
                    return Promise.reject(new Error("Status 401"));
                }
                if(res.status === 403){

                    return Promise.reject(new Error("Status 403"));
                }
                return res;
            }).then((resp) => resp.json())
        }
    }
};

export default api;