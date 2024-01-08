import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useGetIdentity, useNotification } from "@refinedev/core";
import { db } from '@/utils/db';

export const ButtonAddFavorite = ({
  data,
  ...etc
}: any) => {
  const { data: user } = useGetIdentity<any>();
  const { open: openNotif } = useNotification();

  const notifOk = () => {
    openNotif?.({
      type: "success",
      message: "Success",
      description: "Saved to favorite",
    });
  }

  const addFavorite = async () => {
    const { id: movieId, title, original_title, backdrop_path, poster_path, genre_ids } = data;
    const userId = user.id;

    try {
      const checkAvailable = await db.favorites
        .where('userId').equals(userId)
        .and((mov: any) => mov.movieId === movieId)
        .limit(1).toArray();

      if(checkAvailable?.length){
        notifOk()
      }else{
        const save = await db.favorites.add({
          userId,
          movieId,
          title: title || original_title,
          backdrop_path,
          poster_path,
          genre_ids,
        });

        if(save){
          notifOk()
        }
      }
    }catch(e){
      // 
    }
  }

  return (
    <Button 
      {...etc}
      onClick={addFavorite}
      variant="contained"
      title="Add to favorite"
    >
      <AddIcon />
    </Button>
  )
}
