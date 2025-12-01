import clsUser from "../../useCases/UserUseCase/clsUser";

export default class clsUpdateUserController  extends clsUser
{
            public static async UpdateUser(userOld:clsUser,userNew:clsUser):Promise<void>
            {
                   //  await clsUser._UpdateUser(userOld,userNew)  ;
            }
}