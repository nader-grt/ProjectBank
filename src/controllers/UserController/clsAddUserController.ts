import clsHandleFileUser from "../../filesystem/clsHandleFileUser";
import clsUser from "../../useCases/UserUseCase/clsUser";


export default class clsAddUserController extends clsUser
{

                   public static async AddNewUser(user:clsUser):Promise<void>
                   {
                   
                               await clsHandleFileUser.SaveUserToFile(user)                ;
                   }
}