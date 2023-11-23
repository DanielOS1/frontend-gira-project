import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 8,
      backgroundColor: '#1f1f1f', // Fondo oscuro para la vista general
    },
    header: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#fff',
      padding: 16,
      textAlign: 'center',
      backgroundColor: '#333', // Fondo del encabezado
    },
    createTaskButton: {
        // Estilos para tu botón, por ejemplo:
        backgroundColor: '#5CBA47', // Elige un color que combine con tu tema
        padding: 10,
        borderRadius: 5,
        margin: 10,
        alignItems: 'center', // Centra el texto en el botón
      },
      createTaskButtonText: {
        color: 'white', // Texto blanco para que resalte con el fondo verde
        fontWeight: 'bold',
        // ...otros estilos para tu texto
      },
    board: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    column: {
      width: '30%', // Asumiendo que hay tres columnas
      backgroundColor: '#252525', // Fondo de la columna
      margin: 4,
      padding: 8,
    },
    columnTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 8,
    },
    task: {
      backgroundColor: '#3a3a3a', // Fondo de la tarea
      padding: 10,
      borderRadius: 4,
      marginBottom: 8,
    },
    taskTitle: {
      fontSize: 16,
      color: '#fff',
    },
    taskId: {
      fontSize: 14,
      color: '#aaa',
      marginTop: 4,
    },
    button: {
      padding: 8,
      marginVertical: 4,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    toDoButton: {
      backgroundColor: '#FF0000', // Un color para la acción "Por Hacer"
    },
    inProgressButton: {
      backgroundColor: '#ff8000', // Un color para la acción "En Curso"
    },
    doneButton: {
      backgroundColor: '#008f39', // Un color para la acción "Listo"
    },
    buttonText: {
      color: '#fff',
    },
  
  });

  export default styles;