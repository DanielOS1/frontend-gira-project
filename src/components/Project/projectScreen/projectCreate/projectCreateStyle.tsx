import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
      },
      label: {
        fontSize: 16,
        marginBottom: 5,
      },
      inputField: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      createButton: {
        backgroundColor: "#4caf50",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
      },
      buttonText: {
        color: "white",
        fontSize: 16,
      },
      teamItem: {
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        color: 'black',
      },
      teamText: {
        color: 'black',
        fontSize: 16,
      },
      teamItemSelected: {
        backgroundColor: '#dddddd', // o cualquier color que indique la selección
      },
});


export default styles;

