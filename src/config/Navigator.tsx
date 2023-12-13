import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../components/Auth/loginScreen/LoginScreen';
import RegisterScreen from '../components/Auth/registerScreen/RegisterScreen';
import HomeScreen from '../components/Home/homeScreen'; // Importa la pantalla HomeScree
import Perfil from '../components/Auth/perfilScreen/PerfilScreen';
import CreateTeamScreen from '../components/Project/teamScreen/Components/addTeamScreen/addTeamScreen';
import AddUserScreen from '../components/Project/teamScreen/Components/addUserToTeam/addUserToTeamScreen';
import TeamDescription from '../components/Project/teamScreen/Components/TeamDescription/TeamDescriptionScreen';
import ProjectCreationScreen from '../components/Project/projectScreen/projectCreate/projectCreateScreen';
import HomeProjectScreen from '../components/Project/projectScreen/projectHome/projectHomeScreen';
import TeamScreen from '../components/Project/teamScreen/teamScreen';
import CreateTaskScreen from '../components/Project/projectScreen/projectTask/taskManager/CreateTaskScreen';
import TaskDetailsScreen from '../components/Project/projectScreen/projectTask/taskManager/TaskDetailsScreen';
import ProjectScreen from '../components/Project/projectScreen/projectScreen';
import WelcomeScreen from '../components/Home/welcomeScreen';
import { RootStackParamList } from '../Types/Types';
const Navigator = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Bienvenido">
            <Stack.Screen name="Bienvenido" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Perfil" component={Perfil} />
            <Stack.Screen name="addTeam" component={CreateTeamScreen} />
            <Stack.Screen name="AddUserScreen" component={AddUserScreen} />
            <Stack.Screen name="projectCreation" component={ProjectCreationScreen} />
            <Stack.Screen name="TeamDescription" component={TeamDescription} />
            <Stack.Screen name="ProjectHome" component={HomeProjectScreen} />
            <Stack.Screen name="CreateTaskScreen" component={CreateTaskScreen} />
            <Stack.Screen name="TaskDetailsScreen" component={TaskDetailsScreen} />
            <Stack.Screen name="TeamScreen" component={TeamScreen} />
            <Stack.Screen name="ProjectScreen" component={ProjectScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;