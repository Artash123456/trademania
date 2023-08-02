import { AiTwotoneSetting } from 'react-icons/ai';
import { storeDashboardWidgets } from 'redux/actions/dashboard_actions';
import { openModal } from 'redux/actions/other_actions';
import { setToEditable, cancelChanges } from 'redux/reducers/dashboard';
import { useAppDispatch, useAppSelector } from 'context';
const EditWidgetsButtons = () => {
  const dispatch = useAppDispatch();
  const { editable, save_changes, items_to_add, containers } = useAppSelector(
    ({ dashboard, loading }) => ({
      editable: dashboard.editable,
      save_changes: loading.save_changes,
      items_to_add: dashboard.items_to_add,
      containers: dashboard.containers,
    })
  );

  const saveWidgets = () => {
    if (!save_changes) {
      dispatch(storeDashboardWidgets({ items_to_add, containers }));
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
              if (items_to_add?.length) dispatch(openModal('dashboard_items'));
            }}
          >
            {'add'}
          </span>
          <span onClick={saveWidgets}>{'save'}</span>
        </div>
      )}
    </div>
  );
};

export default EditWidgetsButtons;
