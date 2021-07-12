export async function getCategories() {
  // Implemente aqui
  try {
    const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
    let response = await fetch(URL);
    response = await response.json();
    return response;
  } catch (erro) {
    console.log(erro.message);
  }
}

export async function getProductsFromCategoryAndQuery(categoryId) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  try {
    const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${categoryId}`;
    let data = await fetch(URL);
    data = await data.json();
    return data;
  } catch (erro) {
    console.log(erro.message);
  }
}
