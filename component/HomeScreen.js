import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SectionList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { UserGrupos, UserClientes, UserCanales, UserSubcanales } from './api';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userDataParameter } = route.params;
  const [loading, setLoading] = useState(true);
  const [userDataGrupos, setUserDataGrupos] = useState([]);
  const [userDataClientes, setUserDataClientes] = useState([]);
  const [userDataCanales, setUserDataCanales] = useState([]);
  const [userDataSubCanales, setUserDataSubCanales] = useState([]);
  const dataParameterRef = useRef(null);

  useEffect(() => {
    const fetchDataGrupos = async () => {
      try {
        const response = await UserGrupos(
          userDataParameter.email,
          userDataParameter.password,
          userDataParameter.IdUsr
        );
        if (response.data.GrupoEmpresas) {
          const data = [{ title: 'Grupo Empresa', data: response.data.GrupoEmpresas, expanded: false }];
          setUserDataGrupos(data);
        } else {
          console.error('La respuesta de la API no contiene GrupoEmpresas.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      }
    };
    fetchDataGrupos();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }


  const toggleSectionGrupos = (section) => {
    const updatedData = userDataGrupos.map((item) => {
      if (item.title === section.title) {
        return { ...item, expanded: !item.expanded };
      }
      return item;
    });
    setUserDataGrupos(updatedData);
  };

  const toggleSectionClientes = (section) => {
    const updatedData = userDataClientes.map((item) => {
      if (item.title === section.title) {
        return { ...item, expanded: !item.expanded };
      }
      return item;
    });
    setUserDataClientes(updatedData);
  };

  const toggleSectionCanales = (section) => {
    const updatedData = userDataCanales.map((item) => {
      if (item.title === section.title) {
        return { ...item, expanded: !item.expanded };
      }
      return item;
    });
    setUserDataCanales(updatedData);
  };

  const toggleSectionSubcanales = (section) => {
    const updatedData = userDataSubCanales.map((item) => {
      if (item.title === section.title) {
        return { ...item, expanded: !item.expanded };
      }
      return item;
    });
    setUserDataSubCanales(updatedData);
  };

  const GrupoExpandableItem = ({ item, onPress, index }) => {
    // console.log("entre a expanded....")
    // console.log(index)
    // console.log(item)
    // console.log(item[0].expanded)
    // console.log(item[0].data[index].Grupo)
    if (item[0].expanded) {
      return (
        <TouchableOpacity onPress={() => onPressGrupo(item[0].data[index].IdGrupoEmpresa)}>
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item[0].data[index].Grupo}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const ClientesExpandableItem = ({ item, onPress, index }) => {
    if (item[0].expanded) {
      return (
        <TouchableOpacity onPress={() => onPressClientes(item[0].data[index].IdCliente)}>
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item[0].data[index].NomCliente}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const CanalExpandableItem = ({ item, onPress, index }) => {
    if (item[0].expanded) {
      return (
        <TouchableOpacity onPress={() => onPressCanal(item[0].data[index].IdCanal)}>
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item[0].data[index].NomCanal}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const SubcanalExpandableItem = ({ item, onPress, index }) => {
    if (item[0].expanded) {
      return (
        <TouchableOpacity onPress={() => onPressSubcanal(item[0].data[index].IDSubCanal, item[0].data[index].SubCanal)}>
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item[0].data[index].SubCanal}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  const onPressGrupo = async (IdGrupoEmpresa) => {
    try {

      setUserDataClientes([]);
      setUserDataCanales([]);
      setUserDataSubCanales([]);

      const response = await UserClientes(
        userDataParameter.email,
        userDataParameter.password,
        userDataParameter.IdUsr,
        IdGrupoEmpresa
      );

      if (response.data.Clientes) {
        const data = [{ title: 'Clientes', data: response.data.Clientes, expanded: false }];
        setUserDataClientes(data);
      } else {
        console.error('La respuesta de la API no contiene Clientes.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const onPressClientes = async (IdCliente) => {

    try {

      setUserDataCanales([]);
      setUserDataSubCanales([]);

      const response = await UserCanales(
        userDataParameter.email,
        userDataParameter.password,
        userDataParameter.IdUsr,
        IdCliente
      );

      if (response.data.Canal) {
        const data = [{ title: 'Canales', data: response.data.Canal, expanded: false }];
        setUserDataCanales(data);
      }
      else {
        console.error('La respuesta de la API no contiene canales.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const onPressCanal = async (IdCanal) => {

    try {

      setUserDataSubCanales([]);
      const response = await UserSubcanales(
        userDataParameter.email,
        userDataParameter.password,
        userDataParameter.IdUsr,
        IdCanal
      );

      if (response.data.Subcanales) {
        const data = [{ title: 'SubCanales', data: response.data.Subcanales, expanded: false }];
        setUserDataSubCanales(data);
      } else {
        console.error('La respuesta de la API no contiene SubCanales.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      setLoading(false);
    }
  };

  const onPressSubcanal = async (IdSubCanal, NomSubCanal) => {

    console.log("subcanal seleccionado", IdSubCanal);
    const _DataParameter = {
      IdUsr: userDataParameter.IdUsr,
      password: userDataParameter.password,
      email: userDataParameter.email,
      IdSubCanal: IdSubCanal,
      NomSubCanal: NomSubCanal
    };
    dataParameterRef.current = _DataParameter;
    Alert.alert(
      'Informacion',
      'Subcanal seleccionado ' + NomSubCanal,
      [
        {
          text: 'OK', onPress: () => {
       
            navigation.navigate('Modulos', { DataParameter: _DataParameter });
            // navigation.navigate('Modulos', { userDataParameter });
          }
        }
      ],
      { cancelable: false }
    );
  };

  return (

    <View style={{ marginHorizontal: 10 }}>

      {/* SELECT GrupoEmpresa */}
      <SectionList
        style={{ marginBottom: 10 }}
        sections={userDataGrupos}
        keyExtractor={(item, index) => item.IdGrupoEmpresa.toString()}
        renderItem={({ item, index }) => (
          <GrupoExpandableItem item={userDataGrupos} onPress={() => toggleSectionGrupos(item)} index={index} />
        )}
        renderSectionHeader={({ section }) => (
          <TouchableOpacity onPress={() => toggleSectionGrupos(section)}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{section.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* SELECT CLIENTES */}

      <SectionList
        style={{ marginBottom: 10 }}
        sections={userDataClientes}
        keyExtractor={(item, index) => item.IdCliente.toString()}
        renderItem={({ item, index }) => (
          <ClientesExpandableItem item={userDataClientes} onPress={() => toggleSectionClientes(item)} index={index} />
        )}
        renderSectionHeader={({ section }) => (
          <TouchableOpacity onPress={() => toggleSectionClientes(section)}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{section.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {/* SELECT CANALES */}
      <SectionList
        style={{ marginBottom: 10 }}
        sections={userDataCanales}
        keyExtractor={(item, index) => item.IdCanal.toString()}
        renderItem={({ item, index }) => (
          <CanalExpandableItem item={userDataCanales} onPress={() => toggleSectionCanales(item)} index={index} />
        )}
        renderSectionHeader={({ section }) => (
          <TouchableOpacity onPress={() => toggleSectionCanales(section)}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{section.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {/* SELECT SUBCANALES */}
      <SectionList
        style={{ marginBottom: 10 }}
        sections={userDataSubCanales}
        keyExtractor={(item, index) => item.IDSubCanal.toString()}
        renderItem={({ item, index }) => (
          <SubcanalExpandableItem item={userDataSubCanales} onPress={() => toggleSectionSubcanales(item)} index={index} />
        )}
        renderSectionHeader={({ section }) => (
          <TouchableOpacity onPress={() => toggleSectionSubcanales(section)}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{section.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = {
  itemContainer: {
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 5
  },
  itemText: {
    fontSize: 16,
  },
  sectionHeader: {
    backgroundColor: '#007bff',
    padding: 5,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
};

export default HomeScreen;
