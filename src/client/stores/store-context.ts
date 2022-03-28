import { createContext } from 'react';
import { CommonApiStore } from '../client-tools/api/stores/common-api-store';
import { BASE_URL } from '../../common/enviroments/global-enviroment';
import { RootStore } from './root.store';

export const rootStore = new RootStore(new CommonApiStore(BASE_URL));
export const storesContext = createContext<RootStore>(rootStore);