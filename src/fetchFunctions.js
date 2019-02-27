import api_config from "./config.json";

export function fetchIngredients(token) {
  return fetch(api_config.api_url + api_config.ingredients_uri, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token
    }
  });
}

export function fetchIngredient(ingredient_id) {
  return fetch(
    api_config.api_url + api_config.ingredients_uri + "/" + ingredient_id
  );
}

export function addIngredient(ingredient, token) {
  return fetch(api_config.api_url + api_config.ingredients_uri, {
    method: "POST",
    body: JSON.stringify(ingredient), // data can be `string` or {object}!
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
      "accept-encoding": "gzip, deflate"
    }
  });
}

export function fetchUsers(empresa) {
  return fetch(
    "http://www.federicodonner.com/clublibros_api/public/api/usuarios?empresa=" +
      empresa
  );
}

export function fetchUser(token, id) {
  const url =
    "http://www.federicodonner.com/clublibros_api/public/api/usuarios/" + id;

  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token
    }
  });
}

export function signupUser(user, companyId) {
  const data = { nombre: user.nombre, email: user.email, empresa: companyId };
  const url =
    "http://www.federicodonner.com/clublibros_api/public/api/usuarios";
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept-encoding": "gzip, deflate"
    },
    body: JSON.stringify(data)
  });
}

export function fetchActiveUser(token) {
  const url = "http://www.federicodonner.com/clublibros_api/public/api/yo";

  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token
    }
  });
}

export function loginUser(user, password) {
  const data = { grant_type: "password", username: user, password: password };

  const url = api_config.api_url + api_config.oauth_uri;

  return fetch(url, {
    method: "POST", // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: {
      "Content-Type": "application/json",
      "accept-encoding": "gzip, deflate"
    }
  });
}

export function fetchBooks(token, availables) {
  const url =
    "http://www.federicodonner.com/clublibros_api/public/api/libros?disponibles=" +
    availables;

  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token
    }
  });
}

export function fetchBook(token, id) {
  const url =
    "http://www.federicodonner.com/clublibros_api/public/api/libros/" + id;

  return fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token
    }
  });
}

export function addBook(book, userId, token) {
  const url = "http://www.federicodonner.com/clublibros_api/public/api/libros";
  const data = {
    titulo: book.titulo,
    autor: book.autor,
    ano: book.ano,
    resumen: book.resumen,
    idioma: book.idioma,
    usr_dueno: userId
  };
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "accept-encoding": "gzip, deflate",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(data)
  });
}

// This function verifies login information in local storage
// If not found, it navigates to userselect
// Should be called from componentDidMount in every route
export function verifyLogin() {
  const username = localStorage.getItem("amerendar_username");
  const token = localStorage.getItem("amerendar_token");

  if (username && token) {
    return { username: username, token: token };
  }
}
