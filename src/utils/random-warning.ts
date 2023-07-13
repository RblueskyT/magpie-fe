export default function getARandomWarningSet(group: number) {
  const initialGroupNumSet = [];
  const randomGroupNumSet = [];
  const finalGroupNumSet = [];
  let zeroFlag = 0;
  let oneFlag = 0;
  while (zeroFlag < 2 || oneFlag < 2) {
    const newRandomNum = Math.floor(Math.random() * 2);
    if (newRandomNum === 0) {
      zeroFlag += 1;
    } else {
      oneFlag += 1;
    }
    randomGroupNumSet.push(newRandomNum.toString());
  }
  if (zeroFlag === 2) {
    if (oneFlag === 0) {
      randomGroupNumSet.push('1', '1');
    } else {
      randomGroupNumSet.push('1');
    }
  } else if (zeroFlag === 1) {
    randomGroupNumSet.push('0');
  } else {
    randomGroupNumSet.push('0', '0');
  }
  if (group === 1) {
    initialGroupNumSet.push('00', '01', '10', '11');
  }
  if (group === 2) {
    initialGroupNumSet.push('11', '00', '01', '10');
  }
  if (group === 3) {
    initialGroupNumSet.push('10', '11', '00', '01');
  }
  if (group === 4) {
    initialGroupNumSet.push('01', '10', '11', '00');
  }
  finalGroupNumSet.push(
    initialGroupNumSet[0].concat(randomGroupNumSet[0]),
    initialGroupNumSet[1].concat(randomGroupNumSet[1]),
    initialGroupNumSet[2].concat(randomGroupNumSet[2]),
    initialGroupNumSet[3].concat(randomGroupNumSet[3])
  );
  return finalGroupNumSet;
}
