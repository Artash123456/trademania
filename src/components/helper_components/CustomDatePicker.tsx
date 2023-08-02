import { FC, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { GrFormClose } from 'react-icons/gr';
import styled from 'styled-components';

const CustomDatePicker: FC<{
  onChange: (value: [Date | null, Date | null]) => void;
  showWeekNumbers?: boolean;
  selectsRange?: boolean;
  onWeekSelect?: Function;
  onMonthChange?: Function;
  values?: [any, any];
  isClearable?: boolean;
}> = ({
  onChange,
  showWeekNumbers = false,
  onWeekSelect,
  values,
  isClearable,
  onMonthChange,
}) => {
  const date = new Date();
  const [dateRange, setDateRange] = useState<any[]>(
    values ? values : [new Date(date.getTime() - 604800000), date]
  );
  const [startDate, endDate] = dateRange;
  useEffect(() => {
    if (values) setDateRange(values);
  }, [values]);
  return (
    <StyledDatePicker>
      <DatePicker
        startDate={startDate}
        endDate={endDate}
        selectsRange={true}
        showWeekNumbers={showWeekNumbers}
        placeholderText="Select Date..."
        onWeekSelect={(value) => {
          if (onWeekSelect) onWeekSelect(value, new Date());
        }}
        onMonthChange={(value) => {
          if (onMonthChange) onMonthChange(value);
        }}
        onChange={(update) => {
          setDateRange(update);
          if (update[1] && update[0] && update[1] > update[0]) onChange(update);
        }}
        maxDate={new Date(date.getTime() + 86400000)}
        title={startDate + '-' + endDate}
      />
      {isClearable ? (
        <GrFormClose
          onClick={() => {
            setDateRange([null, null]);
            onChange([null, null]);
          }}
        />
      ) : (
        ''
      )}
    </StyledDatePicker>
  );
};

const StyledDatePicker = styled.div`
  position: relative;
  padding-left: 10px;
  width: 100%;
  > svg {
    font-size: 1.6rem;
    z-index: 1;
    position: absolute;
    right: 5px;
    cursor: pointer;
    top: 30%;
    path {
      stroke: #365b99;
      stroke-width: 3;
    }
  }
  .react-datepicker-popper {
    z-index: 2;
  }
  .react-datepicker__header,
  .react-datepicker__month {
    background-color: ${({ theme }) => theme.background_color};
    margin: 0;
    border: none;
  }
  .react-datepicker__day,
  .react-datepicker__current-month,
  .react-datepicker__day-name {
    color: ${({ theme }) => theme.font_gray};
  }
  .react-datepicker__day--weekend {
    color: ${({ theme }) => theme.error_red};
    border-radius: 5px;
  }
  .react-datepicker__day--in-range {
    background-color: ${({ theme }) => theme.submit_button_background};
    color: #fff;
  }
  input {
    text-overflow: ellipsis;
  }
`;
export default CustomDatePicker;
