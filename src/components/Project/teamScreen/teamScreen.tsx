import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import styles from './teamStyle';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL} from '@env';
import {Team} from '../../../Types/Types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList  } from '../../../Types/Types';
import { storeData } from '../../../logic/storage';
import LoadingScreen from '../../../config/LoadingScreen';

const TeamScreen: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'TeamScreen'>>();
  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        if (!token) {
          console.error('No se encontró el token de autenticación');
          return;
        }

        const response = await axios.get(`http://${API_URL}/equipos/user-equipos`, {
          headers: {
            Authorization: `Bearer ${token}` // Incluir el token en los encabezados
          }
        });

        console.log(response.data.equipos);
        setTeams(response.data.equipos); // Asegúrate de ajustar según la estructura de tu respuesta
      } catch (error) {
        console.error('Error al cargar los equipos', error);
        // Manejar el error
      }
      setIsLoading(false);
      
    };

    fetchTeams();
  }, []);

  const handleDescriptionPress = (team: Team) => {
    storeData('team', team);
    navigation.navigate('TeamDescription');
  };

  // Renderiza un mensaje de carga mientras los datos se están obteniendo
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={teams}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.teamItem} onPress={() => handleDescriptionPress(item)}>
            <Text style={styles.teamName}>{item.nombre}</Text>
            <Entypo name="chevron-right" size={24} color="#7cb9e8" />
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('addTeam')}>
        <Entypo name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default TeamScreen;
