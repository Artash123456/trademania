import { FC, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from 'context';
const labels = [
  { key: 0, value: 'Cross' },
  { key: 10, value: '10X' },
  { key: 20, value: '20X' },
  { key: 30, value: '30X' },
  { key: 40, value: '40X' },
  { key: 50, value: '50X' },
  { key: 60, value: '60X' },
  { key: 70, value: '70X' },
  { key: 80, value: '80X' },
  { key: 90, value: '90X' },
  { key: 100, value: '100X' },
];
const LeverageSlider: FC<{ onChange: (value: number) => void }> = ({
  onChange,
}) => {
  const { leverage } = useAppSelector(({ manual }) => manual);
  const [state, setState] = useState({
    value: 0,
    typing: false,
    timeout: 0,
  });
  const handleChange = (value: number) => {
    if (state.timeout) {
      clearTimeout(state.timeout);
    }
    setState({
      value: value,
      typing: false,
      timeout: setTimeout(function () {
        onChange(value);
      }, 2000),
    });
  };
  return (
    <StyledSlider value={state.value || +leverage}>
      <span>{state.value ? state.value : +leverage}X</span>
      <input
        className="slider"
        type="range"
        min={0}
        max={100}
        step={1}
        onChange={(e) => handleChange(+e.target.value)}
        value={state.value ? state.value : +leverage}
      />
      <div className="flacjsb">
        {labels.map((item) => (
          <span key={item.key} onClick={() => handleChange(item.key)}>
            {item.value}
          </span>
        ))}
      </div>
    </StyledSlider>
  );
};

const StyledSlider = styled.div<{ value: number }>`
  margin-top: 20px;
  margin-bottom: 37px;
  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 16px;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    position: relative;
    &::before {
      content: ' ';
      position: absolute;
      left: 0;
      height: 16px;
      width: ${({ value }) => value}%;
      background-color: #3968fc;
    }
  }
  .slider:hover {
    opacity: 1;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: #3968fc;
    border-radius: 50%;
    cursor: pointer;
  }

  .slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #3968fc;
    cursor: pointer;
    border-radius: 50%;
  }
  > span {
    font-family: 'Manrope';
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 33px;
    color: ${({ theme }) => theme.light_gray};
  }
  .flacjsb {
    margin-top: 16px;
    > span {
      font-weight: 700;
      font-size: 1.2rem;
      line-height: 16px;
      color: ${({ theme }) => theme.font_gray} !important;
    }
  }
`;
export default LeverageSlider;
