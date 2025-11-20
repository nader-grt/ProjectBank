import clsAddClientController from "../../controllers/ClientBankController/AddClientController";
import clsHandleFile from "../../filesystem/clsHandleFile";
import clsInputValidate from "../../packageUsing/clsInputValidate";
import clsPersonUseCase from "../PersonUseCase/clsPersonUseCase";

export enum enMode {
  EmptyMode = 0,
  UpdateMode = 1,
  NewAddMode = 2,
  DeleteMode = 3,
}

export class clsBankClientUseCase extends clsPersonUseCase {
  private _Mode: enMode = enMode.EmptyMode;

  private readonly _AccountNumber: string = "";
  private _PinCode: string = "";
  private _BalanceAccount: number = 0;

  // private static GetEmptyClientObject(): clsBankClient {
  //   return new clsBankClient(enMode.EmptyMode, "", "", "", "", "", "", 0);
  // }

  constructor(
    mode: enMode,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    accountNumber: string,
    pinCode: string,
    balanceAccount: number
  ) {
    super(firstName, lastName, email, phone); //base class
    this._Mode = mode;
    this._AccountNumber = accountNumber;
    this._PinCode = pinCode;
    this._BalanceAccount = balanceAccount;
  }

  public get getAccountNumber(): string {
    return this._AccountNumber;
  }

  public get getPinCode(): string {
    return this._PinCode;
  }
  public set setPinCode(pinCode: string) {
    this._PinCode = pinCode;
  }

  public get getBalanceAccount(): number {
    return this._BalanceAccount;
  }

  public set setBalanceAccount(balanceAccount: number) {
    this._BalanceAccount = balanceAccount;
  }

  public IsEmpty(): boolean {
    return this._Mode === enMode.EmptyMode;
  }

 

  public set setMode(mode:enMode) {
     this._Mode  = mode;
  }

  public get getMode(): enMode {
    return this._Mode;
  }

  public  async  Deposite(amount:number,client:clsBankClientUseCase) {
       
    this._BalanceAccount += amount ;

  


 await clsHandleFile.Save(client) ;
  }
  public  async  Withdraw(amount:number,client:clsBankClientUseCase) {
       
    this._BalanceAccount -= amount ;


 await clsHandleFile.Save(client) ;
  }



  public static async GetTotalBalance():Promise<number>
  {

               let totalBalance :number = 0 ;
               let ele :clsBankClientUseCase ;
   const listClients:clsBankClientUseCase[] = await clsHandleFile.LoadDataFromFile();


          for( ele  of listClients)
          {

           totalBalance += ele.getBalanceAccount ;
          }
         
   return totalBalance
  }
 
}
