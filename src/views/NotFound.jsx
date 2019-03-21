import React from "react";
import ErrorMessageWithLayout from "../components/ErrorMessageWithLayout";

function NotFound({ history }) {
  return (
    <ErrorMessageWithLayout
      errorMsg="The path which you are requesting is not found!"
      tryAgain={() => history.push("/")}
      buttonText="Return To Map View"
    />

    
  );
}

export default NotFound;
