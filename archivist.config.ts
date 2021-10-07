
//import * as archivist from "./achivist_import.ts";

import * as archivist from "https://github.com/dpeter99/archivist/blob/0.1.0-alpha01/src/index.ts";


export const config: archivist.Config = {
    detailedOutput: false,
    template: "./theme",
    outputPath: "./out",
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