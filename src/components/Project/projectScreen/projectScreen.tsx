// ProjectScreen.tsx
import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import { storeData } from '../../../logic/storage';
import LoadingScreen from '../../../config/LoadingScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../Types/Types';

type Project = {
  id: string;
  nombre: string;
};

type Team = {
  id: string;
  nombre: string;
  descripcion: string;
  proyectos: Project[];
};

const ProjectScreen: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList,'ProjectScreen'>>();


  const fetchTeamsAndProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No se encontró el token de autenticación');
        setIsLoading(false);
        return;
      }

      let teamsResponse = await axios.get(`http://${API_URL}/equipos/user-equipos`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const proyectosPromises = teamsResponse.data.equipos.map(async (equipo: Team) => {
        const proyectosResponse = await axios.get(`http://${API_URL}/equipos/${equipo.id}/proyectos`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return { ...equipo, proyectos: proyectosResponse.data };
      });

      const teamsWithProyectos = await Promise.all(proyectosPromises);
      setTeams(teamsWithProyectos);
    } catch (error) {
      console.error('Error al cargar los equipos y proyectos', error);
    }
    setIsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTeamsAndProjects();
    }, [fetchTeamsAndProjects])
  );

  const handleProjectPress = async (project: Project) => {
    console.log('Proyecto seleccionado:', project);
    await storeData('selectedProjectId', project.id)
    navigation.navigate('ProjectHome');
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  const renderProjectItem = ({ item }: { item: Project }) => (
    <TouchableOpacity style={styles.projectItem} onPress={() => handleProjectPress(item)}>
      <Text style={styles.projectName}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  const renderTeamItem = ({ item }: { item: Team }) => (
    <View style={styles.teamContainer}>
      <Text style={styles.teamName}>{item.nombre}</Text>
      <FlatList
        data={item.proyectos}
        keyExtractor={(project) => project.id}
        renderItem={renderProjectItem}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={teams}
        keyExtractor={(team) => team.id}
        renderItem={renderTeamItem}
      />
    </View>
  );
};

// Estilos para el ProjectScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000',
  },
  teamContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  teamName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  projectItem: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  projectName: {
    fontSize: 16,
    color: '#fff',
  },
});

export default ProjectScreen;
