const optionOne = 'ORCA BANK PLC';
const optionTwo = 'SPINX BANK PLC';
const optionThree = 'ICAC BANK PLC';
const optionFour = 'QUOTA BANK PLC';

const bankNameSet: any = {
  optionOne,
  optionTwo,
  optionThree,
  optionFour,
};

export default function getARandomBankName() {
  const options = Object.keys(bankNameSet);
  const randomOption = options[Math.floor(Math.random() * options.length)];
  return bankNameSet[randomOption];
}
