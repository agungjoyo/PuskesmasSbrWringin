import { Component } from "react";
// material
import { withTheme } from "@mui/styles";

// ----------------------------------------------------------------------

class BaseOptionChart extends Component {
  state = {
    // Colors
    colors: [
      this.props.theme.palette.primary.main,
      this.props.theme.palette.chart.yellow[0],
      this.props.theme.palette.chart.blue[0],
      this.props.theme.palette.chart.violet[0],
      this.props.theme.palette.chart.green[0],
      this.props.theme.palette.chart.red[0],
    ],
    // Chart
    chart: {
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 2,
        left: 3,
        blur: 2,
        color: "#9E9E9E",
        opacity: 0.55,
      },
      toolbar: { show: true, offsetY: -25, offsetX: -5 },
      zoom: { enabled: false },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 1000,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      foreColor: this.props.theme.palette.text.disabled,
      fontFamily: this.props.theme.typography.fontFamily,
    },

    // States
    states: {
      hover: {
        filter: {
          type: "lighten",
          value: 0.04,
        },
      },
      active: {
        filter: {
          type: "darken",
          value: 0.88,
        },
      },
    },

    // Fill
    fill: {
      opacity: 1,
      gradient: {
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },

    // Datalabels
    dataLabels: { enabled: false },

    // Stroke
    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round",
    },

    // Grid
    grid: {
      strokeDashArray: 3,
      borderColor: this.props.theme.palette.divider,
    },

    // Xaxis
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    // Markers
    markers: {
      size: 0,
      strokeColors: this.props.theme.palette.background.paper,
    },

    // Tooltip
    tooltip: {
      x: {
        show: true,
      },
    },

    // Legend
    legend: {
      show: true,
      fontSize: 13,
      position: "bottom",
      horizontalAlign: "right",
      markers: {
        radius: 12,
      },
      fontWeight: 500,
      itemMargin: { horizontal: 12 },
      labels: {
        colors: this.props.theme.palette.text.primary,
      },
    },

    // plotOptions
    plotOptions: {
      // Bar
      bar: {
        columnWidth: "28%",
        borderRadius: 4,
      },
      // Pie + Donut
      pie: {
        donut: {
          labels: {
            show: true,
            value: {
              offsetY: 8,
              color: this.props.theme.palette.text.primary,
              ...this.props.theme.typography.h3,
            },
            total: {
              show: true,
              label: "Total",
              color: this.props.theme.palette.text.secondary,
              ...this.props.theme.typography.subtitle2,
            },
          },
        },
      },
      // Radialbar
      radialBar: {
        track: {
          strokeWidth: "100%",
          background: this.props.theme.palette.grey[500_16],
        },
        dataLabels: {
          value: {
            offsetY: 8,
            color: this.props.theme.palette.text.primary,
            ...this.props.theme.typography.h3,
          },
          total: {
            show: true,
            label: "Total",
            color: this.props.theme.palette.text.secondary,
            ...this.props.theme.typography.subtitle2,
          },
        },
      },
      // Radar
      radar: {
        polygons: {
          fill: { colors: ["transparent"] },
          strokeColors: this.props.theme.palette.divider,
          connectorColors: this.props.theme.palette.divider,
        },
      },
      // polarArea
      polarArea: {
        rings: {
          strokeColor: this.props.theme.palette.divider,
        },
        spokes: {
          connectorColors: this.props.theme.palette.divider,
        },
      },
    },

    // Responsive
    responsive: [
      {
        // sm
        breakpoint: this.props.theme.breakpoints.values.sm,
        options: {
          plotOptions: { bar: { columnWidth: "40%", borderRadius: 4 } },
        },
        grid: {
          show: false,
          padding: {
            top: 0,
            right: 50,
            bottom: 0,
            left: 50,
          },
        },
      },
      {
        // md
        breakpoint: this.props.theme.breakpoints.values.md,
        options: {
          plotOptions: { bar: { columnWidth: "32%", borderRadius: 4 } },
        },
        grid: {
          show: false,
          padding: {
            top: 0,
            right: 50,
            bottom: 0,
            left: 50,
          },
        },
      },
      {
        // md
        breakpoint: 1920,
        options: {
          plotOptions: { bar: { columnWidth: "20%", borderRadius: 12 } },
        },
        grid: {
          show: false,
          padding: {
            top: 0,
            right: 35,
            bottom: 0,
            left: 35,
          },
        },
      },
      {
        // md
        breakpoint: 1366,
        options: {
          plotOptions: { bar: { columnWidth: "20%", borderRadius: 8 } },
        },
        grid: {
          show: false,
          padding: {
            top: 0,
            right: 50,
            bottom: 0,
            left: 35,
          },
        },
      },
    ],
  };
  render() {
    return this.state;
  }
}
export { default as BaseOptionChartStyle } from "./BaseOptionChartStyle";
export default withTheme(BaseOptionChart);
