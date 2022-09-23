const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'btn-text': '#E36132',
        'footer-icon': '#0D727E',
        default: 'rgba(0,0,0,.85)',
        lightergrey: 'rgba(0,0,0,.54)',
        lightgrey: '#d3d3d3',
        grey: '#808080',
        'darken-green': '#074246',
        lightgray: '#cecece',

        black: colors.black,
        white: colors.white,

        error: '#FD4040',
        success: '#27AE60',
        warning: '#FF8F00',
        link: '#268BD2',

        red: '#c15454',

        grey0: '#F4F4F2',
        grey1: '#EDEEF2',
        grey2: '#C3C5CB',
        grey3: '#888D9B',
        grey4: '#353841',
        grey5: '#3A3D44',
        grey6: '#2C2F36',

        brand: '#FB743E',
        thblue0: '#2D46B9',
        thblue1: '#1E3163',
        thblue2: '#1A2F4B',
        thblue3: '#28475C',
        thblue4: '#1F253D',
        thblue5: '#293151',
        thgreen0: '#C5D7BD',
        thgreen1: '#9FB8AD',
        thgreen2: '#009468',
        thgreen3: '#519259',
        thgreen4: '#347474',
        thgreen5: '#116530',
        thgreen6: '#064635',
        thgreen7: '#7B8E86',
        thgreen8: '#6F8179',
      },
      screens: {
        xs: '400px',
      },
    },
    borderRadius: {
      DEFAULT: '3px',
      full: '9999px',
    },
  },
}
