import { styled } from '@mui/system';
import { Property } from 'csstype';
import React from 'react';

interface Props {
    fontSize?: Property.FontSize;
    fontWeight?: Property.FontWeight;
    lineHeight?: Property.LineHeight;
    color?: Property.Color;
    letterSpacing?: Property.LetterSpacing;
    children?: React.ReactNode;
}

interface WrapperProps {
    fontSize?: Property.FontSize;
    fontWeight?: Property.FontWeight;
    lineheight?: Property.LineHeight;
    color?: Property.Color;
    letterSpacing?: Property.LetterSpacing;
}

const TypographyWrapper = styled(`div`)<WrapperProps>(({ fontSize, fontWeight, lineheight, color, letterSpacing }) => ({
    fontWeight,
    fontSize,
    lineHeight: lineheight,
    color,
    letterSpacing,
}));

export const Typography: React.FC<Props> = ({ fontSize, fontWeight, lineHeight, color, letterSpacing, children }) => (
    <TypographyWrapper
        fontSize={fontSize}
        fontWeight={fontWeight}
        lineheight={lineHeight}
        color={color}
        letterSpacing={letterSpacing}
    >
        {children}
    </TypographyWrapper>
);