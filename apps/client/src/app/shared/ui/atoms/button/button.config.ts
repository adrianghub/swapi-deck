export const buttonSizes: ButtonSizes = {
  small: {
    padding: '4px 16px',
    fontSize: 16 / 16 + 'rem',
  },
  medium: {
    padding: '20px 12px',
    fontSize: 18 / 16 + 'rem',
  },
  large: {
    padding: '12px 38px',
    fontSize: 21 / 16 + 'rem',
  },
};

export const iconSizes: ButtonSizes = {
  small: {
    padding: '4px 8px',
    iconWidth: 28 / 16 + 'rem',
  },
  medium: {
    padding: '24px 8px',
    iconWidth: 32 / 16 + 'rem',
  },
  large: {
    padding: '12px 38px',
    iconWidth: 48 / 16 + 'rem',
  },
};

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonType = 'primary' | 'accent' | 'warn';
export type ButtonSizes = {
  [key in ButtonSize]: {
    padding: string;
    fontSize?: string;
    iconWidth?: string;
  };
};
