clear
Remove-Item '.\out' -Recurse
#$Env:NODE_ENV = "production"
npm run build:prod