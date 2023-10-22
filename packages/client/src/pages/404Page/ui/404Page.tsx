import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Button } from 'antd'
import cls from './404Page.module.scss'

const { Content } = Layout

export const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <Layout className={cls.wrapper}>
      <Content className={cls.content}>
        <h1>404</h1>
        <h2>Такой страницы не существует</h2>
        <Button
          type="link"
          className={cls.link}
          onClick={() => {
            navigate(-1)
          }}>
          Вернуться назад
        </Button>
      </Content>
    </Layout>
  )
}
