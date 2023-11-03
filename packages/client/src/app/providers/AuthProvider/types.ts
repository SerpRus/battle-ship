import { ILoginDataFieldType } from '../../../pages/LoginPage/ui/loginPage';
import { ISignUpData } from '../../../pages/RegistrationPage/ui/registrationPage';

export interface IUser {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  avatar: string | null;
  email: string;
  phone: string;
}

export interface IAuthContext {
  user: IUser;
  login: (
    data: Omit<ILoginDataFieldType, 'remember'>
  ) => Promise<boolean | null>;
  logout: () => Promise<boolean>;
  signUp: (
    data: ISignUpData
  ) => Promise<{ id: number } | { reason: string } | null>;
  errors: any[];
  isLoading: boolean;
  isAuth: boolean;
  checkIsAuth: () => Promise<IUser | null>;
}
