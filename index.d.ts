import * as AwesomeTypescriptLoaderInterfaces from "awesome-typescript-loader/dist/interfaces";

type NextConfiguration = any;

export = withAwesomeTypescript;

declare function withAwesomeTypescript(
  nextOptions:
    { awesomeTypescriptOptions?: withAwesomeTypescript.AwesomeTypescriptOptions }
    & NextConfiguration
}): NextConfiguration;

declare namespace withAwesomeTypescript {
  interface AwesomeTypescriptOptions {
    useCheckerPlugin?: boolean;
    loaderOptions?: AwesomeTypescriptLoaderInterfaces.LoaderConfig;
  }
}
