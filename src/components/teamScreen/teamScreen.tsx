import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './teamStyle';
import { Entypo } from '@expo/vector-icons';

type Team = {
  id: string;
  name: string;
  description: string;
  members: Member[]; // Asumiendo que tienes un tipo Member definido en alguna parte
};

type Member = {
  id: string;
  username: string;
  email: string;
};

const teams: Team[] = [
  { id: '1', name: 'Equipo 1', description: 'descripción', members: [] },
  { id: '2', name: 'DESTRUCTOR DE QUESO', description: 'LOL', members: [] },
  // ... otros equipos
];

const TeamScreen: React.FC = () => {
  const navigation = useNavigation();


  const handleDescriptionPress = (team: Team) => {
    navigation.navigate('TeamDescription', { team });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={teams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.teamItem}>
            <Text style={styles.teamName}>{item.name}</Text>
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
        onPress={() => navigation.navigate('addTeam')} // Asegúrate de que 'AddTeam' es el nombre correcto de la ruta
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TeamScreen;
