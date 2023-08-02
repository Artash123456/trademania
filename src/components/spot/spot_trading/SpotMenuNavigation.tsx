import { handleSetActive } from 'redux/reducers/spot';
import { translation, useAppDispatch, useAppSelector } from 'context';

const SpotMenuNavigation = () => {
  const dispatch = useAppDispatch();
  const { side } = useAppSelector(({ spot }) => spot);
  return (
    <div className="button-navigation">
      {side.map((elem: { name: string; active?: boolean }) => (
        <span
          key={elem.name}
          onClick={() =>
            dispatch(handleSetActive({ name: elem.name, type: 'side' }))
          }
          className={elem.active ? 'active' : ''}
        >
          {translation(elem.name)}
        </span>
      ))}
    </div>
  );
};

export default SpotMenuNavigation;
