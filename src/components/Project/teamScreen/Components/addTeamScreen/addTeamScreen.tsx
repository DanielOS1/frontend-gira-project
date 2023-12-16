import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./addTeamStyle";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL} from '@env';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../../../Types/Types";

const CreateTeamScreen: React.FC = () => {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'addTeam'>>();


  const getToken = async () => {
    try {
      return await AsyncStorage.getItem("token");
    } catch (error) {
      console.error("Error al obtener el token:", error);
    }
  };

  const handleCreateTeam = async () => {
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert("Error", "No se encontró el token de autenticación");
        return;
      }
  
     
      const userDataResponse = await axios.get(`http://${API_URL}/profile/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!userDataResponse.data || !userDataResponse.data.username) {
        Alert.alert("Error", "No se pudo obtener la información del usuario");
        return;
      }
      const username = userDataResponse.data.username;
  
     
      const createTeamResponse = await axios.post(
        `http://${API_URL}/equipos/register`,
        {
          nombre: teamName,
          descripcion: description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (createTeamResponse.status === 201) {
       
      
  
       
        await axios.post(`http://${API_URL}/equipos/${teamName}/users/${username}`, {}, {
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
    </View>
  );
};

export default CreateTeamScreen;
