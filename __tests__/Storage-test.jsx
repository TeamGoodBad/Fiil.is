/**
 * @format
 */

import { MMKVLoader, isLoaded } from 'react-native-mmkv-storage';
import * as userdata from "../src/storage/userdata"

beforeEach(function () {
  // Install the in-memory adapter
  let mmkvMock = require('react-native-mmkv-storage/jest/dist/jest/memoryStore.js');
  mmkvMock.unmock(); // Cleanup if already mocked
  mmkvMock.mock(); // Mock the storage
});

// Prevent MMKV native modules init
jest.mock('react-native-mmkv-storage/dist/src/mmkv/init', () => {
  const originalModule = jest.requireActual('react-native-mmkv-storage/dist/src/mmkv/init');

  return {
    ...originalModule,
    init: jest.fn(() => true)}
});

// Use the storage methods as needed. Everything is mocked now
it('Mock bindings are installed', () => {
  expect(isLoaded()).toBe(true);
});

// Create a new instance.
it('Init an instance', () => {
  let instance = new MMKVLoader().initialize();
  expect(instance.instanceID).toBe('default');
  expect(instance.getString('unknown')).toBe(null);
});

it("adds and retrieves entries", async () => {
  // Set db schema (new tests wipe db)
  userdata.writeCurrentSchema();

  // Set some entries
  const entry1 = {date: new Date(2000, 1, 1), rating: 5, text: "Test text"};
  const entry2 = {date: new Date(2000, 2, 1), rating: 4, text: "More test text"};
  const entry3 = {date: new Date(2000, 1, 2), rating: 3, text: "Something else entirely"};
  const entry4 = {date: new Date(2001, 1, 1), rating: 2, text: "A whole new dimension of cool?"};
  const entry5 = {date: new Date(1999, 1, 1), rating: 1, text: "⭐😄🏇"};
  await userdata.setEntry(entry1);
  await userdata.setEntry(entry2);
  await userdata.setEntry(entry3);
  await userdata.setEntry(entry4);
  await userdata.setEntry(entry5);

  // Get everything
  const entries = await userdata.getEntries();
  expect(entries.length).toBe(5);

  // Filter by date
  const results = await userdata.getEntries({minDate: entry1.date, maxDate: entry1.date});
  expect(results).toIncludeSameMembers([entry1]);

  // Filter by rating
  const results2 = await userdata.getEntries({minRating: 2, maxRating: 4});
  expect(results2).toIncludeSameMembers([entry2, entry3, entry4]);

  // Filter by text
  const results3 = await userdata.getEntries({containsText: "TEST"});
  expect(results3).toIncludeSameMembers([entry1, entry2]);
  const results4 = await userdata.getEntries({containsText: "⭐"});
  expect(results4).toIncludeSameMembers([entry5]);

  // Filter by words
  const results5 = await userdata.getEntries({containsWords: ["COOL", "dImEnSiOn"]});
  expect(results5).toIncludeSameMembers([entry4]);

  // Export and import
  const dump = await userdata.dump(true);
  userdata.clearUserDB();
  await userdata.load(dump);
  const dump2 = await userdata.dump(true);
  expect(dump2).toBe(dump);
});
