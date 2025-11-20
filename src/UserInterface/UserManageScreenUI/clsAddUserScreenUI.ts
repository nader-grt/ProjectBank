import clsAddUserController from "../../controllers/UserController/clsAddUserController";
import clsInputValidate from "../../packageUsing/clsInputValidate";
import { enMode } from "../../useCases/ClientBankUseCase/clsBankClientUseCase";
import clsUser, { enPermissionUser } from "../../useCases/UserUseCase/clsUser";
import clsBaseScreenUI from "../clsBaseScreenUI";


export interface IUser {


} ;

export default class clsAddUserScreenUI  extends clsBaseScreenUI
{


                             private static async _ReadPermissionOption():Promise<void>
                             {

                                let numPermission :number = 0 ;
                                let totalPermission :enPermissionUser = enPermissionUser.enAllPermissionUser ;
                                numPermission    =    Number( clsInputValidate.ReadString("  Enter  Permission \n")) ;
                               // numPermission as enPermissionUser
                             }




                      private static async _ReadInfoUser():Promise<clsUser>
                      {

                             const   user:clsUser  = new clsUser(enMode.NewAddMode,"","","","","","",0);
                        user.setFirstName = clsInputValidate.ReadString("Enter FirstName \n");
                        user.setLastName = clsInputValidate.ReadString(" Enter lastName  \n");
                        user.setEmail = clsInputValidate.ReadString("    Enter email \n");
                        user.setPhone = clsInputValidate.ReadString("    Enter phone  \n");
                        user.setUserName = clsInputValidate.ReadString("  Enter  User Name  \n");
                        user.setPassword = clsInputValidate.ReadString("  Enter  Password  \n");
                        let permission :string = "" ;
                      
                        permission  = clsInputValidate.ReadString("  Enter  Permission \n");
                        user.setPermission  = +permission ;
                             return user ;

                             /**
                              * Number(
        clsInputValidate.ReadString("Enter Permission \n")
    );
                              */

                      
                      }


                      private static async _PrintInfoUser(user:clsUser):Promise<void>
                      {

                        
                      }


                   public static async AddUser():Promise<void>
                   {
                              clsBaseScreenUI._DrawScreenHeader("\t Add New User \t : ")  ;

                              let user :clsUser  = await this._ReadInfoUser() ;

                                    
                         await     clsAddUserController.AddNewUser(user)  ;

                            

                   }

};