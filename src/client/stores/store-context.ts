import { createContext } from 'react';
import { CommonApiStore } from '../client-tools/api/stores/common-api-store';
import { BASE_URL } from '../../common/enviroments/global-enviroment';
import { AdminApiStore } from '../client-tools/api/stores/admin-api-store';
import { RootStore } from './root.store';

export const rootStore = new RootStore(new CommonApiStore(BASE_URL), new AdminApiStore(BASE_URL));
export const storesContext = createContext<RootStore>(rootStore);