



export class IconifyIconService{

    private static instance: IconifyIconService;

    icons: Map<string, {body:string}>;

    constructor(){
        if(this.instance != undefined){
            throw "Nultiple instances of singleton";
        }
    }

    get instance(){
        if(this.instance == undefined){
            new IconifyIconService();
        }
        return this.instance;
    }


    static addIcon(key:string,icon:{body:string}){
        this.instance.icons.set(key,icon);
    }

    static getIcon(key:string){
        return this.instance.icons.get(key);
    }

}


window.globalThis["IconifyIconService"] = new IconifyIconService();