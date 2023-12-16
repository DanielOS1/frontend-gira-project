// addTeamStyle.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  circleShape: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#000",
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "white",
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
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  collaboratorText: {
    fontSize: 16,
    color: 'grey',
    marginTop: 5,
  },
});

export default styles;
