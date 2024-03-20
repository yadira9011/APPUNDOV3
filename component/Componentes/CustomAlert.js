import React from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import modalStyles from '../Styles/ModalStyles';
import { IconsAlerts } from '../Utilities';

const CustomAlert = ({ visible, message, onClose, iconName }) => {
  console.log("ICON NAME ... ", iconName)
  const handleClose = () => {
    onClose();
  };
  
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalContent}>
          <View style={modalStyles.iconContainer}>
            {/* <Image
              source={require('../../assets/IconoU.png')}
              style={styles.iconImage}
            /> */}
            <Image
              source={IconsAlerts[iconName]}
              style={modalStyles.iconImage}
            />
          </View>
          <Text style={modalStyles.message}>{message}</Text>
          <TouchableOpacity style={modalStyles.closeButton} onPress={handleClose}>
            <Text style={modalStyles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
