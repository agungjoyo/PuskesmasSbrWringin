// routes
import Router from './routes';
// theme
import ThemeConfig from './View/DashboardKIA/theme';
import GlobalStyles from './View/DashboardKIA/theme/globalStyles';

// components
import ScrollToTop from './View/DashboardKIA/components/ScrollToTop';
import { BaseOptionChartStyle } from './View/DashboardKIA/components/charts/BaseOptionChart';
import Landing from './views/examples/Landing';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
      <Landing />
    </ThemeConfig>
  );
}
