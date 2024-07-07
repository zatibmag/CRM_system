const Encore = require("@symfony/webpack-encore");

Encore.setOutputPath("public/build/")
  .setPublicPath("/build")
  .addEntry("index", "./assets/index.tsx")
  .addStyleEntry("main", "./assets/styles/main.css")
  .enableSingleRuntimeChunk()
  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())
  .enableTypeScriptLoader()
  .enableReactPreset()
  .autoProvidejQuery();

module.exports = Encore.getWebpackConfig();
