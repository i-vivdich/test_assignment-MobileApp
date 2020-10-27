import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Button, Alert, StyleSheet } from 'react-native';

import { useNavigation, useFocusEffect, useLinkProps } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

import ServiceItem from '../../components/service.item';
import { getServices } from '../../api/services';
import { saveUser, getUser, updateUserField } from '../../async_storage/user';

const DryScreen = ({ navigation, route }) => {
    const [services, setServices] = React.useState([]); // use service context here
    const [isAdmin, setIsAdmin] = useState(false); // better to implement additional method for this globally

    useEffect(() => {
        async function fetchServices() {
            setServices(await getServices({ services: [...route.params.item.services] }));
        }
        (async () => {
            const user = await getUser();
            setIsAdmin(user.roles.includes("ADMIN"));
        })();

        fetchServices();
    }, [])

    useFocusEffect(
        React.useCallback(() => {
            navigation.setOptions({
                headerTitle: route.params.title
            })
            // const stackNavigator = navigation.dangerouslyGetParent();
            // const stackNavigator = navigation.dangerouslyGetState();

            // if (stackNavigator){
                // stackNavigator.setOptions({
                //     title: route.params.dryTitle
                // });
            // }
        }, [navigation])
    );

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>{route.params.title}</Text>
            </View>
            { isAdmin 
                ? <React.Fragment>
                    <View style={styles.frame}>
                    <View style={{flexDirection: "row"}}>
                        <View style={styles.info}>
                            <Text style={{justifyContent: "flex-start", fontSize: 20, color: "grey"}}>Description:</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={{justifyContent: "flex-end", fontSize: 20,}}>{route.params.item.description}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: "row"}}>
                        <View style={styles.info}>
                            <Text style={{justifyContent: "flex-start", fontSize: 20, color: "grey"}}>Service description:</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={{justifyContent: "flex-end", fontSize: 20,}}>{route.params.item.service_description}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.info}>
                        {/* <Text>Services:</Text> */}
                        <FlatList
                            style={styles.list}
                            keyExtractor={(item) => item._id}
                            data={services}
                            renderItem={({item}) => {(<View><Text>Name: {item}</Text><Text>{"\n"}Cost: {item.cost}</Text></View>)}}
                />
                    </View>
                    </View>
                </React.Fragment>
                : <FlatList
                    style={styles.list}
                    keyExtractor={(item) => item._id}
                    data={services}
                    renderItem={({item}) => <ServiceItem item={item}/>}
                />
            
            }
        </SafeAreaView>
    );
}
 
const styles = StyleSheet.create({
    info: {
        marginLeft: 20
    },  
    frame: {
        marginTop: "10%",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        marginTop: 10,
        marginBottom: 15,
        fontWeight: "bold",
        fontSize: 24,
        color: 'blue',
        textAlign: 'center'
    }
})

export default DryScreen;
