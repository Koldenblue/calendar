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
    {/* Image by 
      <a href="https://pixabay.com/users/1029763-1029763/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=769734">
      Ruth González </a> 
      from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=769734">Pixabay</a> */}
    <Image src={require('../../assets/images/watercolor.jpg')} style={styles.waterBg} />
  </>)
}