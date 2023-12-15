import { useState, useEffect } from 'react';
import { API_URL} from '@env';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../Types/Types';

export interface Team {
    id: string;
    nombre: string;
}

interface Project {
    // Definir la estructura de un proyecto aquí
    id: string;
    name: string;
    descripcion: string;
  }

export const useCreateLogic = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectedTeams, setSelectedTeams] = useState<Array<string>>([]);
    const [descripcion, setDescripcion] = useState('');
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'projectCreation'>>();


    const [project, setProject] = useState<Project>({ id: '', name: '', descripcion: '' });
    const [nameProject, setNameProject] = useState('');


    const loadUserTeams = async () => {
        // Cargar los equipos del usuario desde el backend y actualizar el estado `teams`
        // Asegúrate de actualizar la URL y manejar la autenticación si es necesario
        console.log('Cargando equipos del usuario...');
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const response = await axios.get(`http://${API_URL}/equipos/user-equipos`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setTeams(response.data.equipos); // Suponiendo que la respuesta es un array de equipos
                console.log('Equipos cargados', response.data);
                console.log(teams)
            } else {
                throw new Error('Authentication token not found'); 
            }
        } catch (error) {
            console.error('Error al cargar los equipos', error);
        }
    };

    const handleCreateProject = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token === null) {
                throw new Error('Authentication token not found');
            }

            // En el cuerpo de la solicitud, cambia `teamName` a un campo que contenga los IDs de los equipos seleccionados.
            const createProjectResponse = await axios.post(`http://${API_URL}/proyecto/create`, {
                equipoIds: selectedTeams, // Cambiado para enviar un array de IDs de equipo
                nombre: nameProject, // Asegúrate de que `team` tenga un campo `name`
                descripcion: descripcion,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // Si la respuesta es exitosa, puedes navegar al listado de proyectos o manejar la respuesta como necesites
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error al crear el proyecto', error);
        }
    };

    useEffect(() => {
        loadUserTeams();
    }, []);

    return { teams, setTeams, selectedTeams, setSelectedTeams, descripcion, setDescripcion, handleCreateProject,project,setProject,nameProject,setNameProject };
};
