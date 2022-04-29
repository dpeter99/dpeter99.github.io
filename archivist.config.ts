
import * as archivist from "archivist/index.ts";

export {archivist};

//import * as archivist from "https://raw.githubusercontent.com/dpeter99/archivist/0.2.0/src/index.ts";


let env : "development" | "production" = "development"
if(Deno.args.includes("--env=prod")){
    env = "production"    
}
console.log(env);

export const config: archivist.Config = {
    detailedOutput: false,
    template: "./theme",
    outputPath: "./out",
    outputURL: "https://dpeter99.github.io",
    env: env,
    preProcessors: [
        archivist.Pipeline.fromModules({name:"build_template", contentRoot:"./content/"},
            new archivist.WebpackModule(),
            new archivist.StaticTemplateFilesModule(),
            new archivist.CopyModule({source:"./content/static"})
        )
    ],
    pipelines:[
        archivist.Pipeline.fromModules({name:"blog_files",contentRoot:"./content/"},
            new archivist.FileReaderModule("./**/*.md"),
            new archivist.ExtractMetadata(
                new archivist.FrontMatterMetadata()
            ),
            new archivist.FunctionModule((doc => {
                if(!doc.metadata.hasData("type")){
                    doc.metadata.addData("type","post");
                }
                return Promise.resolve();
            })),
            new archivist.MarkdownRender({
                shiftHeadersAmount:0
            }),
            new archivist.ExtractResources(),
            new archivist.WebUrlOutputResolver(),
            new archivist.TemplateModule({helper:(path, mod)=>{
                return new archivist.ArticleHelper(path, mod, (doc)=>{
                    return !doc.name.match(".hu");
                })
            }}),
            new archivist.RssFeedModule({helper:(path, mod)=>{
                return new archivist.ArticleHelper(path, mod, (doc)=>{
                    //console.log(doc.meta.type);
                    
                    return (doc.meta.type == "post" || doc.meta.type == "project")
                            && !doc.name.match(".hu");
                })
            }, siteInfo:{
                title: "dpeter99's blog",
                description: "Project list and personal blog of dpeter99",
                email:"",
                language:"en-en"
            }}),
            new archivist.OutputModule()
        )
    ]
}


//console.log(archivist);

//archivist.run(config);