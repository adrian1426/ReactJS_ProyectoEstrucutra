import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));

const TablePaginationActions = props => {
  const { count, page, rowsPerPage, onChangePage, paginationRemote, callbackNewPage } = props;
  const classes = useStyles();
  const theme = useTheme();

  const handleFirstPageButtonClick = () => {
    onChangePage(0);
  };

  const handleBackButtonClick = () => {
    onChangePage(page - 1);
  };

  const handleNextButtonClick = () => {
    onChangePage(page + 1);
  };

  const handleBackButtonClickRemote = () => {
    callbackNewPage(rowsPerPage, 'PREV');
  };

  const handleNextButtonClickRemote = () => {
    callbackNewPage(rowsPerPage, 'NEXT');
  };

  const handleLastPageButtonClick = () => {
    onChangePage(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      {
        !paginationRemote && (
          <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
        )
      }

      <IconButton
        onClick={paginationRemote ? handleBackButtonClickRemote : handleBackButtonClick}
        disabled={paginationRemote ? false : page === 0}
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
            <KeyboardArrowLeft />
          )}
      </IconButton>

      <IconButton
        onClick={paginationRemote ? handleNextButtonClickRemote : handleNextButtonClick}
        disabled={paginationRemote ? false : (page >= Math.ceil(count / rowsPerPage) - 1)}
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
            <KeyboardArrowRight />
          )}
      </IconButton>

      {
        !paginationRemote && (
          <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        )
      }
    </div>
  );
};

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired
};

export default TablePaginationActions;