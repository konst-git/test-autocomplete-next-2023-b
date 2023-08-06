import React, { useEffect, useState, useRef, MutableRefObject } from "react"
import Suggestions from '../entity/Suggestions';
import SuggestionsDisplay from './SuggestionsDisplay';
import fetchSuggestions from './fetchSuggestions';

type Prop = {
  value: string,
  setHintNoLongerNeeded: () => void,
};

const TextInput = ({ setHintNoLongerNeeded }: Prop) => {
  const [inputVal, setInputVal] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestions>([]);
  const [fetchingError, setFetchingError] = useState("");
  const [fetchAbortController, setFetchAbortController] = useState<AbortController | null>(null);

  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(event.target.value);

    setHintNoLongerNeeded();

    if (event.target.value === "") {
      setFetchingError("");
    }
  };

  useEffect(() => {
    if (inputVal.length >= 2) {
      fetchSuggestions(
        fetchAbortController,
        setFetchingError,
        setFetchAbortController,
        setSuggestions,
        inputVal
      );
    } else {
      setSuggestions([]);
    }
  }, [ inputVal ]);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Start typing..."
        onChange={event => onChange(event)}
        value={inputVal}
      />

      <button className="clearButton" onClick={() => setInputVal("")}>x</button>
      
      <SuggestionsDisplay items={suggestions} inputRef={inputRef}
        isFetchingInProgress={fetchAbortController != null} />

      {fetchingError && (<div className="errorStyle">Fetching error: {JSON.stringify(fetchingError)}</div>)}
    </div>
  );
};

export default TextInput;
