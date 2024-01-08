import { HttpError, useGetLocale, useList } from "@refinedev/core";
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useGenres } from '@/utils/hooks/useGenres';
import { ButtonAddFavorite } from '@/components/ButtonAddFavorite';
import { CommonSlider } from '@/components/CommonSlider';

export default function Page(){
  const locale = useGetLocale();
  const currentLocale = locale();
  const { data: dataGenre, joinGenre } = useGenres();

  const {
    data: dataNowPlaying,
    isLoading: isLoadingNowPlaying,
    isFetching: isFetchingNowPlaying,
    isRefetching: isRefetchingNowPlaying,
  } = useList<any, HttpError>({
    queryOptions: {
      retry: false,
      enabled: !!dataGenre,
    },
    pagination: { mode: "off" },
    resource: "movie/now_playing",
    meta: {
      params: {
        language: currentLocale,
      }
    },
  });

  const {
    data: dataUpcoming,
    isLoading: isLoadingUpcoming,
    isFetching: isFetchingUpcoming,
    isRefetching: isRefetchingUpcoming,
  } = useList<any, HttpError>({
    queryOptions: {
      retry: false,
      enabled: !!dataGenre,
    },
    pagination: { mode: "off" },
    resource: "movie/now_playing",
    meta: {
      params: {
        language: currentLocale,
      }
    },
  });

  const {
    data: dataPopular,
    isLoading: isLoadingPopular,
    isFetching: isFetchingPopular,
    isRefetching: isRefetchingPopular,
  } = useList<any, HttpError>({
    queryOptions: {
      retry: false,
      enabled: !!dataGenre,
    },
    pagination: { mode: "off" },
    resource: "movie/popular",
    meta: {
      params: {
        language: currentLocale,
      }
    },
  });

  const {
    data: dataTopRated,
    isLoading: isLoadingTopRated,
    isFetching: isFetchingTopRated,
    isRefetching: isRefetchingTopRated,
  } = useList<any, HttpError>({
    queryOptions: {
      retry: false,
      enabled: !!dataGenre,
    },
    pagination: { mode: "off" },
    resource: "movie/top_rated",
    meta: {
      params: {
        language: currentLocale,
      }
    },
  });

  const loadingNowPlaying = isLoadingNowPlaying || isFetchingNowPlaying || isRefetchingNowPlaying;
  const loadingUpcoming = isLoadingUpcoming || isFetchingUpcoming || isRefetchingUpcoming;

  const removeMediaLoading = (e: any) => {
    e.target.classList.remove('bg-slate-300')
  }

  return (
    <div className="max-w-screen-xl mx-auto py-4 lg_px-5">
      <Grid container spacing={4}>
        <Grid item lg={9} xs={12}>
          <div className="relative aspect-video mb-8">
            {loadingNowPlaying ?
              <div className="aspect-video bg-slate-300 rounded-lg" />
              :
              <Swiper
                loop
                navigation
                centeredSlides
                autoplay={{
                  delay: 7e3,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                modules={[Navigation, Autoplay]}
                className="aspect-video rounded-lg"
              >
                {(dataNowPlaying?.results || []).map((item: any) =>
                  <SwiperSlide key={item.id}>
                    <article className="relative w-full h-full bg-dark-bottom">
                      <Link to={"/movie/" + item.id} className="link-drop">
                        <img
                          loading="lazy"
                          decoding="async"
                          alt={item.title || item.original_title}
                          src={"https://image.tmdb.org/t/p/original" + item.backdrop_path}
                          className="block text-0 w-full h-full object-cover aspect-video bg-slate-300"
                          onLoad={removeMediaLoading}
                        />
                      </Link>

                      <div className="flex items-end justify-end absolute bottom-0 left-0 right-0 p-4 bg-dark-bottom pointer-events-none">
                        <div className="flex-none mr-4 pointer-events-auto relative max-md_hidden">
                          <img
                            loading="lazy"
                            decoding="async"
                            alt={item.title || item.original_title}
                            src={"https://image.tmdb.org/t/p/original" + item.poster_path}
                            className="bg-slate-300 block text-0 object-cover shadow-lg rounded-lg border-2 border-gray-100"
                            onLoad={removeMediaLoading}
                            width={135}
                            height={202}
                          />

                          <ButtonAddFavorite
                            data={item}
                            size="small"
                            sx={{ minWidth: 32, width: 32, position: 'absolute', top: 9, right: 9, zIndex: 1, borderRadius: '50%' }}
                          />
                        </div>
                        
                        <div className="grow text-left flex items-center text-white">
                          <PlayCircleOutlineIcon sx={{ fontSize: 82 }} className="homePlayIcon" />

                          <div className="text-3xl ml-4">
                            {item.title || item.original_title}

                            <div className="text-gray-300 text-lg mt-2">Watch the Trailer</div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </SwiperSlide>
                )}
              </Swiper>
            }
          </div>

          <CommonSlider
            title="Popular"
            loading={isLoadingPopular || isFetchingPopular || isRefetchingPopular}
            data={dataPopular?.results}
            joinGenre={joinGenre}
          />

          <CommonSlider
            title="Top Rated"
            loading={isLoadingTopRated || isFetchingTopRated || isRefetchingTopRated}
            data={dataTopRated?.results}
            joinGenre={joinGenre}
          />
        </Grid>

        <Grid item lg={3} xs={12} component="aside">
          <div className="max-md_px-4">
            <h2 className="text-xl">Upcoming Movies</h2>
            <List>
              {loadingUpcoming ?
                [1, 2, 3].map((item: number) =>
                  <ListItem key={item} alignItems="flex-start" sx={{ padding: 0 }}>
                    <ListItemAvatar>
                      <Skeleton variant="rectangular" width={72} height={108} className="rounded-lg" />
                    </ListItemAvatar>
                    <div className="pl-3 w-full">
                      <Skeleton />
                      <Skeleton width="60%" />
                    </div>
                  </ListItem>
                )
                :
                (dataUpcoming?.results || []).map((item: any) => (
                  <ListItem key={item.id} alignItems="flex-start" sx={{ padding: 0 }}>
                    <ListItemAvatar className="relative">
                      <Link to={"/movie/" + item.id}>
                        <img
                          alt={item.title || item.original_title}
                          width={72}
                          height={108}
                          loading="lazy"
                          decoding="async"
                          src={"https://image.tmdb.org/t/p/original" + item.poster_path}
                          className="bg-slate-300 object-cover rounded-lg block text-0"
                          onLoad={removeMediaLoading}
                        />
                      </Link>
                      <ButtonAddFavorite
                        data={item}
                        size="small"
                        sx={{ minWidth: 32, width: 32, borderRadius: '50%', position: 'absolute', top: 0, right: 0, zIndex: 1 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      className="pl-3"
                      primary={
                        <Link 
                          to={"/movie/" + item.id}
                          className="no-underline body-color"
                          title={item.title || item.original_title}
                        >
                          {item.title || item.original_title}
                        </Link>
                      }
                      secondary={
                        <span className="text-xs mt-1">
                          {joinGenre(item.genre_ids)}
                        </span>
                      }
                    />
                  </ListItem>
                ))
              }
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
