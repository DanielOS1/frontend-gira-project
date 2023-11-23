import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./projectCreateStyle";
import RNPickerSelect from 'react-native-picker-select';
import { useCreateLogic } from "./CreateLogic";
const ProjectCreationScreen: React.FC = () => {
    const { team, setTeam, selectedTeam, setSelectedTeam, descripcion, setDescripcion, handleCreateProject } = useCreateLogic();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear Proyecto</Text>
            <Text style={styles.label}>Selecciona un equipo:</Text>
            <RNPickerSelect
                onValueChange={(value) => setSelectedTeam(value)}
                items={[]} // Este array se llenará con los equipos cargados desde el backend
                placeholder={{ label: "Selecciona un equipo", value: null }}
                style={{

                    inputIOS: styles.inputField,
                    inputAndroid: styles.inputField,
                }}
            />
            <Text style={styles.label}>Nombre del Proyecto:</Text>
            <TextInput
                style={styles.inputField}
                value={team.name}
                onChangeText={(text) => setTeam({ ...team, name: text })}
            />
            <Text style={styles.label}>Descripcion:</Text>
            <TextInput
                style={styles.inputField}
                value={descripcion}
                onChangeText={setDescripcion}
            />
            <TouchableOpacity style={styles.createButton} onPress={handleCreateProject}>
                <Text style={styles.buttonText}>Crear Proyecto</Text>
            </TouchableOpacity>
        </View>
    );
};


export default ProjectCreationScreen;
