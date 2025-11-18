export default  abstract class clsBaseScreenUI
{
    protected static _DrawScreenHeader(Title: string, SubTitle: string = ""): void {
        console.log("\t\t\t\t\t______________________________________");
        console.log("\n\n\t\t\t\t\t  " + Title);
        if (SubTitle !== "") {
            console.log("\n\t\t\t\t\t  " + SubTitle);
        }
        console.log("\n\t\t\t\t\t______________________________________\n\n");
    }
    
}