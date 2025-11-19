import clsBaseScreenUI from "../clsBaseScreenUI";


export default class clsBalanceTotalScreenUI  extends clsBaseScreenUI
{



           public static async DisplayBalanceTotal():Promise<void>
           {

                    clsBaseScreenUI._DrawScreenHeader("\t Total Balance of clients \t \n ")
           }
}