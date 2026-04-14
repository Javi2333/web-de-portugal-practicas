const fs = require('fs');
const file = 'produtos.html';
let content = fs.readFileSync(file, 'utf8');
const cats = {
  1:'letreros',4:'letreros',5:'letreros',10:'letreros',
  11:'banderolas',12:'banderolas',
  2:'pantallas',3:'pantallas',6:'pantallas',7:'pantallas',
  13:'cruces',14:'cruces',35:'cruces',
  29:'marcadores',30:'marcadores',
  33:'accesorios',34:'accesorios',
  8:'rotulos',9:'rotulos',15:'rotulos',16:'rotulos',17:'rotulos',18:'rotulos',
  19:'rotulos',20:'rotulos',21:'rotulos',22:'rotulos',23:'rotulos',24:'rotulos',
  25:'rotulos',26:'rotulos',27:'rotulos',28:'rotulos',31:'rotulos',32:'rotulos',36:'rotulos'
};
for(let i=4;i<=36;i++){
  const rx = new RegExp('<article class="produto-card" data-id="' + i + '" data-title', 'g');
  content = content.replace(rx, '<article class="produto-card" data-id="' + i + '" data-category="' + cats[i] + '" data-title');
}
fs.writeFileSync(file, content, 'utf8');
console.log('Done mapping categories');
