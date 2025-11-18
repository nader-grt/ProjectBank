
import readlineSync from "readline-sync"

export default class clsInputValidate 
{



    public static ReadString(Message: string = "Invalid input, Enter again\n", validator?: (input: string) => boolean): string {
        let S1: string;
        while (true) {
            S1 = readlineSync.question(Message); // read a full line
            if (!validator || validator(S1)) {
                break; // valid input
            } 
        }
        return S1;
    }

    public static ReadNumberBetweenStartEnd(From:number,To:number,Message: string = "Invalid input, Enter again\n"):number
    {
            let num :string =      readlineSync.question(Message)  ;
            while(+num < From || +num > To)
            {
                 console.log(` The number ${+num} not beteen ${From} and ${To} choose again`)
                 num  =      readlineSync.question(Message)  ;
            }
        return +num
    }
    

    public static ReadIntNumber(ErrorMessage: string = "Invalid Number, Enter again\n"): number {
        let Number: number;
        while (true) {
            const input = readlineSync.question(''); 
            Number = parseInt(input, 10); 
            if (!isNaN(Number)) {
                break; // valid integer
            } else {
                process.stdout.write(ErrorMessage); 
            }
        }
        return Number;
    }

}


