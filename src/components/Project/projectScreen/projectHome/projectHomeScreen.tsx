// HomeProjectScreen.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons'; 
import TaskScreen from '../projectTask/TaskScreen';
import SettingsScreen from '../projectSettings/SettingsScreen';

const ProjectTabNavigator = createBottomTabNavigator();

const HomeProjectScreen: React.FC = () => {
    return (
      <ProjectTabNavigator.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerTitleAlign: 'center',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: React.ComponentProps<typeof AntDesign>['name'] = 'question';
            if (route.name === 'Settings') {
              iconName = 'setting';
            } else if (route.name === 'Task') {
              iconName = 'book';
            }
           
            return <AntDesign name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <ProjectTabNavigator.Screen name="Task" component={TaskScreen} />
        <ProjectTabNavigator.Screen name="Settings" component={SettingsScreen} />
      </ProjectTabNavigator.Navigator>
    );
};

export default HomeProjectScreen;
