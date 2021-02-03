import React, {ReactNode} from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import CommonStyles, {
    BORDER_RADIUS,
    FAB_BORDER_RADIUS,
    FAB_BUTTON_SIZE,
    MAIN_LIGHT_GREY
} from '../../styles';

const {rougierShadow} = CommonStyles;
const STYLES = StyleSheet.create({
    buttonParent: {
        overflow: 'hidden'
    },
    elevationPadding: {
        padding: 2
    },
    buttonRadius: {
        borderRadius: BORDER_RADIUS
    },
    fabButton: {
        width: FAB_BUTTON_SIZE,
        height: FAB_BUTTON_SIZE,
        borderRadius: FAB_BORDER_RADIUS
    }
});

const MatButton: React.FunctionComponent<{
    children: ReactNode;
    isFab?: boolean;
    isElevated?: boolean;
    onPress: () => void;
}> = ({
    children,
    isFab,
    isElevated,
    onPress
}: {
    children: ReactNode;
    isFab?: boolean;
    isElevated?: boolean;
    onPress: () => void;
}) => (
    <View
        style={[
            STYLES.buttonParent,
            isFab ? STYLES.fabButton : STYLES.buttonRadius,
            isElevated ? rougierShadow : {}
        ]}>
        <TouchableNativeFeedback
            onPress={onPress}
            background={TouchableNativeFeedback.Ripple(MAIN_LIGHT_GREY, true)}>
            {children}
        </TouchableNativeFeedback>
    </View>
);

MatButton.defaultProps = {
    isFab: false,
    isElevated: false
};

export default MatButton;
