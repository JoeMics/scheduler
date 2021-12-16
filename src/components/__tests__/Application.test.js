import React from "react";
import axios from "__mocks__/axios";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // loads element
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // finds empty spot
    const appointment = getAllByTestId(container, "appointment")[0];

    // books interview
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    // reduce spots remaining by 1
    const days = getAllByTestId(container, "day");
    const monday = days.find((day) => queryByText(day, "Monday"));
    expect(getByText(monday, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // loads element
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // click the "Delete" button on the first non-empty appointment.
    const appointments = getAllByTestId(container, "appointment");
    const bookedAppointment = appointments.find((appointment) =>
      queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(bookedAppointment, "Delete"));

    // make sure confirmation shows
    expect(
      getByText(bookedAppointment, "Are you sure you want to delete?")
    ).toBeInTheDocument();

    // click confirm, make sure "Deleting" is displayed
    fireEvent.click(getByText(bookedAppointment, "Confirm"));
    expect(getByText(bookedAppointment, "Deleting")).toBeInTheDocument();

    // wait until the element with the text "Archie Cohen" is gone.
    await waitForElement(() => !queryByText(bookedAppointment, "Archie Cohen"));

    // check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const days = getAllByTestId(container, "day");
    const monday = days.find((day) => queryByText(day, "Monday"));
    expect(getByText(monday, "2 spots remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // loads element
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    // click the "Edit" button on the first non-empty appointment.
    const appointments = getAllByTestId(container, "appointment");
    const bookedAppointment = appointments.find((appointment) =>
      queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(bookedAppointment, "Edit"));

    fireEvent.change(
      getByPlaceholderText(bookedAppointment, /enter student name/i),
      {
        target: { value: "Lydia Miller-Jones" },
      }
    );

    // click confirm, make sure "Saving" is displayed
    fireEvent.click(getByText(bookedAppointment, "Save"));
    expect(getByText(bookedAppointment, "Saving")).toBeInTheDocument();

    // // wait until the element with the text "Archie Cohen" is gone.
    await waitForElement(() => !queryByText(bookedAppointment, "Archie Cohen"));
    debug(bookedAppointment);

    // // check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const days = getAllByTestId(container, "day");
    const monday = days.find((day) => queryByText(day, "Monday"));
    expect(getByText(monday, "1 spot remaining")).toBeInTheDocument();
  });

  // it("shows the save error when failing to save an appointment", () => {
  //   axios.put.mockRejectedValueOnce();
  // });
});
