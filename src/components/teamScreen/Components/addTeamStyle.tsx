// addTeamStyle.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  circleShape: {
    width: 120,
    height: 120,
    borderRadius: 60, // La mitad del ancho y alto para hacerlo circular
    backgroundColor: "#000",
    marginVertical: 20,
  },
  input: {
    height: 40,
    width: "100%",
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: "top",
  },
  userSection: {
    alignSelf: 'stretch',
    marginVertical: 20,
  },
  userSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userButton: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  userButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: "#000",
    padding: 10,
    marginTop: 20,
    width: '100%', // Asegúrate de que el botón se extiende todo el ancho posible
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  collaboratorText: {
    fontSize: 16,
    color: 'grey',
    marginTop: 5,
  },
});

export default styles;
