import React from 'react';
import { View, Text, SafeAreaView, Button, FlatList, StyleSheet } from 'react-native';

import { AuthContext } from '../../contexts/auth_context';
import { DryContext } from '../../contexts/dry.context';

import { getDries } from '../../api/dry';

import DryCard from '../../components/dry.card';

const HomeScreen = ({ props }) => {
    
    const { actions: { signOut } } = React.useContext(AuthContext)
    const { actions, dries, setDries } = React.useContext(DryContext);

    // once the component loaded - get the list of dries
    React.useEffect(() => {
      async function fetchDries() {
        setDries(await getDries());
      }
      fetchDries();
    }, [])

    return (
      <SafeAreaView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          style={styles.container}
          keyExtractor={(item) => item._id}
          data={dries}
          renderItem={({item}) => <DryCard title={item.title} item={item}/>}
        />
        <Button title="Sign Out" onPress={() => signOut()}/>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    margin: '3%',
    marginTop: '4%',
    width: '94%'
  },
});

export default HomeScreen;
