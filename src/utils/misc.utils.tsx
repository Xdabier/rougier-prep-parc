import * as React from 'react';
import LogoImage from '../shared/components/logo-image/logo-image.component';
import {MAIN_ELEVATION, STACK_HEADER_HEIGHT} from '../styles';
import {ParcPrepInterface} from '../core/interfaces/parc-prep.interface';

const stackHeaderOptions: any = {
    headerTitle: () => <LogoImage />,
    headerTitleAlign: 'center',
    headerStyle: {
        height: STACK_HEADER_HEIGHT,
        elevation: MAIN_ELEVATION
    }
};

const getFilteringIdAndName = (
    id: string,
    ids: Pick<ParcPrepInterface, 'id' | 'name'>[]
): Pick<ParcPrepInterface, 'id' | 'name'> | undefined => {
    const filteredList = ids.filter((x) => x.id === id);

    if (!filteredList || !filteredList.length) {
        return undefined;
    }

    return filteredList[0];
};

const miscUtils = {
    stackHeaderOptions,
    getFilteringIdAndName
};

export default miscUtils;
