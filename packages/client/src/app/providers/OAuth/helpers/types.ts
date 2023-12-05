import { useLocation, useNavigate } from 'react-router-dom';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { StateProps } from '../../../../store/userSlice';

export type TGetClientId = { service_id: string };

type TState = {
  user: StateProps;
  helpers: StateProps;
};

export type TDispatch = ThunkDispatch<TState, undefined, AnyAction> &
  Dispatch<AnyAction>;

export type TGetCodeParam = (
  location: ReturnType<typeof useLocation>,
  navigate: ReturnType<typeof useNavigate>
) => string;
