describe('CRUD de usuarios primera alternativa ', () => {
  /*
  La primer alternativa para correr el script es guardar la API_KEY en un .env previamente y ejecutar el script.
  La desventaja de este enfoque es que si vence la key, los test fallan y esta key no es actualizable en tiempo de ejecución.
  Por otro lado, si no hubiese limite por el uso de variables, esta opción es mejor dado que es más sencilla. 
  */
  let apiUrl;
  let userId;
  before(() => {
    cy.readFile('.env').then((contenido) => {
      const key = contenido.match(/API_KEY=(.*)/)?.[1];
      if (!key) {
        throw new Error("API_KEY no encontrada en .env");
      }
      apiUrl = `https://crudcrud.com/api/${key}`;
    });
  });

  it('Alta de un usuario se genera correctamente', () => {
    cy.fixture('startUser').then((userBody) => {
      cy.request("POST", `${apiUrl}/users`, userBody).then((res) => {
        expect(res.status).to.eq(201)
        userId = res.body._id;
        expect(userBody.name).to.eq(res.body.name)
        expect(userBody.job).to.eq(res.body.job)
      });
    });
  })

  it('Consulta de un usuario se realiza correctamente', () => {
    cy.fixture('startUser').then((userBody) => {
      cy.request("GET", `${apiUrl}/users/${userId}`).then((res) => {
        expect(res.status).to.eq(200)
        expect(userBody.name).to.eq(res.body.name)
        expect(userBody.job).to.eq(res.body.job)
      });
    });
  })

  it('Actualizacion de un usuario se realiza correctamente', () => {
    cy.fixture('UpdatedUser').then((userBody) => {
      cy.request("PUT", `${apiUrl}/users/${userId}`, userBody).then((res) => {
        expect(res.status).to.eq(200)
      });
    });
  })

  it('El usuario tiene nuevos valores', () => {
    cy.fixture('UpdatedUser').then((userBody) => {
      cy.request("GET", `${apiUrl}/users/${userId}`).then((res) => {
        cy.log
        expect(res.status).to.eq(200)
        cy.log(JSON.stringify(res.body))
        expect(userBody.name).to.eq(res.body.name)
        expect(userBody.job).to.eq(res.body.job)
      });
    });
  })


  it('Borrar un usuario, se realiza correctamente', () => {
    cy.request("DELETE", `${apiUrl}/users/${userId}`).then((res) => {
      expect(res.status).to.eq(200)
    });
  })
  it('El usuario no está presente', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/users/${userId}`,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(404)
    })
  })
})
