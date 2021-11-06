import PropTypes from 'prop-types';

export const propTypes = {
  title: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      fieldId: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      disablePadding: PropTypes.bool,
      numeric: PropTypes.bool,
      render: PropTypes.elementType
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  size: PropTypes.oneOf(['small', 'medium']),
  dense: PropTypes.bool,
  options: PropTypes.shape({
    searchDefault: PropTypes.bool,
    searchFieldId: PropTypes.string,
    check: PropTypes.bool,
    orderData: PropTypes.string,
    orderDataBy: PropTypes.string,
    pagination: PropTypes.bool,
    paginationRows: PropTypes.array,
    paginationRemote: PropTypes.bool
  }),
  detailCollapse: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  detailCollapseAction: PropTypes.func,
  actions: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  callbackSelected: PropTypes.func,
  optionsStyle: PropTypes.shape({
    minWidth: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    maxHeight: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }),
  actionsMinWidth: PropTypes.string,
  backgroundActions: PropTypes.bool,
  isLoading: PropTypes.bool,
  callbackNewPage: PropTypes.func,
  callBacknewRowPerPage: PropTypes.func
};

export const defaultProps = {
  title: null,
  columns: [{
    disablePadding: false,
    numeric: false
  }],
  size: 'medium',
  dense: false,
  options: {
    searchDefault: false,
    searchFieldId: null,
    check: false,
    orderData: '',
    orderDataBy: '',
    pagination: true,
    paginationRows: [5, 10, 20],
    paginationRemote: false
  },
  detailCollapse: false,
  detailCollapseAction: () => { },
  actions: false,
  callbackSelected: () => { },
  optionsStyle: {
    minWidth: 750,
    maxHeight: 440
  },
  actionsMinWidth: '0px',
  backgroundActions: false,
  isLoading: false,
  callbackNewPage: () => { },
  callBacknewRowPerPage: () => { }
};

