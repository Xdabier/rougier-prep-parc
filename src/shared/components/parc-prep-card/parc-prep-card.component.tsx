import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import CommonStyles, {
    BORDER_RADIUS,
    MAIN_GREEN,
    MAIN_RED,
    PADDING_HORIZONTAL,
    poppinsRegular
} from '../../../styles';
import {translate} from '../../../utils/i18n.utils';
import MatButton from '../mat-button.component';
import {ParcPrepInterface} from '../../../core/interfaces/parc-prep.interface';

const {
    mainColor,
    centerHorizontally,
    centerVertically,
    spaceBetween,
    alignCenter,
    rougierShadow,
    regularFont,
    textAlignLeft,
    justifyAlignLeftVertical,
    justifyAlignRightVertical,
    justifyAlignRightHorizontal,
    justifyCenter,
    info,
    title,
    subTitle
} = CommonStyles;
const STYLES = StyleSheet.create({
    mainView: {
        width: Dimensions.get('screen').width - (PADDING_HORIZONTAL + 2) * 2,
        padding: 11,
        borderRadius: BORDER_RADIUS,
        backgroundColor: '#fff'
    },
    button: {
        minWidth: 111,
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: BORDER_RADIUS
    },
    buttonFill: {
        backgroundColor: MAIN_RED
    },
    buttonFillConfirmed: {
        backgroundColor: MAIN_GREEN
    },
    buttonClear: {
        backgroundColor: '#fff'
    },
    buttonText: {
        lineHeight: 20,
        fontFamily: poppinsRegular,
        fontSize: 13,
        marginLeft: 6
    },
    buttonTextFill: {
        color: '#fff'
    },
    buttonTextClear: {
        color: MAIN_RED
    }
});

const ParcPrepCard: React.FunctionComponent<{
    parcPrepFile: ParcPrepInterface;
    onAddLog: () => void;
}> = ({
    parcPrepFile,
    onAddLog
}: {
    parcPrepFile: ParcPrepInterface;
    onAddLog: () => void;
}) => (
    <View
        style={[
            STYLES.mainView,
            centerHorizontally,
            spaceBetween,
            alignCenter,
            rougierShadow
        ]}>
        <View
            style={[centerVertically, justifyAlignLeftVertical, justifyCenter]}>
            <Text style={[mainColor, title, regularFont, textAlignLeft]}>
                {translate('common.id')}{' '}
                <Text style={[mainColor, subTitle, regularFont, textAlignLeft]}>
                    {parcPrepFile.id}
                </Text>
            </Text>
            <Text style={[info, regularFont, textAlignLeft]}>
                {translate('common.creationDate', {
                    date: new Date(
                        parcPrepFile.creationDate
                    ).toLocaleDateString()
                })}
            </Text>
            {parcPrepFile.lastLogDate ? (
                <Text style={[info, regularFont, textAlignLeft]}>
                    {translate('common.lastLogDate', {
                        date: new Date(
                            parcPrepFile.lastLogDate
                        ).toLocaleDateString()
                    })}
                </Text>
            ) : (
                <View />
            )}
            {parcPrepFile.logsNumber ? (
                <Text style={[mainColor, title, regularFont, textAlignLeft]}>
                    {translate('common.logs')}{' '}
                    <Text
                        style={[
                            mainColor,
                            subTitle,
                            regularFont,
                            textAlignLeft
                        ]}>
                        {translate('common.logsNumber', {
                            numLogs: parcPrepFile.logsNumber
                        })}
                    </Text>
                </Text>
            ) : (
                <View />
            )}
        </View>
        <View
            style={[
                centerVertically,
                justifyAlignRightVertical,
                justifyCenter
            ]}>
            <MatButton onPress={() => true}>
                <View
                    style={[
                        STYLES.button,
                        parcPrepFile.allSynced
                            ? STYLES.buttonFillConfirmed
                            : STYLES.buttonFill,
                        centerHorizontally,
                        justifyAlignRightHorizontal
                    ]}>
                    <Icon
                        name={parcPrepFile.allSynced ? 'check' : 'sync'}
                        color="#fff"
                        size={20}
                    />
                    <Text style={[STYLES.buttonText, STYLES.buttonTextFill]}>
                        {translate(
                            `common.${
                                parcPrepFile.allSynced ? 'synced' : 'sync'
                            }`
                        )}
                    </Text>
                </View>
            </MatButton>
            <MatButton onPress={() => true}>
                <View
                    style={[
                        STYLES.button,
                        STYLES.buttonClear,
                        centerHorizontally,
                        justifyAlignRightHorizontal
                    ]}>
                    <Icon name="edit" color={MAIN_RED} size={20} />
                    <Text style={[STYLES.buttonText, STYLES.buttonTextClear]}>
                        {translate('common.editParcPrepFile')}
                    </Text>
                </View>
            </MatButton>
            <MatButton onPress={onAddLog}>
                <View
                    style={[
                        STYLES.button,
                        STYLES.buttonClear,
                        centerHorizontally,
                        justifyAlignRightHorizontal
                    ]}>
                    <Icon name="add" color={MAIN_RED} size={20} />
                    <Text style={[STYLES.buttonText, STYLES.buttonTextClear]}>
                        {translate('common.addLog')}
                    </Text>
                </View>
            </MatButton>
        </View>
    </View>
);

export default ParcPrepCard;
