describe('Fluxo Integrado do Autoflex', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('/');
  });

  it('Deve navegar pelo menu lateral corretamente', () => {
    cy.contains('h1', 'Sugestão de Produção').should('be.visible');

    cy.get('nav a[href="/products"]').click();
    cy.contains('h1', 'Produtos').should('be.visible');
    
    cy.get('nav a[href="/raw-materials"]').click();
    cy.contains('h1', 'Matérias-Primas').should('be.visible');
  });

  it('Deve cadastrar Matéria-Prima usando o Gerador de Código', () => {
    cy.visit('/raw-materials');

    cy.get('form button[title="Gerar código automático"]').click();

    cy.get('input[placeholder="MAT-XXXX"]')
      .should('not.have.value', '')
      .invoke('val')
      .should('match', /^MAT-\d{4}$/);

    cy.get('input[placeholder="Ex: Madeira, Ferro..."]').type('Tecido Especial');

    cy.get('form input[type="number"]').type('500');

    cy.contains('button', 'Adicionar').click();

    cy.contains('Tecido Especial').should('be.visible');
    cy.contains('500 un.').should('be.visible');
  });

  it('Deve cadastrar Produto, gerar SKU e vincular receita', () => {
    cy.visit('/products');
    const productName = `Sofá de Teste ${Date.now()}`;

    cy.get('form button[title="Gerar SKU Automático"]').click();
    
    cy.get('input[placeholder="SKU-XXXX"]')
      .invoke('val')
      .should('match', /^SKU-\d{4}$/);

    cy.get('input[placeholder="Ex: Mesa de Jantar"]').type(productName);


    cy.get('form input[type="number"]').type('1200.50');

    cy.contains('button', 'Criar').click();

    cy.contains(productName).should('be.visible');

    cy.contains(productName)
      .parents('div.bg-white')
      .find('button')
      .contains('Gerenciar Receita')
      .click();

    cy.get('select').select(1);
    
    cy.get('input[placeholder="Qtd"]').type('10');

    cy.get('input[placeholder="Qtd"]')
      .parent()
      .find('button[type="submit"]')
      .click();

    cy.contains('10 un.').should('be.visible');
  });

  it('Deve remover um ingrediente da receita', () => {
    cy.visit('/products');
    
    cy.get('button').contains('Gerenciar Receita').first().click();

    cy.get('body').then(($body) => {
        if ($body.find('ul li').length === 0) {
            cy.get('select').first().select(1);
            cy.get('input[placeholder="Qtd"]').first().type('5');
            cy.get('input[placeholder="Qtd"]').first().parent().find('button').click();
        }
    });

   
    cy.get('ul li button[title="Remover"]').first().click();

    cy.contains('Nenhum ingrediente.').should('exist'); 
  });
});