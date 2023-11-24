import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TextInput, Button, Alert } from 'react-native';
import { getData, getToken } from '../../../../logic/storage'; // Asegúrate de que la ruta sea correcta
import axios from 'axios';
import { API_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
// Definición de la interfaz Project
interface Project {
  id: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: string;
  creador_id: number;
}
interface Team {
  id: string;
  nombre: string;
};


const ProjectDetailsScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<Project | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editableNombre, setEditableNombre] = useState('');
  const [editableDescripcion, setEditableDescripcion] = useState('');
  const navigation = useNavigation();


  const fetchProjectTeams = async (projectId: number, token: string) => {
    try {
      const response = await axios.get(`http://${API_URL}/proyectos/${projectId}/equipos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeams(response.data);
    } catch (error) {
      console.error('Error al obtener los equipos del proyecto:', error);
    }
  };
  const formatDate = (dateString : any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL'); // Cambia el locale según tu preferencia
  };
  const fetchProjectDetails = useCallback(async () => {
    setIsLoading(true); // Iniciar el indicador de carga
    const projectId = await getData('selectedProjectId');
    const token = await getToken();

    if (!projectId || !token) {
      console.error('No se encontró el proyecto o el token es inválido');
      setIsLoading(false);
      return;
    }

    try {
      // Obtener detalles del proyecto
      const projectResponse = await axios.get(`http://${API_URL}/proyecto/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProject(projectResponse.data);

      // Después de obtener los detalles del proyecto, obten los equipos
      const teamsResponse = await axios.get(`http://${API_URL}/proyecto/${projectId}/equipos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeams(teamsResponse.data);
    } catch (error) {
      console.error('Error al obtener los detalles del proyecto:', error);
    } finally {
      setIsLoading(false); // Detener el indicador de carga
    }
  }, []);

  useEffect(() => {
    fetchProjectDetails();
  }, [fetchProjectDetails]);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (!project) {
    return (
      <View style={styles.centered}>
        <Text>No se pudo cargar la información del proyecto</Text>
      </View>
    );
  }

  const handleSaveEdit = async () => {
    const projectId = await getData('selectedProjectId');
    const token = await getToken();

    if (!projectId || !token) {
      console.error('No se encontró el proyecto o el token es inválido');
      return;
    }

    try {
      const response = await axios.put(`http://${API_URL}/proyecto/${projectId}`, {
        nombre: editableNombre,
        descripcion: editableDescripcion,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsEditing(false);
      setProject(response.data.proyecto); // Asegúrate de actualizar el estado con la respuesta actualizada
    } catch (error) {
      console.error('Error al actualizar el proyecto:', error);
    }
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Restablecer los valores editables al estado original del proyecto
    setEditableNombre(project?.nombre ?? '');
    setEditableDescripcion(project?.descripcion ?? '');
  };
  const handleDeleteProject = async () => {
    const projectId = await getData('selectedProjectId');
    const token = await getToken();
  
    if (!projectId || !token) {
      console.error('No se encontró el proyecto o el token es inválido');
      return;
    }
  
    try {
      await axios.delete(`http://${API_URL}/proyecto/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigation.navigate("Home");
      // Manejar lo que sucede después de una eliminación exitosa, como volver a la pantalla anterior
      // Por ejemplo, si estás usando react-navigation podrías hacer:
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      {isEditing ? (
        <>
          <TextInput
            value={editableNombre}
            onChangeText={setEditableNombre}
            style={styles.input}
            placeholder="Nombre del Proyecto"
          />
          <TextInput
            value={editableDescripcion}
            onChangeText={setEditableDescripcion}
            style={[styles.input, styles.descriptionInput]}
            placeholder="Descripción del Proyecto"
            multiline
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancelar" onPress={handleCancelEdit} color="#6c757d" />
            <Button title="Guardar" onPress={handleSaveEdit} color="#28a745" />
          </View>
        </>
      ) : (
        <>
<Text style={styles.header}>{project.nombre}</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Descripción:</Text>
          <Text style={styles.value}>{project.descripcion}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Fecha de Creación:</Text>
          <Text style={styles.value}>{formatDate(project.fecha_creacion)}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Creador ID:</Text>
          <Text style={styles.value}>{project.creador_id}</Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Equipos Participantes:</Text>
          {teams.length > 0 ? (
            teams.map((team) => (
              <View key={team.id} style={styles.teamContainer}>
                <Text style={styles.value}>{team.nombre}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.value}>No hay equipos asignados a este proyecto</Text>
          )}
        </View>
        <Button title="Editar" onPress={handleEdit} color="#007bff" />
        <View style={styles.buttonContainer}>
          <Button
            title="Eliminar Proyecto"
            onPress={() => {
              Alert.alert(
                "Eliminar Proyecto",
                "¿Estás seguro de que quieres eliminar este proyecto?",
                [
                  { text: "Cancelar", style: "cancel" },
                  { text: "Eliminar", onPress: handleDeleteProject, style: "destructive" },
                ]
              );
            }}
            color="#dc3545"
          />
        </View>
      </>
    )}
  </ScrollView>
);
          }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  buttonContainer: {
    margin: 20,
  },
  input: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  teamContainer: {
    backgroundColor: '#e7e7e7', // Un fondo ligeramente diferente para los equipos
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
    backgroundColor: '#ffffff',
  },
  detailContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  // Añade más estilos según sea necesario
});

export default ProjectDetailsScreen;
