import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
    marginBottom: 20,
    width: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#000',
    padding: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  imagePlaceholderText: {
    fontSize: 16,
    color: '#FFF',
  },
  input: {
    flexGrow: 1,
    backgroundColor: '#000',
    color: '#FFF',
    padding: 10,
    fontSize: 16,
   
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
  },
  button: {
    width: '90%',
    backgroundColor: '#2868c7',
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
    color: '#7cb9e8',
    fontSize: 16,
  },
  value: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
  },

  registerLink: {
    color: '#7cb9e8',
    textDecorationLine: 'underline',
    padding: 10,
    fontSize: 16,
  },
  editButton: {
    padding: 10,
    marginRight: '5%',
  },
});

export default styles;
