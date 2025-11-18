//A, E, I, O, U
// let letter: string = 'A';
export default class clsStringLibrary {
    private _value: string;
  
    constructor(value?: string) {
      this._value = value || "";
    }
  
    public getValue(): string {
      return this._value;
    }
  
    public setValue(value: string): void {
      this._value = value;
    }
  
    // public CountWords(): number;
    // public CountWords(str: string): number;
  
    private static IsVOWELetter(char: string): boolean {
      if (char.length !== 1 || char === undefined) return false;
      if (
        char === "A" ||
        char === "E" ||
        char === "I" ||
        char === "O" ||
        char === "U" ||
        char === "a" ||
        char === "e" ||
        char === "i" ||
        char === "o" ||
        char === "u"
      ) {
        return true;
      }
      return false;
    }
  
    public static CountWords(str: string): number {
      if (!str) return 0;
  
      let count = 0;
      let pos = 0;
      let sword = "";
      let separator = " ";
  
      while ((pos = str.indexOf(separator)) !== -1) {
        sword = str.substring(0, pos);
        if (sword !== "") count++;
        str = str.substring(pos + separator.length);
      }
      if (str !== "") count++;
  
      return count;
    }
  
    public CountWords(): number {
      const strNew = this.getValue();
  
      return clsStringLibrary.CountWords(this._value);
    }
  
    public static CountVowels(str: string): number {
      let count: number = 0;
      for (let i = 0; i < str.length; i++) {
        if (this.IsVOWELetter(str[i])) {
          count++;
        }
      }
  
      return count;
    }
  
    public CountVowels(): number {
      return clsStringLibrary.CountVowels(this._value);
    }
  
    public static UpperEachWord(str: string): string {
      let isExistSpace: boolean = true;
      let result = "";
      for (let i = 0; i < str.length; i++) {
        if (str[i] !== " " && isExistSpace) {
          result += str[i].toUpperCase();
        } else {
          result += str[i];
        }
  
        isExistSpace = str[i] === " ";
      }
      return result;
    }
  
    public UpperEachWord() {
      this._value = clsStringLibrary.UpperEachWord(this._value);
    }
  
    public static PrintFirstLetterEachWord(str: string): void {
      let isExistSpace: boolean = true;
  
      for (let i = 0; i < str.length; i++) {
        if (str[i] !== " " && isExistSpace) {
          console.log("First Letter: " + str[i].toUpperCase());
        }
  
        isExistSpace = str[i] === " ";
      }
    }
  
    public PrintFirstLetterEachWord(): void {
      clsStringLibrary.PrintFirstLetterEachWord(this._value);
    }
  
    public static LowerFirsrLetterEachWord(str: string): string {
      let isExistSpace: boolean = true;
      let result = "";
      for (let i = 0; i < str.length; i++) {
        if (str[i] !== " " && isExistSpace) {
          result += str[i].toLowerCase();
        } else {
          result += str[i];
        }
  
        isExistSpace = str[i] === " ";
      }
      return result;
    }
  
    public LowerFirsrLetterEachWord() {
      this._value = clsStringLibrary.LowerFirsrLetterEachWord(this._value);
    }
  
    public static lowerAllString(str: string): string {
      /**
       let result = "";
    for (let ch of str) {
      result += ch === ' ' ? ch : ch.toLowerCase();
    }
    return result;
       */
      let result = "";
      for (let i = 0; i < str.length; i++) {
        if (str[i] !== " ") result += str[i].toLowerCase();
        else result += str[i];
      }
      return result;
    }
  
    public lowerAllString(): void {
      this._value = clsStringLibrary.lowerAllString(this._value);
    }
  
    public static upperAllString(str: string): string {
      let result = "";
      for (let ch of str) {
        result += ch === " " ? ch : ch.toUpperCase();
      }
      return result;
    }
  
    public upperAllString(): void {
      this._value = clsStringLibrary.upperAllString(this._value);
    }
  
    public static invertCharacterCase(str: string = ""): string {
      str =
        str.length == 1 && str === str.toLowerCase()
          ? str.toUpperCase()
          : str.toLowerCase();
  
      return str;
    }
  
    public static invertAllStringCase(str: string): string {
      let result: string = "";
      for (const ch of str) {
        result += clsStringLibrary.invertCharacterCase(ch);
      }
  
      return result;
    }
  
    public invertAllStringCase(): void {
      this._value = clsStringLibrary.invertAllStringCase(this._value);
    }
  
    private static isLower(text: string = ""): boolean {
      return text.toLowerCase() === text;
    }
  
    private static isUpper(text: string = ""): boolean {
      return text.toUpperCase() === text;
    }
  
    public static countUpperLetter(str: string): number {
      let count: number = 0;
      for (const ch of str) {
        if (this.isUpper(ch) && ch !== " ") {
          count++;
        }
      }
  
      return count;
    }
  
    public countUpperLetter(str: string): number {
      return clsStringLibrary.countUpperLetter(this._value);
    }
  
    public static countLowerLetter(str: string): number {
      let count: number = 0;
      for (const ch of str) {
        if (this.isLower(ch) && ch !== " ") {
          count++;
        }
      }
  
      return count;
    }
    public countLowerLetter(str: string): number {
      return clsStringLibrary.countLowerLetter(this._value);
    }
  
    public static countLetterIsMutchCase(
      str: string,
      chFrom: string = "",
      matchCase: boolean
    ): any {
      let countmatchCase = 0,
        countWithoutmatchCase = 0;
  
      for (const ch of str) {
        if (matchCase === true) {
          if (ch === chFrom) countmatchCase++;
        } else {
          if (ch.toLowerCase() === chFrom.toLowerCase()) countWithoutmatchCase++;
        }
      }
  
      return {
        YesmatchCase: `Letter ${chFrom}                               is count ${countmatchCase} `,
        NomatchCase: `Letter ${chFrom} or ${chFrom.toUpperCase()}    is count ${countWithoutmatchCase} `,
      };
    }
  
     public static PrintAllVowels(str:string):void
     {
  
      for (const ch of str) {
           if(this.IsVOWELetter(ch))
            console.log(` Vowels are  ${ch}   `)
      }
  
     }
  
     public static  PrintEachWordInString(S1: string): void {
      let seperator: string = " "; // seperator 
      console.log("\nYour string words are:\n");
    
      let pos: number = 0;
      let sWord: string = "";
    
      // Loop until no more spaces are found
      while ((pos = S1.indexOf(seperator)) !== -1) {
        sWord = S1.substring(0, pos); // extract the word
    
        if (sWord !== "") {
          console.log(sWord);
        }
    
        // remove processed part (word + space)
        S1 = S1.substring(pos + seperator.length);
      }
    
      // print last word
      if (S1 !== "") {
        console.log(S1);
      }
    }
  
  
  
  
  
  
  
  
  
    
    public static SplitString(str: string, separator: string = " "):string[]
    {
      let pos = 0;
    let sword: string = "";
    let listWord: string[] = [];
  
  
             while ((pos = str.indexOf(separator)) !== -1) {
              
              sword = str.substring(0,pos)
              if(sword !== "")
              {
                listWord.push(sword)  ;
              }
  
             str = str.substring(pos + separator.length)
             }
  
             if(str != "")
              listWord.push(str)  ;
      return listWord
    }
  
  
    public static joinString(): string {
      return "";
    }
  }
  