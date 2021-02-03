import {Dimensions, StyleSheet} from 'react-native';

export const MAIN_GREEN = `#45600e`;
export const MAIN_RED = `#A40D20`;
export const MAIN_GREY = `#888888`;
export const MAIN_LIGHT_GREY = `#acacac`;
export const MAIN_DARK_GREY = `#727272`;

export const BORDER_RADIUS = 8;
export const PADDING_HORIZONTAL = 20;
export const FAB_BUTTON_SIZE = 69;
export const FAB_BORDER_RADIUS = FAB_BUTTON_SIZE / 2;

export const poppinsBlack = `Poppins-Black`;
export const poppinsBold = `Poppins-Bold`;
export const poppinsExtraBold = `Poppins-ExtraBold`;
export const poppinsExtraLight = `Poppins-ExtraLight`;
export const poppinsLight = `Poppins-Light`;
export const poppinsMedium = `Poppins-Medium`;
export const poppinsRegular = `Poppins-Regular`;
export const poppinsSemi = `Poppins-Semi`;

export interface AppStyleSheet {
    title: {
        [key: string]: any;
    };
    subTitle: {
        [key: string]: any;
    };
    fabButtonView: {
        [key: string]: any;
    };
    fabButton: {
        [key: string]: any;
    };
    backgroundMain: {
        [key: string]: any;
    };
    backgroundSecond: {
        [key: string]: any;
    };
    info: {
        [key: string]: any;
    };
    appPage: {
        [key: string]: any;
    };
    vSpacer12: {
        [key: string]: any;
    };
    vSpacer100: {
        [key: string]: any;
    };
    vSpacer60: {
        [key: string]: any;
    };
    rougierShadow: {
        [key: string]: any;
    };
    scrollView: {
        [key: string]: any;
    };
    regularFont: {
        [key: string]: any;
    };
    textAlignLeft: {
        [key: string]: any;
    };
    textAlignCenter: {
        [key: string]: any;
    };
    mainColor: {
        [key: string]: any;
    };
    fullWidth: {
        [key: string]: any;
    };
    centerHorizontally: {
        [key: string]: any;
    };
    centerVertically: {
        [key: string]: any;
    };
    spaceBetween: {
        [key: string]: any;
    };
    spaceEvenly: {
        [key: string]: any;
    };
    justifyCenter: {
        [key: string]: any;
    };
    alignCenter: {
        [key: string]: any;
    };
    justifyAlignCenter: {
        [key: string]: any;
    };
    justifyAlignTopVertical: {
        [key: string]: any;
    };
    justifyAlignTBottomVertical: {
        [key: string]: any;
    };
    justifyAlignLeftVertical: {
        [key: string]: any;
    };
    justifyAlignRightVertical: {
        [key: string]: any;
    };
    justifyAlignTopHorizontal: {
        [key: string]: any;
    };
    justifyAlignTBottomHorizontal: {
        [key: string]: any;
    };
    justifyAlignTLeftHorizontal: {
        [key: string]: any;
    };
    justifyAlignRightHorizontal: {
        [key: string]: any;
    };
}

const CommonStyles = StyleSheet.create<AppStyleSheet>({
    appPage: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: PADDING_HORIZONTAL,
        paddingTop: 20
    },
    title: {
        fontSize: 19
    },
    subTitle: {
        fontSize: 15,
        textAlign: 'left',
        opacity: 0.76
    },
    info: {
        fontSize: 12,
        color: MAIN_DARK_GREY
    },
    mainColor: {
        color: MAIN_GREEN
    },
    fullWidth: {
        width: '100%'
    },
    centerVertically: {
        flexDirection: 'column'
    },
    centerHorizontally: {
        flexDirection: 'row'
    },
    justifyAlignCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    justifyAlignTBottomHorizontal: {
        alignItems: 'flex-end'
    },
    justifyAlignTBottomVertical: {
        justifyContent: 'flex-end'
    },
    justifyAlignTLeftHorizontal: {
        justifyContent: 'flex-start'
    },
    justifyAlignLeftVertical: {
        alignItems: 'flex-start'
    },
    justifyAlignTopHorizontal: {
        alignItems: 'flex-start'
    },
    justifyAlignTopVertical: {
        justifyContent: 'flex-start'
    },
    justifyAlignRightHorizontal: {
        justifyContent: 'flex-end'
    },
    justifyAlignRightVertical: {
        alignItems: 'flex-end'
    },
    spaceBetween: {
        justifyContent: 'space-between'
    },
    spaceEvenly: {
        justifyContent: 'space-evenly'
    },
    alignCenter: {
        alignItems: 'center'
    },
    justifyCenter: {
        justifyContent: 'center'
    },
    regularFont: {
        fontFamily: poppinsRegular
    },
    rougierShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.16,
        shadowRadius: 5,
        elevation: 3
    },
    textAlignCenter: {
        textAlign: 'center'
    },
    textAlignLeft: {
        textAlign: 'left'
    },
    vSpacer12: {
        height: 12
    },
    vSpacer60: {
        height: 60
    },
    vSpacer100: {
        height: 100
    },
    scrollView: {
        width: Dimensions.get('screen').width - PADDING_HORIZONTAL * 2
    },
    fabButtonView: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        borderRadius: FAB_BORDER_RADIUS
    },
    fabButton: {
        width: FAB_BUTTON_SIZE,
        height: FAB_BUTTON_SIZE,
        borderRadius: FAB_BORDER_RADIUS
    },
    backgroundMain: {
        backgroundColor: MAIN_RED
    },
    backgroundSecond: {
        backgroundColor: MAIN_GREEN
    }
});

export default CommonStyles;
