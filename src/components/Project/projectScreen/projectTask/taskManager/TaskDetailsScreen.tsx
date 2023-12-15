import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { getData, getToken, storeData } from '../../../../../logic/storage';
import { RootStackParamList, Task, Comentario } from '../../../../../Types/Types';
import { Entypo } from '@expo/vector-icons';
import { API_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
type EditableFields = {
  [key in keyof Task]?: boolean;
};

const TaskDetailsScreen = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState<EditableFields>({});
  const [editableTask, setEditableTask] = useState<Task | null>(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comentario[]>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'TaskDetailsScreen'>>();

  useEffect(() => {
    const loadSelectedTask = async () => {
      const loadedTask: Task = await getData('selectedTask');
      if (loadedTask) {
        setTask(loadedTask);
        setEditableTask(loadedTask);
        loadComments();
      }
    };

    loadSelectedTask();
  }, []);

  const handleEditToggle = (field: keyof Task) => {
    setIsEditing(prevState => ({ ...prevState, [field]: !prevState[field] }));
    if (isEditing[field] && editableTask) {
      handleSaveTask();
    }
  };

  const handleSaveTask = async () => {
    if (editableTask) {
      await storeData('selectedTask', editableTask);
      setTask(editableTask);
    }
  };

  const handleInputChange = (value: string, field: keyof Task) => {
    if (editableTask) {
      setEditableTask(prevState => ({ ...prevState, [field]: value } as Task));
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
  
    const token = await getToken();
    const comentarioData = {
      contenido: newComment,
    };
  
    try {
      const response = await fetch(`http://${API_URL}/tareas/${task?.id}/comentarios`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ createComentarioDto: comentarioData }),
      });
  
      if (response.ok) {
        const addedComment: Comentario = await response.json();
        setComments(prev => [...prev, addedComment]);
        setNewComment('');
      } else {
        console.error('Error al agregar comentario:', await response.text());
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
    }
  };

  const loadComments = async () => {
    if (!task || !task.id) return;
  
    try {
      const token = await getToken();
      const response = await fetch(`http://${API_URL}/tareas/${task.id}/comentarios`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const fetchedComments: Comentario[] = await response.json();
        setComments(fetchedComments);
      } else {
        console.error('Error al cargar comentarios:', await response.text());
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
    }
  };

  const handleDeleteTask = async () => {
    if (task) {
      try {
        const token = await getToken();
        const response = await fetch(`http://${API_URL}/tareas/${task.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          console.log('Tarea eliminada correctamente');
          navigation.goBack();
        } else {
          console.error('Error al eliminar la tarea:', await response.text());
        }
      } catch (error) {
        console.error('Error al conectar con la API:', error);
      }
    } else {
      console.error('No hay una tarea seleccionada para eliminar');
    }
  };

  return (
    <View style={styles.container}>
      {/* Nombre de la Tarea */}
      <Text style={styles.label}>Nombre de la Tarea:</Text>
      {isEditing['nombre'] ? (
        <TextInput
          style={styles.input}
          value={editableTask?.nombre}
          onChangeText={(value) => handleInputChange(value, 'nombre')}
          onBlur={() => handleEditToggle('nombre')} // Save on blur
          autoFocus
        />
      ) : (
        <Text style={styles.text}>{task?.nombre}</Text>
      )}
      <TouchableOpacity onPress={() => handleEditToggle('nombre')}>
        <Entypo name="edit" size={24} color="black" />
      </TouchableOpacity>

      {/* Descripción */}
      <Text style={styles.label}>Descripción:</Text>
      {isEditing['descripcion'] ? (
        <TextInput
          style={styles.input}
          value={editableTask?.descripcion}
          onChangeText={(value) => handleInputChange(value, 'descripcion')}
          onBlur={() => handleEditToggle('descripcion')} // Save on blur
          autoFocus
        />
      ) : (
        <Text style={styles.text}>{task?.descripcion}</Text>
      )}
      <TouchableOpacity onPress={() => handleEditToggle('descripcion')}>
        <Entypo name="edit" size={24} color="black" />
      </TouchableOpacity>

      {/* Repeat similar structure for other task fields like fechaCreacion, fechaTermino, etc. */}

      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Escribe un comentario..."
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity onPress={handleAddComment} style={styles.addButton}>
          <Text>Agregar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de comentarios */}
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text>{item.contenido}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteTask}>
        <Text style={styles.deleteButtonText}>Eliminar Tarea</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  taskContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
  },
  addButton: {
    padding: 10,
    backgroundColor: '#ddd',
  },
  comment: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#eee',
  },
  deleteButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default TaskDetailsScreen;
