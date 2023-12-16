// AddUserScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { API_URL } from '@env';
import { getData } from '../../../../../logic/storage';

const AddUserScreen: React.FC<{}> = () => {
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();

  const handleAddUser = async () => {
    try {

      if (!userName.trim()) {
        Alert.alert('Campo vacío', 'Por favor, ingresa el nombre de usuario del colaborador');
        return;
      }

      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No se encontró el token de autenticación');
        return;
      }
      const storedTeam = await getData('team');
      console.log(userName);
      console.log(storedTeam.nombre);
     
      const response = await axios.post(`http://${API_URL}/equipos/${storedTeam.nombre}/users/${userName}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      Alert.alert('Éxito', 'Usuario agregado exitosamente al equipo');
      console.log(response.data);
      navigation.goBack();
    } catch (error) {
      console.error('Error al agregar al usuario al equipo', error);
      Alert.alert('Error', 'No se pudo agregar al usuario al equipo');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Añadir un colaborador al equipo</Text>
      <TextInput
        placeholder="Nombre de usuario del colaborador"
        style={styles.input}
        onChangeText={setUserName}
        value={userName}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddUser}>
        <Text style={styles.buttonText}>Agregar y Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0066cc',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    shadowOpacity: 0.2,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default AddUserScreen;
