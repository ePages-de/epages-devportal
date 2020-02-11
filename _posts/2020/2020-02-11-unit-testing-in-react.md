---
layout: post
title: Unit testing in React
date: 2020-02-11
header_image: public/scrum-intro-session.jpg
header_overlay: true
category: coding
tags: ["javascript", "reactjs", "testing"]
authors: ["Daniel"]
about_authors: ["dhara"]
---

## Introduction

Automated Testing is one of the most important aspects of software development. You can test your code in different ways and levels, the most relevant
of which are unit-testing and integration testing.
On the one hand, in unit testing, you test each one of your functions and components individually. On the other, in integration testing, you test
how all those work along with each other to deliver all the fancy features you offer your users.

As Adrià Fontcuberta pointed out at his remarkable talk at dotJS in Paris (check out this [blog post](https://developer.epages.com/blog/events/dotjs-2019-in-paris-from-the-perspective-of-a-frontend-designer/){:target="_blank"} about the conference, as well as the [video](https://www.dotconferences.com/2019/12/adria-fontcuberta-the-pragmatic-front-end-tester){:target="_blank"} of the actual talk), tests give predictability and
"help us sleep well at night".
In this blog post, I'll show you useful hints for unit testing a simple component in React.

## Getting started

One of our most recent features at our storefront was a "Load more" button in the product pages. We could draft here a simplified version of this
feature, and carry on to writing tests for it! This will help us to understand how tests work and how to ensure our tests are making our code
reliable and predictable.

We could start out with a simple component which has a button which can fetch (via an API) a fixed amount of, say, 1 product, and stores them
in its state in order to subsequently display it. Our first shot could be:

```javascript
const Product = (product) => (
  <div>
    <div>{product.id}</div>
    <div>{product.name}</div>
    <div>{product.price}</div>
  </div>
)

const fetchProducts = (page) => fetch(`https://beyondapi.cloud/products?page=${page}`)

export const ProductList = () => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const loadProducts = () => {
    const newProducts = await fetchProducts()
    setProducts(products.concat(newProducts))
    setPage(page + 1)
  }
  return <div>
    {products.map(product => <Product {...product} />)}
    <button onClick={loadProducts}>
       Load more!
    </button>
  </div>
}
```

## Let's test it!

Now comes the question, how would you test the component `ProductList`?

Here at ePages we use extensively the libraries `react-testing-library` and `jest` to write our unit tests.
The former contains lots of useful features, like querying for HTML elements and firing all the events the user can trigger, while the
latter provides us with a thorough mocking and assertion library.
As soon as I'm done writing the first lines of the tests, I imagine that my first test case would be to try to find a button
to load some products:

```javascript
import { fireEvent, render } from '@testing-library/react'

it('should render a button to load products', () => {
  const { getByText } = render(<ProductList />)

  const loadMoreButton = getByText('Load more!')
  fireEvent.click(loadMoreButton)
})
```

But, now, what I should expect? I do not know what some external API will return me. Maybe it is temporarily down.
There comes an important notion of testing: you must decouple your tests from other dependencies as much as possible. After all, are you testing
just `ProductList` or also an external API?

## Mock it

`jest` offers you the possibility of mocking all kinds of functions, including their return values and assert how many times they were called,
and with which arguments they were called. It also offers a great deal of synthatic sugar to make your tests look pretty and for you to admire them
after they've been written.

Maybe we could mock `fetchProducts` to take a look on whether it was called with the right arguments, and also mock the return value,
to assert whether the `ProductList` is rendering them correctly. This way our tests becomes a lot more predictable.

However... Can you do it? It's now difficult to mock `fetchProducts`, because you'd have to override the `ProductList.jsx` file.
There comes another hint: try to inject your external dependencies such that you can mock them! You could pass `fetchProducts` as a prop instead:

```javascript
export const ProductList = ({ fetchProducts }) => {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const loadProducts = () => {
    const newProducts = await fetchProducts()
    setProducts(products.concat(newProducts))
    setPage(page + 1)
  }
  return <div>
    {products.map(product => <Product {...product} />)}
    <button onClick={loadProducts}>
       Load more!
    </button>
  </div>
}
```

And what about the test?

```javascript
import { fireEvent, render } from '@testing-library/react'

it('should render a button to load products', () => {
  const fetchProducts = jest.fn().mockImplementation((page) => Promise.resolve([{
    id: `dummy-id-${page}`,
    name: 'dummy-product',
    price: '10 £',
  }]))

  const { getByText } = render(<ProductList fetchProducts={fetchProducts} />)

  const loadMoreButton = getByText('Load more!')
  
  // click the first time
  fireEvent.click(loadMoreButton)
  
  // expect one product
  expect(getByText('dummy-id-1')).toBeTruthy()
  expect(fetchProducts).toHaveBeenCalledTimes(1)
  expect(fetchProducts).toHaveBeenCalledWith(1)

  //expect two products
  expect(getByText('dummy-id-1')).toBeTruthy()
  expect(getByText('dummy-id-2')).toBeTruthy()
  expect(fetchProducts).toHaveBeenCalledWith(2)
  expect(fetchProducts).toHaveBeenCalledTimes(2)
})
```

This test can already be taken seriously! It checks whether we called `fetchProducts` with the right arguments and whether we
use the result of these calls in a meaningful way.

## Taking it to the next level

The former approach has, nevertheless, its drawbacks. We rely completely on the mock of `fetchProducts`. How can we know if it would
hit the right API endpoints?
There's were the awesome `nock` library comes along. You can also mock the HTTP requests! Calling `nock('https://beyondapi.cloud')` will
mock any requests made to `https://beyondapi.cloud` _inside_ our test! This way we also test the right HTTP requests are being made
and do not have to mock `fetchProducts` any all!

```javascript
it('should render a button to load products', () => {
  const scope = nock(`https://beyondapi.cloud`)
    .get('/products')
    .query({ page: 1})
    .reply(200, [{
      id: `dummy-id-1`,
      name: 'dummy-product',
      price: '10 £',
    }])
    .get('/products')
    .query({ page: 2 })
    .reply(200, [{
      id: `dummy-id-2`,
      name: 'dummy-product',
      price: '10 £',    
    })

  const { getByText } = render(<ProductList />)

  const loadMoreButton = getByText('Load more!')

  // click the first time
  fireEvent.click(loadMoreButton)

  // expect one product
  expect(getByText('dummy-id-1')).toBeTruthy()

  //expect two products
  expect(getByText('dummy-id-1')).toBeTruthy()
  expect(getByText('dummy-id-2')).toBeTruthy()

  scope.done()
})
```

Now, we actually test that the endpoint `/products` has been hit with query params `page=1` and `page=2`, thanks to the
`scope.done()` call, which is an awesome feature of `nock`! It asserts that all of the mocked API endpoint calls have been hit!
And, furthermore, this tests the component's feature independently of its implementation (so called 'black-box testing').
It does not matter for the test, for instance, how the `page` parameter is stored in the component. This makes it a lot easier
when the need for _refactoring_ comes.

## Conclusion

Nowadays, there is absolutely no reason why you should not unit test your code. With so many great tools out there, the effort
of writing tests absolutely pays off by dramatically decreasing the quantity of bugs and getting you covered when refactoring.  🎉

