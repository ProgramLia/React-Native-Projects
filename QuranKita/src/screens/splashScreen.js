// LIBRARY...
import LinearGradient from 'react-native-linear-gradient';
import { useEffect, useState } from 'react';

// REACT-NATIVE-COMPONENT...
import { Image, StatusBar, StyleSheet, Text, useColorScheme } from "react-native";

// SERVICE...
import { get } from '../service';

// BUILD-IN-COMPONENT...
export default function SplashScreen({ navigation }) {
     // GET DARK OR LIGHT THEME...
     const Scheme = useColorScheme();

     // GET DATA SURAH...
     async function getSurah() {
          try {
               const response = await get("https://equran.id/api/v2/surat");
               const response2 = await get("https://muslim-api-three.vercel.app//v1/dzikir?type=pagi");
               setTimeout(() => {navigation.replace("Home", { dataQuran:response.data })}, 2000)
          } catch (err) {
               console.log(err);
          }
     }

     // SWITCH TO HOME SCREEN...
     useEffect(() => {
          getSurah();
     }, [])

     // 
     return (
          <LinearGradient style={[style.container , {backgroundColor:Scheme === "dark" ? "#333" : "#f0f0f0"}]} colors={Scheme === "dark" ? ["#203a43", "#0f2027", "#000"] : ["#203a43", "#fbb13c", "#fff"]}>
               <StatusBar backgroundColor={"#203a43"} />
               <Image style={style.logo} source={require("../assets/images/QuranKita_Logo.png")} />
               <Text style={[style.copyright, { color: Scheme === "dark" ? "#f0f0f0" : "#fbb13c" }]}>©Copyright.2025 | Mazumala_ QuranKita</Text>
          </LinearGradient>
     )
}

// STYLING...
const style = StyleSheet.create({
     container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
     },
     logo: {
          width: 330,
          height: 330
     },
     copyright: {
          position: "absolute",
          bottom: 10,
          fontFamily: "Poppins-Regular",
          color: "#f0f0f0",
          fontSize: 12
     }
})