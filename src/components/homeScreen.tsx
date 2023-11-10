import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons'; 
import Perfil from './perfilScreen/PerfilScreen'; 
import TeamScreen from './teamScreen/teamScreen';

    const Home = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Inicio</Text>
        </View>
    );
    };

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName = 'home';  // Valor por defecto

                    switch(route.name) {
                        case 'Home':
                            iconName = 'home';
                            break;
                        case 'Perfil':
                            iconName = 'user';
                            break;
                        case 'Team':
                            iconName = 'team';
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
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Team" component={TeamScreen} />
        </Tab.Navigator>
    );
};

export default HomeScreen;
