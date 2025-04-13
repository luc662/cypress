describe('CRUD de usuarios, segunda alternativa ', () => {
  /*
  La segunda alternativa para correr el script es generar una key nuevo cada vez que se se ejecutan los tests.
  Este caso tiene la ventaja que las key son nuevas en cada ejecución, por lo que no se vencen por tiempo ni por usos.
  Dado que crudcrud.com no tiene un endpoint para generar las keys, opté por obtenerlas desde el navegador con un web driver.
  */
  let apiUrl;
  let userId;
  before(() => {
    cy.readFile('.env').then((contenido) => {
      cy.visit('https://crudcrud.com')
      cy.get('div.hero-body').find('a.button.is-primary').click()
      cy.get('input#UniqueId')
        .invoke('val')
        .then((key) => {
          apiUrl = `https://crudcrud.com/api/${key}`;
        })

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
