import clsHandleFileUser from "../../filesystem/clsHandleFileUser";
import clsUser from "../../useCases/UserUseCase/clsUser";


export default class clsAllUsersController extends clsUser
{

                            
                    public static async GetAllUsers():Promise<clsUser[]>
                    {
                                   
                            let listUsers :clsUser[] = await clsHandleFileUser.loadUsersFromFileUser() ;
                              return listUsers ;

                    }
}