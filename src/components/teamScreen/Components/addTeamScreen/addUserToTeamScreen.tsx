// AddUserScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddUserScreen: React.FC = () => {
  const [userName, setUserName] = useState('');

  const handleAddUser = () => {
    console.log('Agregando a', userName, 'al equipo');
    // Aquí deberías agregar la lógica para realmente añadir al usuario al equipo
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Añade un Colaborador al equipo</Text>
      <TextInput
        placeholder="Ingresa el Email del colaborador"
        style={styles.input}
        onChangeText={setUserName}
        value={userName}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddUser}>
        <Text style={styles.buttonText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default AddUserScreen;