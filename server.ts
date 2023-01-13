import * as Peko from "https://deno.land/x/peko@1.3.4/mod.ts"
import { recursiveReaddir } from "https://deno.land/x/recursive_readdir@v2.0.0/mod.ts"
import { fromFileUrl } from "https://deno.land/std@0.150.0/path/mod.ts"

const server = new Peko.Server()

server.use(Peko.logger(console.log))

server.addRoute("/", Peko.staticHandler(new URL("./index.html", import.meta.url)))

const staticFiles = (await recursiveReaddir(fromFileUrl(new URL("./", import.meta.url))))
  .filter(file => !file.includes(".git"))
  
staticFiles.forEach((file): number => {
  const fileRoute = file.slice(`${Deno.cwd()}`.length+1)
  return server.addRoute(
    `/${fileRoute}`, 
    Peko.staticHandler(new URL(`./${fileRoute}`, import.meta.url)
  )
  )
})

server.listen(3000)