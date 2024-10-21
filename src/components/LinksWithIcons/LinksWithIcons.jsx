import React from 'react'

import './LinksWithIcons.css'

const LinksWithIcons = ({title, link, emoji}) => {
  return (
    <a href={link} className='align_center'>{title} 
    <img src={emoji} alt='' className='link_emoji'/></a>
  )
}

export default LinksWithIcons