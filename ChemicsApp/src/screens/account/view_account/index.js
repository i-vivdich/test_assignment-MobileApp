import React from 'react';
import { SafeAreaView, View, Text, Button, Alert } from 'react-native';

import { MoneyContext } from '../../../contexts/money.context';
import { getUser } from '../../../async_storage/user';

const AccountScreen = ({ navigation }) => {
    const { money, setMoney, actions } = React.useContext(MoneyContext);
    const [localMoney, setLocalMoney] = React.useState('');

    React.useEffect(() => {
        (async () => {
            const user = await getUser();
            setLocalMoney(user.balance);
        })();
    }, []);

    React.useEffect(() => {
        setLocalMoney(money);
    }, [money])

    return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'lime'}}>
                <Text>Balance:  {localMoney}</Text>
            </View>
    );
}
    
export default AccountScreen;