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
import { socialProviders } from '@/providers/socialProviders';

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
    return (
      <>
        {!hideForm && (
          <Divider
            sx={{
              fontSize: "18px",
              marginY: "16px",
            }}
          >
            {translate("pages.login.divider")}
          </Divider>
        )}

        <Stack spacing={1}>
          {socialProviders.map((Provider: any) => {
            return (
              <Button
                key={Provider.name}
                color="secondary"
                fullWidth
                variant="outlined"
                sx={{
                  color: "primary.light",
                  borderColor: "primary.light",
                  textTransform: "none",
                }}
                onClick={() =>
                  registerMutate({ 
                    // Static register data
                    // @ts-ignore
                    name: 'Jane Doe',
                    email: 'jane.doe@email.com',
                    password: 'password',
                    providerName: Provider.name,
                  })
                }
                startIcon={<Provider.icon />}
              >
                {Provider.label}
              </Button>
            );
          })}
        </Stack>
      </>
    );
  };

  const Content = (
    <>
      <img
        width={85}
        alt={import.meta.env.VITE_APP_NAME}
        src="/images/logos/logo-96x96.png"
        className="shadow-md rounded-full border-4 border-white relative block -mb-10 mx-auto"
      />

      <Card {...(contentProps ?? {})}>
        <CardContent sx={{ p: "32px", pt: 7, "&:last-child": { pb: "32px" } }}>
          <p className="text-sm bg-orange-100 bg-theme p-2 rounded-lg border border-orange-300">
            Pay attention: this is not the original sign in. Don't insert your real credentials here!
          </p>
            
          {!hideForm && (
            <Box
              component="form"
              onSubmit={handleSubmit((data) => {
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

          {renderProviders()}
          
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
    </>
  );

  return (
    <Box 
      component="div" 
      {...(wrapperProps ?? {})}
      sx={{
        backgroundImage: 'url("images/movie_poster_mix.jpg")',
      }}
    >
      <Box sx={{ backgroundColor: 'rgba(0,0,0,.2)' }}>
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
    </Box>
  );
};

export default RegisterPage;
