import React, { Component } from "react";
import { getBusStopById, addDonation } from "../api/BusStopService";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LayoutHOC from "./LayoutHOC";
import ErrorMessage from "./ErrorMessage";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class BusStopDonationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      busStop: null,
      errMsg: "",
      name: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
      email: "",
      amount: "",
      hidePersonelInfo: false
    };
  }

  componentDidMount() {
    this.registerFormValidations();
    this.loadBusStop();
  }

  registerFormValidations = () => {
    ValidatorForm.addValidationRule("isValidCardNumber", value =>
      /^[0-9]{16}$/.test(value)
    );
    ValidatorForm.addValidationRule("isValidCVV", value =>
      /^[0-9]{3}$/.test(value)
    );
    ValidatorForm.addValidationRule("isValidAmount", value =>
      /^\d+(?:\.\d{0,2})$/.test(value)
    );
    ValidatorForm.addValidationRule("isValidCardExpDate", value =>
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(value)
    );
    ValidatorForm.addValidationRule("isName", value =>
      /^[A-Za-z\s]+$/.test(value)
    );
  };

  loadBusStop = () => {
    try {
      const { busStopId } = this.props;
      const busStop = getBusStopById(busStopId);

      this.setState({
        busStop,
        errMsg: ""
      });
    } catch (e) {
      this.setState({
        busStop: null,
        errMsg: e.message
      });
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggleCheckBox = event => {
    this.setState({ [event.target.name]: !this.state[event.target.name] });
  };

  submitDonation = () => {
    //console.log(this.state);

    let {
      amount,
      busStop: { stopId },
      email,
      hidePersonelInfo,
      name
    } = this.state;

    let donationObj = {
      amount,
      stopId,
      email,
      hidePersonelInfo,
      name
    };
    try {
      addDonation(donationObj);
      this.props.history.push(`/donationsummary/${this.props.busStopId}`);
    } catch (e) {
      this.setState({
        busStop: null,
        errMsg: e.message
      });
    }
  };

  render() {
    const { history, busStopId } = this.props;
    const {
      busStop,
      errMsg,
      name,
      cardNumber,
      expDate,
      cvv,
      email,
      amount,
      hidePersonelInfo
    } = this.state;

    if (busStop == null) {
      if (errMsg.length > 0)
        return (
          <ErrorMessage errorMsg={errMsg} tryAgain={() => this.loadBusStop()} />
        );
      return null;
    }

    return (
      <ValidatorForm onSubmit={() => this.submitDonation()}>
        <Typography variant="h6" gutterBottom>
          <u>Bus Stop: {this.state.busStop.name}</u>
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={12} md={6}>
            <TextValidator
              label="Name"
              onChange={this.handleChange}
              name="name"
              value={name}
              validators={["required", "isName"]}
              errorMessages={[
                "this field is required",
                "Name must be contains english letters only"
              ]}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextValidator
              label="Card Number"
              onChange={this.handleChange}
              name="cardNumber"
              value={cardNumber}
              validators={["required", "isValidCardNumber"]}
              errorMessages={[
                "this field is required",
                "Card Number must be 16 digit number"
              ]}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextValidator
              label="Card Expiration Date"
              onChange={this.handleChange}
              name="expDate"
              value={expDate}
              validators={["required", "isValidCardExpDate"]}
              errorMessages={[
                "this field is required",
                "card exp date must be in mm/yy format"
              ]}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextValidator
              label="CVV"
              onChange={this.handleChange}
              name="cvv"
              value={cvv}
              validators={["required", "isValidCVV"]}
              errorMessages={[
                "this field is required",
                "cvv must be 3 digit number"
              ]}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextValidator
              label="E mail"
              onChange={this.handleChange}
              name="email"
              value={email}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextValidator
              label="Donation Amount($)"
              onChange={this.handleChange}
              name="amount"
              value={amount}
              validators={["required", "isValidAmount"]}
              errorMessages={[
                "this field is required",
                "Donation amount must be currency format (example: 10.25)"
              ]}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  name="hidePersonelInfo"
                  checked={hidePersonelInfo}
                  onChange={this.toggleCheckBox}
                />
              }
              label="Hide my name and email in donations list"
            />
          </Grid>
          <Grid item xs={12} md={6} container justify="space-between">
            <Button type="submit" variant="contained" color="primary">
              Donate
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history.push(`/donationsummary/${busStopId}`)}
            >
              Show Donations
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history.push("/")}
            >
              Go To Map
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    );
  }
}

export default withRouter(LayoutHOC(BusStopDonationForm));
