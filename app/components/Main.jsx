import React from 'react';

/*----------Components----------*/
import BossModal from 'BossModal';
import DeathModal from 'DeathModal';
import Header from 'Header';
import LavaModal from 'LavaModal';
import Legend from 'Legend';
import Map from 'Map';
import WaterModal from 'WaterModal';

var Main = () => {
  return (
    <div>
      <Header/>
      <Legend/>
      <Map/>
      <BossModal/>
      <DeathModal/>
      <LavaModal/>
      <WaterModal/>
    </div>
  );
};

export default Main;
