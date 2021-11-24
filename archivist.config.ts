
//import * as archivist from "./achivist_import.ts";

import * as archivist from "https://raw.githubusercontent.com/dpeter99/archivist/0.1.0-alpha04/src/index.ts";


let env : "development" | "production" = "development"
if(Deno.args.includes("--env=prod")){
    env = "production"    
}
console.log(env);

export const config: archivist.Config = {
    detailedOutput: false,
    template: "./theme",
    outputPath: "./out",
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
            new archivist.TemplateModule(),
            new archivist.OutputModule()
        )
    ]
}


//console.log(archivist);

archivist.run(config);