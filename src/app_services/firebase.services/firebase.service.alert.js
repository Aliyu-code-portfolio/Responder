import * as firebase from 'firebase';
import { Alert, Platform, Linking } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import 'firebase/firestore';

const openMaps = (lat, lng) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const label = 'Custom Label';
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
    });


    Linking.openURL(url);
}
const AskAdmin = (latitude, longitude, deviceID) => {
    Alert.alert(

        "An emergency requested by " + deviceID,
        deviceID + " has requested for an emergency help at a precise location. Accept the request to view on Maps",
        [
            {
                text: "Reject",
                //save action to data base
                onPress: () => {
                    firebase.firestore().collection('Reject').add({
                        deviceID: deviceID,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    }).catch((e) => { console.log('Error at firebase.service') })
                    //storeData('Reject', deviceID)
                },
                style: "cancel"
            },
            {
                text: "Accept",
                //save action to databasem
                onPress: () => {
                    openMaps(latitude, longitude)
                    firebase.firestore().collection('Accept').add({
                        deviceID: deviceID,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp()
                    }).catch((e) => { console.log('Error at firebase.service') })
                    //storeData('Accept', deviceID)
                }
            }
        ]
    );


}
export const listenToHelp = () => {
    // simple get
    // firebase.firestore().collection("Tracking").doc("Usert2").get().then((doc) => {
    //     console.log("Document data:", doc.data());
    //     return doc.data()
    // })
    firebase.firestore().collection("Tracking").where("seen", "==", "No")
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                const getLatitude = doc.data().latitude;
                const getLongitude = doc.data().longitude;
                const deviceID = doc.data().deviceID;
                //Change value of seen here//
                //Verify that longitude latitude are not undefined from the client end
                AskAdmin(getLatitude, getLongitude, deviceID)

            });

        });
}
export const getPerformance = (action) => {
    const data = [];
    const snapshot = firebase.firestore().collection(action).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data.push(doc.data().deviceID);
        });
    })
    //I have to handle error here)
    return data
}
// const storeData = async (path, value) => {
//     try {
//         await AsyncStorage.setItem(path, JSON.stringify(value))
//     } catch (e) {
//         console.log(e)
//     }
// }