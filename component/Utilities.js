
import config from '../Config';
import { UserGrupos, UserClientes, UserCanales, UserSubcanales } from './Api/api';

export const CountGrupos = async (email, password, idUsuario) => {

  const response = await UserGrupos(
    email,
    password,
    idUsuario
  );

  if (response.data.GrupoEmpresas) {
    const vcount = response.data.GrupoEmpresas.length;
    const datagropos = {
      count: vcount,
      FirstElement: response.data.GrupoEmpresas[0],
      email: email,
      password: password,
      idUsuario: idUsuario
    };
    return datagropos
  }

};

export const CountClientes = async (email, password, idUsuario, IdGrupoEmpresa) => {
  const response = await UserClientes(
    email,
    password,
    idUsuario,
    IdGrupoEmpresa
  );

  if (response.data.Clientes) {
    const vcount = response.data.Clientes.length;
    const dataclientes = {
      count: vcount,
      FirstElement: response.data.Clientes[0],
      email: email,
      password: password,
      idUsuario: idUsuario
    };
    return dataclientes
  }

};

export const CountCanales = async (email, password, idUsuario, idCliente) => {
  const response = await UserCanales(
    email,
    password,
    idUsuario,
    idCliente
  );

  if (response.data.Canal) {
    const vcount = response.data.Canal.length;
    const dataCanal = {
      count: vcount,
      FirstElement: response.data.Canal[0],
      email: email,
      password: password,
      idUsuario: idUsuario
    };
    return dataCanal
  }

};

export const CountSubCanales = async (email, password, idUsuario, IdCanal) => {
  const response = await UserSubcanales(
    email,
    password,
    idUsuario,
    IdCanal
  );

  if (response.data.Subcanales) {
    const vcount = response.data.Subcanales.length;
    const dataSCanal = {
      count: vcount,
      FirstElement: response.data.Subcanales[0],
      email: email,
      password: password,
      idUsuario: idUsuario
    };
    return dataSCanal
  }

};

// export const colors = [
//   '#1077FF',
//   '#1689FF',
//   '#1D9BFF',
//   '#21A9FF',
//   '#49B7FF',
//   '#6EC6FF',
//   '#9BDAFF',
//   '#C4ECFF',
//   '#D9FDFF',
//   '#E9FEFF',
// ];

// export const colors = [
//   '#E9FEFF',
//   '#D9FDFF',
//   '#C4ECFF',
//   '#9BDAFF',
//   '#6EC6FF',
//   '#49B7FF',
//   '#21A9FF',
//   '#1D9BFF',
//   '#1689FF',
//   '#1077FF',
// ];

export const colors = [
  '#1077FF',
  '#1689FF',
  '#1D9BFF',
  '#21A9FF',
  '#49B7FF',
  '#6EC6FF',
  '#9BDAFF',
  '#C4ECFF',
  '#D9FDFF',
  '#E9FEFF',
  // Colores claros
  '#E9FEFF',
  '#D9FDFF',
  '#C4ECFF',
  '#9BDAFF',
  '#6EC6FF',
];

export const colorsSubcanales = [
  '#d3d4d9',
  '#ffe999',
  '#c2cfec',
  '#c1b7ff',

  '#C4ECFF',
  '#D9FDFF',
  '#E9FEFF',
];


export const imagesSubcanales = {
  'SinIcono.png': require('../assets/Subcanales/SinIcono.png'),
  'CreditoUber.png': require('../assets/Subcanales/CreditoUber.png'),
  'CreditoTaxi.png': require('../assets/Subcanales/CreditoTaxi.png'),
  'SeguroCredito.png': require('../assets/Subcanales/SeguroCredito.png'),
  'Empaquetados.png': require('../assets/Subcanales/Empaquetados.png'),
};

export const imagenesAseguradoras = {
  'LogoAna.png': require('../assets/Aseguradoras/LogoAna.png'),
  'LogoChubb.png': require('../assets/Aseguradoras/LogoChubb.png'),
  'Dentegra.png': require('../assets/Aseguradoras/LogoDentegra.png'),
  'LogoGnp.gif': require('../assets/Aseguradoras/LogoGnp.gif'),
  'LogoHdi.png': require('../assets/Aseguradoras/LogoHdi.png'),
  'Hir_Seguros.png': require('../assets/Aseguradoras/LogoHir.png'),
  'LogoProagro.png': require('../assets/Aseguradoras/LogoProagro.png'),
  'LogoQualitas.png': require('../assets/Aseguradoras/LogoQualitas.jpg'),
  'LogoSura.png': require('../assets/Aseguradoras/LogoSura.png'),
};

export const IconsAlerts = {
  'Icon_Red.png': require('../assets/AlertIcons/Icon_Red.png'),
  'Icon_Green.png': require('../assets/AlertIcons/Icon_Green.png'),
  'Icon_Blue.png': require('../assets/AlertIcons/Icon_Blue.png'),
  'Icon_Yellow.png': require('../assets/AlertIcons/Icon_Yellow.png'),
};

const isLightColor = (color) => {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
};

export const getTextColor = (backgroundColor) => {
  return isLightColor(backgroundColor) ? '#002F89' : 'white';
};

export const FormatoEntradaMoneda = (text) => {
  const formattedText = text.replace(/[^0-9,.]/g, '');
  const parts = formattedText.split(/[,.]/);
  const integerPart = parts[0];
  const decimalPart = parts[1] || '';
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const formattedValue = decimalPart.length > 0 ? `${formattedInteger}.${decimalPart}` : formattedInteger;
  return formattedValue;
};
