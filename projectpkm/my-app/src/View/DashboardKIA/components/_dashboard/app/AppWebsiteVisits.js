import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { styled } from '@mui/material/styles';
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------
const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: '3px 3px 10px #9E9E9E',
  padding: theme.spacing(5, 0)
}));

const CHART_DATA = [
  {
    name: 'Target',
    type: 'column',
    data: [23, 72, 22, 27]
  },
  {
    name: 'KIA',
    type: 'column',
    data: [44, 55, 41, 67]
  },
  {
    name: 'Paripurna',
    type: 'column',
    data: [30, 25, 36, 30]
  }
];

export default function AppWebsiteVisits() {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [3, 3, 3] },
    plotOptions: { bar: { columnWidth: '20%', borderRadius: 8 } },
    fill: {
      type: ['solid', 'solid', 'solid']
    },
    labels: ['January 2021', 'April 2021', 'July 2021', 'Octobor 2021'],
    xaxis: {
      type: 'category',
      labels: {
        format: 'MM yyyy'
      }
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        right: 50,
        bottom: 0,
        left: 35
      }
    },
    tooltip: {
      shared: false,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        }
      }
    }
  });

  return (
    <RootStyle>
      <Card>
        <CardHeader title="Progress KIA" subheader="(+43%) than last year" />
        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
          <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={300} />
        </Box>
      </Card>
    </RootStyle>
  );
}
