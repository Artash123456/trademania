import { FC, ChangeEventHandler } from 'react';
import styled from 'styled-components';
import { Search } from 'assets/icons';

interface Props {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  value?: string;
  width?: string;
  height?: string;
  margin?: string;
  type?: string;
}

const SearchInput: FC<Props> = ({
  onChange,
  placeholder,
  value = '',
  width = '100%',
  height = '56px',
  margin = '',
  type = '',
}) => {
  return (
    <StyledInput width={width} height={height} margin={margin}>
      <Search />
      <input
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
      />
    </StyledInput>
  );
};

const StyledInput = styled.div<{
  width: string;
  height: string;
  margin: string;
}>`
  width: ${(p) => p.width};
  height: ${(p) => p.height};
  margin: ${(p) => p.margin};
  display: inline-block;
  position: relative;

  overflow: hidden;

  svg {
    position: absolute;
    top: 50%;
    left: 18px;
    transform: translatey(-50%);
    color: ${({ theme }) => theme.font_gray};
  }
  input {
    width: 100%;
    height: 100%;
    padding-left: 45px;
    letter-spacing: 0.6px;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 22px;
    color: ${({ theme }) => theme.light_gray} !important;
    ::placeholder {
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 22px;
      color: ${({ theme }) => theme.light_gray};
    }
  }
  input[type='search' i] {
    cursor: pointer;
  }
`;

export default SearchInput;
