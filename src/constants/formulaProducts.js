const interestIVA = 1.16;
const moratorium = 2;
const daysYear = 360;

//Tasa de interés sustituta anual - (tasa de interés anual * 1.5)
export const fAnnualSubstituteInterest = (annualRate) => {
  return annualRate * 1.5;
};

//Tasa de interés moratoria anual - (tasa de interés anual * 2)
export const fAnnualMoratoriumInterest = (annualRate) => {
  return annualRate * moratorium;
};

//Tasa de interés moratoria anual con IVA - (tasa de interés anual * 2 * 1.16)
export const fAnnualMoratoriumInterestIVA = (annualRate) => {
  return annualRate * moratorium * interestIVA;
};

//Tasa moratoria del periodo - (((tasa de interés anual * 2 * 1.16)/360)* número días de periodo)
export const fMoratoriumInterestPeriod = (annualRate, daysPeriod) => {
  return (fAnnualMoratoriumInterestIVA(annualRate) / daysYear) * daysPeriod;
};

//Tasa de interés anual con IVA - (tasa de interés anual * 1.16)
export const fInterestAnnualIVA = (annualRate) => {
  return annualRate * interestIVA;
};

//Plazo complementario - (plazo contratado * factor para plazo complementario)
export const fSupplementaryTerm = (contractedTerm, supplementaryTermFactor) => {
  return contractedTerm * supplementaryTermFactor;
};

//Tasa del periodo - ((tasa de interés anual / 360) * número días de periodo)
export const fPeriodRate = (annualRate, daysPeriod) => {
  return (annualRate / daysYear) * daysPeriod;
};

//Tasa de interés sustituta anual con IVA - (tasa de interés anual * 1.5 * 1.16)
export const fAnnualSubstituteInterestIVA = (annualRate) => {
  return annualRate * 1.5 * interestIVA;
};