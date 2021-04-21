import { RegisterForm } from '../../common/RegisterForm';
import { publicRequest } from '../../helper/request/request';
export const SignUp = () => {
  const onFormSubmit = (data) => {
    publicRequest({ method: 'POST', data })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return <RegisterForm title='SIGN UP 😏' submitForm={onFormSubmit} />;
};
