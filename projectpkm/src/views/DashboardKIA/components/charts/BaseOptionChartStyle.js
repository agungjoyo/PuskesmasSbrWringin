import React, { Component } from "react";
// material
import { alpha } from "@mui/material/styles";
import { withTheme } from "@mui/styles";
import { GlobalStyles } from "@mui/material";

// ----------------------------------------------------------------------
class BaseOptionChartStyle extends Component {
  render() {
    const background = {
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
      backgroundColor: alpha(this.props.theme.palette.background.default, 0.72),
    };

    return (
      <GlobalStyles
        styles={{
          "&.apexcharts-canvas": {
            // Tooltip
            ".apexcharts-xaxistooltip": {
              ...background,
              border: 0,
              boxShadow: this.props.theme.customShadows.z24,
              color: this.props.theme.palette.text.primary,
              borderRadius: this.props.theme.shape.borderRadiusSm,
              "&:before": { borderBottomColor: "transparent" },
              "&:after": {
                borderBottomColor: alpha(
                  this.props.theme.palette.background.default,
                  0.72
                ),
              },
            },
            ".apexcharts-tooltip.apexcharts-theme-light": {
              ...background,
              border: 0,
              boxShadow: this.props.theme.customShadows.z24,
              borderRadius: this.props.theme.shape.borderRadiusSm,
              "& .apexcharts-tooltip-title": {
                border: 0,
                textAlign: "center",
                fontWeight: this.props.theme.typography.fontWeightBold,
                backgroundColor: this.props.theme.palette.grey[500_16],
                color:
                  this.props.theme.palette.text[
                    this.props.theme.palette.mode === "light"
                      ? "secondary"
                      : "primary"
                  ],
              },
            },
            // Legend
            ".apexcharts-legend": {
              padding: 0,
            },
            ".apexcharts-legend-series": {
              display: "flex !important",
              alignItems: "center",
            },
            ".apexcharts-legend-marker": {
              marginRight: 8,
            },
            ".apexcharts-legend-text": {
              lineHeight: "18px",
              textTransform: "capitalize",
            },
          },
        }}
      />
    );
  }
}

export default withTheme(BaseOptionChartStyle);
