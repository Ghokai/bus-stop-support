import React from "react";
import { withRouter } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LinearProgress from "@material-ui/core/LinearProgress";

function BusStopList({ busStops, history, setSelectedBusStopId }) {
  const donationPercentage = (amount, target) => (amount * 100) / target;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Bus Stop Name(click for donate)</TableCell>
          <TableCell align="right">Total Donation(click for detail)</TableCell>
          <TableCell align="right">Remains Amount</TableCell>
          <TableCell align="right">Donation Percentage</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {busStops.map(row => (
          <TableRow className="busStopRow" key={row.stopId}>
            <TableCell component="th" scope="row">
              <u
                style={{ cursor: "pointer" }}
                onClick={() => history.push(`/donate/${row.stopId}`)}
              >
                {row.name}
              </u>
            </TableCell>
            <TableCell align="right">
              <u
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedBusStopId(row.stopId)}
              >
                ${row.donationsRaisedInDollars}
              </u>
            </TableCell>
            <TableCell align="right">
              $
              {row.donationsRaisedInDollars >= row.donationTarget
                ? 0
                : row.donationTarget - row.donationsRaisedInDollars}
            </TableCell>
            <TableCell align="right">
              <LinearProgress
                variant="determinate"
                value={donationPercentage(
                  row.donationsRaisedInDollars,
                  row.donationTarget
                )}
                color="primary"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default withRouter(BusStopList);
