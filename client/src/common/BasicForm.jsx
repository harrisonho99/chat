import { useForm } from 'react-hook-form';
import {
  Button,
  TextField,
  makeStyles,
  Typography,
  Container,
  Grid,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => {
  return {
    container: { display: 'flex' },
    form: {
      margin: 'auto',
      textAlign: 'center',
      width: '100%',
      minWidth: 350,
      maxWidth: 700,
    },
    inputWrapper: {
      margin: 25,
      textAlign: 'center',
    },
    fieldset: {
      boxShadow: theme.shadows[4],
      borderRadius: 5,
      border: 'none',
    },
    field: {
      width: '95%',
      maxWidth: '500px',
      minWidth: '300px',
    },
    legend: { color: theme.palette.secondary.main },
  };
});

export const BasicForm = ({ title = 'Sign In', submitForm, isLoading }) => {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (submitForm) {
      submitForm(data);
    }
  };
  return (
    <Container className={classes.container}>
      <Grid container>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <fieldset className={classes.fieldset}>
              <legend>
                <Typography variant='h3' className={classes.legend}>
                  {title}
                </Typography>
              </legend>
              <div className={classes.inputWrapper}>
                <TextField
                  disabled={isLoading}
                  autoCapitalize='off'
                  autoComplete='off'
                  className={classes.field}
                  color='secondary'
                  label='UserName'
                  variant='outlined'
                  defaultValue=''
                  type='text'
                  {...register('username', { required: true })}
                />
              </div>
              {errors.username && (
                <Typography variant='caption' color='secondary'>
                  Username is required
                </Typography>
              )}
              <div className={classes.inputWrapper}>
                <TextField
                  disabled={isLoading}
                  autoCapitalize='off'
                  autoComplete='off'
                  className={classes.field}
                  variant='outlined'
                  color='secondary'
                  label='Password'
                  defaultValue=''
                  type='password'
                  {...register('password', { required: true })}
                />
              </div>
              {errors.password && (
                <Typography variant='caption' color='secondary'>
                  Password is required
                </Typography>
              )}
              <div className={classes.inputWrapper}>
                <Button
                  disabled={isLoading}
                  size='large'
                  type='submit'
                  variant='contained'
                  color='secondary'
                >
                  Submit
                </Button>
              </div>
            </fieldset>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};
