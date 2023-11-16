import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4', // Un fondo claro
  },
  teamName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Texto oscuro para el nombre del equipo
    marginBottom: 10,
  },
  teamDescription: {
    fontSize: 16,
    color: '#666', // Texto más suave para la descripción
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#007bff', // Un color azul estándar para el botón
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: '#dc3545', // Rojo para el botón de eliminar
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  memberItem: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  memberName: {
    fontSize: 18,
    color: '#333',
  },
});