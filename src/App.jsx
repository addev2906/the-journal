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
  const [foundMap, setFoundMap] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [showNotFoundOnly, setShowNotFoundOnly] = useState(false)

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

    const foundMap = {}
    Object.entries(allpictos).forEach(([key, displayName]) => {
      foundMap[displayName] = pictos.includes(key) ? 'FOUND!' : 'Not Found'
    })

    console.log(foundMap)
    setFoundMap(foundMap)  // trigger render with the results

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

  const pictoList = values.map(name => ({
    name,
    found: foundMap[name] ?? 'Not Found'
  }))

  const filteredPictos = pictoList.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesNotFound = !showNotFoundOnly || item.found === 'Not Found'
    return matchesSearch && matchesNotFound
  })

  return (
    <>
      <img src={githubimg} alt="GitHub" style={{ cursor: 'pointer', borderRadius: '50%', position: 'fixed', top: 10, right: 10, width: 40, height: 40, zIndex: 1000 }} onClick={() => window.open('https://github.com/addev2906/')} />
      <Header />
      <UploadArea onFileImport={handleFileImport} />
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#d5a04a', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => {
          navigator.clipboard.writeText('%LOCALAPPDATA%\\Sandfall\\Saved\\SaveGames')
          alert('File path copied to clipboard:\n%LOCALAPPDATA%\\Sandfall\\Saved\\SaveGames')
        }}>Copy path to save location(Windows)</button>
      </div>
      <CompletionRate foundCount={pictoList.filter(item => item.found === 'FOUND!').length} totalCount={values.length} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <label htmlFor='showNotFoundOnly' style={{ color: '#a2b8dd', fontSize: '21px', fontFamily: 'Bebas Neue', letterSpacing: '0.05em', display: 'flex', alignItems: 'center' }}>
          <input
            id='showNotFoundOnly'
            type='checkbox'
            checked={showNotFoundOnly}
            style={{ marginRight: '10px' }}
            onChange={(e) => setShowNotFoundOnly(e.target.checked)}
          />
          Show undiscovered
        </label>

        <input
          type='search'
          placeholder='Search picto...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '6px 10px', fontSize: '16px', borderRadius: '5px', border: '1px solid rgba(162, 184, 221, 0.5)', marginLeft: 'auto' }}
        />
      </div>
      <div className="card-grid">
        {filteredPictos.map((item, idx) => {
          return <PictoCard key={idx} name={item.name} found={item.found} />
        })}
      </div>
    
    </>
  )
}

export default App