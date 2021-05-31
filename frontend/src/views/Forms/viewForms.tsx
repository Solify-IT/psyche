import React, { useState } from 'react';
import {
  makeStyles,
  Grid,
  IconButton,
}
  from '@material-ui/core';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import Swal from 'sweetalert2';
import {
  Edit,
  Delete,
}
  from '@material-ui/icons';
import Form from 'src/interfaces/form';
import { getForms, deleteForm } from 'src/api/forms';
import PromiseLoader from 'src/utils/promiseLoader';
import { useHistory } from 'react-router';
import ContentTitle from 'src/components/contentTitle';
import MainContent from 'src/components/mainContent';

type FormsTableProps = {
  initialForms: Form[]
};

function FormsTable(props: FormsTableProps) {
  const { initialForms } = props;
  const history = useHistory();

  const [, setLoading] = useState<boolean>(false);
  const [forms, setForms] = useState<Form[]>(initialForms);
  const useStyles = makeStyles((theme) => ({
    heroContent: {
      padding: theme.spacing(6, 0, 6),
    },
    table: {
      width: '100%',
    },
  }));
  const classes = useStyles();

  const handleSubmit = async (id: number) => {
    setLoading(true);
    try {
      await deleteForm(id);
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'El formulario ha sido eliminado',
      });
      setForms(forms.filter((form) => form.id !== id));
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Ocurrió un error interno!',
      });
    } finally {
      setLoading(false);
    }
  };

  function updateForm(event: React.ChangeEvent<any>) {
    const { formid } = event.currentTarget.dataset;
    history.push(`update-form/${formid}`);
  }

  async function handleDeleteForm(id: number) {
    const result = await Swal.fire({
      title: '¿Deseas eliminar el formulario?',
      text: 'El formulario ya no estará disponible para operaciones futuras.',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#6EA84F',
      cancelButtonColor: '#FF0000',
      confirmButtonText: 'Confirmar',
    });
    if (result.isConfirmed) {
      await handleSubmit(Number(id));
    }
  }

  const columns = [
    {
      field: 'name', headerName: 'Nombre', width: 400,
    },
    {
      field: 'type', headerName: 'Área', width: 400,
    },
    {
      field: 'update',
      headerName: 'Modificar',
      width: 170,
      renderCell: function createSelect(params:any) {
        return (
          <IconButton onClick={updateForm} data-formid={params.id.toString()}>
            <Edit color="secondary" />
          </IconButton>
        );
      },
    },
    {
      field: 'delete',
      headerName: 'Eliminar',
      width: 170,
      renderCell: function createSelect(params:any) {
        return (
          <IconButton
            id={params.id.toString()}
            onClick={() => handleDeleteForm(params.id)}
            data-formid={params.id.toString()}
          >
            <Delete color="secondary" style={{ color: '#FF0000' }} />
          </IconButton>
        );
      },
    },
  ];

  return (
    <MainContent>
      <ContentTitle text="Consultar Encuestas" />
      <Grid container justify="center" alignItems="center">
        <Grid item className={classes.table}>
          <div style={{ height: 800, width: '100%', marginTop: '20px' }}>
            <DataGrid
              rows={forms}
              columns={columns}
              pageSize={20}
                // filterModel={riceFilterModel}
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </div>
        </Grid>
      </Grid>
    </MainContent>
  );
}

function ViewForms() {
  const promise = getForms();
  const content = PromiseLoader(
    promise,
    (data: Form[]) => <FormsTable initialForms={data} />,
    (error) => {
      switch (error.response?.status) {
        case 404:
          return <h2>No se encontró el expediente</h2>;
        default:
          return <h2>Ocurrió un error de conexión.</h2>;
      }
    },
  );

  return content;
}

export default ViewForms;
