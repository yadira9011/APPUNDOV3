import axios from 'axios';
import config from '../../Config';

const BASE_URL = config.EXPO_PUBLIC_API_URL;

export const GetPolizasGpoTitular = (credential) => {
  return axios.get(`${BASE_URL}/API/Polizas/GetPolizasGpoTitular`, {
    params: credential
  });
};

export const GetCertificadosDepTitular = (credential) => {
  return axios.get(`${BASE_URL}/API/Polizas/GetCertificadosDepTitular`, {
    params: credential
  });
};

export const GetPolizasIdividualesTitular = (credential) => {
  return axios.get(`${BASE_URL}/API/Polizas/GetPolizasIdividualesTitular`, {
    params: credential
  });
};

export const GetPolizasXContratanteTitular = (credential) => {
  return axios.get(`${BASE_URL}/API/Polizas/GetPolizasXContratanteTitular`, {
    params: credential
  });
};

export const GetBotonesServPoliza = (credential) => {
  return axios.get(`${BASE_URL}/API/Polizas/GetBotonesServPoliza`, {
    params: credential
  });
};



