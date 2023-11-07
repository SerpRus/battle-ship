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
  ) => Promise<{ [index: string]: string | number } | null>;
  errors: any[];
  isLoading: boolean;
  isAuth: boolean;
  isFullScreen: boolean;
  fullScreen: () => Promise<void>;
  checkIsAuth: () => Promise<IUser | null>;
}

declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
  }

  interface HTMLElement {
    msRequestFullscreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
  }
}
