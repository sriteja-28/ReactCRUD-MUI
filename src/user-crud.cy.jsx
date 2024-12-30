
describe('User CRUD operations', () => {
    it('should add, edit, and delete a user', () => {
      cy.visit('/');
  
      cy.contains('Add User').click();
  
      cy.get('input[name="name"]').type('New User');
      cy.get('input[name="email"]').type('newuser@example.com');
  
      cy.contains('Add User').click();
  
      cy.contains('New User');
      cy.contains('Edit').click();
  
      cy.get('input[name="name"]').clear().type('Updated User');
      cy.contains('Update User').click();
  
      cy.contains('Updated User');
      cy.contains('Delete').click();
  
      cy.contains('Updated User').should('not.exist');
    });
  });
  