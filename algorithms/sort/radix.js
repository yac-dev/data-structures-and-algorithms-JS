function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
} // inputとして、integreとそのintegerの10の何乗、の部分を入れる。(123, 1)っていうinputなら、2が返ってくるようになる。
// これ自体で、leetcodeの問題とかで出そうなやつだな。

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
} // これは、inputのnumberが何桁持つかを返すhelper method。radixにおいては、そのsequenseにおいて一番大きいdigit分、処理を繰り返していく。
// このfunctionはあくまで、一つのinputに対してそのinputのintegerの桁数を返すmethodである。

function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
} // 個々の桁数を見て、sequenseにおいて一番大きいdigitを返す。sequenseをloopしてね。

function radixSort(nums) {
  let maxDigitCount = mostDigits(nums);
  for (let k = 0; k < maxDigitCount; k++) {
    let digitBuckets = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < nums.length; i++) {
      let digit = getDigit(nums[i], k);
      digitBuckets[digit].push(nums[i]);
    }
    nums = [].concat(...digitBuckets);
  }
  return nums;
}

radixSort([23, 345, 5467, 12, 2345, 9852]);
