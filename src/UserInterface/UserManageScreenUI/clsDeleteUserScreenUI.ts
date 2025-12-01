import clsDeleteUserCOntroller from "../../controllers/UserController/clsDeleteUserCOntroller";
import clsFindUserController from "../../controllers/UserController/clsFindUserController";
import clsInputValidate from "../../packageUsing/clsInputValidate";
import clsUser from "../../useCases/UserUseCase/clsUser";
import clsBaseScreenUI from "../clsBaseScreenUI";

export default class clsDeleteUserScreenUI   extends clsBaseScreenUI
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

         public static async ShowDeleteUserScreenUI():Promise<void>
         {
            clsBaseScreenUI._DrawScreenHeader(" Delete User Screen ")  ;

            let userName  :string  = clsInputValidate.ReadString(" Enter your userName   \n");
            let user :clsUser =  await clsFindUserController.FindUser(userName)  ;
                              while (user.getUserName == "")
                              {
                                console.log(" User Not Found  \n")  ;
                                userName  = clsInputValidate.ReadString(" Enter your userName   \n");
                                 user =  await clsFindUserController.FindUser(userName)  ;
                                
                              }

                 let answer  :string  = "" ;
          answer =    clsInputValidate.ReadString(" Do you want to delete  user  yes or no  \n");

             

                
                    if (answer.toLowerCase() == "yes")
                    {
                        if (user.getUserName != "")
                        {
                           await clsDeleteUserCOntroller.DeleteUser(user)
                           user =    await  user.getEmptyUser()

                         
                            await clsDeleteUserScreenUI._PrintUser(user)  ;
                            console.log(" User Deleted Successfully  \n")  ;
                        }
                        else
                        {
                            console.log(" User Not Found  \n")  ;
                        }
                    }
         }
}
