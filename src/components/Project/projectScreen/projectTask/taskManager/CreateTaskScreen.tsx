// CreateTaskScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useTaskLogic } from '../useTaskLogic';
import { useNavigation } from '@react-navigation/native';

const CreateTaskScreen = () => {
  const { addNewTask } = useTaskLogic();
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskResponsible, setTaskResponsible] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigator = useNavigation();
  const handleCreateTask = () => {
    // Crear un objeto de tarea con información relevante
    const newTask = {
      id: `ID-${Math.random().toString(36).substr(2, 9)}`, // Generar un ID único
      title: taskName,
      description: taskDescription,
      creationDate: startDate,
      endDate: endDate,
      creator: 'Nombre del Creador', // Reemplazar con información pertinente
      responsible: taskResponsible,
    };
    addNewTask(newTask); // Añadir la nueva tarea usando la función del hook
    // Navegar de vuelta al tablero de tareas o manejar la navegación como sea pertinente
    setTaskName('');
    setTaskDescription('');
    setTaskResponsible('');
    setStartDate('');
    setEndDate('');
    navigator.goBack();

  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre de la Tarea:</Text>
      <TextInput
        placeholder="Nombre"
        value={taskName}
        onChangeText={setTaskName}
        style={styles.input}
      />
      
      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        placeholder="Descripción"
        value={taskDescription}
        onChangeText={setTaskDescription}
        style={styles.input}
      />

      <Text style={styles.label}>Responsable:</Text>
      <TextInput
        placeholder="Responsable"
        value={taskResponsible}
        onChangeText={setTaskResponsible}
        style={styles.input}
      />

      <Text style={styles.label}>Fecha de Inicio (YYYY-MM-DD):</Text>
      <TextInput
        placeholder="Fecha de Inicio"
        value={startDate}
        onChangeText={setStartDate}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Fecha de Término (YYYY-MM-DD):</Text>
      <TextInput
        placeholder="Fecha de Término"
        value={endDate}
        onChangeText={setEndDate}
        style={styles.input}
        keyboardType="numeric"
      />

      <Button title="Crear Tarea" onPress={handleCreateTask} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#000',
  },
});

export default CreateTaskScreen;
