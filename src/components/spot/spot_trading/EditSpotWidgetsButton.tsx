import { AiTwotoneSetting } from 'react-icons/ai';
import { saveSpotWidgets } from 'redux/actions/spot_actions';
import { cancelChanges } from 'redux/reducers/spot';
import { openModal } from 'redux/actions/other_actions';
import { setToEditable } from 'redux/reducers/spot';
import { useAppDispatch, useAppSelector } from 'context';
const EditSpotWidgetsButton = () => {
  const dispatch = useAppDispatch();
  const { editable, pending, items_to_add } = useAppSelector(
    ({ spot, loading }) => ({
      editable: spot.editable,
      pending: loading.pending,
      items_to_add: spot.items_to_add,
    })
  );
  const saveWidgets = () => {
    if (!pending) {
      dispatch(setToEditable(false));
      dispatch(saveSpotWidgets());
    }
  };
  return (
    <div className="edit-widgets">
      {!editable ? (
        <div onClick={() => dispatch(setToEditable(true))}>
          <AiTwotoneSetting />
        </div>
      ) : (
        <div className="warn-btn">
          <span
            onClick={() => {
              dispatch(cancelChanges());
              dispatch(setToEditable(false));
            }}
          >
            {'cancel'}
          </span>
          <span
            onClick={() => {
              if (items_to_add.length) dispatch(openModal('spot_items'));
            }}
          >
            {'add'}
          </span>{' '}
          <span onClick={saveWidgets}>{'save'}</span>
        </div>
      )}
    </div>
  );
};

export default EditSpotWidgetsButton;
