import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

const ProfilesSelectMenuCheck = props => {
  const { item, style, checked, indeterminate, onChange } = props;
  const { i18n } = useTranslation();
  const codeLanguage = i18n.language.substring(0, 2);

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            color="primary"
            checked={checked}
            indeterminate={indeterminate}
            onChange={onChange}
          />
        }
        label={
          <Typography style={style}>
            {item.title[codeLanguage]}
          </Typography>
        }
      />
    </FormGroup>
  );
};

ProfilesSelectMenuCheck.propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object.isRequired,
  checked: PropTypes.bool.isRequired,
  indeterminate: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ProfilesSelectMenuCheck;