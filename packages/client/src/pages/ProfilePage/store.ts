import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { TUser, TUserData } from './types';
import { TPasswordData } from './ui/PasswordChangeFieldset/types';

export class UserStore {
  static baseUrl = 'https://ya-praktikum.tech/api/v2';

  public async getUser() {
    const config: AxiosRequestConfig = {
      url: `${UserStore.baseUrl}/auth/user`,
      method: 'GET',
      responseType: 'json',
      withCredentials: true,
    };
    const result = await axios<TUser>(config);

    return result.data;
  }

  public changeAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);

    const config: AxiosRequestConfig = {
      url: `${UserStore.baseUrl}/user/profile/avatar`,
      method: 'PUT',
      data: formData,
      withCredentials: true,
    };
    try {
      const result = await axios(config);
      return result.status === 200;
    } catch {
      return false;
    }
  };

  private changeProperty = async (data: TUserData) => {
    const config: AxiosRequestConfig = {
      url: `${UserStore.baseUrl}/user/profile`,
      method: 'PUT',
      data,
      responseType: 'json',
      withCredentials: true,
    };
    try {
      const result = await axios(config);
      return result.status === 200;
    } catch {
      return false;
    }
  };

  public changeNickname = (value: string) =>
    this.changeProperty({ display_name: value });

  public changeFirstName = (value: string) =>
    this.changeProperty({ first_name: value });

  public changeSecondName = (value: string) =>
    this.changeProperty({ second_name: value });

  public changeEmail = (value: string) => this.changeProperty({ email: value });

  public changePhone = (value: string) => this.changeProperty({ phone: value });

  public changeLogin = (value: string) => this.changeProperty({ login: value });

  public changePassword = async (passwordObject: TPasswordData) => {
    const data = passwordObject;
    if (data.confirmPassword) {
      delete data.confirmPassword;
    }

    const config: AxiosRequestConfig = {
      url: `${UserStore.baseUrl}/user/password`,
      method: 'PUT',
      data,
      responseType: 'json',
      withCredentials: true,
    };

    try {
      const result = await axios(config);
      return result.status === 200;
    } catch {
      return false;
    }
  };
}
