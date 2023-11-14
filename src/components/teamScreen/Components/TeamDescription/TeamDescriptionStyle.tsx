// teamDescriptionStyle.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  teamImage: {
    width: 150,
    height: 150,
    borderRadius: 75, // Esto hará que la imagen sea circular
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
  },
  teamName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  teamDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  memberItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  memberName: {
    fontSize: 16,
  },
});

export default styles;
