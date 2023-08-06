import axios from 'axios';
import config from '../Config';

const BASE_URL = config.EXPO_PUBLIC_API_URL;

export const loginUser = (email, password) => {

  console.log(BASE_URL)

  const credential = {
    Usuario: email,
    Contraseña: password,
  };

  console.log(credential);

  return axios.post(`${BASE_URL}/API/Login/SignIn`, credential);
};

export const UserGrupos = (email, password, _IdUsuario) => {

  const credential = {
    Usuario: email,
    Contraseña: password,
    IdUsuario: _IdUsuario,
    IdGrupoEmpresa: 0,
    IdCliente: 0,
    IdCanal: 0,
    IdSubcanal: 0
  };

  return axios.post(`${BASE_URL}/API/Login/GrupoEmpresa`, credential);
};

export const UserClientes = (email, password, _IdUsuario, _IdGrupoEmpresa) => {

  const credential = {
    Usuario: email,
    Contraseña: password,
    IdUsuario: _IdUsuario,
    IdGrupoEmpresa: _IdGrupoEmpresa,
    IdCliente: 0,
    IdCanal: 0,
    IdSubcanal: 0
  };

  console.log(credential);

  return axios.post(`${BASE_URL}/API/Login/Clientes`, credential);
};

export const UserCanales = (email, password, _IdUsuario, _IdCliente) => {

  const credential = {
    Usuario: email,
    Contraseña: password,
    IdUsuario: _IdUsuario,
    IdGrupoEmpresa: 0,
    IdCliente: _IdCliente,
    IdCanal: 0,
    IdSubcanal: 0
  };

  console.log(credential);

  return axios.post(`${BASE_URL}/API/Login/Canales`, credential);
};

export const UserSubcanales = (email, password, _IdUsuario, _IdCanal) => {
  const credential = {
    Usuario: email,
    Contraseña: password,
    IdUsuario: _IdUsuario,
    IdGrupoEmpresa: 0,
    IdCliente: 0,
    IdCanal: _IdCanal,
    IdSubcanal: 0
  };
  console.log(credential);
  return axios.post(`${BASE_URL}/API/Login/Subcanales`, credential);
};

export const CotEstatusVehiculos = (email,password,IdSubCanal) => {
  const credential = {
    Usuario: email,
    Contraseña: password,
    IdSubcanal: IdSubCanal
  };

  console.log(credential);
  return axios.get(`${BASE_URL}/API/Autos/ConsultaEstatusVehiculos`, {
    params: credential
  });

};

export const CotTiposDeVehiculos = (email,password,IdSubCanal) => {
  const credential = {
    Usuario: email,
    Contraseña: password,
    IdSubcanal: IdSubCanal
  };
  console.log(credential);
  return axios.get(`${BASE_URL}/API/Autos/ConsultaTiposDeVehiculos`, {
    params: credential
  });

};

export const CotModelo = (email,password,_IdSubCanal,_IDEstatusVehiculo) => {
  const credential = {
    Usuario: email,
    Contraseña: password,
    IdSubcanal: _IdSubCanal,
    IDEstatusVehiculo:_IDEstatusVehiculo
  };
  console.log(credential);
  return axios.post(`${BASE_URL}/API/Autos/ConsultaModelos`, credential);
};

export const CotMarca= (email,password,_IDTipoVehiculo, _modelo) => {
  const credential = {
    Usuario: email,
    Contraseña: password,
    IDTipoVehiculo:_IDTipoVehiculo,
    modelo:_modelo
  };
  console.log(credential);
   return axios.post(`${BASE_URL}/API/Autos/ConsultaMarcas`, credential);
};

export const CotTipos= (email,password,_IDTipoVehiculo, _modelo, _submarca) => {

  const credential = {
    Usuario: email,
    Contraseña: password,
    IDTipoVehiculo: _IDTipoVehiculo,
    modelo:_modelo,
    submarca:_submarca

  };

  console.log(credential);

  return axios.post(`${BASE_URL}/API/Autos/ConsultaTipos`, credential);

};

export const CotDescripcion= (email,password,_IDTipoVehiculo,_modelo,_submarca,_tipo) => {
  const credential = {
    Usuario: email,
    Contraseña: password,
    IDTipoVehiculo: _IDTipoVehiculo,
    modelo:_modelo,
    submarca:_submarca,
    tipo:_tipo
  };
  console.log(credential);
  return axios.post(`${BASE_URL}/API/Autos/ConsultaDescripciones`, credential);

};


