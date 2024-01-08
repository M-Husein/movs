import { useState } from 'react';
import { useDocumentTitle } from "@refinedev/react-router-v6";
import { useLiveQuery } from "dexie-react-hooks";
import { useGetIdentity } from "@refinedev/core";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { useGenres } from '@/utils/hooks/useGenres';
import { db } from '@/utils/db';

export default function Page(){
  const TITLE = "Favorites";

  useDocumentTitle(TITLE + " • " + import.meta.env.VITE_APP_NAME);

  const { data: user } = useGetIdentity<any>();
  const { isLoading, isFetching, isRefetching, joinGenre } = useGenres();
  const [dataToRemove, setDataToRemove] = useState<any>();

  const dataFavorites = useLiveQuery(async () => {
    return await db.favorites.where("userId").equals(user.id).toArray();
  });

  const removeItem = async () => {
    await db.favorites.where("id").equals(dataToRemove.id).delete()
    closeDialog()
  }

  const closeDialog = () => {
    setDataToRemove(null)
  }

  return (
    <div className="max-w-screen-xl mx-auto p-4 lg_px-5">
      <h1 className="text-2xl">{TITLE}</h1>

      {dataFavorites?.length ?
        <Grid 
          container 
          spacing={{ xs: 2, md: 3 }} 
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {dataFavorites?.map((item: any) => (
            <Grid 
              key={item.id} 
              item 
              xs={2} 
              sm={4} 
              md={3} 
              component="article"
            >
              <Card className="h-full flex flex-col relative">
                <Link to={"/movie/" + item.id} className="no-underline">
                  <CardMedia
                    component="img"
                    alt={item.title || item.original_title}
                    loading="lazy"
                    decoding="async"
                    image={"https://image.tmdb.org/t/p/w500" + item.backdrop_path}
                    className="aspect-video bg-slate-300"
                    onLoad={(e: any) => e.target.classList.remove('bg-slate-300')}
                  />
                </Link>

                <Button
                  onClick={() => setDataToRemove(item)}
                  color="error"
                  variant="contained"
                  size="small"
                  title="Remove"
                  sx={{ minWidth: 32, width: 32, position: 'absolute', top: 9, right: 9, zIndex: 1, borderRadius: '50%' }}
                >
                  <CloseIcon />
                </Button>

                <CardContent className="h-full flex flex-col">
                  <h1 className="text-base line-clamp-2 body-color">
                    <Link 
                      to={"/movie/" + item.id}
                      className="no-underline body-color"
                      title={item.title || item.original_title}
                    >
                      {item.title || item.original_title}
                    </Link>
                  </h1>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    className="line-clamp-3"
                    sx={{ mt: 'auto' }}
                  >
                    {item.overview}
                  </Typography>
                </CardContent>

                <CardActions>
                  {isLoading || isFetching || isRefetching ?
                    <Skeleton width="60%" />
                    :
                    <div className="text-xs">
                      {joinGenre(item.genre_ids)}
                    </div>
                  }
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        :
        <Alert severity="info">
          <AlertTitle sx={{ fontWeight: 700 }}>No data</AlertTitle>
          You don't have a favorite, please add your favorite movie.
        </Alert>
      }

      <Dialog
        open={!!dataToRemove}
        onClose={closeDialog}
        aria-labelledby="confirm-title"
      >
        <DialogTitle id="confirm-title">
          Are you sure to remove this data?
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={removeItem} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
