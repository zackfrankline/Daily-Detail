const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push("cjs");


module.exports = (()=>{
    const config = getDefaultConfig(__dirname);

    config.resolver.sourceExts.push("cjs");

    const { transformer, resolver } = config;

    config.transformer = {
      ...transformer,
      babelTransformerPath: require.resolve(
        "react-native-svg-transformer/expo"
      ),
    };
    config.resolver = {
      ...resolver,
      assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...resolver.sourceExts, "svg"],
    };

    return config;
})()
