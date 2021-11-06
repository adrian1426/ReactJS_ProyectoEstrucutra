import React, { useState, useMemo } from 'react';
import TableToolbar from './TableToolbar';
import TableContainer from '@material-ui/core/TableContainer';
import TableMaterial from '@material-ui/core/Table';
import TableHeader from './TableHeader';
import TableBody from '@material-ui/core/TableBody';
import TableContent from './TableContent';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from './TablePaginationActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { propTypes, defaultProps } from './Table.proptypes';

const asc = 'asc';
const desc = 'desc';
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    }
  }
});

const Table = (props) => {
  const {
    title, columns, data: dataTable, size, dense, options, detailCollapse, detailCollapseAction, actions, callbackSelected,
    optionsStyle, actionsMinWidth, backgroundActions, isLoading, fontSize, callbackNewPage, callBacknewRowPerPage
  } = props;
  const {
    searchDefault = false, searchFieldId = columns[0].fieldId, check = false, orderData = '', orderDataBy = '',
    pagination = true, paginationRows = [5, 10, 20], paginationRemote = false
  } = options;
  const [selectedData, setSelectedData] = useState([]);
  const [order, setOrder] = useState(orderData);
  const [orderBy, setOrderBy] = useState(orderDataBy);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(paginationRows[0]);
  const [searchText, setSearchText] = useState('');
  const haveActions = detailCollapse || actions;
  const colSpanPagination = columns.length + (haveActions ? 1 : 0) + (check ? 1 : 0);
  const { t } = useTranslation('table');
  const classes = useRowStyles();

  const styles = {
    root: {
      padding: '10px'
    },
    table: {
      minWidth: optionsStyle.minWidth || 750,
    },
    tableContainer: {
      maxHeight: optionsStyle.maxHeight || 440
    }
  };

  const data = useMemo(() => {
    if (searchText !== '') {
      return dataTable.filter(item => item[searchFieldId].toString().toLowerCase().search(searchText) !== -1);
    }
    return dataTable;
  }, [searchText, dataTable, searchFieldId]);

  const handleRequestSort = property => {
    const isAsc = orderBy === property && order === asc;
    setOrder(isAsc ? desc : asc);
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      setSelectedData(data);
      callbackSelected(data)
      return;
    }
    setSelectedData([]);
    callbackSelected([])
  };

  const handleClick = name => {
    const selectedIndex = selectedData.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedData, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedData.slice(1));
    } else if (selectedIndex === selectedData.length - 1) {
      newSelected = newSelected.concat(selectedData.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedData.slice(0, selectedIndex),
        selectedData.slice(selectedIndex + 1),
      );
    }

    setSelectedData(newSelected);
    callbackSelected(newSelected);
  };

  const handleChangePage = newPage => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    callBacknewRowPerPage(parseInt(event.target.value, 10));
  };

  const onChangeSearch = e => {
    const { value } = e.target;
    setSearchText(value)
  };

  const toolbarComponent = (title || searchDefault) && (
    <TableToolbar {...{ title, searchDefault, onChangeSearch }} />
  );

  return (
    <div style={styles.root}>
      {toolbarComponent}
      {isLoading && <LinearProgress />}

      <TableContainer style={styles.tableContainer} data-testid='tableList'>

        <TableMaterial
          size={size}
          style={styles.table}
          stickyHeader
        >

          <TableHeader
            columns={columns}
            check={check}
            numSelected={selectedData.length}
            rowCount={data.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            haveActions={haveActions}
            dense={dense}
            fontSize={fontSize}
          />

          <TableBody data-testid='tableContent'>
            <TableContent
              data={data}
              columns={columns}
              order={order}
              orderBy={orderBy}
              page={page}
              rowsPerPage={pagination ? rowsPerPage : data.length}
              selected={selectedData}
              handleClick={handleClick}
              actions={actions}
              check={check}
              detailCollapse={detailCollapse}
              detailCollapseAction={detailCollapseAction}
              dense={dense}
              actionsMinWidth={actionsMinWidth}
              backgroundActions={backgroundActions}
              fontSize={fontSize}
            />
          </TableBody>

          {
            pagination &&
            <TableFooter>
              <TableRow className={classes.root}>
                <TablePagination
                  colSpan={colSpanPagination}
                  count={data.length}
                  labelRowsPerPage={t('pagination.labelRowsPerPage')}
                  rowsPerPageOptions={
                    paginationRemote ?
                      [...paginationRows] :
                      [...paginationRows, { label: t('pagination.optionAll'), value: -1 }]
                  }
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={(newProp) =>
                    <TablePaginationActions {...{ ...newProp, paginationRemote: paginationRemote, callbackNewPage: callbackNewPage }} />
                  }
                />
              </TableRow>
            </TableFooter>
          }

        </TableMaterial>
      </TableContainer>
    </div>
  );
};

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;