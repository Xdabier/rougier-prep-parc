import * as React from 'react';
import {View} from 'react-native';
import {SettingsScreenProps} from '../../../core/types/settings-screen-props.type';
import CommonStyles from '../../../styles';
import PageTitle from '../../../shared/components/page-title/page-title.component';
import {translate} from '../../../utils/i18n.utils';

const {appPage} = CommonStyles;

const SettingsPage: React.FunctionComponent<SettingsScreenProps> = () => (
    <View style={[appPage]}>
        <PageTitle title={translate('settings.title')} />
    </View>
);

export default SettingsPage;
