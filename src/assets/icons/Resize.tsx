import { FC } from "react";
interface Props {
  color?: string;
  className?: string;
  style?: Record<string, number | string>;
}
const Resize: FC<Props> = ({ color, className, style }) => (
  <svg
    width='36'
    height='36'
    viewBox='0 0 36 36'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    style={style}
  >
    <path
      d='M6.09577 7.57842L10.4282 11.8995L11.9099 10.4198L7.5831 6.09304H11.493V4H4V11.4888H6.09577V7.57842Z'
      fill={color}
    />
    <path
      d='M24.507 4V6.09304H28.4168L24.0901 10.4198L25.5718 11.8995L29.9042 7.57842V11.4888H31.9999V4H24.507Z'
      fill={color}
    />
    <path
      d='M29.9042 27.5411L25.5718 23.22L24.0901 24.6997L28.4168 29.0208H24.507V31.1195H31.9999V23.6307H29.9042V27.5411Z'
      fill={color}
    />
    <path
      d='M10.4282 23.22L6.09577 27.5411V23.6307H4V31.1195H11.493V29.0208H7.5831L11.9099 24.6997L10.4282 23.22Z'
      fill={color}
    />
  </svg>
);

export default Resize;
