// CreateTeamScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "./addTeamStyle";
import { useNavigation } from "@react-navigation/native";

const CreateTeamScreen: React.FC = () => {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [collaborators, setCollaborators] = useState([]); // Ahora manejamos los colaboradores aquí

  const navigation = useNavigation();

  const handleCreateTeam = () => {

    // Implementa la lógica para crear el equipo en tu backend o estado global
  };

  const handleAddUsers = () => {
      navigation.navigate('AddUserScreen');

  };

  // Renderiza la lista de usuarios añadidos si lo necesitas en tu UI
  const renderCollaborators = () => {
    return collaborators.map((email, index) => (
      <Text key={index} style={styles.collaboratorText}>{email}</Text>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleShape} />
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
