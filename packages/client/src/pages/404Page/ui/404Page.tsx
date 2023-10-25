import React from 'react';
import { ErrorPageWrapper } from '../../../shared/ui/ErrorPageWrapper/ErrorPageWrapper';

export const NotFoundPage = () => (
  <ErrorPageWrapper title="404" description="Такой страницы не существует" />
);
