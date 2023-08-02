import { FC } from 'react';
import DataTable, { SortFunction } from 'react-data-table-component';
import {
  ConditionalStyles,
  ExpandableRowsComponent,
  PaginationChangePage,
} from 'react-data-table-component/dist/src/DataTable/types';
import styled from 'styled-components';
import Pagination from './Pagination';
import { Styled } from 'components';

interface Props {
  columns: {
    name: string;
    selector: (item: any) => any;
    omit?: boolean;
    sortFunction?: <T>(a: any, b: T) => number;
  }[];
  rows: Record<string, any>[];
  selectableRows?: boolean;
  onSelectedRowsChange?: (selected: {
    allSelected: boolean;
    selectedCount: number;
    selectedRows: Record<string, any>[];
  }) => void;
  expandableRowsComponent?: ExpandableRowsComponent<Record<string, any>>;
  conditionalRowStyles?: ConditionalStyles<Record<string, any>>[];
  pagination?: boolean;
  paginationPerPage?: number;
  noRowsPerPage?: boolean;
  selectAllRowsItem?: boolean;
  height?: string;
  total?: number;
  last_button?: boolean;
  onChangePage?: PaginationChangePage;
  paginationServer?: boolean;
  currentPage?: number;
  title?: string;
  progressPending?: boolean;
  onRowMouseEnter?: (
    row: Record<string, any>,
    e: React.MouseEvent<Element, MouseEvent>
  ) => void;
  additional_no_data_info?: string;
}
const Table: FC<Props> = ({
  columns,
  rows,
  conditionalRowStyles,
  selectableRows,
  expandableRowsComponent,
  pagination,
  onSelectedRowsChange,
  paginationPerPage = 20,
  total,
  height,
  last_button,
  onChangePage,
  paginationServer,
  currentPage = 1,
  title,
  progressPending,
  onRowMouseEnter,
  additional_no_data_info,
}) => {
  return (
    <StyledTable height={height} last_button={last_button}>
      {title && <h2>{title}</h2>}
      <DataTable
        columns={columns}
        data={rows}
        onRowMouseEnter={onRowMouseEnter}
        selectableRows={selectableRows}
        conditionalRowStyles={conditionalRowStyles}
        expandableRowsComponent={expandableRowsComponent}
        progressPending={progressPending}
        progressComponent={
          <StyledLoading className="loading-anim">
            {[1, 2, 3, 4].map((_) => (
              <div key={_}>
                <div />
                <div />
                <div />
                <div />
                <div />
              </div>
            ))}
          </StyledLoading>
        }
        onSelectedRowsChange={onSelectedRowsChange}
        paginationTotalRows={total}
        expandableRowsHideExpander
        paginationDefaultPage={currentPage}
        className="table"
        customStyles={{
          progress: {
            style: {
              background: 'transparent',
            },
          },
        }}
        responsive
        paginationServer={paginationServer}
        fixedHeader
        pagination={pagination}
        paginationIconFirstPage={null}
        onChangePage={onChangePage}
        paginationIconLastPage={null}
        paginationPerPage={paginationPerPage}
        paginationComponent={(props) => {
          return <Pagination {...props} total={total || rows.length} />;
        }}
        noDataComponent={
          <Styled.NoData additional_no_data_info={additional_no_data_info} />
        }
      />
    </StyledTable>
  );
};

const StyledLoading = styled.div`
  width: 100%;

  > div {
    padding: 8px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 0 16px;
    > div {
      background-color: ${({ theme }) => theme.body_color};
      padding: 1rem;
      box-shadow: 6px 6px 10px #18d69052;
    }
  }
`;
const StyledTable = styled.div<{
  height?: string;
  last_button?: boolean;
}>`
  overflow: hidden;
  .table {
    max-height: 100%;
    ::-webkit-scrollbar {
      width: 7px;
      height: 5px;
    }
  }
  .show-on-hover {
    display: none;
  }
  > div {
    background: transparent;
    padding: 0;
  }
  .rdt_Table,
  .rdt_Table div {
    background-color: transparent;
  }
  .rdt_TableHead {
    background-color: ${({ theme }) => theme.background_color} !important;
    .rdt_TableHeadRow {
      border-radius: 0;
      border-bottom-width: 0;
      font-size: 1.6rem;
      .rdt_TableCol {
        flex: 1;
        width: 100%;
        min-width: unset;
        > div {
          display: flex;
          > div {
            font-weight: 600;
            font-size: 1.6rem;
            line-height: 22px;
            color: ${({ theme }) => theme.light_gray};
          }
        }
      }
    }
  }
  .rdt_TableRow {
    border-radius: 0;
    margin-bottom: 5px;
    &:hover {
      .show-on-hover {
        display: block;
      }
    }
  }
  .rdt_TableCell,
  .rdt_TableCol {
    flex: 1;
    width: 100%;
    padding-inline: 10px;
    width: 150px;
    ${({ last_button }) => {
      if (last_button) {
        return '&:last-child:{padding:0}';
      }
    }}
    >div {
      width: 100%;
      max-width: 140px;
    }
    > div,
    > div > span {
      text-overflow: ellipsis;
      overflow: hidden;
      display: inline-block;
      white-space: nowrap;
      opacity: 1;
    }
  }
  .rdt_TableCell:hover {
    max-width: unset !important;
    width: auto;
    overflow: visible !important;

    > div {
      width: auto;
      max-width: unset;
      position: absolute;
      background-color: ${({ theme }) => theme.background_color};
      z-index: 1;
      box-shadow: 0px 0px 10px 15px ${({ theme }) => theme.background_color};
    }
    > div,
    > div > span {
      text-overflow: initial;
    }
  }
  .rdt_TableCol {
    padding-inline: 10px;
  }
  .rdt_TableCell > div,
  span {
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 22px;
    color: ${({ theme }) => theme.font_gray};
    display: block;
  }

  .co {
    display: grid;
    border-radius: 0;
    span:last-child {
      padding: 0.4vmin 0.8vmin;
      border-radius: 8px;
      background-color: ${({ theme }) => theme.dark_input};
      color: ${({ theme }) => theme.light_gray};
      text-align: center;
      width: fit-content;
    }
  }
  button {
    border: none;
    padding: 8px;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    outline: none;
  }
  .unfollow {
    width: 92px;
    height: 35px;
    color: #fff;
    text-transform: uppercase;
    text-align: center;
    cursor: pointer;
  }
  .canc {
    background: #e03131;
  }
  .fol {
    background: #11a267;
  }
  .button-navigation > span {
    padding: 2px 4px !important;
  }

  .svg-actions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    border-radius: 0;
    margin-left: 5px;
    svg {
      width: 25px;
      height: 25px;
      margin-right: 16px;
      cursor: pointer;
    }
  }

  @media (max-width: 1150px) {
    .svg-actions {
      margin-left: 0;
      svg {
        width: 18px;
        height: 18px;
        margin-right: 5px;
      }
    }
  }
`;
export default Table;
