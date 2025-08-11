// REACT-NAVIGATION...
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, useColorScheme, View } from "react-native";

// REACT-NATIVE-DROPDOWN-PICKER...
import DropDownPicker from 'react-native-dropdown-picker';

// REACT-NATIVE-DATE-PICKER...
import DatePicker from "react-native-date-picker";

// SERVICE...
import { get } from "../../service";

// BUILD-IN-COMPONENT
import Loading from "../../components/loading";
import Icon from "@react-native-vector-icons/feather";

// BUILD-IN-FUNCTION...
export default function Waktu() {
     // OPEN...
     const [open, setOpen] = useState({
          open1: false,
          open2: false,
     })
     const [loading, setLoading] = useState(false);
     const [value, setValue] = useState(null)
     const [date, setDate] = useState(new Date())
     // DATA...
     const [data, setData] = useState([]);
     const [data2, setData2] = useState([])

     // GET THEME...
     const Scheme = useColorScheme();

     // GET-KOTA...
     async function getKota() {
          try {
               setLoading(true);
               const response = await get("https://api.myquran.com/v2/sholat/kota/semua")
               const newData = response.data.map(item => ({
                    label: item.lokasi,
                    value: item.id
               }))
               setData(newData)
          } catch (err) {
               console.log(err);
          }
          finally {
               setLoading(false)
          }
     }

     async function getWaktuSolat() {
          try {
               setLoading(true)
               const year = String(date.getFullYear());
               const month = String(date.getMonth() + 1).padStart(2, "0");
               const day = String(date.getDate()).padStart(2, "0");
               const response = await get(`https://api.myquran.com/v2/sholat/jadwal/${value}/${year}/${month}/${day}`);
               setData2(response.data)
               console.log(response.data)
          } catch (err) {
               console.log(err);
          } finally {
               setLoading(false)
          }
     }

     useEffect(() => {
          getKota();
     }, [])
     return (
          <Pressable style={[style.container, { backgroundColor: Scheme === "dark" ? "#666" : "#f0f0f0" }]}>
               <Text style={{ color: Scheme === "dark" ? "#f0f0f0" : "#333", fontFamily: "Poppins-Medium", fontSize: 16 }}>Atur Daerah</Text>
               <DropDownPicker
                    placeholder="Pilih daerah anda..."
                    style={{ backgroundColor: Scheme === "dark" ? "#333" : "#fff", borderColor: "#f0f0f0", elevation: 3 }}
                    textStyle={{ color: Scheme === "dark" ? "#f0f0f0" : "#333" }}
                    dropDownContainerStyle={{ backgroundColor: Scheme === "dark" ? "#333" : "#fff", borderColor: "#f0f0f0", elevation: 3 }}
                    searchPlaceholder="Cari daerah anda..."
                    searchTextInputStyle={{ color: Scheme === "dark" ? "#f0f0f0" : "#333", borderColor: "#f0f0f0" }}
                    loading={loading}
                    ArrowDownIconComponent={() => <Icon name="chevron-down" size={20} color={Scheme === "dark" ? "#fff" : "#333"} />}
                    ArrowUpIconComponent={() => <Icon name="chevron-up" size={20} color={Scheme === "dark" ? "#fff" : "#333"} />}
                    showArrowIcon={true}
                    searchable={true}
                    open={open.open1}
                    value={value}
                    setValue={setValue}
                    setOpen={() => setOpen({ ...open, open1: !open.open1 })}
                    items={data}
               />

               <Text style={{ color: Scheme === "dark" ? "#f0f0f0" : "#333", fontFamily: "Poppins-Medium", fontSize: 16, marginTop: 10 }}>Atur Waktu</Text>
               <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Pressable onPress={() => setOpen({ ...open, open2: !open.open2 })} style={({ pressed }) => [style.button, { backgroundColor: Scheme === "dark" ? "#333" : "#fff" }, pressed && style.press]}>
                         <Text style={{ color: Scheme === "dark" ? "#f0f0f0" : "#333", fontFamily: "Poppins-Regular" }}>{date.toLocaleDateString()}</Text>
                         <Icon name="clock" size={20} color={Scheme === "dark" ? "#f0f0f0" : "#333"} />
                    </Pressable>
                    <Pressable onPress={() => getWaktuSolat()} style={({ pressed }) => [style.button, { backgroundColor: Scheme === "dark" ? "#333" : "#fff", paddingHorizontal: 10 }, pressed && style.press]}>
                         <Text style={{ color: Scheme === "dark" ? "#f0f0f0" : "#333", fontFamily: "Poppins-Regular" }}>Cari waktu</Text>
                         <Icon name="search" size={20} color={Scheme === "dark" ? "#f0f0f0" : "#333"} />
                    </Pressable>
               </View>
               <DatePicker modal open={open.open2} date={date} mode="date" onConfirm={(date) => {
                    setDate(date)
               }} />

               <Text style={{ color: Scheme === "dark" ? "#f0f0f0" : "#333", fontFamily: "Poppins-Medium", fontSize: 16, marginTop: 10 }}>Hasil Pencarian</Text>

               {
                    data2 && data2?.jadwal ? <View style={[style.containerCity, { backgroundColor: Scheme === "dark" ? "#333" : "#fff" }]}>
                         <Text style={[style.city, { color: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>JADWAL SHOLAT DAERAH : {data2?.lokasi}</Text>

                         <Text style={[style.datas, { color: Scheme === "dark" ? "#f0f0f0" : "#333", borderColor: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>Imsak : {data2?.jadwal?.imsak}</Text>
                         <Text style={[style.datas, { color: Scheme === "dark" ? "#f0f0f0" : "#333", borderColor: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>Subuh : {data2?.jadwal?.subuh}</Text>
                         <Text style={[style.datas, { color: Scheme === "dark" ? "#f0f0f0" : "#333", borderColor: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>Terbit : {data2?.jadwal?.terbit}</Text>
                         <Text style={[style.datas, { color: Scheme === "dark" ? "#f0f0f0" : "#333", borderColor: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>Dhuha : {data2?.jadwal?.dhuha}</Text>
                         <Text style={[style.datas, { color: Scheme === "dark" ? "#f0f0f0" : "#333", borderColor: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>Dzuhur : {data2?.jadwal?.dzuhur}</Text>
                         <Text style={[style.datas, { color: Scheme === "dark" ? "#f0f0f0" : "#333", borderColor: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>Ashar : {data2?.jadwal?.ashar}</Text>
                         <Text style={[style.datas, { color: Scheme === "dark" ? "#f0f0f0" : "#333", borderColor: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>Maghrib : {data2?.jadwal?.maghrib}</Text>
                         <Text style={[style.datas, { color: Scheme === "dark" ? "#f0f0f0" : "#333", borderColor: Scheme === "dark" ? "#f0f0f0" : "#333" }]}>Isya : {data2?.jadwal?.isya}</Text>
                    </View> : <Text style={{ fontSize: 16, color: Scheme === "dark" ? "#f0f0f0" : "#333", fontFamily: "Poppins-Regular", marginTop: 10, borderColor: Scheme === "dark" ? "#f0f0f0" : "#333", borderWidth: 1, padding: 7, borderRadius: 3, borderStyle: "dashed" }}>{value ? "Data tidak ditemukan" : "Tolong Masukkan Lokasi Anda"}</Text>
               }

               <Loading visible={loading} textColor={Scheme === "dark" ? "#f0f0f0" : "#333"} text={" Loading..."} dark={Scheme === "dark"} bg={Scheme === "dark" ? "#666" : "#fff"} />
          </Pressable>
     )
}

// STYLING...
const style = StyleSheet.create({
     container: {
          flex: 1,
          padding: 10,
     },
     button: {
          padding: 10,
          paddingHorizontal: 20,
          gap: 20,
          borderColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 0.5,
          borderRadius: 5,
          alignSelf: "flex-start",
          elevation: 3
     },
     press: {
          transform: [{ scale: 0.98 }]
     },
     city: {
          fontSize: 16,
          fontFamily: "Poppins-Regular",
     },
     containerCity: {
          elevation: 5,
          padding: 15,
          borderRadius: 6,
          borderColor: "#f0f0f0",
          borderWidth: 0.5,
     },
     datas: {
          fontFamily: "Poppins-Regular",
          borderBottomWidth: 0.5,
          fontSize: 17,
          padding: 5,
     }
})