import { ThemeFactory } from '@skbkontur/react-ui';
import { defaultPortalColor } from './color';

export const KonturTheme = ThemeFactory.create({
    btnBackgroundClip: defaultPortalColor,
    borderColorFocus: defaultPortalColor,
    bgActive: defaultPortalColor
});