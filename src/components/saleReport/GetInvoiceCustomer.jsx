import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table, Grid } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import { toast } from "react-toastify";
import PrintIcon from "@material-ui/icons/Print";
import StorageIcon from "@material-ui/icons/Storage";
import invoiceService from "../services/InvoiceService";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  hide: {
    "&:print": {
      display: "none",
    },
  },
});

function total(items) {
  return items.map(({ total }) => total).reduce((sum, i) => sum + i, 0);
}

function printReceipt() {
  window.print();
}

// function getDate() {
//   var dateObj = new Date();
//   var month = dateObj.getUTCMonth() + 1; //months from 1-12
//   var day = dateObj.getDate();
//   var year = dateObj.getUTCFullYear();

//   return day + "/" + month + "/" + year;
// }
const GetInvoiceCustomer = (props) => {
  const [receipt, setReceipt] = React.useState([]);
  const [cname, setCname] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [discount, setDiscount] = React.useState("0");
  const [_date, setDate] = React.useState();
  const [address, setAddress] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [paid, setPaid] = React.useState(0);
  const [remaining, setRemaining] = React.useState(0);
  const [invoice_num, setInvoiceNum] = React.useState("");

  const [salePriceTotal, setSalePriceTotal] = React.useState(0);
  const classes = useStyles();
  const id = props.match.params.id;
  let sum = 0,
    final = 0;
  useEffect(() => {
    console.log(id);
    invoiceService
      .getSingleCustomer(id)
      .then((data) => {
        console.log(data);
        setRows(data.data);
        setDate(data.date);
        setAddress(data.address);
        setContact(data.contact);
        setCname(data.customerName);
        setPaid(data.paid);
        setRemaining(data.remaining);
        setSalePriceTotal(data.salePriceTotal);
        setInvoiceNum(data.invoice_num);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <TableContainer component={Paper}>
      <div
        style={{
          textAlign: "center",
          fontSize: 30,
          fontWeight: "bold",
          color: "green",
        }}
      >
        <span>MADINA TRADERS & Electric Store</span>
      </div>
      <div style={{ textAlign: "center", fontWeight: "bold" }}>
        <span>Mobile #: 0321-8464465, 03004001431</span>
      </div>
      <br />
      <div style={{ fontWeight: "bold", marginLeft: 10 }}>
        <span>
          date: {new Date(_date * 1000).toDateString()} &nbsp;&nbsp;&nbsp;
          {new Date(_date * 1000).toLocaleTimeString()}
        </span>
      </div>
      <br />
      <Grid container>
        <Grid item xs={4}>
          <div style={{ marginLeft: 4 }}>
            <span>Customer Name : {cname}</span>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ marginLeft: 4 }}>
            <span>Address : {address}</span>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ marginLeft: 4 }}>
            <span>Contact : {contact}</span>
          </div>
        </Grid>
      </Grid>

      <br />
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Sr No.</TableCell>
            <TableCell align="right">Invoice No.</TableCell>

            <TableCell align="right">Item Desc</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Debit</TableCell>
            <TableCell align="right">Credit</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <>
            {rows.map((row, index, arr) => {
              sum =
                index == 0
                  ? sum + arr[index].total
                  : row.credit
                  ? sum - row.credit
                  : sum + row.total;

              return (
                <TableRow key={index}>
                  <TableCell align="right">{index + 1}</TableCell>
                  <TableCell align="right">{row.invoice_id}</TableCell>

                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">
                    {new Date(row.date * 1000).toDateString()}
                  </TableCell>
                  <TableCell align="right">
                    {row.credit ? 0 : row.total}
                  </TableCell>
                  <TableCell align="right">
                    {row.credit ? row.credit : 0}
                  </TableCell>
                  {row.credit ? (
                    <TableCell align="right">
                      {index == 0 ? row.total - row.credit : sum}
                    </TableCell>
                  ) : (
                    <TableCell align="right">
                      {index == 0 ? row.total : sum}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}

            <TableRow>
              <TableCell colSpan={6}>Total Amount</TableCell>
              <TableCell align="right">{salePriceTotal}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>Paid</TableCell>
              <TableCell align="right">{paid}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>Remaining Balance</TableCell>
              <TableCell align="right">{salePriceTotal - paid}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell id="no-print" colSpan={6}>
                Receive Payment
              </TableCell>
              <TableCell id="no-print" align="right">
                <EditText
                  id="customer"
                  style={{ width: 100 }}
                  placeholder="Enter Amount"
                  onSave={({ value }) => {
                    localStorage.setItem("amount_receieved", value);
                  }}
                  defaultValue={
                    localStorage.getItem("amount_receieved")
                      ? JSON.parse(localStorage.getItem("amount_receieved"))
                      : 0
                  }
                />
              </TableCell>
            </TableRow>
          </>
        </TableBody>
      </Table>

      <div style={{ textAlign: "center" }}>
        <Button
          startIcon={<PrintIcon />}
          style={{ margin: 10 }}
          variant="contained"
          id="no-print"
          color="primary"
          onClick={printReceipt}
        >
          Print
        </Button>
        <Button
          startIcon={<StorageIcon />}
          style={{ margin: 10, backgroundColor: "purple", color: "white" }}
          variant="contained"
          id="no-print"
          onClick={() => {
            localStorage.getItem("amount_receieved")
              ? invoiceService
                  .updateSingleCustomer(
                    id,
                    JSON.parse(localStorage.getItem("amount_receieved"))
                  )
                  .then((data) => {
                    console.log(data);
                    toast.success("Done!", {
                      position: toast.POSITION.TOP_CENTER,
                    });
                    JSON.stringify(localStorage.setItem("amount_receieved", 0));
                    window.location.reload();
                  })
                  .catch((err) => console.log(err))
              : toast.success("Add receiving amount!", {
                  position: toast.POSITION.TOP_CENTER,
                });
          }}
        >
          Add To Record
        </Button>
      </div>
      <div style={{ marginTop: 100, marginBottom: 100, fontSize: 24 }}>
        <span style={{ marginLeft: 15 }}>Signature ______________</span>
      </div>
      <div
        style={{
          marginTop: 100,
          marginBottom: 70,
          fontSize: 24,
          textAlign: "center",
        }}
      >
        <span style={{ marginLeft: 15 }}>
          Address : Shop # 5 Model Town, K Block Near PSO Petrol Pump Marian
          Stop Lahore.
        </span>
      </div>
    </TableContainer>
  );
};

export default withRouter(GetInvoiceCustomer);
