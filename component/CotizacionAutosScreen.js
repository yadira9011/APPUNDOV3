import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CotEstatusVehiculos } from './api';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';

const CotizacionAutosScreen = ({ route }) => {
  const navigation = useNavigation();
  const { DataParameter } = route.params;
  const [loading, setLoading] = useState(true);
  const [AutoEstatusVehiculos, setAutoEstatusVehiculos] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const [selectedFruit, setSelectedFruit] = useState(null);
  const [fruitOptions, setFruitOptions] = useState([]);

  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [animalOptions, setAnimalOptions] = useState([
    { label: 'Dog', value: 'dog' },
    { label: 'Cat', value: 'cat' },
    { label: 'Elephant', value: 'elephant' },
    { label: 'Lion', value: 'lion' },
    { label: 'Monkey', value: 'monkey' },
  ]);

  useEffect(() => {
    const fetchAutoEstatusVehiculos = async () => {
      try {
        const response = await CotEstatusVehiculos(
          DataParameter.email,
          DataParameter.password,
          DataParameter.IdSubCanal
        );

        if (response.data.Data.Data) {
          const data = response.data.Data.Data;
          const transformedOptions = data.map((fruit) => ({
            label: fruit.Valor,
            value: fruit.Id.toString(),
          }));
          setFruitOptions(transformedOptions);
          setSelectedFruit(transformedOptions[0].value);
          setLoading(false);
        } else {
          console.error('La respuesta de la API no contiene Estaus vehiculos.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      }
    };
    fetchAutoEstatusVehiculos();
  }, []);

  const handleFruitChange = (item) => {
    setSelectedFruit(item.value);
    console.log(item.value);
  };

  const handleAnimalChange = (item) => {
    setSelectedAnimal(item.value);
  };

  return (
    <View style={styles.container}>
      <DropDownPicker
        items={fruitOptions}
        defaultValue={selectedFruit}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        itemStyle={styles.dropdownItem}
        dropDownStyle={styles.dropdownMenu}
        onChangeItem={handleFruitChange}
      />

      <Text style={styles.label}>Select an animal:</Text>
      <DropDownPicker
        items={animalOptions}
        defaultValue={selectedAnimal}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        itemStyle={styles.dropdownItem}
        dropDownStyle={styles.dropdownMenu}
        onChangeItem={handleAnimalChange}
      />

      {/* Aquí puedes realizar acciones adicionales según la selección */}
      <Text style={styles.selectedAnimalText}>Selected Animal: {selectedAnimal}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff', // Agrega un color de fondo para ver los componentes
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdownContainer: {
    height: 40,
    width: '100%',
    marginTop: 10,
  },
  dropdown: {
    backgroundColor: '#fafafa',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  dropdownItem: {
    justifyContent: 'flex-start',
  },
  dropdownMenu: {
    backgroundColor: '#fafafa',
  },
  selectedAnimalText: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default CotizacionAutosScreen;
