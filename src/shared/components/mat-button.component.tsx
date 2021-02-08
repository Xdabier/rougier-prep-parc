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
    isDisabled: {
        opacity: 0.5
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
    isIcon?: boolean;
    disabled?: boolean;
    isElevated?: boolean;
    onPress?: () => void;
}> = ({
    children,
    isFab,
    isIcon,
    disabled,
    isElevated,
    onPress
}: {
    children: ReactNode;
    isFab?: boolean;
    isIcon?: boolean;
    disabled?: boolean;
    isElevated?: boolean;
    onPress?: () => void;
}) => (
    <View
        style={[
            disabled ? STYLES.isDisabled : {},
            STYLES.buttonParent,
            isIcon ? {} : STYLES.buttonRadius,
            isFab ? STYLES.fabButton : {},
            isElevated || isFab ? rougierShadow : {}
        ]}>
        <TouchableNativeFeedback
            onPress={onPress}
            disabled={disabled}
            background={TouchableNativeFeedback.Ripple(MAIN_LIGHT_GREY, true)}>
            {children}
        </TouchableNativeFeedback>
    </View>
);

MatButton.defaultProps = {
    isFab: false,
    isElevated: false,
    disabled: false,
    isIcon: false,
    onPress: () => {}
};

export default MatButton;
