import clsHandleFile from "../../filesystem/clsHandleFile";
import { clsBankClientUseCase } from "../../useCases/ClientBankUseCase/clsBankClientUseCase";

export default class controllerGetAllCLient extends clsBankClientUseCase {

     private static _Total :number = 0 ;
  public static async getAllClients(): Promise<clsBankClientUseCase[]> {
    const listClient: clsBankClientUseCase[] = [];

    const dataFileLines: any = await clsHandleFile.readFromFileClientList();

    for (const line of dataFileLines) {
      const client: clsBankClientUseCase =
        await clsHandleFile.convertLineClientToObject(line);

      listClient.push(client);
    }

    return listClient;
  }

             public static async ShowAllCLientList():Promise<clsBankClientUseCase[]>
             {
              const listClients:clsBankClientUseCase[] = await clsHandleFile.LoadDataFromFile();
          
          
           

              return listClients
             }


             private static async _GetBalanceTotalWithCLients()
             {
              const listClients:clsBankClientUseCase[] = await clsHandleFile.LoadDataFromFile();
              const tableData = listClients.map((client:any) => ({
                AccountNumber: client.getAccountNumber,
                clientName:  client.getFirstName + " " +  client.getLastName,
                BalanceAccount: client.getBalanceAccount,
              }));
          
              console.log(`\t\t   All Clients: ${listClients.length}  \n` );
              console.table(tableData);

              

             }

             private static async _GetBalanceTotal():Promise<number>
             {

                          let balanceTotal :number = 0 ;
                          let ele :clsBankClientUseCase ;
              const listClients:clsBankClientUseCase[] = await clsHandleFile.LoadDataFromFile();


                     for( ele  of listClients)
                     {

                      balanceTotal += ele.getBalanceAccount ;
                     }
                    this._Total += balanceTotal ;
              return balanceTotal
             }

             public static async DisplayClientWithBalanceTotal()
             {

                         await this._GetBalanceTotalWithCLients() ;

                         await this._GetBalanceTotal() ;
                   
                      console.log("\t\t Toala Balnce is ",this._Total)


             }
}
