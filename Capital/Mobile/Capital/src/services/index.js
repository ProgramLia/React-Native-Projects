// IMPORTS
import AsyncStorage from "@react-native-async-storage/async-storage";
const baseURL = "http://172.16.64.198:5252/api/v1";

// GET...
async function get(path) {
     const token = await AsyncStorage.getItem("token");
     const response = await fetch(baseURL + path, {
          method: "GET",
          headers: {
               'Content-Type': 'application/json',
               authorization: `Bearer ${token}`
          }
     });
     const res = await response.json();
     return res;
}

// POST...
async function post(path, form) {
     const token = await AsyncStorage.getItem("token");
     const response = await fetch(baseURL + path, {
          method: "POST",
          headers: {
               'Content-Type': 'application/json',
               authorization: `Bearer ${token}`
          },
          body: JSON.stringify(form),
     })
     const res = await response.json();
     return res;
}

// POST...
async function del(path) {
     const token = await AsyncStorage.getItem("token");
     const response = await fetch(baseURL + path, {
          method: "DELETE",
          headers: {
               'Content-Type': 'application/json',
               authorization: `Bearer ${token}`
          },
     })
     const res = await response.json();
     return res;
}

// POST...
async function put(path, form) {
     const token = await AsyncStorage.getItem("token");
     const response = await fetch(baseURL + path, {
          method: "PUT",
          headers: {
               'Content-Type': 'application/json',
               authorization: `Bearer ${token}`
          },
          body: JSON.stringify(form),
     })
     const res = await response.json();
     return res;
}

async function upload(path , form) {
     const token = await AsyncStorage.getItem("token");
     const formData = new FormData();
     formData.append('photo' , {
          uri:form.uri,
          name:form.fileName,
          type:form.type,
     });

     const res = await fetch(baseURL + path , {
          method:"POST",
          headers:{
               // 'Content-Type': 'multipart/form-data',
               authorization: `Bearer ${token}`
          },
          body:formData
     });
     const result = await res.json()
     return result;
}

async function update(path , form) {
     const token = await AsyncStorage.getItem("token");
     const formData = new FormData();
     formData.append('photo' , {
          uri:form.uri,
          name:form.fileName,
          type:form.type,
     });

     const res = await fetch(baseURL + path , {
          method:"PUT",
          headers:{
               // 'Content-Type': 'multipart/form-data',
               authorization: `Bearer ${token}`
          },
          body:formData
     });
     const result = await res.json()
     return result;
}

// EXPORTS...
export { get, post, put, upload, update,del };