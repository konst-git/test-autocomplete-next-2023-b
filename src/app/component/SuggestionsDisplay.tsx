import React, { MutableRefObject } from "react"

type Prop = {
  items: string[],
  inputRef: MutableRefObject<HTMLInputElement>,
  isFetchingInProgress: boolean,
};

const SuggestionsDisplay = ({ items, inputRef,
  isFetchingInProgress }: Prop) => {
  function onClick(event: React.MouseEvent<HTMLLIElement>) {
    const selectedSuggestion = event.currentTarget.innerText;
    
    console.log('Clicked the suggestion:', selectedSuggestion);
    
    inputRef.current.value = selectedSuggestion;

    inputRef.current.focus();
  }

  items = isFetchingInProgress ? ["Fetching ..."] : items;

  return (
    <div>
        {items.length > 0 && (
        <ul className="suggestions">
          {items.map((item: string) => (
            <li key={item} onClick={event => onClick(event)}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestionsDisplay;
