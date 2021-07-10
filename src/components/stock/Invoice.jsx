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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function total(items) {
  return items.map(({ total }) => total).reduce((sum, i) => sum + i, 0);
}

export default function SpanningTable() {
  const [reciept, setReciept] = React.useState([]);
  const classes = useStyles();
  useEffect(() => {
    let arr = JSON.parse(localStorage.getItem("reciept"));
    setReciept(arr);
    console.log(arr);
    console.log(reciept);
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Item Code</TableCell>
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
          {reciept == null ? (
            <p>You Have not added any items to the reciept!</p>
          ) : (
            <>
              {reciept.map((row) => (
                <TableRow key={row.itemCode}>
                  <TableCell>{row.itemCode}</TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell style={{ width: 100 }} align="right">
                    <EditText
                      onSave={(value) => {
                        let tempp = "";
                        let item = JSON.parse(localStorage.getItem("reciept"));
                        row.price = value.value;
                        for (let i = 0; i < item.length; i++) {
                          // console.log(item[i]);
                          // console.log(row);
                          if (row.itemCode == item[i].itemCode) {
                            item[i].price = value.value;
                            item[i].total = item[i].quantity * value.value;
                            item[i].disc = 0;
                            item[i].discounted = 0;
                          }
                        }
                        localStorage.setItem("reciept", JSON.stringify(item));
                        setReciept(item);
                        console.log(item);
                      }}
                      type="number"
                      defaultValue={row.price}
                    />
                  </TableCell>
                  <TableCell style={{ width: 100 }} align="right">
                    <EditText
                      onSave={(value) => {
                        let tempp = "";
                        let item = JSON.parse(localStorage.getItem("reciept"));
                        row.price = value.value;
                        for (let i = 0; i < item.length; i++) {
                          // console.log(item[i]);
                          // console.log(row);
                          if (row.itemCode == item[i].itemCode) {
                            item[i].quantity = value.value;
                            item[i].total = item[i].quantity * item[i].price;
                            item[i].discounted = 0;
                            item[i].disc = 0;
                          }
                        }
                        localStorage.setItem("reciept", JSON.stringify(item));
                        setReciept(item);
                        console.log(item);
                      }}
                      type="number"
                      defaultValue={row.quantity}
                    />
                  </TableCell>
                  <TableCell style={{ width: 100 }} align="right">
                    <EditText
                      onSave={(value) => {
                        let item = JSON.parse(localStorage.getItem("reciept"));
                        row.price = value.value;
                        for (let i = 0; i < item.length; i++) {
                          // console.log(item[i]);
                          // console.log(row);
                          if (row.itemCode == item[i].itemCode) {
                            item[i].disc = value.value;
                            item[i].discounted =
                              ((item[i].price * item[i].quantity) / 100) *
                              value.value;
                            item[i].total =
                              item[i].price * item[i].quantity -
                              item[i].discounted;
                          }
                        }
                        localStorage.setItem("reciept", JSON.stringify(item));
                        setReciept(item);
                        console.log(item);
                      }}
                      type="number"
                      defaultValue={row.quantity}
                    />
                  </TableCell>
                  <TableCell align="right">{row.discounted}</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                  <TableCell align="right">
                    {/* <Button
                  size="small"
                  style={{ backgroundColor: "gold", marginRight: 5 }}
                  variant="contained"
                >
                  Edit
                </Button> */}
                    <Button size="small" variant="contained" color="secondary">
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell colSpan={6}>Total</TableCell>
                <TableCell align="right">{total(reciept)}</TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
