const fs = require('fs');

const savegameData = JSON.parse(fs.readFileSync('./savegame.json', 'utf8'));

let player_pictos_size = savegameData.root.properties.PassiveEffectsProgressions_0.Array.Struct.value.length;

console.log("Size:",player_pictos_size);

let pictos = [];
for(let i = 0;i<player_pictos_size;i++){
    let pictoName = savegameData.root.properties.PassiveEffectsProgressions_0.Array.Struct.value[i].Struct.PassiveEffectName_3_A92DB6CC4549450728A867A714ADF6C5_0.Name;
    pictos.push(pictoName);
}

pictos.sort();

fs.writeFileSync('./pictos/player_pictos.txt', pictos.join('\n'), 'utf8');
console.log('Pictos have been written to player_pictos.txt');

const allKeys = fs.readFileSync('./pictos/filtered_keys.txt', 'utf8').split('\n').filter(line => line.trim() !== '');
const playerPictos = fs.readFileSync('./pictos/player_pictos.txt', 'utf8').split('\n').filter(line => line.trim() !== '');

const missingPictos = allKeys.filter(key => !playerPictos.some(p => p.toLowerCase() === key.toLowerCase()));

fs.writeFileSync('./pictos/missing_pictos.txt', missingPictos.join('\n'), 'utf8');
console.log('Missing pictos have been written to missing_pictos.txt');