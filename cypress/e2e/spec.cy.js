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
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes("ppms.get is not a function")) {
      return false; // Prevents Cypress from failing the test
    }
    if (err.message.includes("Loading chunk 1479 failed")) {
      return false; // Prevents Cypress from failing the test
    }
    if (err.message.includes("NetworkError when attempting to fetch resource")) {
      return false; // Prevents Cypress from failing the test
    }
  });
  it('user should log in', () => {
    cy.viewport(1920, 1080)
    cy.visit('https://arbetsformedlingen.se/', {timeout: 30000} )
    cy.wait(1000)
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
    cy.wait(5000)

    // cy.get("button").contains("Till Min aktivitetsrapport").click({ force: true })
    // cy.wait(3000)

    cy.get("span").contains("Lägg till aktiviteter ").click({ force: true })
    cy.wait(3000)
      // cy.get('div').contains("Bank-id").should('be.visible').click()
      // cy.wait(2000)
    let ranNums = []
    while (ranNums.length < 12) {
      let newNum = Math.floor(Math.random() * aktiviteter.length)
      if (!ranNums.includes(newNum)) {
        ranNums.push(newNum)
      }
    }

    console.log(ranNums);
    
    ranNums.forEach((num) => {
      cy.get('label').contains("Heltid").click()
      cy.wait(1000)

      cy.get('#soktjobb-soktTjanst-search')
        .clear()
        .type(aktiviteter[num][0], { delay: 100 })

      cy.wait(1000) // wait for autocomplete logic to settle

      cy.get('body').then(($body) => {
        const items = $body.find('li.listItemYrke')
        const button = $body.find('button:contains("Hittar inte yrkesrollen")')

        if (items.length > 0) {
          // Case 2: suggestions visible
          cy.wrap(items.first()).click()
        } else if (button.length > 0) {
          // Case 1: no match, show fallback button
          cy.wrap(button).click()
          cy.wait(1000)
        } else {
          // Case 3: exact match, nothing to click — continue safely
          cy.log('Exact match, no list or button found — continuing')
        }
      })

      cy.wait(1000)


      cy.get('#soktjobb-arbetsgivare').clear().type(aktiviteter[num][1], {delay: 100})
      cy.wait(1000)

      
      let ort = aktiviteter[num][2].replace(/\s+/g, '').toLowerCase()
      switch (ort) {
        case "abr":
            cy.get('label').contains("Utomlands").click()
          break;
        case "rem":
            cy.get('label').contains("Obestämd ort").click()
          break;
        default:
            cy.get('label').contains("Sverige").click()
          cy.get('#soktjobb-ort').clear().type(aktiviteter[num][2], { delay: 100 })
          break;
      }
      cy.wait(1000)

      let x = prevMonth(new Date);
      
      let date = aktiviteter[num][3].replace(/\s+/g, '')
      if (parseInt(date) < 10) {
        date = `0${date}`
      }
      
      cy.get("#soktjobb-aktivitetsdatum").type(`${x.getFullYear()}-${parseInt(x.getMonth() + 1) < 10 ? `0${x.getMonth() + 1}` : x.getMonth() + 1}-${date}`)
      cy.wait(7500)

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