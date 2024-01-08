import { useForm } from "@refinedev/react-hook-form";
import { FormProvider } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import MuiLink from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import {
  LoginFormTypes,
  BaseRecord,
  HttpError,
  useActiveAuthProvider,
  useLogin,
  useTranslate,
  useRouterContext,
  useRouterType,
  useLink,
} from "@refinedev/core";

const LoginPage: React.FC<any> = ({
  providers,
  registerLink,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  hideForm,
}) => {
  const { onSubmit, ...useFormProps } = formProps || {};
  const methods = useForm<BaseRecord, HttpError, LoginFormTypes>({
    ...useFormProps,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const authProvider = useActiveAuthProvider();
  const { mutate: login, isLoading } = useLogin<LoginFormTypes>({
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
                  variant="outlined"
                  fullWidth
                  sx={{
                    color: "primary.light",
                    borderColor: "primary.light",
                    textTransform: "none",
                  }}
                  onClick={() =>
                    login({ providerName: provider.name })
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
    <Card 
      {...(contentProps ?? {})} 
    >
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
          {translate("pages.login.title")}
        </Typography>

        {renderProviders()}

        {!hideForm && (
          <Box
            component="form"
            onSubmit={handleSubmit((data) => {
              if (onSubmit) {
                return onSubmit(data);
              }
              return login(data);
            })}
          >
            <TextField
              {...register("email", {
                required: true,
              })}
              id="email"
              margin="normal"
              fullWidth
              label={translate("pages.login.fields.email")}
              error={!!errors.email}
              name="email"
              type="email"
              autoComplete="email"
              sx={{ mt: 0 }}
            />

            <TextField
              {...register("password", {
                required: true,
              })}
              id="password"
              margin="normal"
              fullWidth
              name="password"
              label={translate("pages.login.fields.password")}
              helperText={errors?.password?.message}
              error={!!errors.password}
              type="password"
              autoComplete="current-password"
              sx={{ mb: 0 }}
            />

            {/* <Box
              component="div"
              sx={{
                mt: "24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                sx={{
                  span: {
                    fontSize: "14px",
                    color: "text.secondary",
                  },
                }}
                color="secondary"
                control={
                  <Checkbox
                    size="small"
                    id="remember"
                    {...register("remember")}
                  />
                }
                label={translate("pages.login.buttons.rememberMe")}
              />

              <MuiLink
                variant="body2"
                color="primary"
                fontSize="12px"
                component={ActiveLink}
                underline="none"
                to="/forgot-password"
              >
                {translate("pages.login.buttons.forgotPassword")}
              </MuiLink>
            </Box> */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ mt: "24px" }}
            >
              {translate("pages.login.signin")}
            </Button>
          </Box>
        )}

        {registerLink ?? (
          <Box
            sx={{
              mt: "24px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              textAlign="center"
              variant="body2"
              component="span"
              fontSize="14px"
            >
              {translate("pages.login.buttons.noAccount")}
            </Typography>
            
            <MuiLink
              ml="4px"
              fontSize="14px"
              variant="body2"
              color="primary"
              component={ActiveLink}
              underline="none"
              to="/register"
              fontWeight="bold"
            >
              {translate("pages.login.signup")}
            </MuiLink>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <FormProvider {...methods}>
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
              renderContent(Content)
            ) : (
              Content
            )}
          </Box>
        </Container>
      </Box>
    </FormProvider>
  );
};

export default LoginPage;
