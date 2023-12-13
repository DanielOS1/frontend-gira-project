// RegisterScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useRegister } from './useRegister';
import styles from './registerStyles';

const RegisterScreen: React.FC = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    usernameError,
    emailError,
    passwordError,
    handleRegister,
    navigation
  } = useRegister();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.header}>Registrarse</Text>

      <Input
        placeholder="Nombre de usuario"
        placeholderTextColor="#A0A0A0"
        inputContainerStyle={styles.input}
        inputStyle={styles.inputText}
        value={username}
        onChangeText={setUsername}
        errorMessage={usernameError}
      />

      <Input
        placeholder="Correo electrónico"
        placeholderTextColor="#A0A0A0"
        inputContainerStyle={styles.input}
        inputStyle={styles.inputText}
        value={email}
        onChangeText={setEmail}
        errorMessage={emailError}
      />

      <Input
        placeholder="Contraseña"
        placeholderTextColor="#A0A0A0"
        inputContainerStyle={styles.input}
        inputStyle={styles.inputText}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        errorMessage={passwordError}
      />

      <Button
        title="Registrarse"
        buttonStyle={styles.button}
        onPress={handleRegister}
      />

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>¿Ya tienes una cuenta? Inicia Sesión aquí.</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
