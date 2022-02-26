import * from "https://github.com/dpeter99/archivist/raw/0.2.0/src/utils/ArticleHelper.ts"

class ArticleHelperUtil extends ArticleHelper{

    constructor(file:string, module:SimpleModule, globalFilter?:(doc:Content)=>Boolean){
        super(file, globalFilter);
    }

}