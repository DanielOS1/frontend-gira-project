import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start', // Ajustar para que inicie desde arriba
    alignItems: 'center', // Centrar elementos horizontalmente
    backgroundColor: '#fff', // Color de fondo de la pantalla
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60, // Para hacerlo circular
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePlaceholderText: {
    color: '#a1a1a1',
    fontSize: 14,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
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
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,

  },
  value: {
    flex: 1,
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default styles;
