import { useState } from 'react';
import { BasicForm } from '../../common/BasicForm';
import { useSetGlobalContext } from '../../Global/bind-react/useSetGlobal';
import { useHistory } from 'react-router-dom';
import { publicRequest } from '../../helper/request/request';
import { SimpleSnackbar } from '../../common/SimpleSnackbar';
import { setLocalStorage } from '../../helper/tool/persistLocalStorage';
import { setTokenIntoCookie } from '../../helper/tool/persistCookie';

export const SignIn = () => {
  const history = useHistory();
  const setContext = useSetGlobalContext();
  const [request, setRequest] = useState({
    isLoading: false,
    flashMessage: null,
    isOpenSnackbar: false,
    severity: 'error',
  });
  const toggleSnackbar = (value) => {
    setRequest(Object.assign({}, request, { isOpenSnackbar: value }));
  };
  const handleSubmit = (data) => {
    setRequest({
      ...request,
      isLoading: true,
    });
    // post up to server
    let postRequest = publicRequest({
      method: 'POST',
      url: '/signin',
      data,
    });
    postRequest
      .then(({ data }) => {
        if (data.user) {
          const { displayName, _id: id } = data.user;
          const USER_INFO = { auth: true, displayName, id };
          setLocalStorage(USER_INFO, setContext);
          setTokenIntoCookie(data.token);
          setRequest({
            ...request,
            severity: 'success',
            flashMessage: data.message,
            isLoading: false,
          });
          return history.push('/chat');
        }
        setRequest({
          ...request,
          flashMessage: data.message,
          severity: 'error',
          isOpenSnackbar: true,
          isLoading: false,
        });
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
      <BasicForm
        title='SIGN IN 😝'
        submitForm={handleSubmit}
        isLoading={request.isLoading}
      />
      <SimpleSnackbar
        open={request.isOpenSnackbar}
        message={request.flashMessage}
        setOpen={toggleSnackbar}
        severity={request.severity}
      />
    </>
  );
};
