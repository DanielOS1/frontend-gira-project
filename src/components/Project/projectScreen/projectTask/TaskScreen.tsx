// TaskScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView} from 'react-native';
import styles from './TaskStyle';
import { TasksState, useTaskLogic } from './useTaskLogic';
import { useFocusEffect } from '@react-navigation/native';
import { Task } from '../../../../Types/Types';
const TaskScreen: React.FC = () => {
  const {
    tasks,
    moveTask,
    selectTask,
    navigateToCreateTask,
    updateTaskStatuses,
    fetchTasks,
  } = useTaskLogic();
  
  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );

  const renderTask = (task: Task, from: keyof TasksState) => {
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
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={navigateToCreateTask} style={styles.createTaskButton}>
        <Text style={styles.createTaskButtonText}>Crear Tarea Nueva</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={updateTaskStatuses} style={styles.saveTaskButton}>
        <Text style={styles.createTaskButtonText}>Guardar</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Tablero Sprint 4</Text>
      <View style={styles.column}>
        <Text style={styles.columnTitle}>POR HACER</Text>
        {tasks.toDo.map(task => renderTask(task, 'toDo'))}
      </View>
      <View style={styles.column}>
        <Text style={styles.columnTitle}>EN CURSO</Text>
        {tasks.inProgress.map(task => renderTask(task, 'inProgress'))}
      </View>
      <View style={styles.column}>
        <Text style={styles.columnTitle}>LISTO</Text>
        {tasks.done.map(task => renderTask(task, 'done'))}
      </View>
    </ScrollView>
  );
};

export default TaskScreen;
