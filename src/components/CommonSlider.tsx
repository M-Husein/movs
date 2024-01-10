import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import { ButtonAddFavorite } from '@/components/ButtonAddFavorite';

export const CommonSlider = ({
  title,
  loading,
  data,
  joinGenre,
}: any) => {
  if(loading){
    return (
      <>
        <Skeleton width="170px" className="mt-6" />
        <Grid container spacing={3}>
          {[1, 2, 3].map((item: number) => 
            <Grid key={item} item xs={4} className="!pt-0">
              <Skeleton className="aspect-video" />
            </Grid>
          )}
        </Grid>
      </>
    )
  }

  if(data?.length){
    return (
      <>
        <h2 className="text-xl mt-6 max-md_px-4">{title}</h2>
        <Swiper
          navigation
          slidesPerView={1}
          spaceBetween={25}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 25,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
          }}
          modules={[Navigation]}
          className="py-2"
          style={{ // @ts-ignore
            '--swiper-navigation-size': '25px',
            '--swiper-navigation-top-offset': '45%',
          }}
        >
          {data.map((item: any) => (
            <SwiperSlide key={item.id}>
              <Card className="w-full">
                <Link to={"/movie/" + item.id} className="no-underline">
                  {item.backdrop_path ?
                    <CardMedia
                      component="img"
                      alt={item.title || item.original_title}
                      loading="lazy"
                      decoding="async"
                      image={"https://image.tmdb.org/t/p/w500" + item.backdrop_path}
                      className="bg-slate-300 aspect-video block text-0"
                      onLoad={(e: any) => e.target.classList.remove('bg-slate-300')}
                    />
                    :
                    <div className="bg-slate-300 aspect-video grid place-content-center">
                      <b>No Image</b>
                    </div>
                  }
                </Link>

                <ButtonAddFavorite
                  data={item}
                  size="small"
                  sx={{ minWidth: 32, width: 32, position: 'absolute', top: 9, right: 9, zIndex: 1, borderRadius: '50%' }}
                />

                <div className="p-4">
                  <div className="text-base truncate">
                    <Link 
                      to={"/movie/" + item.id}
                      className="no-underline body-color"
                      title={item.title || item.original_title}
                    >
                      {item.title || item.original_title}
                    </Link>
                  </div>
                  <div className="text-xs mt-1">
                    {joinGenre(item.genre_ids)}
                  </div>
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  }

  return null;
}
