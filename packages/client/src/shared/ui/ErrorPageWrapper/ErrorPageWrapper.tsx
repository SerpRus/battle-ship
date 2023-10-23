import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import cls from './ErrorPageWrapper.module.scss'
import { ErrorPageWrapperProps } from './types'

export const ErrorPageWrapper = ({
  title,
  description,
}: ErrorPageWrapperProps) => {
  const navigate = useNavigate()

  return (
    <>
      <h1 className={cls.title}>{title}</h1>
      <h2 className={cls.description}>{description}</h2>
      <Button
        type="link"
        className={cls.link}
        onClick={() => {
          navigate(-1)
        }}>
        Вернуться назад
      </Button>
    </>
  )
}
