import ProductItem from './ProductItem';
import styles from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    price: 6,
    title: 'My First Book',
    decription: 'The first book i ever wrote',
  },
  {
    id: 'p2',
    price: 5,
    title: 'My Second Book',
    decription: 'The second book i ever wrote',
  },
];

const Products = () => {
  return (
    <section className={styles.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(({ id, price, title, description }) => (
          <ProductItem
            id={id}
            key={id}
            title={title}
            price={price}
            description={description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
