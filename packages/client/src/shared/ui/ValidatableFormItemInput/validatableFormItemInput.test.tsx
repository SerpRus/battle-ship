import { useForm } from 'react-hook-form';
import renderer from 'react-test-renderer';
import { ValidatableFormItemInput } from './ValidatableFormItemInput';
import { EMAIL_REGEXP } from '../../constants/validationConstants';

it('renders correctly', () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      phone: '',
      username: '',
      password: '',
      confirm_password: '',
    },
  });
  const tree = renderer
    .create(
      <ValidatableFormItemInput
        label="Почта"
        name="email"
        control={control}
        errors={errors}
        rules={{
          required: { value: true, message: 'Логин - обязательное поле' },
          validate: value =>
            EMAIL_REGEXP.test(value) || 'Введите корректную почту',
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
