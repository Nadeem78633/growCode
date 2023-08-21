import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const Warning = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card>
        <CardContent>
          <Typography
            style={{
              display: "flex",
              justifyContent: "center",
              color: "blue",
              fontSize: "25px",
              fontWeight: "600",
              fontFamily: "Poppins",
            }}
          >
            <CloseIcon
              style={{
                height: "30px",
                width: "30px",
                marginTop: "5px",
                marginRight: "10px",
              }}
            />
            Warning
          </Typography>
          <Typography
            style={{
              color: "grey",
              fontSize: "18px",
              fontWeight: "400",
              fontFamily: "Poppins",
              marginTop: "10px",
            }}
          >
            Please Enter Your Detail First!
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Warning;
