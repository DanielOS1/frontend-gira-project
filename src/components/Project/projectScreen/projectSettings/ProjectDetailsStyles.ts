import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fondo oscuro para toda la pantalla
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
    backgroundColor: '#1A1A1A', // Fondo ligeramente más claro para el encabezado
    color: '#FFFFFF', // Texto blanco para el encabezado
  },
  detailContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333', // Separador oscuro
    backgroundColor: '#1A1A1A', // Fondo de cada detalle
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#BBBBBB', // Texto gris claro para las etiquetas
  },
  value: {
    fontSize: 16,
    color: '#FFFFFF', // Texto blanco para los valores
  },
  input: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#333333', // Bordes oscuros para los inputs
    backgroundColor: '#262626', // Fondo para los inputs
    color: '#FFFFFF', // Texto blanco para los inputs
    borderRadius: 5,
  },
  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-around',
    padding: 10,
  },
  teamContainer: {
    backgroundColor: '#262626', // Fondo para los equipos
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  // Añade o ajusta más estilos si es necesario
});

