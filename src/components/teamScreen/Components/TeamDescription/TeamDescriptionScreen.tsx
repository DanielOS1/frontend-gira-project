import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import styles from "./TeamDescriptionStyle";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {RootStackParamList, Team, User } from '../../../../Types/Types'; // Asegúrate de que la ruta sea correcta

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
  const [members, setMembers] = useState(team.members || []);

  const handleAddUsers = () => {

    navigation.navigate('AddUserScreen', { teamId: team.id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.teamName}>{team.name}</Text>
      <Text style={styles.teamDescription}>{team.description}</Text>
      <TouchableOpacity style={styles.addButton} onPress={handleAddUsers}>
        <Text style={styles.addButtonText}>Agregar Usuarios</Text>
      </TouchableOpacity>
      <FlatList
        data={members}
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