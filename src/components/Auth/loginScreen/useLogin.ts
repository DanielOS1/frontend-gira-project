import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../Types/Types';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Por favor, completa todos los campos');
      return;
    }

    if (!emailRegex.test(email)) {
      alert('Ingresa un correo electrónico válido');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        await AsyncStorage.setItem('token', data.token);
        navigation.navigate('Home');
      } else {
        alert('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    isLoading, 
    navigation,
  };
};
