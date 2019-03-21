import React from "react";
import Chip from "@material-ui/core/Chip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default function DonationsHistory({ busStop, donationHistory }) {
  if (!busStop) return null;

  return (
    <React.Fragment>
      <Chip
        className="selectedBusStopName"
        color="primary"
        label={"Donations History for " + busStop.name}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Amount</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {donationHistory.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                ${row.amount}
              </TableCell>
              <TableCell align="right">
                {row.date.toLocaleString(undefined, {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit"
                })}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
