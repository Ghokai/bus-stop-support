import React from "react";
import Button from "@material-ui/core/Button";

function ErrorMessage({ errorMsg, tryAgain, buttonText }) {
  return (
    <p>
      <span>{errorMsg}</span>{" "}
      <Button variant="contained" color="secondary" onClick={() => tryAgain()}>
        {buttonText && buttonText.length > 0 ? buttonText : "Try Again"}
      </Button>
    </p>
  );
}

export default ErrorMessage;
