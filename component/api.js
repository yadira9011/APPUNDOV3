import axios from 'axios';
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
export const loginUser = (email, password) => {
  const credential = {
    Usuario:email,
    Contraseña: password,
    Check: true
  };
  return axios.post(`${BASE_URL}/API/Login/SignIn`,credential);
};