import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Input } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'start',
        flexWrap: 'wrap',
        listStyle: 'none',
        paddingLeft: theme.spacing(0.5),
        margin: 0,
        backgroundColor: '#E1DFDE'

    },
    chip: {
        margin: theme.spacing(0.5),
    },

}));

const ChipMailList = (props) => {
    const { addEmailNotification, emailNotifications } = props;
    const reEmail = new RegExp(/\S+@\S+\.\S+/);
    const classes = useStyles();
    const [inputValue, setInputValue] = useState("");
    const [chipData, setChipData] = useState(emailNotifications);

    const handleDelete = (chipToDelete) => () => {
        setChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
    };
    const keyPress = (key) => {

        if (key.keyCode === 13) {
            if (reEmail.test(inputValue)) {
                setChipData([...chipData, inputValue])
                addEmailNotification(inputValue);
                setInputValue("");

            } else {
                setInputValue("")
            }

        }

    }
    useEffect(() => {

        if (emailNotifications !== null) {
            if (emailNotifications[0] !== "") {
                setChipData(emailNotifications)
            }

        }
    }, [emailNotifications])
    return (

        <Paper component="ul" className={classes.root}>
            <Input
                onKeyDown={keyPress}
                fullWidth
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                startAdornment={
                    <>
                        {chipData?.map((data, i) => {

                            return (
                                <li key={i}>
                                    <Chip
                                        icon={<AccountCircleIcon />}
                                        label={data}
                                        onDelete={handleDelete(data)}
                                        className={classes.chip}
                                        color="primary"
                                    />
                                </li>
                            );
                        })}
                    </>
                }>
            </Input>

        </Paper>
    );
}
export default ChipMailList