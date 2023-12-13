import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../Types/Types';

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Para controlar la pantalla de carga
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Login'>>();

  const handleLogin = async () => {
    setIsLoading(true); // Activamos la pantalla de carga
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
        // Si quieres mostrar algún mensaje de éxito, lo podrías hacer aquí
        navigation.navigate('Home'); // Suponiendo que 'Home' es la pantalla a la que quieres navegar
      } else {
        // Aquí podrías manejar la respuesta de error
        alert('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión');
    } finally {
      setIsLoading(false); // Desactivamos la pantalla de carga
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    isLoading, // Añadimos isLoading al objeto de retorno para poder usarlo en el componente
    navigation,
  };
};
