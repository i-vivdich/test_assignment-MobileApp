import React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import { setToken } from '../../api/token';
import { AuthContext } from '../../contexts/auth_context';

const HomeScreen = ({ props }) => {

    const { signOut } = React.useContext(AuthContext)
    state = { };

    // logOut = async () => {
    //   await setToken('')
    //   this.props.navigation.navigate('Login');
    // }

    // const { signOut } = React.useContext(AuthContext);


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

    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>HOME SCREEN</Text>
          <Button title="Sign Out" onPress={() => signOut()}/>
      </SafeAreaView>
    )
}

export default HomeScreen;
