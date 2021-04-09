import React, {useState, useContext} from "react";
import axios from "axios";
import {Grid, TextField, Typography, Container, Button} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import TransferList from "../addTranferListTemplate";
import { Link } from "react-router-dom";
import { DataContext } from "../../../context/DataContext";

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 300,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
}));
export default function AddGroupTemplate() {
  const classes = useStyles();
  const {apiDataPermissions, urlPostGroup } = useContext(DataContext);
  const [createGroup, setCreateGroup] = useState({
    name: "",
    permissions:[],
  });
  /** ----------------------------------------------------------- Function for group create ---------------------------------------------------------------------- */
  const handleChangePermissionsGroup = (perm)=>{
    let array = [];
    perm && 
    perm.map((d)=>array.push(d.id));
    createGroup.permissions = array;
    setCreateGroup({...createGroup})
  };
  const handleModificateGroup =(event)=> {
    if (event.target.name === "name") {
      createGroup.name = event.target.value;
    }
    setCreateGroup({...createGroup});
  };
  const handleSaveGroup =async ()=>{
    console.log("postGroupe")
    await axios.post(urlPostGroup, createGroup)
    };
  /** ---------------------------------------------------Fin des functions for group create ---------------------------------------------------------------------- */
  return (
    <div style={{ maxWidth: "100%" }}>
        <Container maxWidth="xl">
            < Typography variant="subtitle1" className={classes.title}>
              Création du groupe
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="GroupName"
                        name="name"
                        label="Nom du groupe"
                        fullWidth
                        variant="outlined"
                        onChange={(event )=>{handleModificateGroup( event)}}
                    />
                </Grid>
                <TransferList
                    title="permissions"
                    value={apiDataPermissions}
                    onChangeValue={handleChangePermissionsGroup}
                    userValue={[]}
                />    
            </Grid>
            <Link to="/groups" style={{ textDecoration: "none", color: "black"  }}>
                <Button
                    onClick={() => {handleSaveGroup()}}
                > 
                    Créer un groupe
                </Button>
            </Link>
        </Container>
    </div>
  );
}