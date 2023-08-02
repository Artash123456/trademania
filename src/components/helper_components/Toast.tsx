import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { FC } from 'react';
import {
  AiFillCloseCircle,
  AiFillCheckCircle,
  AiFillInfoCircle,
  AiFillWarning,
} from 'react-icons/ai';
const Toast = () => (
  <StyledContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    icon={<Icon />}
    pauseOnHover
  />
);

const Icon: FC<any> = (props) => {
  if (props.type === 'error') return <AiFillCloseCircle />;
  if (props.type === 'success') return <AiFillCheckCircle />;
  if (props.type === 'info') return <AiFillInfoCircle />;
  if (props.type === 'warning') return <AiFillWarning />;
  return <span></span>;
};

const StyledContainer = styled(ToastContainer)`
  width: auto;
  z-index: 8;
  .Toastify__toast-body {
    margin-right: 44px;
    > div {
      font-size: 2rem;
      line-height: 1;
    }
  }
  .Toastify__close-button {
    color: ${({ theme }) => theme.light_gray};
    font-size: 2rem;
    opacity: 1;
  }
  .Toastify--animate-icon > svg {
    font-size: 2rem;
  }
  .Toastify__toast {
    background: ${({ theme }) => theme.body_color};
    border-radius: 8px;
  }
  .Toastify__toast--error {
    border: 1px solid ${({ theme }) => theme.error_red};
    color: ${({ theme }) => theme.error_red};
    > svg {
      font-size: 2rem;
      color: ${({ theme }) => theme.error_red};
    }
  }
  .Toastify__toast--success {
    border: 1px solid #18d690;
    color: #18d690;
    > svg {
      font-size: 2rem;
      color: #18d690;
    }
  }
  .Toastify__toast--info {
    border: 1px solid #3968fc;
    color: #3968fc;
    > svg {
      font-size: 2rem;
      color: #3968fc;
    }
  }
  .Toastify__toast--warning {
    border: 1px solid #f7931a;
    color: #f7931a;
    > svg {
      font-size: 2rem;
      color: #f7931a;
    }
  }
`;
export default Toast;
