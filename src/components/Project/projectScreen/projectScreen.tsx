// ProjectScreen.tsx
import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { storeData } from '../../../logic/storage'; 

interface Project {
  id: string;
  name: string;
}

const ProjectScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const sampleProjects: Project[] = [
      { id: "1", name: "Proyecto 1" },
      { id: "2", name: "Proyecto 2" },
    ];
    setProjects(sampleProjects);
  }, []);

  const handleProjectPress = async (project: Project) => {
    await storeData('projectName', project.name);
    navigation.navigate("ProjectHome");
  };

  const renderProjectItem = ({ item }: { item: Project }) => (
    <TouchableOpacity style={styles.projectItem} onPress={() => handleProjectPress(item)}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const handleProjectAdd = () => {
    navigation.navigate("projectCreation");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Proyectos</Text>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={renderProjectItem}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleProjectAdd}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    projectItem: {
        backgroundColor: "#eee",
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
    },
    addButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "blue",
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 24,
    }
});

export default ProjectScreen;