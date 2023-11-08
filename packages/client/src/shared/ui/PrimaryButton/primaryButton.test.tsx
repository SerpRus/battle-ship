import * as renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrimaryButton from './PrimaryButton';

describe('PrimaryButton', () => {
  test('should render button with correct title', () => {
    const buttonTitle = 'Submit';
    render(<PrimaryButton buttonTitle={buttonTitle} />);

    const buttonElement = screen.getByText(buttonTitle);
    expect(buttonElement).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const tree = renderer
      .create(<PrimaryButton buttonTitle="hello!" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly title', () => {
    const { getByText } = render(<PrimaryButton buttonTitle="Bye-bye!!!" />);

    const buttonTitle = getByText('Bye-bye!!!');
    expect(buttonTitle).toBeInTheDocument();
  });
});
