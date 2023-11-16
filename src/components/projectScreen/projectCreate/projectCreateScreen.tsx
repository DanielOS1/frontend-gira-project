// TeamCreationScreen.tsx

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

interface Team {
    name: string;
    members: string[]; // Lista de IDs de miembros del equipo
}

const ProjectCreationScreen: React.FC = () => {
    const [team, setTeam] = useState<Team>({
        name: "",
        members: [], // Inicialmente vacío, se agregará el ID del usuario que crea el equipo
    });

    const [userIsInTeam, setUserIsInTeam] = useState(false);

    useEffect(() => {
        // Aquí deberías tener lógica para verificar si el usuario ya pertenece a un equipo
        // Puedes usar AsyncStorage, una API, o algún otro mecanismo de almacenamiento para esto
        // Por ahora, simplemente estableceremos userIsInTeam en true para simularlo.
        setUserIsInTeam(true);
    }, []);

    const handleCreateTeam = () => {
        // Aquí deberías tener lógica para crear el equipo, guardar en la base de datos, etc.
        // Puedes utilizar servicios como Firebase o tu propia API.
        // Después de crear el equipo, puedes redirigir a la pantalla de creación de proyectos.
        console.log("Equipo creado:", team);
    };

    if (userIsInTeam) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Crear Proyecto</Text>

                <Text style={styles.label}>Nombre del equipo:</Text>
                <TextInput
                    style={styles.inputField}
                    value={team.name}
                    onChangeText={(text) => setTeam({ ...team, name: text })}
                />

                <TouchableOpacity style={styles.createButton} onPress={handleCreateTeam}>
                    <Text style={styles.buttonText}>Crear Equipo</Text>
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Crear Proyecto</Text>
                <Text style={styles.errorMessage}>Debes unirte a un equipo antes de crear uno.</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    inputField: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    createButton: {
        backgroundColor: "#4caf50",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
    errorMessage: {
        color: "red",
        fontSize: 16,
        textAlign: "center",
    },
});

export default ProjectCreationScreen;
