
import * as archivist from "file://C:/Users/dpete/Documents/Programing/Archivist/src/index.ts";




export const config: archivist.Config = {
    detailedOutput: false,
    template: "./theme",
    outFolder: "./out",
    preProcessors: [
        archivist.Pipeline.fromModules({name:"build_template"},
            new archivist.WebpackModule(),
            new archivist.StaticFilesModule()
        )
    ],
    pipelines:[
        archivist.Pipeline.fromModules({name:"blog_files",outputPath:"./"},
            new archivist.FileReaderModule("content/**/*.md"),
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
            new archivist.TemplateModule(),
            new archivist.OutputModule("./out/"),
            new archivist.StaticFilesModule()
        )
    ]
}


//console.log(archivist);

archivist.run(config);