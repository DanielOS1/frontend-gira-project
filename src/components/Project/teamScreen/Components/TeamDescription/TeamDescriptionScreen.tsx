import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import styles from "./TeamDescriptionStyle";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList, Team, User } from '../../../../../Types/Types'; // Asegúrate de que la ruta sea correcta
import { API_URL} from '@env';
type TeamDescriptionScreenRouteProp = RouteProp<
  { TeamDescription: { team: Team } },
  'TeamDescription'
>;

type TeamDescriptionScreenNavigationProp = StackNavigationProp<
  { TeamDescription: { team: Team } },
  'TeamDescription'
>;

type Props = {
  route: TeamDescriptionScreenRouteProp;
  navigation: TeamDescriptionScreenNavigationProp;
};



const TeamDescriptionScreen: React.FC<Props> = ({ route, navigation }) => {
  const { team } = route.params;
  const [users, setUsers] = useState(team.users || []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No se encontró el token de autenticación');
          return;
        }
  
        // Usar el endpoint para obtener los usuarios del equipo por ID
        console.log(API_URL)
        const usersResponse = await axios.get(`http://${API_URL}/equipos/${team.id}/users`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        // Asumiendo que la respuesta del backend es un arreglo de usuarios
        console.log(usersResponse.data);
        setUsers(usersResponse.data);
        
        // Ya tienes el nombre y la descripción del equipo, no necesitas hacer otra solicitud para eso
      } catch (error) {
        console.error('Error al obtener los detalles del equipo', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchTeamDetails();
  }, [team.id]);

  const handleAddUsers = () => {
    console.log(team.nombre);
    navigation.navigate('AddUserScreen', { nombre: team.nombre });
  };

  const handleCreateProject = () => {
  
    console.log('Creando nuevo proyecto...');
    navigation.navigate('projectCreation', { teamId: team.id });
  };


  const deleteProject = async () => {
    console.log('Eliminando proyecto...');
    try {
      await axios.delete(`http://${API_URL}/equipos/${team.nombre}`);
      console.log('Equipo eliminado exitosamente');
      navigation.navigate('Home'); // Navega de regreso a la pantalla de inicio
    } catch (error) {
      console.error('Error al eliminar el equipo', error);
    }
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.teamName}>{team.nombre}</Text>
      <Text style={styles.teamDescription}>{team.descripcion}</Text>
      <TouchableOpacity style={styles.addButton} onPress={handleAddUsers}>
        <Text style={styles.addButtonText}>Agregar Usuarios</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={deleteProject}>
        <Text style={styles.addButtonText}>Eliminar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.newProjectButton} onPress={handleCreateProject}>
      <Text style={styles.addButtonText}>Nuevo Proyecto</Text>
      </TouchableOpacity>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.memberItem}>
            <Text style={styles.memberName}>{item.username}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TeamDescriptionScreen;