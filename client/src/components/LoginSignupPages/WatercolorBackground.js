import React from 'react'
import Image from 'react-bootstrap/Image';

export default function WatercolorBackground() {

  let styles = {
    waterBg: {
      position: 'absolute',
      width: '50%',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: '-2em'
    }
  }
  return (<>
    <Image src={require('../../assets/images/watercolor-background.png')} style={styles.waterBg} />
  </>)
}