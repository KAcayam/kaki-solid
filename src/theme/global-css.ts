export const globalCss = {
  extend: {
    '*': {
      '--global-color-border': 'colors.border',
      '--global-color-placeholder': 'colors.fg.subtle',
      '--global-color-selection': 'colors.colorPalette.subtle.bg',
      '--global-color-focus-ring': 'colors.colorPalette.solid.bg',
    },
    html: {
      colorPalette: 'gray',
    },
    body: {
      fontFamily: 'Gordita, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      background: 'canvas',
      color: 'fg.default',
    },
    a: {
      marginRight: '1rem',
    },
    main: {
      textAlign: 'center',
      padding: '1em',
      marginX: 'auto',
    },
    h1: {
      color: '#343b42',
      fontSize: '2.2rem',
      fontWeight: '100',
      lineHeight: '1.0',
      marginY: '2rem',
      marginX: 'auto',
    },
    p: {
      lineHeight: '1.35',
    },
  },
}
