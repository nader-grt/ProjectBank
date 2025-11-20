import clsAllUsersController from "../../controllers/UserController/clsAllUsersController";
import clsUser from "../../useCases/UserUseCase/clsUser";
import clsBaseScreenUI from "../clsBaseScreenUI";



export default class clsAllUsersScreenUI  extends clsBaseScreenUI
{


              public static async ShowAllUsers():Promise<void>
              {

               
                         
                        const    listUsers :clsUser[]  =          await clsAllUsersController.GetAllUsers()  ;



                       

                           const tableDataUsers  = listUsers.map((user:any) => ({
                            FirstName: user.getFirstName,
                            LastName: user.getLastName,
                            FullName:  user.getFirstName + " "  + user.getLastName,
                            Email: user.getEmail,
                            Phone: user.getPhone,
                            userName: user.getUserName,
                            Password: user.getPassword,//getPinCode
                            Permission: +user.getPermission,
                          }));
                          clsBaseScreenUI._DrawScreenHeader("\t\t All Users ",`\t\t ${listUsers.length} users `) ;

                          console.table(tableDataUsers)

              }
}