import axios from 'axios';
import config from '../../Config';

const BASE_URL = config.EXPO_PUBLIC_API_URL;

//AGRICOLA
export const GetDDRAgricola = (credential) => {
  return axios.get(`${BASE_URL}/API/Agropecuario/GetDDRAgricola`, {
    params: credential
  });
};

export const GetCultivos = (credential) => {
  return axios.get(`${BASE_URL}/API/Agropecuario/GetCultivos`, {
    params: credential
  });
};

export const GetRegimenHumedad = (credential) => {
  return axios.get(`${BASE_URL}/API/Agropecuario/GetRegimenHumedad`, {
    params: credential
  });
};

export const GetEsquemaAseguramientoAgricola = (credential) => {
  return axios.get(`${BASE_URL}/API/Agropecuario/GetEsquemaAseguramientoAgricola`, {
    params: credential
  });
};

export const GetEntFederativaAgropecuario = (credential) => {
  return axios.get(`${BASE_URL}/API/Agropecuario/GetEntFederativaAgropecuario`, {
    params: credential
  });
};

//PECUARIO
export const GetDDRPequario = (credential) => {
  return axios.get(`${BASE_URL}/API/Pecuario/GetDDRPequario`, {
    params: credential
  });
};

export const GetEspecies = (credential) => {
  return axios.get(`${BASE_URL}/API/Pecuario/GetEspecies`, {
    params: credential
  });
};

export const GetFunciones = (credential) => {
  return axios.get(`${BASE_URL}/API/Pecuario/GetFunciones`, {
    params: credential
  });
};

export const GetEsquemaAseguramientoPecuario = (credential) => {
  return axios.get(`${BASE_URL}/API/Pecuario/GetEsquemaAseguramientoPecuario`, {
    params: credential
  });
};

export const GetVigencias = (credential) => {
  return axios.get(`${BASE_URL}/API/Pecuario/GetVigencias`, {
    params: credential
  });
};

export const GetEntFederativaPecuario = (credential) => {
  return axios.get(`${BASE_URL}/API/Pecuario/GetEntFederativaPecuario`, {
    params: credential
  });
};
