import { useRef, useState, useDeferredValue, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import { Link } from 'react-router-dom';
import { HttpError, useGetLocale, useList } from "@refinedev/core";
import debounce from 'lodash/debounce';

export function Search(){
  const locale = useGetLocale();
  const currentLocale = locale();

  const hint = useRef<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [searching, setSearching] = useState<boolean>(false);
  const deferredInputValue = useDeferredValue(inputValue);

  const debouncedSearch = useCallback(debounce((val: string) => {
    setSearching(!!val.trim().length)
  }, 500), []);

  const doSearch = (e: any) => {
    const val = e.target.value;
    setInputValue(val);
    debouncedSearch(val);
  }

  const {
    data: dataSearch,
    isLoading: isLoadingSearch,
    isFetching: isFetchingSearch,
    isRefetching: isRefetchingSearch,
  } = useList<any, HttpError>({
    queryOptions: {
      retry: false,
      enabled: searching,
    },
    pagination: { mode: "off" },
    resource: "search/movie",
    meta: {
      params: {
        language: currentLocale,
        query: deferredInputValue,
      }
    },
  });

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'searchMain',
    options: dataSearch?.results || [],
    getOptionLabel: (option: any) => option.title || option.original_title,
    inputValue: deferredInputValue,
    filterOptions: (options, state) => {
      return options.filter((option) =>
        (option.title || option.original_title)
          .toLowerCase()
          .trim()
          .includes(state.inputValue.toLowerCase().trim()),
      );
    }
  });

  return (
    <>
      <div 
        {...getRootProps()} 
        className="relative ml-4 max-md_searchMainWrap"
      >
        <TextField
          size="small"
          className="searchMain"
          placeholder="Search"
          sx={{ width: 350 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {deferredInputValue.length && (isLoadingSearch || isFetchingSearch || isRefetchingSearch) ?
                  <CircularProgress size={24} sx={{ color: '#fff' }} />
                  :
                  <SearchIcon />
                }
              </InputAdornment>
            ),
            endAdornment: !!deferredInputValue.length && (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setInputValue('')}
                >
                  <CloseIcon sx={{ color: '#fff' }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputProps={getInputProps()}
          onChange={doSearch}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              if (hint.current) {
                e.preventDefault();
                setInputValue(hint.current);
              }
            }
          }}
          onBlur={() => {
            hint.current = '';
          }}
        />

        {!!groupedOptions.length && (
          <List
            {...getListboxProps()}
            component="nav"
            sx={{ 
              position: 'absolute', 
              left: 0, 
              right: 0, 
              top: '100%', 
              width: '100%', 
              overflowY: 'auto',
              maxHeight: 550,
              overscrollBehavior: 'contain',
              bgcolor: 'background.paper'
            }}
            className="shadow-lg"
          >
            {groupedOptions.map((option: any, index: number) => ( // @ts-ignore
              <ListItemButton
                {...getOptionProps({ option, index })}
                key={option.id + index}
                component={Link} 
                to={"/movie/" + option.id}
                // sx={{ color: '#333' }}
                className="body-color"
              >
                <ListItemAvatar>
                  {option.backdrop_path ?
                    <img
                      width={47}
                      height={47}
                      loading="lazy"
                      decoding="async"
                      alt={option.title || option.original_title}
                      src={"https://image.tmdb.org/t/p/w500" + option.backdrop_path}
                      className="bg-slate-300 block text-0 object-cover rounded-lg"
                      onLoad={(e: any) => e.target.classList.remove('bg-slate-300')}
                    />
                    :
                    <div
                      style={{ width: 47, height: 47 }}
                      className="bg-slate-300 rounded-lg"
                    />
                  }
                </ListItemAvatar>
                <ListItemText 
                  primary={option.title || option.original_title} 
                  secondary={option.release_date}
                />
              </ListItemButton>
            ))}
          </List>
        )}
      </div>

      <IconButton 
        component="label"
        htmlFor="searchMain"
        aria-label="Search" 
        className="lg_!hidden" 
        sx={{ mx: 1 }}
        tabIndex={-1}
      >
        <SearchIcon sx={{ color: '#fff' }} />
      </IconButton>
    </>
  )
}
