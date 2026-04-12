import fs from "fs/promises"

//leitura de arquivos
async function ReadFruits() {
    const data = await fs.readFile("./fruits.json", "utf - 8");
    const fruits = JSON.parse(Data)
    return fruits
}

const fruits = await readFruits()



async function writeFruits(fruits) {
    const data = JSON.stringify(fruits, null, 2);
    await fs.writeFile("./fruits.json", data, "utf - 8");
}



async function getAllFruits() {
    const fruits = await readFruits();
    return fruits;
}

const allfruits = await getAllFruits()
console.log("Todas as frutas");
console.log(allFruits);



async function getFruitById(id) {
    const fruits = await readFruits();
    const fruit = fruits.find(item => item.id === id);
    return fruit;
}

const fruit = await getFruitById(2);
console.log("Fruta encontrada:");
console.log(fruit);


async function createFruit(nome) {
    const fruit = await readFruits();

    const newfruit = {
        id: fruits.length > 0 ? fruits[fruits.length - 1].id + 1 : 1,
        nome: nome
    };
    fruits.push(newFruit);
    await writeFruits(fruits);
    return newfruit;
}

const createdFruit = await createFruit("Maracuja");
console.log("Fruta Criada:");
console.log(createdfruit);

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
        return false
    }

    fruits.splice(index, 1);

    await writeFruits(fruits);
    return true;
}