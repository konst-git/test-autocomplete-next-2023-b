import { NextRequest, NextResponse } from "next/server";

const WordsFileObj = require('./readSuggestionsFromFile');

export async function GET(request: NextRequest) {
  const input = request.nextUrl.searchParams.get("input");
  
  type ResType = {
    suggestions: string[],
    isOk: boolean,
    errorMessage: any,
    dbgFileSize: number,
  };

  const res: ResType = {
    suggestions: [],
    isOk: true,
    errorMessage: null,
    dbgFileSize: 0,
  };

const temp_trialDataFile = require('./trialDataFile.js');
console.log('temp_trialDataFile:', temp_trialDataFile);
res.suggestions = temp_trialDataFile;
return NextResponse.json(res);

  if (!input) {
    res.isOk = false;
    res.errorMessage = "Problem: no input was provided";
    return NextResponse.json(res);
  }

  if (input.length < 2) {
    res.isOk = false;
    res.errorMessage = "Problem: input size is too small, input.length: " + input.length;
    return NextResponse.json(res);
  }

  try {
    res.suggestions = await WordsFileObj.readSuggestionsFromFile(input);
    res.dbgFileSize = WordsFileObj.getFileSize();
  } catch (ex) {
    res.isOk = false;
    res.errorMessage = ex;
    console.log('app.get("/apiWords", error: ' + ex);
  }

  return NextResponse.json(res);
}
