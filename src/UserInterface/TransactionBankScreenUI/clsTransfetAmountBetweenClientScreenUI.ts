import clsFindClientController from "../../controllers/ClientBankController/FindClientController";
import clsLogTransfertAmountFileBetweenClient from "../../filesystem/clsLogTransfertAmountFileBetweenClient";
import { GlobalCurrentUser } from "../../infra/currentUser";
import clsLogTransactionAmount from "../../log/clsLogTransactionAmount";
import clsDate from "../../packageUsing/clsDate";
import clsInputValidate from "../../packageUsing/clsInputValidate";
import { clsBankClientUseCase } from "../../useCases/ClientBankUseCase/clsBankClientUseCase";
import clsBaseScreenUI from "../clsBaseScreenUI";
import readlineSync from "readline-sync"


export default class clsTransfetAmountBetweenClientScreenUI   extends clsBaseScreenUI
{



    private static async _PrintClient(client:clsBankClientUseCase):Promise<void>
    {
        console.log("\nCard Transfert  InfoUI\t: ");
      console.log("Account Number:\t", client.getAccountNumber);
      console.log("First Name    :\t", client.getFirstName);
      console.log("UserName      :\t", GlobalCurrentUser.CurrentUser.getUserName);
      console.log("BalanceAccount:\t", client.getBalanceAccount);
       // console.log("PinCode", client.getPinCode);
    }

      private static async _ReadAccountNumberToTransferFrom():Promise<string>
      {
        let AccountNumberFrom = clsInputValidate.ReadString(
            "Please Enter Your Account Number  To Transfer From ? "
          );

          return AccountNumberFrom
      }


      private static async _ReadAccountNumberToTransferTo():Promise<string>
      {
        let AccountNumberTo = clsInputValidate.ReadString(
            "Please Enter Your Account Number  To Transfer To ? "
          );

          return AccountNumberTo
      }
               


      public static ReadAmountNumber(Message: string = "Invalid Number, Enter again\n",clientFrom :clsBankClientUseCase): number {
        let Number: number;

        const input = readlineSync.question(Message); 
        Number = parseInt(input, 10); 
        while (Number >clientFrom.getBalanceAccount && !isNaN(Number)) {
            console.log(` The number ${Number} greater than balance account ${clientFrom.getBalanceAccount} choose again`)
            const input = readlineSync.question(Message); 
            Number = parseInt(input, 10);
        }
        return Number;
    }

                  public static async  TransferAmountBetweenClients():Promise<void>
                  {

                    clsBaseScreenUI._DrawScreenHeader(" Transfer Amount Between Clients  : \t \n") ;
                      let accountNumberFrom :string = await  this._ReadAccountNumberToTransferFrom() ;

                        while (!(clsFindClientController.IsExistClient(accountNumberFrom))) {
                                    
                            accountNumberFrom  =   clsInputValidate.ReadString(
                                `client not found ${accountNumberFrom} ,enter again ? `
                                );
                        }



                        let clientFrom :clsBankClientUseCase = await clsFindClientController.find(accountNumberFrom)  ;


                        await this._PrintClient(clientFrom) ;



                        let accountNumberTo :string = await  this._ReadAccountNumberToTransferTo() ;
                        while (!(clsFindClientController.IsExistClient(accountNumberTo))) {
                                    
                            accountNumberTo  =   clsInputValidate.ReadString(
                                `client not found ${accountNumberTo} ,enter again ? `
                                );
                        }
                        let clientTo :clsBankClientUseCase = await clsFindClientController.find(accountNumberTo)  ;
                        await this._PrintClient(clientTo) ;


                        let amount :number =   this.ReadAmountNumber(` Please Enter Amount To Transfer From  `,clientFrom)  ;

                    //  await   clientFrom.Withdraw(amount,clientFrom) ;

                    //  await   clientTo.Deposite(amount,clientTo) ;

                 //   await clsBankClientUseCase.TransfertAmountFromTo(amount,clientFrom,clientTo) ;

                    await clientFrom.TransfertAmount(amount,clientTo) ;
                       let date :Date = new Date() ;
               let userAmountTransfert :clsLogTransactionAmount =     new  clsLogTransactionAmount(clsDate.convertDateToString(date),accountNumberFrom,amount,accountNumberTo,GlobalCurrentUser.CurrentUser.getUserName);


               await clsLogTransfertAmountFileBetweenClient.RegisterLogAmountTransfertFile(userAmountTransfert) ;
                    await this._PrintClient(clientFrom) ;
                    await this._PrintClient(clientTo) ;

                  }
}