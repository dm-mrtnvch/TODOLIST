import React from 'react';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';
import AppWithRedux from './AppWithRedux';


export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = () => {
    return <AppWithRedux/>
}