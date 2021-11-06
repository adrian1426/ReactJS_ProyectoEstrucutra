import React from 'react';
import CardsBoard from './CardsBoard';

const ContainerDashboard = () => {
    return (
        <CardsBoard
            amountMax={'$12,000.00'}
            months={10}
            term={18}
            maxRetention={'5%'}
            retention={'2.5%'}
            percentageWorked={'80%'}
            percentageMaxWorked={'15%'}
            percentageNotWorked={'50%'}
            percentageMaxNotWorked={'25%'}
            antiquity={10}
        >

        </CardsBoard>
    );
};

export default ContainerDashboard;