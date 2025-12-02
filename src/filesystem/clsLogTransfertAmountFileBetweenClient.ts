import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import clsLogTransactionAmount from "../log/clsLogTransactionAmount";
import clsStringLibrary from "../packageUsing/StringLibrary";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export default class clsLogTransfertAmountFileBetweenClient {




  public static async ReadUserFromFileAmountUserLogLine():Promise<string[]>
  {

        let lines: string[] = [];
        let fileHandleUserLog: any;
        try{
                const filePath = path.join(__dirname, "logTransfertTransactionFile.txt"); // Correct path

                fileHandleUserLog = await fs.open(filePath, "r");

                  const data = await fs.readFile(filePath, "utf8");

            lines = data.split(/\r?\n/)
        }catch(error)
        {
                console.log(error)
        } finally {
                if (fileHandleUserLog) await fileHandleUserLog.close();
              }

        return lines.map((line) => line.trim()).filter((line) => line.length > 0); 
  }



  private static async  _COnvertLineToUserLog(line:string):Promise<clsLogTransactionAmount>
  {
        const data = clsStringLibrary.SplitString(line, "/##/");

    
       

        return new clsLogTransactionAmount(data[0],data[1],parseFloat(data[2]),data[3],data[4]) ;
     


  }

          private static _convertUserLogToLine(logTransfertAmoutUser :clsLogTransactionAmount){

            let seperator :string = "/##/";
            let  line :string = "" ;

            line += logTransfertAmoutUser.getCureentUserLog['_cureentDateTimeTransaction']  + seperator ;
            line += logTransfertAmoutUser.getCureentUserLog['_accountNumberFrom']  + seperator ;
            line += logTransfertAmoutUser.getCureentUserLog['_amount'] + seperator ;
            line += logTransfertAmoutUser.getCureentUserLog['_accountNumberTo']  + seperator ;
            line += logTransfertAmoutUser.getCureentUserLog['_userName']  ;
           

            // line += logTransfertAmoutUser. + seperator ;
            // line += logTransfertAmoutUser.  + seperator ;
            // line += logTransfertAmoutUser.  + seperator ;
            // line += logTransfertAmoutUser.  ;
            

            return line ;
          }


          public static async loadUsersFromLogAmountUserFile():Promise<clsLogTransactionAmount[]>
          {
             let listAmountLogTransfertUser :clsLogTransactionAmount[] = [] ;
         
                         let lines:string[]  = await clsLogTransfertAmountFileBetweenClient.ReadUserFromFileAmountUserLogLine() ;
                         
                         for(const line of lines)
                         {
                                const user:clsLogTransactionAmount   =  await  this._COnvertLineToUserLog(line)
                                listAmountLogTransfertUser.push(user)

                         }
                         return listAmountLogTransfertUser ;
          }


       public static async RegisterLogAmountTransfertFile(logFromAmountToUser :clsLogTransactionAmount):Promise<clsLogTransactionAmount>
       {
              // let logUserToFile :clsLogUser

             // console.log("object************************ nnnnnnnnnnnnnnnnnnnnnnnnnnn\t " , logUserToFile)  ;


              try {

                const filePath = path.join(__dirname, "logTransfertTransactionFile.txt");

                const fileHandleUser = await fs.open(filePath, "a"); // "a" = write 

                let line:string = this._convertUserLogToLine(logFromAmountToUser) ;
                          await      fileHandleUser.appendFile(`${line} \n`,"utf8")
                             
                          await fileHandleUser.close();
                
              } catch (error) {
                console.log("error ",error)
                
              }

              return logFromAmountToUser  ;
       }

}