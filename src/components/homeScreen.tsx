import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons'; 
import Perfil from './perfilScreen/PerfilScreen'; 
import TeamScreen from './teamScreen/teamScreen';
import ProjectScreen from './projectScreen/projectScreen';

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName = 'user';  // Valor por defecto

                    switch(route.name) {
                        case 'Perfil':
                            iconName = 'user';
                            break;
                        case 'Team':
                            iconName = 'team';
                            break;
                        case 'Project':
                            iconName = 'earth';
                            break;
                        
                    }

                    return <AntDesign name={iconName} size={24} color="black" />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Perfil" component={Perfil} />
            <Tab.Screen name="Team" component={TeamScreen} />
            <Tab.Screen name="Project" component={ProjectScreen} />
        </Tab.Navigator>
    );
};

export default HomeScreen;
