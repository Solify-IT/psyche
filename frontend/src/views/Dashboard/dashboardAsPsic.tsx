import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  Grid,
  Typography,
  Paper,
}
  from '@material-ui/core';
import ContentTitle from 'src/components/contentTitle';
import MainContent from 'src/components/mainContent';
import Swal from 'sweetalert2';

function DasboarPsic() {
  const useStyles = makeStyles((theme) => ({
    heroContent: {
      padding: theme.spacing(6, 0, 6),
    },
    subtitles: {
      marginTop: '0px',
      padding: '10px',
      paddingBottom: '0px',
      color: '#000000',
    },
    description: {
      marginBottom: '10px',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    image: {
      height: '130px',
      width: 'auto',
    },
    option: {
      textDecoration: 'none',
    },
    textPadding: {
      color: '#000000',
      paddingBottom: '26px',
      paddingTop: '26px',
    },
  }));

  const classes = useStyles();

  function modal() {
    Swal.fire({
      title: 'Aviso de privacidad',
      html: '<body align="left"><font align="left" size="-2"> De acuerdo a lo Previsto en la “Ley Federal de Protección de Datos Personales”, declara Patronato Psicológico Queretano IAP, ser una institución legalmente constituida de conformidad con las leyes mexicanas, con domicilio en San Mateo 104, Vista Alegre 1ra Sec., municipio de Querétaro; y como responsable del tratamiento de sus datos personales, hace de su conocimiento que la información de nuestros pacientes es tratada de forma estrictamente confidencial por lo que al proporcionar sus datos personales, tales como: <br/> 1. Nombre Completo. <br/> 2. Dirección. <br/> 3. Clave única de registro poblacional. <br/> 4. Teléfonos de Hogar, Oficina y móviles <br/> 5. Correo Electrónico. <br/> Estos serán utilizados única y exclusivamente para los siguientes fines: <br/> 1. Registro de paciente y medios de contacto para su seguimiento. <br/> En el caso de Datos sensibles, tales como: <br/> 1. Datos Financieros (Ingresos, Estados de Cuenta, y demás relacionados) <br/> 3. Datos Personales (Cónyuge, Estado Civil, Nacionalidad, Educación, Hijos, y demás relacionados). <br/> 4. Referencias familiares y no familiares (Nombre, Dirección, Teléfono, relación, etc.). <br/> Estos serán utilizados única y exclusivamente para los siguientes fines: <br/> 1. Canalización al área de atención requerida. <br/> 2. Seguimiento al tratamiento necesario de acuerdo con su historial. <br/> 3. Entregar información solicitada por jurisdicciones que la soliciten por alguna cuestión legal. <br/> Para prevenir el acceso no autorizado a sus datos personales y con el fin de asegurar que la información sea utilizada para los fines establecidos en este aviso de privacidad, hemos establecido diversos procedimientos con la finalidad de evitar el uso o divulgación no autorizados de sus datos, permitiéndonos tratarlos debidamente. Así mismo, le informamos que sus datos personales pueden ser transmitidos para ser tratados por personas distintas a esta institución. <br/> Todos sus datos personales son tratados de acuerdo a la legislación aplicable y vigente en el país, por ello le informamos que usted tiene en todo momento los derechos (ARCO) de acceder, rectificar, cancelar u oponerse al tratamiento que le damos a sus datos personales; derecho que podrá hacer valer a través del Área de Privacidad encargada de la seguridad de datos personales en el Teléfono (442) 212 0623, o por medio de su correo electrónico: contacto@psyqueiap.org <br/>A través de estos canales usted podrá actualizar sus datos y especificar el medio por el cual desea recibir información, ya que en caso de no contar con esta especificación de su parte,  Patronato Psicológico Queretano IAP establecerá libremente el canal que considere pertinente para enviarle información. Este aviso de privacidad podrá ser modificado por el Patronato Psicológico Queretano IAP, dichas modificaciones serán oportunamente informadas a través de correo electrónico, teléfono, o cualquier otro medio de comunicación que  Patronato Psicológico Queretano IAP determine para tal efecto. </font></body>',
      width: '800px',
    });
  }

  useEffect(() => {
    modal();
  });

  return (
    <MainContent>
      <Grid container spacing={3}>

        <Grid item xs={12}>
          <ContentTitle text="Áreas" />
        </Grid>

        <Grid item xs={12}>
          <Typography align="justify" className={classes.description}>
            Selecciona el área correspondiente:
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Link to="/dashboard-atencion-psicologica" className={classes.option}>
            <Paper className={classes.paper}>
              <img src="/images/psic.png" alt="registrarPaciente" className={classes.image} />
              <Typography variant="h4" align="center" className={classes.subtitles}>
                Atención Psicológica
              </Typography>
            </Paper>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Link to="/dashboard-psiquiatrica" className={classes.option}>
            <Paper className={classes.paper}>
              <img src="/images/psiq.png" alt="Logo" className={classes.image} />
              <Typography variant="h4" align="center" className={classes.subtitles}>
                Atención Psiquiátrica
              </Typography>
            </Paper>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Link to="/dashboard-evaluacion" className={classes.option}>
            <Paper className={classes.paper}>
              <img src="/images/pericial.png" alt="registrarPaciente" className={classes.image} />
              <Typography variant="h4" align="center" className={classes.textPadding}>
                Evaluación
              </Typography>
            </Paper>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Link to="/dashboard-asesoria" className={classes.option}>
            <Paper className={classes.paper}>
              <img src="/images/asesoria.png" alt="Logo" className={classes.image} />
              <Typography variant="h4" align="center" className={classes.subtitles}>
                Asesoría Jurídica
              </Typography>
            </Paper>
          </Link>
        </Grid>

      </Grid>
    </MainContent>
  );
}

export default DasboarPsic;
