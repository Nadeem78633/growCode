import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Users from "../Users/Users";
import DepartmentSelector from "./DepartmentSelector";
import { Card, CardContent, Typography } from "@mui/material";
import Warning from "../Warning/Warning";

function Department() {
  const navigate = useNavigate();
  const userInformation = JSON.parse(localStorage.getItem("users"));

  useEffect(() => {
    if (!userInformation || userInformation.length === 0) {
      setTimeout(() => {
        navigate("/");
      }, 3000); // Delay of 1 second (1000 milliseconds)
    }
  }, [navigate]);

  return (
    <div style={{ marginTop: "100px" }}>
      {!userInformation || userInformation.length === 0 ? (
        <Warning />
      ) : (
        <Card style={{ boxShadow: "none" }}>
          <CardContent>
            <Typography
              style={{
                marginBottom: "20px",
                fontSize: "20px",
                fontFamily: "Poppins",
                fontWeight: "600",
                color: "blue",
              }}
            >
              First Component
            </Typography>
            <Users />
            <Typography
              style={{
                marginTop: "50px",
                marginBottom: "10px",
                fontSize: "20px",
                fontFamily: "Poppins",
                fontWeight: "600",
                color: "blue",
              }}
            >
              Second Component
            </Typography>
            <DepartmentSelector />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Department;
