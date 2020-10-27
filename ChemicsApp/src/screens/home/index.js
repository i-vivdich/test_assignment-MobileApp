import React, { useState } from 'react';
import { View, Text, SafeAreaView, Button, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AuthContext } from '../../contexts/auth_context';
import { DryContext } from '../../contexts/dry.context';

import { getDries } from '../../api/dry';
import { getUser } from '../../async_storage/user';

import DryCard from '../../components/dry.card';

const HomeScreen = ({ props, navigation }) => {
    const [isAdmin, setAdmin] = useState('');  

    const { actions: { signOut } } = React.useContext(AuthContext)
    const { actions, dries, setDries } = React.useContext(DryContext);

    React.useEffect(() => {
      async function fetchInfo() {
        setDries(await getDries());
        const user = await getUser();
        console.log('user', user);
        setAdmin(user.roles.includes('ADMIN'));
      }
      fetchInfo();
    }, [])

    return (
      <SafeAreaView>
        <View style={styles.container}>
          { isAdmin
            ?
              <React.Fragment>
                <View style={{marginBottom: "3%"}}>
                  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddDryScreen')}>
                    <Text style={styles.text}>Add New Dry</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginBottom: "3%", height: 2, backgroundColor: 'lightgrey', marginLeft: "3%", marginRight: "3%"}} />
              </React.Fragment>
            :
              null
          }
          <FlatList
                keyExtractor={(item) => item._id}
                data={dries}
                renderItem={({item}) => <DryCard title={item.title} item={item}/>}
          />
          <View style={{flex: 1}}>
            <Button style={{}} title="Sign Out" onPress={() => signOut()}/>
          </View>
        </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "lightgrey",
    padding: 10,
    justifyContent: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  container: {
    margin: '3%',
    marginTop: '4%',
    width: '94%',
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 20
  }
});

export default HomeScreen;
