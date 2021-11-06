import { codigo } from './langNavigator';
import { multiple } from './multipleNumber';
import { stableSort, getComparator } from './sortTable';
import { roundTwo } from './roundDecimal';
import { validationNull } from './validations';
import { formatPeso } from './currencyFormat';
import { formatDate } from './formatDate';

export default {
    codigoIdioma: codigo,
    isMultiple: multiple,
    stableSort,
    getComparator,
    roundTwo,
    validationNull,
    formatPeso,
    formatDate
};