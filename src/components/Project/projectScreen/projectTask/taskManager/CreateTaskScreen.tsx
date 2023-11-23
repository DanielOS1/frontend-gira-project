// CreateTaskScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CreateTaskScreen = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskResponsible, setTaskResponsible] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleCreateTask = () => {
    // Lógica para crear la tarea
    console.log('Crear tarea:', taskName, taskDescription, taskResponsible, startDate, endDate);
    // Aquí deberías llamar a tu API para crear la tarea
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
