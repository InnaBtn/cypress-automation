
describe('Finding all buttons and links on the page using DDT.', () => {
    const footerLinks = [
        { url: 'https://www.facebook.com/Hillel.IT.School', icon: '.icon-facebook' },
        { url: 'https://t.me/ithillel_kyiv', icon: '.icon-telegram' },
        { url: 'https://www.youtube.com/user/HillelITSchool?sub_confirmation=1', icon: '.icon-youtube' },
        { url: 'https://www.instagram.com/hillel_itschool/', icon: '.icon-instagram' },
        { url: 'https://www.linkedin.com/school/ithillel/', icon: '.icon-linkedin' },
        { url: 'https://ithillel.ua', icon: '.contacts_link.display-4' },
        { url: 'mailto:developer@ithillel.ua', icon: '.contacts_link.h4' }
    ];

    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space/', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        });
    });

    it('Find "Sign Up" button on the homepage.', () => {
        cy.get('.hero-descriptor_btn.btn.btn-primary').should('exist')
    })

    footerLinks.forEach(link => {
        it(`Check the link ${link.url}`, () => {
            cy.get(`a[href="${link.url}"]`).should('exist').and('be.visible');
            cy.get(link.icon).should('exist').and('be.visible');
        });
    });

    it('Check the logo in footer', () => {
        cy.get('a.footer_logo').should('be.visible').and('have.attr', 'href').and('not.be.empty');
    });
});