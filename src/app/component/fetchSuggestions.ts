import Suggestions from '../entity/Suggestions';

const fetchSuggestions = (
    fetchAbortController: AbortController | null,
    setFetchingError: (err: any) => void,
    setFetchAbortController: (abortController: AbortController | null) => void,
    setSuggestions: (suggestions: Suggestions) => void,
    inputVal: string
  ) => {
  fetchAbortController?.abort();
  const newAbortController = new AbortController();

  setFetchAbortController(newAbortController);

  const { signal } = newAbortController;

  const apiUri = "/api?input=" + encodeURI(inputVal);
  fetch(apiUri,
    { signal }
  )
    .then(response => {
      setFetchAbortController(null);
      return response.json();
    })
    .then(data => {
      if (data.isOk) {
        setSuggestions(data.suggestions);
        setFetchingError("");
      } else {
        setFetchingError(data.errorMessage);
        setSuggestions([]);
        console.log('[fetchSuggestions] error:', data.errorMessage);
      }
    },
    err => {
      let theUserAbortedARequest = false;
      if (err instanceof DOMException) {
        theUserAbortedARequest = ("" + err).includes('The user aborted a request');
      }

      if (!theUserAbortedARequest) {
        setFetchingError(err);
        console.log('[fetchSuggestions] error:', err);
      }
      setSuggestions([]);
      setFetchAbortController(null);
  });
};

export default fetchSuggestions;
