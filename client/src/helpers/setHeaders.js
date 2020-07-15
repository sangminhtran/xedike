import axios from 'axios';

//params là 1 object
const setHeaders = (params)=>{
    const token = params.token
    if(token){
        axios.defaults.headers.common['token'] = token;
    }
    else{
        delete axios.defaults.headers.common['token'];
    }
}

export default setHeaders;