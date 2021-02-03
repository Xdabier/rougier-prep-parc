import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CommonStyles, {poppinsMedium} from '../../../styles';

const {fullWidth, mainColor} = CommonStyles;
const STYLES = StyleSheet.create({
    title: {
        fontFamily: poppinsMedium,
        fontSize: 23,
        textAlign: 'left'
    }
});

const PageTitle: React.FunctionComponent<{
    title: string;
}> = ({title}: {title: string}) => (
    <View style={[fullWidth]}>
        <Text style={[mainColor, STYLES.title]}>{title}</Text>
    </View>
);

export default PageTitle;
