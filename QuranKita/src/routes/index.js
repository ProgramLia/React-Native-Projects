// REACT-NAVIGATION...
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// SCREENS...
import SplashScreen from '../screens/splashScreen';
import MyTabs from '../screens/homeScreen';
import { useColorScheme } from 'react-native';
import QuranScreen from '../screens/quranScreen';
import DzikirScreen from '../screens/dzikirScreen';

// STACK VARIABLE...
const Stack = createNativeStackNavigator();

// BUILD-IN-COMPONENT...
export default function RootStack() {
     // GET THEME...
     const Scheme = useColorScheme();

     return (
          <NavigationContainer>
               <Stack.Navigator initialRouteName='SplashScreen'>
                    <Stack.Screen options={{headerShown:false}} name='SplashScreen' component={SplashScreen} />
                    <Stack.Screen options={{headerShown:false}} name='Home' component={MyTabs} />
                    <Stack.Screen options={{headerShown:false}} name='QuranScreen' component={QuranScreen} />
                    <Stack.Screen options={{headerShown:false}} name='DzikirScreen' component={DzikirScreen} />
               </Stack.Navigator>
          </NavigationContainer>
     )
}