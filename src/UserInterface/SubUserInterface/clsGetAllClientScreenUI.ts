import controllerGetAllCLient from "../../controllers/ClientBankController/GetAllClientController";
import { clsBankClientUseCase } from "../../useCases/ClientBankUseCase/clsBankClientUseCase";
import clsBaseScreenUI from "../clsBaseScreenUI";

export default class clsGetAllClientScreenUI extends clsBaseScreenUI
{

            public static async GetAllClientListScreen()
            {
               
            
             const listClients:clsBankClientUseCase[]   = await controllerGetAllCLient.ShowAllCLientList();
                
           
            const tableData  = listClients.map((client:any) => ({
                FirstName: client.getFirstName,
                LastName: client.getLastName,
                FullName:  client.getFirstName + " "  + client.getLastName,
                Email: client.getEmail,
                Phone: client.getPhone,
                AccountNumber: client.getAccountNumber,
                CodePine: client.getPinCode,//getPinCode
                BalanceAccount: client.getBalanceAccount,
              }));



              clsBaseScreenUI._DrawScreenHeader("\t\t All CLient In Bank",`Number of client  ${listClients.length} `);
              console.table(tableData);



           
            
            
            }
}