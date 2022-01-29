interface ArrayObject {
  [key: string]: any;
}

export default function (array: ArrayObject, sampleSize: number) {
  const sampleArray = [];

  for (let index = 0; index < sampleSize; index++) {
    const randomNumber = Math.floor(Math.random() * array.length);
    const randomCard = array[randomNumber];
    sampleArray.push(randomCard);
    array.splice(randomNumber, 1);
  }

  return sampleArray;
}
