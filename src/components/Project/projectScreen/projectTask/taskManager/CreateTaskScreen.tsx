// CreateTaskScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useTaskLogic } from '../useTaskLogic';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { getData, getToken } from '../../../../../logic/storage';

const CreateTaskScreen = () => {
  const { addNewTask } = useTaskLogic();
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskResponsible, setTaskResponsible] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigation = useNavigation();

  
  const handleCreateTask = async () => {
    try {
      const token = await getToken(); // Obtiene el token de autenticación
      const projectId = await getData('selectedProjectId');
      console.log('projectId', projectId);
      if (!projectId) {
        Alert.alert('Error', 'No se ha seleccionado un proyecto.');
        return;
      }

      const newTask = {
        nombre: taskName,
        descripcion: taskDescription,
        proyectoId: projectId, // Usamos el ID del proyecto obtenido del almacenamiento
        responsableId: taskResponsible ? 'id_del_responsable' : null, // Opcional, maneja según tu lógica
        fechaInicio: startDate,
        fechaTermino: endDate,
        estado: 'toDo', // Estado inicial de la tarea
      };

      const response = await axios.post('http://192.168.0.7:3000/tareas/create', newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.status === 200 || response.status === 201) {
        Alert.alert('Éxito', 'Tarea creada correctamente');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'No se pudo crear la tarea');
      }
    } catch (error) {
      console.error('Error al crear la tarea', error);
      Alert.alert('Error', 'No se pudo crear la tarea');
    }
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
