// useTaskLogic.ts
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeData } from '../../../../logic/storage';

export interface Task {
    id: string;
    title: string;
    description: string;
    creationDate: string;
    endDate: string;
    creator: string;
    responsible: string;
  }

export interface TasksState {
  toDo: Task[];
  inProgress: Task[];
  done: Task[];
}

const initialTasks: TasksState = {
  toDo: [{ id: 'IDS-24', title: 'Base de datos terminada',description: 'tarea 1',creationDate: "a",endDate: "a",creator: "a",responsible: "a" }, { id: 'IDS-25', title: 'Diseño de la interfaz',description: 'tarea 2',creationDate: "a",endDate: "a",creator: "a",responsible: "a" }, { id: 'IDS-26', title: 'Reunión con el cliente',description: 'tarea 3',creationDate: "a",endDate: "a",creator: "a",responsible: "a" }, { id: 'IDS-27', title: 'Reunión con el equipo',description: 'tarea 4',creationDate: "a",endDate: "a",creator: "a",responsible: "a" }],
  inProgress: [],
  done: [],
};

export const useTaskLogic = () => {
  const [tasks, setTasks] = useState<TasksState>(initialTasks);
  const navigation = useNavigation();

  const moveTask = (taskId: string, from: keyof TasksState, to: keyof TasksState) => {
    setTasks(prev => {
      const taskIndex = prev[from].findIndex(task => task.id === taskId);
      if (taskIndex === -1) return prev; // Si no se encuentra la tarea, no hacer nada
      const task = prev[from][taskIndex];
      const newFromTasks = prev[from].filter((_, index) => index !== taskIndex);
      const newToTasks = [...prev[to], task];
      return {
        ...prev,
        [from]: newFromTasks,
        [to]: newToTasks,
      };
    });
  };

  const selectTask = async (task: Task) => {
    try {
      // Usar storeData para guardar la tarea seleccionada
      await storeData('selectedTask', task);
      // Navegar a la pantalla de detalles
      navigation.navigate('TaskDetailsScreen');
    } catch (error) {
      console.error('Error al seleccionar la tarea', error);
    }
  };
  
  const navigateToTaskDetails = (task: Task) => {
    navigation.navigate('TaskDetailsScreen', { task });
  };

  const navigateToCreateTask = () => {
    navigation.navigate('CreateTaskScreen');
  };

  return {
    tasks,
    moveTask,
    navigateToTaskDetails,
    navigateToCreateTask,
    selectTask,
  };
};
