// REACT-NAVIGATION-BOTTOM-TABS...
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// TAB VARIABLE...
const Tab = createBottomTabNavigator();

// SCREENS...
import Quran from './home/quran';
import Dzikir from './home/dzikir';
import { useColorScheme } from 'react-native';
import Icon from '@react-native-vector-icons/feather';
import Waktu from './home/waktu';

// BUILD-IN-COMPONENT...
export default function MyTabs({ route }) {
  // GET DATA FROM SPLASH SCREEN...
  const { dataQuran , dataDzikirPagi } = route.params;

  // GET THEME...
  const Scheme = useColorScheme();

  return (
    <Tab.Navigator initialRouteName='Al Quran' screenOptions={{}}>
      <Tab.Screen options={{
        tabBarActiveTintColor:"#0d6efd",
        headerTitleStyle: {
          color:Scheme === "dark" ? "#f0f0f0" : "#333"
        },
        tabBarStyle: {
          backgroundColor: Scheme === "dark" ? "#333" : "#fff",
        },
        headerStyle: {
          backgroundColor: Scheme === "dark" ? "#333" : "#fff",
        },
        tabBarIcon: ({color})=> (
          <Icon name='globe' size={22} color={color} />
        ),
        tabBarLabelStyle: {
        }
      }}
        children={() => <Quran data={dataQuran} />} name="Al Quran" />
      <Tab.Screen options={{
        tabBarActiveTintColor:"#0d6efd",
        headerTitleStyle: {
          color:Scheme === "dark" ? "#f0f0f0" : "#333"
        },
        tabBarStyle: {
          backgroundColor: Scheme === "dark" ? "#333" : "#fff",
        },
        headerStyle: {
          backgroundColor: Scheme === "dark" ? "#333" : "#fff",
        },
        tabBarIcon: ({color}) => (
          <Icon name='book-open' size={22} color={color}/>
        )
      }} name="Dzikir & Doa" component={Dzikir} />
      <Tab.Screen options={{
        tabBarActiveTintColor:"#0d6efd",
        headerTitleStyle: {
          color:Scheme === "dark" ? "#f0f0f0" : "#333"
        },
        tabBarStyle: {
          backgroundColor: Scheme === "dark" ? "#333" : "#fff",
        },
        headerStyle: {
          backgroundColor: Scheme === "dark" ? "#333" : "#fff",
        },
        tabBarIcon: ({color}) => (
          <Icon name='clock' size={22} color={color}/>
        )
      }} name="Waktu Sholat" component={Waktu} />
    </Tab.Navigator>
  );
}