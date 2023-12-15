// AddUserScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { API_URL } from '@env';
import { getData } from '../../../../../logic/storage'; // Asegúrate de que la ruta sea correcta

const AddUserScreen: React.FC<{}> = () => {
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();

  const handleAddUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No se encontró el token de autenticación');
        return;
      }
      const storedTeam = await getData('team');
      console.log(userName);
      console.log(storedTeam.nombre);
      // Actualizar la URL para incluir el nombre del equipo y el nombre de usuario
      const response = await axios.post(`http://${API_URL}/equipos/${storedTeam.nombre}/users/${userName}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      Alert.alert('Éxito', 'Usuario agregado exitosamente al equipo');
      console.log(response.data);
      navigation.goBack(); // Regresar a la pantalla anterior
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
    backgroundColor: '#f5f5f5', // color de fondo suave
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333', // color de texto oscuro
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd', // borde más suave
    backgroundColor: '#fff', // fondo blanco para el input
    borderRadius: 8, // bordes redondeados
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0066cc', // color de botón azul
    padding: 15,
    borderRadius: 8, // bordes redondeados
    marginTop: 20,
    width: '100%',
    shadowOpacity: 0.2, // sombra ligera para el botón
    elevation: 2, // elevación para Android
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default AddUserScreen;
