import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useTranslation } from 'react-i18next';
import { colorPrimary } from '../../../theme';
import Styles from './TableHeader.module.css';

const asc = 'asc';
const styles = {
  header: {
    background: '#fff',
    borderTop: '1px solid #EAEDEF',
    borderBottom: `1px solid ${colorPrimary}`
  },
  header_actions: {
    right: 0,
    textAlign: 'center'
  },
  header_text: {
    fontWeight: 700
  }
};

const TableHeader = props => {
  const { check, columns, numSelected, rowCount, onSelectAllClick, order, orderBy, onRequestSort, haveActions, dense, fontSize } = props;
  const { t } = useTranslation('table')
  const indeterminate = (numSelected > 0) && (numSelected < rowCount);
  const checked = (rowCount > 0) && (numSelected === rowCount);
  const styleDense = dense ? Styles.Dense : '';

  const createSortHandler = property => {
    onRequestSort(property);
  };

  const componentCheck = check && (
    <TableCell padding="checkbox" style={styles.header} className={styleDense}>
      <Checkbox
        color="primary"
        indeterminate={indeterminate}
        checked={checked}
        onChange={onSelectAllClick}
      />
    </TableCell>
  );

  const componentActions = haveActions && (
    <TableCell
      style={{ ...styles.header, ...styles.header_actions, ...styles.header_text }}
    >
      {t('header.actions')}
    </TableCell>
  );

  return (
    <TableHead>
      <TableRow data-testid='tableListHead'>
        {componentCheck}

        {
          columns.map(column => {
            const active = orderBy === column.fieldId;
            const align = column.numeric ? 'right' : 'left';
            const padding = column.disablePadding ? 'none' : 'default';
            const sortDirection = active ? order : false;
            const direction = active ? order : asc;

            return (
              <TableCell
                key={column.fieldId}
                style={{ ...styles.header, ...styles.header_text, fontSize }}
                {...{ align, padding, sortDirection }}
                classes={{ root: styleDense }}
              >
                <TableSortLabel
                  active={active}
                  direction={direction}
                  onClick={() => createSortHandler(column.fieldId)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            )
          })
        }

        {componentActions}
      </TableRow>
    </TableHead>
  );
};

TableHeader.propTypes = {
  check: PropTypes.bool.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      fieldId: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      disablePadding: PropTypes.bool,
      numeric: PropTypes.bool
    })
  ).isRequired,
  numSelected: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  haveActions: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ])
};

TableHeader.defaultProps = {
  columns: [{
    disablePadding: false,
    numeric: false
  }]
};

export default TableHeader;