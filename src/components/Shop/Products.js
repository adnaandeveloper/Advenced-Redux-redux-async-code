import ProductItem from './ProductItem'
import classes from './Products.module.css'

const DATA = [
  {
    id: 'p1',
    price: 20,
    title: 'my first book',
    description: 'the first book i ever wrote',
  },
  {
    id: 'p2',
    price: 20,
    title: 'my second book',
    description: 'the second book i ever wrote',
  },
  {
    id: 'p3',
    price: 20,
    title: 'my third book',
    description: 'the third book i ever wrote',
  },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DATA.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  )
}

export default Products
