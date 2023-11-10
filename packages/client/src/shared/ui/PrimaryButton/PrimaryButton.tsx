import React from 'react';
import { Button } from 'antd';

const PrimaryButton: React.FC<{ buttonTitle: string }> = ({ buttonTitle }) => (
  <Button type="primary" htmlType="submit">
    {buttonTitle}
  </Button>
);

export default PrimaryButton;
