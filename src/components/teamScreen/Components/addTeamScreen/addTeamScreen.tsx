import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./addTeamStyle";
import { useNavigation } from "@react-navigation/native";
import axios from "axios"; // Asegúrate de tener axios instalado
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateTeamScreen: React.FC = () => {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  const getToken = async () => {
    try {
      return await AsyncStorage.getItem("token");
    } catch (error) {
      console.error("Error al obtener el token:", error);
    }
  };

  const handleCreateTeam = async () => {
    try {
      const token = await getToken(); // Obtén el token
      if (!token) {
        Alert.alert("Error", "No se encontró el token de autenticación");
        return;
      }
  
      // Obtén los detalles del usuario, incluyendo el nombre de usuario, del backend
      const userDataResponse = await axios.get("http://192.168.0.7:3000/profile/me", {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en el header
        },
      });
  
      if (!userDataResponse.data || !userDataResponse.data.username) {
        Alert.alert("Error", "No se pudo obtener la información del usuario");
        return;
      }
      const username = userDataResponse.data.username;
  
      // Crear el equipo
      const createTeamResponse = await axios.post(
        "http://192.168.0.7:3000/equipos/register",
        {
          nombre: teamName,
          descripcion: description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (createTeamResponse.status === 201) {
        // Equipo creado exitosamente, ahora agrega al usuario al equipo
       // Asegúrate de obtener el ID correcto del equipo
  
        // Agregar el usuario al equipo recién creado utilizando el username
        await axios.post(`http://192.168.0.7:3000/equipos/${teamName}/users/${username}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        Alert.alert("Éxito", "Equipo creado y usuario agregado exitosamente");
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", "No se pudo crear el equipo");
      }
    } catch (error) {
      console.error("Error al crear el equipo o al agregar el usuario al equipo", error);
      Alert.alert("Error", "No se pudo crear el equipo o agregar el usuario al mismo");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Equipo</Text>
      <TextInput
        placeholder="Nombre del equipo"
        style={styles.input}
        onChangeText={setTeamName}
        value={teamName}
      />
      <TextInput
        placeholder="Descripción"
        style={[styles.input, styles.descriptionInput]}
        onChangeText={setDescription}
        value={description}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateTeam}>
        <Text style={styles.buttonText}>Crear Equipo</Text>
      </TouchableOpacity>

      {/* Botón para agregar usuarios (opcional) */}
      {/* <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddUsers}
      >
        <Text style={styles.addButtonText}>Agregar Usuarios</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default CreateTeamScreen;
