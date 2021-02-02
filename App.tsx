import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeStackScreens from './src/features/home';
import LogsStackScreens from './src/features/logs';
import ParcPrepStackScreens from './src/features/parc-prep';
import SettingsStackScreens from './src/features/settings';
import {MainTabsNavigationProps} from './src/core/types/main-tabs-params.type';
import {setI18nConfig} from './src/utils/i18n.utils';

const TAB = createBottomTabNavigator<MainTabsNavigationProps>();

const App = () => {
    setI18nConfig();

    return (
        <NavigationContainer>
            <TAB.Navigator>
                <TAB.Screen name="homeStack" component={HomeStackScreens} />
                <TAB.Screen name="logsStack" component={LogsStackScreens} />
                <TAB.Screen
                    name="parcPrepStack"
                    component={ParcPrepStackScreens}
                />
                <TAB.Screen
                    name="settingsStack"
                    component={SettingsStackScreens}
                />
            </TAB.Navigator>
        </NavigationContainer>
    );
};

export default App;
