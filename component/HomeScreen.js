import React, { useState, useEffect } from 'react';
import { View, Text, SectionList, ActivityIndicator } from 'react-native';
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

        console.log(response.data.GrupoEmpresas);
        setUserData(response.data.GrupoEmpresas);
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

  return (
    <View style={{ flex: 1 }}>
      <SectionList
        sections={userData}
        keyExtractor={(item, index) => item.IdGrupoEmpresa.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>{item.Grupo}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ backgroundColor: '#f0f0f0', padding: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>{title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;