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

export const GetCertificadoPoliza = (credential) => {
  return axios.get(`${BASE_URL}/API/Polizas/GetCertificadoPoliza`, {
    params: credential
  });
};

export const GetCoberturasPoliza = (credential) => {
  return axios.get(`${BASE_URL}/API/Polizas/GetCoberturasPoliza`, {
    params: credential
  });
};

export const GetDetallePersona = (credential) => {
  return axios.get(`${BASE_URL}/API/Polizas/GetDetallePersona`, {
    params: credential
  });
};

export const UpdateMantenimientoPersona = (datarequest) => {
  return axios.post(`${BASE_URL}/API/Polizas/UpdateMantenimientoPersona`, datarequest);
};

export const ActualizaUsuarioPerfil = (datarequest) => {
  console.log(datarequest)
  return axios.post(`${BASE_URL}/API/Polizas/ActualizaUsuarioPerfil`, datarequest);
};

export const BusquedaPolizasEnRamos = (datarequest) => {
  return axios.get(`${BASE_URL}/API/Polizas/BusquedaPolizasEnRamos`, {
    params: datarequest
  });
};

export const GenerarCodigoMail = (datarequest) => {
  return axios.get(`${BASE_URL}/API/Polizas/GenerarCodigoMail`, {
    params: datarequest
  });
};

export const GuardarPolizaAll = (datarequest) => {
  console.log(datarequest)
  return axios.post(`${BASE_URL}/API/Polizas/GuardarPolizaAll`, datarequest);
};