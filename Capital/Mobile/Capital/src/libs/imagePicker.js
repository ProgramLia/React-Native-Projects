// IMPORTS...
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

async function library() {
     const data = await launchImageLibrary({mediaType:'photo'});
     return data.assets[0];
}

export {library}