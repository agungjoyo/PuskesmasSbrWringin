import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { Icon } from "@iconify/react";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// ----------------------------------------------------------------------

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    showPassword: false,
    loading: false,
  };

  handleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
    // setShowPassword((show) => !show);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    console.log(this.state);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    console.log(this.props);
    return (
      <form autoComplete="off" noValidate onSubmit={this.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            id="email"
            type="email"
            label="Email address"
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={this.state.showPassword ? "text" : "password"}
            label="Password"
            id="password"
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={this.handleShowPassword} edge="end">
                    <Icon
                      icon={this.state.showPassword ? eyeFill : eyeOffFill}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FormControlLabel
            control={<Checkbox checked={true} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={this.state.loading}
        >
          Login
        </LoadingButton>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.absoluteLogin,
  };
};

export default connect(mapStateToProps)(LoginForm);
