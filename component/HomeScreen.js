import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { UserGrupos } from './api';

const HomeScreen = ({ route }) => {
  const { userDataParameter } = route.params;
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await UserGrupos(
          userDataParameter.email,
          userDataParameter.password,
          userDataParameter.IdUsr
        );

        // Verificar si la respuesta contiene GrupoEmpresas
        if (response.data.GrupoEmpresas) {
          // Crear una única sección con todos los elementos en userData
          const data = [{ title: 'Grupo Empresa', data: response.data.GrupoEmpresas, expanded: false }];

          setUserData(data);
        } else {
          console.error('La respuesta de la API no contiene GrupoEmpresas.');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Función toggleSection movida fuera del componente HomeScreen
  const toggleSection = (section) => {
    const updatedData = userData.map((item) => {
      if (item.title === section.title) {
        return { ...item, expanded: !item.expanded };
      }
      return item;
    });
    setUserData(updatedData);
  };

  const ExpandableItem = ({ item, onPress, index}) => {
    // console.log("entre a expanded....")
    // console.log(index)
    // console.log(item)
    // console.log(item[0].expanded)
    // console.log(item[0].data[index].Grupo)
    if (item[0].expanded) {
      return (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item[0].data[index].Grupo}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SectionList
        sections={userData}
        keyExtractor={(item, index) => item.IdGrupoEmpresa.toString()}
        renderItem={({ item, index }) => (
          <ExpandableItem item={userData} onPress={() => toggleSection(item)} index={index} />
        )}
        renderSectionHeader={({ section }) => (
          <TouchableOpacity onPress={() => toggleSection(section)}>
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
  // Estilos de la lista
  itemContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  sectionHeader: {
    backgroundColor: '#007bff', // Color para el encabezado de sección
    padding: 10,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Color para el texto del encabezado de sección
  },
};

export default HomeScreen;
