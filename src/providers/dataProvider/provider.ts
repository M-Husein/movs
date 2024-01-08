import { AxiosInstance } from "axios";
import { DataProvider } from "@refinedev/core";
import { httpRequest, generateSort, generateFilter } from "./utils";
import i18n from "@/i18n";

class CustomError extends Error {
  constructor(name: string, message: string, cause?: any) {
    super(message);
    this.name = name;
    this.cause = cause;
  }
}

type MethodTypes = "get" | "delete" | "head" | "options";
type MethodTypesWithBody = "post" | "put" | "patch";
type MethodCommons = "get" | "post" | "put" | "patch";

export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = httpRequest,
): DataProvider => {
  const setupHeaders = (headersFromMeta: any) => {
    const token = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
    httpClient.defaults.headers.common.Authorization = token ? 'Bearer ' + token : '';

    if (headersFromMeta) {
      httpClient.defaults.headers = {
        ...httpClient.defaults.headers,
        ...headersFromMeta,
      };
    }
  }

  return {
    getList: async ({ resource, pagination, filters, sorters, meta }) => {
      const url = apiUrl + '/' + resource;
  
      const {
        current = 1,
        pageSize = 10,
        mode = "server",
      } = pagination ?? {};
  
      const { headers: headersFromMeta, method, payload, queryContext, params, ...requestOptions } = meta ?? {};
      const requestMethod = (method as MethodCommons) ?? "get";
  
      setupHeaders(headersFromMeta);
  
      try {
        const signal = queryContext?.signal; // For abort request
  
        let response;
        switch (method) {
          case "put":
          case "post":
          case "patch":
            response = await httpClient[requestMethod](url, payload, { signal, params, ...requestOptions });
            break;
          default:
            const queryFilters = generateFilter(filters);
            
            const query: {
              _start?: number;
              _end?: number;
              _sort?: string;
              _order?: string;
            } = {};

            if (mode === "server") {
              query._start = (current - 1) * pageSize;
              query._end = current * pageSize;
            }

            const generatedSort = generateSort(sorters);
            if (generatedSort) {
              const { _sort, _order } = generatedSort;
              query._sort = _sort.join(",");
              query._order = _order.join(",");
            }
            
            response = await httpClient.get(url, { signal, params: { ...params, ...query, ...queryFilters } });
            break;
        }
        
        const { data, headers } = response;
  
        if(data){
          return {
            ...data,
            total: +headers["x-total-count"] || data?.length || data?.results?.length,
          };       
        }
  
        throw new CustomError('ReadError', i18n.t('error.unspecific'), data);
      } catch(e){
        throw e;
      }
    },
  
    getMany: async ({ resource, ids, meta }) => {
      const { headers, method, queryContext, params, ...requestOptions } = meta ?? {};
      const requestMethod = (method as MethodTypes) ?? "get";
  
      setupHeaders(headers);
  
      try {
        const { data } = await httpClient[requestMethod](
          apiUrl + '/' + resource,
          { signal: queryContext?.signal, params: { ...params, id: ids }, ...requestOptions }
        );
        
        if(data){
          return data;
        }
  
        throw new CustomError('ReadError', i18n.t('error.unspecific'), data);
      } catch(e){
        throw e;
      }
    },
  
    create: async ({ resource, variables, meta }) => {
      const { headers, method, ...requestOptions } = meta ?? {};
      const requestMethod = (method as MethodCommons) ?? "post";
      
      setupHeaders(headers);
  
      try {
        const { data } = await httpClient[requestMethod](
          apiUrl + '/' + resource, 
          // @ts-ignore
          variables,
          /** @DEV : must check & test (use or not) */
          requestOptions
        );
  
        if(data){
          return data;
        }
  
        throw new CustomError('CreateError', i18n.t('error.unspecific'), data);
      } catch(e) {
        throw e;
      }
    },
  
    update: async ({ resource, id, variables, meta }) => {
      const { headers, method } = meta ?? {};
      const requestMethod = (method as MethodTypesWithBody) ?? "put";
  
      setupHeaders(headers);
  
      try {
        const { data } = await httpClient[requestMethod](
          `${apiUrl}/${resource}${id ? '/' + id : ''}`,
          variables,
        );
  
        if(data){
          return data;
        }
  
        throw new CustomError('UpdateError', i18n.t('error.unspecific'), data);
      } catch(e) {
        throw e;
      }
    },
  
    getOne: async ({ resource, id, meta }) => {
      const { headers, method, queryContext, ...requestOptions } = meta ?? {};
      const requestMethod = (method as MethodTypes) ?? "get";
  
      setupHeaders(headers);
  
      try {
        const { data } = await httpClient[requestMethod](
          `${apiUrl}/${resource}${id ? '/' + id : ''}`,
          { signal: queryContext?.signal, ...requestOptions }
        );
  
        if(data){
          return data;
        }
  
        throw new CustomError('ReadError', i18n.t('error.unspecific'), data);
      } catch(e) {
        throw e;
      }
    },
    
    deleteOne: async ({ resource, id, variables, meta }) => {
      const { headers, method } = meta ?? {};
      const requestMethod = (method as MethodTypesWithBody) ?? "delete";
  
      setupHeaders(headers);
  
      try {
        const { data } = await httpClient[requestMethod](
          `${apiUrl}/${resource}/${id}`, 
          {
            data: variables,
          },
        );
  
        if(data){
          return data;
        }
  
        throw new CustomError('DeleteError', i18n.t('error.failedDelete'), data);
      } catch(e){
        throw e;
      }
    },
  
    deleteMany: async ({ resource, ids, meta }) => {
      const { headers, method } = meta ?? {};
      const requestMethod = (method as MethodTypesWithBody) ?? "delete";
  
      setupHeaders(headers);
  
      try {
        const { data } = await httpClient[requestMethod](
          apiUrl + '/' + resource, 
          { data: ids },
        );
  
        if(data){
          return data;
        }
  
        throw new CustomError('DeleteManyError', i18n.t('error.unspecific'), data);
      } catch(e) {
        throw e;
      }
    },
  
    getApiUrl: () => {
      return apiUrl;
    },
  
    custom: async ({
      url,
      method,
      filters,
      sorters,
      payload,
      query,
      headers,
      meta: { queryContext, signal: abortSignal, params, ...requestOptions } = {},
    }) => {
      setupHeaders(headers);

      const signal = abortSignal || queryContext?.signal;
  
      try {
        let axiosResponse;
        switch (method) {
          case "put":
          case "post":
          case "patch":
            axiosResponse = await httpClient[method](url, payload, { signal, params, ...requestOptions });
            break;
          case "delete":
            axiosResponse = await httpClient.delete(url, {
              data: payload,
              signal,
            });
            break;
          default:
            let sortQuery = {};
            if (sorters) {
              const generatedSort = generateSort(sorters);
              if (generatedSort) {
                const { _sort, _order } = generatedSort;
                sortQuery = {
                  _sort: _sort.join(","),
                  _order: _order.join(","),
                };
              }
            }
        
            const filterQuery = filters ? generateFilter(filters) : {};

            axiosResponse = await httpClient.get(url, { signal, params: { ...params, ...filterQuery, ...sortQuery, ...query } });
            break;
        }
  
        const { data } = axiosResponse;
  
        if(data){
          return Promise.resolve(data);
        }
  
        throw new CustomError(method, i18n.t('error.unspecific'), data);
      } catch(e) {
        throw e;
      }
    },
  }
};
