import { FC } from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

interface Props {
  data?: number[];
  height?: string;
  width?: string;
}
const arrayValidate = (array?: number[]) => {
  if (!array) return false;
  let length = array.length;
  if (length) {
    let last = array[length - 1];
    let preLast = array[length - 2];
    if (last >= preLast) {
      return true;
    }
  }
  return false;
};
const LinearGradientFill = () => {
  return (
    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#18D690" stopOpacity="1" />
      <stop offset="100%" stopColor="#18D690" stopOpacity="1" />
    </linearGradient>
  );
};
const LinearGradientFillNegative = () => {
  return (
    <linearGradient id="gradientNegative" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#E03131" stopOpacity="1" />
      <stop offset="100%" stopColor="#E03131" stopOpacity="1" />
    </linearGradient>
  );
};
const TableLineChart: FC<Props> = ({
  data,
  height = '50px',
  width = '130px',
}) => {
  return (
    <Sparklines data={data} style={{ width: width, height: height }}>
      <svg>
        <defs>
          {arrayValidate(data) ? (
            <LinearGradientFill />
          ) : (
            <LinearGradientFillNegative />
          )}
        </defs>
      </svg>
      {arrayValidate(data) ? (
        <SparklinesLine
          style={{ strokeWidth: 1, fill: 'url(#gradient)' }}
          color="#AFD530"
        />
      ) : (
        <SparklinesLine
          style={{ strokeWidth: 1, fill: 'url(#gradientNegative)' }}
          color="#E03131"
        />
      )}
    </Sparklines>
  );
};

export default TableLineChart;
