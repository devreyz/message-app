/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        // Tema claro
        light: {
          primary: "#03AB97",
          primaryLight: "#BAC4AD",
          primaryDark: "#028072",
          secondary: "#D9DB2C",
          secondaryLight: "#E3E69F",
          secondaryDark: "#A6A80B",
          accent: "#FF6347", // Tomato
          background: "#FFFFFF",
          surface: "#F1F1F1",
          error: "#B00020",
          success: "#388E3C",
          warning: "#FFA000",
          info: "#1976D2",
          online: "#4CAF50", // Verde para online
          offline: "#9E9E9E", // Cinza para offline
          onPrimary: "#FFFFFF",
          onSecondary: "#000000",
          onAccent: "#FFFFFF",
          onBackground: "#000000",
          onSurface: "#000000",
          onError: "#FFFFFF",
          onSuccess: "#FFFFFF",
          onWarning: "#000000",
          onInfo: "#FFFFFF",
          onOnline: "#FFFFFF",
          onOffline: "#FFFFFF",
          textPrimary: "#212121",
          textSecondary: "#757575",
          textDisabled: "#BDBDBD",
          // Cores específicas para mensagens no tema claro

          userBg: "#03AB97",
          userText: "#FFFFFF",
          notUserBg: "#CDCCDC",
          notUserText: "#000000",
          onUserBg: "#03AB97",
          onNotUserBg: "#CDCCDC"
        },
        // Tema escuro
        dark: {
          primary: "#03AB97",
          primaryLight: "#BAC4AD",
          primaryDark: "#028072",
          secondary: "#D9DB2C",
          secondaryLight: "#E3E69F",
          secondaryDark: "#A6A80B",
          accent: "#FF6347", // Tomato
          background: "#121212",
          surface: "#1C1C1C",
          error: "#CF6679",
          success: "#4CAF50",
          warning: "#FFC107",
          info: "#2196F3",
          online: "#4CAF50", // Verde para online
          offline: "#9E9E9E", // Cinza para offline
          onPrimary: "#000000",
          onSecondary: "#000000",
          onAccent: "#000000",
          onBackground: "#FFFFFF",
          onSurface: "#FFFFFF",
          onError: "#000000",
          onSuccess: "#000000",
          onWarning: "#000000",
          onInfo: "#000000",
          onOnline: "#000000",
          onOffline: "#000000",
          textPrimary: "#E0E0E0",
          textSecondary: "#BDBDBD",
          textDisabled: "#757575",

          userBg: "#03AB97",
          userText: "#ffffff",
          notUserBg: "#2C2C2C",
          notUserText: "#FFFFFF",
          onUserBg: "#03AB97",
          onNotUserBg: "#2C2C2C"
        }
      }
    }
  },
  plugins: []
};
