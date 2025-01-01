describe('template spec', () => {
  let aktiviteter = []
  before(() => {
    const fs = require('fs');

    cy.readFile('./aktiviteter.csv').then((text)=> {
      console.log(text);
      let rows = text.split("\n")
      rows.shift()
      rows.forEach(element => {
        aktiviteter.push(element.split(","))
      });
      console.log(aktiviteter);
    })
    
    // const file = fs.readFileSync("./filepath").toString();
    // console.log(file);
    
  })
  it('user should log in', () => {
    cy.viewport(1920, 1080)
    cy.visit('https://arbetsformedlingen.se/', {timeout: 5000} )
    cy.get('button').contains("Jag godkänner alla kakor").click()

    cy.get('div').contains("Logga in").should('be.visible').click()
    cy.wait(2000)

    cy.get('div').contains("Bank-id").should('be.visible').click()
    cy.wait(2000)
    // })

    cy.origin('https://idp.ciceron.cloud', () => {

      cy.get('#loginButton2').contains("Mobilt bank-id").should('be.visible').click()
      cy.wait(25000)

    })

    cy.wait(5000)
    //Force true tar en till fel knapp o_O (såklart när den inte hittar rätt knapp från första början :/)
    cy.get('a').contains("Aktivitetsrapportera").click({ force: true })
    cy.wait(2000)

    cy.get('a').contains("Rapportera dina aktiviteter").click()
    cy.wait(2000)

    // cy.get("button").contains("Till Min aktivitetsrapport").click({ force: true })
    // cy.wait(3000)

    cy.get("span").contains("Lägg till aktiviteter ").click({ force: true })
    cy.wait(3000)
      // cy.get('div').contains("Bank-id").should('be.visible').click()
      // cy.wait(2000)
    aktiviteter.forEach((aktivitet) => {
      cy.get('label').contains("Genom annons").click()
      cy.get('#soktjobb-soktTjanst').type(aktivitet[0])
      cy.get('#soktjobb-arbetsgivare').type(aktivitet[1])
      
      let ort = aktivitet[2].replace(/\s+/g, '').toLowerCase()
      switch (ort) {
        case "abr":
            cy.get('label').contains("Utomlands").click()
          break;
        case "rem":
            cy.get('label').contains("Obestämd ort").click()
          break;
        default:
            cy.get('label').contains("Sverige").click()
            cy.get('#soktjobb-ort').type(aktivitet[2])
          break;
      }

      let x = prevMonth(new Date);
      
      let date = aktivitet[3].replace(/\s+/g, '')
      if (parseInt(date) < 10) {
        date = `0${date}`
      }
      
      cy.get("#soktjobb-aktivitetsdatum").type(`${x.getFullYear()}-${x.getMonth()+1}-${date}`)
      cy.wait(10000)

      cy.get('button').contains("Spara").click()

    })
  });
  function prevMonth(dateObj) {
    var tempDateObj = new Date(dateObj);

    if (tempDateObj.getMonth) {
      tempDateObj.setMonth(tempDateObj.getMonth() - 1);
    } else {
      tempDateObj.setYear(tempDateObj.getYear() - 1);
      tempDateObj.setMonth(12);
    }

    return tempDateObj
  };
})