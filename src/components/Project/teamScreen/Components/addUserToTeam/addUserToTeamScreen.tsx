// AddUserScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { API_URL} from '@env';
const AddUserScreen: React.FC<{ route: any}> = ({ route }) => {
  const [userName, setUserName] = useState('');
  const { nombre } = route.params;
  const navigation = useNavigation()
  const handleAddUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No se encontró el token de autenticación');
        return;
      }
      console.log(nombre);
      console.log(userName);
      // Actualizar la URL para incluir el nombre del equipo y el nombre de usuario
      const response = await axios.post(`http://${API_URL}/equipos/${nombre}/users/${userName}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      Alert.alert('Éxito', 'Usuario agregado exitosamente al equipo');
      console.log(response.data);
      
    } catch (error) {
      console.error('Error al agregar al usuario al equipo', error);
      Alert.alert('Error', 'No se pudo agregar al usuario al equipo');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Añade un Colaborador al equipo</Text>
      <TextInput
        placeholder="Ingresa el Email del colaborador"
        style={styles.input}
        onChangeText={setUserName}
        value={userName}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddUser}>
        <Text style={styles.buttonText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default AddUserScreen;