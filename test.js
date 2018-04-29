const test = require("tape");
const withSourceMaps = require("@zeit/next-source-maps");
const withAwesomeTypescript = require("./index");

const mockWebpackConfig = {
  module: {
    rules: [],
  },
  resolve: {
    extensions: [],
  },
  plugins: [],
};

const mockOptions = {
  dir: "",
  defaultLoaders: { babel: { options: {} } },
  dev: false,
  isServer: false,
};

test("Check for success when called without arguments", t => {
  t.plan(1);

  const nextConfig = withAwesomeTypescript();
  nextConfig.webpack(mockWebpackConfig, mockOptions);

  t.pass();
});

test("Check for success when called with withSourceMaps", t => {
  t.plan(1);

  const nextConfig = withAwesomeTypescript(withSourceMaps());
  nextConfig.webpack(mockWebpackConfig, mockOptions);

  t.pass();
});

test("Check for success when called with custom config", t => {
  t.plan(1);

  const nextConfig = withAwesomeTypescript({
    assetPrefix: "testprefix",
    webpack(config, options) {
      return config;
    },
  });
  nextConfig.webpack(mockWebpackConfig, mockOptions);

  t.pass();
});
