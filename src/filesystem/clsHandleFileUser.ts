import { promises as fs } from "fs";
import path, { sep } from "path";
import { fileURLToPath } from "url";
import clsUser from "../useCases/UserUseCase/clsUser";
import clsStringLibrary from "../packageUsing/StringLibrary";
import { enMode } from "../useCases/ClientBankUseCase/clsBankClientUseCase";




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class clsHandleFileUser
{

                  public static async ReadUserFromFileUserLine():Promise<string[]>
                  {

                        let lines: string[] = [];
                        let fileHandleUser: any;
                        try{
                                const filePath = path.join(__dirname, "userlist.txt"); // Correct path

                                fileHandleUser = await fs.open(filePath, "r");

                                  const data = await fs.readFile(filePath, "utf8");

                            lines = data.split(/\r?\n/)
                        }catch(error)
                        {
                                console.log(error)
                        } finally {
                                if (fileHandleUser) await fileHandleUser.close();
                              }

                        return lines.map((line) => line.trim()).filter((line) => line.length > 0); 
                  }


                  private static async  _COnvertLineToUser(line:string):Promise<clsUser>
                  {
                        const data = clsStringLibrary.SplitString(line, "/##/");

                    
                       

                        return new  clsUser(enMode.UpdateMode,data[0],data[1],data[2],data[3],data[4],data[5],+data[6])


                  }

             public static async loadUsersFromFileUser():Promise<clsUser[]>
             {
                let listUsers :clsUser[] = [] ;
            
                            let lines:string[]  = await clsHandleFileUser.ReadUserFromFileUserLine() ;
                            
                            for(const line of lines)
                            {
                                   const user:clsUser   =  await  this._COnvertLineToUser(line)
                               listUsers.push(user)

                            }
                            return listUsers ;
             }
               private static async _ConverUsetToline(user:clsUser):Promise<string>
               {
                        let seperator :string = "/##/";
                        let  line :string = "" ;
                        line += user.getFirstName + seperator;
                        line += user.getLastName  + seperator ;
                        line += user.getEmail   + seperator ;
                        line += user.getPhone  + seperator ;
                        line += user.getUserName + seperator  ;
                        line += user.getPassword + seperator  ;
                        line +=  user.getPermission ;

      
                return line ;
               }

          public static async SaveUserToFile(user:clsUser):Promise<void>
          {
                      //   const user :clsUser ;
                     
                     
                   try{
                    const filePath = path.join(__dirname, "userlist.txt");

                    const fileHandleUser = await fs.open(filePath, "a"); // "a" = write 

                    let line:string = await  this._ConverUsetToline(user) ;

                 

                           await      fileHandleUser.appendFile(`${line} \n`,"utf8")
                             
                           await fileHandleUser.close();
                   }catch(error)
                   {
                    console.log("error ",error)
                   }
          }
}