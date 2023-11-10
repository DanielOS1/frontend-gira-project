import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './teamStyle';

type Team = {
  id: string;
  name: string;
  description: string;
};

const teams: Team[] = [
  { id: '1', name: 'Equipo 1', description: 'descripción' },
  // ... otros equipos
];

const TeamScreen: React.FC = () => {
  const navigation = useNavigation(); // Esto debe estar dentro del componente.

  const navigateToAddNewTeam = () => {
    // Implementa la navegación a la pantalla para agregar un nuevo equipo
    // Asegúrate de que la pantalla para agregar un nuevo equipo esté registrada en tu Stack Navigator
    navigation.navigate('addTeam');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={teams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.teamItem}
          >
            <Text style={styles.teamName}>{item.name}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={navigateToAddNewTeam}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TeamScreen;
