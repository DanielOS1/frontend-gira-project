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
        await loadComments(parseInt(loadedTask.id, 10));
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
    // Envuelve el comentario en el objeto createComentarioDto
    const requestBody = {
      createComentarioDto: {
        contenido: newComment
      }
    };
  
    try {
      const response = await fetch(`http://${API_URL}/comentarios/${task?.id}/comentarios`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody) // Envía requestBody
      });
  
      if (response.ok) {
        const addedComment = await response.json();
        setComments(prevComments => [...prevComments, addedComment]);
        setNewComment('');
      } else {
        console.error('Error al agregar comentario:', await response.text());
      }
    } catch (error) {
      console.error('Error al conectar con la API:', error);
    }
  };
  

  const loadComments = async (taskId: number) => {
    if (!taskId) return;
  
    try {
      const token = await getToken();
      const response = await fetch(`http://${API_URL}/comentarios/${taskId}/comentarios`, {
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
      {/* Suponemos que aquí manejas el estado de edición */}
      <Text style={styles.text}>{task?.nombre}</Text>
      
      {/* Descripción */}
      <Text style={styles.label}>Descripción:</Text>
      <Text style={styles.text}>{task?.descripcion}</Text>

      {/* Contenedor de Entrada de Comentario */}
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Escribe un comentario..."
          placeholderTextColor="#666"
          value={newComment}
          onChangeText={setNewComment}
        />
        <TouchableOpacity onPress={handleAddComment} style={styles.addButton}>
          <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de comentarios */}
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.text}>{item.contenido}</Text>
          </View>
        )}
      />

      {/* Botón Eliminar Tarea */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteTask}>
        <Text style={styles.deleteButtonText}>Eliminar Tarea</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Fondo negro
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF', // Texto blanco
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#FFF', // Texto blanco
    marginBottom: 10,
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
    color: '#FFF', // Texto blanco
    backgroundColor: '#1a1a1a', // Fondo ligeramente gris
  },
  addButton: {
    padding: 10,
    backgroundColor: '#007bff', // Botón azul
    borderRadius: 5,
  },
  addButtonText: {
    color: '#FFF', // Texto blanco
  },
  comment: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#1a1a1a', // Fondo de comentario ligeramente gris
    borderRadius: 5,
  },
  deleteButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#dc3545', // Botón rojo para eliminar
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFF', // Texto blanco
  },
});


export default TaskDetailsScreen;
