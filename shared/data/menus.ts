export interface Menu {
  path: string;
  name: string;
}

export const menuList: Menu[] = [
  {
    path: '/products',
    name: 'My Products'
  },
  {
    path: '/about',
    name: 'About'
  },
  {
    path: '/contact',
    name: 'Contact'
  },
  {
    path: '/dashboard',
    name: 'Dashboard'
  },
  {
    path: '/doc',
    name: 'Doc'
  },
  /*{
    path: '/cart',
    name: 'cart'
  },*/
  {
    path:'/MyCart',
    name:'MyCart'
  },
  {
    path:'/AllProducts',
    name: 'All Products'

  }
];
