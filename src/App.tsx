import { Refine } from "@refinedev/core";
import { notificationProvider, RefineSnackbarProvider } from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, { DocumentTitleHandler, UnsavedChangesNotifier } from "@refinedev/react-router-v6";
// import dataProvider from "@refinedev/simple-rest";
import { dataProvider } from "@/providers/dataProvider";
import { useTranslation } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { authProvider } from "@/providers/authProvider";
import { ColorModeContextProvider } from "@/contexts/color-mode";
import { RESOURCES, AppRoutes } from "@/routes";

export default function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = { // @ts-ignore
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <ColorModeContextProvider>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            // "https://api.fake-rest.refine.dev"
            dataProvider={dataProvider(import.meta.env.VITE_EXTENAL_API)}
            notificationProvider={notificationProvider}
            routerProvider={routerBindings}
            authProvider={authProvider}
            i18nProvider={i18nProvider}
            resources={RESOURCES}
            options={{
              disableTelemetry: true,
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
            }}
          >
            <AppRoutes />

            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </RefineSnackbarProvider>
      </ColorModeContextProvider>
    </BrowserRouter>
  );
}
