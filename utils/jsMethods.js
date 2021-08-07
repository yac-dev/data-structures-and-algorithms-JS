// const graph = new Graph();
// this.adjacencyList[age] = 24; //classの外で、こんな感じでhash tableのkeyを割り当てることはできない。改めて、失敗は重要だ。
// console.log(graph);

// ------------------------ slice ------------------------ //
// const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
// const k = animals.slice();
// const copy = [...animals];
// const wrong = [animals]; // copyとこれとで、意味が全然違うことを理解しよう。

// console.log(animals);
// console.log(k); // 元の配列のbrand newコピーに使うことができる。[...animals]と同じ。
// console.log(copy);
// console.log(wrong);

// ------------------------ arrayのgarbage collection ------------------------ //
// const a = [1, 2, 3, 4, 5];
// const b = a[0];
// a.shift();
// console.log(a);
// console.log(b);

// ------------------------ spliceを使った要素の消し方 ------------------------ //
// const v = [1, 2, 3, 4, 5];
// v.splice(1, 1);
// console.log(v);

// ------------------------ while trueの見方 ------------------------//
// let result = 10;
// let count = 0;
// while (true) {
//   result += 5;
//   count++;
//   if (result > 50) {
//     console.log(count + '回目で100を超えました。');
//     return;
//   }
// }

// const practice = () => {
//   let result = 10;
//   let count = 0;
//   while (true) {
//     if (result < 50) {
//       result += 6;
//       count++;
//     } else if (result < 70) {
//       result += 5;
//     } else {
//       return result;
//     }
//   }
// };
// console.log(practice()); // ifの処理が成り立つ間は処理をloopさせたい、成り立ったらreturn で終わらせるけど。そんなときにwhile trueを使う。

// ------------------------ map method ------------------------ //
// const a = [1, 2, 3, 4, 5];
// const newa = a.map((e) => e * 2);
// console.log(newa);

// ------------------------ jsxのinput formのやつ ------------------------ //
{
  /* <div className='search-bar ui segment'>
  <form className='ui form'>
    <div className='field'>
      <label></label>
      <input />
    </div>
  </form>
</div>; */
}

// ------------------------ setTimeout ------------------------ //
// var id = setTimeout(() => {
//   console.log('Run!');
// }, 3000); // setTimeoutって不思議だな。変数にsetTimeoutのfunctionを定義したつもりだが、これで、setTimeoutが勝手に実行されるんだ。

// function greetObject(who) {
//   if (!who) {
//     // return; //これ, undefinedが返るんだ。。。
//     return null; //これは、nullを返す。。。
//   }
//   return { message: `Hello, ${who}!` };
// }

// console.log(greetObject('Eric'));
// console.log(greetObject());

// ------------------------ objectの。。。なんて言うか。。。展開 ------------------------ //
const prisoner = {};

const prisoner1 = {
  id: 23,
  name: 'yosuke',
  age: 25,
  height: 175,
};

const prisoner2 = {
  id: 45,
  name: 'jobs',
  age: 56,
  height: 183,
};

const prisoner3 = {
  id: 89,
  name: 'musk',
  age: 43,
  height: 185,
};

const prisoners = { ...prisoner };
// console.log(prisoners);
prisoners[prisoner1.id] = prisoner1; //段階を分けて書くとこうなる。
// const prisoners = {
//   ...prisoner,
//   [prisoner1.id]: prisoner1,
//   [prisoner2.id]: prisoner2,
// }; //一発で書けばこうなる。
console.log(prisoners);

// ------------------------ objectのvalueを使って、brand newなarrayを作る。------------------------ //
// const person = {
//   name: 'k',
//   age: 25,
//   height: 175,
// };

// const array = Object.values(person);
// console.log(array);
