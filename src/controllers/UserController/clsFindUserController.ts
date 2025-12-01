import clsHandleFileUser from "../../filesystem/clsHandleFileUser";
import { enMode } from "../../useCases/ClientBankUseCase/clsBankClientUseCase";
import clsUser from "../../useCases/UserUseCase/clsUser";




export default class clsFindUserController extends clsUser
{


  

                public static async FindUser(userName:string):Promise<clsUser>
                {
                

                       let user :clsUser =  await clsUser._FindUserByUserName(userName)  ;
                           if(user.getUserName != "")
                           {
                              return user as clsUser ;
                           }
                      return user.getEmptyUser() ;
                }
}