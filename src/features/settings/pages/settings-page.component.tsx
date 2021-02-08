import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SettingsScreenProps} from '../../../core/types/settings-screen-props.type';
import CommonStyles, {BORDER_RADIUS, poppinsMedium} from '../../../styles';
import PageTitle from '../../../shared/components/page-title/page-title.component';
import {translate} from '../../../utils/i18n.utils';
import MatButton from '../../../shared/components/mat-button.component';

const {
    appPage,
    hSpacer17,
    vSpacer60,
    centerHorizontally,
    justifyAlignTLeftHorizontal,
    fullViewWidthInside,
    alignCenter
} = CommonStyles;

const STYLES = StyleSheet.create({
    button: {
        borderRadius: BORDER_RADIUS
    },
    buttonText: {
        fontSize: 26,
        fontFamily: poppinsMedium
    }
});

const SettingsPage: React.FunctionComponent<SettingsScreenProps> = () => (
    <View style={[appPage]}>
        <PageTitle title={translate('settings.title')} />
        <View style={[vSpacer60]} />
        <MatButton>
            <View
                style={[
                    STYLES.button,
                    centerHorizontally,
                    justifyAlignTLeftHorizontal,
                    fullViewWidthInside,
                    alignCenter
                ]}>
                <Icon name="person" color="#000" size={39} />
                <View style={[hSpacer17]} />
                <Text style={[STYLES.buttonText]}>
                    {translate('settings.setUser')}
                </Text>
            </View>
        </MatButton>
    </View>
);

export default SettingsPage;
