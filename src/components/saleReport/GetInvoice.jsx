import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { EditText, EditTextarea } from "react-edit-text";
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
const GetInvoice = (props) => {
  const [receipt, setReceipt] = React.useState([]);
  const [cname, setCname] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [discount, setDiscount] = React.useState("0");
  const [_date, setDate] = React.useState();
  const [invoice_num, setInvoiceNum] = React.useState("");
  const classes = useStyles();
  const id = props.match.params.id;

  useEffect(() => {
    console.log(localStorage.getItem("counter"));
    console.log(id);
    invoiceService
      .getSingleInvoice(id)
      .then((data) => {
        console.log(data);
        setRows(data.data);
        setDate(data.date);
        setCname(data.customerName);
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
      <div style={{marginTop:50}}>
      <div style={{float:"left",paddingLeft:10,margintop:50 }}>
       # {invoice_num}
      </div>
      </div>
      <br />
      <div style={{ fontWeight: "bold", marginLeft: 10,marginTop:20 }}>
        <span>Date: {new Date(_date * 1000).toDateString()}</span>
      </div>
      <br />
      <div style={{ marginLeft: 10 }}>
        <span>Customer Name : {cname}</span>
      </div>
      <br />

      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell id="no-print">Item Code</TableCell>
            <TableCell align="right">Desc</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Disc %</TableCell>
            <TableCell align="right">Disc</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <>
            {rows.map((row) => (
              <TableRow key={row.itemCode}>
                <TableCell id="no-print">{row.itemCode}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.disc}</TableCell>
                <TableCell align="right">{row.discounted}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell colSpan={6}>Total</TableCell>
              <TableCell align="right">{total(rows)}</TableCell>
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
      </div>
      <div style={{ marginTop: 100, marginBottom: 100, fontSize: 24 }}>
        <span style={{ marginLeft: 15 }}>Signature ______________</span>
      </div>
      <div style={{ marginTop: 100, marginBottom: 70, fontSize: 24 }}>
        <span style={{ marginLeft: 15 }}>
          Address : Shop # 5 Model Town, K Block Near PSO Petrol Pump Marian
          Stop Lahore.
        </span>
      </div>
    </TableContainer>
  );
};

export default withRouter(GetInvoice);
