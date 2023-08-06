import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { CotEstatusVehiculos } from './api';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

const CotizacionAutosScreen = ({ route }) => {
  const navigation = useNavigation();
  const { DataParameter } = route.params;
  const [loading, setLoading] = useState(true);
  const [AutoEstatusVehiculos, setAutoEstatusVehiculos] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  const [selectedFruit, setSelectedFruit] = useState(null);
  const [fruitOptions, setFruitOptions] = useState([]);

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

          console.log("Dataaaaa",transformedOptions)

          setFruitOptions(transformedOptions);
          setSelectedFruit(transformedOptions[0].Id);


          setAutoEstatusVehiculos(data);
          setSelectedOption(data[0].Id);
        } else {
          console.error('La respuesta de la API no contiene Estaus vehiculos.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      }
    };
    fetchAutoEstatusVehiculos();
  }, []);

  const handleOptionChange = (itemValue) => {
    console.log(itemValue);
    setSelectedOption(itemValue);
    // Alert.alert('Item seleccionado:', itemValue);
    // setSelectedOption(itemValue);
  };

  const handleFruitChange = (item) => {
    setSelectedFruit(item.value);
    console.log(item.value);
  };

  return (
    <View style={{ marginHorizontal: 10 }}>
      <Picker
        selectedValue={selectedOption}
        onValueChange={handleOptionChange}
      >
        {AutoEstatusVehiculos.map((AutoEstatusVehiculo) => (
          <Picker.Item
            key={AutoEstatusVehiculo.Id}
            label={AutoEstatusVehiculo.Valor}
            value={AutoEstatusVehiculo.Id}
          />
        ))}
      </Picker>

      <DropDownPicker
        items={fruitOptions}
        defaultValue={selectedFruit}
        containerStyle={{ height: 40, marginTop: 10 }}
        style={{ backgroundColor: '#fafafa' }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={handleFruitChange}
      />

    </View>
  );
};



export default CotizacionAutosScreen;