// Perfil.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';
import { API_URL} from '@env';
import styles from './perfilStyle'; // Asegúrate de que la ruta al archivo de estilos sea correcta
import LoadingScreen from '../../../config/LoadingScreen';

const ProfileImagePlaceholder = () => (
  <View style={styles.imagePlaceholder}>
    <Entypo name="user" size={60} color="#7cb9e8" />
  </View>
);

const Perfil = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState({ username: false, email: false });

  const getToken = async () => {
      try {
        return await AsyncStorage.getItem('token');
    } catch (error) {
        console.error('Error al obtener el token:', error);
    }
  };

  const updateProfile = async (fieldToUpdate: "username" | "email") => {
      try {
        const token = await getToken();
        const requestBody = fieldToUpdate === "username" ? { username } : { email };

        const response = await fetch(`${API_URL}/profile/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Datos actualizados exitosamente:', data);
            return true; // Indicar que la actualización fue exitosa
        } else {
            console.error('Error actualizando el perfil:', data);
            return false; // Indicar que hubo un error
        }
    } catch (error) {
        console.error('Hubo un error al actualizar el perfil:', error);
        return false; // Indicar que hubo un error
    }
  };

  useEffect(() => {
      const fetchData = async () => {
          try {
              const token = await getToken();  // Obtener el token
              console.log(token)
              const response = await fetch('http://192.168.0.7:3000/profile/me', {
                  headers: {
                      'Authorization': `Bearer ${token}`,  // Enviar el token en el header
                  },
              });
              console.log("funcionando")
              const data = await response.json();

              if (response.ok) {
                  setUsername(data.username);
                  setEmail(data.email);
              } else {
                  console.error('Error obteniendo los datos del usuario:', data);
              }
          } catch (error) {
              console.error('Hubo un error al hacer la petición:', error);
          } finally {
              setLoading(false);
          }
    };

    fetchData();
}, []);

  if (loading) {
    return <LoadingScreen />;
  }

  const handleEditToggle = (field: "username" | "email") => {
    setIsEditing({ ...isEditing, [field]: !isEditing[field] });
  };

  const handleSave = async (field: "username" | "email") => {
    const wasUpdateSuccessful = await updateProfile(field);
    if (wasUpdateSuccessful) {
      setIsEditing({ ...isEditing, [field]: false });
    }
  };
  

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ProfileImagePlaceholder />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre de usuario:</Text>
        {isEditing.username ? (
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            autoFocus
          />
        ) : (
          <Text style={styles.value}>{username}</Text>
        )}
        <TouchableOpacity onPress={() => handleEditToggle("username")}>
          <Entypo name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {isEditing.username && (
        <Button title="Guardar" onPress={() => handleSave("username")} />
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        {isEditing.email ? (
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoFocus
          />
        ) : (
          <Text style={styles.value}>{email}</Text>
        )}
        <TouchableOpacity onPress={() => handleEditToggle("email")}>
          <Entypo name="edit" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {isEditing.email && <Button title="Guardar" onPress={() => handleSave("email")} />}
    </View>
  );
};

export default Perfil;
