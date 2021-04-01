import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';

export default function AddAccountTemplate(props) {
  const { city, changeCities, changeProfils, permissions, group} = props;
  return (
    <React.Fragment>
      <Container maxWidth="xl">
      <Typography variant="subtitle1" gutterBottom>
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
              onChange={( event)=>{changeProfils(event)}}
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
              onChange={( event)=>{changeProfils(event)}}
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
              onChange={( event)=>{changeProfils(event)}}
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
              onChange={( event)=>{changeProfils(event)}}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="password"
              name="password"
              label="Mot de passe"
              fullWidth
              onChange={( event)=>{changeProfils(event)}}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              required 
              id="confirmPassword" 
              name="confirmPassword" 
              label="confirme ton mot de passe" 
              fullWidth 
              onChange={( event)=>{changeProfils(event)}}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}sm={6}>
            <Autocomplete
              multiple
              id="cities"
              name="cities"
              options={city}
              getOptionLabel={(option) => option.name}
              onChange={(event, value, reason)=>{changeCities(event, value, reason)}}
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
              onChange={( event)=>{changeProfils(event)}}
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
              onChange={( event)=>{changeProfils(event)}}
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
              onChange={( event)=>{changeProfils(event)}}
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}