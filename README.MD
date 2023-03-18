# Isometric Grid

https://github.com/MilesTails01/isometric_grid

## Demo

https://fenixfox-studios.com/content/isometric_grid/

In order to put the WFC project to use I want to use an isometric grid that I can combine with the wfc and marching cube algorithm in order to procedually generate an isometric little cosmos. I plan to make a little project that has an "aquarium" feel to it.


| ![729de7bdc9e120297b9451ca34b89f7d](https://user-images.githubusercontent.com/83541965/226109847-559877fe-95b0-4fee-bc5f-25c1a4b45d71.gif) | ![4e5f417b02479174beefadac571b706d](https://user-images.githubusercontent.com/83541965/226110132-49d0b404-6468-4f00-af2e-9fd95fb8a690.gif) |
| ---- | ---- |

| ![image](https://user-images.githubusercontent.com/83541965/226106171-620b2a89-c901-424c-975a-acf1b2b4624d.png) | |
| ---- | ---- |


I originally planned to use 2x2 rotation and scale matrix. But the float precision is broken.

```
const { vec2, mat2 } 	= require('gl-matrix');
const point 		= vec2.fromValues(x * w, y * h);
const angle 		= Math.PI / 4;
const scaleX 		= 1;
const scaleY 		= 0.5;
const rotationMatrix 	= mat2.create();
const scalingMatrix 	= mat2.create();

mat2.rotate(rotationMatrix, rotationMatrix, angle			);
mat2.scale (scalingMatrix , scalingMatrix , [scaleX, scaleY]);

vec2.transformMat2(point, point, rotationMatrix);
vec2.transformMat2(point, point, scalingMatrix);
```
