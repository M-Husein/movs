import { NotificationProvider } from "@refinedev/core";
import { useSnackbar } from "notistack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import UndoOutlined from "@mui/icons-material/UndoOutlined";
import { CircularDeterminate } from "@/components/CircularDeterminate";
import { styled } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

export const notificationProvider = (): NotificationProvider => {
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  const anchorOrigin: any = {
    vertical: "bottom",
    horizontal: "left",
  };

  const notificationProvider: NotificationProvider = {
    open: ({
      message,
      type,
      undoableTimeout,
      key,
      cancelMutation,
      description,
    }) => {
      if (type === "progress") {
        const action = (key: any) => (
          <IconButton
            onClick={() => {
              cancelMutation?.();
              closeSnackbar(key);
            }}
            color="inherit"
          >
            <UndoOutlined />
          </IconButton>
        );
        enqueueSnackbar(
            <>
              <CircularDeterminate
                undoableTimeout={undoableTimeout ?? 0}
                message={message}
              />
            </>,
            {
              action,
              anchorOrigin,
              preventDuplicate: true,
              key,
              autoHideDuration: (undoableTimeout ?? 0) * 1e3,
              disableWindowBlurListener: true,
            },
        );
      } else {
        enqueueSnackbar(
          <Box>
            <Typography variant="subtitle2" component="h6">
              {description}
            </Typography>
            <Typography variant="caption" component="p">
              {message}
            </Typography>
          </Box>,
          {
            key,
            variant: type,
            anchorOrigin,
            disableWindowBlurListener: true,
          },
        );
      }
    },
    close: (key) => {
      closeSnackbar(key);
    },
  };

  return notificationProvider;
};

export const RefineSnackbarProvider = styled(SnackbarProvider)`
  &.SnackbarItem-contentRoot {
    background-color: ${(props) => props.theme.palette.background.default};
    color: ${(props) => props.theme.palette.primary.main};
  }
  &.SnackbarItem-variantSuccess {
    background-color: ${(props) => props.theme.palette.info.main};
    color: ${(props) => props.theme.palette.info.contrastText};
  }
  &.SnackbarItem-variantError {
    background-color: ${(props) => props.theme.palette.error.main};
    color: ${(props) => props.theme.palette.error.contrastText};
  }
  &.SnackbarItem-variantInfo {
    background-color: ${(props) => props.theme.palette.info.main};
    color: ${(props) => props.theme.palette.info.contrastText};
  }
  &.SnackbarItem-variantWarning {
    background-color: ${(props) => props.theme.palette.warning.main};
    color: ${(props) => props.theme.palette.warning.contrastText};
  }
`;
