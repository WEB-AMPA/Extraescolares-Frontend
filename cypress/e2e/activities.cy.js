
describe('Activities', () => {
    beforeEach(() => {
      cy.visit('/path-to-activities-page'); 
    });
  
    it('debería cargar las actividades', () => {
      cy.get('table').should('exist');
      cy.get('tbody tr').should('have.length.at.least', 1);
    });
  
    it('debería filtrar actividades al buscar', () => {
      cy.get('input[placeholder="Buscar Actividad"]').type('nombre de la actividad');
      cy.get('tbody tr').each(($row) => {
        cy.wrap($row).contains('nombre de la actividad', { matchCase: false });
      });
    });
  
    it('debería abrir el modal de edición al hacer clic en "Editar"', () => {
      cy.get('button[title="Editar Actividad"]').first().click();
      cy.get('form').should('exist');
      cy.contains('Editar Actividad').should('be.visible');
    });
  
    it('debería cerrar el modal de edición al hacer clic en "Cancelar"', () => {
      cy.get('button[title="Editar Actividad"]').first().click();
      cy.contains('Cancelar').click();
      cy.get('form').should('not.exist');
    });
  
    it('debería abrir el modal de confirmación al hacer clic en "Eliminar"', () => {
      cy.get('button[title="Eliminar Actividad"]').first().click();
      cy.contains('Confirmar Eliminación').should('be.visible');
    });
  
    it('debería cerrar el modal de confirmación al hacer clic en "Cancelar"', () => {
      cy.get('button[title="Eliminar Actividad"]').first().click();
      cy.contains('Cancelar').click();
      cy.contains('Confirmar Eliminación').should('not.exist');
    });
  
    it('debería eliminar una actividad al confirmar', () => {
      cy.get('button[title="Eliminar Actividad"]').first().click();
      cy.contains('Eliminar').click();
      cy.contains('Confirmar Eliminación').should('not.exist');
      cy.get('tbody tr').should('have.length.lessThan', 10);
    });
  });
  