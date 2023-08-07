const WordsFileObj = require('@top/app/api/readSuggestionsFromFile');

export default function Home() {
  const wordsFileSize = WordsFileObj.getFileSize();

  return (
    <div className="App">
      Words file size: {wordsFileSize}
    </div>
  );
}

/*
Doesn't work, getting an error during the Build stage in the cloud:
  "getStaticProps" is not supported in app/."

export async function getStaticProps() {
  const wordsFileSize = WordsFileObj.getFileSize();

  return {
    props: {
      wordsFileSize
    },
  }
}
*/