import { DashboardElement, TableHead } from 'types';

export const tableInitalHeader = (
  tableHead: TableHead = [],
  element: DashboardElement,
  isModal: boolean = false
) => {
  if (!isModal) {
    let arr;
    if (element?.is_spot) {
      if (element.data) {
        arr = tableHead.filter((item) => item.name === 'active_orders');
      } else {
        arr = tableHead.filter((elem) => {
          if (
            elem.name !== 'closed_positions' &&
            elem.name !== 'open_positions' &&
            elem.name !== 'conditional_orders'
          ) {
            return elem;
          } else {
            return null;
          }
        });
      }

      const data = arr;
      const active = arr?.find((elem) => (elem.active ? elem.name : ''));
      if (!active) data[0].active = true;
      return data;
    } else {
      if (element.data) {
        arr = tableHead.filter(
          (item) =>
            item.name === 'open_positions' || item.name === 'active_orders'
        );
        return arr;
      }
      if (element?.market_id === 2) {
        arr = tableHead.filter((elem) => {
          if (elem.name !== 'closed_positions') {
            return elem;
          } else return null;
        });
        return arr;
      }
      return tableHead;
    }
  }
  return [];
};
