export default class clsPersonUseCase
{
    private _FirstName :string = "" ;
    private _LastName :string = ""  ;
    private _Email :string ="" ;
    private  _Phone :string = "" ;


    constructor(firstName:string,lastName:string,email:string,phone:string)
    {
        this._FirstName = firstName ;
        this._LastName  = lastName ;
        this._Email   = email ;
        this._Phone = phone 
    }


    public get getFirstName():string
    {
        return this._FirstName ;
    }

    public set setFirstName(firstName:string)
    {
     this._FirstName  = firstName ;
    }

    public get getLastName():string
    {
        return this._LastName ;
    }

    public set setLastName(lastName:string)
    {
     this._LastName  = lastName ;
    }

    public get getEmail():string
    {
        return this._Email ;
    }

    public set setEmail(email:string)
    {
     this._Email  = email ;
    }

    public get getPhone():string
    {
        return this._Phone ;
    }

    public set setPhone(phone:string)
    {
     this._Phone  = phone ;
    }

}