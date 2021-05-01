import { RegisterForm } from '../../common/RegisterForm';
import {
  publicRequest,
} from '../../helper/request/request';
import { useState } from 'react';
import { SimpleSnackbar } from '../../common/SimpleSnackbar';
import { useHistory } from 'react-router-dom';
export const SignUp = () => {
  const history = useHistory();
  const [request, setRequest] = useState({
    isLoading: false,
    flashMessage: null,
    isOpenSnackbar: false,
    severity: 'error',
  });
  const toggleSnackbar = (value) => {
    setRequest(Object.assign({}, request, { isOpenSnackbar: value }));
  };
  const onFormSubmit = (data) => {
    setRequest({
      ...request,
      isLoading: true,
    });
    let postRequest = publicRequest({ method: 'POST', data, url: '/signup' });
    postRequest
      .then((result) => {
        if (result.data.user) {
          setRequest({
            ...request,
            severity: 'success',
            flashMessage: result.data.message,
            isLoading: false,
            isOpenSnackbar: true,
          });
          setTimeout(history.push, 2000, '/signin');
        } else {
          setRequest({
            ...request,
            flashMessage: result.data.message,
            isOpenSnackbar: true,
            isLoading: false,
            severity: 'error',
          });
        }
      })
      .catch(() => {
        setRequest({
          ...request,
          flashMessage: 'Some thing was wrong!',
          isOpenSnackbar: true,
          isLoading: false,
          severity: 'error',
        });
      });
  };
  return (
    <>
      <SimpleSnackbar
        open={request.isOpenSnackbar}
        message={request.flashMessage}
        setOpen={toggleSnackbar}
        severity={request.severity}
      />
      <RegisterForm
        title='SIGN UP 😏'
        submitForm={onFormSubmit}
        isLoading={request.isLoading}
      />
    </>
  );
};
