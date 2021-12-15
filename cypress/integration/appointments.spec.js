describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("[data-testid=day]", "Monday");
  });

  it("should book an interview", () => {
    const student = "Lydia Miller-Jones";
    const interviewer = "Sylvia Palmer";

    cy.get('img[alt="Add"]').first().click();

    cy.get("[data-testid=student-name-input]").type(student);
    cy.get(`[alt="${interviewer}"]`).click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", interviewer);
    cy.contains(".appointment__card--show", student);
  });

  it("should edit an interview", () => {
    const student = "Lydia Miller-Jones";
    const interviewer = "Tori Malcolm";

    cy.get('img[alt="Edit"]').first().click({ force: true });

    cy.get("[data-testid=student-name-input]").clear().type(student);
    cy.get(`[alt="${interviewer}"]`).click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", interviewer);
    cy.contains(".appointment__card--show", student);
  });

  it("should cancel an interview", () => {
    const student = "Archie Cohen";
    const interviewer = "Sylvia Palmer";

    cy.get('img[alt="Delete"]').first().click({ force: true });

    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains("appointment-card--show", student).should("not.exist");
  });
});
