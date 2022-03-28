import React from 'react';
import { RootStore } from '../../stores/root.store';
import { storesContext } from '../../stores/store-context';

export const UseStores = () => React.useContext<RootStore>(storesContext);