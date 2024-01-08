import { useEffect, useState } from "react";
import { useDocumentTitle } from "@refinedev/react-router-v6";
import { HttpError, useGetLocale, useOne, useList, useParsed } from "@refinedev/core";
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { useGenres } from '@/utils/hooks/useGenres';
import { ButtonAddFavorite } from '@/components/ButtonAddFavorite';
import { CommonSlider } from '@/components/CommonSlider';
import { CastCrew } from './CastCrew';

export default function Page(){
  const locale = useGetLocale();
  const currentLocale = locale();
  const { id } = useParsed();
  const { data: dataGenre, joinGenre } = useGenres();

  useDocumentTitle("Movie • " + import.meta.env.VITE_APP_NAME);

  const [activeVideo, setActiveVideo] = useState<any>({});

  const {
    data,
    isLoading,
    isFetching,
    isRefetching,
  } = useOne<any, HttpError>({
    queryOptions: {
      retry: false,
      enabled: !!id,
    },
    resource: "movie",
    id,
    meta: {
      params: {
        language: currentLocale,
        append_to_response: "videos,images",
      }
    },
    successNotification: (data: any) => {
      setActiveVideo(
        data?.videos?.results.find((item: any) => item.type === 'Trailer')
      );
      return false;
    },
  });

  const {
    data: dataRecommedations,
    isLoading: isLoadingRecommedations,
    isFetching: isFetchingRecommedations,
    isRefetching: isRefetchingRecommedations,
  } = useList<any, HttpError>({
    queryOptions: {
      retry: false,
      enabled: !!dataGenre,
    },
    pagination: { mode: "off" },
    resource: "movie/" + id + "/recommendations",
    meta: {
      params: {
        language: currentLocale,
      }
    },
  });

  const {
    data: dataSimiliar,
    isLoading: isLoadingSimiliar,
    isFetching: isFetchingSimiliar,
    isRefetching: isRefetchingSimiliar,
  } = useList<any, HttpError>({
    queryOptions: {
      retry: false,
      enabled: !!dataGenre,
    },
    pagination: { mode: "off" },
    resource: "movie/" + id + "/similar",
    meta: {
      params: {
        language: currentLocale,
      }
    },
  });

  const loadingDetail = isLoading || isFetching || isRefetching;

  useEffect(() => {
    let lightbox: any;

    if(!loadingDetail && data){
      lightbox = new PhotoSwipeLightbox({
        gallery: '#imagesGallery',
        children: 'a',
        pswpModule: () => import('photoswipe'),
      });
  
      lightbox.init();
    }

    return () => {
      if(lightbox) lightbox.destroy();
    }
  }, [data, loadingDetail]);

  const removeMediaLoading = (e: any) => {
    e.target.classList.remove('bg-slate-300')
  }

  const styleSmallSlider: any = { // @ts-ignore
    '--swiper-navigation-size': '20px',
    '--swiper-navigation-top-offset': '40%',
    '--swiper-navigation-sides-offset': '5px',
  };

  const breakpoints = {
    640: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 25,
    },
  };

  const renderNoVideo = (text?: any) => (
    <div className="aspect-video bg-slate-300 lg_rounded-lg grid place-content-center text-lg text-gray-500">
      {text}
    </div>
  );

  const renderVideo = () => {
    if(activeVideo){
      switch(activeVideo.site){
        case "YouTube":
          return (
            <iframe
              title={activeVideo.name}
              src={"https://www.youtube.com/embed/" + activeVideo.key}
              className="w-full h-full bg-slate-300 lg_rounded-lg" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              loading="lazy"
              onLoad={removeMediaLoading}
            />
          )
        default:
          return (
            <img 
              loading="lazy"
              decoding="async"
              alt={activeVideo.name}
              src={"https://image.tmdb.org/t/p/original" + activeVideo.backdrop_path}
              className="bg-slate-300 block text-0 w-full h-full object-cover lg_rounded-lg"
              onLoad={removeMediaLoading}
            />
          );
      }
    }

    return renderNoVideo('No Video');
  }

  const renderVideos = () => { // @ts-ignore
    const videos = data?.videos?.results;
    if(videos?.length){
      return (
        <>
          <h3 className="text-lg mt-4 max-md_px-4">Other Video</h3>
          <Swiper
            navigation
            slidesPerView={2}
            spaceBetween={15}
            breakpoints={breakpoints}
            modules={[Navigation]}
            className="py-2"
            style={styleSmallSlider}
          >
            {videos.map((item: any) => (
              <SwiperSlide key={item.id}>
                <Card
                  className="w-full relative cursor-pointer"
                  onClick={() => setActiveVideo(item)}
                >
                  <CardMedia
                    component="img"
                    alt={item.title || item.original_title}
                    loading="lazy"
                    decoding="async"
                    image={"https://i.ytimg.com/vi/"  + item.key + "/hqdefault.jpg"}
                    className="bg-slate-300 aspect-video block text-0"
                    onLoad={removeMediaLoading}
                  />
                  <PlayCircleOutlineIcon 
                    fontSize="large" 
                    className={"absolute inset-0 m-auto rounded-full shadow-lg " + (activeVideo?.id === item.id ? "text-blue-500" : "text-white")}
                  />
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )
    }
  }

  const renderImages = () => { // @ts-ignore
    const dataImages = data?.images;
    const { backdrops, posters } = dataImages || {};
    const images = dataImages ? [...backdrops, ...posters] : [];

    if(images.length){
      return (
        <>
          <h3 className="text-lg mt-4 max-md_px-4">Images</h3>
          <Swiper
            navigation
            slidesPerView={2}
            spaceBetween={15}
            breakpoints={breakpoints}
            modules={[Navigation]}
            className="py-2"
            style={styleSmallSlider}
            id="imagesGallery"
          >
            {images.map((item: any, idx: number) => (
              <SwiperSlide key={item.file_path}>
                <Card
                  className="w-full h-full cursor-pointer"
                  component="a"
                  href={"https://image.tmdb.org/t/p/original" + item.file_path}
                  data-pswp-width={item.width}
                  data-pswp-height={item.height}
                >
                  <CardMedia
                    component="img"
                    alt={"" + idx + 1}
                    loading="lazy"
                    decoding="async"
                    image={"https://image.tmdb.org/t/p/w500" + item.file_path}
                    className="bg-slate-300 text-0 aspect-video"
                    sx={{ objectFit: item.aspect_ratio === 0.667 ? "contain" : undefined }}
                    onLoad={item.aspect_ratio !== 0.667 ? removeMediaLoading : undefined}
                  />
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )
    }
  }

  const renderValues = () => { // @ts-ignore
    const { popularity, vote_average, vote_count } = data || {};
    const values = data ? [
      { value: popularity, label: "Popularity" }, 
      { value: vote_average, label: "Vote Average" }, 
      { value: vote_count, label: "Vote Count" }] 
      : 
      [];
    return (
      <div className="my-4 max-md_px-4">
        <Grid container spacing={3}>
          {values.map((item: any, index: number) => (
            <Grid key={index} item xs={12} md={4} lg={4}>
              <div className="border rounded shadow p-4 text-center">
                <b>{item.label}</b>
                <div className="text-2xl font-bold">{item.value}</div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    )
  }

  return (
    <div className="max-w-screen-xl mx-auto py-4 lg_px-5">
      <Grid container spacing={4} className="max-md_!flex-col-reverse">
        <Grid item lg={9} xs={12}>
          <div className="aspect-video">
            {loadingDetail ?
              renderNoVideo()
              :
              renderVideo()
            }
          </div>

          {renderVideos()}

          {renderImages()}

          {renderValues()}

          <CastCrew
            id={id}
            enabled={dataGenre}
            language={currentLocale}
            onLoadImage={removeMediaLoading}
          />

          <CommonSlider
            title="Recommedations"
            loading={isLoadingRecommedations || isFetchingRecommedations || isRefetchingRecommedations}
            data={dataRecommedations?.results}
            joinGenre={joinGenre}
          />

          <CommonSlider
            title="Similar"
            loading={isLoadingSimiliar || isFetchingSimiliar || isRefetchingSimiliar}
            data={dataSimiliar?.results}
            joinGenre={joinGenre}
          />
        </Grid>

        <Grid item lg={3} xs={12} component="aside">
          <div className="max-md_px-4">
            {loadingDetail ? 
              <List sx={{ padding: 0 }}>
                <ListItem alignItems="flex-start" sx={{ padding: 0 }}>
                  <ListItemAvatar>
                    <Skeleton variant="rectangular" width={72} height={108} className="rounded-lg" />
                  </ListItemAvatar>
                  <div className="pl-3 w-full">
                    <Skeleton />
                    <Skeleton width="60%" />
                  </div>
                </ListItem>
              </List>
              :
              data && (
                <>
                  <List sx={{ padding: 0 }}>
                    <ListItem alignItems="flex-start" sx={{ padding: 0 }}>
                      <ListItemAvatar>
                        <img // @ts-ignore
                          alt={data.title || data.original_title}
                          width={90}
                          height={133}
                          loading="lazy"
                          decoding="async" // @ts-ignore
                          src={"https://image.tmdb.org/t/p/w500" + data.poster_path}
                          className="bg-slate-300 object-cover rounded-lg block text-0"
                          onLoad={removeMediaLoading}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        className="pl-3" // @ts-ignore
                        primary={<strong>{data.title || data.original_title}</strong>}
                        secondary={ // @ts-ignore
                          data.genres && (
                            <>
                              <span className="text-xs block my-2">
                                {/* @ts-ignore */}
                                {data.genres.map((item: any) => item.name).join(" • ")}
                              </span>
                              <time className="text-sm">
                                {/* @ts-ignore */}
                                {new Date(data.release_date).getFullYear()}
                              </time>

                              <ButtonAddFavorite // @ts-ignore
                                data={{ ...data, genre_ids: data.genres?.map((item: any) => item.id) }}
                                size="small"
                                sx={{ minWidth: 32, width: 32, borderRadius: '50%', float: 'right' }}
                              />
                            </>
                          )
                        }
                      />
                    </ListItem>
                  </List>

                  <hr />

                  <h2 className="text-xl">Synopsis</h2>

                  {/* @ts-ignore */}
                  <p className="mb-0">{data.overview}</p>
                </>
              )
            }
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
