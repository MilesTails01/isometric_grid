import * as dat from 'dat.gui';
import { OPTIONS } from './options.ini.js';

export function initGUI()
{
	var gui = new dat.GUI({hideable: false});
		gui.domElement.style.position 	= "absolute";
		gui.domElement.style.right 		= "10px";

	const anim			= gui.addFolder("anim");
	const common		= gui.addFolder("common");
	common.add(OPTIONS, "rows")			.min(0).max(100).step(1).onChange();
	common.add(OPTIONS, "cols")			.min(0).max(100).step(1).onChange();
	common.add(OPTIONS, "lays")			.min(0).max(10).step(1).onChange();
	common.add(OPTIONS, "tileWidth")	.min(0).max(64).step(1).onChange();
	common.add(OPTIONS, "tileHeight")	.min(0).max(64).step(1).onChange();

	anim.add(OPTIONS, "amplitude")		.min(0).max(100).step(0.1).onChange();
	anim.add(OPTIONS, "frequency")		.min(0).max(5).step(0.01).onChange();
	anim.add(OPTIONS, "speed")			.min(0).max(1).step(0.01).onChange();


	anim.add(OPTIONS, 'animation', OPTIONS.animations).name('animation').onChange((value) => {	OPTIONS.animation = value;	});

//	f_debug.add(OPTIONS, "WIREFRAME").onChange(									function(){ })
//	f_debug.addColor(OPTIONS, "WIRECOLOR");

	common.close();
	anim.open();

	gui.width 	= 400;
//	gui.close();
}

export { initGUI as MENU};



