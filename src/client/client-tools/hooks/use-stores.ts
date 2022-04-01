import React from 'react';
import { RootStore } from '../../stores/root.store';
import { storesContext } from '../../stores/store-context';

export const useStores = () => React.useContext<RootStore>(storesContext);