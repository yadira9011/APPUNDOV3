import axios from 'axios';
import config from '../Config';

const BASE_URL = config.EXPO_PUBLIC_API_URL;

export const loginUser = (email, password) => {

  console.log(BASE_URL)

  const credential = {
    Usuario:email,
    Contraseña: password,
  };

  console.log(credential);
  
  return axios.post(`${BASE_URL}/API/Login/SignIn`,credential);
};

export const UserGrupos = (email, password, _IdUsuario) => {

  const credential = {
    Usuario:email,
    Contraseña: password,
    IdUsuario:_IdUsuario,
    IdGrupoEmpresa:0,
    IdCliente:0,
    IdCanal:0,
    IdSubcanal:0
  };

  return axios.post(`${BASE_URL}/API/Login/GrupoEmpresa`,credential);
};

export const UserClientes = (email, password, _IdUsuario, _IdGrupoEmpresa ) => {

  const credential = {
    Usuario:email,
    Contraseña: password,
    IdUsuario:_IdUsuario,
    IdGrupoEmpresa:_IdGrupoEmpresa,
    IdCliente:0,
    IdCanal:0,
    IdSubcanal:0
  };

  console.log(credential);
  
  return axios.post(`${BASE_URL}/API/Login/Clientes`,credential);
};

export const UserCanales = (email, password, _IdCliente) => {

  const credential = {
    Usuario:email,
    Contraseña: password,
    IdUsuario:_IdUsuario,
    IdGrupoEmpresa:0,
    IdCliente:_IdCliente,
    IdCanal:0,
    IdSubcanal:0
  };
  
  console.log(credential);
  
  return axios.post(`${BASE_URL}/API/Login/Canales`,credential);
};

export const UserSubcanales = (email, password, _IdCanal) => {
  const credential = {
    Usuario:email,
    Contraseña: password,
    IdUsuario:_IdUsuario,
    IdGrupoEmpresa:0,
    IdCliente:0,
    IdCanal:_IdCanal,
    IdSubcanal:0
  };
  console.log(credential);
  return axios.post(`${BASE_URL}/API/Login/Subcanales`,credential);
};