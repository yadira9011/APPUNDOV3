import React from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

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

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: -40,
  },
  iconImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#0066cc',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default CustomAlert;
