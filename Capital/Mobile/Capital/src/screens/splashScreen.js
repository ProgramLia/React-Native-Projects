// IMPORT...
import { Dimensions, Image, ImageBackground, StatusBar, StyleSheet, Text, View } from "react-native";
import colors from "../colors/colors";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Screen } from "react-native-screens";
const width = Dimensions.get("window").width;

// BUILD-IN-FUNCTION...
export default function SplashScreen({navigation}) {
     useEffect(()=> {
          setTimeout(async ()=> {
            if(await AsyncStorage.getItem("token") && await AsyncStorage.getItem("is_verified") == "true") {
               navigation.replace("Dashboard" , {Screen:"Home"});
          }else if(await AsyncStorage.getItem("token") && await AsyncStorage.getItem("is_verified") == "false") {
               navigation.replace("OtpScreen");
          }else {
                 navigation.replace("SplashScreen2");
            }
          }, 2000);
     },[]);
     return (
          <View style={style.container}>
               <StatusBar backgroundColor={colors.primary} />
               <View style={style.logo}>
                    <Image style={style.img} source={require("../assets/images/logo2.png")} />
               </View>
          </View>
     );
};

// STYLING...
const style = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor:colors.primary,
          justifyContent: "center",
          alignItems: "center",
     },
     logo: {
          // backgroundColor:colors.background,
          // borderRadius:width / 2,
          width: width / 1.1,
          height: width / 1.1,
     },
     img: {
          width: "100%",
          height: "100%",
     },
});