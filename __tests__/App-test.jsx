/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

import { MMKVLoader, isLoaded } from 'react-native-mmkv-storage';
import { mmkvBridgeModule } from 'react-native-mmkv-storage/dist/src/mmkv/init'

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

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

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

it('renders correctly', () => {
  renderer.create(<App />);
});
