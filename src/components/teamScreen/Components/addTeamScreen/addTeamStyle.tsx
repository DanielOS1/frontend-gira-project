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
    borderRadius: 120 / 2,
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
  button: {
    marginTop: 20,
    backgroundColor: "#000",
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default styles;