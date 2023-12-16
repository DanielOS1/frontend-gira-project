// TaskStyle.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    padding: 16,
    textAlign: 'center',
    backgroundColor: '#333',
  },
 
  createTaskButton: {
   
  },
  saveTaskButton: {
   
  },
  createTaskButtonText: {
   
  },
  board: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  column: {
    flex: 1,
    backgroundColor: '#252525',
    margin: 4,
    padding: 8,
    marginVertical: 4,
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  task: {
    backgroundColor: '#3a3a3a',
    padding: 10,
    borderRadius: 4,
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 16,
    color: '#fff',
  },
  
  moveButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  
  searchIcon: {
    marginRight: 10,
  },
  
  searchInput: {
    flex: 1,
    height: 40,
  },
  toDoButton: {
    backgroundColor: '#FF0000',
  },
  inProgressButton: {
    backgroundColor: '#ff8000',
  },
  doneButton: {
    backgroundColor: '#008f39',
  },
  buttonText: {
    color: '#fff',
  },
 
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  floatingButton: {
    backgroundColor: '#1CAFDE',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    marginHorizontal: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
  },
  saveFloatingButton: {
    backgroundColor: 'green',
   
  },
  floatingButtonIcon: {
    fontSize: 24,
    color: 'white',
    lineHeight: 56,
  },
 
  scrollViewContent: {
    paddingBottom: 80,
  },
 
});

export default styles;