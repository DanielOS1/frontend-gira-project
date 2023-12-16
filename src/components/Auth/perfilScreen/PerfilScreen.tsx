// Perfil.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';
import { API_URL} from '@env';
import styles from './perfilStyle';
import LoadingScreen from '../../../config/LoadingScreen';
import { FontAwesome } from '@expo/vector-icons';

const ProfileImagePlaceholder = () => (
  <View style={styles.imagePlaceholder}>
    <Entypo name="user" size={60} color="#7cb9e8" />
  </View>
);

const Perfil = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [realName, setRealName] = useState('');
  const [rol, setRol] = useState('');
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState({ username: false, email: false, realName: false, rol: false });


  const getToken = async () => {
      try {
        return await AsyncStorage.getItem('token');
    } catch (error) {
        console.error('Error al obtener el token:', error);
    }
  };
  const updateProfile = async (fieldToUpdate: "username" | "email" | "realName" | "rol") => {
    try {
      const token = await getToken();
      let requestBody = {};
      switch (fieldToUpdate) {
        case "username":
          requestBody = { username };
          break;
        case "email":
          requestBody = { email };
          break;
        case "realName":
          requestBody = { realName };
          break;
        case "rol":
          requestBody = { rol };
          break;
        default:
          throw new Error('Campo no reconocido para la actualización');
      }

      const response = await fetch(`http://${API_URL}/profile/update`, {
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
        return true;
      } else {
        console.error('Error actualizando el perfil:', data);
        return false;
      }
    } catch (error) {
      console.error('Hubo un error al actualizar el perfil:', error);
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const response = await fetch(`http://${API_URL}/profile/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
 
        const data = await response.json();
        if (response.ok) {
          setUsername(data.username);
          setEmail(data.email);
          setRealName(data.realName); 
          setRol(data.rol);
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

  const handleEditToggle = (field: "username" | "email" | "realName" | "rol") => {
    setIsEditing({ ...isEditing, [field]: !isEditing[field] });
  };

  const handleSave = async (field: "username" | "email" | "realName" | "rol") => {
    if (field === "username" && !username.trim()) {
      alert("El nombre de usuario no puede estar vacío");
      return;
    }
    if (field === "email" && !email.trim()) {
      alert("El correo electrónico no puede estar vacío");
      return;
    }
    if (field === "realName" && !realName.trim()) {
      alert("El nombre real no puede estar vacío");
      return;
    }
    if (field === "rol" && !rol.trim()) {
      alert("El rol no puede estar vacío");
      return;
    }
    
    const wasUpdateSuccessful = await updateProfile(field);
    if (wasUpdateSuccessful) {
      setIsEditing({ ...isEditing, [field]: false });
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ProfileImagePlaceholder />
  
      {/* Sección del nombre de usuario */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre de usuario:</Text>
        {isEditing.username ? (
          <>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              autoFocus
            />
            <TouchableOpacity onPress={() => handleSave("username")}>
              <Entypo name="save" size={24} color="white" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.value}>{username}</Text>
            <TouchableOpacity onPress={() => handleEditToggle("username")}>
              <Entypo name="edit" size={24} color="white" />
            </TouchableOpacity>
          </>
        )}
      </View>
  
      {/* Sección del email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        {isEditing.email ? (
          <>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoFocus
            />
            <TouchableOpacity onPress={() => handleSave("email")}>
              <Entypo name="save" size={24} color="white" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.value}>{email}</Text>
            <TouchableOpacity onPress={() => handleEditToggle("email")}>
              <Entypo name="edit" size={24} color="white" />
            </TouchableOpacity>
          </>
        )}
      </View>
  
      {/* Sección del nombre real */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre Real:</Text>
        {isEditing.realName ? (
          <>
            <TextInput
              style={styles.input}
              value={realName}
              onChangeText={setRealName}
              autoFocus
            />
            <TouchableOpacity onPress={() => handleSave("realName")}>
              <Entypo name="save" size={24} color="white" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.value}>{realName}</Text>
            <TouchableOpacity onPress={() => handleEditToggle("realName")}>
              <Entypo name="edit" size={24} color="white" />
            </TouchableOpacity>
          </>
        )}
      </View>
  
      {/* Sección del rol */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Rol:</Text>
        {isEditing.rol ? (
          <>
            <TextInput
              style={styles.input}
              value={rol}
              onChangeText={setRol}
              autoFocus
            />
            <TouchableOpacity onPress={() => handleSave("rol")}>
              <Entypo name="save" size={24} color="white" />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.value}>{rol}</Text>
            <TouchableOpacity onPress={() => handleEditToggle("rol")}>
              <Entypo name="edit" size={24} color="white" />
            </TouchableOpacity>
          </>
        )}
      </View>
  
    </View>
  );
};

export default Perfil;
