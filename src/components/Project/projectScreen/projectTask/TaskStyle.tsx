// TaskStyle.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    padding: 16,
    textAlign: 'center',
    backgroundColor: '#333',
  },
  createTaskButton: {
    backgroundColor: '#1CAFDE',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  saveTaskButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  createTaskButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  board: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  column: {
    flex: 1, // Cada columna debería ocupar todo el espacio disponible
    backgroundColor: '#252525', // Fondo de la columna
    margin: 4,
    padding: 8,
    width: '100%', // Asegúrate de que la columna ocupe todo el ancho
    marginVertical: 4,
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  task: {
    backgroundColor: '#3a3a3a',
    padding: 10,
    borderRadius: 4,
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 16,
    color: '#fff',
  },
  moveButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toDoButton: {
    backgroundColor: '#FF0000',
  },
  inProgressButton: {
    backgroundColor: '#ff8000',
  },
  doneButton: {
    backgroundColor: '#008f39',
  },
  buttonText: {
    color: '#fff',
  },
});

export default styles;
