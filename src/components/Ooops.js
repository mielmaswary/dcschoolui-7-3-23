import React from "react";
import { Box, Typography } from "@mui/material";
import { blue, purple } from "@mui/material/colors";

const primary = blue[1000]; // #f44336

export default function Ooops(props) {
  const { message } = props;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: primary,
      }}
    >
      <Typography
        variant="h1"
        style={{ color: "white", textAlign: "center", fontSize: "40px" }}
      >
        {message}
        <div
          style={{ color: "white", textAlign: "center", fontSize: "30px" }}
          onClick={props.handleSwitchForms}
          className="white-link"
        >
          {props.switchBtnText}
        </div>
      </Typography>
    </Box>
  );
}
