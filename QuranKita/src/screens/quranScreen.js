// REACT-NATIVE-COMPONENT...
import Icon from "@react-native-vector-icons/feather";
import { useEffect, useState } from "react";
import { FlatList, StatusBar, StyleSheet, Text, useColorScheme, View } from "react-native";

// ARABIC-DIGITS...
import { toArabic } from "arabic-digits";

// SYSTEM-NAVIGATION-BAR...
import SystemNavigationBar from "react-native-system-navigation-bar";

// BUILD-IN-FUNCTION...
export default function QuranScreen({ navigation, route }) {
     // DATA...
     const { data, name } = route.params;

     // STATES...
     const [translate, setTranslate] = useState(false);

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

     return (
          <View style={[style.container, { backgroundColor: Scheme === "dark" ? "#666" : "#f0f0f0" }]}>
               <StatusBar backgroundColor={Scheme === "dark" ? "#333" : "#fff"} barStyle={Scheme === "dark" ? "light-content" : "dark-content"} />

               {/* HEADER... */}
               <View style={[style.header, { backgroundColor: Scheme === "dark" ? "#333" : "#fff" }]}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
                         <Text onPress={() => navigation.goBack()}>
                              <Icon name="arrow-left" color={Scheme === "dark" ? "#f0f0f0" : "#333"} size={25} />
                         </Text>
                         <Text style={{ color: Scheme === "dark" ? "#f0f0f0" : "#333", fontSize: 20, fontFamily: "Poppins-Medium" }}>{name}</Text>
                    </View>

                    <View>
                         <Text onPress={() => setTranslate(!translate)}>
                              <Icon name={translate ? "book-open" : "book"} color={Scheme === "dark" ? "#f0f0f0" : "#333"} size={25} />
                         </Text>
                    </View>
               </View>

               {/* CONTENT... */}
               <FlatList contentContainerStyle={{ padding: 10, gap: 10 }} data={data} renderItem={({ item, index }) => {
                    return (
                         <View style={[style.contentContainer, { backgroundColor: Scheme === "dark" ? "#333" : "#fff", color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>
                              <Text style={[style.textArab, { color: Scheme === "dark" ? "#f0f0f0" : "#333", fontSize: 30 }]}>{translate === false ? toArabic(item.nomorAyat) : item.nomorAyat}</Text>
                              <Text style={[style.textArab, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>{item.teksArab}</Text>
                              {translate ? <Text style={[style.textArab, { fontFamily: "Poppins-Regular", fontSize: 14, color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>{item.teksIndonesia}</Text> : null}
                         </View>
                    )
               }} />
          </View>
     )
}

const style = StyleSheet.create({
     container: {
          flex: 1,
     },
     header: {
          flexDirection: "row",
          elevation: 3,
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
          paddingHorizontal: 10,
     },
     contentContainer: {
          padding: 15,
          borderRadius: 5,
          elevation:5,
          borderWidth:0.5,
          borderColor:"#f0f0f0",
          gap: 20
     },
     textArab: {
          fontSize: 35,
          fontFamily: "Lateef-Regular"
     }
})