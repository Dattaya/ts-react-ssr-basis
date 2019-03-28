import React from 'react'

import classes from './styles.css'
// Source: http://gifgifs.com/animals/chickens-and-turkeys/1309-Chicken_dances.html
import image from './image.gif'

const Lazy: React.FunctionComponent = () => (
  <div className={classes.root}><img src={image} alt="chicken dances" /><br />I'm lazy. Yay!</div>
)

export default Lazy
