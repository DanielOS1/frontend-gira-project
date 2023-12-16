import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#000',
    },
    header: {
      color: '#FFF',
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 40,
      textAlign: 'center',
    },
    input: {
      borderBottomWidth: 0,
      backgroundColor: '#333',
      borderRadius: 10,
      marginBottom: 20,
      padding: 10,
    },
    inputText: {
      color: '#FFF',
      marginLeft: 10,
    },
    button: {
      backgroundColor: '#2868c7',
      borderRadius: 10,
      padding: 15,
    },
    linkText: {
      color: '#7cb9e8',
      textDecorationLine: 'underline',
      padding: 5,
      textAlign: 'center',
      marginTop: 20,
    },
  });

export default styles;
