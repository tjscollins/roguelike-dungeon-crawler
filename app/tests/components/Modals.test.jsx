/*global describe it*/
var expect = require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

import {configure} from 'configureStore';
import ConnectedBossModal, {BossModal} from 'BossModal';
var DeathModal = require('DeathModal');
var WaterModal = require('WaterModal');
var LavaModal = require('LavaModal');

describe('event Modals', () => {
  describe('BossModal', () => {
    it('should exist', () => {
      expect(BossModal).toExist();
    });
    // it('should reset the game', () => {
    //   var dungeon = {
    //     allVisible: false,
    //     victory: false,
    //     levels: []
    //   };
    //
    //   var character = {
    //     health: 20,
    //     maxHealth: 20,
    //     xp: 0,
    //     depth: 0,
    //     weapon: {
    //       name: 'Fists',
    //       dmg: '5'
    //     },
    //     position: [0, 0]
    //   };
    //   var spy = expect.createSpy();
    //   var store = configure({dungeon, character});
    //   var provider = TestUtils.renderIntoDocument(
    //     <Provider store={store}>
    //       <BossModal/>
    //     </Provider>
    //   );
    //   var $el = $(ReactDOM.findDOMNode(provider));
    //
    // });
  });

  describe('DeathModal', () => {
    it('should exist', () => {
      expect(DeathModal).toExist();
    });
  });

  describe('WaterModal', () => {
    it('should exist', () => {
      expect(WaterModal).toExist();
    });
  });

  describe('LavaModal', () => {
    it('should exist', () => {
      expect(LavaModal).toExist();
    });
  });
});
