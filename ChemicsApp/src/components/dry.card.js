import React from 'react';
import { SafeAreaView, View, Text, Button, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const DryCard = (props) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('MainScreen', { screen: 'DryScreen', initial: false, params: { item: props.item, title: props.title }});
        }}>
            <View style={styles.container}>
                <View style={styles.img_container}>
                    <Image style={styles.img} source={require('../../resources/sample.png')}/>
                </View>
                <View style={styles.title_container}>
                    <Text style={styles.title_text}>{props.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
        
    );
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'grey',
        borderWidth: 2,
        borderRadius: 50,
        marginBottom: 15
    },
    img_container: {
        height: 200,
        overflow: "hidden",
        textAlign: "center",
    },
    img: {
        maxWidth: '100%',
        height: '100%',
        borderRadius: 50,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    title_container : {
        marginTop: 20,
        marginBottom: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    title_text: {
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default DryCard;