
export class IconifyIconService{

    private static instance: IconifyIconService;

    icons: Map<string, IconifyIcon> = new Map();

    constructor(){
        if(IconifyIconService.instance != undefined){
            throw "Multiple instances of singleton";
        }
        IconifyIconService.instance = this;
        //window.globalThis["IconifyIconService"] = this;
    }

    static get Instance(): IconifyIconService{
        if(IconifyIconService.instance == undefined){
            new IconifyIconService();
        }
        return IconifyIconService.instance;
    }


    static addIcon(key:string,icon:IconifyIcon){
        IconifyIconService.Instance.icons.set(key,icon);
    }

    static getIcon(key:string){
        return IconifyIconService.Instance.icons.get(key);
    }

}