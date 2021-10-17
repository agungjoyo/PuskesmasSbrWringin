import React from "react";
// routes
import Router from "routes";
// theme
import ThemeConfig from "views/DashboardKIA/theme";
import GlobalStyles from "views/DashboardKIA/theme/globalStyles";

// components
import ScrollToTop from "views/DashboardKIA/components/ScrollToTop";
import { BaseOptionChartStyle } from "views/DashboardKIA/components/charts/BaseOptionChart";
// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
