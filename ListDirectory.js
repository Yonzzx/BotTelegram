const fs = require('fs').promises;
const { sep } = require('path');

async function listarArquivosDoDiretorio(diretorio, arquivos) {
  
    if(!arquivos)
        arquivos = [];

    let listaDeArquivos = await fs.readdir(diretorio);


    for(let k in listaDeArquivos) {

        let photo = {
            type:'photo',
            media: diretorio + sep + listaDeArquivos[k]
        }
        
        let video = {
            type:'video',
            media: diretorio + sep + listaDeArquivos[k]
        }
        let stat = await fs.stat(diretorio + sep + listaDeArquivos[k]);
      
        if(stat.isDirectory()){
            await listarArquivosDoDiretorio(diretorio + sep + listaDeArquivos[k], arquivos);
          }else if(diretorio === './photos'){
            arquivos.push(photo);
          }else if(diretorio === './video'){
            arquivos.push(video)
          }else{
              return
          }
    
    }
    return arquivos;
}
module.exports = listarArquivosDoDiretorio;