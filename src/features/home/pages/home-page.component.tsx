import * as React from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useEffect, useState} from 'react';
import {HomeScreenProps} from '../../../core/types/home-screen-props.type';
import CommonStyles, {
    BORDER_RADIUS,
    MAIN_GREEN,
    MAIN_RED,
    PADDING_HORIZONTAL,
    poppinsMedium
} from '../../../styles';
import {translate} from '../../../utils/i18n.utils';
import PageTitle from '../../../shared/components/page-title/page-title.component';
import ParcPrepCard from '../../../shared/components/parc-prep-card/parc-prep-card.component';
import MatButton from '../../../shared/components/mat-button.component';
import {ParcPrepInterface} from '../../../core/interfaces/parc-prep.interface';

const {
    appPage,
    vSpacer60,
    vSpacer12,
    centerHorizontally,
    centerVertically,
    spaceEvenly,
    fullWidth,
    justifyAlignCenter,
    textAlignCenter,
    scrollView
} = CommonStyles;

const ICON_SIZE = 30;
const STYLES = StyleSheet.create({
    button: {
        width: Dimensions.get('screen').width - PADDING_HORIZONTAL * 2,
        paddingVertical: 18,
        paddingHorizontal: 40,
        borderRadius: BORDER_RADIUS
    },
    buttonSecond: {
        backgroundColor: MAIN_RED
    },
    buttonMain: {
        backgroundColor: MAIN_GREEN
    },
    buttonText: {
        lineHeight: 30,
        fontFamily: poppinsMedium,
        fontSize: 20,
        color: '#fff'
    },
    textView: {
        width: 240
    }
});

const HomePage: React.FunctionComponent<HomeScreenProps> = () => {
    const [files, setFiles] = useState<ParcPrepInterface[]>([]);
    useEffect(() => {
        const fetchFiles = () => {
            const filesData = require('../../../assets/json/fakeParcFiles.json');
            setFiles(filesData);
        };
        fetchFiles();
    });

    return (
        <SafeAreaView style={[appPage]}>
            <ScrollView
                contentContainerStyle={[
                    centerVertically,
                    justifyAlignCenter,
                    scrollView
                ]}>
                <PageTitle title={translate('homePage.title')} />
                {files && files.length ? (
                    <ParcPrepCard parcPrepFile={files[0]} />
                ) : (
                    <View />
                )}
                <View style={[vSpacer60]} />
                <MatButton>
                    <View
                        style={[
                            fullWidth,
                            STYLES.button,
                            STYLES.buttonSecond,
                            centerHorizontally,
                            spaceEvenly
                        ]}>
                        <Icon
                            name="qr-code-scanner"
                            color="#fff"
                            size={ICON_SIZE}
                        />
                        <View
                            style={[
                                STYLES.textView,
                                textAlignCenter,
                                centerHorizontally,
                                justifyAlignCenter
                            ]}>
                            <Text style={[STYLES.buttonText, textAlignCenter]}>
                                {translate('common.scanBarCode')}
                            </Text>
                        </View>
                    </View>
                </MatButton>
                <View style={[vSpacer12]} />
                <MatButton>
                    <View
                        style={[
                            fullWidth,
                            STYLES.button,
                            STYLES.buttonMain,
                            centerHorizontally,
                            spaceEvenly
                        ]}>
                        <Icon name="post-add" color="#fff" size={ICON_SIZE} />
                        <View
                            style={[
                                STYLES.textView,
                                textAlignCenter,
                                centerHorizontally,
                                justifyAlignCenter
                            ]}>
                            <Text style={[STYLES.buttonText, textAlignCenter]}>
                                {translate('common.addParcPrepFile')}
                            </Text>
                        </View>
                    </View>
                </MatButton>
                <View style={[vSpacer12]} />
                <MatButton>
                    <View
                        style={[
                            fullWidth,
                            STYLES.button,
                            STYLES.buttonMain,
                            centerHorizontally,
                            spaceEvenly
                        ]}>
                        <Icon name="add-circle" color="#fff" size={ICON_SIZE} />
                        <View
                            style={[
                                STYLES.textView,
                                textAlignCenter,
                                centerHorizontally,
                                justifyAlignCenter
                            ]}>
                            <Text style={[STYLES.buttonText, textAlignCenter]}>
                                {translate('common.addLog')}
                            </Text>
                        </View>
                    </View>
                </MatButton>
                <View style={[vSpacer12]} />
                <MatButton>
                    <View
                        style={[
                            fullWidth,
                            STYLES.button,
                            STYLES.buttonMain,
                            centerHorizontally,
                            spaceEvenly
                        ]}>
                        <Icon name="sync" color="#fff" size={ICON_SIZE} />
                        <View
                            style={[
                                STYLES.textView,
                                textAlignCenter,
                                centerHorizontally,
                                justifyAlignCenter
                            ]}>
                            <Text style={[STYLES.buttonText, textAlignCenter]}>
                                {translate('common.syncAll')}
                            </Text>
                        </View>
                    </View>
                </MatButton>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomePage;
