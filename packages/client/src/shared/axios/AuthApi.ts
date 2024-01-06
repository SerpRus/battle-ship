import { AxiosInstance } from './instance';
// @ts-ignore
import type { ISignUpData } from '../../pages/RegistrationPage/ui/registrationPage';
// @ts-ignore
import type { ILoginDataFieldType } from '../../pages/LoginPage/ui/loginPage';

class AuthApi {
  public createUser(data: ISignUpData): Promise<any> {
    return AxiosInstance.post('auth/signup', {
      ...data,
    });
  }

  public login(data: Omit<ILoginDataFieldType, 'remember'>): Promise<any> {
    return AxiosInstance.post('auth/signin', {
      ...data,
    });
  }

  public getUser(): Promise<any> {
    return AxiosInstance.get('auth/user');
  }

  public logout(): Promise<any> {
    return AxiosInstance.post('auth/logout');
  }
}

export default new AuthApi();
