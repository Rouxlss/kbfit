import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";

export const RegisterPage = () => {
    return (
        <AuthLayout title="Register">
            <form>
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre Completo"
                            type="text"
                            autoComplete={false}
                            placeholder="Tu nombre completo"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Correo"
                            type="email"
                            autoComplete={false}
                            placeholder="correo@google.com"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Contraseña"
                            type="password"
                            autoComplete={false}
                            placeholder="contraseña"
                            fullWidth
                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12}>
                            <Button
                                sx={{ mt: 2 }}
                                variant="contained"
                                fullWidth
                            >
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justifyContent="end">
                        <Typography>
                            Ya tienes cuenta?{" "}
                            <Link
                                color="inherit"
                                component={RouterLink}
                                to="/auth/login"
                            >
                                Ingresar
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};
