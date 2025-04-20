module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#060f1c",
        "dark-teal": "#1E3E62",
        "orange-mid": "#FF6500",
        "dark-gray": "#323240",
        "mid-gray": "#555555",
        "mid-teal": "#0B192C",
        "light-teal": "#0a294d",
        "blue-teal": "#3A59D1",
        "green-teal": "#7AC6D2",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
      },
      animation: {
        "gradient-x": "gradient-x 6s ease infinite",
      },
    },
  },
  variants: {
    extend: {
      backgroundImage: ["active"],
    },
  },
  plugins: [],
};
