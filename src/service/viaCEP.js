async function getCityByCEP(cep){
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/ `,{
        method:'GET'
    });

    const { localidade,  erro} = await response.json();

    if(erro ){
        return false;
    }
    
      return localidade;
    } catch (error) {
      return false;
  }
}




module.exports = { getCityByCEP}