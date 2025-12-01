import clsHandleFileUser from "../../filesystem/clsHandleFileUser"
import clsUser from "../../useCases/UserUseCase/clsUser"


export default class clsDeleteUserCOntroller  extends clsUser
{

            public static async DeleteUser(user:clsUser):Promise<void>
            {
                
                await user._DeleteUser(user)
              
            }
}