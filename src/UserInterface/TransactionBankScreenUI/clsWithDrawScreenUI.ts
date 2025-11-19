import clsFindClientController from "../../controllers/ClientBankController/FindClientController";
import clsInputValidate from "../../packageUsing/clsInputValidate";
import { clsBankClientUseCase } from "../../useCases/ClientBankUseCase/clsBankClientUseCase";
import clsTransactionBaseMainScreenUI from "../BaseUserInterface/clsTransactionBaseMainScreenUI";
import clsBaseScreenUI from "../clsBaseScreenUI";

export default class clsWithDrawScreenUI  extends clsBaseScreenUI
{

    private static async _PrintClient(client:clsBankClientUseCase):Promise<void>
    {
        console.log("\nCard InfoUI\t: ");
      console.log("Account Number", client.getAccountNumber);
        console.log("FirstName", client.getFirstName);
        console.log("LastName", client.getLastName);
        console.log("Email", client.getEmail);
        console.log("Phone", client.getPhone);
        console.log("BalanceAccount", client.getBalanceAccount);
        console.log("PinCode", client.getPinCode);
    }

      private static async _ReadAccountNumber():Promise<string>
      {
        let AccountNumber = clsInputValidate.ReadString(
            "Please Enter Your Account Number ? "
          );

          return AccountNumber
      }










            public static async Withdraw():Promise<void>
            {

                clsBaseScreenUI._DrawScreenHeader("withDraw Operation from bank \n") ;
                let accountNumber :string = await  this._ReadAccountNumber() ;
                let isAgree :boolean = false ;
                let amountWithdraw :string 

                while (!(clsFindClientController.IsExistClient(accountNumber))) {
                              
                    accountNumber  =   clsInputValidate.ReadString(
                        `client not found ${accountNumber} ,enter again ? `
                      );
                }


                                 let client :clsBankClientUseCase = await clsFindClientController.find(accountNumber)  ;


                                await this._PrintClient(client) ;



                                let agree :string = clsInputValidate.ReadString(
                                    "Do you make transaction withdraw  yes or no  ? "
                                  );

                               isAgree =    agree.toLowerCase() === "yes" 

                               if(isAgree)
                               {
                                      await this._PrintClient(client)

                                      amountWithdraw  = clsInputValidate.ReadString(
                                        "Enter your amount do you want to withdraw  ? "
                                      );
    
                                 await     client.Withdraw(+amountWithdraw,client) ;

                                 console.log(`New Balance is\t :  ${client.getBalanceAccount}`)

                               }else
                               {
                                       await clsTransactionBaseMainScreenUI._GoBackTransactionMenu() ;
                               }

            }
}