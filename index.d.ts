import * as AwesomeTypescriptLoaderInterfaces from "awesome-typescript-loader/dist/interfaces";

type NextConfiguration = any;

export = withAwesomeTypescript;

declare function withAwesomeTypescript(nextOptions: {
  awesomeTypescriptOptions?: withAwesomeTypescript.AwesomeTypescriptOptions,
  webpack?(config: NextConfiguration, options: any): NextConfiguration
}): NextConfiguration;

declare namespace withAwesomeTypescript {
  interface AwesomeTypescriptOptions {
    useCheckerPlugin?: boolean;
    loaderOptions?: AwesomeTypescriptLoaderInterfaces.LoaderConfig;
  }
}
