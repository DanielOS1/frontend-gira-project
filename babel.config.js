module.exports = {
    presets: [
      'module:metro-react-native-babel-preset', // Este preset es estándar para proyectos React Native
    ],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      }],
      // Otros plugins de Babel que quieras usar
    ],
  };