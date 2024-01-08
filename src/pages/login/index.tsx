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
import { socialProviders } from '@/providers/socialProviders';

const LoginPage: React.FC<any> = ({
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
                variant="outlined"
                fullWidth
                sx={{
                  color: "primary.light",
                  borderColor: "primary.light",
                  textTransform: "none",
                }}
                onClick={() =>
                  login({
                    // Static login data
                    email: 'john.doe@email.com',
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
          <p className="text-sm bg-orange-100 p-2 rounded-lg border border-orange-300">
            Pay attention: this is not the original sign in. Don't insert your real credentials here!
          </p>

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

          {renderProviders()}

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
    </>
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
