import React from 'react';
import { Button } from 'antd';

const PrimaryButton: React.FC<{ children: string }> = ({ children }) => (
  <Button type="primary" htmlType="submit">
    {children}
  </Button>
);

export default PrimaryButton;
