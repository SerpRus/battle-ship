// import * as renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrimaryButton from './PrimaryButton';

describe('PrimaryButton', () => {
  test('should render button with correct title', () => {
    const buttonTitle = 'Submit';
    render(<PrimaryButton>{buttonTitle}</PrimaryButton>);

    const buttonElement = screen.getByText(buttonTitle);
    expect(buttonElement).toBeInTheDocument();
  });

  // TODO: commented cause differences in classnames in CI and local
  /* it('should match snapshot', () => {
    const buttonTitle = 'hello!';
    const tree = renderer
      .create(<PrimaryButton>{buttonTitle}</PrimaryButton>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  }); */

  it('should render correctly title', () => {
    const buttonTitle = 'Bye-bye!!!';
    const { getByText } = render(<PrimaryButton>{buttonTitle}</PrimaryButton>);

    const buttonTitleTest = getByText('Bye-bye!!!');
    expect(buttonTitleTest).toBeInTheDocument();
  });
});
