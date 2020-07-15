import jwtDecode from 'jwt-decode';

const validateToken = ()=>{
    const token = localStorage.getItem('token')

    if(!token) return {status: false};
    const decoded = jwtDecode(token);
    if(Date.now()/1000>decoded.exp) return {status: false};
    return {
        status: true,
        decoded
    }
}

export default validateToken;