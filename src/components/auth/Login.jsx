import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import userService from "../services/UserService";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
    padding: "20px",
    borderRadius: "40px",
    border: "0.5px solid #363636",
  },
  child: {
    width: "300px",
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    toast.info("You need to Log In!", {
      position: toast.POSITION.TOP_CENTER,
    });
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
      className={classes.container}
    >
      <div
        style={{ textAlign: "center", fontSize: 30 }}
        className={classes.child}
      >
        <label style={{ marginBottom: 10 }}>Login</label>
        <TextField
          label="email"
          fullWidth
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />{" "}
        <br />
        <TextField
          label="password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />{" "}
        <br />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 20 }}
          onClick={(e) => {
            if (email !== "" && password !== "") {
              userService
                .login(email, password)
                .then((data) => {
                  console.log(data);

                  window.location.href = "/";
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
          Login
        </Button>
      </div>
    </div>
  );
};

export default withRouter(Login);
