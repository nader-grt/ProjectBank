import LogUserController from "../../controllers/LogUserController/LogUserController";
import clsLogUser from "../../log/clsLog";
import clsBaseScreenUI from "../clsBaseScreenUI";


interface UserLog {
    cureentDateTime: string;
    userName: string;
    password: string;
    endPermission: number;
  }

export default class clsLogUserScreenUI  extends clsBaseScreenUI
{



                public static async DisplayLogUserScreen():Promise<void>
                {


                  

                   let allUsers :  any     = await LogUserController.DisplayLogUsers()  ;

                //   console.log("object allUser  ***nnnnnnnnn \t    ", typeof allUsers ,allUsers)



                   const tableDataLogUsers  = Object.values(allUsers).map((userLog:any) => {

                
                    return {
                       cureentDateTime: userLog['cureentDateTime'],
                       userName: userLog['userName'],
                       password: userLog['password'],
                       endPermission: userLog['endPermission'],
                      };
             
                  });
                  clsBaseScreenUI._DrawScreenHeader("\tAll Log Users Screen \n" ,`\t\t ${Object.values(allUsers).length} users `)  ;

                  //clsBaseScreenUI._DrawScreenHeader("\t\t All Users ",`\t\t ${listUsers.length} users `) ;

              //    console.log("{Object.values(allUsers) \t \t  "  ,Object.values(allUsers))
                  console.table(tableDataLogUsers)
                }
}