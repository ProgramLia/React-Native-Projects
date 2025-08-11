// REACT-NATIVE-COMPONENT...
import { lazy } from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";

// BUILD-IN-COMPONENT...
export default function Loading({ dark, visible, bg, text, textColor }) {
     return (
          <Modal visible={visible} transparent={true}>
               <View style={style.modal}>
                    <View style={[{backgroundColor:bg} , style.place]}>
                         <ActivityIndicator color={dark ? "#f0f0f0" : "#333"} size={40} />
                         {text ? <Text style={{color:textColor , fontSize:19 , textAlign:"center"}}>{text}</Text> : null}
                    </View>
               </View>
          </Modal>
     )
}

const style = StyleSheet.create({
     modal: {
          backgroundColor: "rgba(0,0,0,0.5)",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
     },
     place:{
          borderRadius:12,
          elevation:5,
          borderColor:"#f0f0f0",
          borderWidth:0.5,
          gap:20,
          padding:20,
          width:"70%"
     }
})