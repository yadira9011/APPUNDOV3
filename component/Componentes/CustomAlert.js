import React from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import modalStyles from '../Styles/ModalStyles';
import { IconsAlerts } from '../Utilities';
const CustomAlert = ({ visible, message, onClose, iconName, AlertTwo, onConfirm }) => {
  const handleClose = () => {
    onClose();
  };
  const handleConfirm = () => {
    onConfirm();
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
              source={IconsAlerts['Icon_Blue.png']}
              style={modalStyles.iconImage}
            />
          </View>
          <Text style={modalStyles.message}>{message}</Text>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            {AlertTwo && (
              <TouchableOpacity style={modalStyles.confirmButton} onPress={handleConfirm}>
                <Text style={modalStyles.closeButtonText}>Sí</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={modalStyles.closeButton} onPress={handleClose}>
              {/* <Text style={modalStyles.closeButtonText}>No</Text> */}
              <Text style={modalStyles.closeButtonText}>{AlertTwo ? "No" : "Cerrar"}</Text>
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity style={modalStyles.closeButton} onPress={handleClose}>
            <Text style={modalStyles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
