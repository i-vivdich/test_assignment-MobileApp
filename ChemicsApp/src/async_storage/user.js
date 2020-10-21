import AsyncStorage from '@react-native-community/async-storage';

export const saveUser = async (data) => {
    try {
        const user = await AsyncStorage.setItem('user', JSON.stringify(data));
        if (user) {
            return JSON.parse(user);
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const removeUser = async () => {
    try {
        await AsyncStorage.removeItem('user');
    } catch (err) {
        console.log(err);
        return null;
    }
}