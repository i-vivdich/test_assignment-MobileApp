import React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { setToken } from '../../api/token';


export default class HomeScreen extends React.Component {
    state = { };

    logOut = async () => {
      await setToken('')
      this.props.navigation.navigate('Login');
    }

    // handleUserLoadingError = res => {
    //   if (res.error === 401) {
    //     this.props.navigation.navigate('Login');
    //   } else {
    //     this.setState({
    //       hasLoadedUsers: false,
    //       userLoadingErrorMessage: res.message
    //     })
    //   }
    // }

    // componentDidMount() {
    // }

    render() {
      return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>HOME SCREEN</Text>
        </SafeAreaView>
      )  
  }
}