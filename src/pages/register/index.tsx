import { useForm } from "@refinedev/react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import MuiLink from "@mui/material/Link";
import {
  RegisterFormTypes,
  useActiveAuthProvider,
  BaseRecord,
  HttpError,
  useTranslate,
  useRouterContext,
  useRouterType,
  useLink,
  useRegister,
  useLogin,
} from "@refinedev/core";
import { ContentCopyRounded } from "@mui/icons-material";

// type RegisterVariables = {
//   email: string;
//   name: string;
//   password: string;
//   providerName: string;
// };

const RegisterPage: React.FC<any> = ({
  loginLink,
  wrapperProps,
  contentProps,
  renderContent,
  providers,
  formProps,
  hideForm,
}) => {
  const { onSubmit, ...useFormProps } = formProps || {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BaseRecord, HttpError, RegisterFormTypes>({
    ...useFormProps,
  });

  const authProvider = useActiveAuthProvider();
  const { mutate: registerMutate, isLoading } = useRegister<RegisterFormTypes>({
    v3LegacyAuthProviderCompatible: !!authProvider?.isLegacy,
  });
  const { mutate: login, isLoading: isLoadingLogin } = useLogin<any>({
    v3LegacyAuthProviderCompatible: !!authProvider?.isLegacy,
  });
  const translate = useTranslate();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          <Stack spacing={1}>
            {providers.map((provider: any) => {
              return (
                <Button
                  key={provider.name}
                  color="secondary"
                  fullWidth
                  variant="outlined"
                  sx={{
                    color: "primary.light",
                    borderColor: "primary.light",
                    textTransform: "none",
                  }}
                  onClick={() =>
                    registerMutate({ // @ts-ignore
                      name: 'John Doe',
                      email: 'john.doe@email.com',
                      password: 'password',
                      providerName: provider.name,
                    })
                  }
                  startIcon={provider.icon}
                >
                  {provider.label}
                </Button>
              );
            })}
          </Stack>

          {!hideForm && (
            <Divider
              sx={{
                fontSize: "12px",
                marginY: "16px",
              }}
            >
              {translate("pages.login.divider")}
            </Divider>
          )}
        </>
      );
    }
    return null;
  };

  const Content = (
    <Card {...(contentProps ?? {})}>
      <CardContent sx={{ p: "32px", "&:last-child": { pb: "32px" } }}>
        <Typography
          component="h1"
          variant="h5"
          align="center"
          color="primary"
          fontWeight={700}
          sx={{
            textAlign: "center",
            fontSize: "24px",
            marginBottom: "24px",
            overflowWrap: "break-word",
            hyphens: "manual",
            textOverflow: "unset",
            whiteSpace: "pre-wrap",
          }}
        >
          {translate("pages.register.title")}
        </Typography>

        {renderProviders()}
          
        {!hideForm && (
          <Box
            component="form"
            onSubmit={handleSubmit((data) => {
              console.log('data: ', data)
              if (onSubmit) {
                return onSubmit(data);
              }
              return registerMutate(data, {
                onSuccess: (state: any) => {
                  if(state.success){
                    login(data);
                  }
                },
              });
            })}
          >
            <TextField
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              id="email"
              margin="normal"
              fullWidth
              label="Email"
              error={!!errors.email}
              helperText={
                errors["email"] ? errors["email"].message : ""
              }
              name="email"
              autoComplete="email"
              sx={{
                mt: 0,
              }}
            />

            <TextField // @ts-ignore
              {...register("name", {
                required: true,
                pattern: {
                  value: /^\S(.*\S)?$/,
                  message: "No leading and trailing whitespace"
                },
              })}
              id="name"
              margin="normal"
              fullWidth
              label="Name" // @ts-ignore
              error={!!errors.name}
              helperText={ // @ts-ignore
                errors["name"] ? errors["name"].message : ""
              }
              name="name"
              autoComplete="name"
            />

            <TextField
              {...register("password", {
                required: true,
              })}
              id="password"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              helperText={
                errors["password"]
                  ? errors["password"].message
                  : ""
              }
              error={!!errors.password}
              type="password"
              autoComplete="current-password"
              sx={{
                mb: 0,
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: "24px",
              }}
            >
              Sign up
            </Button>
          </Box>
        )}
        
        {loginLink ?? (
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{
              mt: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              component="span"
              fontSize="14px"
            >
              {translate("pages.login.buttons.haveAccount")}
            </Typography>
            <MuiLink
                ml="4px"
                variant="body2"
                color="primary"
                component={ActiveLink}
                underline="none"
                to="/login"
                fontSize="14px"
                fontWeight="bold"
            >
              {translate("pages.login.signin")}
            </MuiLink>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box 
      component="div" 
      {...(wrapperProps ?? {})}
      sx={{
        backgroundImage: 'url("images/movie_poster_mix.jpg")',
      }}
    >
      <Container
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: hideForm ? "flex-start" : "center",
          alignItems: "center",
          minHeight: "100dvh",
          padding: "16px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            paddingTop: hideForm ? "15dvh" : 0,
          }}
        >
          {renderContent ? (
            renderContent(ContentCopyRounded)
          ) : (
            Content
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;
