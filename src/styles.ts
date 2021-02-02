import {StyleSheet} from 'react-native';

export interface AppStyleSheet {
    appPage: {
        [key: string]: any;
    };
}

const CommonStyles = StyleSheet.create<AppStyleSheet>({
    appPage: {flex: 1, justifyContent: 'center', alignItems: 'center'}
});

export default CommonStyles;
