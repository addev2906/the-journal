import { useState, useEffect } from 'react'
import './App.css'
import pictoNames from './values.txt?raw'
import allpictos from './all.json'
import init, { sav_to_json, json_to_sav } from "./utility/uesave/uesave_wasm.js"
import PictoCard from './components/pictoCard.jsx'
import Header from './components/Header.jsx'
import UploadArea from './components/UploadArea.jsx'
import CompletionRate from './components/CompletionRate.jsx'
import githubimg from './assets/github.webp'

function App() {
  const [isFound, setIsFound] = useState([])

  async function processSavegameData(result){
    const savegameData = JSON.parse(result)
    console.log(savegameData)
    let player_pictos_size = 0;
    let playerPictosArray = null;
    try {
      playerPictosArray = savegameData?.root?.properties?.PassiveEffectsProgressions_0;
      if (Array.isArray(playerPictosArray)) {
        player_pictos_size = playerPictosArray.length;
      } else {
        player_pictos_size = 0;
        playerPictosArray = [];
      }
    } catch (e) {
      player_pictos_size = 0;
      playerPictosArray = [];
    }

    console.log("Size:", player_pictos_size);

    let pictos = [];
    for (let i = 0; i < player_pictos_size; i++) {
      const entry = playerPictosArray[i];
      const pictoName = entry?.PassiveEffectName_3_A92DB6CC4549450728A867A714ADF6C5_0;
      if (pictoName) pictos.push(pictoName);
    }

    pictos.sort();
    console.log(pictos)
    const foundArray = Object.keys(allpictos).map(key =>
      pictos.includes(key) ? 'FOUND!' : 'Not Found'
    )

    console.log(foundArray)
    setIsFound(foundArray)  // trigger render with the results

  }
  const [values, setValues] = useState([])
  const [wasmReady, setWasmReady] = useState(false)

  useEffect(() => {
    async function loadWasm() {
      await init()
      setWasmReady(true)
    }
    loadWasm()
  }, [])

  async function handleFileImport(file) {
    if (!wasmReady) {
      console.log("WASM not ready yet")
      return
    }

    if (!file) return

    const buffer = await file.arrayBuffer()

    const result = sav_to_json(new Uint8Array(buffer))
    console.log(result)
    processSavegameData(result)
  }
 
  useEffect(() => {
    if (pictoNames) {
      const list = pictoNames.split('\n').filter(Boolean)
      setValues(list)
    }
  }, [])

  return (
    <>
      <img src={githubimg} alt="GitHub" style={{ cursor: 'pointer', borderRadius: '50%', position: 'fixed', top: 10, right: 10, width: 40, height: 40, zIndex: 1000 }} onClick={() => window.open('https://github.com/addev2906/')} />
      <Header />
      <UploadArea onFileImport={handleFileImport} />
      <CompletionRate foundCount={isFound.filter(status => status === 'FOUND!').length} totalCount={values.length} />
      <div className="card-grid">
        {values.map((name, idx) => {
          return <PictoCard key={idx} name={name} found={isFound[idx]} />
        })}
      </div>
    
    </>
  )
}

export default App