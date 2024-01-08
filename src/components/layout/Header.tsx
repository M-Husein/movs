import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import { Link } from 'react-router-dom';
import { useGetIdentity, useGetLocale, useSetLocale, useTranslate, useActiveAuthProvider, useLogout, useWarnAboutChange } from "@refinedev/core";
import { RefineThemedLayoutV2HeaderProps } from "@refinedev/mui"; // HamburgerMenu, 
import i18n from "i18next";
import { useContext, useState } from "react";
import { ColorModeContext } from "@/contexts/color-mode";
import { Search } from './Search';

type IUser = {
  id: number | string;
  name: string;
  email: string;
  avatar?: string;
};

const LANGUAGE: any = {
  en: "English",
  id: "Indonesia",
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { mode, setMode } = useContext(ColorModeContext);
  const { data: user } = useGetIdentity<IUser>();
  const authProvider = useActiveAuthProvider();
  const { mutate: mutateLogout } = useLogout({
    v3LegacyAuthProviderCompatible: !!authProvider?.isLegacy,
  });
  const { warnWhen, setWarnWhen } = useWarnAboutChange();
  const translate = useTranslate();
  const changeLanguage = useSetLocale();
  const locale = useGetLocale();
  const currentLocale = locale();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(e.currentTarget);
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }

  const handleLogout = () => {
    if (warnWhen) {
      const confirm = window.confirm(translate("warnWhenUnsavedChanges"));
      if (confirm) {
        setWarnWhen(false);
        mutateLogout();
      }
    } else {
      mutateLogout();
    }
  }

  return (
    <AppBar position={sticky ? "sticky" : "relative"}>
      <Toolbar className="max-w-screen-xl w-full mx-auto">
        <Stack direction="row" width="100%" alignItems="center">
          {/* <HamburgerMenu /> */}

          <Typography
            variant="h6"
            component={Link}
            to="/"
            className="no-underline text-white"
          >
            <img
              alt={import.meta.env.VITE_APP_NAME}
              width={40}
              height={40}
              src="/images/logos/logo.png"
              className="align-middle"
            />
          </Typography>

          <Search />

          <Stack
            direction="row"
            width="100%"
            justifyContent="flex-end"
            alignItems="center"
            gap="16px"
          >
            <Typography
              component={Link}
              to="/favorites"
              className="no-underline text-white"
            >
              Favorites
            </Typography>

            <FormControl>
              <Select
                disableUnderline
                autoWidth
                defaultValue={currentLocale}
                variant="standard"
                sx={{
                  color: "inherit",
                  ".MuiSelect-select": {
                    padding: '0 !important',
                    minWidth: '0 !important',
                  },
                  "& .MuiSvgIcon-root": {
                    display: 'none'
                  },
                  "& .MuiStack-root > .MuiTypography-root": {
                    display: 'none'
                  },
                  ".MuiAvatar-root": {
                    marginRight: 0,
                  },
                }}
              >
                {[...(i18n.languages ?? [])].sort().map((lang: string) => (
                  // @ts-ignore
                  <MenuItem
                    selected={currentLocale === lang}
                    key={lang}
                    defaultValue={lang}
                    onClick={() => {
                      changeLanguage(lang);
                    }}
                    value={lang}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Avatar
                        sx={{
                          width: "24px",
                          height: "24px",
                          marginRight: "9px",
                        }}
                        src={`/images/flags/${lang}.svg`}
                      />
                      <Typography>
                        {LANGUAGE[lang]}
                      </Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <IconButton
              color="inherit"
              onClick={() => {
                setMode()
              }}
            >
              {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
            </IconButton>

            {(user?.avatar || user?.name) && (
              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src={user?.avatar} alt={user?.name} />
                </IconButton>
                <Menu
                  variant="menu"
                  sx={{ mt: '40px' }}
                  id="menu-user"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  // keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={!!anchorElUser}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
