/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {"50":"#ecfdf5","100":"#d1fae5","200":"#a7f3d0","300":"#6ee7b7","400":"#34d399","500":"#10b981","600":"#059669","700":"#047857","800":"#065f46","900":"#064e3b"},
        'background': '#dbc9be',
        'text-color': '#000000',
        'primary-color': '#90622f',
        'secondary-color': '#c6b6ad',
        'a': '#170830',
        'b': '#997da6',
        'red': '#f70000'
      },

      backgroundImage: {
        "main-bg": "url('/src/component/assets/one.jpg')"
      }
    },
  },
  plugins: [],
  variants: {
    extend: {
      backgroundColor: ['active'],
    }
  },
}
