/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: '#F95068',
          soft:    '#FDA3AF',
          medium:  '#FB7A8D',
          strong:  '#E63B54',
          deep:    '#C92E44',
        },
        ink: {
          DEFAULT: '#1A1E23',
          soft:    '#27323B',
          light:   '#34424C',
        },
        cream: {
          DEFAULT: '#F7F5F2',
          light:   '#FFFCFA',
          muted:   '#EEEAE6',
        },
        sky: {
          soft:    '#C7E7F2',
          lighter: '#E6F7FB',
          pale:    '#F2FBFD',
        },
        lavender: {
          soft:    '#E9E1FF',
          lighter: '#F6F2FF',
          pale:    '#FBF9FF',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Syne', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xs:   '0.25rem',
        sm:   '0.375rem',
        md:   '0.75rem',
        lg:   '1.25rem',
        xl:   '1.75rem',
        pill: '9999px',
      },
      boxShadow: {
        sm:    '0 1px 2px rgba(26,30,35,0.04)',
        md:    '0 4px 12px rgba(26,30,35,0.06)',
        lg:    '0 12px 32px rgba(26,30,35,0.08)',
        coral: '0 6px 28px rgba(249,80,104,0.30)',
      },
      maxWidth: {
        container: '1200px',
        narrow:    '860px',
      },
    },
  },
  plugins: [],
}
