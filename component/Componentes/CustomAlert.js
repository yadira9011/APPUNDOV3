import React from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import styles from './ModalStyles';

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
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../../assets/IconoU.png')}
              style={styles.iconImage}
            />
          </View>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


export default CustomAlert;
