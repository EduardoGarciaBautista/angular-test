import {faker} from '@faker-js/faker';
import {Product} from '../models/product.model';

export const generateProduct = (): Product => {
  const {commerce, datatype, image} = faker;
  return {
    id: datatype.uuid(),
    taxes: 2,
    category: {
      id: datatype.number(),
      name: commerce.department()
    },
    description: commerce.productDescription(),
    images: [image.imageUrl(), image.imageUrl()],
    price: parseInt(commerce.price()),
    title: commerce.productName()
  };
};


export const generateManyProducts = (size = 10): Product[] => {
  const products: Product[] = [];
  for (let i = 0; i < size; i++) {
    products.push(generateProduct());
  }
  return [...products];
};
