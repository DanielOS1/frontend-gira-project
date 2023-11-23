// TaskDetailsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getData } from '../../../../../logic/storage'; // Asegúrate de que la ruta sea correcta
import { Task } from '../useTaskLogic'; // Importa la interfaz Task desde su ubicación

const TaskDetailsScreen = () => {
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const loadSelectedTask = async () => {
      try {
        const loadedTask: Task | null = await getData('selectedTask');
        if (loadedTask) {
          setTask(loadedTask);
        }
      } catch (error) {
        console.error('Error al cargar la tarea seleccionada', error);
      }
    };

    loadSelectedTask();
  }, []);

  // Manejadores para las acciones de editar y eliminar
  const handleEditTask = () => {
    console.log('Editar tarea');
    // Aquí implementarías la navegación y lógica para la edición
  };

  const handleDeleteTask = () => {
    console.log('Eliminar tarea');
    // Aquí implementarías la lógica para la eliminación
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
      <Text style={styles.text}>{task.title}</Text>

      <Text style={styles.label}>Descripción:</Text>
      <Text style={styles.text}>{task.description}</Text>

      <Text style={styles.label}>Fecha de Creación:</Text>
      <Text style={styles.text}>{task.creationDate}</Text>

      <Text style={styles.label}>Fecha de Término:</Text>
      <Text style={styles.text}>{task.endDate}</Text>

      <Text style={styles.label}>Creador:</Text>
      <Text style={styles.text}>{task.creator}</Text>

      <Text style={styles.label}>Responsable:</Text>
      <Text style={styles.text}>{task.responsible}</Text>

      <Button title="Editar Tarea" onPress={handleEditTask} />
      <Button title="Eliminar Tarea" onPress={handleDeleteTask} />
    </View>
  );
};

// Estilos para la pantalla
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
  // Añade estilos adicionales si es necesario
});

export default TaskDetailsScreen;
