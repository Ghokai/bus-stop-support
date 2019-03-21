import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  }
});

export default function LayoutHOC(WrappedComponent) {
  class Layout extends Component {
    render() {
      return (
        <Grid
          container
          spacing={40}
          direction="column"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={8}>
            <Paper className={this.props.classes.root} elevation={1}>
              <WrappedComponent {...this.props} />
            </Paper>
          </Grid>
        </Grid>
      );
    }
  }
  return withStyles(styles)(Layout);
}
