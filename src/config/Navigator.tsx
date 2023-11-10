import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../components/loginScreen/LoginScreen';
import RegisterScreen from '../components/registerScreen/RegisterScreen';
import HomeScreen from '../components/homeScreen'; // Importa la pantalla HomeScree
import Perfil from '../components/perfilScreen/PerfilScreen';
import CreateTeamScreen from '../components/teamScreen/Components/addTeamScreen/addTeamScreen';
const Navigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Perfil" component={Perfil} />
            <Stack.Screen name="addTeam" component={CreateTeamScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;