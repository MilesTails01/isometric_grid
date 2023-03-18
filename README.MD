# Isometric Grid



```
const { vec2, mat2 } 	= require('gl-matrix');
const point 			= vec2.fromValues(0, 0);	//	x * w, y * h
const angle 			= Math.PI / 4;				//	45 deg
const scaleX 			= 1;
const scaleY 			= 0.5;
const rotationMatrix 	= mat2.create();
const scalingMatrix 	= mat2.create();

mat2.rotate(rotationMatrix, rotationMatrix, angle			);
mat2.scale (scalingMatrix , scalingMatrix , [scaleX, scaleY]);

vec2.transformMat2(point, point, rotationMatrix);
vec2.transformMat2(point, point, scalingMatrix);
```