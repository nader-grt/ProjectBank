import LogAmountClientController from "../../controllers/LogAmountClientController/LogAmountClientController";
import clsLogTransactionAmount from "../../log/clsLogTransactionAmount";
import clsBaseScreenUI from "../clsBaseScreenUI";



export default class clsLogTransfertAmountBetweenClientScreenUI extends clsBaseScreenUI {




    public static async  LogTransfertAmountBetweenClients():Promise<void>
    {

      


        const clientLogAmountInSystem :clsLogTransactionAmount[]   = await LogAmountClientController.DisplayLogAmountClient() ;

          const tableLogAmountTransfert = clientLogAmountInSystem.map((logAmountClient:any) => {


            return {
                dateTimeTransfert: logAmountClient['_cureentDateTimeTransaction'],
                fromClientAccountNumber: logAmountClient['_accountNumberFrom'],
                toClientAccountNumber: logAmountClient['_accountNumberTo'],
                amountTransfert: logAmountClient['_amount'],
                userName: logAmountClient['_userName'],
              };
          })

           
            clsBaseScreenUI._DrawScreenHeader(" Log Transfert Amount Between Clients  : \t \n",`\t\t ${clientLogAmountInSystem.length} transactions `)  ;

            console.table(tableLogAmountTransfert)  ;
    }
}