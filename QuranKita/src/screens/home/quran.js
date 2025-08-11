// REACT-NATIVE...
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StatusBar, StyleSheet, Text, useColorScheme, View } from "react-native";

// REACT-NATIVE-SYSTEM_NAVIGATION-BAR...
import SystemNavigationBar from 'react-native-system-navigation-bar';

// SERVICE...
import { get } from "../../service";
import Loading from "../../components/loading";

// BUILD-IN-FUNCTION...
export default function Quran({data}) {
     const navigation = useNavigation();
     // STATES...
     const [loading , setLoading] = useState(false);

     // GET THEME...
     const Scheme = useColorScheme();

     // CHANGE BAR-COLOR...
     useEffect(() => {
          // BUAT-ATUR-WARNA-NAVIGATION-BAR
          SystemNavigationBar.setNavigationColor(Scheme === "dark" ? "#333" : "#fff")

          // BUAT-ATUR-WARNA-GARISNYA
          SystemNavigationBar.setNavigationBarDividerColor(Scheme === 'dark' ? "#333" : "#fff");

          // BUAT-ATUR-WARNA-BARNYA
          SystemNavigationBar.setBarMode(Scheme === "dark" ? "light" : "dark")

          // BUAT-HILANGIN-NAVIGATION-BAR
          // SystemNavigationBar.navigationHide()
     }, [Scheme])

     // GET DETAIL-SURAH...
     async function getDetailSurah(idSurah , nameSurah) {
          try {
               setLoading(true)
               const response = await get("https://equran.id/api/v2/surat/" , idSurah);
               navigation.navigate("QuranScreen" , {data:response.data.ayat , name:nameSurah});
          }catch(err) {
               console.log(err);
          }finally{
               setLoading(false)
          }
     }

     return (
        <View style={{flex:1}}>
            <FlatList contentContainerStyle={[style.container, { backgroundColor: Scheme === "dark" ? "#666" : "#f0f0f0" }]} data={data} renderItem={({ item,_}) => {
               return (
                    <Pressable onPress={()=> getDetailSurah(item.nomor , item.namaLatin)} style={({pressed})=> [Scheme === "light" ? style.itemContainer : style.darkItemContainer , pressed && style.press]}>
                         <StatusBar backgroundColor={Scheme === "dark" ? "#333" : "#fff"} barStyle={Scheme === "dark" ? "light-content" : "dark-content"} />
                         <Text style={[style.title, { color: Scheme === "dark" ? "#f0f0f0" : "#333"}]}>{item.nomor}.</Text>
                         <Text style={[style.title, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>{item.namaLatin}</Text>
                         <Text style={{ fontSize: 25, fontFamily: "Lateef-Medium", color: Scheme === "dark" ? "#f0f0f0" : "#333" }}>( {item.nama} )</Text>
                    </Pressable>
               )
          }} />
          <Loading visible={loading} textColor={Scheme === "dark" ? "#f0f0f0" : "#333"} text={" Loading..."} dark={Scheme === "dark"} bg={Scheme === "dark" ?  "#666" : "#fff"} />
        </View>
     )
}

const style = StyleSheet.create({
     container: {
          padding: 10,
          gap: 10,
     },
     itemContainer: {
          padding: 13,
          paddingHorizontal: 20, borderRadius: 5,
          elevation: 3,
          borderRadius: 8,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#fff",
     },
     darkItemContainer: {
          padding: 13,
          paddingHorizontal: 20,
          borderRadius: 8,
          alignItems: "center",
          elevation: 3,
          borderColor:"#f0f0f0",
          borderWidth:0.5,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#333",
     },
     title: {
          color: "#333",
          fontFamily: "Poppins-Medium",
          fontSize: 17,
     },
     press: {
          transform:[{scale:0.98}],
          borderColor:"#0d6efd",
          borderWidth:1,
     }
})