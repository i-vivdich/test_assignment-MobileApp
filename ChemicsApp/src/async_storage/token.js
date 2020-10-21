import AsyncStorage from '@react-native-community/async-storage';

export const getToken = async () => {
    try {
        const user = await AsyncStorage.getItem('user');
        
        if (user) {
            const userObj = JSON.parse(user);
            return userObj.accessToken;
        }
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const setToken = async (token) => {
    try {
        const user = await AsyncStorage.getItem('user');

        if (user) {
            const userObj = JSON.parse(user);
            userObj['accessToken'] = token;
            await AsyncStorage.setItem('user', JSON.stringify(userObj));
        }
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const clearToken = async () => {
    try {
        const user = await AsyncStorage.getItem('user');

        if (user) {
            const userObj = JSON.parse(user);
            delete userObj.accessToken;
            await AsyncStorage.setItem('user', JSON.stringify(userObj));
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}
