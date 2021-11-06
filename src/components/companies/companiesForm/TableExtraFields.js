import React, { useState, useContext, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Table from '../../common/table/Table';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import { showConfirmationAction, hideConfirmationAction } from '../../../context/actions/confirmation/confirmationAction';
import HomeContext from '../../../context/HomeContext';
const columns = [
    { fieldId: 'title', label: 'Nombre' },
];

const TableExtraFields = (props) => {
    const { addExtraFields, extraFields } = props;
    const [inputValue, setInputValue] = useState("");
    const [extraField, setExtraField] = useState(extraFields);
    const dispatch = useContext(HomeContext)[1];

    const deleteField = fieldId => {
        const newFields = extraField.filter(fId => fId.id !== fieldId);
        setExtraField(newFields);
        addExtraFields(newFields);
        dispatch(hideConfirmationAction());
    };

    const confirmDeleteField = field => {
        dispatch(showConfirmationAction(
            {
                open: true,
                textPrimary: 'Eliminar campo extra',
                textSecundary: `¿Está seguro en dar de baja al campo <b>${field.title}</b>?`,
                actionConfirm: () => deleteField(field.id)
            }
        ));
    };

    const actions = () => (
        [
            {
                Icon: DeleteIcon,
                tooltip: 'Eliminar campo',
                onClick: confirmDeleteField
            }
        ]
    );

    const textValue = () => {
        const id = new Date().getTime();
        const title = inputValue;
        setExtraField([...extraField, { title, id }]);
        addExtraFields([...extraField, { title, id }]);
        setInputValue("")
    }

    useEffect(() => {
        if (extraFields !== null) {
            if (extraFields[0] !== "") {
                setExtraField(extraFields)
            }
        }
    }, [extraFields])
    return (
        <React.Fragment>
            <TextField
                label='Campos extras'
                variant="outlined"
                fullWidth
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                InputProps={{
                    endAdornment:
                        <IconButton
                            onClick={textValue}
                        >
                            <AddCircleIcon />
                        </IconButton>,

                }}

            />
            <Table
                columns={columns}
                data={extraField}
                dense={true}
                options={{
                    pagination: false
                }}
                actions={actions}

            />

        </React.Fragment>
    );
}
export default TableExtraFields