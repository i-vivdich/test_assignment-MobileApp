import React from 'react';
import { SafeAreaView, View, Text, Button, Alert, StyleSheet, Image } from 'react-native';
import { block } from 'react-native-reanimated';

const DryCard = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.img_container}>
                <Image style={styles.img} source={require('../../resources/sample.png')}/>
            </View>
            <View style={styles.title_container}>
                <Text>{props.title}</Text>
            </View>
        </View>
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
    }
})

export default DryCard;