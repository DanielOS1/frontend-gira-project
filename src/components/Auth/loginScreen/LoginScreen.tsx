// LoginScreen.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useLogin } from './useLogin';
import styles from './loginStyles';
import LoadingScreen from '../../../config/LoadingScreen';

const LoginScreen: React.FC = () => {
  const { email, setEmail, password, setPassword, handleLogin, navigation, isLoading } = useLogin();
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.header}>Cold JIRA</Text>
  
      <Input
        placeholder="Correo Electrónico"
        placeholderTextColor="#A0A0A0"
        inputContainerStyle={styles.input}
        inputStyle={styles.inputText}
        value={email}
        onChangeText={setEmail}
      />
  
      <Input
        placeholder="Contraseña"
        placeholderTextColor="#A0A0A0"
        inputContainerStyle={styles.input}
        inputStyle={styles.inputText}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
  
      <Button
        title="Iniciar sesión"
        buttonStyle={styles.button}
        onPress={handleLogin}
      />
  
      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>Regístrate aquí.</Text>
        </TouchableOpacity>
  
        <TouchableOpacity>
          <Text style={styles.linkText}>Recuperar contraseña</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default LoginScreen;
