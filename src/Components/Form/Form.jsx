import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Outlet } from "react-router-dom";

function Form() {
  // Initialize the navigate function
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isNumberError, setIsNumberError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isNameTouched, setIsNameTouched] = useState(false);

  const handleEmail = (event) => {
    setEmail(event.target.value);
    setIsEmailError(!emailIsValid(event.target.value));
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
    if (isNameTouched) {
      setIsNameTouched(false);
    }
  };

  const handleNumber = (e) => {
    let inputValue = e.target.value;
    if (inputValue.length > 10) {
      inputValue = inputValue.slice(0, 10);
    }
    setNumber(inputValue);
    setIsNumberError(inputValue.length !== 10);
  };

  const displayLoginNotification = () => {
    toast.success("User Added Successfully !");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nameIsValid(title) || !emailIsValid(email) || number.length !== 10) {
      toast.error("Please fill in all the required information.");
      return;
    }

    const newUser = {
      name: title,
      number: number,
      email: email,
    };

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setTitle("");
    setNumber("");
    setEmail("");
    setIsNumberError(false);
    setIsEmailError(false);

    navigate("/department", { state: { userDetailsProvided: true } });

    displayLoginNotification();
  };

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const nameIsValid = (name) => {
    return name.trim() !== "";
  };

  const handleNameFocus = () => {
    setIsNameTouched(true);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} style={{ marginTop: "100px" }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={12}
            style={{
              flex: 1,
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Card>
              <CardContent>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  gutterBottom
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "Poppins",
                    fontWeight: "500",
                  }}
                >
                  Form
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    error={!nameIsValid(title) && isNameTouched}
                    helperText={
                      !nameIsValid(title) && isNameTouched
                        ? "Name cannot be empty"
                        : ""
                    }
                    variant="outlined"
                    required
                    label="Name"
                    type="string"
                    value={title}
                    onChange={handleChange}
                    onFocus={handleNameFocus}
                    component="div"
                    color="secondary"
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  />
                  <br />
                  <TextField
                    helperText={
                      isNumberError ? "Number should be 10 digits" : ""
                    }
                    label="Phone Number"
                    required
                    value={number}
                    onChange={handleNumber}
                    variant="outlined"
                    component="div"
                    error={isNumberError}
                    type="number"
                    color="secondary"
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                      marginTop: "5px",
                    }}
                  />
                  <br />
                  <TextField
                    error={isEmailError}
                    helperText={
                      isEmailError ? "Enter a valid email address" : ""
                    }
                    variant="outlined"
                    required
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleEmail}
                    component="div"
                    color="secondary"
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                      marginTop: "5px",
                      marginBottom: "10px",
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "0 auto",
                      backgroundColor: "blue",
                      textTransform: "none",
                      fontFamily: "Poppins",
                    }}
                  >
                    Collect
                  </Button>
                </form>
              </CardContent>
            </Card>
            {/* Toastify */}
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </Grid>
        </Grid>
      </Box>
      <Outlet />
    </>
  );
}

export default Form;
