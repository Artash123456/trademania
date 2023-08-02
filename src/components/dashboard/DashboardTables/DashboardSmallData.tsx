import { FC, useMemo } from 'react';
import { useAppSelector } from 'context';
import { Row } from 'components';

interface Props {
  dayPerc?: number;
  dayPrice?: number;
  monthPerc?: number;
  monthPrice?: number;
  yearPerc?: number;
  yearPrice?: number;
  addItem?: boolean;
  totalIncome?: boolean;
}

const DashboardSmallData: FC<Props> = ({
  dayPerc,
  dayPrice,
  monthPerc,
  monthPrice,
  yearPerc,
  yearPrice,
  totalIncome,
  addItem,
}) => {
  const { totalIncomeData } = useAppSelector(({ dashboard }) => dashboard);
  const total = useMemo(() => {
    let dayPerc = 0,
      dayPrice = 0,
      monthPerc = 0,
      monthPrice = 0,
      yearPerc = 0,
      yearPrice = 0;
    for (let item in totalIncomeData) {
      if (totalIncomeData[item]?.daily || totalIncomeData[item]?.monthly) {
        dayPerc += Number(totalIncomeData[item]?.daily?.percent);
        dayPrice += Number(totalIncomeData[item]?.daily?.sum_usd);
        monthPerc += Number(totalIncomeData[item]?.monthly?.percent);
        monthPrice += Number(totalIncomeData[item]?.monthly?.sum_usd);
        yearPerc += Number(totalIncomeData[item]?.total_percent);
        yearPrice += Number(totalIncomeData[item]?.total_pnl);
      }
    }
    return { dayPerc, dayPrice, monthPerc, monthPrice, yearPerc, yearPrice };
  }, [totalIncomeData]);
  return (
    <>
      {totalIncome && !addItem ? (
        <>
          <Row type="day" percent={total?.dayPerc} price={total?.dayPrice} />
          <Row
            type="month"
            percent={total?.monthPerc}
            price={total?.monthPrice}
          />
          <Row
            type="total"
            percent={total?.yearPerc}
            price={total?.yearPrice}
          />
        </>
      ) : addItem ? (
        <>
          <Row type="day" percent="0" price="0" />
          <Row type="month" percent="0" price="0" />
          <Row type="total" percent="0" price="0" />
        </>
      ) : (
        <>
          <Row type="day" percent={dayPerc} price={dayPrice} />
          <Row type="month" percent={monthPerc} price={monthPrice} />
          <Row type="total" percent={yearPerc} price={yearPrice} />
        </>
      )}
    </>
  );
};

export default DashboardSmallData;
