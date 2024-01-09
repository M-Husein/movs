import { Refine } from "@refinedev/core";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, { DocumentTitleHandler } from "@refinedev/react-router-v6";
import { dataProvider } from "@/providers/dataProvider";
import { useTranslation } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { authProvider } from "@/providers/authProvider";
import { ColorModeContextProvider } from "@/contexts/color-mode";
import { notificationProvider, RefineSnackbarProvider } from "@/providers/notificationProvider"; // @refinedev/mui
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
            dataProvider={dataProvider(import.meta.env.VITE_EXTENAL_API)}
            authProvider={authProvider}
            i18nProvider={i18nProvider}
            routerProvider={routerBindings}
            notificationProvider={notificationProvider}
            resources={RESOURCES}
            options={{
              disableTelemetry: true,
              useNewQueryKeys: true,
            }}
          >
            <AppRoutes />

            <DocumentTitleHandler />
          </Refine>
        </RefineSnackbarProvider>
      </ColorModeContextProvider>
    </BrowserRouter>
  );
}
