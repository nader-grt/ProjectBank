import clsFindUserController from "../../controllers/UserController/clsFindUserController";
import clsInputValidate from "../../packageUsing/clsInputValidate";
import clsUser from "../../useCases/UserUseCase/clsUser";
import clsBaseScreenUI from "../clsBaseScreenUI";

export default class clsFindUserScreenUI extends clsBaseScreenUI
{



          private static   async _PrintUser(user:clsUser):Promise<void>
            {
    
                     console.log(` User Name     : ${user.getUserName}  \n`)  ;
                     console.log(` First Name    : ${user.getFirstName}  \n`)  ;
                     console.log(` Last Name     : ${user.getLastName}  \n`)  ;
                     console.log(` Email         : ${user.getEmail}  \n`)  ;
                     console.log(` Phone         : ${user.getPhone}  \n`)  ;
                     console.log(` Password      : ${user.getPassword}  \n`)  ;
                     console.log(` Permission    : ${user.getPermission}  \n`)  ;
            } 


    public static async FindUser():Promise<void>
    {
               clsBaseScreenUI._DrawScreenHeader("\t Find  User !!\t : ")  ;


            let userName :string =      clsInputValidate.ReadString(" Enter  UserName   \n")  ;
         //   console.log(" Searching for User ... \n" ,userName)  ;
              
                 let user:clsUser =     await  clsFindUserController.FindUser(userName)  ;

             //  console.log(" Searching for User ... \n" ,user)  ;

                 while (user.getUserName === '')
                 {
                    console.log(" User Not Found  \n")  ;
                    userName  = clsInputValidate.ReadString(" Enter your userName again  \n");
                     user =  await clsFindUserController.FindUser(userName)  ;
                    
                 }

                      if(user.getUserName != "")
                        {
                            user =  await clsFindUserController.FindUser(userName)  ;
                            await this._PrintUser(user)  ;
                            console.log(" User Found Successfully  \n")  ;
                        }else
                        {
                            console.log(" User Not Found  \n")  ;
                        }

                   


             

    }
    
}