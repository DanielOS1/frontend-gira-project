import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../components/Auth/loginScreen/LoginScreen';
import RegisterScreen from '../components/Auth/registerScreen/RegisterScreen';
import HomeScreen from '../components/Home/homeScreen';
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
import ProjectDetailsScreen from '../components/Project/projectScreen/projectSettings/SettingsScreen';
import { RootStackParamList } from '../Types/Types';
import TaskScreen from '../components/Project/projectScreen/projectTask/TaskScreen';
const Navigator = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Bienvenido">
            <Stack.Screen name="Bienvenido" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen}  options={{ headerShown: false }}/>
            <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }}/>
            <Stack.Screen name="addTeam" component={CreateTeamScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="AddUserScreen" component={AddUserScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="projectCreation" component={ProjectCreationScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="TeamDescription" component={TeamDescription} options={{ headerShown: false }}/>
            <Stack.Screen name="ProjectHome" component={HomeProjectScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="CreateTaskScreen" component={CreateTaskScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="TaskDetailsScreen" component={TaskDetailsScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="TeamScreen" component={TeamScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="ProjectScreen" component={ProjectScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="DetailsProjectScreen" component={ProjectDetailsScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="TaskScreen" component={TaskScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer> 
    );
}

export default Navigator;