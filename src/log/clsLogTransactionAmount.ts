

export default class clsLogTransactionAmount
{


    private _cureentDateTimeTransaction :string  ="" ;
    private _userName  :string = "" ;
    private _accountNumberFrom  :string = "" ;
    private _accountNumberTo  :string = "" ;
    private _logUserTransfertAmout :clsLogTransactionAmount  | null = null  ;

    private _amount  :number = 0 ;

                 
                    constructor(cureentDateTimeTransaction:string,accountNumberFrom:string ,amount:number,accountNumberTo:string,userName:string,)
                    {
                          this._cureentDateTimeTransaction  = cureentDateTimeTransaction  ;
                            this._userName  = userName  ;
                              this._accountNumberFrom  = accountNumberFrom  ;
                              this._accountNumberTo  = accountNumberTo  ;
                              this._amount  = amount  ;
                    }


                    public get getCureentUserLog():clsLogTransactionAmount
                    {
                           return this  ;
                    }  
           
                    public set setCureentUserLog(value:clsLogTransactionAmount)
                    {
                            this._logUserTransfertAmout  = value  ;
                    }
}