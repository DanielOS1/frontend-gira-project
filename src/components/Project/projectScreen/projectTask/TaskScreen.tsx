// TaskScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './TaskStyle';
import { useTaskLogic, Task, TasksState} from './useTaskLogic';

const TaskScreen: React.FC = () => {
  const {
    tasks,
    moveTask,
    selectTask, // Asegúrate de desestructurar selectTask aquí
    navigateToCreateTask,
  } = useTaskLogic();

  const renderTask = (task: Task, from: keyof TasksState) => {
    return (
      <TouchableOpacity
        key={task.id}
        style={styles.task}
        onPress={() => selectTask(task)} // Utiliza selectTask aquí
      >
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskId}>{task.id}</Text>
        {renderMoveButtons(task, from)}
      </TouchableOpacity>
    );
  };

  const renderMoveButtons = (task: Task, from: keyof TasksState) => {
    return (
      <View>
        {from !== 'toDo' && (
          <TouchableOpacity
            onPress={() => moveTask(task.id, from, 'toDo')}
            style={[styles.button, styles.toDoButton]}
          >
            <Text style={styles.buttonText}>Mover a POR HACER</Text>
          </TouchableOpacity>
        )}
        {from !== 'inProgress' && (
          <TouchableOpacity
            onPress={() => moveTask(task.id, from, 'inProgress')}
            style={[styles.button, styles.inProgressButton]}
          >
            <Text style={styles.buttonText}>Mover a EN CURSO</Text>
          </TouchableOpacity>
        )}
        {from !== 'done' && (
          <TouchableOpacity
            onPress={() => moveTask(task.id, from, 'done')}
            style={[styles.button, styles.doneButton]}
          >
            <Text style={styles.buttonText}>Mover a LISTO</Text>
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
      <View style={styles.container}>
        <Text style={styles.header}>Tablero Sprint 4</Text>
        <View style={styles.board}>
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
        </View>
      </View>
    </ScrollView>
  );
};

export default TaskScreen;
