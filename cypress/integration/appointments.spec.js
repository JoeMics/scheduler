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

    cy.contains("Saving").should("exist");
    cy.contains("Saving").should("not.exist");

    cy.contains(".appointment__card--show", interviewer);
    cy.contains(".appointment__card--show", student);
    cy.contains("[data-testid=day]", "Monday").should(
      "have.class",
      "day-list__item--full"
    );
    cy.contains("[data-testid=day]", "no spots remaining");

    cy.reload();

    cy.contains(".appointment__card--show", interviewer);
    cy.contains(".appointment__card--show", student);
    cy.contains("[data-testid=day]", "Monday").should(
      "have.class",
      "day-list__item--full"
    );
    cy.contains("[data-testid=day]", "no spots remaining");
  });

  it("should edit an interview", () => {
    const student = "Lydia Miller-Jones";
    const interviewer = "Tori Malcolm";

    cy.get('img[alt="Edit"]').first().click({ force: true });

    cy.get("[data-testid=student-name-input]").clear().type(student);
    cy.get(`[alt="${interviewer}"]`).click();

    cy.contains("Save").click();

    cy.contains("Saving").should("exist");
    cy.contains("Saving").should("not.exist");

    cy.contains(".appointment__card--show", interviewer);
    cy.contains(".appointment__card--show", student);
    cy.contains("[data-testid=day]", "Monday").should(
      "not.have.class",
      "day-list__item--full"
    );
    cy.contains("[data-testid=day]", "1 spot remaining");
  });

  it("should cancel an interview", () => {
    const student = "Archie Cohen";
    const interviewer = "Sylvia Palmer";

    cy.get('img[alt="Delete"]').first().click({ force: true });

    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    cy.contains("appointment-card--show", student).should("not.exist");
    cy.contains("appointment-card--show", interviewer).should("not.exist");
    cy.contains("[data-testid=day]", "Monday").should(
      "not.have.class",
      "day-list__item--full"
    );
    cy.contains("[data-testid=day]", "2 spots remaining");
  });

  it("should return to the Form or Show view when the user presses the close button of the error", () => {
    const student = "Lydia Miller-Jones";
    const interviewer = "Sylvia Palmer";

    cy.get('img[alt="Add"]').first().click();

    cy.get("[data-testid=student-name-input]").type(student);
    cy.get(`[alt="${interviewer}"]`).click();

    cy.intercept("api/appointments/*", { forceNetworkError: true });
    cy.contains("Save").click();

    cy.contains("Error").should("exist");

    // Goes back to Form
    cy.get('[alt="Close"]').first().click();
    cy.get("main.appointment__card--create").should("exist");
    cy.contains("Cancel").click();

    // Goes back to Show
    cy.get('img[alt="Delete"]').first().click({ force: true });
    cy.contains("Confirm").click();
    cy.contains("Error").should("exist");
    cy.get('[alt="Close"]').first().click();
    cy.contains(".appointment__card--show", "Archie Cohen");
  });
});
