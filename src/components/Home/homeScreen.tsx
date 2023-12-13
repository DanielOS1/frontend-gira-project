import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons'; 
import Perfil from '../Auth/perfilScreen/PerfilScreen'; 
import TeamScreen from '../Project/teamScreen/teamScreen';
import ProjectScreen from '../Project/projectScreen/projectScreen';
const Tab = createBottomTabNavigator();
type IconName = 'user' | 'team' | 'earth'; 

const HomeScreen: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName: IconName = 'user'; // Valor por defecto

                    if (route.name === 'Perfil') {
                        iconName = 'user';
                    } else if (route.name === 'Team') {
                        iconName = 'team';
                    } else if (route.name === 'Project') {
                        iconName = 'earth';
                    }
                    return <AntDesign name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Perfil" component={Perfil} />
            <Tab.Screen name="Team" component={TeamScreen} />
            <Tab.Screen name="Project" component={ProjectScreen} />
        </Tab.Navigator>
    );
};

export default HomeScreen;
