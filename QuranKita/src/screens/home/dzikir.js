// REACT-NATIVE...
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from "react-native";

// REACT-NATIVE-SYSTEM_NAVIGATION-BAR...
import SystemNavigationBar from 'react-native-system-navigation-bar';

// SERVICE...
import { get } from "../../service";
import Icon from "@react-native-vector-icons/feather";
import Loading from "../../components/loading";

// BUILD-IN-FUNCTION...
export default function Dzikir({ data }) {
     // NAVIGATION...
     const navigation = useNavigation();

     // STATES...
     const [loading, setLoading] = useState(false);

     // GET THEME...
     const Scheme = useColorScheme();

     // GET-DATA...
     async function getPagiPetang(waktu, name) {
          try {
               setLoading(true);
               const response = await get("https://muslim-api-three.vercel.app//v1/dzikir?type=" + waktu);
               navigation.navigate("DzikirScreen", { data: response.data, name: name, isDoa: false });
          } catch (err) {
               console.log(err);
          } finally {
               setLoading(false)
          }
     }

     async function getDoa(source, name) {
          try {
               setLoading(true);
               const response = await get("https://muslim-api-three.vercel.app//v1/doa?source=" + source);
               navigation.navigate("DzikirScreen", { data: response.data, name: name, isDoa: true });
          } catch (err) {
               console.log(err);
          } finally {
               setLoading(false)
          }
     }

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
     }, [Scheme]);

     return (
          <ScrollView>
               <View style={{ flex: 1 }}>
                    <View style={[style.container, { backgroundColor: Scheme === "dark" ? "#666" : "#f0f0f0" }]}>
                         <Pressable onPress={() => getPagiPetang("pagi", "Dzikir Pagi")} style={({ pressed }) => [style.itemContainer, { backgroundColor: Scheme === "dark" ? "#333" : "#fff" }, pressed && style.press]}>
                              <Text style={[style.title, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>1</Text>
                              <Text style={[style.title, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>Dzikir Pagi</Text>
                              <Icon name="list" size={22} color={Scheme === "dark" ? "#f0f0f0" : "#333"} />
                         </Pressable>
                         <Pressable onPress={() => getPagiPetang("sore", "Dzikir Petang (Sore)")} style={({ pressed }) => [style.itemContainer, { backgroundColor: Scheme === "dark" ? "#333" : "#fff" }, pressed && style.press]}>
                              <Text style={[style.title, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>2</Text>
                              <Text style={[style.title, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>Dzikir Petang</Text>
                              <Icon name="list" size={22} color={Scheme === "dark" ? "#f0f0f0" : "#333"} />
                         </Pressable>
                         <Pressable onPress={() => getPagiPetang("solat", "Dzikir Setelah Sholat")} style={({ pressed }) => [style.itemContainer, { backgroundColor: Scheme === "dark" ? "#333" : "#fff" }, pressed && style.press]}>
                              <Text style={[style.title, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>3</Text>
                              <Text style={[style.title, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>Dzikir Setelah Sholat</Text>
                              <Icon name="list" size={22} color={Scheme === "dark" ? "#f0f0f0" : "#333"} />
                         </Pressable>
                         <Pressable onPress={() => getDoa("harian", "Doa Harian")} style={({ pressed }) => [style.itemContainer, { backgroundColor: Scheme === "dark" ? "#333" : "#fff" }, pressed && style.press]}>
                              <Text style={[style.title, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>4</Text>
                              <Text style={[style.title, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>Doa Harian</Text>
                              <Icon name="list" size={22} color={Scheme === "dark" ? "#f0f0f0" : "#333"} />
                         </Pressable>
                         <Pressable onPress={() => getDoa("haji", "Doa Haji")} style={({ pressed }) => [style.itemContainer, { backgroundColor: Scheme === "dark" ? "#333" : "#fff" }, pressed && style.press]}>
                              <Text style={[style.title, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>5</Text>
                              <Text style={[style.title, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>Doa Haji</Text>
                              <Icon name="list" size={22} color={Scheme === "dark" ? "#f0f0f0" : "#333"} />
                         </Pressable>
                         <Pressable onPress={() => getDoa("pilihan", "Doa Pilihan")} style={({ pressed }) => [style.itemContainer, { backgroundColor: Scheme === "dark" ? "#333" : "#fff" }, pressed && style.press]}>
                              <Text style={[style.title, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>6</Text>
                              <Text style={[style.title, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>Doa Pilihan</Text>
                              <Icon name="list" size={22} color={Scheme === "dark" ? "#f0f0f0" : "#333"} />
                         </Pressable>
                         <Pressable onPress={() => getDoa("lainnya", "Doa Lainnya")} style={({ pressed }) => [style.itemContainer, { backgroundColor: Scheme === "dark" ? "#333" : "#fff" }, pressed && style.press]}>
                              <Text style={[style.title, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>7</Text>
                              <Text style={[style.title, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>Doa Lainnya</Text>
                              <Icon name="list" size={22} color={Scheme === "dark" ? "#f0f0f0" : "#333"} />
                         </Pressable>
                         <Pressable onPress={() => getDoa("quran", "Doa dari Al Quran")} style={({ pressed }) => [style.itemContainer, { backgroundColor: Scheme === "dark" ? "#333" : "#fff" }, pressed && style.press]}>
                              <Text style={[style.title, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>8</Text>
                              <Text style={[style.title, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>Doa dari Al Qur'an</Text>
                              <Icon name="list" size={22} color={Scheme === "dark" ? "#f0f0f0" : "#333"} />
                         </Pressable>
                         <Pressable onPress={() => getDoa("hadits", "Doa dari Hadits")} style={({ pressed }) => [style.itemContainer, { backgroundColor: Scheme === "dark" ? "#333" : "#fff" }, pressed && style.press]}>
                              <Text style={[style.title, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>9</Text>
                              <Text style={[style.title, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>Doa dari Hadits</Text>
                              <Icon name="list" size={22} color={Scheme === "dark" ? "#f0f0f0" : "#333"} />
                         </Pressable>
                         <Pressable onPress={() => getDoa("ibadah", "Doa untuk Ibadah")} style={({ pressed }) => [style.itemContainer, { backgroundColor: Scheme === "dark" ? "#333" : "#fff" }, pressed && style.press]}>
                              <Text style={[style.title, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>10</Text>
                              <Text style={[style.title, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>Doa untuk Ibadah</Text>
                              <Icon name="list" size={22} color={Scheme === "dark" ? "#f0f0f0" : "#333"} />
                         </Pressable>
                    </View>
                    <Loading visible={loading} textColor={Scheme === "dark" ? "#f0f0f0" : "#333"} text={" Loading..."} dark={Scheme === "dark"} bg={Scheme === "dark" ? "#666" : "#fff"} />
               </View>
          </ScrollView>
     )
}

const style = StyleSheet.create({
     container: {
          flex: 1,
          padding: 10,
          gap: 10,
     },
     itemContainer: {
          padding: 15,
          elevation: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 5,
          borderColor: "#f0f0f0",
          borderWidth: 0.5,
     },
     title: {
          fontSize: 19,
          fontFamily: "Poppins-Medium",
     },
     press: {
          transform: [{ scale: 0.98 }],
          borderColor: "#0d6efd",
          borderWidth: 1,
     }
})