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
import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import { toast } from "react-toastify";
import PrintIcon from "@material-ui/icons/Print";
import StorageIcon from "@material-ui/icons/Storage";
import invoiceService from "../services/InvoiceService";
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles({
  formControl: {
    minWidth: "200px",
    padding: 20,
  },
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
function total2(items) {
  return items.map(({ totalCost }) => totalCost).reduce((sum, i) => sum + i, 0);
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
export default function SpanningTable() {
  const [receipt, setReceipt] = React.useState([]);
  const [discount, setDiscount] = React.useState("0");
  // const [counter, setCounter] = React.useState(0);
  const [customerName, setCustomerName] = React.useState("");
  const [customerAddress, setCustomerAddress] = React.useState("");
  const [customerRemaining, setCustomerRemaining] = React.useState("");
  const [customerContact, setCustomerContact] = React.useState("");
  const [existingCustomer, setExistingCustomer] = React.useState("");
  const [existingAddress, setExistingAddress] = React.useState("");
  const [existingContact, setExistingContact] = React.useState("");
  const [customerType, setCustomerType] = React.useState(
    localStorage.getItem("customerType")
      ? localStorage.getItem("customerType")
      : "Cash"
  );
  const [invoiceNum, setInvoiceNum] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const classes = useStyles();

  useEffect(() => {
    // localStorage.setItem("counter", -2);

    let arr = JSON.parse(localStorage.getItem("receipt"));
    setReceipt(arr);
    console.log(arr);
    console.log(receipt);

    invoiceService
      .getInvoiceNumber()
      .then((data) => setInvoiceNum(data.number))
      .catch((err) => console.log(err));
  }, []);
  return (
    <TableContainer component={Paper}>
      <div>
        <div style={{ float: "right", margin: 20, paddingRight: 20 }}>
          {customerType == "Existing" ? (
            <>
              <EditText
                placeholder="Enter Customer Name"
                onSave={({ value }) => {
                  invoiceService
                    .getCustomerByInvoice(value)
                    .then((data) => {
                      if (data.length != 0) {
                        // console.log(data[0]._id);
                        localStorage.setItem("existing_id", data[0]._id);
                        localStorage.setItem(
                          "existing_customer_name",
                          data[0].customerName
                        );
                        localStorage.setItem(
                          "existing_customer_address",
                          data[0].address
                        );
                        localStorage.setItem(
                          "existing_customer_contact",
                          data[0].contact
                        );
                        setExistingCustomer(data[0].customerName);
                        setExistingAddress(data[0].address);
                        setExistingContact(data[0].contact);
                        // console.log(localStorage.getItem("existing"));
                      } else {
                        toast.error("Customer Does Not Exist", {
                          position: toast.POSITION.TOP_CENTER,
                        });
                        setExistingCustomer("");
                        setExistingAddress("");
                        setExistingContact("");
                        localStorage.setItem("existing_id", "");
                        localStorage.setItem("existing_customer_name", "");
                        localStorage.setItem("existing_customer_address", "");
                        localStorage.setItem("existing_customer_contact", "");
                      }
                    })
                    .catch((err) => console.log(err));
                }}
                type="text"
                defaultValue={""}
              />
              Invoice Number: {invoiceNum + 1}
              {localStorage.setItem("invoice_num_customer", invoiceNum + 1)}
            </>
          ) : (
            <>Invoice Number: {invoiceNum + 1}</>
          )}
        </div>

        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={customerType}
            onChange={(e) => {
              setCustomerType(e.target.value);
              localStorage.setItem("customerType", e.target.value);
            }}
          >
            <MenuItem value={"Cash"}>Cash</MenuItem>;
            <MenuItem value={"Installment"}>Installment</MenuItem>;
            <MenuItem value={"Existing"}>Existing</MenuItem>;
          </Select>
        </FormControl>
        <br />
      </div>
      {customerType == "Existing" ? (
        <div
          style={{
            textAlign: "center",
            fontSize: 30,
            marginLeft: 178,
            fontWeight: "bold",
            color: "green",
          }}
        >
          <span>MADINA TRADERS & Electric Store</span>
        </div>
      ) : (
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
      )}

      <div style={{ textAlign: "center", fontWeight: "bold" }}>
        <span>Mobile #: 0321-8464465, 03004001431</span>
      </div>
      <br />
      <div style={{ fontWeight: "bold", marginLeft: 10 }}>
        <span>
          date: {new Date().toDateString()}
          &nbsp;&nbsp;&nbsp;{new Date().toLocaleTimeString()}
        </span>
      </div>
      <br />
      {customerType === "Cash" ? (
        <div style={{ marginLeft: 4 }}>
          <EditText
            id="customer"
            style={{ width: 200 }}
            placeholder="Enter Customer Name here"
            onSave={({ value }) => {
              localStorage.setItem("customer_name", JSON.stringify(value));
              setCustomerName(value ? value : "");
              console.log(value);
            }}
            type="text"
            defaultValue={
              localStorage.getItem("customer_name")
                ? JSON.parse(localStorage.getItem("customer_name"))
                : ""
            }
          />
        </div>
      ) : customerType == "Installment" ? (
        <Grid align="center" container>
          <Grid item xs={4}>
            <EditText
              id="customer"
              style={{ width: 200 }}
              placeholder="Enter Customer Name"
              onSave={({ value }) => {
                localStorage.setItem("customer_name", JSON.stringify(value));
                setCustomerName(value ? value : "");
                console.log(value);
              }}
              type="text"
              defaultValue={
                localStorage.getItem("customer_name")
                  ? JSON.parse(localStorage.getItem("customer_name"))
                  : ""
              }
            />
          </Grid>
          <Grid item xs={4}>
            <EditText
              id="customer"
              style={{ width: 200 }}
              placeholder="Enter Customer Address"
              onSave={({ value }) => {
                localStorage.setItem("customer_address", JSON.stringify(value));
                setCustomerAddress(value ? value : "");
                console.log(value);
              }}
              type="text"
              defaultValue={
                localStorage.getItem("customer_address")
                  ? JSON.parse(localStorage.getItem("customer_address"))
                  : ""
              }
            />
          </Grid>
          <Grid item xs={4}>
            <EditText
              id="customer"
              style={{ width: 200 }}
              placeholder="Enter Customer Contact No."
              onSave={({ value }) => {
                localStorage.setItem("customer_contact", JSON.stringify(value));
                setCustomerContact(value ? value : "");
                console.log(value);
              }}
              type="text"
              defaultValue={
                localStorage.getItem("customer_contact")
                  ? JSON.parse(localStorage.getItem("customer_contact"))
                  : ""
              }
            />
          </Grid>
        </Grid>
      ) : (
        <Grid align="center" container>
          <Grid item xs={4}>
            <span>Customer Name : {existingCustomer}</span>
          </Grid>
          <Grid item xs={4}>
            <span>Address # {existingAddress}</span>
          </Grid>
          <Grid item xs={4}>
            <span>Contact : {existingContact}</span>
          </Grid>
        </Grid>
      )}

      <br />
      <Table className="numberedTable" aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell id="no-print">Sr No.</TableCell>
            <TableCell id="no-print">Item Code</TableCell>
            {/* <TableCell id="no-print">Sr num</TableCell> */}
            <TableCell align="right">Desc</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Disc %</TableCell>
            <TableCell align="right">Disc</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {receipt == null ? (
            <p>You Have not added any items to the receipt!</p>
          ) : (
            <>
              {receipt.map((row, index) => {
                // localStorage.setItem(
                //   "counter",
                //   JSON.parse(localStorage.getItem("counter")) + 1
                // );
                return (
                  <TableRow key={row.itemCode}>
                    <TableCell id="no-print">{index + 1}</TableCell>
                    <TableCell id="no-print">{row.itemCode}</TableCell>
                    {/* <TableCell id="no-print">
                      {localStorage.getItem("counter")}
                    </TableCell> */}
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell style={{ width: 100 }} align="right">
                      <EditText
                        onSave={({ value }) => {
                          let item = JSON.parse(
                            localStorage.getItem("receipt")
                          );

                          for (let i = 0; i < item.length; i++) {
                            if (row.id == item[i].id) {
                              item[i].price = parseFloat(value);
                              item[i].total =
                                item[i].quantity * parseFloat(value);
                              if (row.disc == 0) {
                                item[i].total =
                                  item[i].quantity * item[i].price;
                              } else {
                                item[i].discounted =
                                  ((item[i].price * item[i].quantity) / 100) *
                                  item[i].disc;
                                item[i].total =
                                  item[i].quantity * item[i].price -
                                  item[i].discounted;
                              }
                              console.log(item[i].disc);
                            }
                          }
                          localStorage.setItem("receipt", JSON.stringify(item));
                          setReceipt(item);
                          console.log(item);
                        }}
                        type="number"
                        defaultValue={row.price}
                      />
                    </TableCell>
                    <TableCell style={{ width: 100 }} align="right">
                      <EditText
                        onSave={({ value, previousValue }) => {
                          let item = JSON.parse(
                            localStorage.getItem("receipt")
                          );
                          if (value > row.stock) {
                            let temp =
                              "You Have Only " +
                              row.stock +
                              " " +
                              row.name +
                              " in your stock! ";
                            toast.error(temp, {
                              position: toast.POSITION.TOP_CENTER,
                            });
                            setTimeout(function () {
                              //Start the timer
                              window.location.reload();
                              //After 1 second, set render to true
                            }, 3000);
                            // setReceipt(item);
                          } else {
                            for (let i = 0; i < item.length; i++) {
                              if (row.id == item[i].id) {
                                item[i].quantity = parseInt(value);
                                if (row.disc == 0) {
                                  item[i].total =
                                    item[i].quantity * item[i].price;
                                  item[i].totalCost =
                                    item[i].cost * item[i].quantity;
                                } else {
                                  item[i].discounted =
                                    ((item[i].price * item[i].quantity) / 100) *
                                    item[i].disc;
                                  item[i].total =
                                    item[i].quantity * item[i].price -
                                    item[i].discounted;
                                }
                              }
                            }
                            localStorage.setItem(
                              "receipt",
                              JSON.stringify(item)
                            );
                            setReceipt(item);
                            console.log(item);
                          }
                        }}
                        type="number"
                        defaultValue={row.quantity}
                      />
                    </TableCell>
                    <TableCell style={{ width: 100 }} align="right">
                      <EditText
                        onSave={(value) => {
                          let item = JSON.parse(
                            localStorage.getItem("receipt")
                          );

                          for (let i = 0; i < item.length; i++) {
                            if (row.id == item[i].id) {
                              console.log(value.value);
                              item[i].disc = parseInt(value.value);
                              item[i].discounted =
                                ((item[i].price * item[i].quantity) / 100) *
                                item[i].disc;
                              item[i].total =
                                item[i].price * item[i].quantity -
                                item[i].discounted;
                            }
                          }
                          localStorage.setItem("receipt", JSON.stringify(item));
                          setReceipt(item);
                        }}
                        type="number"
                        defaultValue={row.disc}
                      />
                    </TableCell>
                    <TableCell align="right">{row.discounted}</TableCell>
                    <TableCell align="right">{row.total}</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          console.log("clicked");
                          for (var i = 0; i < receipt.length; i++) {
                            if (receipt[i] === row) {
                              console.log(receipt[i]);
                              receipt.splice(i, 1);
                              console.log(receipt);
                            }
                          }
                          localStorage.setItem(
                            "receipt",
                            JSON.stringify(receipt)
                          );

                          setReceipt(
                            JSON.parse(localStorage.getItem("receipt"))
                          );
                        }}
                        id="no-print"
                        size="small"
                        variant="contained"
                        color="secondary"
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {customerType === "Installment" ? (
                <>
                  <TableRow>
                    <TableCell colSpan={7}>Total Amount</TableCell>

                    <TableCell align="right">{total(receipt)}</TableCell>

                    {localStorage.setItem("salePriceTotal", total(receipt))}
                    {localStorage.setItem("costPriceTotal", total2(receipt))}
                  </TableRow>
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>Total Amount</TableCell>
                  <TableCell align="right">{total(receipt)}</TableCell>

                  {localStorage.setItem("salePriceTotal", total(receipt))}
                  {localStorage.setItem("costPriceTotal", total2(receipt))}
                  {localStorage.setItem("customer_remaining", total(receipt))}
                </TableRow>
              )}
            </>
          )}
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
        {customerType === "Cash" ? (
          <Button
            startIcon={<StorageIcon />}
            style={{ margin: 10, backgroundColor: "purple", color: "white" }}
            variant="contained"
            id="no-print"
            onClick={() => {
              JSON.parse(localStorage.getItem("receipt")) != "" &&
              JSON.parse(localStorage.getItem("receipt")) &&
              localStorage.getItem("customer_name")
                ? invoiceService
                    .addInvoice(
                      JSON.parse(localStorage.getItem("costPriceTotal")),
                      JSON.parse(localStorage.getItem("salePriceTotal")),
                      JSON.parse(localStorage.getItem("customer_name")),
                      JSON.parse(localStorage.getItem("receipt"))
                    )
                    .then((data) => {
                      console.log(data);
                      toast.success("Done!", {
                        position: toast.POSITION.TOP_CENTER,
                      });
                      localStorage.setItem("receipt", "[]");
                      setReceipt([]);
                      JSON.stringify(localStorage.setItem("customer_name", ""));
                      JSON.stringify(localStorage.setItem("costPriceTotal", 0));
                      JSON.stringify(localStorage.setItem("salePriceTotal", 0));
                      setCustomerName("");
                      window.location.reload();
                    })
                    .catch((err) => console.log(err))
                : localStorage.getItem("customer_name")
                ? toast.info("You have not added anything to invoice", {
                    position: toast.POSITION.TOP_CENTER,
                  })
                : toast.info("Enter Customer name", {
                    position: toast.POSITION.TOP_CENTER,
                  });
            }}
          >
            Add To Record
          </Button>
        ) : customerType === "Installment" ? (
          <Button
            startIcon={<StorageIcon />}
            style={{ margin: 10, backgroundColor: "purple", color: "white" }}
            variant="contained"
            id="no-print"
            onClick={() => {
              JSON.parse(localStorage.getItem("receipt")) != "" &&
              JSON.parse(localStorage.getItem("receipt")) &&
              localStorage.getItem("customer_name") &&
              localStorage.getItem("customer_contact") &&
              localStorage.getItem("customer_address")
                ? invoiceService
                    .addInvoiceCustomer({
                      costPriceTotal: JSON.parse(
                        localStorage.getItem("costPriceTotal")
                      ),
                      salePriceTotal: JSON.parse(
                        localStorage.getItem("salePriceTotal")
                      ),
                      customer_paid: 0,
                      customerRemaining: JSON.parse(
                        localStorage.getItem("customer_remaining")
                      ),
                      customerAddress: JSON.parse(
                        localStorage.getItem("customer_address")
                      ),

                      customerContact: JSON.parse(
                        localStorage.getItem("customer_contact")
                      ),

                      customerName: JSON.parse(
                        localStorage.getItem("customer_name")
                      ),
                      receipt: JSON.parse(localStorage.getItem("receipt")),
                    })
                    .then((data) => {
                      console.log(data);
                      toast.success("Done!", {
                        position: toast.POSITION.TOP_CENTER,
                      });
                      localStorage.setItem("receipt", "[]");
                      setReceipt([]);
                      JSON.stringify(localStorage.setItem("customer_name", ""));
                      JSON.stringify(localStorage.setItem("costPriceTotal", 0));
                      JSON.stringify(localStorage.setItem("salePriceTotal", 0));
                      JSON.stringify(localStorage.setItem("customer_paid", 0));
                      JSON.stringify(
                        localStorage.setItem("customer_address", "")
                      );
                      JSON.stringify(
                        localStorage.setItem("customer_contact", "")
                      );
                      JSON.stringify(
                        localStorage.setItem("customer_remaining", 0)
                      );
                      setCustomerName("");
                      setCustomerAddress("");
                      setCustomerContact("");
                      setCustomerType("Installment");
                      window.location.reload();
                    })
                    .catch((err) => console.log(err))
                : localStorage.getItem("customer_name") &&
                  localStorage.getItem("customer_contact") &&
                  localStorage.getItem("customer_address")
                ? toast.info("You have not added anything to the invoice!", {
                    position: toast.POSITION.TOP_CENTER,
                  })
                : toast.info("Fill All the information about customer", {
                    position: toast.POSITION.TOP_CENTER,
                  });
            }}
          >
            Add To Record
          </Button>
        ) : (
          <Button
            startIcon={<StorageIcon />}
            style={{ margin: 10, backgroundColor: "purple", color: "white" }}
            variant="contained"
            id="no-print"
            onClick={() => {
              console.log("here");
              JSON.parse(localStorage.getItem("receipt")) != "" &&
              JSON.parse(localStorage.getItem("receipt")) &&
              localStorage.getItem("existing_id")
                ? invoiceService
                    .updateInvoiceCustomer(
                      localStorage.getItem("existing_id"),

                      {
                        costPriceTotal: JSON.parse(
                          localStorage.getItem("costPriceTotal")
                        ),
                        salePriceTotal: JSON.parse(
                          localStorage.getItem("salePriceTotal")
                        ),
                        customer_paid: JSON.parse(
                          localStorage.getItem("customer_paid")
                        ),
                        customerRemaining: JSON.parse(
                          localStorage.getItem("customer_remaining")
                        ),

                        receipt: JSON.parse(localStorage.getItem("receipt")),
                      }
                    )
                    .then((data) => {
                      console.log(data);
                      toast.success("Done!", {
                        position: toast.POSITION.TOP_CENTER,
                      });
                      localStorage.setItem("receipt", "[]");
                      setReceipt([]);
                      JSON.stringify(localStorage.setItem("customer_name", ""));
                      JSON.stringify(localStorage.setItem("costPriceTotal", 0));
                      JSON.stringify(localStorage.setItem("salePriceTotal", 0));
                      JSON.stringify(localStorage.setItem("customer_paid", 0));
                      JSON.stringify(
                        localStorage.setItem("customer_address", "")
                      );
                      JSON.stringify(
                        localStorage.setItem("customer_contact", "")
                      );
                      JSON.stringify(
                        localStorage.setItem("customer_remaining", 0)
                      );

                      localStorage.setItem("existing_id", "");

                      setCustomerName("");
                      setCustomerAddress("");
                      setCustomerContact("");
                      setCustomerType("Installment");
                      window.location.reload();
                    })
                    .catch((err) => console.log(err))
                : localStorage.getItem("existing_id")
                ? toast.info("You have not added anything to the invoice!", {
                    position: toast.POSITION.TOP_CENTER,
                  })
                : toast.warning("Enter Invoice Number", {
                    position: toast.POSITION.TOP_CENTER,
                  });
            }}
          >
            Add To Record
          </Button>
        )}
      </div>
    </TableContainer>
  );
}
