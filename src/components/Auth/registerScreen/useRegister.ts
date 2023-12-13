// useRegister.ts
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../Types/Types';

export const useRegister = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Register'>>();

    const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    const validateFields = () => {
        let isValid = true;

        if (username.length < 4 || username.length > 15) {
            setUsernameError('El nombre de usuario debe tener entre 4 y 15 caracteres');
            isValid = false;
        } else {
            setUsernameError('');
        }

        if (!validateEmail(email)) {
            setEmailError('Correo electrónico no válido');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (password.length < 8) {
            setPasswordError('La contraseña debe tener al menos 8 caracteres');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    const handleRegister = async () => {
        if (!validateFields()) return;

        try {
            const response = await fetch(`http://${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            if (response.ok) {
                alert('Registro exitoso');
                navigation.navigate('Login');
            } else {
                alert('El registro falló. Verifica los datos proporcionados.');
            }
        } catch (error) {
            console.error('Error en el registro:', error);
        }
    };

    return {
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
        navigation,
    };
};
