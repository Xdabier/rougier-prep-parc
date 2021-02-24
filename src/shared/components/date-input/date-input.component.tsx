import React, {useState} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import RNDateTimePicker, {Event} from '@react-native-community/datetimepicker';
import CommonStyles, {
    poppinsRegular,
    widthPercentageToDP
} from '../../../styles';
import MatButton from '../mat-button.component';

const {
    fullViewWidthInside,
    centerHorizontally,
    spaceBetween,
    alignCenter,
    centerVertically,
    justifyAlignCenter
} = CommonStyles;
const LINE_HEIGHT = 25;
const STYLES = StyleSheet.create({
    fieldContainer: {
        marginBottom: 16
    },
    disabledInput: {
        opacity: 0.5
    },
    textStyle: {
        fontFamily: poppinsRegular,
        lineHeight: LINE_HEIGHT,
        textAlign: 'left',
        color: '#000',
        fontSize: 16
    },
    label: {
        maxWidth: widthPercentageToDP(31),
        width: widthPercentageToDP(31),
        fontSize: 16
    },
    textInput: {
        height: LINE_HEIGHT + 8,
        maxWidth: widthPercentageToDP(58),
        width: widthPercentageToDP(58),
        borderBottomWidth: 1,
        borderBottomColor: '#707070',
        paddingRight: 5
    },
    iconButton: {
        width: LINE_HEIGHT - 4,
        height: LINE_HEIGHT - 4,
        borderRadius: (LINE_HEIGHT - 4) / 2
    }
});

const DateInput: React.FunctionComponent<{
    title: string;
    value: Date;
    onDateChange: (newDate: Date) => void;
}> = ({
    title,
    value,
    onDateChange
}: {
    title: string;
    value: Date;
    onDateChange: (newDate: Date) => void;
}) => {
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

    const onDateSelection = (event: Event, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            onDateChange(selectedDate);
        }
    };

    return (
        <>
            <View
                style={[
                    fullViewWidthInside,
                    centerHorizontally,
                    spaceBetween,
                    alignCenter,
                    STYLES.fieldContainer
                ]}>
                <Text style={[STYLES.label, STYLES.textStyle]}>{title}</Text>

                <TouchableWithoutFeedback
                    onPress={() => {
                        setShowDatePicker(true);
                    }}>
                    <View
                        style={[
                            STYLES.textInput,
                            centerHorizontally,
                            spaceBetween,
                            alignCenter
                        ]}>
                        <View>
                            <Text style={[STYLES.textStyle]}>
                                {value
                                    ? new Date(value).toLocaleDateString()
                                    : ''}
                            </Text>
                        </View>

                        <MatButton isIcon>
                            <View
                                style={[
                                    STYLES.iconButton,
                                    centerVertically,
                                    justifyAlignCenter
                                ]}>
                                <Icon
                                    name="today"
                                    size={LINE_HEIGHT - 4}
                                    color="#000"
                                />
                            </View>
                        </MatButton>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            {showDatePicker && (
                <RNDateTimePicker
                    testID="dateTimePicker"
                    value={value}
                    onChange={onDateSelection}
                />
            )}
        </>
    );
};

export default DateInput;
