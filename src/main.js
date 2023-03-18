import * as utils from './utils.js';
import './css/common.css';

const { vec2, mat2 } 		= require('gl-matrix');
const rows 					= 10;
const cols 					= 10;
const tileWidth 			= 32;
const tileHeight 			= 32;
const container 			= utils.htmlToElement(`<div class='container'></div>`);
const grid 					= utils.htmlToElement(`<div class='grid'></div>`);

const angle 				= Math.PI / 4;
const scaleX 				= 1;
const scaleY 				= 0.5;

const rotationMatrix 		= mat2.create();
const scalingMatrix 		= mat2.create();
const transformationMatrix 	= mat2.create();
const inverseMatrix 		= mat2.create();

mat2.rotate(rotationMatrix, rotationMatrix, angle);
mat2.scale(scalingMatrix, scalingMatrix, [scaleX, scaleY]);
mat2.multiply(transformationMatrix, scalingMatrix, rotationMatrix);
mat2.invert(inverseMatrix, transformationMatrix);

//const tiles 				= [];

for (let y = 0; y < cols; y++) 
for (let x = 0; x < rows; x++) 
{
	let posX 				= (x - y) * (tileWidth  / 2);
	let posY 				= (x + y) * (tileHeight / 4);
	var block 				= utils.htmlToElement(`<img src='./img/blockB.png' class='tile' style='left: ${posX}px; top: ${posY}px;'/>`);
		block.onmouseover	= function(event){event.target.style.filter = 'brightness(1.5)'};
		block.onmouseleave	= function(event){event.target.style.filter = 'brightness(1.0)'};
	grid.appendChild(block);
//	tiles.push(block);
}

container.appendChild(grid);
document.body.appendChild(container);
