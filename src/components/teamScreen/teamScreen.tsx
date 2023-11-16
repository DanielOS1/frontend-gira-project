import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import styles from './teamStyle';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Team = {
  id: string;
  nombre: string;
  descripcion: string;
  members: Member[]; // Asumiendo que tienes un tipo Member definido en alguna parte
};

type Member = {
  id: string;
  username: string;
  email: string;
};

const TeamScreen: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoading(true);
      try {
        // Obtener el token del almacenamiento local
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        // Verificar si el token existe
        if (!token) {
          console.error('No se encontró el token de autenticación');
          // Aquí puedes manejar la ausencia del token, como redirigir al inicio de sesión
          return;
        }

        const response = await axios.get('http://192.168.0.7:3000/equipos/user-equipos', {
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
    navigation.navigate('TeamDescription', { team });
  };

  // Renderiza un mensaje de carga mientras los datos se están obteniendo
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Cargando equipos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={teams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.teamItem}>
            <Text style={styles.teamName}>{item.nombre}</Text>
            <View style={styles.iconsContainer}>
              <TouchableOpacity onPress={() => handleDescriptionPress(item)}>
                <Entypo name="documents" size={24} color="black" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('addTeam')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TeamScreen;
