import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Platform, Linking } from 'react-native'
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import { getUserData, openMaps, getTeam, setTeamRecords, resetUserQuery } from '../app_services/firebase.services/firebase.service.alert'
export const UserInfo = ({ route }) => {
    const { latitude, longitude, uid, deviceID, navigation } = route.params;
    const userData = (data) => {
        setfname(data[0])
        setAge(data[1])
        setEcontactName(data[2])
        setENumber(data[3])
        setPremed(data[4])
    }
    const dialCall = (phone) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${phone}`;
        } else {
            phoneNumber = `telprompt:${phone}`;
        }
        Linking.openURL(phoneNumber);
    };
    const [pressDisable, setPressDisable] = useState(false)
    const [fname, setfname] = useState(null);
    const [age, setAge] = useState(null);
    const [econtactname, setEcontactName] = useState(null);
    const [enumber, setENumber] = useState(null);
    const [premed, setPremed] = useState(null);

    useEffect(() => {
        getUserData(userData, uid);
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Text style={{ fontWeight: 'bold', paddingBottom: 5, }}>Requester's Info</Text>
            </View>
            <View style={styles.content}>
                <View style={{ flexDirection: 'row', padding: 10, }}>
                    <Text style={{ fontWeight: 'bold' }}
                    >Name: </Text>
                    <Text>{fname}</Text>
                </View>

                <View style={{ flexDirection: 'row', padding: 10, }}>
                    <Text style={{ fontWeight: 'bold' }}
                    >Age: </Text>
                    <Text>{age}</Text>
                </View>

                <View style={{ flexDirection: 'row', padding: 10, }}>
                    <Text style={{ fontWeight: 'bold' }}
                    >Emergency Contact: </Text>
                    <Text>{econtactname}</Text>
                </View>

                <View style={{ flexDirection: 'row', padding: 10, }}>
                    <Text style={{ fontWeight: 'bold' }}
                    >Emergency Contact Number: </Text>
                    <TouchableOpacity onPress={() => dialCall(enumber)}><Text style={{ color: 'green', }}>{enumber}</Text></TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', padding: 10, }}>
                    <Text style={{ fontWeight: 'bold' }}
                    >Existing Medical Condition: </Text>
                    <Text>{premed}</Text>
                </View>
            </View>
            <View style={{ paddingTop: 8 }}>
                <Button
                    title=" View on Maps"
                    icon={<Ionicons name='map-sharp' size={25} color='red' />}
                    onPress={() => openMaps(latitude, longitude)}
                />
            </View>
            <Text style={{ paddingTop: 10, fontWeight: 'bold' }}>Choose Expected Arrival Time to accept this request</Text>
            <View style={styles.eta}>
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        title="2 Mins"
                        buttonStyle={{ width: 80, height: 40, backgroundColor: 'green' }}
                        disabled={pressDisable}
                        onPress={() => {
                            setTeamRecords(getTeam(), 'Accept', deviceID, uid, 2)
                            setPressDisable(true);
                            resetUserQuery(uid)
                        }}
                    />
                    <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <Button
                            title="5 Mins"
                            buttonStyle={{ width: 80, height: 40, backgroundColor: 'green' }}
                            disabled={pressDisable}
                            onPress={() => {
                                setTeamRecords(getTeam(), 'Accept', deviceID, uid, 5)
                                setPressDisable(true);
                                resetUserQuery(uid)
                            }}
                        />
                    </View>
                    <Button
                        title="10 Mins"
                        buttonStyle={{ width: 80, height: 40, backgroundColor: 'green' }}
                        disabled={pressDisable}
                        onPress={() => {
                            setTeamRecords(getTeam(), 'Accept', deviceID, uid, 10)
                            setPressDisable(true);
                            resetUserQuery(uid)
                        }}
                    />
                </View>
                <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                    <View style={{ paddingRight: 10 }}>
                        <Button
                            title="15 Mins"
                            buttonStyle={{ width: 80, height: 40, backgroundColor: 'green' }}
                            disabled={pressDisable}
                            onPress={() => {
                                setTeamRecords(getTeam(), 'Accept', deviceID, uid, 15)
                                setPressDisable(true);
                                resetUserQuery(uid)

                            }}
                        />
                    </View>
                    <Button
                        title="30 Mins"
                        buttonStyle={{ width: 80, height: 40, backgroundColor: 'green' }}
                        disabled={pressDisable}
                        onPress={() => {
                            setTeamRecords(getTeam(), 'Accept', deviceID, uid, 30)
                            setPressDisable(true);
                            resetUserQuery(uid)
                        }}
                    />
                </View>
                <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ paddingRight: 5 }}><Button
                        title="BACK"
                        onPress={() => {
                            navigation.goBack()
                        }}
                    />
                    </View>
                    <Button
                        title="REJECT REQUEST"
                        buttonStyle={{ backgroundColor: 'red' }}
                        disabled={pressDisable}
                        onPress={() => {
                            setTeamRecords(getTeam(), 'Reject', deviceID, uid, "null")
                            resetUserQuery(uid)
                            navigation.goBack()
                            //do store for reject
                        }}
                    />
                </View>

            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgContainer: {

    },
    content: {
        justifyContent: 'center',
        flexDirection: 'column',
        height: '40%',
        width: '90%',
        overflow: 'hidden',
        elevation: 3,
        borderRadius: 5,

    },
    eta: {
        padding: 20,
    },
})