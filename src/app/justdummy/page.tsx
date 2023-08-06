const WordsFileObj = require('@top/app/api/readSuggestionsFromFile');

export default function Home() {
  const wordsFileSize = WordsFileObj.getFileSize();

  return (
    <div className="App">
      Words file size: {wordsFileSize}
    </div>
  );
}

export async function getStaticProps() {
  const wordsFileSize = WordsFileObj.getFileSize();

  return {
    props: {
      wordsFileSize
    },
  }
}
