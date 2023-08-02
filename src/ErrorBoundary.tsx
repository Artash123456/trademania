import React, { ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';
import { MdOutlineNearbyError } from 'react-icons/md';
export default class ErrorBoundary extends React.Component<
  { children: ReactNode },
  { error: Error | string; errorInfo: ErrorInfo }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = {
      error: '',
      errorInfo: { componentStack: '' },
    };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }
  render() {
    const { error, errorInfo } = this.state;
    if (Boolean(errorInfo.componentStack)) {
      return (
        <StyledError>
          <MdOutlineNearbyError />
          <p>
            Something wrong happened, we already aware of the issue and working
            on it, please reload the page and try again
          </p>
          {import.meta.env.VITE_DEPLOY_MODE === 'development' && (
            <details open={true}>
              {error && error.toString()}
              <br />
              {errorInfo.componentStack}
            </details>
          )}
        </StyledError>
      );
    }

    return this.props.children;
  }
}

const StyledError = styled.div`
  display: grid;
  place-items: center;
  > svg {
    font-size: 15rem;
    color: red;
  }
  > p {
    color: #707070;
    > span {
      position: relative;
      color: red;
      border: 1px dashed;
      padding: 2vmin;
      margin-top: 19px;
      display: inherit;
      text-align: center;
    }
  }
  details {
    color: red;
  }
`;
