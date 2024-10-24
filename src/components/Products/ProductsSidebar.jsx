import React from 'react'

import './ProductsSidebar.css'
import LinksWithIcons from './../LinksWithIcons/LinksWithIcons';
import rocket from '../../assets/rocket.png'

const ProductsSidebar = () => {
  return (
    
    <aside className='products_sidebar'>
        <h2>Category</h2>

        <div className='category_links'>
            <LinksWithIcons title="Electronics" 
            link="products?category=electronics" emoji={rocket}
            sidebar={true}
            />
        </div>
    </aside>
)
}

export default ProductsSidebar