import { FC, ReactNode } from 'react';
import ReactSelect, { ActionMeta, GetOptionLabel } from 'react-select';
import styled from 'styled-components';
import { useAppSelector } from '../../context';

interface Props {
  onChange: (newValue: any, actionMeta: ActionMeta<any>) => void;
  options: any[];
  isSearchable?: boolean;
  isDisabled?: boolean;
  isMulti?: boolean;
  classNameWrapper?: string;
  className?: string;
  classNamePrefix?: string;
  menuIsOpen?: boolean;
  defaultMenuIsOpen?: boolean;
  error_message?: string;
  onFocus?: Function;
  onBlur?: Function;
  value?: any;
  label?: string;
  labelClass?: string;
  onInputChange?: (value: string) => void;
  placeholder?: ReactNode;
  maxMenuHeight?: number;
  closeMenuOnSelect?: boolean;
  getOptionLabel?: GetOptionLabel<any>;
  defaultValue?: any;
  onMenuScrollToBottom?: (event: WheelEvent | TouchEvent) => void;
}

const Select: FC<Props> = ({
  onChange,
  options = [],
  isMulti,
  isDisabled,
  isSearchable = true,
  classNameWrapper,
  className = 'react-select',
  classNamePrefix = 'react-select',
  menuIsOpen,
  defaultMenuIsOpen,
  error_message,
  onBlur = () => {},
  onFocus = () => {},
  value,
  label,
  labelClass,
  onInputChange,
  placeholder,
  maxMenuHeight,
  closeMenuOnSelect,
  getOptionLabel,
  defaultValue,
  onMenuScrollToBottom,
}) => {
  const { isOpen } = useAppSelector(({ modal }) => modal);
  return (
    <StyledSelect className={classNameWrapper}>
      <label className={labelClass}>{label} </label>
      <ReactSelect
        isClearable={false}
        onInputChange={(value) => {
          if (onInputChange) onInputChange(value);
        }}
        className={className}
        classNamePrefix={classNamePrefix}
        options={options}
        onChange={(newValue, actionMeta) => {
          onChange(newValue, actionMeta);
        }}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
        isMulti={isMulti}
        menuIsOpen={menuIsOpen}
        defaultMenuIsOpen={defaultMenuIsOpen}
        maxMenuHeight={maxMenuHeight}
        value={value}
        onFocus={() => {
          if (onFocus) onFocus();
        }}
        placeholder={placeholder}
        onBlur={() => {
          if (onBlur) onBlur();
        }}
        closeMenuOnSelect={closeMenuOnSelect}
        getOptionLabel={getOptionLabel}
        defaultValue={defaultValue}
        onMenuScrollToBottom={onMenuScrollToBottom}
        menuPortalTarget={isOpen ? undefined : document.body}
      />
      <div className="err">{error_message}</div>
    </StyledSelect>
  );
};

const StyledSelect = styled.div`
  .react-select__control {
    border: none !important;
    min-height: 56px;
    background: ${({ theme }) => theme.dark_input} !important;
    border-radius: 8px !important;
  }
  .react-select__menu {
    z-index: 2;
  }
  .react-select__indicator-separator {
    display: none;
  }
  .react-select__single-value,
  .react-select__placeholder,
  .react-select__input,
  label {
    font-weight: 500 !important;
    font-size: 1.6rem !important;
    line-height: 22px !important;
    color: ${({ theme }) => theme.light_gray} !important;
  }
  .react-select__input-container {
    grid-template-columns: min-content auto !important;
  }
  .react-select__option--is-selected {
    > div > span {
      color: #fff !important;
    }
  }
`;
export default Select;
