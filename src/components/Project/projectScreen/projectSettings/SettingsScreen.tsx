import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SettingsScreen: React.FC = () => {
  // Estado inicial para los datos del proyecto
  const [isEditing, setIsEditing] = useState(false);
  const [projectData, setProjectData] = useState({
    name: 'Proyecto Alpha',
    description: 'Este es el proyecto Alpha centrado en el desarrollo de una aplicación móvil.',
    teams: ['Equipo de Diseño', 'Equipo de Desarrollo', 'Equipo de QA'],
    creator: 'Juan Pérez',
  });

  // Manejadores para cambiar el estado de edición
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Aquí implementarías la lógica para guardar los cambios en el backend
  };

  // Funciones para actualizar los datos del proyecto
  const handleNameChange = (name: string) => {
    setProjectData(prevState => ({ ...prevState, name }));
  };

  const handleDescriptionChange = (description: string) => {
    setProjectData(prevState => ({ ...prevState, description }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Configuración del Proyecto</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Nombre del Proyecto:</Text>
        {isEditing ? (
          <TextInput
            value={projectData.name}
            onChangeText={handleNameChange}
            style={styles.input}
          />
        ) : (
          <Text style={styles.text}>{projectData.name}</Text>
        )}
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Descripción:</Text>
        {isEditing ? (
          <TextInput
            value={projectData.description}
            onChangeText={handleDescriptionChange}
            style={[styles.input, styles.description]}
            multiline
          />
        ) : (
          <Text style={styles.text}>{projectData.description}</Text>
        )}
      </View>

      {/* Renderizar los equipos y el creador similarmente, con la opción de editar si es necesario */}

      <View style={styles.buttonContainer}>
        {isEditing ? (
          <TouchableOpacity onPress={handleSave} style={styles.button}>
            <Icon name="save" size={20} color="#fff" />
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleEdit} style={styles.button}>
            <Icon name="edit" size={20} color="#fff" />
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // fondo blanco para la pantalla
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333', // texto oscuro para el encabezado
    textAlign: 'center', // centrar el encabezado
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444', // color oscuro para las etiquetas
  },
  text: {
    fontSize: 16,
    color: '#666', // color más suave para el texto
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f7f7f7', // un fondo ligeramente gris para resaltar el área de texto
    borderWidth: 1,
    borderColor: '#ddd', // borde sutil para el área de texto
    borderRadius: 5, // bordes redondeados para el área de texto
  },
  input: {
    fontSize: 16,
    color: '#333', // texto oscuro para la entrada
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff', // fondo blanco para las entradas editables
    borderWidth: 1,
    borderColor: '#ddd', // borde sutil para las entradas
    borderRadius: 5, // bordes redondeados para las entradas
  },
  description: {
    height: 100, // altura específica para la descripción
    textAlignVertical: 'top', // alinear texto en la parte superior
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#0066ff', // un azul sólido para los botones
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff', // texto blanco para los botones
    marginLeft: 5,
    fontSize: 16, // tamaño del texto para los botones
  },
  teamItem: {
    fontSize: 16,
    color: '#666',
    padding: 10,
    backgroundColor: '#eaeaea',
    borderRadius: 5,
    marginVertical: 5,
  },
  creator: {
    fontSize: 16,
    color: '#666',
    padding: 10,
    marginTop: 5,
  },
  // Añade más estilos si es necesario
});

export default SettingsScreen;
