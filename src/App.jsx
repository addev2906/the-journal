import { useState, useEffect } from 'react'
import './App.css'
import pictoNames from './values.txt?raw'
import allpictos from './all.json'
import init, { sav_to_json, json_to_sav } from "./utility/uesave/uesave_wasm.js"
import PictoCard from './components/pictoCard.jsx'
import Header from './components/Header.jsx'
import UploadArea from './components/UploadArea.jsx'

function App() {
  const [isFound, setIsFound] = useState([])

  async function processSavegameData(result){
    const savegameData = JSON.parse(result)
    console.log(savegameData.root)

    let player_pictos_size = savegameData.root.properties.PassiveEffectsProgressions_0.length;

    console.log("Size:",player_pictos_size);

    let pictos = [];
    for(let i = 0;i<player_pictos_size;i++){
        let pictoName = savegameData.root.properties.PassiveEffectsProgressions_0[i].PassiveEffectName_3_A92DB6CC4549450728A867A714ADF6C5_0;
        pictos.push(pictoName);
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
      <Header />
      <UploadArea onFileImport={handleFileImport} />
      <div className="card-grid">
        {values.map((name, idx) => {
          return <PictoCard name={name} found={isFound[idx]} />
        })}
      </div>
    
    </>
  )
}

export default App