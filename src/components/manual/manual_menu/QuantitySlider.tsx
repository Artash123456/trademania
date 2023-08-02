import { FC, useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-rangeslider';
import { useAppSelector } from 'context';
interface Props {
  onChange: (price: number) => void;
  price?: number | string;
}

const QuantitySlider: FC<Props> = ({ onChange, price = 0 }) => {
  const [slider, setSlider] = useState(0);
  const { balance } = useAppSelector(({ manual }) => manual);

  return (
    <StyledSlider>
      <Slider
        max={100}
        value={slider}
        onChange={(e) => {
          setSlider(e);
          onChange(+((+price * (+balance.coin * e)) / 100)?.toFixed(5));
        }}
        labels={{ 99: '', 74: '', 49: '', 24: '', 0: '' }}
      />
    </StyledSlider>
  );
};

const StyledSlider = styled.div`
  > .rangeslider-horizontal {
    height: 5px;
    background-color: ${({ theme }) => theme.dark_input};
    box-shadow: none;
    .rangeslider__fill {
      background-color: #3968fc;
    }
    .rangeslider__handle {
      box-shadow: none !important;
      background: #fff;
      border: 4px solid #3968fc;
      width: 20px;
      height: 20px;
      z-index: 1;
    }
    .rangeslider__handle:after {
      display: none;
    }
    .rangeslider__labels {
      margin: 0;
      .rangeslider__label-item {
        top: -11px;
        width: 16px;
        height: 16px;
        background: ${({ theme }) => theme.font_gray};
        border-radius: 50%;
      }
    }
  }
`;

export default QuantitySlider;
