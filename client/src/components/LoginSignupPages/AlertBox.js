import React, { useState, useEffect } from "react";

function AlertBox(props) {
  const [opacity, setOpacity] = useState(0)

  let styles = {
    div: {
      'borderColor' : 'black',
      'borderWidth' : '2px',
      'borderRadius': '5px',
      'backgroundColor': 'rebeccapurple',
      'padding': '10px',
      'color' : 'antiquewhite',
      opacity: opacity,
      margin: '2px'
    }
  }

  // makes alert box transparent when empty. Makes alert box appear if there is a message.
  useEffect(() => {
    if (props.message !== '') {
      setOpacity(1)
    }
    if (props.message === '') {
      setOpacity(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.message]);

  return(
    <div style={styles.div}>
      {props.message}
    </div>
  )
}

export default AlertBox;