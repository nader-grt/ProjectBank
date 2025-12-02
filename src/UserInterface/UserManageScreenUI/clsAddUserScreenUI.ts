import clsAddUserController from "../../controllers/UserController/clsAddUserController";
import clsInputValidate from "../../packageUsing/clsInputValidate";
import { enMode } from "../../useCases/ClientBankUseCase/clsBankClientUseCase";
import clsUser, { enPermission } from "../../useCases/UserUseCase/clsUser";
import clsBaseScreenUI from "../clsBaseScreenUI";


export interface IUser {


} ;

export default class clsAddUserScreenUI  extends clsBaseScreenUI
{


                             private static async _ReadPermissionOption():Promise<number>
                             {


                         
                                   let resultPermission :string  = "" ;

                                let totalPermission :number = 0 ;
                          
                               console.log(" Enter  Permission \n")
                               resultPermission =    clsInputValidate.ReadString(" Do you have full access yes or no  \n");
                                   if (resultPermission.toLowerCase() == "yes")
                                   {
                                        totalPermission = totalPermission  + enPermission.eAll || enPermission.pUserLog ;
                                        return totalPermission ;
                                   }

                                   resultPermission =    clsInputValidate.ReadString(" Do you have list client  access yes or no  \n");
                                   if (resultPermission.toLowerCase() == "yes")
                                   {
                                        totalPermission = totalPermission  + enPermission.pListClients ;
                                   }

                                   resultPermission =    clsInputValidate.ReadString(" Do you have add new client access yes or no  \n");
                                   if (resultPermission.toLowerCase() == "yes")
                                   {
                                        totalPermission = totalPermission  + enPermission.pAddNewClient ;
                                   }
                                   resultPermission =    clsInputValidate.ReadString(" Do you have delete client access yes or no  \n");
                                   if (resultPermission.toLowerCase() == "yes")
                                   {
                                        totalPermission = totalPermission  + enPermission.pDeleteClient ;
                                   }
                                   resultPermission =    clsInputValidate.ReadString(" Do you have update client access yes or no  \n");
                                   if (resultPermission.toLowerCase() == "yes")
                                   {
                                        totalPermission = totalPermission  + enPermission.pUpdateClients ;
                                   }
                                   resultPermission =    clsInputValidate.ReadString(" Do you have find client access yes or no  \n");
                                   if (resultPermission.toLowerCase() == "yes")
                                   {
                                        totalPermission = totalPermission  + enPermission.pFindClient ;
                                   }
                                   resultPermission =    clsInputValidate.ReadString(" Do you have transactions access yes or no  \n");
                                   if (resultPermission.toLowerCase() == "yes")
                                   {
                                        totalPermission = totalPermission  + enPermission.pTranactions ;
                                   }
                                   resultPermission =    clsInputValidate.ReadString(" Do you have manage users access yes or no  \n");
                                   if (resultPermission.toLowerCase() == "yes")
                                   {
                                        totalPermission = totalPermission  + enPermission.pManageUsers ;
                                   }

                               return totalPermission
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
                        let permission :number=0 ;
                      
                        permission  = await  this._ReadPermissionOption();
                        user.setPermission  = permission ;

                               
                             return user ;


                      
                      }


                      private static async _PrintInfoUser(user:clsUser):Promise<void>
                      {

                        console.log(" User Info : \n")  ;
                         console.log(` FirstName : ${user.getFirstName}  \n`)  ;
                         console.log(` LastName : ${user.getLastName}  \n`)  ;
                         console.log(` Email : ${user.getEmail}  \n`)  ;
                         console.log(` Phone : ${user.getPhone}  \n`)  ;
                         console.log(` UserName : ${user.getUserName}  \n`)  ;
                         console.log(` Password : ${user.getPassword}  \n`)  ;
                         console.log(` Permission : ${user.getPermission}  \n`)  ;
                         
                         
                      }


                   public static async AddUser():Promise<void>
                   {
                              clsBaseScreenUI._DrawScreenHeader("\t Add New User \t : ")  ;

                              let user :clsUser  = await this._ReadInfoUser() ;

                                    
                         await     clsAddUserController.AddNewUser(user)  ;

                         await this._PrintInfoUser(user)  ;

                            

                   }

};