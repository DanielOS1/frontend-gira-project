// ProjectDescriptionScreen.tsx

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";

interface Project {
    id: string;
    name: string;
}

interface ProjectDetails {
    description: string;
    startDate: string;
    endDate: string;
    teams: string[];
}

const ProjectDescriptionScreen: React.FC = ({ route, navigation }) => {
    const { project } = route.params;
    const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(null);
    const handleDeleteProject = () => {
        // Aquí deberías tener lógica para eliminar el proyecto desde el backend
        // Puedes utilizar servicios como Axios para hacer solicitudes HTTP.

        // Por ahora, simplemente mostraremos un mensaje de confirmación y navegar a la pantalla anterior.
        Alert.alert(
            "Confirmación",
            "¿Estás seguro de que deseas eliminar este proyecto?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Eliminar",
                    onPress: () => {
                        // Simulación de eliminación local
                        // (En una aplicación real, esta lógica debería comunicarse con el backend)
                        console.log("Proyecto eliminado:", project.id);

                        // Navegar a la pantalla anterior (o la pantalla que desees después de eliminar)
                        navigation.goBack();
                    },
                    style: "destructive",
                },
            ],
            { cancelable: false }
        );
    };
    useEffect(() => {
        // Aquí deberías tener lógica para obtener más detalles del proyecto desde el backend
        // Puedes usar el ID del proyecto en la variable 'project.id'
        // Puedes utilizar servicios como Axios para hacer solicitudes HTTP.

        // Ejemplo: Obtener detalles del proyecto desde el backend
        // axios.get<ProjectDetails>(`/api/projects/${project.id}`)
        //     .then(response => setProjectDetails(response.data))
        //     .catch(error => console.error(error));

        // Por ahora, simplemente estableceremos detalles de ejemplo.
        const sampleDetails: ProjectDetails = {
            description: "Descripción del proyecto...",
            startDate: "2023-01-01",
            endDate: "2023-12-31",
            teams: ["Equipo1", "Equipo2"],
        };
        setProjectDetails(sampleDetails);
    }, [project.id]);

    if (!projectDetails) {
        // Puedes mostrar un indicador de carga o algún mensaje mientras esperas los detalles del proyecto.
        return (
            <View style={styles.container}>
                <Text>Cargando detalles del proyecto...</Text>
            </View>
        );
    }

    // Aquí puedes usar projectDetails de manera segura, ya que se ha obtenido.
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Nombre del proyecto:</Text>
            <Text style={styles.text}>{project.name}</Text>

            <Text style={styles.label}>Descripción:</Text>
            <Text style={styles.text}>{projectDetails.description}</Text>

            <Text style={styles.label}>Fecha de inicio:</Text>
            <Text style={styles.text}>{projectDetails.startDate}</Text>

            <Text style={styles.label}>Fecha de término:</Text>
            <Text style={styles.text}>{projectDetails.endDate}</Text>

            {/* Renderizar equipos u otras informaciones según sea necesario */}

            {/* Resto del código... */}
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteProject}>
            <Text style={styles.addButtonText}>Eliminar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    deleteButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        width: 100,
      },
      addButtonText: {
        color: "#fff",
        fontSize: 16,
      },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    
});

export default ProjectDescriptionScreen;
