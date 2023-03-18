import * as utils from './utils.js';
import './css/common.css';

// const { vec2, mat2 } 		= require('gl-matrix');
const scale					= 2;
const rows 					= 10;
const cols 					= 10;
const tileWidth 			= 32;
const tileHeight 			= 32;
const container 			= utils.htmlToElement(`<div class='container'></div>`);
const grid 					= new Array(rows).fill().map(() => new Array(cols).fill(0));

// const angle 					= Math.PI / 4;
// const scaleX 				= 1;
// const scaleY 				= 0.5;
// const rotationMatrix 		= mat2.create();
// const scalingMatrix 			= mat2.create();
// const transformationMatrix 	= mat2.create();
// const inverseMatrix 			= mat2.create();

// mat2.rotate(rotationMatrix, rotationMatrix, angle);
// mat2.scale(scalingMatrix, scalingMatrix, [scaleX, scaleY]);
// mat2.multiply(transformationMatrix, scalingMatrix, rotationMatrix);
// mat2.invert(inverseMatrix, transformationMatrix);

//const tiles 				= [];

for (let y = 0; y < cols; y++) 
for (let x = 0; x < rows; x++) 
{
	let posX 				= (x - y) * (tileWidth  / 2);
	let posY 				= (x + y) * (tileHeight / 4);
	var block 				= utils.htmlToElement(`<img src='./img/blockB.png' class='tile' style='left: ${posX}px; top: ${posY}px;'/>`);
	grid[y][x] 				= [	(posX + tileWidth  / 2) * 1	, 
								(posY + tileHeight / 4) * 1	,
								block						];
//		block.onmouseover	= function(event){event.target.style.filter = 'brightness(1.5)'};
//		block.onmouseleave	= function(event){event.target.style.filter = 'brightness(1.0)'};
	container.appendChild(block);
	container.style.scale 	= scale;
}

document.body.appendChild(container);

for (let y = 0; y < cols; y++) 
for (let x = 0; x < rows; x++) 
{
	let px = grid[y][x][0] + "px";
	let py = grid[y][x][1] + "px";
	let dot = utils.htmlToElement(`<div style='left: ${px}; top: ${py};' class='dot'></div>`)
	dot.onclick = function(){console.log(px, py)}
	container.appendChild(dot);
}
/*
document.onmousemove = function(event) {

	const origin	= [	container.offsetLeft - container.offsetWidth / 2, 
						container.offsetTop - container.offsetHeight / 2]
	const rect 		= event.target.getBoundingClientRect();
	const mouseX 	= event.clientX - rect.left;
	const mouseY 	= event.clientY - rect.top;

//	console.log(mouseX, mouseY, origin);
//	let dot = utils.htmlToElement(`<div style='left: ${origin[0]}px; top: ${origin[1]}px; width: 10px; height: 10px' class='dot'></div>`)
//	document.body.appendChild(dot);

}
*/

document.onmousemove = function (event)
{
	const origin 			= [	container.offsetLeft - container.offsetWidth  / 2	+ tileWidth / 4,
								container.offsetTop  - container.offsetHeight / 2	+ tileHeight / 4];
	const mouseX 			= event.clientX;
	const mouseY 			= event.clientY;
	let closestTile 		= null;
	let smallestDistance 	= Infinity;

	for (let y = 0; y < cols; y++)
	for (let x = 0; x < rows; x++)
	{
		grid[y][x][2].style.filter = 'brightness(1.0)';
		const tilePosX = grid[y][x][0] * scale + origin[0];
		const tilePosY = grid[y][x][1] * scale + origin[1];
		const distance = Math.sqrt(Math.pow(mouseX - tilePosX, 2) + Math.pow(mouseY - tilePosY, 2));

		if (distance < smallestDistance)
		{
			closestTile 		= { x, y };
			smallestDistance 	= distance;
		}
	}

	console.log(closestTile);

	grid[closestTile.y][closestTile.x][2].style.filter = 'brightness(1.5)';
}