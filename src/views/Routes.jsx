import React from "react";
import { Switch, Route } from "react-router-dom";
import MapPage from "./MapPage";
import DonatePage from "./DonatePage";
import ResultPage from "./ResultPage";
import NotFound from "./NotFound";


export default function Routes() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={MapPage} />
        <Route path="/donate/:id" component={DonatePage} />
        <Route path="/donationsummary/:id" component={ResultPage} />
        <Route path="*" component={NotFound}/>
      </Switch>
    </main>
  );
}
