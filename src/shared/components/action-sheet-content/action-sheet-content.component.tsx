import React, {RefObject} from 'react';
import {ScrollView, View} from 'react-native';
import ActionSheetComponent from 'react-native-actions-sheet';
import CommonStyles from '../../../styles';

const {
    fullWidth,
    centerVertically,
    justifyAlignCenter,
    vSpacer100
} = CommonStyles;

const ActionSheetContent: React.FunctionComponent<{
    actionSheetRef: RefObject<ActionSheetComponent>;
    valuesList: any[];
    renderElement: (val: {item: any}, index: number) => any;
}> = ({
    actionSheetRef,
    valuesList,
    renderElement
}: {
    actionSheetRef: RefObject<ActionSheetComponent>;
    valuesList: any[];
    renderElement: (val: {item: any}, index: number) => any;
}) => (
    <View>
        <ScrollView
            nestedScrollEnabled
            onScrollEndDrag={() =>
                actionSheetRef.current?.handleChildScrollEnd()
            }
            onScrollAnimationEnd={() =>
                actionSheetRef.current?.handleChildScrollEnd()
            }
            onMomentumScrollEnd={() =>
                actionSheetRef.current?.handleChildScrollEnd()
            }
            contentContainerStyle={[
                centerVertically,
                justifyAlignCenter,
                fullWidth
            ]}>
            {valuesList.map((value, index) =>
                renderElement({item: value}, index)
            )}
            <View style={[vSpacer100]} />
        </ScrollView>
    </View>
);

export default ActionSheetContent;
