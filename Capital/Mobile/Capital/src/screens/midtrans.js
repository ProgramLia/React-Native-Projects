// IMPORTS...
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar, View } from "react-native";
import WebView from "react-native-webview";

// BUILD-IN-FUNCTIONS...
export default function Midtrans({ navigation, route }) {
     const { snapURL } = route.params;
     const handleChange = async (link) => {
          const { url } = link;
          if (url.includes("transaction_status=settlement") || url.includes("status=success")|| url.includes("transaction_status=cancel")) {
               navigation.replace("Dashboard" , {screen:"Home"});
               await AsyncStorage.removeItem('url');
               await AsyncStorage.setItem("payment" , "false");
               return false;
          }

          if (url.includes("action=back")) {
                await AsyncStorage.setItem('url' , `${snapURL}`)
                navigation.replace("Dashboard", {screen:"Home"});
                return false;
          }
     }
     return (
          <View style={{ flex: 1 }}>
               <StatusBar backgroundColor={'#092148'} barStyle={"light-content"} />
               <WebView source={{ uri: snapURL }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    onNavigationStateChange={handleChange}
                    injectedJavaScriptBeforeContentLoaded={`
                    window.onbeforeunload = null;
                    `}
               />
          </View>
     )
}

