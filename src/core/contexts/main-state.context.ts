import React from 'react';
import {MainStateContextInterface} from '../interfaces/main-state.interface';

const MainStateContext: React.Context<MainStateContextInterface> = React.createContext<MainStateContextInterface>(
    {
        parcIds: [],
        gasolines: [],
        parcPrepFiles: [],
        logs: [],
        sites: [],
        cubers: [],
        defaultParc: {
            parcId: -1,
            id: -1
        }
    }
);

export default MainStateContext;
