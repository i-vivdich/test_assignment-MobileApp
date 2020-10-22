import AsyncStorage from '@react-native-community/async-storage';

export const saveUser = async (data) => {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(data));
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

export const getUser = async () => {
    try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
            return JSON.parse(user);
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const updateUserField = async (field, value) => {
    try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
            const newUserObj = JSON.parse(user);
            newUserObj[field] = value;
            await saveUser(newUserObj);
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}