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
        maxWidth: widthPercentageToDP(27.669902912621357),
        width: widthPercentageToDP(27.669902912621357),
        fontSize: 16
    },
    textInput: {
        height: LINE_HEIGHT + 8,
        maxWidth: widthPercentageToDP(60.922330097087375),
        width: widthPercentageToDP(60.922330097087375),
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
    value?: string;
    onDateChange: (newDate: Date) => void;
}> = ({
    title,
    value,
    onDateChange
}: {
    title: string;
    value?: string;
    onDateChange: (newDate: Date) => void;
}) => {
    const [date, setDate] = useState<Date>(
        value ? new Date(value) : new Date()
    );
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

    const onDateSelection = (event: Event, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
        onDateChange(currentDate);
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
                <View
                    style={[
                        STYLES.textInput,
                        centerHorizontally,
                        spaceBetween,
                        alignCenter
                    ]}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            setShowDatePicker(true);
                        }}>
                        <View>
                            <Text style={[STYLES.textStyle]}>
                                {date
                                    ? new Date(date).toLocaleDateString()
                                    : ''}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <MatButton
                        onPress={() => {
                            setShowDatePicker(true);
                        }}
                        isIcon>
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
            </View>
            {showDatePicker && (
                <RNDateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    onChange={onDateSelection}
                />
            )}
        </>
    );
};

DateInput.defaultProps = {
    value: ''
};

export default DateInput;
