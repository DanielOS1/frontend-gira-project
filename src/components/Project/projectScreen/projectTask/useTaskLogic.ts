import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, getToken, storeData } from '../../../../logic/storage';
import axios from 'axios';
import { RootStackParamList, Task } from '../../../../Types/Types';
import { Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { API_URL } from '@env';

export interface TasksState {
  toDo: Task[];
  inProgress: Task[];
  done: Task[];
}
export const useTaskLogic = () => {
  const [tasks, setTasks] = useState<TasksState>({
    toDo: [],
    inProgress: [],
    done: [],
  });
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'TaskScreen'>>();


  const fetchTasks = async () => {
    try {
        const storedTeam = await getData('selectedProjectId');
        const projectId = storedTeam;
        const response = await axios.get(`http://${API_URL}/proyecto/${projectId}/tareas`);
        const fetchedTasks: Task[] = response.data;
       
        const toDoTasks = fetchedTasks.filter(task => task.estado === 'toDo');
        const inProgressTasks = fetchedTasks.filter(task => task.estado === 'inProgress');
        const doneTasks = fetchedTasks.filter(task => task.estado === 'done');
        setTasks({
            toDo: toDoTasks,
            inProgress: inProgressTasks,
            done: doneTasks,
        });
        console.log('Nombres de tareas:', fetchedTasks.map(task => task.nombre));
    } catch (error) {
        console.error('Error al obtener las tareas', error);
    }
};

  useEffect(() => {
    fetchTasks();
  }, []);

  const updateTaskStatuses = async () => {
    const token = await getToken();
    const updatedTasksStatuses = [
      ...tasks.toDo.map(task => ({ id: task.id, estado: 'toDo' })),
      ...tasks.inProgress.map(task => ({ id: task.id, estado: 'inProgress' })),
      ...tasks.done.map(task => ({ id: task.id, estado: 'done' })),
    ];
    console.log('updatedTasksStatuses', updatedTasksStatuses);
    try {
      const response = await axios.put(
        `http://${API_URL}/tareas/updateStatuses`,
        { updatedTasks: updatedTasksStatuses },
        { headers: { Authorization: `Bearer ${token}` } }
      );

     
      if (response.status === 200) {
        Alert.alert('Éxito', 'Los estados de las tareas se han actualizado.');
        fetchTasks();
      } else {
        Alert.alert('Error', 'No se pudieron actualizar los estados de las tareas.');
      }
    } catch (error) {
      console.error('Error al actualizar los estados de las tareas', error);
      Alert.alert('Error', 'Ha ocurrido un error al actualizar los estados de las tareas.');
    }
  };

  const moveTask = (taskId: string, from: keyof TasksState, to: keyof TasksState) => {
    setTasks(prev => {
      const taskIndex = prev[from].findIndex(task => task.id === taskId);
      if (taskIndex === -1) return prev;
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

  const addNewTask = (newTaskData : Task) => {
    setTasks(prev => ({
      ...prev,
      toDo: [...prev.toDo, newTaskData],
    }));
  };

  const selectTask = async (task: Task) => {
    try {
      console.log('task', task);
      await storeData('selectedTask', task);
     
      navigation.navigate('TaskDetailsScreen');
    } catch (error) {
      console.error('Error al seleccionar la tarea', error);
    }
  };
  
  const navigateToTaskDetails = (task: Task) => {
    navigation.navigate('TaskDetailsScreen');
  };

  const navigateToCreateTask = () => {
    navigation.navigate('CreateTaskScreen');
  };
  const [searchText, setSearchText] = useState('');
  return {
    tasks,
    moveTask,
    navigateToTaskDetails,
    navigateToCreateTask,
    selectTask,
    addNewTask,
    updateTaskStatuses,
    fetchTasks,
    searchText, 
    setSearchText,
  };
};