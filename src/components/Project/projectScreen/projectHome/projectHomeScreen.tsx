// HomeProjectScreen.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';// Asegúrate de que la ruta de importación sea correcta
import { AntDesign } from '@expo/vector-icons'; 
import TaskScreen from '../projectTask/TaskScreen';
import DescriptionScreen from '../projectDescription/projectDescription';
import SettingsScreen from '../projectSettings/SettingsScreen';

const ProjectTabNavigator = createBottomTabNavigator();

const HomeProjectScreen: React.FC = () => {
    return (
      <ProjectTabNavigator.Navigator
        screenOptions={({ route }) => ({
            
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = 'switcher';
            if (route.name === 'Settings') {
              iconName = 'setting';
            } else if (route.name === 'Task') {
              iconName = 'book';
            } else if (route.name === 'Description') {
              iconName = 'switcher';
            }
            return <AntDesign name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <ProjectTabNavigator.Screen name="Task" component={TaskScreen} />
        <ProjectTabNavigator.Screen name="Description" component={DescriptionScreen} />
        <ProjectTabNavigator.Screen name="Settings" component={SettingsScreen} />
      </ProjectTabNavigator.Navigator>
    );
  };

export default HomeProjectScreen;