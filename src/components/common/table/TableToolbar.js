import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    minHeight: '48px'
  },
  title: {
    flex: '1 1 100%',
  },
  textField: {
    margin: theme.spacing(1)
  }
}));

const TableToolbar = props => {
  const { title, searchDefault, onChangeSearch } = props;
  const { t } = useTranslation('table');
  const classes = useToolbarStyles();

  const searchComponent = searchDefault && (
    <TextField
      className={classes.textField}
      variant="outlined"
      placeholder={t('toolbar.search')}
      onChange={onChangeSearch}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            < SearchIcon />
          </InputAdornment >
        )
      }}
    />
  );

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} component="div">
        {title}
      </Typography>

      {searchComponent}
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  title: PropTypes.string,
  searchDefault: PropTypes.bool,
  onChangeSearch: PropTypes.func.isRequired
};

TableToolbar.defaultProps = {
  title: null,
  searchDefault: false
};

export default TableToolbar;