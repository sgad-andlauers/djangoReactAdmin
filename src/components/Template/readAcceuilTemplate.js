import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    maxWidth: 650,
    margin: "auto",
    textAlign: "center",
    
  },
});


function createData(name) {
    return { name};
  }
  
  const rows = [
    createData('Utilisateurs'),
    createData('Groupes'),

  ];


export default function ReadAcceuilTemplate() {
  const classes = useStyles();

  return (
    <TableContainer  style={{maxWidth:"100%"}}>
      <Table className={classes.table} >
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow >
              <TableCell component="th" scope="row">
                <Link to="/users" style={{ textDecoration: "none", color: "black" }}>  
                  {rows[0].name}
                </Link>
              </TableCell>
              <TableCell align="right">
                <Link to="/addUsers" style={{ textDecoration: "none", marginLeft: "50%" , color: "black"}}>
                    Ajouter
                </Link>
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell component="th" scope="row">
                <Link to="/groups" style={{ textDecoration: "none" , color: "black"}}>
                  {rows[1].name}
                </Link>
              </TableCell>
              <TableCell align="right" >
                <Link to="/addGroups" style={{ textDecoration: "none", marginLeft: "50%", color: "black" }}>
                  Ajouter
                </Link> 
              </TableCell>          
            </TableRow>
        </TableBody>

      </Table>
    </TableContainer>
  );
}


            