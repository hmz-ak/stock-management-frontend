import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import userService from "../services/UserService";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import categoryService from "../services/CategoryService";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "5px",
  },
  child: {
    width: "300px",
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    minWidth: "300px",
  },
}));

const AddStock = (props) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [costPrice, setCostPrice] = useState();
  const [salePrice, setSalePrice] = useState();
  const [rackNumber, setRackNumber] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [quantity, setQuantity] = useState();
  const [itemCode, setItemCode] = useState();
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    categoryService
      .getCategory()
      .then((data) => {
        setCategories(data);
        console.log(data);
        console.log(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Paper className={classes.container}>
      <div
        style={{ textAlign: "center", fontSize: 30 }}
        className={classes.child}
      >
        <label>Add Stock</label>
        <TextField
          label="Item Name"
          fullWidth
          value={name}
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />
        <TextField
          label="Enter Cost Price"
          fullWidth
          value={costPrice}
          required
          onChange={(e) => {
            const re = /^[0-9\b]+$/;
            if (e.target.value == "" || re.test(e.target.value)) {
              setCostPrice(e.target.value);
            }
          }}
        />
        <br />
        <TextField
          label="Enter Sale Price"
          fullWidth
          required
          value={salePrice}
          onChange={(e) => {
            const re = /^[0-9\b]+$/;
            if (e.target.value == "" || re.test(e.target.value)) {
              setSalePrice(e.target.value);
            }
          }}
        />{" "}
        <br />
        <TextField
          label="Enter Rack Number"
          fullWidth
          required
          value={rackNumber}
          onChange={(e) => {
            const re = /^[0-9\b]+$/;
            if (e.target.value == "" || re.test(e.target.value)) {
              setRackNumber(e.target.value);
            }
          }}
        />{" "}
        <TextField
          label="Enter Stock quantity"
          fullWidth
          required
          value={quantity}
          onChange={(e) => {
            const re = /^[0-9\b]+$/;
            if (e.target.value == "" || re.test(e.target.value)) {
              setQuantity(e.target.value);
            }
          }}
        />{" "}
        <br />
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">
            Select Category
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={category}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {categories.map((data) => {
              return <MenuItem value={data.name}>{data.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <br />
        <TextField
          label="Enter Itemcode"
          fullWidth
          required
          value={itemCode}
          onChange={(e) => {
            const re = /^[0-9\b]+$/;
            if (e.target.value == "" || re.test(e.target.value)) {
              setItemCode(e.target.value);
            }
          }}
        />{" "}
        <br />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          onClick={(e) => {
            // if (name !== "" && password !== "") {
            //   userService
            //     .login(name, password)
            //     .then((data) => {
            //       console.log(data);
            //       window.location.href = "/";
            //     })
            //     .catch((err) => {
            //       console.log(err);
            //       toast.error("Invalid Email or Password entered!", {
            //         position: toast.POSITION.TOP_CENTER,
            //       });
            //     });
            // } else {
            //   toast.error("Fill All The Fields", {
            //     position: toast.POSITION.TOP_CENTER,
            //   });
            // }
          }}
        >
          Add To Stock
        </Button>
      </div>
    </Paper>
  );
};

export default withRouter(AddStock);
