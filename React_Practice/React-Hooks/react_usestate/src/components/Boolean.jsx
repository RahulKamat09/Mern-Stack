import { useState } from "react"

const Boolean = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className='number'>
      <button onClick={() => setIsVisible(!isVisible)}>
        Toggle
      </button>
    {isVisible && <p>This is now Visible</p>}
    </div>
  );
}

export default Boolean