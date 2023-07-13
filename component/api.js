import axios from 'axios';
import config from '../Config';

const BASE_URL = config.EXPO_PUBLIC_API_URL;

export const loginUser = (email, password) => {

  console.log(BASE_URL)
  const credential = {
    Usuario:email,
    Contraseña: password,
  };

  return axios.post(`${BASE_URL}/API/Login/SignIn`,credential);
};