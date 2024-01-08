import { HttpError, useGetLocale, useList } from "@refinedev/core";

export const useGenres = () => {
  const locale = useGetLocale();
  const currentLocale = locale();

  const {
    data,
    isLoading,
    isFetching,
    isRefetching,
  } = useList<any, HttpError>({
    queryOptions: {
      retry: false,
    },
    pagination: { mode: "off" },
    resource: "genre/movie/list",
    meta: {
      params: {
        language: currentLocale,
      }
    },
  });

  return {
    data,
    isLoading,
    isFetching,
    isRefetching,
    joinGenre: (genres: any) => { // @ts-ignore
      const options = data?.genres || [];
      return (genres || []).map((genre: any) => options.find((item: any) => item.id === genre)?.name).join(" • ")
    }
  };
}
