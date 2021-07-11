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
import stockService from "../services/StockService";
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

const EditCategory = (props) => {
  const classes = useStyles();
  const [name, setName] = useState("");

  const [open, setOpen] = React.useState(false);
  const id = props.match.params.id;

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    categoryService
      .getSingleCategory(id)
      .then((data) => {
        setName(data.name);
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
        <label>Edit Category</label>
        <TextField
          label="Item Name"
          fullWidth
          value={name || ""}
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          onClick={(e) => {
            let categoryData = {
              name,
            };

            categoryService
              .updateCategory(id, categoryData)
              .then((data) => {
                toast.success("Updated Successfully", {
                  position: toast.POSITION.TOP_CENTER,
                });
                props.history.push("/");
              })
              .catch((err) => {
                console.log(err.response.data);
                toast.error(err.response.data, {
                  position: toast.POSITION.TOP_CENTER,
                });
              });
          }}
        >
          Update
        </Button>
      </div>
    </Paper>
  );
};

export default withRouter(EditCategory);
