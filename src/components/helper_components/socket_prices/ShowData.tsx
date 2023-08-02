interface Props {
  price: string | number;
  percent: string | number;
}
const ShowData = ({ price, percent }: Props) => (
  <>
    <span className="price" title={String(price)}>
      {price && !isNaN(+price) ? Number(price)?.toFixed(2) + ' $' : '-'}{' '}
    </span>
    <span
      className={!isNaN(+percent) ? (percent < 0 ? 'pl' : 'min') : 'price'}
      title={String(percent)}
    >
      {percent && !isNaN(+percent) ? Number(percent)?.toFixed(2) + ' %' : '-'}
    </span>
  </>
);

export default ShowData;
