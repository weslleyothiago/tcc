
function handleCredentialResponse(response) {
    // Token JWT a ser decodificado
    const token = response.credential;

    // Dividir o token em partes (cabeçalho, payload e assinatura)
    const [headerB64, payloadB64, signature] = token.split('.');

    // Decodificar as partes do token de Base64 para JSON
    const header = JSON.parse(atob(headerB64));
    const payload = JSON.parse(atob(payloadB64));

    // Exibir o cabeçalho e o payload decodificados
    console.log('Cabeçalho:', header);
    console.log('Payload:', payload);

    const { email, name, sub, given_name, family_name, email_verified, picture } = payload;

    // Construir uma representação legível das informações do token
    const infoTokenHTML = `
        <h2>Informações do Token JWT:</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Sub:</strong> ${sub}</p>
        <p><strong>Primeiro nome:</strong> ${given_name}</p>
        <p><strong>Segundo nome:</strong> ${family_name}</p>
        <p><strong>Situacao do email:</strong> ${email_verified}</p>
        <img src="${picture}">
    `;

    // Atualizar o conteúdo do elemento HTML com as informações do token
    document.getElementById('infoTokenHTML').innerHTML = infoTokenHTML;
  }
  window.onload = function () {
    google.accounts.id.initialize({
      client_id: "145866686230-51glri1oau7v92q4lcqs2ccgnh1o288e.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      {
        type            :"standard",
        shape           :"pill",
        theme           :"filled_black",
        text            :"continue_with",
        size            :"large",
        logo_alignment  :"left",
        width           :"300"

      }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }
