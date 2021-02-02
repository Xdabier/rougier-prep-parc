import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SettingsPage from './pages/settings-page.component';
import {SettingsStackParamsTypes} from '../../core/types/settings-stack-params.types';

const SETTINGS_STACK = createStackNavigator<SettingsStackParamsTypes>();

const SettingsStackScreens = () => (
    <SETTINGS_STACK.Navigator>
        <SETTINGS_STACK.Screen
            name="settingsListScreen"
            component={SettingsPage}
        />
    </SETTINGS_STACK.Navigator>
);

export default SettingsStackScreens;
