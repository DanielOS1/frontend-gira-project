// TaskDetailsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getData } from '../../../../../logic/storage';
import { Task } from '../../../../../Types/Types';

const TaskDetailsScreen = () => {
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const loadSelectedTask = async () => {
      try {
        const loadedTask: Task  = await getData('selectedTask');
        if (loadedTask) {
          setTask(loadedTask);
        }
      } catch (error) {
        console.error('Error al cargar la tarea seleccionada', error);
      }
    };

    loadSelectedTask();
  }, []);

  const handleEditTask = () => {
    console.log('Editar tarea');
  };

  const handleDeleteTask = () => {
    console.log('Eliminar tarea');
  };

  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre de la Tarea:</Text>
      <Text style={styles.text}>{task.nombre}</Text>

      <Text style={styles.label}>Descripción:</Text>
      <Text style={styles.text}>{task.descripcion}</Text>

      <Text style={styles.label}>Fecha de Creación:</Text>
      <Text style={styles.text}>{task.fechaCreacion}</Text>

      <Text style={styles.label}>Fecha de Término:</Text>
      <Text style={styles.text}>{task.fechaTermino}</Text>

      <Text style={styles.label}>Creador:</Text>
      <Text style={styles.text}>{task.creador?.username}</Text>

      <Text style={styles.label}>Responsable:</Text>
      <Text style={styles.text}>{task.responsable?.username}</Text>

      <Button title="Editar Tarea" onPress={handleEditTask} />
      <Button title="Eliminar Tarea" onPress={handleDeleteTask} />
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
});

export default TaskDetailsScreen;
