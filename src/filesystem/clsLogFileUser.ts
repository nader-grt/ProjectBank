import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import clsLogUser from "../log/clsLog";
import clsStringLibrary from "../packageUsing/StringLibrary";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export default class clsLogFileHandleUser {


  public static async ReadUserFromFileUserLogLine():Promise<string[]>
  {

        let lines: string[] = [];
        let fileHandleUserLog: any;
        try{
                const filePath = path.join(__dirname, "logUserFile.txt"); // Correct path

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



  private static async  _COnvertLineToUserLog(line:string):Promise<clsLogUser>
  {
        const data = clsStringLibrary.SplitString(line, "/##/");

    
       

        return new clsLogUser(data[0],data[1],data[2],+data[3])
     


  }

          private static _convertUserLogToLine(logUserToFile :clsLogUser){

            let seperator :string = "/##/";
            let  line :string = "" ;
            line += logUserToFile.getCureentUserLog['cureentDateTime']  + seperator ;
            line += logUserToFile.getCureentUserLog['userName']  + seperator ;
            line += logUserToFile.getCureentUserLog['password']  + seperator ;
            line += logUserToFile.getCureentUserLog['endPermission']  ;
            

            return line ;
          }


          public static async loadUsersFromLogUserFile():Promise<clsLogUser[]>
          {
             let listUsersLog :clsLogUser[] = [] ;
         
                         let lines:string[]  = await clsLogFileHandleUser.ReadUserFromFileUserLogLine() ;
                         
                         for(const line of lines)
                         {
                                const user:clsLogUser   =  await  this._COnvertLineToUserLog(line)
                                listUsersLog.push(user)

                         }
                         return listUsersLog ;
          }


       public static async RegisterLogFile(logUserToFile :clsLogUser):Promise<clsLogUser>
       {
              // let logUserToFile :clsLogUser

             // console.log("object************************ nnnnnnnnnnnnnnnnnnnnnnnnnnn\t " , logUserToFile)  ;


              try {

                const filePath = path.join(__dirname, "logUserFile.txt");

                const fileHandleUser = await fs.open(filePath, "a"); // "a" = write 

                let line:string = this._convertUserLogToLine(logUserToFile) ;
                          await      fileHandleUser.appendFile(`${line} \n`,"utf8")
                             
                          await fileHandleUser.close();
                
              } catch (error) {
                console.log("error ",error)
                
              }

              return logUserToFile  ;
       }
}