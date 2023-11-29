import { Form, FormInput } from '@shared/ui/Form';
import css from './registrationPage.module.scss';

export const RegistrationPageTmp = () => {
  const handleSubmit = () => true;

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <Form onSubmit={handleSubmit}>
          <FormInput label="Почта" name="email" />
          <FormInput label="Логин" name="login" />
          <FormInput label="Имя" name="first_name" />
          <FormInput label="Фамилия" name="second_name" />
          <FormInput label="Телефон" name="phone" />
          <FormInput label="Пароль" name="password" />
          <FormInput label="Повторите пароль" name="confirm_password" />
          <input type="submit" />
        </Form>
      </div>
    </div>
  );
};
