import { createTheme } from '@mui/material';
import { defaultPortalColor, hoveredColor } from './color';

export const ThemeMui = createTheme({
    typography: {
        fontFamily: `"Lab Grotesque", "Segoe UI", "Helvetica Neue", Helvetica, Arial, Tahoma, sans-serif`
    },
    components: {
        MuiAccordion: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    border: `1px solid ${defaultPortalColor}`,
                    [':before']: {

                    }
                }
            }
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    borderBottom: `1px solid ${defaultPortalColor}`,
                    background: hoveredColor,
                }
            }
        }
    }
})