import * as React from 'react';
import {Text, View} from 'react-native';
import {SettingsScreenProps} from '../../../core/types/settings-screen-props.type';
import CommonStyles from '../../../styles';

const {appPage} = CommonStyles;

const SettingsPage: React.FunctionComponent<SettingsScreenProps> = () => (
    <View style={[appPage]}>
        <Text>Settings screen</Text>
    </View>
);

export default SettingsPage;
