import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import styles from "./addTeamStyle";
const CreateTeamScreen: React.FC = () => {
    const [teamName, setTeamName] = useState("");
    const [description, setDescription] = useState("");

    const handleCreateTeam = () => {
        // Aquí manejarías la creación del equipo
        console.log("Nombre del equipo:", teamName);
        console.log("Descripción:", description);
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