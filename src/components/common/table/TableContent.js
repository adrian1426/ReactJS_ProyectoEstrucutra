import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import helpers from '../../../helpers';
import { makeStyles } from '@material-ui/core/styles';
import TableContentActions from './TableContentActions';

const useRowStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    }
  },
  tableRowCollapse: {
    '&:nth-of-type(4n-1)': {
      backgroundColor: theme.palette.action.hover
    }
  },
  tableRow: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover
    }
  },
  cellActions: {
    position: 'sticky',
    right: 0,
    width: 'auto',
    textAlign: 'center'
  },
  cell: {
    paddingLeft: '5px',
    paddingRight: '5px'
  }
}));

const TableContent = (props) => {
  const {
    data, columns, order, orderBy, page, rowsPerPage, selected, handleClick, actions, check,
    detailCollapse, detailCollapseAction, dense, actionsMinWidth, backgroundActions, fontSize
  } = props;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - (page * rowsPerPage));
  const isSelected = row => selected.indexOf(row) !== -1;
  const classes = useRowStyles();

  const onClickDetailCollapse = row => {
    handleClick(row);
    detailCollapseAction(row);
  };

  const componentCheck = (row, isItemSelected) => {
    return check ? (
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          onChange={() => handleClick(row)}
          checked={isItemSelected}
        />
      </TableCell>
    ) : null;
  };

  const componentActionDetailCollapse = (row, isItemSelected) => {
    return detailCollapse ? (
      <IconButton size="small" onClick={() => onClickDetailCollapse(row)}>
        {isItemSelected ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
    ) : null;
  };

  const componentDetailCollapse = (dataDetail, isItemSelected) => {
    return detailCollapse ? (
      <TableRow className={classes.root}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={isItemSelected} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {detailCollapse(dataDetail)}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    ) : null;
  };

  return (
    <React.Fragment>
      {helpers.stableSort(data, helpers.getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + (rowsPerPage === -1 ? data.length : rowsPerPage))
        .map((row, index) => {
          const isItemSelected = isSelected(row);

          return (
            <React.Fragment key={index}>
              <TableRow
                data-testid='tableCell'
                className={`${detailCollapse ? classes.tableRowCollapse : classes.tableRow} ${classes.root}`}
                hover
                selected={isItemSelected}
              >
                {componentCheck(row, isItemSelected)}

                {
                  columns.map(column => (
                    <TableCell
                      key={column.fieldId}
                      align={column.numeric ? 'right' : 'left'}
                      padding={column.disablePadding ? 'none' : 'default'}
                      classes={{ root: dense ? classes.cell : '' }}
                      style={{ fontSize }}
                    >
                      {column.render && column.render(row)}
                      {!column.render && row[column.fieldId]}
                    </TableCell>
                  ))
                }

                {(actions || detailCollapse) &&
                  <TableCell
                    className={classes.cellActions}
                    style={{ minWidth: actionsMinWidth, background: backgroundActions && '#FFF' }}
                    padding="checkbox"
                  >
                    {componentActionDetailCollapse(row, isItemSelected)}
                    {
                      actions && actions(row).map((action, i) => (
                        <React.Fragment key={i}>
                          {action.render}
                          {!action.render &&
                            <TableContentActions
                              tooltip={action.tooltip}
                              Icon={action.Icon}
                              onClick={() => action.onClick(row)}
                              visible={action.visible}
                              disabled={action.disabled}
                            />
                          }
                        </React.Fragment>
                      ))
                    }
                  </TableCell>
                }
              </TableRow>

              {componentDetailCollapse(row, isItemSelected)}
            </React.Fragment>
          );
        })}

      {emptyRows > 0 && (
        <TableRow style={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </React.Fragment>
  );
};

TableContent.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  actions: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  check: PropTypes.bool.isRequired,
  detailCollapse: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  detailCollapseAction: PropTypes.func.isRequired
};

export default TableContent;