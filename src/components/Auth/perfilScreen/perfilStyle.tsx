import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    //alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
    marginBottom: 20,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Fondo negro para mantener la consistencia
    padding: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#333', // Un tono de gris oscuro
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  imagePlaceholderText: {
    fontSize: 16,
    color: '#FFF',
  },
  input: {
    width: '90%',
    marginBottom: 10,
    backgroundColor: '#222', // Un tono de gris aún más oscuro
    color: '#FFF', // Texto en blanco
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  button: {
    width: '90%',
    backgroundColor: '#2868c7', // Azul que combina con el diseño general
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
  },
  label: {
    alignSelf: 'flex-start',
    color: '#7cb9e8', // Azul claro para la etiqueta
    marginBottom: 5,
    marginLeft: '5%', // Asegúrate de que esto alinea con tu input
    fontSize: 16,
  },
  value: {
    color: '#FFF', // Texto en blanco para el contenido
    fontSize: 16,
    marginBottom: 15,
  },
  registerLink: {
    color: '#7cb9e8', // Azul claro para los enlaces
    textDecorationLine: 'underline',
    padding: 10,
    fontSize: 16,
  },
});

export default styles;
