import clsLogFileHandleUser from "../../filesystem/clsLogFileUser";
import clsLogUser from "../../log/clsLog";


export default class LogUserController
{

       public static async DisplayLogUsers():Promise<clsLogUser[]>
       {
             
        
                        
                 const usersLogInSystem :clsLogUser[] =              await clsLogFileHandleUser.loadUsersFromLogUserFile();


             //    console.log("controller usersLogInSystem \t \t  "  ,usersLogInSystem )
                 return usersLogInSystem ;
       }
}