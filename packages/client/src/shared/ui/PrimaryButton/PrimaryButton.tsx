import React from 'react';
import { Button } from 'antd';

const PrimaryButton: React.FC<{ children: string; onClick?: () => void }> = ({
  children,
  ...props
}) => (
  <Button type="primary" htmlType="submit" {...props}>
    {children}
  </Button>
);

export default PrimaryButton;
