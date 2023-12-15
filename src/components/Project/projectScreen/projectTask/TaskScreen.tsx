// TaskScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import styles from './TaskStyle';
import { TasksState, useTaskLogic } from './useTaskLogic';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../../../../Types/Types';
const TaskScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    tasks,
    moveTask,
    selectTask,
    navigateToCreateTask,
    updateTaskStatuses,
    fetchTasks,
    searchText,
    setSearchText
  } = useTaskLogic();
  

  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );


  const filterTasks = (tasks: Task[], searchTerm: string) => {
    if (!searchTerm) {
      return tasks; // Si no hay término de búsqueda, retorna todas las tareas
    }
    return tasks.filter(task => 
      task.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderTask = (task: Task, from: keyof TasksState) => {
    console.log('TAREAS RENDERIZANDOSE', task.nombre);
    return (
      <TouchableOpacity
        key={task.id}
        style={styles.task}
        onPress={() => selectTask(task)}
      >
        <Text style={styles.taskTitle}>{task.nombre}</Text>
        {renderMoveButtons(task, from)}
      </TouchableOpacity>
    );
  };

  const renderMoveButtons = (task: Task, from: keyof TasksState) => {
    return (
      <View style={styles.moveButtonsContainer}>
        {from !== 'toDo' && (
          <TouchableOpacity
            onPress={() => moveTask(task.id, from, 'toDo')}
            style={[styles.button, styles.toDoButton]}
          >
            <Text style={styles.buttonText}>POR HACER</Text>
          </TouchableOpacity>
        )}
        {from !== 'inProgress' && (
          <TouchableOpacity
            onPress={() => moveTask(task.id, from, 'inProgress')}
            style={[styles.button, styles.inProgressButton]}
          >
            <Text style={styles.buttonText}>EN CURSO</Text>
          </TouchableOpacity>
        )}
        {from !== 'done' && (
          <TouchableOpacity
            onPress={() => moveTask(task.id, from, 'done')}
            style={[styles.button, styles.doneButton]}
          >
            <Text style={styles.buttonText}>LISTO</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Buscar tarea..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} size={24} />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.column}>
          <Text style={styles.columnTitle}>POR HACER</Text>
          {filterTasks(tasks.toDo, searchTerm).map(task => renderTask(task, 'toDo'))}
        </View>
        <View style={styles.column}>
          <Text style={styles.columnTitle}>EN CURSO</Text>
          {filterTasks(tasks.inProgress, searchTerm).map(task => renderTask(task, 'inProgress'))}
        </View>
        <View style={styles.column}>
          <Text style={styles.columnTitle}>LISTO</Text>
          {filterTasks(tasks.done, searchTerm).map(task => renderTask(task, 'done'))}
        </View>
      </ScrollView>
    <View style={styles.floatingButtonContainer}>
        <TouchableOpacity
          style={[styles.floatingButton, styles.saveFloatingButton]}
          onPress={updateTaskStatuses}
          activeOpacity={0.7}
        >
          <Text style={styles.floatingButtonIcon}>💾</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={navigateToCreateTask}
          activeOpacity={0.7}
        >
          <Text style={styles.floatingButtonIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TaskScreen;