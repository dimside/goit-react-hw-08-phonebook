import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = state => state.contacts;

export const selectSortedContacts = createSelector([selectContacts], contacts =>
  [...contacts.items].sort((a, b) => a.name.localeCompare(b.name))
);

export const selectFilter = state => state.filter;
