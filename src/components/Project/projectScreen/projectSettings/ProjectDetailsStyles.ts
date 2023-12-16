import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
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
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
  },
  detailContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    backgroundColor: '#1A1A1A',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#BBBBBB',
  },
  value: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  input: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#333333',
    backgroundColor: '#262626',
    color: '#FFFFFF',
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
    backgroundColor: '#262626',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
 
});

