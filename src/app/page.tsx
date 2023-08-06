"use client";

import { useState } from 'react';
import TextInput from './component/TextInput';

export default function Home() {
  const [isHintNeeded, setIsHintNeeded] = useState(true);

  const setHintNoLongerNeeded = () => {
    setIsHintNeeded(false);
  }

  return (
    <div className="App">
      <TextInput value="" setHintNoLongerNeeded={setHintNoLongerNeeded} />

      {isHintNeeded &&
        (<div className="hint">
          start typing above to get autocomplete suggestions
        </div>)
      }
    </div>
  );
}
