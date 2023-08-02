import { FC, Fragment } from 'react';
import { SpotFilledItem } from 'components';
import { useAppSelector } from 'context';

const SpotFilledTable: FC<{ searchValue: string }> = ({ searchValue }) => {
  const { pairsTable } = useAppSelector(({ spot }) => spot);
  return (
    <>
      {Object.keys(pairsTable).map((item) => {
        const hasItem = item
          .toLowerCase()
          .startsWith(searchValue.toLowerCase());
        return (
          <Fragment key={item}>
            {hasItem && (
              <SpotFilledItem key={item} data={pairsTable[item]} elem={item} />
            )}
          </Fragment>
        );
      })}
    </>
  );
};

export default SpotFilledTable;
