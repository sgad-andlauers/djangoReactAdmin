import React ,{useState, useContext} from 'react';
import {Grid, Typography, TextField,  Container, Button}from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TransferList from '../addTranferListTemplate';
import axios from "axios";
import { DataContext } from "../../../context/DataContext";
import { Link } from "react-router-dom";

export default function AddAccountTemplate() {
  /** ------------------------------------------------------ definition des states utile ------------------------------------------------ */

  const { apiCities, apiDataGroup, apiDataPermissions, urlPostUser, urlPostRelations} = useContext(DataContext);
  const [inseeCode, setInseeCode] = useState(null);
  const [profils, setProfils] = React.useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    registrationNumber: "",
    cities: [],
    password: null,
    company: "",
    territorialUnity: "",
  });
  const [userGroup, setUserGroup] = useState({
    userId: null,
    type: "",
    object: "",
    objectId: []
  })
  const [userPermissions, setUserPermissions] = useState({
    userId: null,
    type: "",
    object: "",
    objectId: []
  })
 
 /** ---------------------------------------------------- fonctions pour instancier mon state profil ------------------------------------ */

  const handleChangeProfils = ( event) => {
    if(event.target.name === "username") {
      profils.username = event.target.value;
    }else if (event.target.name === "firstName"){
      profils.firstName = event.target.value;
    }else if(event.target.name === "lastName") {
      profils.lastName = event.target.value;
    }else if(event.target.name === "email"){
      profils.email= event.target.value;
    }else if (event.target.name === "registrationNumber"){
      profils.registrationNumber = event.target.value;
    }else if (event.target.name === "password"){
      profils.password = event.target.value;
    }else if (event.target.name === "company"){
      profils.company = event.target.value;
    }else if (event.target.name === "territorialUnity"){
      profils.territorialUnity = event.target.value;
    }
    setProfils(profils);
  };
  const handleChangeCities =(event, value, reason) => {
      let city = value;
    setInseeCode(city);
    let array = [];
    inseeCode && 
    inseeCode.map((d)=>array.push(d.inseeCode));
    setProfils({...profils, cities:array});

  }
  /** ---------------------------------------------------- fin des fonctions pour instancier mon state profil ------------------------------------ */
  /** ---------------------------------------------------- fontions pour ajouter un group ou une permission au profil ---------------------------- */

  const handleChangeUserGroup = (group)=>{
    let array = [];
    group && group.map((d)=>array.push(d.id));
    userGroup.type = "add";
    userGroup.object = "group";
    userGroup.objectId = array;
    setUserGroup(userGroup);
  }
  const handleChangeUserPermissions= (perm)=>{
    let array = [];
    perm && 
    perm.map((d)=>array.push(d.id));
    userPermissions.type = "add"
    userPermissions.object = "permissions";
    userPermissions.objectId = array;
    setUserPermissions(userPermissions);
    console.log("userPermissions", userPermissions);
  }
/** ---------------------------------------------------- fontions pour ajouter un group ou une permission au profil ---------------------------- */
/** ---------------------------------------------------- Post vers l'api des states ------------------------------------------------------------ */

  const postAccount = async ()=> {
    console.log("postAccount");
    await axios.post(urlPostUser, profils).then(res => {
      userPermissions.userId= res.data.data;
      userGroup.userId = res.data.data;
      setUserPermissions({...userPermissions});
      setUserGroup({...userGroup});
      console.log("res", res);
    });
    if(userGroup.objectId === []){
      return null;
    }else{
      await axios.put(urlPostRelations, userGroup).then(res => {
        console.log(res);
      });
    }
    if(userPermissions.objectId === []){
      return null;
    }else{
      await axios.put(urlPostRelations, userPermissions).then(res => {
        console.log(res);
      });
    }
  }
  /** ---------------------------------------------------- fin des fonction debut du render ---------------------------------------------------- */

  return (
    <React.Fragment>
      <Container maxWidth="xl">
      <Typography variant="h6" gutterBottom>
        Informations personnelles
        </Typography>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
            <TextField
              required
              id="username"
              name="username"
              label="Username"
              fullWidth
              onChange={( event)=>{handleChangeProfils(event)}}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="Prénom"
              fullWidth
              onChange={( event)=>{handleChangeProfils(event)}}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Nom"
              fullWidth
              onChange={( event)=>{handleChangeProfils(event)}}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}sm={6}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              onChange={( event)=>{handleChangeProfils(event)}}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              type="password"
              id="password"
              name="password"
              label="Mot de passe"
              fullWidth
              onChange={( event)=>{handleChangeProfils(event)}}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              required 
              type="password"
              id="confirmPassword" 
              name="confirmPassword" 
              label="confirme ton mot de passe" 
              fullWidth 
              onChange={( event)=>{handleChangeProfils(event)}}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}sm={6}>
            <Autocomplete
              multiple
              id="cities"
              name="cities"
              options={apiCities}
              getOptionLabel={(option) => option.name}
              onChange={(event, value, reason)=>{handleChangeCities(event, value, reason)}}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Villes"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="registerNumber"
              name="registrationNumber"
              label="Matricul"
              fullWidth
              onChange={( event)=>{handleChangeProfils(event)}}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="company"
              name="company"
              label="Company"
              fullWidth
              onChange={( event)=>{handleChangeProfils(event)}}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="territorialUnity"
              name="territorialUnity"
              label="Unité territorial"
              fullWidth
              onChange={( event)=>{handleChangeProfils(event)}}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom>
        Groupes et permissions
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
        Groupes
        </Typography>
        <TransferList
          title="groupes"
          value={apiDataGroup}
          userValue={[]}
          onChangeValue={handleChangeUserGroup}
        />
         <Typography variant="subtitle1" gutterBottom>
        Permissions
        </Typography>
        <TransferList
          title="permissions"
          value={apiDataPermissions}
          onChangeValue={handleChangeUserPermissions}
          userValue={[]}
        />
        <Link to="/users" style={{ textDecoration: "none" , color: "black"}}>
          <Button
            onClick={() => {
              postAccount();
            }}
          > 
            Ajouter un utilisateur
          </Button>
        </Link>
        
      </Container>
    </React.Fragment>
  );
}