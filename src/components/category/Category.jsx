import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import categoryService from "../services/CategoryService";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

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
}));

const AddStock = (props) => {
  const classes = useStyles();
  const [name, setName] = useState("");

  useEffect(() => {}, []);
  return (
    <Paper className={classes.container}>
      <div
        style={{ textAlign: "center", fontSize: 30 }}
        className={classes.child}
      >
        <label>Add Category</label>
        <TextField
          style={{ marginTop: 20, marginBottom: 15 }}
          label="Category Name"
          fullWidth
          value={name}
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br />

        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          onClick={(e) => {
            if (name !== "") {
              console.log(name);
              categoryService
                .addCategory(name)
                .then((data) => {
                  console.log(data);
                  toast.success("Category added successfully", {
                    position: toast.POSITION.TOP_CENTER,
                  });
                  setName("");
                })
                .catch((err) => {
                  console.log(err);
                  toast.error("Invalid Email or Password entered!", {
                    position: toast.POSITION.TOP_CENTER,
                  });
                });
            } else {
              toast.error("Fill All The Fields", {
                position: toast.POSITION.TOP_CENTER,
              });
            }
          }}
        >
          Add Category
        </Button>
      </div>
    </Paper>
  );
};

export default withRouter(AddStock);
