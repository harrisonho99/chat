import { RegisterForm } from '../../common/RegisterForm';
import { publicRequest } from '../../helper/request/request';
import { useState } from 'react';
import { SimpleSnackbar } from '../../common/SimpleSnackbar';
export const SignUp = () => {
  const [request, setRequest] = useState({
    isLoading: false,
    flashMessage: null,
    userID: null,
    isOpenSnackbar: false,
    res: '',
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
    publicRequest({ method: 'post', data })
      .then((res) => {
        setRequest({ ...request, res: JSON.stringify(res, null, 2) });
        if (res.data.user) {
          setRequest({
            ...request,
            severity: 'success',
            flashMessage: res.data.message,
            userID: res.data.user,
            isLoading: false,
            isOpenSnackbar: true,
          });
        } else {
          setRequest({
            ...request,
            flashMessage: res.data.message,
            isOpenSnackbar: true,
            isLoading: false,
            severity: 'error',
          });
        }
      })
      .catch((err) => {
        setRequest({
          ...request,
          res: JSON.stringify(err, null, 2),
          flashMessage: 'Some thing was wrong!',
          isOpenSnackbar: true,
          isLoading: false,
          severity: 'error',
        });
      });
  };
  return (
    <>
      {request.res}
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
        flashMessage={request.flashMessage}
      />
    </>
  );
};
