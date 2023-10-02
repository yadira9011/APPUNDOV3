import axios from 'axios';
import config from '../Config';

const BASE_URL = config.EXPO_PUBLIC_API_URL;

export const loginUser = (email, password) => {

  // console.log(BASE_URL)

  const credential = {
    Usuario: email,
    Contraseña: password,
  };

  // console.log(credential);

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

  // console.log(credential);

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

  // console.log(credential);

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
  // console.log(credential);
  return axios.post(`${BASE_URL}/API/Login/Subcanales`, credential);
};

export const CotEstatusVehiculos = (email, password, IdSubCanal) => {
  const credential = {
    Usuario: email,
    Contraseña: password,
    IdSubcanal: IdSubCanal
  };
  // console.log(credential);
  return axios.get(`${BASE_URL}/API/Autos/ConsultaEstatusVehiculos`, {
    params: credential
  });
};

export const CotTiposDeVehiculos = (email, password, IdSubCanal) => {
  const credential = {
    Usuario: email,
    Contraseña: password,
    IdSubcanal: IdSubCanal
  };
  // console.log(credential);
  return axios.get(`${BASE_URL}/API/Autos/ConsultaTiposDeVehiculos`, {
    params: credential
  });

};

export const CotModelos = (email, password, _IdSubCanal, _IDEstatusVehiculo) => {
  const credential = {
    Usuario: email,
    Contraseña: password,
    IdSubcanal: _IdSubCanal,
    IDEstatusVehiculo: _IDEstatusVehiculo
  };
  // // console.log(credential);
  return axios.post(`${BASE_URL}/API/Autos/ConsultaModelos`, credential);
};

export const CotMarcas = (email, password, _IDTipoVehiculo, _modelo) => {

  const credential = {
    Usuario: email,
    Contraseña: password,
    IDTipoVehiculo: _IDTipoVehiculo,
    modelo: _modelo
  };

  //  console.log("datos enviados...",credential);
  return axios.post(`${BASE_URL}/API/Autos/ConsultaMarcas`, credential);
};

export const CotTipos = (email, password, _IDTipoVehiculo, _modelo, _submarca) => {

  const credential = {
    Usuario: email,
    Contraseña: password,
    IDTipoVehiculo: _IDTipoVehiculo,
    modelo: _modelo,
    submarca: _submarca

  };

  console.log(credential);

  return axios.post(`${BASE_URL}/API/Autos/ConsultaTipos`, credential);

};

export const CotDescripciones = (email, password, _IDTipoVehiculo, _modelo, _submarca, _tipo) => {
  const credential = {
    Usuario: email,
    Contraseña: password,
    IDTipoVehiculo: _IDTipoVehiculo,
    modelo: _modelo,
    submarca: _submarca,
    tipo: _tipo
  };
  console.log(credential);
  return axios.post(`${BASE_URL}/API/Autos/ConsultaDescripciones`, credential);
};

export const CotIndenmizaciones = (email, password, IdSubCanal, _iDEstatusVehiculo) => {

  const credential = {
    Usuario: email,
    Contraseña: password,
    iDEstatusVehiculo: _iDEstatusVehiculo,
    IdSubcanal: IdSubCanal
  };
  // console.log("INDENMIZACION.... ENVIO...",credential);
  return axios.get(`${BASE_URL}/API/Autos/ConsultaIdsIndenmizaciones`, {
    params: credential
  });
};

export const CotTiposDeUso = (email, password, IdSubCanal) => {

  const credential = {
    Usuario: email,
    Contraseña: password,
    IdSubcanal: IdSubCanal
  };
  // console.log(credential);
  return axios.get(`${BASE_URL}/API/Autos/ConsultaTiposUsos`, {
    params: credential
  });
};

export const CotDeducibles = (email, password, IdSubCanal) => {
  const credential = {
    Usuario: email,
    Contraseña: password,
    IdSubcanal: IdSubCanal
  };
  // console.log(credential);
  return axios.get(`${BASE_URL}/API/Autos/ConsultaDeducibles`, {
    params: credential
  });
};

export const CotPaquetes = (email, password, IdSubCanal) => {
  const credential = {
    Usuario: email,
    Contraseña: password,
    IdSubcanal: IdSubCanal
  };
  // console.log(credential);
  return axios.get(`${BASE_URL}/API/Autos/ConsultaPaquetes`, {
    params: credential
  });
};

export const CotTipoPoliza = (email, password, IdSubCanal) => {
  const credential = {
    Usuario: email,
    Contraseña: password,
    IdSubcanal: IdSubCanal
  };
  // console.log(credential);
  return axios.get(`${BASE_URL}/API/Autos/ConsultaTiposPoliza`, {
    params: credential
  });
};

export const CotVigencias = (email, password, IdSubCanal, IDTipoPoliza) => {
  const credential = {
    Usuario: email,
    Contraseña: password,
    IdSubCanal: IdSubCanal,
    IDTipoPoliza: IDTipoPoliza,
  };
  return axios.post(`${BASE_URL}/API/Autos/ConsultaConfiguracionPago`, credential);
};

export const CotInfoPostal = (email, password, CodigoPostal) => {
  const credential = {
    Usuario: email,
    Contraseña: password,
    codigoPostal: CodigoPostal
  };
  return axios.get(`${BASE_URL}/API/Autos/ConsultaInfoPostal`, {
    params: credential
  });
};

export const GetCotizacion = (dataCotizacion) => {
  return axios.post(`${BASE_URL}/API/Autos/Cotizaciones`, dataCotizacion);
};

export const GetCEmision = (data) => {
  return axios.post(`${BASE_URL}/API/Autos/Emision`, data);
};

export const GetPagoEnLinea = (data) => {
  return axios.post(`${BASE_URL}/API/Autos/PagoEnLineaApi`, data);
};

export const ImpresionPoliza = (data) => {
  return axios.post(`${BASE_URL}/API/Autos/Impresion`, data);
};

export const GetPolizaPdfApi = (data) => {
  return axios.post(`${BASE_URL}/API/Autos/PolizaPDF`, data);
};


export const GetCoberturasCotizacion = (dataSearch) => {
  return axios.get(`${BASE_URL}/API/Autos/ConsultarCoberturas`, {
    params: dataSearch
  });

};

export const EnvioCotizacion = (dataCotizacion) => {
  return axios.post(`${BASE_URL}/API/Autos/EnvioCotizacion`, dataCotizacion);
};

export const GetDias = (credential) => {
  return axios.get(`${BASE_URL}/API/Autos/GetDias`, {
    params: credential
  });
};

export const GetMeses = (credential) => {
  return axios.get(`${BASE_URL}/API/Autos/GetMeses`, {
    params: credential
  });
};

export const GetAnyos = (credential) => {
  return axios.get(`${BASE_URL}/API/Autos/GetAnyos`, {
    params: credential
  });
};


export const GetGeneros = (credential) => {
  return axios.get(`${BASE_URL}/API/Autos/GetGeneros`, {
    params: credential
  });
};

export const GetTiposPersona = (credential) => {
  return axios.get(`${BASE_URL}/API/Autos/TiposPersona`, {
    params: credential
  });
};

export const GetTipoSociedad = (credential) => {
  return axios.get(`${BASE_URL}/API/Autos/TipoSociedad`, {
    params: credential
  });
};


export const GetGiros = (credential) => {
  return axios.get(`${BASE_URL}/API/Autos/Giros`, {
    params: credential
  });
};


export const GetIdAseguradora = (credential) => {
  return axios.get(`${BASE_URL}/API/Autos/GetIdAseguradora`, {
    params: credential
  });
};

export const GetTipoRegimenFiscal = (credential) => {
  return axios.get(`${BASE_URL}/API/Autos/TipoRegimenFiscal`, {
    params: credential
  });
};

export const GetTipoCDFI = (credential) => {
  return axios.get(`${BASE_URL}/API/Autos/GetTipoCDFI`, {
    params: credential
  });
};

export const GetPLCodigosBancos = (credential) => {
  return axios.get(`${BASE_URL}/API/Autos/PLCodigosBancos`, {
    params: credential
  });
};


export const GetPLGetMetodosPago = (credential) => {
  return axios.get(`${BASE_URL}/API/Autos/PLGetMetodosPago`, {
    params: credential
  });
};

