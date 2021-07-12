import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid, Button, Divider, Paper } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import invoiceService from "../services/InvoiceService";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function totalCost(items) {
  // console.log(items[0].costPriceTotal);
  // return;
  return items
    .map(({ costPriceTotal }) => costPriceTotal)
    .reduce((sum, i) => sum + i, 0);
}

function totalSale(items) {
  // console.log(items[0].salePriceTotal);
  // return;

  return items
    .map(({ salePriceTotal }) => salePriceTotal)
    .reduce((sum, i) => sum + i, 0);
}

const ViewProfit = () => {
  const classes = useStyles();
  const [_date, setDate] = React.useState();
  const [_date2, setDate2] = React.useState();
  const [cost, setCost] = React.useState();
  const [profit, setProfit] = React.useState();
  const [sale_data, setSaleData] = React.useState([]);

  return (
    <div style={{ marginTop: 20 }}>
      <Grid align="center" container>
        <Grid item xs={2}></Grid>
        <Grid item xs={12} lg={3}>
          <TextField
            id="date"
            views={["year", "month"]}
            label="From"
            type="date"
            defaultValue="2017-05-24T10:30"
            className={classes.textField}
            onChange={(e) => {
              setDate(e.target.value);
              console.log(_date);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Grid item xs={2}></Grid>
        </Grid>
        <Grid item xs={12} lg={3}>
          <TextField
            id="date"
            views={["year", "month"]}
            label="Till"
            type="date"
            defaultValue="2017-05-24T10:30"
            className={classes.textField}
            onChange={(e) => {
              setDate2(e.target.value);
              console.log(_date2);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid style={{ marginTop: 10 }} item xs={12} lg={2}>
          <Button
            onClick={() => {
              let data = {
                start: _date,
                end: _date2,
              };
              console.log(data);
              invoiceService
                .Profit(data)
                .then((data) => setSaleData(data))
                .catch((err) => console.log(err));
            }}
            variant="contained"
            color="primary"
          >
            View Profit
          </Button>
        </Grid>
      </Grid>
      <Divider style={{ marginTop: 50 }} />
      <Grid align="center" style={{ marginTop: 20 }} spacing={5} container>
        <Grid item xs={2}></Grid>
        <Grid item xs={12} lg={3}>
          <Paper
            style={{
              padding: 50,
              border: "2px solid #DF5E5E",
              borderRadius: 10,
            }}
          >
            <Grid container>
              <Grid style={{ fontSize: 20 }} item xs={12}>
                Total Cost{" "}
              </Grid>
              <Grid style={{ fontSize: 30, color: "#DF5E5E" }} item xs={12}>
                {totalCost(sale_data)}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Paper
            style={{
              padding: 50,
              border: "2px solid #053742",
              borderRadius: 10,
            }}
          >
            <Grid container>
              <Grid style={{ fontSize: 20 }} item xs={12}>
                Total Sale
              </Grid>
              <Grid
                style={{
                  fontSize: 30,
                  color: "#053742",
                }}
                item
                xs={12}
              >
                {totalSale(sale_data)}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Paper
            style={{
              padding: 50,
              border: "2px solid #57837B",
              borderRadius: 10,
            }}
          >
            <Grid container>
              <Grid style={{ fontSize: 20 }} item xs={12}>
                Total Profit
              </Grid>
              <Grid style={{ fontSize: 30, color: "#57837B" }} item xs={12}>
                {totalSale(sale_data) - totalCost(sale_data)}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
};

export default withRouter(ViewProfit);
