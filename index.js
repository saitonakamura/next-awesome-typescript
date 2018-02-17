const { CheckerPlugin } = require("awesome-typescript-loader");

module.exports = (awesomeTypescriptOptions = {}, nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          "This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade"
        );
      }

      const { dir, defaultLoaders } = options;
      const { useCheckerPlugin, loaderOptions } = awesomeTypescriptOptions;

      // cacheDirectory option is unavailable in case of useBabel option
      // use useCache option of awesome-typescript-loader instead
      const fixBabelConfig = omit(defaultLoaders.babel.options, [
        "cacheDirectory",
      ]);

      config.resolve.extensions.push(".ts", ".tsx");
      config.module.rules.push({
        test: /\.+(ts|tsx)$/,
        include: [dir],
        exclude: /node_modules/,
        use: [
          {
            loader: "awesome-typescript-loader",
            options: Object.assign(
              {
                transpileOnly: true,
                useBabel: true,
                useCache: true,
                forceIsolatedModules: true,
                cacheDirectory: "node_modules/.cache/awesome-typescript-loader",
                babelOptions: fixBabelConfig,
              },
              loaderOptions
            ),
          },
        ],
      });

      if (useCheckerPlugin) config.plugins.push(new CheckerPlugin());

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });
};

const omit = (obj, keysToOmit) =>
  Object.keys(obj)
    .filter(key => keysToOmit.indexOf(key) < 0)
    .reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {});
