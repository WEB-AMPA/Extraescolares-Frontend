describe('Hero Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('debería mostrar el título correctamente', () => {
      cy.get('h1').should('contain.text', 'Actividades Extraescolares Ciudad de los Ángeles');
    });
  
    it('debería mostrar la primera imagen del carrusel', () => {
      cy.get('img[alt="..."]').should('have.attr', 'src', '/hero1.png');
    });
  
    it('debería navegar a la siguiente imagen del carrusel', () => {
      cy.get('[data-carousel-next]').click();
      cy.get('img[alt="..."]').should('have.attr', 'src', '/hero2.png');
    });
  
    it('debería navegar a la imagen anterior del carrusel', () => {
      cy.get('[data-carousel-prev]').click();
      cy.get('img[alt="..."]').should('have.attr', 'src', '/hero3.png');
    });
  
    it('debería navegar a una imagen específica usando los indicadores', () => {
      cy.get('[data-carousel-slide-to="0"]').click();
      cy.get('img[alt="..."]').should('have.attr', 'src', '/hero1.png');
  
      cy.get('[data-carousel-slide-to="1"]').click();
      cy.get('img[alt="..."]').should('have.attr', 'src', '/hero2.png');
  
      cy.get('[data-carousel-slide-to="2"]').click();
      cy.get('img[alt="..."]').should('have.attr', 'src', '/hero3.png');
    });
  });
  