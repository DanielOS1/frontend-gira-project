import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { RootStackParamList } from '../../Types/Types';

export default function WelcomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Bienvenido'>>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cold JIRA</Text>
      <Image source={require('./../../assets/icon2.png')} style={styles.logo} resizeMode="contain" />
      <Button
        title="Iniciar sesión"
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Registrarse"
        type="outline"
        buttonStyle={styles.buttonOutline}
        containerStyle={styles.buttonContainer}
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Fondo negro
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Título en color blanco para contraste
    marginBottom: 20,
  },
  logo: {
    width: 650, // Ajusta el ancho como sea necesario
    height: 350, // Ajusta el alto para mantener la relación de aspecto
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff',
    width: 200,
    height: 50,
    borderRadius: 10,
  },
  buttonOutline: {
    borderColor: '#007bff',
    width: 200,
    height: 50,
    borderRadius: 10,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});