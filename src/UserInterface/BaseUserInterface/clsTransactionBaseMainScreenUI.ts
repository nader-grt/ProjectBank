import clsInputValidate from "../../packageUsing/clsInputValidate";
import clsBaseScreenUI from "../clsBaseScreenUI";
import clsBalanceTotalScreenUI from "../TransactionBankScreenUI/clsBalanceTotalScreenUI";
import clsDepositeScreenUI from "../TransactionBankScreenUI/clsDepositeScreenUI";
import clsWithDrawScreenUI from "../TransactionBankScreenUI/clsWithDrawScreenUI";
import clsBaseMainScreenUI from "./clsBaseMainScreenUI";

import * as readlineSync from 'readline-sync';

export enum enOptionTransaction
{
    DepositTransaction =1 ,
              WithdrawTransaction =2 ,
              TotalBalanceTransaction =3,
              MainMenu =4,

}

export default class clsTransactionBaseMainScreenUI extends clsBaseScreenUI  // clsBaseScreenUI
{
    private static _optionTransaction: enOptionTransaction;

    static ClearScreen(): void {
      console.clear();
    }

    private static    _ReadTransactionMenuNumber(): number {
        let num: number = clsInputValidate.ReadNumberBetweenStartEnd(
          1,
          4,
          "Choose Way you want enter "
        );
        return num;
      }

      private static async  _GoBackMainMenu()
      {
        clsTransactionBaseMainScreenUI.ClearScreen()  ;

        await clsBaseMainScreenUI.showMainMenu();

      }

      public static async  _GoBackTransactionMenu()
      {
        

                  
        console.log("\n\tPress any key to go back to Main Menu...");

     
       readlineSync.keyInPause();
     clsTransactionBaseMainScreenUI.ClearScreen()  ; 

     clsTransactionBaseMainScreenUI.ShowTransactionMenu() ;

      }
               
      private static async  _DepositeTransactionWithCLient():Promise<void>
      {
            

            await   clsDepositeScreenUI.WithDeposit()  ;
      }

      private static async _WithdrawTransactionWithClient():Promise<void>
      {
       
       await clsWithDrawScreenUI.Withdraw()  ;

      }
      // 
      private static async  _TotalBalanceTransactionWithTransaction()   :Promise<void>
      {
       

        await clsBalanceTotalScreenUI.DisplayBalanceTotal()

      }

               private static async  _StartTransaction()
               {
                     let num :number =       this._ReadTransactionMenuNumber()  ;

                     switch (num as enOptionTransaction) {
                        case enOptionTransaction.DepositTransaction:
                            clsTransactionBaseMainScreenUI.ClearScreen()
                         await  this. _DepositeTransactionWithCLient()
                            this. _GoBackTransactionMenu() ;
                            break;

                            case enOptionTransaction.WithdrawTransaction:
                                clsTransactionBaseMainScreenUI.ClearScreen() ;
                             await this._WithdrawTransactionWithClient()  ;
                                this. _GoBackTransactionMenu() ;
                            
                            break;
                            case enOptionTransaction.TotalBalanceTransaction:
                                clsTransactionBaseMainScreenUI.ClearScreen() ;
                                await this._TotalBalanceTransactionWithTransaction()  ;
                                this. _GoBackTransactionMenu() ;
                            
                            break;
                            case enOptionTransaction.MainMenu:
                                clsTransactionBaseMainScreenUI.ClearScreen()
                             this._GoBackMainMenu()
                            break;
                     
                        default:
                            break;
                     }
                 
               }


           

                      public static async ShowTransactionMenu():Promise<void>
                      {
                        clsTransactionBaseMainScreenUI.ClearScreen()
                        clsBaseScreenUI._DrawScreenHeader("\tTransaction Menu UI \n")

                        console.log("".padEnd(37, " ") + "\t[1] Deposit.\n");
                        console.log("".padEnd(37, " ") + "\t[2] Withdraw.\n");
                        console.log("".padEnd(37, " ") + "\t[3] Total Balance.\n");
                        console.log("".padEnd(37, " ") + "\t[4] Main Menu.\n");
                        console.log(
                          "".padEnd(37, " ") + "===========================================\n"
                        );


                       await clsTransactionBaseMainScreenUI. _StartTransaction()
                      }
}