import * as utils from './utils.js';
import { MENU } from './gui.js';
import { OPTIONS } from './options.ini.js';
import './css/common.css';


const container 			= utils.htmlToElement(`<div class='container'></div>`);
const grid 					= new Array(OPTIONS.lays).fill().map(() => new Array(OPTIONS.rows).fill().map(() => new Array(OPTIONS.cols).fill(0)));

for (let z = 0; z < OPTIONS.lays; z++) 
for (let y = 0; y < OPTIONS.cols; y++) 
for (let x = 0; x < OPTIONS.rows; x++) 
{
	let posX 				= (x - y) * (OPTIONS.tileWidth  / 2);
	let posY 				= (x + y) * (OPTIONS.tileHeight / 4);
	var block 				= utils.htmlToElement(`<img src='./img/blockB.png' class='tile' style='left: ${posX}px; top: ${posY}px;'/>`);
	grid[z][y][x] 			= [	(posX + OPTIONS.tileWidth  / 2) * 1	, 
								(posY + OPTIONS.tileHeight / 4) * 1	,
								block						];
	container.appendChild(block);
	container.style.scale 	= OPTIONS.scale;
	container.style.height	= OPTIONS.rows * OPTIONS.tileWidth / 2 + "px"
	container.style.weight	= OPTIONS.tileWidth + "px";
}

document.body.appendChild(container);

document.onmousemove = function (event)
{
	const origin 			= [	container.offsetLeft - container.offsetWidth  / 2	+ OPTIONS.tileWidth / 4,
								container.offsetTop  - container.offsetHeight / 2	+ OPTIONS.tileHeight / 4];
	const mouseX 			= event.clientX;
	const mouseY 			= event.clientY;
	let closestTile 		= null;
	let smallestDistance 	= Infinity;

	for (let z = 0; z < OPTIONS.lays; z++)
	for (let y = 0; y < OPTIONS.cols; y++)
	for (let x = 0; x < OPTIONS.rows; x++)
	{
		grid[z][y][x][2].classList.remove("tile_select")
		const tilePosX = grid[z][y][x][0] * OPTIONS.scale + origin[0];
		const tilePosY = grid[z][y][x][1] * OPTIONS.scale + origin[1];
		const distance = Math.sqrt(Math.pow(mouseX - tilePosX, 2) + Math.pow(mouseY - tilePosY, 2));

		if (distance < smallestDistance)
		{
			closestTile 		= { x, y };
			smallestDistance 	= distance;
		}
	}

	//	max z
	grid[0][closestTile.y][closestTile.x][2].classList.add("tile_select");
}


function animateWaterWave()
{
	OPTIONS.time += OPTIONS.speed;

	for (let z = 0; z < OPTIONS.lays; z++)
	for (let y = 0; y < OPTIONS.cols; y++)
	for (let x = 0; x < OPTIONS.rows; x++) 
	{
		const waveOffsetY	= OPTIONS.amplitude * Math.sin((x + y) * OPTIONS.frequency + OPTIONS.time);
		let posX 			= (x - y) * (OPTIONS.tileWidth  / 2);
		let posY 			= (x + y) * (OPTIONS.tileHeight / 4) + waveOffsetY;
		let block 			= grid[z][y][x][2];
		block.style.left 	= `${posX}px`;
		block.style.top 	= `${posY}px`;
	}

//	if(OPTIONS.animation == "wave")
//	requestAnimationFrame(animateWaterWave);
}

function animateWaterWaveRadial() 
{
	OPTIONS.time += OPTIONS.speed;
  
	for (let z = 0; z < OPTIONS.lays; z++)
	for (let y = 0; y < OPTIONS.cols; y++)
	for (let x = 0; x < OPTIONS.rows; x++) 
	{
		const dx 			= x - Math.floor(OPTIONS.rows / 2);
		const dy 			= y - Math.floor(OPTIONS.cols / 2);
		const distance 		= Math.sqrt(dx * dx + dy * dy);
		const waveOffsetY 	= OPTIONS.amplitude * Math.sin(distance * OPTIONS.frequency + OPTIONS.time);

		let posX 			= (x - y) * (OPTIONS.tileWidth / 2);
		let posY 			= (x + y) * (OPTIONS.tileHeight / 4) + waveOffsetY;
		let block 			= grid[z][y][x][2];
		block.style.left 	= `${posX}px`;
		block.style.top 	= `${posY}px`;
	}

//	if(OPTIONS.animation == "radial")
//	requestAnimationFrame(animateWaterWaveRadial);
}

function animation()
{
	switch(OPTIONS.animation)
	{
		case "radial": animateWaterWaveRadial(); break;
		case "wave": animateWaterWave(); break;
		case "none": break;
		default: break;
	}

	requestAnimationFrame(animation);
}

	animation();
	MENU();