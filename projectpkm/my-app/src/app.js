// routes
import Router from './routes';
// theme
import ThemeConfig from './View/DashboardKIA/theme';
import GlobalStyles from './View/DashboardKIA/theme/globalStyles';
// components
import ScrollToTop from './View/DashboardKIA/components/ScrollToTop';
import { BaseOptionChartStyle } from './View/DashboardKIA/components/charts/BaseOptionChart';

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