import { useState, FC, ChangeEventHandler, ReactNode } from 'react';
import { Field } from 'formik';
import styled from 'styled-components';
import { AiOutlineEye } from 'react-icons/ai';
import { FormikTouched, FormikErrors } from 'formik';
import { BsInfoCircleFill } from 'react-icons/bs';

interface Props {
  name?: string;
  type?: string;
  placeholder?: string;
  label?: string | any;
  errors?: any;
  touched?:
    | boolean
    | ''
    | FormikTouched<Record<string, boolean>>
    | FormikTouched<Record<string, boolean>>[]
    | undefined;
  autoFocus?: boolean;
  autoComplete?: string;
  as?: string;
  value?: string;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler;
  max?: number;
  info?: string;
}

const Input: FC<Props> = ({
  name,
  type,
  placeholder,
  label,
  errors,
  touched,
  autoFocus,
  autoComplete = 'off',
  as,
  children,
  className,
  disabled,
  onChange,
  value,
  max,
  info,
}) => {
  const [t, setType] = useState(type);
  const changeType = () => {
    if (t === 'password') setType('text');
    if (t === 'text') setType('password');
  };
  return (
    <StyledInp
      err={Boolean(errors && touched)}
      textarea={as === 'textarea'}
      className={className}
    >
      <label htmlFor={name}>
        {label}{' '}
        {info ? (
          <BsInfoCircleFill title={info} size={16} color="rgb(33, 150, 243)" />
        ) : (
          ''
        )}
      </label>
      {onChange ? (
        <Field
          id={name}
          name={name}
          as={as}
          type={t}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          value={value}
          max={max}
          autoComplete={autoComplete}
        />
      ) : (
        <Field
          id={name}
          as={as}
          name={name}
          type={t}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          disabled={disabled}
          max={max}
        />
      )}
      {type === 'password' && <AiOutlineEye onClick={changeType} />}
      <div className="err">{errors}</div>
      {children}
    </StyledInp>
  );
};

const StyledInp = styled.div<{ err?: boolean; textarea?: boolean }>`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 8px;
  position: relative;
  width: 100%;
  @media (max-width: 769px) {
    width: 100%;
  }
  .symbol {
    position: absolute;
    top: 30px;
    right: 0;
    display: grid;
    place-items: center;
    height: 56px;
    padding-inline: 16px;
    border-left: 1px solid ${({ theme }) => theme.light_gray};
    border-radius: 0;
    > span {
      color: ${({ theme }) => theme.light_gray};
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 22px;
    }
  }

  > svg {
    position: absolute;
    top: 50%;
    right: 10px;
    color: ${({ theme }) => theme.font_gray};
    font-size: 16px;
    cursor: pointer;
  }
  label {
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 22px;
    color: ${({ theme }) => theme.light_gray};
    margin-bottom: 8px;
    position: relative;
  }
  input,
  textarea {
    height: ${({ textarea }) => (textarea ? '70px' : '56px')};
    width: 100%;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 22px;
    letter-spacing: 0.6px;
    padding: 1.7rem;
    resize: none;
    background: ${({ err }) => (err ? '#fa52521a' : '')};
    border: 1px solid ${({ err }) => (err ? '#FA5252' : 'transparent')};
    &:placeholder {
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 22px;
      color: ${({ theme }) => theme.light_gray};
    }
  }

  .err {
    opacity: ${({ err }) => (err ? '1' : '0')};
  }
`;
export default Input;
