import  clsUser  from "./../useCases/UserUseCase/clsUser";

export const GlobalCurrentUser = {
  CurrentUser: await clsUser._FindUserByUserNameAndPassword("", "") 
};

export default class GlobalCurrentUserClass   {
  private userName: string = "";
  private password: string = "";



  constructor(userName: string, password: string) {
    //   super(0, "", "", "", "", "", "", -1);
    this.userName = userName;
    this.password = password;
  
   
  }

  public  static  async getCurrentUserByUserNameAndPassword(userName:string,password :string):Promise<clsUser |any> 
    {
             let CurrentUser:clsUser  = new clsUser(0, "", "", "", "", "", "", -1);
           
        return CurrentUser  = await clsUser._FindUserByUserNameAndPassword(userName, password);
     
    


    }
}

// GlobalCurrentUserClass;