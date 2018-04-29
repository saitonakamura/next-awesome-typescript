const { CheckerPlugin } = require("awesome-typescript-loader");
const path = require("path");

module.exports = (nextConfig = {}) => {
  if (!nextConfig.pageExtensions) {
    nextConfig.pageExtensions = ["jsx", "js"];
  }

  if (nextConfig.pageExtensions.indexOf("ts") === -1) {
    nextConfig.pageExtensions.unshift("ts");
  }

  if (nextConfig.pageExtensions.indexOf("tsx") === -1) {
    nextConfig.pageExtensions.unshift("tsx");
  }

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          "This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade"
        );
      }

      const { dir, defaultLoaders, dev, isServer } = options;
      const { useCheckerPlugin, loaderOptions } = nextConfig.awesomeTypescriptOptions;

      // cacheDirectory option is unavailable in case of useBabel option
      // use useCache option of awesome-typescript-loader instead
      const fixBabelConfig = omit(defaultLoaders.babel.options, [
        "cacheDirectory",
      ]);

      config.resolve.extensions.push(".ts", ".tsx");

      if (dev && !isServer) {
        config.module.rules.push({
          test: /\.(ts|tsx)?$/,
          loader: "hot-self-accept-loader",
          include: [path.join(dir, "pages")],
          options: {
            extensions: /\.(ts|tsx)$/,
          },
        });
      }

      config.module.rules.push({
        test: /\.(ts|tsx)?$/,
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
