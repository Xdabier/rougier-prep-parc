import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Text, View} from 'react-native';
import HomeStackScreens from './src/features/home';
import LogsStackScreens from './src/features/logs';
import ParcPrepStackScreens from './src/features/parc-prep';
import SettingsStackScreens from './src/features/settings';
import {MainTabsNavigationProps} from './src/core/types/main-tabs-params.type';
import {setI18nConfig, translate} from './src/utils/i18n.utils';
import BarIconNameEnum from './src/core/enum/bar-icon-name.enum';
import BarLabelNameEnum from './src/core/enum/bar-label-name.enum';
import {
    MAIN_GREY,
    MAIN_RED,
    poppinsRegular,
    TAB_BAR_BUTTON_HEIGHT,
    TAB_BAR_HEIGHT,
    TAB_BAR_VERT_PADDING
} from './src/styles';
import syncStorage from './src/core/services/sync-storage.service';

const TAB = createBottomTabNavigator<MainTabsNavigationProps>();
// (global as CustomGlobalInterface).SQLiteDB = DB;

const App = () => {
    const loadStorage = async () => syncStorage.init();
    const [isReady, setIsReady] = useState<boolean>(false);

    loadStorage()
        .then(() => {
            setI18nConfig();
            setIsReady(true);
        })
        .catch(() => {
            setI18nConfig();
            setIsReady(true);
        });

    return isReady ? (
        <NavigationContainer>
            <TAB.Navigator
                initialRouteName="homeStack"
                tabBarOptions={{
                    style: {
                        height: TAB_BAR_HEIGHT,
                        paddingVertical: TAB_BAR_VERT_PADDING
                    },
                    activeTintColor: MAIN_RED,
                    inactiveTintColor: MAIN_GREY,
                    labelStyle: {
                        fontFamily: poppinsRegular,
                        fontSize: 12
                    },
                    tabStyle: {
                        height: TAB_BAR_BUTTON_HEIGHT
                    }
                }}
                screenOptions={({route}) => ({
                    tabBarIcon: ({
                        size,
                        focused
                    }: {
                        focused: boolean;
                        size: number;
                    }) => {
                        const COLOR = focused ? MAIN_RED : MAIN_GREY;
                        const NAME = BarIconNameEnum[route.name];
                        return <Icon name={NAME} size={size} color={COLOR} />;
                    },
                    tabBarLabel: translate(BarLabelNameEnum[route.name])
                })}>
                <TAB.Screen
                    name="parcPrepStack"
                    component={ParcPrepStackScreens}
                />
                <TAB.Screen name="logsStack" component={LogsStackScreens} />
                <TAB.Screen name="homeStack" component={HomeStackScreens} />
                <TAB.Screen
                    name="settingsStack"
                    component={SettingsStackScreens}
                />
            </TAB.Navigator>
        </NavigationContainer>
    ) : (
        <View>
            <Text>Loading...</Text>
        </View>
    );
};

export default App;
