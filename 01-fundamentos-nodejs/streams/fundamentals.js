// === Streams
// O conceito surge a partir de Streaming (Aplicações como Netflex, Spotify etc.)
// Quando vamos escutar uma música no Spotify (por exemplo), note que começamos a
// escutá-la desde o início, mesmo que a música não esteja completamente carregada

// E esse é o conceito: obter pequenas partes mesmo que o montante total não esteja
// totalmente pronto

// Um bom exemplo prático é o abaixo:
// Vamos supor que uma empresa que utiliza plataformas de Marketing para gerenciamento
// precise upar um arquivo CSV de 1GB para o banco de dados.
// E a pessoa encarregada de fazer esse upload está utilizando uma máquina que
// Que suporte até 10MB/s de upload.
// Ou seja, essa upload levaria cerca de 1 minuto e meio para ser concluído
// para que depois ele seja inserido no Banco de Dados

// Com o conceito de Streaming, o cenário é outro
// Enquanto a leitura do arquivo é feita (10MB/s), esses mesmos registros que estão
// sendo lidos já são inseridos no banco de dados, antes que todo o upload seja feito

// O exemplo acima mostra os dois tipos de Stream
// Readable Stream / Writeable Streams
