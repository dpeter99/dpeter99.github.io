
import * as archivist from "file://P:/_Projects/Archivist/archivist/src/index.ts";


export const config: archivist.Config = {
    detailedOutput: false,
    template: "./theme",
    outputPath: "./out",
    preProcessors: [
        archivist.Pipeline.fromModules({name:"build_template"},
            new archivist.WebpackModule(),
            new archivist.StaticTemplateFilesModule()
        )
    ],
    pipelines:[
        archivist.Pipeline.fromModules({name:"blog_files",contentRoot:"./content/"},
            new archivist.FileReaderModule("./**/*.md"),
            new archivist.ExtractMetadata(
                new archivist.FrontMatterMetadata()
            ),
            new archivist.FunctionModule((doc => {
                if(!doc.metadata.hasData("Type")){
                    doc.metadata.addData("Type","post");
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