# Guia da Atividade — Trabalhando com `fs` e `JSON` no JavaScript (sem API e sem estrutura de pastas)

A proposta desta atividade é que vocês pratiquem **leitura, escrita e manipulação de arquivos JSON usando JavaScript com Node.js**, sem API, sem Express e sem estrutura de projeto com várias pastas.

Aqui, a ideia é trabalhar de forma simples e direta, usando apenas:

- um arquivo `index.js`
- um arquivo `fruits.json`

O foco é fazer vocês entenderem como o módulo `fs` funciona na prática e como o JavaScript consegue ler, alterar e salvar dados em um arquivo `.json`.

---

## Objetivo da atividade

Vocês deverão criar um pequeno sistema de frutas utilizando apenas JavaScript e um arquivo JSON local.

Esse sistema deverá permitir:

- listar todas as frutas
- buscar uma fruta por id
- cadastrar uma nova fruta
- atualizar uma fruta existente
- remover uma fruta

Tudo isso deverá ser feito manipulando diretamente um arquivo `fruits.json`.

---

# Arquivos que vocês irão utilizar

Nesta atividade, vocês irão trabalhar apenas com estes dois arquivos:

```text
index.js
fruits.json
```

---

# O que cada arquivo faz

## `fruits.json`
Será o arquivo onde os dados ficarão salvos.

## `index.js`
Será o arquivo principal onde vocês irão escrever toda a lógica da atividade:
- ler o arquivo
- converter JSON
- manipular os dados
- salvar novamente

---

# Passo a passo detalhado para criar a atividade

## Etapa 1 — criar os arquivos da atividade

Primeiro, vocês devem criar uma pasta simples para a atividade.

Dentro dessa pasta, criem apenas os arquivos:

- `index.js`
- `fruits.json`

Nesta atividade, não será necessário criar outras pastas, nem separar em módulos, nem montar estrutura maior.

A ideia aqui é praticar o básico do `fs` e da manipulação de JSON da forma mais direta possível.

---

## Etapa 2 — preparar o arquivo `fruits.json`

No arquivo `fruits.json`, vocês devem colocar alguns dados iniciais.

Exemplo de conteúdo:

```json
[
  { "id": 1, "nome": "Maçã" },
  { "id": 2, "nome": "Banana" },
  { "id": 3, "nome": "Uva" }
]
```

### O que vocês precisam observar
- o arquivo deve conter um JSON válido
- os objetos precisam estar dentro de um array
- as aspas devem ser duplas
- as vírgulas devem estar corretas

### Aprendizado desta etapa
Aqui vocês já começam entendendo que o JSON é um arquivo de texto estruturado, e que o JavaScript vai precisar ler esse texto e transformá-lo em dados manipuláveis.

---

## Etapa 3 — preparar o `index.js`

No arquivo `index.js`, vocês irão escrever toda a lógica da atividade.

Como o objetivo é trabalhar com o módulo `fs` usando a sintaxe moderna do JavaScript, vocês devem preparar o projeto para usar **ES Modules**.

No `package.json`, deixem configurado o `"type": "module"` para que o import funcione corretamente.

### Primeiro código que vocês devem digitar no `index.js`

```js
import fs from "fs/promises";
```

Esse módulo permitirá:
- ler o conteúdo do JSON
- escrever novamente no arquivo depois das alterações

---

## Etapa 4 — criar a função para ler o arquivo JSON

Agora vocês devem criar uma função responsável por ler o conteúdo do arquivo `fruits.json`.

### Exemplo de código

```js
import fs from "fs/promises";

async function readFruits() {
  const data = await fs.readFile("./fruits.json", "utf-8");
  const fruits = JSON.parse(data);
  return fruits;
}
```

### O que essa função faz
1. lê o arquivo `fruits.json`
2. recebe o conteúdo como texto
3. converte o texto com `JSON.parse`
4. devolve o array de frutas

### Exemplo de uso

```js
const fruits = await readFruits();
console.log(fruits);
```

### O que vocês precisam entender
O arquivo JSON é lido como texto.

Então o processo será:
- ler texto
- converter o texto em array JavaScript
- usar esse array normalmente dentro do código

### O que observar
Se o JSON estiver inválido, o `JSON.parse` irá falhar.

---

## Etapa 5 — criar a função para salvar no arquivo JSON

Depois disso, vocês devem criar uma função responsável por gravar novamente os dados no arquivo.

### Exemplo de código

```js
async function writeFruits(fruits) {
  const data = JSON.stringify(fruits, null, 2);
  await fs.writeFile("./fruits.json", data, "utf-8");
}
```

### O que essa função faz
1. recebe o array atualizado
2. transforma esse array em texto JSON
3. salva no arquivo `fruits.json`

### Exemplo de uso

```js
const fruits = await readFruits();
fruits.push({ id: 4, nome: "Laranja" });
await writeFruits(fruits);
```

### Ponto importante
Vocês devem usar identação para deixar o arquivo legível.

Isso ajuda a enxergar melhor as alterações no conteúdo do JSON.

---

## Etapa 6 — criar a função para listar todas as frutas

Agora vocês devem criar uma função que retorne todas as frutas salvas no arquivo.

### Exemplo de código

```js
async function getAllFruits() {
  const fruits = await readFruits();
  return fruits;
}
```

### Exemplo de uso

```js
const allFruits = await getAllFruits();
console.log("Todas as frutas:");
console.log(allFruits);
```

### Objetivo desta etapa
Entender como recuperar todos os dados de um arquivo JSON.

---

## Etapa 7 — criar a função para buscar uma fruta por id

Agora vocês devem criar uma função que procure uma fruta específica pelo id.

### Exemplo de código

```js
async function getFruitById(id) {
  const fruits = await readFruits();
  const fruit = fruits.find(item => item.id === id);
  return fruit;
}
```

### Exemplo de uso

```js
const fruit = await getFruitById(2);
console.log("Fruta encontrada:");
console.log(fruit);
```

### O que observar
Lembrem-se de que o `id` precisa ser comparado corretamente.

Se vocês quiserem garantir conversão para número, podem fazer assim:

```js
async function getFruitById(id) {
  const fruits = await readFruits();
  const fruit = fruits.find(item => item.id === Number(id));
  return fruit;
}
```

---

## Etapa 8 — criar a função para cadastrar uma nova fruta

Agora vocês devem criar uma função para adicionar uma nova fruta no arquivo.

### Exemplo de código

```js
async function createFruit(nome) {
  const fruits = await readFruits();

  const newFruit = {
    id: fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1,
    nome: nome
  };

  fruits.push(newFruit);

  await writeFruits(fruits);

  return newFruit;
}
```

### Exemplo de uso

```js
const createdFruit = await createFruit("Melancia");
console.log("Fruta criada:");
console.log(createdFruit);
```

### O que essa função faz
1. lê as frutas existentes
2. gera um novo id
3. monta o novo objeto
4. adiciona o item no array
5. salva novamente no arquivo
6. retorna a fruta criada

---

## Etapa 9 — criar a função para atualizar uma fruta

Agora vocês devem criar a função para alterar uma fruta já cadastrada.

### Exemplo de código

```js
async function updateFruit(id, novoNome) {
  const fruits = await readFruits();

  const index = fruits.findIndex(item => item.id === Number(id));

  if (index === -1) {
    return null;
  }

  fruits[index].nome = novoNome;

  await writeFruits(fruits);

  return fruits[index];
}
```

### Exemplo de uso

```js
const updatedFruit = await updateFruit(1, "Maçã Verde");
console.log("Fruta atualizada:");
console.log(updatedFruit);
```

### O que observar
Se a fruta não existir, a função retorna `null`.

---

## Etapa 10 — criar a função para remover uma fruta

Agora vocês devem criar a função responsável por excluir uma fruta do arquivo.

### Exemplo de código

```js
async function deleteFruit(id) {
  const fruits = await readFruits();

  const index = fruits.findIndex(item => item.id === Number(id));

  if (index === -1) {
    return false;
  }

  fruits.splice(index, 1);

  await writeFruits(fruits);

  return true;
}
```

### Exemplo de uso

```js
const deleted = await deleteFruit(2);
console.log("Fruta removida com sucesso?", deleted);
```

---

## Etapa 11 — testar tudo no próprio `index.js`

Depois de criar as funções, vocês devem testar uma por uma dentro do próprio `index.js`.

A proposta é que vocês chamem as funções manualmente e observem:

- o resultado no terminal
- a alteração acontecendo no arquivo `fruits.json`

---

# Exemplo de `index.js` quase completo

Abaixo está um exemplo de como o arquivo pode ficar durante os testes:

```js
import fs from "fs/promises";

async function readFruits() {
  const data = await fs.readFile("./fruits.json", "utf-8");
  const fruits = JSON.parse(data);
  return fruits;
}

async function writeFruits(fruits) {
  const data = JSON.stringify(fruits, null, 2);
  await fs.writeFile("./fruits.json", data, "utf-8");
}

async function getAllFruits() {
  const fruits = await readFruits();
  return fruits;
}

async function getFruitById(id) {
  const fruits = await readFruits();
  const fruit = fruits.find(item => item.id === Number(id));
  return fruit;
}

async function createFruit(nome) {
  const fruits = await readFruits();

  const newFruit = {
    id: fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1,
    nome: nome
  };

  fruits.push(newFruit);

  await writeFruits(fruits);

  return newFruit;
}

async function updateFruit(id, novoNome) {
  const fruits = await readFruits();

  const index = fruits.findIndex(item => item.id === Number(id));

  if (index === -1) {
    return null;
  }

  fruits[index].nome = novoNome;

  await writeFruits(fruits);

  return fruits[index];
}

async function deleteFruit(id) {
  const fruits = await readFruits();

  const index = fruits.findIndex(item => item.id === Number(id));

  if (index === -1) {
    return false;
  }

  fruits.splice(index, 1);

  await writeFruits(fruits);

  return true;
}

const allFruits = await getAllFruits();
console.log("Todas as frutas:");
console.log(allFruits);

const fruit = await getFruitById(1);
console.log("Buscar fruta por id:");
console.log(fruit);

const createdFruit = await createFruit("Abacaxi");
console.log("Fruta criada:");
console.log(createdFruit);

const updatedFruit = await updateFruit(1, "Maçã Gala");
console.log("Fruta atualizada:");
console.log(updatedFruit);

const deleted = await deleteFruit(3);
console.log("Fruta removida com sucesso?");
console.log(deleted);

const finalList = await getAllFruits();
console.log("Lista final:");
console.log(finalList);
```

---

# Ordem recomendada para os testes

### Primeiro
Testem a listagem das frutas.

Exemplo:

```js
const fruits = await getAllFruits();
console.log(fruits);
```

### Depois
Testem a busca por id.

Exemplo:

```js
const fruit = await getFruitById(1);
console.log(fruit);
```

### Depois
Testem o cadastro de uma nova fruta.

Exemplo:

```js
const newFruit = await createFruit("Pera");
console.log(newFruit);
```

### Depois
Testem a atualização de uma fruta.

Exemplo:

```js
const editedFruit = await updateFruit(2, "Banana Prata");
console.log(editedFruit);
```

### Por fim
Testem a remoção de uma fruta.

Exemplo:

```js
const removed = await deleteFruit(1);
console.log(removed);
```

---

# Como funciona o fluxo da atividade

## Exemplo: cadastrar uma nova fruta

1. O código chama a função de leitura
2. O arquivo `fruits.json` é lido como texto
3. O texto é convertido com `JSON.parse`
4. O novo objeto é inserido no array
5. O array atualizado é convertido novamente com `JSON.stringify`
6. O conteúdo é salvo no arquivo
7. O resultado aparece no terminal

---

# O que vocês precisam entender sobre `fs` e `JSON`

## `fs`
É o módulo que permite ao JavaScript trabalhar com arquivos.

Com ele, vocês conseguem:
- ler arquivo
- escrever arquivo
- sobrescrever conteúdo

## `JSON.parse`
Transforma texto JSON em estrutura JavaScript.

Exemplo:

```js
const texto = '[{"id":1,"nome":"Maçã"}]';
const dados = JSON.parse(texto);
console.log(dados);
```

## `JSON.stringify`
Transforma estrutura JavaScript em texto JSON.

Exemplo:

```js
const frutas = [{ id: 1, nome: "Maçã" }];
const texto = JSON.stringify(frutas, null, 2);
console.log(texto);
```

---

# O que vocês precisam observar durante a prática

Quando vocês alteram os dados em memória, isso ainda não significa que o arquivo foi alterado.

O arquivo só muda de verdade quando vocês escrevem novamente nele usando `fs`.

### Exemplo importante

Este código altera apenas em memória:

```js
const fruits = await readFruits();
fruits.push({ id: 99, nome: "Kiwi" });
console.log(fruits);
```

Mas este código realmente salva no arquivo:

```js
const fruits = await readFruits();
fruits.push({ id: 99, nome: "Kiwi" });
await writeFruits(fruits);
```

Esse é um dos pontos mais importantes da atividade.

---

# Erros comuns que vocês podem cometer

## 1. Escrever JSON inválido no arquivo
Se o `fruits.json` estiver com erro de sintaxe, o programa não conseguirá converter o conteúdo.

## 2. Ler o arquivo e esquecer de converter com `JSON.parse`
Sem isso, vocês terão apenas uma string, não um array.

Exemplo errado:

```js
const data = await fs.readFile("./fruits.json", "utf-8");
console.log(data.push({ id: 1, nome: "Teste" }));
```

Exemplo correto:

```js
const data = await fs.readFile("./fruits.json", "utf-8");
const fruits = JSON.parse(data);
fruits.push({ id: 1, nome: "Teste" });
```

## 3. Alterar os dados mas esquecer de salvar
Se vocês mudarem o array e não gravarem novamente no arquivo, nada será persistido.

## 4. Comparar `id` de forma errada
Se o `id` estiver sendo tratado como string em um ponto e número em outro, a busca pode falhar.

Exemplo mais seguro:

```js
const fruit = fruits.find(item => item.id === Number(id));
```

## 5. Escrever tudo de forma desorganizada
Mesmo sendo uma atividade simples, é importante separar bem as funções dentro do `index.js`.

---

# Roteiro para vocês construírem sozinhos

## Parte 1
Criar os arquivos `index.js` e `fruits.json`.

## Parte 2
Colocar dados iniciais no JSON.

## Parte 3
Criar a função de leitura.

## Parte 4
Criar a função de escrita.

## Parte 5
Criar a função de listagem.

## Parte 6
Criar a função de busca por id.

## Parte 7
Criar a função de cadastro.

## Parte 8
Criar a função de atualização.

## Parte 9
Criar a função de remoção.

## Parte 10
Testar tudo no terminal e observar o arquivo JSON sendo alterado.

---

# Checklist final da atividade

Ao terminar, o trabalho de vocês deve atender aos pontos abaixo:

- [ ] existe um arquivo `index.js`
- [ ] existe um arquivo `fruits.json`
- [ ] o JSON está válido
- [ ] o código consegue ler o arquivo
- [ ] o código consegue converter com `JSON.parse`
- [ ] o código consegue salvar com `JSON.stringify`
- [ ] a listagem funciona
- [ ] a busca por id funciona
- [ ] o cadastro funciona
- [ ] a atualização funciona
- [ ] a remoção funciona
- [ ] as alterações permanecem salvas no arquivo

---

# Proposta de desafio extra

Depois que vocês concluírem a atividade principal, vocês podem avançar e fazer melhorias como:

- impedir frutas com nomes duplicados
- adicionar campo `cor`
- adicionar campo `preco`
- permitir buscar frutas pelo nome
- criar uma função para resetar o arquivo JSON
- mostrar mensagens mais claras no terminal

### Exemplo de desafio: impedir nomes duplicados

```js
async function createFruit(nome) {
  const fruits = await readFruits();

  const alreadyExists = fruits.some(
    item => item.nome.toLowerCase() === nome.toLowerCase()
  );

  if (alreadyExists) {
    console.log("Essa fruta já está cadastrada.");
    return null;
  }

  const newFruit = {
    id: fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1,
    nome: nome
  };

  fruits.push(newFruit);
  await writeFruits(fruits);

  return newFruit;
}
```

---
