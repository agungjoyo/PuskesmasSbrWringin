import React, { Component } from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import { addAdvice } from "views/store/actions/adviceAction";

import styles from "assets/jss/material-kit-react/views/landingPageSections/workStyle.js";

class WorkSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Email: "",
      Message: "",
    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    this.props.addAdvice(this.state);
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  render() {
    // const useStyles = makeStyles(styles);
    // const classes = useStyles();
    console.log(this.props.advice);
    const { classes } = this.props;
    return (
      <div id="kontak" className={classes.section}>
        <GridContainer justify="center">
          <GridItem cs={12} sm={12} md={8}>
            <h2 className={classes.title}>Kontak</h2>
            <h4 className={classes.description}>
              Alamat : Sumber Wringin, Darungan, Sumberwringin, Bondowoso,
              Kabupaten Bondowoso, Jawa Timur 68287.
            </h4>
            <h3 className={classes.title}>Kritik dan Saran</h3>
            <form
              style={{ margin: "0px 50px 0px" }}
              onSubmit={this.handleSubmit}
            >
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Nama"
                    id="Name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onSubmit={this.handleSubmit}
                    onChange={this.handleChange}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email"
                    id="Email"
                    type="email"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    onSubmit={this.handleSubmit}
                    onChange={this.handleChange}
                  />
                </GridItem>
                <CustomInput
                  labelText="Pesan"
                  id="Message"
                  formControlProps={{
                    fullWidth: true,
                    className: classes.textArea,
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 5,
                  }}
                  onSubmit={this.handleSubmit}
                  onChange={this.handleChange}
                />
                <GridItem xs={12} sm={12} md={12}>
                  <Button color="primary" type="Submit" fullWidth>
                    Kirim Email
                  </Button>
                </GridItem>
              </GridContainer>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAdvice: (advice) => dispatch(addAdvice(advice)),
  };
};

const mapStateToProps = (state) => {
  return {
    advice: state.advice.advices,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WorkSection));
