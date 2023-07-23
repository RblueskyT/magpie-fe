export default function getARandomQuestionOrder(orderArr: number[]) {
  let i = 0;
  while (i < 3) {
    if (i === 0) {
      orderArr[0] = Math.floor(Math.random() * 3);
    }
    if (i === 1) {
      orderArr[1] = Math.floor(Math.random() * 3);
      while (orderArr[0] === orderArr[1]) {
        orderArr[1] = Math.floor(Math.random() * 3);
      }
    }
    if (i === 2) {
      orderArr[2] = Math.floor(Math.random() * 3);
      while (orderArr[0] === orderArr[2] || orderArr[1] === orderArr[2]) {
        orderArr[2] = Math.floor(Math.random() * 3);
      }
    }
    i += 1;
  }
}
