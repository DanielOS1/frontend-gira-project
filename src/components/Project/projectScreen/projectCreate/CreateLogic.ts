import { useState, useEffect } from 'react';
import { API_URL} from '@env';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { getData, storeData} from '../../../../logic/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Team {
    name: string;
}

interface Project {
    // Definir la estructura de un proyecto aquí
    id: string;
    name: string;
    descripcion: string;
  }

export const useCreateLogic = () => {
    const [team, setTeam] = useState<Team>({ name: '' });
    const [selectedTeam, setSelectedTeam] = useState<string | undefined>(undefined);
    const [descripcion, setDescripcion] = useState('');
    const navigation = useNavigation();
    const [projects, setProjects] = useState<Project[]>([]);
    const loadUserTeams = async () => {
        // Lógica para cargar los equipos desde el backend
    };

    const handleCreateProject = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token === null) {
                throw new Error('Authentication token not found');
            }
            const createProjectResponse = await axios.post(`http://${API_URL}/project`, {
                teamName: selectedTeam,
                description: descripcion,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProjects(prevProjects => [...prevProjects, createProjectResponse.data]);
            navigation.navigate('ProjectList');
        } catch (error) { 
            console.error('Error al crear el proyecto', error);
        }
    };

    useEffect(() => {
        loadUserTeams();
    }, []);

    return { team, setTeam, selectedTeam, setSelectedTeam, descripcion, setDescripcion, handleCreateProject };
};
