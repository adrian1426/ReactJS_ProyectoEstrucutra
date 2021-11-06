const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
});

const formatterDolar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
});

export const formatPeso = (number) => {
    return formatterPeso.format(number);
};

export const formatDolar = (number) => {
    return formatterDolar.format(number);
};