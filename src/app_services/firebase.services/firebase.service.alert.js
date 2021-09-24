import * as firebase from 'firebase';
import { Alert, Platform, Linking } from 'react-native'
//import AsyncStorage from '@react-native-async-storage/async-storage';

import 'firebase/firestore';

export const openMaps = (lat, lng) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const label = 'Responder';
    const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
    });


    Linking.openURL(url);
}
const AskAdmin = (latitude, longitude, deviceID, uid, navigation) => {
    Alert.alert(

        "An emergency requested by " + deviceID,
        deviceID + " has requested for an emergency help at a precise location. Click view information  before deciding",
        [
            {
                text: "Reject",
                //save action to data base
                onPress: () => {
                    setTeamRecords(getTeam(), 'Reject', deviceID, uid, "null")
                    resetUserQuery(uid)

                },
                style: "cancel"
            },
            {
                text: "View  Information",
                //save action to data base
                onPress: () => {
                    navigation.navigate('UserInfo', { latitude, longitude, uid, deviceID, navigation })
                },
                style: "cancel"
            },

        ]
    );


}
export const listenToHelp = (team, navigation, sound) => {

    firebase.firestore().collection("Recent").where("read", "==", "No")
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                const getLatitude = doc.data().latitude;
                const getLongitude = doc.data().longitude;
                const deviceID = doc.data().deviceID;
                const emcType = doc.data().emergencyType;
                const uid = doc.data().uid;
                if (team == emcType) {
                    sound()
                    AskAdmin(getLatitude, getLongitude, deviceID, uid, navigation)
                }

            });

        });
}
export const getPerformance = async (action, team, send) => {
    const data = [];
    if (team == 'Medical') {
        if (action == 'Accept') {
            const snapshot = await firebase.firestore().collection('MAccept').get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    data.push(doc.data().deviceID + ' on ' + doc.data().createdAt.toDate());

                });

            })
        }
        else {
            const snapshot = await firebase.firestore().collection('MRject').get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    data.push(doc.data().deviceID + ' on ' + doc.data().createdAt.toDate());

                });
            })
        }
    }//Medical Handled here



    else if (team == 'Fire') {
        if (action == 'Accept') {
            const snapshot = await firebase.firestore().collection('FAccept').get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    data.push(doc.data().deviceID);
                });
            })
        }
        else {
            const snapshot = await firebase.firestore().collection('FRject').get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    data.push(doc.data().deviceID);
                });
            })
        }
    }//Fire Handled here



    else if (team == 'Security') {
        if (action == 'Accept') {
            const snapshot = await firebase.firestore().collection('SAccept').get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    data.push(doc.data().deviceID);
                });
            });
        }
        else {
            const snapshot = await firebase.firestore().collection('SRject').get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    data.push(doc.data().deviceID);
                });
            })
        }
    }//Securityy handled here
    send(data)
}
export const getTeam = () => {
    const user = firebase.auth().currentUser
    const uid = user.uid
    if (uid == 'S2SRgIHcGKNLn8uyCe3Uifwhekp2') {
        return 'Medical'
    }
    if (uid == 'IP75rBhTUpgn5XV4PGjGTKnTy133') {
        return 'Security'//Change to Securitys
    }
    if (uid == '9xbFtoDuvvOgVsVeoxhEkysim0D3') {
        return 'Fire'
    }
}
export const setTeamRecords = (team, action, deviceID, uid, eta) => {
    if (team == 'Medical') {
        if (action == 'Accept') {
            firebase.firestore().collection('MAccept').doc(uid).set({
                deviceID: deviceID,
                userID: uid,
                ETA: eta,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).catch((e) => { console.log('Error at firebase.service') })
        }
        else {
            firebase.firestore().collection('MRject').doc(uid).set({
                deviceID: deviceID,
                userID: uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).catch((e) => { console.log('Error at firebase.service') })
        }
    }//Medical Handled here



    else if (team == 'Fire') {
        if (action == 'Accept') {
            firebase.firestore().collection('FAccept').doc(uid).set({
                deviceID: deviceID,
                userID: uid,
                ETA: eta,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).catch((e) => { console.log('Error at firebase.service') })
        }
        else {
            firebase.firestore().collection('FRject').doc(uid).set({
                deviceID: deviceID,
                userID: uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).catch((e) => { console.log('Error at firebase.service') })
        }
    }//Fire Handled here



    else if (team == 'Security') {
        if (action == 'Accept') {
            firebase.firestore().collection('SAccept').doc(uid).set({
                deviceID: deviceID,
                userID: uid,
                ETA: eta,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).catch((e) => { console.log('Error at firebase.service') })
        }
        else {
            firebase.firestore().collection('SRject').doc(uid).set({
                deviceID: deviceID,
                userID: uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).catch((e) => { console.log('Error at firebase.service') })
        }
    }//Securityy handled here

}
export const resetUserQuery = (user) => {
    firebase.firestore().collection("Recent").doc(user).update({
        read: 'Yes'
    })
}

export const chatDetails = (uid, setter) => {
    const info = [];
    firebase.firestore().collection('Users').doc(uid).get().then((doc) => {
        info.push(doc.data().name)
        info.push(doc.data().email)
        info.push(doc.data().emcContactNumber)
    }).catch((error) => {
        console.log("Error at firebase " + error)
    }); return setter(info)
}

export const getUserData = async (userData, uid) => {
    const data = [];
    firebase.firestore().collection("Users").doc(uid).get().then((doc) => {
        data.push(doc.data().name);
        data.push(doc.data().age);
        data.push(doc.data().emcContactName);
        data.push(doc.data().emcContactNumber);
        data.push(doc.data().medCondition);
        userData(data);
    }).catch((error) => {
        console.log("Error at firebase " + error)
    });

}
