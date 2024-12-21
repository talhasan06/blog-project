export type TErrorSources = {
  path: string | number | undefined;
  message: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};

export type TErrorResponse = {
  success: boolean;
  message: string;
  statusCode: number;
  error: {
    details: unknown;
  };
  stack?: string;
};
