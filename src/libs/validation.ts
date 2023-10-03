function validatePassword(password: string) {
  return password.length >= 6 || "Mínimo 6 caracteres.";
}

function validateEmail(email: string) {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(email) || "E-mail inválido.";
}

function validateName(name: string) {
  return !!name || "Insira um nome.";
}

export { validatePassword, validateEmail, validateName };
