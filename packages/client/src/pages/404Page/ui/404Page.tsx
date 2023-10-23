import React from 'react'
import { Layout } from 'antd'
import cls from './404Page.module.scss'
import { ErrorPageWrapper } from '../../../shared/ui/ErrorPageWrapper/ErrorPageWrapper'

const { Content } = Layout

export const NotFoundPage = () => (
  <Layout className={cls.wrapper}>
    <Content className={cls.content}>
      <ErrorPageWrapper
        title="404"
        description="Такой страницы не существует"
      />
    </Content>
  </Layout>
)
