import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#000', // Fondo negro
    },
    header: {
      color: '#FFF', // Texto blanco
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 40,
      textAlign: 'center',
    },
    input: {
      borderBottomWidth: 0, // Elimina la línea inferior por defecto
      backgroundColor: '#333', // Fondo de los inputs
      borderRadius: 10, // Bordes redondeados
      marginBottom: 20,
      padding: 10,
    },
    inputText: {
      color: '#FFF', // Texto de los inputs
      marginLeft: 10, // Espaciado para el texto dentro del input
    },
    button: {
      backgroundColor: '#2868c7', // Botón azul
      borderRadius: 10, // Bordes redondeados para el botón
      padding: 15,
    },
    linkText: {
      color: '#7cb9e8', // Enlace en azul claro
      textDecorationLine: 'underline',
      padding: 5,
      textAlign: 'center',
      marginTop: 20,
    },
  });

export default styles;
