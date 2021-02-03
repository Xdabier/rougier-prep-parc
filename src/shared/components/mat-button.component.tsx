import React, {ReactNode} from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import {
    BORDER_RADIUS,
    FAB_BORDER_RADIUS,
    FAB_BUTTON_SIZE,
    MAIN_LIGHT_GREY
} from '../../styles';

const STYLES = StyleSheet.create({
    buttonParent: {
        overflow: 'hidden'
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
    fab?: boolean;
}> = ({children, fab}: {children: ReactNode; fab?: boolean}) => (
    <View
        style={[
            STYLES.buttonParent,
            fab ? STYLES.fabButton : STYLES.buttonRadius
        ]}>
        <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple(MAIN_LIGHT_GREY, true)}>
            {children}
        </TouchableNativeFeedback>
    </View>
);

MatButton.defaultProps = {
    fab: false
};

export default MatButton;
