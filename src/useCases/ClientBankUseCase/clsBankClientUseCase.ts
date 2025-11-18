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

  public Print(): void {
    console.log("\nCard Info");
    console.log("Account Number", this._AccountNumber);
    console.log("FirstName", this.getFirstName);
    console.log("LastName", this.getLastName);
    console.log("Email", this.getEmail);
    console.log("Phone", this.getPhone);
    console.log("BalanceAccount", this._BalanceAccount);
    console.log("PinCode", this._PinCode);
  }

  public set setMode(mode:enMode) {
     this._Mode  = mode;
  }

  public get getMode(): enMode {
    return this._Mode;
  }

  public static ReadClientInfo(client: clsBankClientUseCase): void {
    client.setFirstName = clsInputValidate.ReadString("Enter FirstName \n");
    client.setLastName = clsInputValidate.ReadString(" Enter lastName  \n");
    client.setEmail = clsInputValidate.ReadString("    Enter email \n");
    client.setPhone = clsInputValidate.ReadString("    Enter phone  \n");
    client.setPinCode = clsInputValidate.ReadString("  Enter  Code Pine  \n");
    let bAccount: string = clsInputValidate.ReadString(
      "Enter  Balance Account  \n"
    );
    client.setBalanceAccount = parseFloat(bAccount);
  }

  public Save() {}
}
