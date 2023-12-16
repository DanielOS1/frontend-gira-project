import React from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import styles from "./projectCreateStyle";
import { Team, useCreateLogic } from "./CreateLogic";

const ProjectCreationScreen: React.FC = () => {
  const {
    teams,
    selectedTeams,
    setSelectedTeams,
    descripcion,
    setDescripcion,
    handleCreateProject,
    project,
    setProject,
    nameProject,
    setNameProject
  } = useCreateLogic();

  const toggleTeamSelection = (teamId: string) => {
    setSelectedTeams((currentSelectedTeams) => {
      if (currentSelectedTeams.includes(teamId)) {
       
        return currentSelectedTeams.filter(id => id !== teamId);
      } else {
       
        return [...currentSelectedTeams, teamId];
      }
    });
  };
  const asd = () =>{
    console.log(teams)
  }
 
  const renderTeam = ({ item }: { item: Team }) => (
    <TouchableOpacity
      onPress={() => toggleTeamSelection(item.id)}
      style={[
        styles.teamItem,
        selectedTeams.includes(item.id) ? styles.teamItemSelected : {},
      ]}
    >
      <Text style={styles.teamText}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Proyecto</Text>
      <TextInput
        style={styles.inputField}
        value={nameProject}
        onChangeText={setNameProject}
        placeholder="Nombre del proyecto"
      />
      <TextInput
        style={styles.inputField}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Descripción del proyecto"
      />
      <TouchableOpacity style={styles.createButton} onPress={handleCreateProject}>
        <Text style={styles.buttonText}>Crear Proyecto</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Seleccione los equipos que perteneceran al proyecto</Text>
      <FlatList
        data={teams}
        renderItem={renderTeam}
        keyExtractor={item => item.id}
    />
    </View>
  );
};

// Añadir estilos para el equipo seleccionado


export default ProjectCreationScreen;
