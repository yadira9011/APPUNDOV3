
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