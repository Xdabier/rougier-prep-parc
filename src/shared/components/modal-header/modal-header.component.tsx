import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommonStyles, {
    MAIN_RED,
    PADDING_HORIZONTAL,
    poppinsRegular,
    STACK_HEADER_HEIGHT
} from '../../../styles';
import LogoImage from '../logo-image/logo-image.component';
import MatButton from '../mat-button.component';

const {
    fullViewWidth,
    iconButton,
    centerVertically,
    centerHorizontally,
    rougierShadow,
    spaceBetween,
    alignCenter,
    justifyAlignCenter,
    justifyAlignTLeftHorizontal,
    justifyAlignRightHorizontal
} = CommonStyles;
const STYLES = StyleSheet.create({
    header: {
        height: STACK_HEADER_HEIGHT,
        backgroundColor: '#fff',
        paddingHorizontal: PADDING_HORIZONTAL
    },
    spacer: {
        width: 17
    },
    title: {
        fontSize: 17,
        fontFamily: poppinsRegular,
        lineHeight: 26,
        color: MAIN_RED
    }
});

const ModalHeader: React.FunctionComponent<{
    title: string;
    onClose: () => void;
}> = ({title, onClose}: {title: string; onClose: () => void}) => (
    <View
        style={[
            rougierShadow,
            centerHorizontally,
            spaceBetween,
            fullViewWidth,
            alignCenter,
            STYLES.header
        ]}>
        <View
            style={[
                centerHorizontally,
                justifyAlignTLeftHorizontal,
                alignCenter
            ]}>
            <LogoImage half />
            <View style={[STYLES.spacer]} />
            <Text style={[STYLES.title]}>{title}</Text>
        </View>
        <View style={[centerHorizontally, justifyAlignRightHorizontal]}>
            <MatButton onPress={onClose} isIcon>
                <View
                    style={[iconButton, centerVertically, justifyAlignCenter]}>
                    <Icon name="close" size={24} color={MAIN_RED} />
                </View>
            </MatButton>
        </View>
    </View>
);

export default ModalHeader;
