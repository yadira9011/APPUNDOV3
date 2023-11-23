import React, { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';

const FlatListPolizas = ({ data, keyExtractor, render, fetchBotonesServPoliza }) => {
  const [tiposBoton, setTiposBoton] = useState([]);

  useEffect(() => {
    const obtenerTiposBoton = async () => {
      try {
        const tiposBotonObtenidos = await fetchBotonesServPoliza(/* Pasar el idPoliza necesario */);
        setTiposBoton(tiposBotonObtenidos);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    obtenerTiposBoton();
  }, [fetchBotonesServPoliza]);

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={({ item }) => (
        <View>
          <Text onPress={() => render({ item })}>{item.title}</Text>
        </View>
      )}
    />
  );
};

export default FlatListPolizas;