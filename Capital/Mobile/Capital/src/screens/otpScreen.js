import React, { useRef, useState, useEffect } from "react";
import {Dimensions,Image,StatusBar,StyleSheet,View,Text,TextInput,TouchableOpacity, ToastAndroid} from "react-native";
import colors from "../colors/colors";
import Columns from "../components/columns";
import Buttons from "../components/buttons";
import Icon from "@react-native-vector-icons/feather";
import { post } from "../services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyLoading from "../components/myLoading";

const width = Dimensions.get("screen").width;

export default function OtpScreen({ navigation }) {
     const [loading , setLoading] = useState(false)
     const [otp, setOtp] = useState("");
     const [timer, setTimer] = useState(300);
     const inputRef = useRef(null);

     useEffect(()=> {
          if(timer <= 0) return;
          const interval = setInterval(()=> setTimer(timer=> timer - 1), 1000);
          return ()=> clearInterval(interval);
     } ,[timer]);

     const formatTime = (second) => {
          const m = String(Math.floor(second / 60)).padStart(2,0);
          const s = String(second % 60).padStart(2,0);
          return `${m}:${s}`;
     }

     async function Verify() {
          try {
               setLoading(true)
               const res = await post("/auth/otp/verify" , {otp});
               if(res.code != '200') {
                    ToastAndroid.showWithGravity(res.message , ToastAndroid.CENTER, ToastAndroid.LONG);
                    return;
               }
               await AsyncStorage.setItem("is_verified" , "true");
               navigation.replace("Dashboard");
          }catch(err){
               console.log(err);
          }finally{
               setLoading(false)
          }
     }

     async function resendOTP() {
          try {
               setLoading(true);
               const res = await post("/auth/otp/send");
               setTimer(300);
          }catch(err) {
               console.log(err);
          }finally{
               setLoading(false)
          }
     }
     return (
          <View style={style.container}>
               <StatusBar backgroundColor={colors.primary} barStyle={"light-content"} />
               <View style={style.box}>
                    {/* <Image
                         style={style.img}
                         source={require("../assets/images/Security2.png")}/> */}

                    {/* OTP Input Area */}
                    <View style={style.otpWrapper}>
                         <TouchableOpacity
                              onPress={() => inputRef.current?.focus()}
                              activeOpacity={1}
                              style={style.touchArea}>
                              <View style={style.otp}>
                                   {[...Array(6)].map((_, index) => (
                                        <Columns key={index} text={otp[index] || ""} />
                                   ))}
                              </View>
                         </TouchableOpacity>

                         {/* Hidden TextInput */}
                         <TextInput
                              ref={inputRef}
                              value={otp}
                              onChangeText={(text) => {
                                   if (text.length <= 6) setOtp(text);
                              }}
                              keyboardType="number-pad"
                              maxLength={6}
                              autoFocus
                              style={style.realInput}/>
                    </View>

                    {/* Countdown */}
                    <View style={style.countdown}>
                         <Icon size={16} color={colors.primary} name="clock" />
                         <Text style={style.countdownText}>{formatTime(timer)}</Text>
                    </View>

                    {/* Verify Button */}
                    <Buttons onpress={()=> Verify()} styling={style.btn}>
                         <Text style={style.btnText}>Verify</Text>
                    </Buttons>

                    {/* Resend Section */}
                    <View style={style.resend}>
                         <Text style={style.resendText}>Haven't received OTP?</Text>
                         <Text onPress={()=> resendOTP()} style={[style.resendText,{ color: colors.primary, fontFamily: "Poppins-Medium" }]}>
                              Resend
                         </Text>
                    </View>
               </View>
               <MyLoading isVisible={loading} color={colors.primary} type={"Wave"} size={80} />
          </View>
     );
}

const style = StyleSheet.create({
     container: {
          flex: 1,
          alignItems: "center",
          backgroundColor: colors.primary,
     },
     box: {
          borderRadius: width / 20,
          width: "95%",
          gap: 5,
          marginVertical: "3%",
          elevation:5,
          padding: "5%",
          backgroundColor: colors.background,
     },
     img: {
          alignSelf: "center",
          width: "60%",
          height: "40%",
     },
     otpWrapper: {
          position: "relative",
          alignItems: "center",
          marginBottom: 10,
     },
     touchArea: {
          paddingVertical: 10,
          width: "100%",
          alignItems: "center",
     },
     otp: {
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 5,
          marginVertical: 5,
     },
     hiddenInput: {
          position: "absolute",
          width: 1,
          height: 1,
          opacity: 0,
     },
     countdown: {
          marginVertical: 5,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
     },
     countdownText: {
          color: colors.primary,
          fontSize: 16,
     },
     btn: {
          backgroundColor: colors.primary,
          padding: "3%",
          justifyContent:"center",
          alignItems:"center",
          elevation: 0,
     },
     btnText: {
          color: colors.background,
          fontFamily: "Poppins-Medium",
          textAlign: "center",
          fontSize: 16,
     },
     resend: {
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
     },
     resendText: {
          color: colors.placeholder,
          fontFamily: "Poppins-Regular",
     },
     realInput: {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%", // cukup besar untuk disentuh
          opacity: 0.01, // hampir tidak terlihat tapi tetap terdeteksi sentuhan
          zIndex: 10, // pastikan tetap di atas OTP box
     },
});
