import { Color, NoBlending } from 'three';
import { MaterialBase } from '../MaterialBase.js';

export class GradientMapMaterial extends MaterialBase {

	constructor( parameters ) {

		super( {

			uniforms: {

				map: { value: null },

				minColor: { value: new Color( 0 ) },
				minValue: { value: 0 },

				maxColor: { value: new Color( 0xffffff ) },
				maxValue: { value: 10 },

			},

			blending: NoBlending,

			vertexShader: /* glsl */`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,

			fragmentShader: /* glsl */`

				uniform sampler2D map;
				uniform vec3 minColor;
				uniform float minValue;
				uniform vec3 maxColor;
				uniform float maxValue;

				varying vec2 vUv;

				void main() {

					float value = texture( map, vUv ).r;
					float t = smoothstep( minValue, maxValue, value );

					gl_FragColor.rgb = vec3( mix( minColor, maxColor, t ) )x``;
					gl_FragColor.a = 1.0;

					#include <encodings_fragment>

				}`

		} );

		this.setValues( parameters );

	}

}
