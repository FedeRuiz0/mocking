import { faker } from "@faker-js/faker";

//funcion para generar productos con faker

const { commerce, database, random, image } = faker;

faker.locale = "es";

const generateProduct = () => {
  return {
    id: database.mongodbObjectId(),
    title: commerce.productName(),
    price: commerce.price(),
    description: commerce.productDescription(),
    stock: random.numeric(1),
    image: image.image(),
  };
};

export const listFakeProducts = () => {
  const products = [];
  for (let i = 0; i < 10; i++) {
    const newProduct = generateProduct();
    products.push(newProduct);
  }
  return products;
};