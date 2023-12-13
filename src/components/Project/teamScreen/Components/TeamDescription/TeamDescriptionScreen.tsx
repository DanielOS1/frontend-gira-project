import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "./TeamDescriptionStyle";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from 'axios';
import { API_URL } from '@env';
import { getData, getToken, storeData } from '../../../../../logic/storage'; // Asegúrate de que la ruta sea correcta
import { RootStackParamList, Team, User } from '../../../../../Types/Types';
import { StackNavigationProp } from '@react-navigation/stack';



const TeamDescriptionScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'TeamDescription'>>();
  const route = useRoute();
  const [team, setTeam] = useState<Team>();
  useEffect(() => {
    const fetchTeamDetails = async () => {
      setIsLoading(true);
      try {
        const storedTeam = await getData('team');
        if (storedTeam) {
          setTeam(storedTeam);
          const token = await getToken();
          if (token) {
            const usersResponse = await axios.get(`http://${API_URL}/equipos/${storedTeam.id}/users`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            setUsers(usersResponse.data);
          } else {
            console.error('No se encontró el token de autenticación');
          }
        } else {
          console.error('No se encontraron los detalles del equipo');
          navigation.goBack();
        }
      } catch (error) {
        console.error('Error al obtener los detalles del equipo', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeamDetails();
  }, [navigation]);
  const handleAddUsers = () => {
    storeData('nombreTeam', team?.nombre);
    navigation.navigate('AddUserScreen');
  };
  const handleCreateProject = () => {
    storeData('team', team?.id);
    navigation.navigate('projectCreation');
  };
  const deleteProject = async () => {
    console.log('Eliminando proyecto...');
    try {
      await axios.delete(`http://${API_URL}/equipos/${team?.nombre}`);
      console.log('Equipo eliminado exitosamente');
      navigation.navigate('Home'); // Navega de regreso a la pantalla de inicio
    } catch (error) {
      console.error('Error al eliminar el equipo', error);
    }
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.teamName}>{team?.nombre}</Text>
      <Text style={styles.teamDescription}>{team?.descripcion}</Text>
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