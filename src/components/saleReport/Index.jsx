import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Grid, Button } from "@material-ui/core";
import ReceiptIcon from "@material-ui/icons/Receipt";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { withRouter } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Index = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Paper
            style={{ padding: 50, backgroundColor: "#476072" }}
            className={classes.paper}
          >
            <Button
              onClick={() => props.history.push("/sales")}
              style={{
                fontSize: "24px",
                backgroundColor: "#2C2E43",
                color: "white",
              }}
              variant="outlined"
              startIcon={<ReceiptIcon />}
            >
              View Sale Invoices
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper
            style={{ padding: 50, backgroundColor: "#BB8760" }}
            className={classes.paper}
          >
            <Button
              onClick={() => props.history.push("/viewProfit")}
              style={{
                fontSize: "24px",
                backgroundColor: "#4F0E0E",
                color: "white",
              }}
              variant="outlined"
              startIcon={<AttachMoneyIcon />}
            >
              View Profit
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(Index);
