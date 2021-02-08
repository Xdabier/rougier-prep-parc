import React, {useState} from 'react';
import {
    KeyboardTypeOptions,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import CommonStyles, {
    MAIN_RED,
    poppinsRegular,
    widthPercentageToDP
} from '../../../styles';

const {
    fullViewWidthInside,
    centerHorizontally,
    spaceBetween,
    alignCenter
} = CommonStyles;
const LINE_HEIGHT = 25;
const STYLES = StyleSheet.create({
    errorContainer: {
        marginBottom: 16
    },
    errorSpacer: {
        maxWidth: widthPercentageToDP(27.669902912621357),
        width: widthPercentageToDP(27.669902912621357)
    },
    errorText: {
        color: MAIN_RED,
        fontSize: 14,
        fontFamily: poppinsRegular,
        maxWidth: widthPercentageToDP(60.922330097087375),
        width: widthPercentageToDP(60.922330097087375)
    },
    fieldContainer: {
        // marginBottom: 16
    },
    disabledInput: {
        opacity: 0.5
    },
    textStyle: {
        fontFamily: poppinsRegular,
        lineHeight: LINE_HEIGHT,
        textAlign: 'left',
        color: '#000'
    },
    label: {
        maxWidth: widthPercentageToDP(27.669902912621357),
        width: widthPercentageToDP(27.669902912621357),
        fontSize: 16
    },
    textInput: {
        padding: 0,
        maxWidth: widthPercentageToDP(60.922330097087375),
        width: widthPercentageToDP(60.922330097087375),
        borderBottomWidth: 1,
        borderBottomColor: '#707070',
        fontSize: 16
    }
});

const FormInput: React.FunctionComponent<{
    title: string;
    placeholder: string;
    errText?: string;
    defaultValue?: string;
    disabled?: boolean;
    pattern?: string[];
    keyboardType?: KeyboardTypeOptions;
    value?: string;
    onChangeText?: (text: string) => void;
    onValidation?: (valids: boolean | boolean[]) => void;
}> = ({
    title,
    placeholder,
    defaultValue,
    value,
    errText,
    onChangeText,
    disabled,
    pattern,
    keyboardType,
    onValidation
}: {
    title: string;
    placeholder: string;
    defaultValue?: string;
    errText?: string;
    disabled?: boolean;
    pattern?: string[];
    keyboardType?: KeyboardTypeOptions;
    value?: string;
    onChangeText?: (text: string) => void;
    onValidation?: (valids: boolean | boolean[]) => void;
}) => {
    const [err, setErr] = useState<boolean | boolean[]>(false);
    const handleValidation = (text: string) => {
        if (!pattern || !pattern.length) return true;

        if (pattern.length === 1) {
            const condition = new RegExp(pattern[0], 'g');
            return condition.test(text);
        }
        const conditions = pattern.map((rule) => new RegExp(rule, 'g'));
        return conditions.map((condition) => condition.test(text));
    };

    const onChange = (_value: string) => {
        const isValid = handleValidation(_value);
        setErr(!isValid);
        if (onValidation) {
            onValidation(isValid);
        }
        if (onChangeText) {
            onChangeText(_value);
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
                <TextInput
                    keyboardType={keyboardType || 'default'}
                    onChangeText={(text: string) => onChange(text)}
                    value={value || ''}
                    editable={disabled !== undefined ? !disabled : true}
                    defaultValue={defaultValue || ''}
                    style={[
                        STYLES.textInput,
                        STYLES.textStyle,
                        disabled ? STYLES.disabledInput : {}
                    ]}
                    placeholderTextColor="#ADADAD"
                    placeholder={placeholder}
                />
            </View>
            {err ? (
                <View
                    style={[
                        STYLES.errorContainer,
                        centerHorizontally,
                        spaceBetween
                    ]}>
                    <View style={[STYLES.errorSpacer]} />
                    <Text style={[STYLES.errorText]}>{errText}</Text>
                </View>
            ) : (
                <View style={[STYLES.errorContainer]} />
            )}
        </>
    );
};

FormInput.defaultProps = {
    defaultValue: '',
    value: '',
    errText: '',
    keyboardType: 'default',
    disabled: false,
    pattern: [],
    onValidation: () => {},
    onChangeText: () => {}
};

export default FormInput;
