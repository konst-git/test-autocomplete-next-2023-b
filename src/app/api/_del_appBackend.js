const express = require("express");
const cors = require('cors');
const readSuggestionsFromFile = require('./readSuggestionsFromFile');

const app = express ();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000'
}));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("/apiWords", async (request, response) => {
  const input = request.query.input;

  let res = {
    suggestions: [],
    isOk: true,
    errorMessage: null,
  };

  if (!input) {
    res.isOk = false;
    res.errorMessage = "Problem: no input was provided";
    response.send(res);
    return;
  }

  if (input.length < 2) {
    res.isOk = false;
    res.errorMessage = "Problem: input size is too small, input.length: " + input.length;
    response.send(res);
    return;
  }

  try {
    res.suggestions = await readSuggestionsFromFile(input);
  } catch (ex) {
    res.isOk = false;
    res.errorMessage = ex;
    console.log('app.get("/apiWords", error: ' + ex);
  }

  response.send(res);
});
