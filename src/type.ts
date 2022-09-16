export type CommonObj = Record<string, CommonObj | CommonArray | CommonResponseType>;
export type CommonArray = Array<any>;
export type CommonResponseType = String | Boolean | Number | null | undefined | Symbol | CommonObj | CommonArray;

export interface CusResponse<T = any, D = any> {
  data: T;
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
  request?: any;
  [propName: string]: any;
  code?: number;
  errorStr?: string;
}

export interface HttpResponse<T> extends Promise<CusResponse<T>> {}
