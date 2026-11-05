module.exports = function (api) {
  api.cache(true);
  // babel-preset-expo bundles the react-native-worklets/reanimated transform.
  return {
    presets: ['babel-preset-expo'],
  };
};
