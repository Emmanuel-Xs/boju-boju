const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./market-BeMUZQMs.js","./startng-lzxCsALU.js","./rolldown-runtime-DK3Fl9T5.js","./ankara-hZDBFgyA.js","./classroom-D4hwMM-Q.js"])))=>i.map(i=>d[i]);
import{t as e}from"./rolldown-runtime-DK3Fl9T5.js";import{$n as t,A as n,An as r,At as i,B as a,Bn as o,Bt as s,C as c,Cr as l,Ct as u,D as d,Dn as f,Dr as p,Dt as m,E as h,Er as g,Et as _,F as v,Fn as y,Ft as b,G as x,Gn as S,H as C,Hn as w,Ht as T,I as E,It as D,J as O,Jn as k,Kn as A,Kt as ee,L as j,Lt as te,M,Mn as N,Mt as ne,N as P,Nn as re,Nt as F,O as ie,On as I,Or as L,Ot as ae,P as oe,Pn as R,Pt as se,Q as ce,Qn as le,R as z,Rt as B,S as ue,Sr as V,St as H,T as de,Tr as fe,Tt as pe,U as me,Un as he,Ut as ge,V as _e,Vn as ve,Vt as ye,W as be,Wt as U,X as xe,Xn as Se,Xt as Ce,Y as W,Yn as we,Z as Te,Zn as Ee,Zt as De,_ as G,_r as Oe,_t as ke,a as K,at as q,br as Ae,bt as je,c as Me,cr as J,ct as Ne,d as Pe,dr as Fe,dt as Ie,er as Le,et as Re,fr as ze,ft as Be,g as Ve,gr as He,gt as Ue,h as We,hr as Ge,ht as Ke,i as qe,ir as Je,it as Ye,j as Xe,jt as Ze,k as Qe,kn as $e,kr as et,kt as tt,l as nt,lr as rt,lt as it,m as at,mr as ot,mt as st,n as ct,nr as lt,nt as ut,o as dt,or as ft,ot as pt,p as mt,pr as Y,pt as ht,q as gt,qn as _t,rr as vt,rt as yt,s as bt,st as xt,t as St,tr as Ct,tt as wt,u as Tt,ur as Et,ut as Dt,v as Ot,vr as kt,vt as At,w as jt,wr as Mt,wt as Nt,x as Pt,xr as Ft,xt as It,y as Lt,yr as Rt,yt as zt,z as Bt,zt as Vt}from"./startng-lzxCsALU.js";import{t as Ht}from"./index-C-TGy3oA.js";function Ut(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Wt(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Gt={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},X={common:{diffuse:{value:new c(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new zt}},envmap:{envMap:{value:null},envMapRotation:{value:new zt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new zt},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new c(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Y},probesMax:{value:new Y},probesResolution:{value:new Y}},points:{diffuse:{value:new c(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0},uvTransform:{value:new zt}},sprite:{diffuse:{value:new c(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}}},Kt={basic:{uniforms:g([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:g([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new c(0)},envMapIntensity:{value:1}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:g([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new c(0)},specular:{value:new c(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:g([X.common,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.roughnessmap,X.metalnessmap,X.fog,X.lights,{emissive:{value:new c(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:g([X.common,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.gradientmap,X.fog,X.lights,{emissive:{value:new c(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:g([X.common,X.bumpmap,X.normalmap,X.displacementmap,X.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:g([X.points,X.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:g([X.common,X.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:g([X.common,X.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:g([X.common,X.bumpmap,X.normalmap,X.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:g([X.sprite,X.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new zt}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distance:{uniforms:g([X.common,X.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distance_vert,fragmentShader:Gt.distance_frag},shadow:{uniforms:g([X.lights,X.fog,{color:{value:new c(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};Kt.physical={uniforms:g([Kt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new zt},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new zt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new zt},sheen:{value:0},sheenColor:{value:new c(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new zt},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new zt},attenuationDistance:{value:0},attenuationColor:{value:new c(0)},specularColor:{value:new c(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new zt},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new zt}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};var qt={r:0,b:0,g:0},Jt=new je,Yt=new zt;Yt.set(-1,0,0,0,1,0,0,0,1);function Xt(e,t,n,r,i,a){let o=new c(0),s=i===!0?0:1,l,u,d=null,f=0,p=null;function m(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function h(t){let r=!1,i=m(t);i===null?_(o,s):i&&i.isColor&&(_(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function g(t,n){let i=m(n);i&&(i.isCubeTexture||i.mapping===306)?(u===void 0&&(u=new It(new G(1,1,1),new he({name:`BackgroundCubeMaterial`,uniforms:Rt(Kt.backgroundCube.uniforms),vertexShader:Kt.backgroundCube.vertexShader,fragmentShader:Kt.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute(`normal`),u.geometry.deleteAttribute(`uv`),u.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=i,u.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Jt.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(Yt),u.material.toneMapped=jt.getTransfer(i.colorSpace)!==ve,(d!==i||f!==i.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,d=i,f=i.version,p=e.toneMapping),u.layers.enableAll(),t.unshift(u,u.geometry,u.material,0,0,null)):i&&i.isTexture&&(l===void 0&&(l=new It(new B(2,2),new he({name:`BackgroundMaterial`,uniforms:Rt(Kt.background.uniforms),vertexShader:Kt.background.vertexShader,fragmentShader:Kt.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=i,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.toneMapped=jt.getTransfer(i.colorSpace)!==ve,i.matrixAutoUpdate===!0&&i.updateMatrix(),l.material.uniforms.uvTransform.value.copy(i.matrix),(d!==i||f!==i.version||p!==e.toneMapping)&&(l.material.needsUpdate=!0,d=i,f=i.version,p=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null))}function _(t,r){t.getRGB(qt,Mt(e)),n.buffers.color.setClear(qt.r,qt.g,qt.b,r,a)}function v(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,_(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,_(o,s)},render:h,addToRenderList:g,dispose:v}}function Zt(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Qt(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function $t(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(L(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&L(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function en(e){let t=this,n=null,r=0,i=!1,a=!1,o=new te,s=new zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var tn=4,nn=6,rn=20,an=256,on=new b,sn=new c,cn=null,ln=0,un=0,dn=!1,fn=new Y,pn=new Y,mn=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=fn}=i;cn=this._renderer.getRenderTarget(),ln=this._renderer.getActiveCubeFace(),un=this._renderer.getActiveMipmapLevel(),dn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xn(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bn(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(cn,ln,un),this._renderer.xr.enabled=dn,e.scissorTest=!1,_n(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),cn=this._renderer.getRenderTarget(),ln=this._renderer.getActiveCubeFace(),un=this._renderer.getActiveMipmapLevel(),dn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Dt,minFilter:Dt,generateMipmaps:!1,type:O,format:Ce,colorSpace:ht,depthBuffer:!1},r=gn(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gn(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=hn(r)),this._blurMaterial=yn(r,e,t),this._ggxMaterial=vn(r,e,t)}return r}_compileMaterial(e){let t=new It(new Lt,e);this._renderer.compile(t,on)}_sceneToCubeUV(e,t,n,r,i){let a=new D(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(sn),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new It(new G,new H({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(sn),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;_n(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=xn()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bn());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;_n(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,on)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-tn?n-d+tn:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,_n(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,on),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,_n(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,on)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];_n(t,3*l*(r>this._lodMax-tn?r-this._lodMax+tn:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,on)}};function hn(e){let t=[],n=[],r=e,i=e-tn+1+nn;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?pn.set(1,r,n):e===1?pn.set(-n,1,-r):e===2?pn.set(-n,r,1):e===3?pn.set(-1,r,-n):e===4?pn.set(-n,-1,r):pn.set(n,r,-1),pn.toArray(l,(e*6+t)*3)}}let u=new Lt;u.setAttribute(`position`,new Ot(c,3)),u.setAttribute(`outputDirection`,new Ot(l,3)),n.push(new It(u,null)),r>tn&&r--}return{lodMeshes:n,sizeLods:t}}function gn(e,t,n){let r=new Oe(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function _n(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function vn(e,t,n){return new he({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:an,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Sn(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function yn(e,t,n){return new he({name:`SphericalGaussianBlur`,defines:{SAMPLES:rn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Sn(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function bn(){return new he({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Sn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function xn(){return new he({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Sn(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Cn=class extends Oe{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new ie(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new G(5,5,5),i=new he({name:`CubemapFromEquirect`,uniforms:Rt(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new It(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=Dt),new h(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function wn(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Cn(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new mn(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new mn(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Tn(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&et(`WebGLRenderer: `+e+` extension not supported.`),t}}}function En(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?lt:Ct)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Dn(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function On(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:V(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function kn(e,t,n){let r=new WeakMap,i=new ot;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Xe(h,p,m,u);g.type=me,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new ze(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function An(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var jn={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Mn(e,t,n,r,i,a){let o=new Oe(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Lt;l.setAttribute(`position`,new C([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new C([0,2,0,0,2,0],2));let u=new $e({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new It(l,u),f=new b(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new Oe(t,n,{type:O,depthBuffer:!1,stencilBuffer:!1}),c=new Oe(t,n,{type:O,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},jt.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=jn[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Nn=new le,Pn=new v(1,1),Fn=new Xe,In=new n,Ln=new ie,Rn=[],zn=[],Bn=new Float32Array(16),Vn=new Float32Array(9),Hn=new Float32Array(4);function Un(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Rn[i];if(a===void 0&&(a=new Float32Array(i),Rn[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Wn(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Gn(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Kn(e,t){let n=zn[t];n===void 0&&(n=new Int32Array(t),zn[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function qn(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Jn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Wn(n,t))return;e.uniform2fv(this.addr,t),Gn(n,t)}}function Yn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Wn(n,t))return;e.uniform3fv(this.addr,t),Gn(n,t)}}function Xn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Wn(n,t))return;e.uniform4fv(this.addr,t),Gn(n,t)}}function Zn(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Wn(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Gn(n,t)}else{if(Wn(n,r))return;Hn.set(r),e.uniformMatrix2fv(this.addr,!1,Hn),Gn(n,r)}}function Qn(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Wn(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Gn(n,t)}else{if(Wn(n,r))return;Vn.set(r),e.uniformMatrix3fv(this.addr,!1,Vn),Gn(n,r)}}function $n(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Wn(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Gn(n,t)}else{if(Wn(n,r))return;Bn.set(r),e.uniformMatrix4fv(this.addr,!1,Bn),Gn(n,r)}}function er(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function tr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Wn(n,t))return;e.uniform2iv(this.addr,t),Gn(n,t)}}function nr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Wn(n,t))return;e.uniform3iv(this.addr,t),Gn(n,t)}}function rr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Wn(n,t))return;e.uniform4iv(this.addr,t),Gn(n,t)}}function ir(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function ar(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Wn(n,t))return;e.uniform2uiv(this.addr,t),Gn(n,t)}}function or(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Wn(n,t))return;e.uniform3uiv(this.addr,t),Gn(n,t)}}function sr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Wn(n,t))return;e.uniform4uiv(this.addr,t),Gn(n,t)}}function cr(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Pn.compareFunction=n.isReversedDepthBuffer()?518:515,a=Pn):a=Nn,n.setTexture2D(t||a,i)}function lr(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||In,i)}function ur(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Ln,i)}function dr(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Fn,i)}function fr(e){switch(e){case 5126:return qn;case 35664:return Jn;case 35665:return Yn;case 35666:return Xn;case 35674:return Zn;case 35675:return Qn;case 35676:return $n;case 5124:case 35670:return er;case 35667:case 35671:return tr;case 35668:case 35672:return nr;case 35669:case 35673:return rr;case 5125:return ir;case 36294:return ar;case 36295:return or;case 36296:return sr;case 35678:case 36198:case 36298:case 36306:case 35682:return cr;case 35679:case 36299:case 36307:return lr;case 35680:case 36300:case 36308:case 36293:return ur;case 36289:case 36303:case 36311:case 36292:return dr}}function pr(e,t){e.uniform1fv(this.addr,t)}function mr(e,t){let n=Un(t,this.size,2);e.uniform2fv(this.addr,n)}function hr(e,t){let n=Un(t,this.size,3);e.uniform3fv(this.addr,n)}function gr(e,t){let n=Un(t,this.size,4);e.uniform4fv(this.addr,n)}function _r(e,t){let n=Un(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function vr(e,t){let n=Un(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function yr(e,t){let n=Un(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function br(e,t){e.uniform1iv(this.addr,t)}function xr(e,t){e.uniform2iv(this.addr,t)}function Sr(e,t){e.uniform3iv(this.addr,t)}function Cr(e,t){e.uniform4iv(this.addr,t)}function wr(e,t){e.uniform1uiv(this.addr,t)}function Tr(e,t){e.uniform2uiv(this.addr,t)}function Er(e,t){e.uniform3uiv(this.addr,t)}function Dr(e,t){e.uniform4uiv(this.addr,t)}function Or(e,t,n){let r=this.cache,i=t.length,a=Kn(n,i);Wn(r,a)||(e.uniform1iv(this.addr,a),Gn(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Pn:Nn;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function kr(e,t,n){let r=this.cache,i=t.length,a=Kn(n,i);Wn(r,a)||(e.uniform1iv(this.addr,a),Gn(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||In,a[e])}function Ar(e,t,n){let r=this.cache,i=t.length,a=Kn(n,i);Wn(r,a)||(e.uniform1iv(this.addr,a),Gn(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Ln,a[e])}function jr(e,t,n){let r=this.cache,i=t.length,a=Kn(n,i);Wn(r,a)||(e.uniform1iv(this.addr,a),Gn(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Fn,a[e])}function Mr(e){switch(e){case 5126:return pr;case 35664:return mr;case 35665:return hr;case 35666:return gr;case 35674:return _r;case 35675:return vr;case 35676:return yr;case 5124:case 35670:return br;case 35667:case 35671:return xr;case 35668:case 35672:return Sr;case 35669:case 35673:return Cr;case 5125:return wr;case 36294:return Tr;case 36295:return Er;case 36296:return Dr;case 35678:case 36198:case 36298:case 36306:case 35682:return Or;case 35679:case 36299:case 36307:return kr;case 35680:case 36300:case 36308:case 36293:return Ar;case 36289:case 36303:case 36311:case 36292:return jr}}var Nr=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=fr(t.type)}},Pr=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Mr(t.type)}},Fr=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Ir=/(\w+)(\])?(\[|\.)?/g;function Lr(e,t){e.seq.push(t),e.map[t.id]=t}function Rr(e,t,n){let r=e.name,i=r.length;for(Ir.lastIndex=0;;){let a=Ir.exec(r),o=Ir.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Lr(n,l===void 0?new Nr(s,e,t):new Pr(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Fr(s),Lr(n,e)),n=e}}}var zr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Rr(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Br(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Vr=37297,Hr=0;function Ur(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Wr=new zt;function Gr(e){jt._getMatrix(Wr,jt.workingColorSpace,e);let t=`mat3( ${Wr.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(e)){case st:return[t,`LinearTransferOETF`];case ve:return[t,`sRGBTransferOETF`];default:return L(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Kr(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Ur(e.getShaderSource(t),r)}return i}function qr(e,t){let n=Gr(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Jr={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Yr(e,t){let n=Jr[t];return n===void 0?(L(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Xr=new Y;function Zr(){return jt.getLuminanceCoefficients(Xr),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Xr.x.toFixed(4)}, ${Xr.y.toFixed(4)}, ${Xr.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Qr(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(ti).join(`
`)}function $r(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function ei(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function ti(e){return e!==``}function ni(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ri(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var ii=/^[ \t]*#include +<([\w\d./]+)>/gm;function ai(e){return e.replace(ii,si)}var oi=new Map;function si(e,t){let n=Gt[t];if(n===void 0){let e=oi.get(t);if(e!==void 0)n=Gt[e],L(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return ai(n)}var ci=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function li(e){return e.replace(ci,ui)}function ui(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function di(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var fi={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function pi(e){return fi[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var mi={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function hi(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:mi[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var gi={302:`ENVMAP_MODE_REFRACTION`};function _i(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:gi[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var vi={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function yi(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:vi[e.combine]||`ENVMAP_BLENDING_NONE`}function bi(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function xi(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=pi(n),l=hi(n),u=_i(n),d=yi(n),f=bi(n),p=Qr(n),m=$r(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(ti).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(ti).join(`
`),_.length>0&&(_+=`
`)):(g=[di(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(ti).join(`
`),_=[di(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Gt.tonemapping_pars_fragment,n.toneMapping===0?``:Yr(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Gt.colorspace_pars_fragment,qr(`linearToOutputTexel`,n.outputColorSpace),Zr(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(ti).join(`
`)),o=ai(o),o=ni(o,n),o=ri(o,n),s=ai(s),s=ni(s,n),s=ri(s,n),o=li(o),s=li(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Br(i,i.VERTEX_SHADER,y),S=Br(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Kr(i,x,`vertex`),n=Kr(i,S,`fragment`);V(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):L(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new zr(i,h),T=ei(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Vr)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Hr++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Si=0,Ci=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new wi(e),t.set(e,n)),n}},wi=class{constructor(e){this.id=Si++,this.code=e,this.usedTimes=0}};function Ti(e){return e===1030||e===37490||e===36285}function Ei(e,t,n,r,i,a){let o=new q,s=new Ci,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&L(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=Kt[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let ee=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),te=h.isInstancedMesh===!0,M=h.isBatchedMesh===!0,N=!!i.map,ne=!!i.matcap,P=!!x,re=!!i.aoMap,F=!!i.lightMap,ie=!!i.bumpMap&&i.wireframe===!1,I=!!i.normalMap,ae=!!i.displacementMap,oe=!!i.emissiveMap,R=!!i.metalnessMap,se=!!i.roughnessMap,ce=i.anisotropy>0,le=i.clearcoat>0,z=i.dispersion>0,B=i.retroreflectivity>0,ue=i.iridescence>0,V=i.sheen>0,H=i.transmission>0,de=ce&&!!i.anisotropyMap,fe=le&&!!i.clearcoatMap,pe=le&&!!i.clearcoatNormalMap,me=le&&!!i.clearcoatRoughnessMap,he=ue&&!!i.iridescenceMap,ge=ue&&!!i.iridescenceThicknessMap,_e=V&&!!i.sheenColorMap,ve=V&&!!i.sheenRoughnessMap,ye=!!i.specularMap,be=!!i.specularColorMap,U=!!i.specularIntensityMap,xe=H&&!!i.transmissionMap,Se=H&&!!i.thicknessMap,Ce=!!i.gradientMap,W=!!i.alphaMap,we=i.alphaTest>0,Te=!!i.alphaHash,Ee=!!i.extensions,De=0;i.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(De=e.toneMapping);let G={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:M,batchingColor:M&&h._colorsTexture!==null,instancing:te,instancingColor:te&&h.instanceColor!==null,instancingMorph:te&&h.morphTexture!==null,outputColorSpace:ee===null?e.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:jt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:N,matcap:ne,envMap:P,envMapMode:P&&x.mapping,envMapCubeUVHeight:S,aoMap:re,lightMap:F,bumpMap:ie,normalMap:I,displacementMap:ae,emissiveMap:oe,normalMapObjectSpace:I&&i.normalMapType===1,normalMapTangentSpace:I&&i.normalMapType===0,packedNormalMap:I&&i.normalMapType===0&&Ti(i.normalMap.format),metalnessMap:R,roughnessMap:se,anisotropy:ce,anisotropyMap:de,clearcoat:le,clearcoatMap:fe,clearcoatNormalMap:pe,clearcoatRoughnessMap:me,dispersion:z,retroreflection:B,iridescence:ue,iridescenceMap:he,iridescenceThicknessMap:ge,sheen:V,sheenColorMap:_e,sheenRoughnessMap:ve,specularMap:ye,specularColorMap:be,specularIntensityMap:U,transmission:H,transmissionMap:xe,thicknessMap:Se,gradientMap:Ce,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:W,alphaTest:we,alphaHash:Te,combine:i.combine,mapUv:N&&m(i.map.channel),aoMapUv:re&&m(i.aoMap.channel),lightMapUv:F&&m(i.lightMap.channel),bumpMapUv:ie&&m(i.bumpMap.channel),normalMapUv:I&&m(i.normalMap.channel),displacementMapUv:ae&&m(i.displacementMap.channel),emissiveMapUv:oe&&m(i.emissiveMap.channel),metalnessMapUv:R&&m(i.metalnessMap.channel),roughnessMapUv:se&&m(i.roughnessMap.channel),anisotropyMapUv:de&&m(i.anisotropyMap.channel),clearcoatMapUv:fe&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:pe&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:me&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:he&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:ve&&m(i.sheenRoughnessMap.channel),specularMapUv:ye&&m(i.specularMap.channel),specularColorMapUv:be&&m(i.specularColorMap.channel),specularIntensityMapUv:U&&m(i.specularIntensityMap.channel),transmissionMapUv:xe&&m(i.transmissionMap.channel),thicknessMapUv:Se&&m(i.thicknessMap.channel),alphaMapUv:W&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(I||ce),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(N||W),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&I===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:De,decodeVideoTexture:N&&i.map.isVideoTexture===!0&&jt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:oe&&i.emissiveMap.isVideoTexture===!0&&jt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Ee&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ee&&i.extensions.multiDraw===!0||M)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return G.vertexUv1s=c.has(1),G.vertexUv2s=c.has(2),G.vertexUv3s=c.has(3),c.clear(),G}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Kt[t];n=vt.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new xi(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Di(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Oi(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function ki(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Ai(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Oi),r.length>1&&r.sort(t||ki),i.length>1&&i.sort(t||ki)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function ji(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Ai,e.set(t,[i])):n>=r.length?(i=new Ai,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Mi(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new Y,color:new c};break;case`SpotLight`:n={position:new Y,direction:new Y,color:new c,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new Y,color:new c,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new Y,skyColor:new c,groundColor:new c};break;case`RectAreaLight`:n={color:new c,position:new Y,halfWidth:new Y,halfHeight:new Y}}return e[t.id]=n,n}}}function Ni(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Pi=0;function Fi(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Ii(e){let t=new Mi,n=Ni(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new Y);let i=new Y,a=new je,o=new je;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(Fi);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=X.LTC_FLOAT_1,r.rectAreaLTC2=X.LTC_FLOAT_2):(r.rectAreaLTC1=X.LTC_HALF_1,r.rectAreaLTC2=X.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Pi++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Li(e){let t=new Ii(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Ri(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Li(e),t.set(n,[a])):r>=i.length?(a=new Li(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var zi=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Bi=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Vi=[new Y(1,0,0),new Y(-1,0,0),new Y(0,1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1)],Hi=[new Y(0,-1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1),new Y(0,-1,0),new Y(0,-1,0)],Ui=new je,Wi=new Y,Gi=new Y;function Ki(e,t,n){let r=new x,i=new ze,a=new ze,o=new ot,s=new u,c=new Nt,l={},p=n.maxTextureSize,m={0:1,1:0,2:2},h=new he({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:zi,fragmentShader:Bi}),g=h.clone();g.defines.HORIZONTAL_PASS=1;let _=new Lt;_.setAttribute(`position`,new Ot(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new It(_,h),b=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,s){if(b.enabled===!1||b.autoUpdate===!1&&b.needsUpdate===!1||t.length===0)return;this.type===2&&(L(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),m=e.state;m.setBlending(0),m.buffers.depth.getReversed()===!0?m.buffers.color.setClear(0,0,0,0):m.buffers.color.setClear(1,1,1,1),m.buffers.depth.setTest(!0),m.setScissorTest(!1);let h=S!==this.type;h&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],u=l.shadow;if(u===void 0){L(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(u.autoUpdate===!1&&u.needsUpdate===!1)continue;i.copy(u.mapSize);let g=u.getFrameExtents();i.multiply(g),a.copy(u.mapSize),(i.x>p||i.y>p)&&(i.x>p&&(a.x=Math.floor(p/g.x),i.x=a.x*g.x,u.mapSize.x=a.x),i.y>p&&(a.y=Math.floor(p/g.y),i.y=a.y*g.y,u.mapSize.y=a.y));let _=e.state.buffers.depth.getReversed();if(u.camera._reversedDepth=_,u.map===null||h===!0){if(u.map!==null&&(u.map.depthTexture!==null&&(u.map.depthTexture.dispose(),u.map.depthTexture=null),u.map.dispose()),this.type===3){if(l.isPointLight){L(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}u.map=new Oe(i.x,i.y,{format:f,type:O,minFilter:Dt,magFilter:Dt,generateMipmaps:!1}),u.map.texture.name=l.name+`.shadowMap`,u.map.depthTexture=new v(i.x,i.y,me),u.map.depthTexture.name=l.name+`.shadowMapDepth`,u.map.depthTexture.format=P,u.map.depthTexture.compareFunction=null,u.map.depthTexture.minFilter=tt,u.map.depthTexture.magFilter=tt}else l.isPointLight?(u.map=new Cn(i.x),u.map.depthTexture=new d(i.x,J)):(u.map=new Oe(i.x,i.y),u.map.depthTexture=new v(i.x,i.y,J)),u.map.depthTexture.name=l.name+`.shadowMap`,u.map.depthTexture.format=P,this.type===1?(u.map.depthTexture.compareFunction=_?518:515,u.map.depthTexture.minFilter=Dt,u.map.depthTexture.magFilter=Dt):(u.map.depthTexture.compareFunction=null,u.map.depthTexture.minFilter=tt,u.map.depthTexture.magFilter=tt);u.camera.updateProjectionMatrix()}u.map.isWebGLCubeRenderTarget!==!0&&(u.map.width!==i.x||u.map.height!==i.y)&&u.map.setSize(i.x,i.y);let y=u.map.isWebGLCubeRenderTarget?6:u.getViewportCount();l.isPointLight!==!0&&u.updateMatrices(l,s);for(let t=0;t<y;t++){let i=u.getCamera(t);if(l.isPointLight){let e=u.camera,n=u.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Wi.setFromMatrixPosition(l.matrixWorld),e.position.copy(Wi),Gi.copy(e.position),Gi.add(Vi[t]),e.up.copy(Hi[t]),e.lookAt(Gi),e.updateMatrixWorld(),n.makeTranslation(-Wi.x,-Wi.y,-Wi.z),Ui.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),u._frustum.setFromProjectionMatrix(Ui,e.coordinateSystem,e.reversedDepth)}if(u.map.isWebGLCubeRenderTarget)e.setRenderTarget(u.map,t),e.clear();else{t===0&&(e.setRenderTarget(u.map),e.clear());let n=u.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),m.viewport(o)}r=u.getFrustum(t),T(n,s,i,l,this.type)}u.isPointLightShadow!==!0&&this.type===3&&C(u,s),u.needsUpdate=!1}S=this.type,b.needsUpdate=!1,e.setRenderTarget(c,l,u)};function C(n,r){let a=t.update(y);h.defines.VSM_SAMPLES!==n.blurSamples&&(h.defines.VSM_SAMPLES=n.blurSamples,g.defines.VSM_SAMPLES=n.blurSamples,h.needsUpdate=!0,g.needsUpdate=!0),n.mapPass===null?n.mapPass=new Oe(i.x,i.y,{format:f,type:O}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),h.uniforms.shadow_pass.value=n.map.depthTexture,h.uniforms.resolution.value.set(n.map.width,n.map.height),h.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,h,y,null),g.uniforms.shadow_pass.value=n.mapPass.texture,g.uniforms.resolution.value.set(n.map.width,n.map.height),g.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,g,y,null)}function w(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,E)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?m[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function T(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=w(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=w(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)T(c[e],i,a,o,s)}function E(e){e.target.removeEventListener(`dispose`,E);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function qi(e,t){function n(){let t=!1,n=new ot,r=null,i=new ot(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?se(e.DEPTH_TEST):ce(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=R[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?se(e.STENCIL_TEST):ce(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,l=new WeakMap,u=new WeakMap,d={},f={},p={},m=new WeakMap,h=[],g=null,_=!1,v=null,y=null,b=null,x=null,S=null,C=null,w=null,T=new c(0,0,0),E=0,D=!1,O=null,k=null,A=null,ee=null,j=null,te=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),M=!1,N=0,ne=e.getParameter(e.VERSION);ne.indexOf(`WebGL`)===-1?ne.indexOf(`OpenGL ES`)!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),M=N>=2):(N=parseFloat(/^WebGL (\d)/.exec(ne)[1]),M=N>=1);let P=null,re={},F=e.getParameter(e.SCISSOR_BOX),ie=e.getParameter(e.VIEWPORT),I=new ot().fromArray(F),L=new ot().fromArray(ie);function ae(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let oe={};oe[e.TEXTURE_2D]=ae(e.TEXTURE_2D,e.TEXTURE_2D,1),oe[e.TEXTURE_CUBE_MAP]=ae(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[e.TEXTURE_2D_ARRAY]=ae(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),oe[e.TEXTURE_3D]=ae(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),se(e.DEPTH_TEST),o.setFunc(3),pe(!1),me(1),se(e.CULL_FACE),de(0);function se(t){d[t]!==!0&&(e.enable(t),d[t]=!0)}function ce(t){d[t]!==!1&&(e.disable(t),d[t]=!1)}function le(t,n){return p[t]!==n&&(e.bindFramebuffer(t,n),p[t]=n,t===e.DRAW_FRAMEBUFFER&&(p[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(p[e.DRAW_FRAMEBUFFER]=n),!0)}function z(t,n){let r=h,i=!1;if(t){r=m.get(n),r===void 0&&(r=[],m.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function B(t){return g!==t&&(e.useProgram(t),g=t,!0)}let ue={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};ue[103]=e.MIN,ue[104]=e.MAX;let H={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function de(t,n,r,i,a,o,s,c,l,u){if(t===0)_===!0&&(ce(e.BLEND),_=!1);else if(_===!1&&(se(e.BLEND),_=!0),t!==5){if(t!==v||u!==D){if((y!==100||S!==100)&&(e.blendEquation(e.FUNC_ADD),y=100,S=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:V(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:V(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:V(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:V(`WebGLState: Invalid blending: `,t)}b=null,x=null,C=null,w=null,T.set(0,0,0),E=0,v=t,D=u}}else a||=n,o||=r,s||=i,(n!==y||a!==S)&&(e.blendEquationSeparate(ue[n],ue[a]),y=n,S=a),(r!==b||i!==x||o!==C||s!==w)&&(e.blendFuncSeparate(H[r],H[i],H[o],H[s]),b=r,x=i,C=o,w=s),(c.equals(T)===!1||l!==E)&&(e.blendColor(c.r,c.g,c.b,l),T.copy(c),E=l),v=t,D=!1}function fe(t,n){t.side===2?ce(e.CULL_FACE):se(e.CULL_FACE);let r=t.side===1;n&&(r=!r),pe(r),t.blending===1&&t.transparent===!1?de(0):de(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ge(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?se(e.SAMPLE_ALPHA_TO_COVERAGE):ce(e.SAMPLE_ALPHA_TO_COVERAGE)}function pe(t){O!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),O=t)}function me(t){t===0?ce(e.CULL_FACE):(se(e.CULL_FACE),t!==k&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),k=t}function he(t){t!==A&&(M&&e.lineWidth(t),A=t)}function ge(t,n,r){t?(se(e.POLYGON_OFFSET_FILL),(ee!==n||j!==r)&&(ee=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):ce(e.POLYGON_OFFSET_FILL)}function _e(t){t?se(e.SCISSOR_TEST):ce(e.SCISSOR_TEST)}function ve(t){t===void 0&&(t=e.TEXTURE0+te-1),P!==t&&(e.activeTexture(t),P=t)}function ye(t,n,r){r===void 0&&(r=P===null?e.TEXTURE0+te-1:P);let i=re[r];i===void 0&&(i={type:void 0,texture:void 0},re[r]=i),(i.type!==t||i.texture!==n)&&(P!==r&&(e.activeTexture(r),P=r),e.bindTexture(t,n||oe[t]),i.type=t,i.texture=n)}function be(){let t=re[P];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function U(){try{e.compressedTexImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function xe(){try{e.compressedTexImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Se(){try{e.texSubImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Ce(){try{e.texSubImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function W(){try{e.compressedTexSubImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function we(){try{e.compressedTexSubImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Te(){try{e.texStorage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Ee(){try{e.texStorage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function De(){try{e.texImage2D(...arguments)}catch(e){V(`WebGLState:`,e)}}function G(){try{e.texImage3D(...arguments)}catch(e){V(`WebGLState:`,e)}}function Oe(t){return f[t]===void 0?e.getParameter(t):f[t]}function ke(t,n){f[t]!==n&&(e.pixelStorei(t,n),f[t]=n)}function K(t){I.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),I.copy(t))}function q(t){L.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),L.copy(t))}function Ae(t,n){let r=u.get(n);r===void 0&&(r=new WeakMap,u.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function je(t,n){let r=u.get(n).get(t);l.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),l.set(n,r))}function Me(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),d={},f={},P=null,re={},p={},m=new WeakMap,h=[],g=null,_=!1,v=null,y=null,b=null,x=null,S=null,C=null,w=null,T=new c(0,0,0),E=0,D=!1,O=null,k=null,A=null,ee=null,j=null,I.set(0,0,e.canvas.width,e.canvas.height),L.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:se,disable:ce,bindFramebuffer:le,drawBuffers:z,useProgram:B,setBlending:de,setMaterial:fe,setFlipSided:pe,setCullFace:me,setLineWidth:he,setPolygonOffset:ge,setScissorTest:_e,activeTexture:ve,bindTexture:ye,unbindTexture:be,compressedTexImage2D:U,compressedTexImage3D:xe,texImage2D:De,texImage3D:G,pixelStorei:ke,getParameter:Oe,updateUBOMapping:Ae,uniformBlockBinding:je,texStorage2D:Te,texStorage3D:Ee,texSubImage2D:Se,texSubImage3D:Ce,compressedTexSubImage2D:W,compressedTexSubImage3D:we,scissor:K,viewport:q,reset:Me}}function Ji(e,t,n,r,a,o,s){let c=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,u=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),d=new ze,f=new WeakMap,p=new Set,m,h=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function _(e,t){return g?new OffscreenCanvas(e,t):Ft(`canvas`)}function v(e,t,n){let r=1,i=we(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);m===void 0&&(m=_(n,a));let o=t?_(n,a):m;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),L(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&L(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function y(e){return e.generateMipmaps}function b(t){e.generateMipmap(t)}function x(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function S(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];L(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||L(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?st:jt.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function C(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,L(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function w(e,t){return y(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function T(e){let t=e.target;t.removeEventListener(`dispose`,T),D(t),t.isVideoTexture&&f.delete(t),t.isHTMLTexture&&p.delete(t)}function E(e){let t=e.target;t.removeEventListener(`dispose`,E),k(t)}function D(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=h.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&O(e),Object.keys(i).length===0&&h.delete(n)}r.remove(e)}function O(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=h.get(i);delete a[n.__cacheKey],s.memory.textures--}function k(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),s.memory.textures--),r.remove(i[t])}r.remove(t)}let A=0;function ee(){A=0}function j(){return A}function te(e){A=e}function M(){let e=A;return e>=a.maxTextures&&L(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+a.maxTextures),A+=1,e}function N(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ne(t,i){let a=r.get(t);if(t.isVideoTexture&&Ce(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)L(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)L(`WebGLRenderer: Texture marked for update but image is incomplete`);else{H(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function P(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?H(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function F(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?H(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ie(t,i){let a=r.get(t);t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version?de(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let I={[re]:e.REPEAT,[ue]:e.CLAMP_TO_EDGE,[ae]:e.MIRRORED_REPEAT},R={[tt]:e.NEAREST,[Ze]:e.NEAREST_MIPMAP_NEAREST,[i]:e.NEAREST_MIPMAP_LINEAR,[Dt]:e.LINEAR,[Be]:e.LINEAR_MIPMAP_NEAREST,[Ie]:e.LINEAR_MIPMAP_LINEAR},se={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ce(n,i){if(i.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(i.magFilter===1006||i.magFilter===1007||i.magFilter===1005||i.magFilter===1008||i.minFilter===1006||i.minFilter===1007||i.minFilter===1005||i.minFilter===1008)&&L(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,I[i.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,I[i.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,I[i.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,R[i.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,R[i.minFilter]),i.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,se[i.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(i.magFilter===1003||i.minFilter!==1005&&i.minFilter!==1008||i.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(i.anisotropy>1||r.get(i).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(i.anisotropy,a.getMaxAnisotropy())),r.get(i).__currentAnisotropy=i.anisotropy}}}function le(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,T));let i=n.source,a=h.get(i);a===void 0&&(a={},h.set(i,a));let o=N(n);if(o!==t.__cacheKey){a[o]===void 0&&(a[o]={texture:e.createTexture(),usedTimes:0},s.memory.textures++,r=!0),a[o].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&O(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return r}function z(e,t,n){return Math.floor(Math.floor(e/n)/t)}function B(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=z(n.start,r.width,4),c=z(t.start,r.width,4);n.start<=i+1&&a===c&&z(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function H(t,i,s){let c=e.TEXTURE_2D;(i.isDataArrayTexture||i.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),i.isData3DTexture&&(c=e.TEXTURE_3D);let u=le(t,i),d=i.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(d);if(d.version!==f.__version||u===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&i.image instanceof ImageBitmap)){let t=jt.getPrimaries(jt.workingColorSpace),r=i.colorSpace===``?null:jt.getPrimaries(i.colorSpace),a=i.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,i.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,i.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,a)}n.pixelStorei(e.UNPACK_ALIGNMENT,i.unpackAlignment);let t=v(i.image,!1,a.maxTextureSize);t=W(i,t);let r=o.convert(i.format,i.colorSpace),m=o.convert(i.type),h=S(i.internalFormat,r,m,i.normalized,i.colorSpace,i.isVideoTexture);ce(c,i);let g,_=i.mipmaps,x=i.isVideoTexture!==!0,T=f.__version===void 0||u===!0,E=d.dataReady,D=w(i,t);if(i.isDepthTexture)h=C(i.format===oe,i.type),T&&(x?n.texStorage2D(e.TEXTURE_2D,1,h,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,h,t.width,t.height,0,r,m,null));else if(i.isDataTexture){if(_.length>0){x&&T&&n.texStorage2D(e.TEXTURE_2D,D,h,_[0].width,_[0].height);for(let t=0,i=_.length;t<i;t++)g=_[t],x?E&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,r,m,g.data):n.texImage2D(e.TEXTURE_2D,t,h,g.width,g.height,0,r,m,g.data);i.generateMipmaps=!1}else x?(T&&n.texStorage2D(e.TEXTURE_2D,D,h,t.width,t.height),E&&B(i,t,r,m)):n.texImage2D(e.TEXTURE_2D,0,h,t.width,t.height,0,r,m,t.data)}else if(i.isCompressedTexture){if(i.isCompressedArrayTexture){x&&T&&n.texStorage3D(e.TEXTURE_2D_ARRAY,D,h,_[0].width,_[0].height,t.depth);for(let a=0,o=_.length;a<o;a++)if(g=_[a],i.format!==1023){if(r!==null){if(x){if(E){if(i.layerUpdates.size>0){let t=l(g.width,g.height,i.format,i.type);for(let o of i.layerUpdates){let i=g.data.subarray(o*t/g.data.BYTES_PER_ELEMENT,(o+1)*t/g.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,a,0,0,o,g.width,g.height,1,r,i)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,a,0,0,0,g.width,g.height,t.depth,r,g.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,a,h,g.width,g.height,t.depth,0,g.data,0,0)}else L(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else x?E&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,a,0,0,0,g.width,g.height,t.depth,r,m,g.data):n.texImage3D(e.TEXTURE_2D_ARRAY,a,h,g.width,g.height,t.depth,0,r,m,g.data);i.layerUpdates.size>0&&i.clearLayerUpdates()}else{x&&T&&n.texStorage2D(e.TEXTURE_2D,D,h,_[0].width,_[0].height);for(let t=0,a=_.length;t<a;t++)g=_[t],i.format===1023?x?E&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,r,m,g.data):n.texImage2D(e.TEXTURE_2D,t,h,g.width,g.height,0,r,m,g.data):r===null?L(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):x?E&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,r,g.data):n.compressedTexImage2D(e.TEXTURE_2D,t,h,g.width,g.height,0,g.data)}}else if(i.isDataArrayTexture){if(x){if(T&&n.texStorage3D(e.TEXTURE_2D_ARRAY,D,h,t.width,t.height,t.depth),E){if(i.layerUpdates.size>0){let a=l(t.width,t.height,i.format,i.type);for(let o of i.layerUpdates){let i=t.data.subarray(o*a/t.data.BYTES_PER_ELEMENT,(o+1)*a/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,o,t.width,t.height,1,r,m,i)}i.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,m,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,h,t.width,t.height,t.depth,0,r,m,t.data)}else if(i.isData3DTexture)x?(T&&n.texStorage3D(e.TEXTURE_3D,D,h,t.width,t.height,t.depth),E&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,m,t.data)):n.texImage3D(e.TEXTURE_3D,0,h,t.width,t.height,t.depth,0,r,m,t.data);else if(i.isFramebufferTexture){if(T){if(x)n.texStorage2D(e.TEXTURE_2D,D,h,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<D;t++)n.texImage2D(e.TEXTURE_2D,t,h,i,a,0,r,m,null),i>>=1,a>>=1}}}else if(i.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),p.add(i),n.onpaint=e=>{let t=e.changedElements;for(let e of p)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(_.length>0){if(x&&T){let t=we(_[0]);n.texStorage2D(e.TEXTURE_2D,D,h,t.width,t.height)}for(let t=0,i=_.length;t<i;t++)g=_[t],x?E&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,m,g):n.texImage2D(e.TEXTURE_2D,t,h,r,m,g);i.generateMipmaps=!1}else if(x){if(T){let r=we(t);n.texStorage2D(e.TEXTURE_2D,D,h,r.width,r.height)}E&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,m,t)}else n.texImage2D(e.TEXTURE_2D,0,h,r,m,t);y(i)&&b(c),f.__version=d.version,i.onUpdate&&i.onUpdate(i)}t.__version=i.version}function de(t,i,s){if(i.image.length!==6)return;let c=le(t,i),l=i.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=jt.getPrimaries(jt.workingColorSpace),r=i.colorSpace===``?null:jt.getPrimaries(i.colorSpace),d=i.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,i.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,i.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,i.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=i.isCompressedTexture||i.image[0].isCompressedTexture,p=i.image[0]&&i.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=v(i.image[e],!0,a.maxCubemapSize):m[e]=p?i.image[e].image:i.image[e],m[e]=W(i,m[e]);let h=m[0],g=o.convert(i.format,i.colorSpace),_=o.convert(i.type),x=S(i.internalFormat,g,_,i.normalized,i.colorSpace),C=i.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=w(i,h);ce(e.TEXTURE_CUBE_MAP,i);let O;if(f){C&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,x,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let a=O[r];i.format===1023?C?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,a.width,a.height,g,_,a.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,a.width,a.height,0,g,_,a.data):g===null?L(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):C?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,a.width,a.height,g,a.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,x,a.width,a.height,0,a.data)}}}else{if(O=i.mipmaps,C&&T){O.length>0&&D++;let t=we(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,x,t.width,t.height)}for(let t=0;t<6;t++)if(p){C?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,g,_,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,m[t].width,m[t].height,0,g,_,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;C?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,g,_,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,i.width,i.height,0,g,_,i.data)}}else{C?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,x,g,_,m[t]);for(let r=0;r<O.length;r++){let i=O[r];C?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,g,_,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,x,g,_,i.image[t])}}}y(i)&&b(e.TEXTURE_CUBE_MAP),u.__version=l.version,i.onUpdate&&i.onUpdate(i)}t.__version=i.version}function fe(t,i,a,s,l,u){let d=o.convert(a.format,a.colorSpace),f=o.convert(a.type),p=S(a.internalFormat,d,f,a.normalized,a.colorSpace),m=r.get(i),h=r.get(a);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Se(i)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,s,l,h.__webglTexture,0,xe(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,s,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function pe(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=C(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Se(n)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,xe(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,xe(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let a=t[i],s=o.convert(a.format,a.colorSpace),l=o.convert(a.type),u=S(a.internalFormat,s,l,a.normalized,a.colorSpace);Se(n)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,xe(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,xe(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function me(t,i,a){let s=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),s){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,T)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),ce(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=o.convert(i.depthTexture.format),r=o.convert(i.depthTexture.type),a;i.depthTexture.format===1026?a=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(a=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,a,i.width,i.height,0,t,r,null)}}else ne(i.depthTexture,0);let u=l.__webglTexture,d=xe(i),f=s?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Se(i)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Se(i)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function he(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)me(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?me(i.__webglFramebuffer[0],t,0):me(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),pe(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),pe(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function ge(t,n,i){let a=r.get(t);n!==void 0&&fe(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&he(t)}function _e(t){let i=t.texture,a=r.get(t),c=r.get(i);t.addEventListener(`dispose`,E);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,s.memory.textures++),u){a.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){a.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)a.__webglFramebuffer[t][n]=e.createFramebuffer()}else a.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){a.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)a.__webglFramebuffer[t]=e.createFramebuffer()}else a.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),s.memory.textures++)}if(t.samples>0&&Se(t)===!1){a.__webglMultisampledFramebuffer=e.createFramebuffer(),a.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,a.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];a.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,a.__webglColorRenderbuffer[n]);let i=o.convert(r.format,r.colorSpace),s=o.convert(r.type),c=S(r.internalFormat,i,s,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=xe(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,a.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(a.__webglDepthRenderbuffer=e.createRenderbuffer(),pe(a.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),ce(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)fe(a.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else fe(a.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);y(i)&&b(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,o=l.length;i<o;i++){let o=l[i],s=r.get(o),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,s.__webglTexture),ce(c,o),fe(a.__webglFramebuffer,t,o,e.COLOR_ATTACHMENT0+i,c,0),y(o)&&b(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),ce(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)fe(a.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else fe(a.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);y(i)&&b(r),n.unbindTexture()}t.depthBuffer&&he(t)}function ve(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(y(a)){let t=x(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),b(t),n.unbindTexture()}}}let ye=[],be=[];function U(t){if(t.samples>0){if(Se(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,c=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,l=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,l.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,l.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,l.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,l.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,l.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,l.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),u===!0&&(ye.length=0,be.length=0,ye.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(ye.push(c),be.push(c),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,be)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ye))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,l.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,l.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,l.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,l.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&u){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function xe(e){return Math.min(a.maxSamples,e.samples)}function Se(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Ce(e){let t=s.render.frame;f.get(e)!==t&&(f.set(e,t),e.update())}function W(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(jt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&L(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):V(`WebGLTextures: Unsupported texture color space:`,n)),t}function we(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(d.width=e.naturalWidth||e.width,d.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(d.width=e.displayWidth,d.height=e.displayHeight):(d.width=e.width,d.height=e.height),d}this.allocateTextureUnit=M,this.resetTextureUnits=ee,this.getTextureUnits=j,this.setTextureUnits=te,this.setTexture2D=ne,this.setTexture2DArray=P,this.setTexture3D=F,this.setTextureCube=ie,this.rebindTextures=ge,this.setupRenderTarget=_e,this.updateRenderTargetMipmap=ve,this.updateMultisampleRenderTarget=U,this.setupDepthRenderbuffer=he,this.setupFrameBufferTexture=fe,this.useMultisampledRTT=Se,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Yi(e,t){function n(n,r=``){let i,a=jt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Xi=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Zi=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Qi=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new a(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new he({vertexShader:Xi,fragmentShader:Zi,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new It(new B(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},$i=class extends Bt{constructor(e,t){super();let n=this,r=null,i=1,o=null,s=`local-floor`,c=1,l=null,u=null,d=null,f=null,p=null,m=null,h=typeof XRWebGLBinding<`u`,g=new Qi,_={},y=t.getContextAttributes(),b=null,x=null,S=[],C=[],w=new ze,T=null,E=null,O=new D;O.viewport=new ot;let k=new D;k.viewport=new ot;let A=[O,k],j=new at,te=null,M=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=S[e];return t===void 0&&(t=new kt,S[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=S[e];return t===void 0&&(t=new kt,S[e]=t),t.getGripSpace()},this.getHand=function(e){let t=S[e];return t===void 0&&(t=new kt,S[e]=t),t.getHandSpace()};function N(e){let t=C.indexOf(e.inputSource);if(t===-1)return;let n=S[t];n!==void 0&&(n.update(e.inputSource,e.frame,l||o),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ne(){r.removeEventListener(`select`,N),r.removeEventListener(`selectstart`,N),r.removeEventListener(`selectend`,N),r.removeEventListener(`squeeze`,N),r.removeEventListener(`squeezestart`,N),r.removeEventListener(`squeezeend`,N),r.removeEventListener(`end`,ne),r.removeEventListener(`inputsourceschange`,re);for(let e=0;e<S.length;e++){let t=C[e];t!==null&&(C[e]=null,S[e].disconnect(t))}te=null,M=null,g.reset();for(let e in _)delete _[e];if(e.setRenderTarget(b),p=null,f=null,d=null,r=null,x=null,le.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(w.width,w.height,!1),E!==null){let e=E.camera;e.fov=E.fov,e.zoom=E.zoom,e.updateProjectionMatrix(),E=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&L(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){s=e,n.isPresenting===!0&&L(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(e){l=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return d===null&&h&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(a){if(r=a,r!==null){if(b=e.getRenderTarget(),r.addEventListener(`select`,N),r.addEventListener(`selectstart`,N),r.addEventListener(`selectend`,N),r.addEventListener(`squeeze`,N),r.addEventListener(`squeezestart`,N),r.addEventListener(`squeezeend`,N),r.addEventListener(`end`,ne),r.addEventListener(`inputsourceschange`,re),y.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(w),h&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;y.depth&&(o=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=y.stencil?oe:P,a=y.stencil?ft:J);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};d=this.getBinding(),f=d.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),x=new Oe(f.textureWidth,f.textureHeight,{format:Ce,type:Je,depthTexture:new v(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new Oe(p.framebufferWidth,p.framebufferHeight,{format:Ce,type:Je,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(s),le.setContext(r),le.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function re(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=C.indexOf(n);r>=0&&(C[r]=null,S[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=C.indexOf(n);if(r===-1){for(let e=0;e<S.length;e++)if(e>=C.length){C.push(n),r=e;break}else if(C[e]===null){C[e]=n,r=e;break}if(r===-1)break}let i=S[r];i&&i.connect(n)}}let F=new Y,ie=new Y;function I(e,t,n){F.setFromMatrixPosition(t.matrixWorld),ie.setFromMatrixPosition(n.matrixWorld);let r=F.distanceTo(ie),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ae(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;g.texture!==null&&(g.depthNear>0&&(t=g.depthNear),g.depthFar>0&&(n=g.depthFar)),j.near=k.near=O.near=t,j.far=k.far=O.far=n,(te!==j.near||M!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),te=j.near,M=j.far),j.layers.mask=e.layers.mask|6,O.layers.mask=j.layers.mask&-5,k.layers.mask=j.layers.mask&-3;let i=e.parent,a=j.cameras;ae(j,i);for(let e=0;e<a.length;e++)ae(a[e],i);a.length===2?I(j,O,k):j.projectionMatrix.copy(O.projectionMatrix),E===null&&e.isPerspectiveCamera&&(E={camera:e,fov:e.fov,zoom:e.zoom}),R(e,j,i)};function R(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=ee*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(f!==null||p!==null)return c},this.setFoveation=function(e){c=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(j)},this.getCameraTexture=function(e){return _[e]};let se=null;function ce(t,i){if(u=i.getViewerPose(l||o),m=i,u!==null){let t=u.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let i=!1;t.length!==j.cameras.length&&(j.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=d.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(x,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(x))}let o=A[n];o===void 0&&(o=new D,o.layers.enable(n),o.viewport=new ot,A[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(j.matrix.copy(o.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),i===!0&&j.cameras.push(o)}let o=r.enabledFeatures;if(o&&o.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&h){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&g.init(e,r.renderState)}if(o&&o.includes(`camera-access`)&&h){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=_[n];e||(e=new a,_[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<S.length;e++){let t=C[e],n=S[e];t!==null&&n!==void 0&&n.update(t,i,l||o)}se&&se(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),m=null}let le=new Ut;le.setAnimationLoop(ce),this.setAnimationLoop=function(e){se=e},this.dispose=function(){}}},ea=new je,ta=new zt;ta.set(-1,0,0,0,1,0,0,0,1);function na(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Mt(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(ea.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(ta),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function ra(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return V(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?L(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):L(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var ia=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),aa=null;function oa(){return aa===null&&(aa=new M(ia,16,16,f,O),aa.name=`DFG_LUT`,aa.minFilter=Dt,aa.magFilter=Dt,aa.wrapS=ue,aa.wrapT=ue,aa.generateMipmaps=!1,aa.needsUpdate=!0),aa}var sa=class{constructor(e={}){let{canvas:t=Ae(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:s=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:m=!1,outputBufferType:h=Je}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);g=n.getContextAttributes().alpha}else g=a;let _=h,v=new Set([De,I,N]),y=new Set([Je,J,Fe,ft,rt,Et]),b=new Uint32Array(4),S=new Int32Array(4),C=new Y,w=null,T=null,E=[],D=[],k=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,ee=!1,j=null,te=null,M=null,ne=null;this._outputColorSpace=o;let P=0,re=0,F=null,ie=-1,ae=null,oe=new ot,R=new ot,se=null,ce=new c(0),le=0,z=t.width,B=t.height,ue=1,H=null,de=null,pe=new ot(0,0,z,B),me=new ot(0,0,z,B),he=!1,ge=new x,_e=!1,ve=!1,ye=new je,be=new Y,U=new ot,xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Se=!1;function Ce(){return F===null?ue:1}let W=n;function we(e,n){return t.getContext(e,n)}let Te,Ee,G,ke,K,q,Me,Ne,Pe,Le,Re,ze,Be,Ve,Ue,We,Ge,Ke,qe,Ye,Xe,Ze,Qe;try{let e={alpha:!0,depth:r,stencil:i,antialias:s,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:f};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,tt,!1),t.addEventListener(`webglcontextrestored`,nt,!1),t.addEventListener(`webglcontextcreationerror`,it,!1),W===null){let t=`webgl2`;if(W=we(t,e),W===null)throw we(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}$e()}catch(e){throw t.removeEventListener(`webglcontextlost`,tt,!1),t.removeEventListener(`webglcontextrestored`,nt,!1),t.removeEventListener(`webglcontextcreationerror`,it,!1),V(`WebGLRenderer: `+e.message),e}function $e(){Te=new Tn(W),Te.init(),Xe=new Yi(W,Te),Ee=new $t(W,Te,e,Xe),G=new qi(W,Te),Ee.reversedDepthBuffer&&m&&G.buffers.depth.setReversed(!0),te=W.createFramebuffer(),M=W.createFramebuffer(),ne=W.createFramebuffer(),ke=new On(W),K=new Di,q=new Ji(W,Te,G,K,Ee,Xe,ke),Me=new wn(A),Ne=new Wt(W),Ze=new Zt(W,Ne),Pe=new En(W,Ne,ke,Ze),Le=new An(W,Pe,Ne,Ze,ke),Ke=new kn(W,Ee,q),Ue=new en(K),Re=new Ei(A,Me,Te,Ee,Ze,Ue),ze=new na(A,K),Be=new ji,Ve=new Ri(Te),Ge=new Xt(A,Me,G,Le,g,l),We=new Ki(A,Le,Ee),Qe=new ra(W,ke,Ee,G),qe=new Qt(W,Te,ke),Ye=new Dn(W,Te,ke),ke.programs=Re.programs,A.capabilities=Ee,A.extensions=Te,A.properties=K,A.renderLists=Be,A.shadowMap=We,A.state=G,A.info=ke}_!==1009&&(k=new Mn(_,t.width,t.height,s,r,i));let et=new $i(A,W);this.xr=et,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){let e=Te.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Te.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ue},this.setPixelRatio=function(e){e!==void 0&&(ue=e,this.setSize(z,B,!1))},this.getSize=function(e){return e.set(z,B)},this.setSize=function(e,n,r=!0){et.isPresenting?L(`WebGLRenderer: Can't change size while VR device is presenting.`):(z=e,B=n,t.width=Math.floor(e*ue),t.height=Math.floor(n*ue),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),k!==null&&k.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(z*ue,B*ue).floor()},this.setDrawingBufferSize=function(e,n,r){z=e,B=n,ue=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(_===1009)V(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){L(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}k.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(oe)},this.getViewport=function(e){return e.copy(pe)},this.setViewport=function(e,t,n,r){e.isVector4?pe.set(e.x,e.y,e.z,e.w):pe.set(e,t,n,r),G.viewport(oe.copy(pe).multiplyScalar(ue).round())},this.getScissor=function(e){return e.copy(me)},this.setScissor=function(e,t,n,r){e.isVector4?me.set(e.x,e.y,e.z,e.w):me.set(e,t,n,r),G.scissor(R.copy(me).multiplyScalar(ue).round())},this.getScissorTest=function(){return he},this.setScissorTest=function(e){G.setScissorTest(he=e)},this.setOpaqueSort=function(e){H=e},this.setTransparentSort=function(e){de=e},this.getClearColor=function(e){return e.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor(...arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(F!==null){let t=F.texture.format;e=v.has(t)}if(e){let e=F.texture.type,t=y.has(e),n=Ge.getClearColor(),r=Ge.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(b[0]=i,b[1]=a,b[2]=o,b[3]=r,W.clearBufferuiv(W.COLOR,0,b)):(S[0]=i,S[1]=a,S[2]=o,S[3]=r,W.clearBufferiv(W.COLOR,0,S))}else r|=W.COLOR_BUFFER_BIT}t&&(r|=W.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&W.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),j=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,tt,!1),t.removeEventListener(`webglcontextrestored`,nt,!1),t.removeEventListener(`webglcontextcreationerror`,it,!1),Ge.dispose(),Be.dispose(),Ve.dispose(),K.dispose(),Me.dispose(),Le.dispose(),Ze.dispose(),Qe.dispose(),Re.dispose(),et.dispose(),et.removeEventListener(`sessionstart`,pt),et.removeEventListener(`sessionend`,mt),ht.stop()};function tt(e){e.preventDefault(),fe(`WebGLRenderer: Context Lost.`),ee=!0}function nt(){fe(`WebGLRenderer: Context Restored.`),ee=!1;let e=ke.autoReset,t=We.enabled,n=We.autoUpdate,r=We.needsUpdate,i=We.type;$e(),ke.autoReset=e,We.enabled=t,We.autoUpdate=n,We.needsUpdate=r,We.type=i}function it(e){V(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function at(e){let t=e.target;t.removeEventListener(`dispose`,at),st(t)}function st(e){ct(e),K.remove(e)}function ct(e){let t=K.get(e).programs;t!==void 0&&(t.forEach(function(e){Re.releaseProgram(e)}),e.isShaderMaterial&&Re.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=xe);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Tt(e,t,n,r,i);G.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Pe.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ze.setup(i,r,s,n,c);let h,g=qe;if(c!==null&&(h=Ne.get(c),g=Ye,g.setIndex(h)),i.isMesh)r.wireframe===!0?(G.setLineWidth(r.wireframeLinewidth*Ce()),g.setMode(W.LINES)):g.setMode(W.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),G.setLineWidth(e*Ce()),i.isLineSegments?g.setMode(W.LINES):i.isLineLoop?g.setMode(W.LINE_LOOP):g.setMode(W.LINE_STRIP)}else i.isPoints?g.setMode(W.POINTS):i.isSprite&&g.setMode(W.TRIANGLES);if(i.isBatchedMesh){if(Te.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ne.get(c).bytesPerElement:1,o=K.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(W,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function lt(e,t,n,r){j!==null&&e.isNodeMaterial&&j.setObject(r,e),_e===!0&&Ue.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,xt(e,t,r),e.side=0,e.needsUpdate=!0,xt(e,t,r),e.side=2):xt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),j!==null&&j.renderStart(e,t,n),T=Ve.get(n),T.init(t),D.push(T),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(T.pushLight(e),e.castShadow&&T.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(T.pushLight(e),e.castShadow&&T.pushShadow(e))}),T.setupLights(),j!==null&&j.updateLights(T.state.lightsArray),ve=this.localClippingEnabled,_e=Ue.init(this.clippingPlanes,ve),_e===!0&&Ue.setGlobalState(this.clippingPlanes,t),j!==null&&We.render(T.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];lt(o,n,t,e),r.add(o)}else lt(i,n,t,e),r.add(i)}}),T=D.pop(),j!==null&&j.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=K.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Te.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let ut=null;function dt(e){ut&&ut(e)}function pt(){ht.stop()}function mt(){ht.start()}let ht=new Ut;ht.setAnimationLoop(dt),typeof self<`u`&&ht.setContext(self),this.setAnimationLoop=function(e){ut=e,et.setAnimationLoop(e),e===null?ht.stop():ht.start()},et.addEventListener(`sessionstart`,pt),et.addEventListener(`sessionend`,mt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){V(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ee===!0)return;j!==null&&j.renderStart(e,t);let n=et.enabled===!0&&et.isPresenting===!0,r=k!==null&&(F===null||n)&&k.begin(A,F);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),et.enabled===!0&&et.isPresenting===!0&&(k===null||k.isCompositing()===!1)&&(et.cameraAutoUpdate===!0&&et.updateCamera(t),t=et.getCamera()),e.isScene===!0&&e.onBeforeRender(A,e,t,F),T=Ve.get(e,D.length),T.init(t),T.state.textureUnits=q.getTextureUnits(),D.push(T),ye.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),ge.setFromProjectionMatrix(ye,He,t.reversedDepth),ve=this.localClippingEnabled,_e=Ue.init(this.clippingPlanes,ve),w=Be.get(e,E.length),w.init(),E.push(w),et.enabled===!0&&et.isPresenting===!0){let e=A.xr.getDepthSensingMesh();e!==null&&gt(e,t,-1/0,A.sortObjects)}gt(e,t,0,A.sortObjects),w.finish(),j!==null&&j.updateLights(T.state.lightsArray),A.sortObjects===!0&&w.sort(H,de),Se=et.enabled===!1||et.isPresenting===!1||et.hasDepthSensing()===!1,Se&&Ge.addToRenderList(w,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),_e===!0&&Ue.beginShadows();let i=T.state.shadowsArray;if(We.render(i,e,t),_e===!0&&Ue.endShadows(),(r&&k.hasRenderPass())===!1){let n=w.opaque,r=w.transmissive;if(T.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];vt(n,r,e,a)}Se&&Ge.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];_t(w,e,n,n.viewport)}}else r.length>0&&vt(n,r,e,t),Se&&Ge.render(e),_t(w,e,t)}F!==null&&re===0&&(q.updateMultisampleRenderTarget(F),q.updateRenderTargetMipmap(F)),r&&k.end(A),e.isScene===!0&&e.onAfterRender(A,e,t),Ze.resetDefaultState(),ie=-1,ae=null,D.pop(),D.length>0?(T=D[D.length-1],q.setTextureUnits(T.state.textureUnits),_e===!0&&Ue.setGlobalState(A.clippingPlanes,T.state.camera)):T=null,E.pop(),w=E.length>0?E[E.length-1]:null,j!==null&&j.renderEnd()};function gt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)T.pushLightProbeGrid(e);else if(e.isLight)T.pushLight(e),e.castShadow&&T.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(ge)){r&&U.setFromMatrixPosition(e.matrixWorld).applyMatrix4(ye);let i=Le.update(e),a=e.material;a.visible&&w.push(e,i,a,n,U.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(ge))){let i=Le.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),U.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),U.copy(e.boundingSphere.center)),U.applyMatrix4(e.matrixWorld).applyMatrix4(ye)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&w.push(e,i,c,n,U.z,s,t)}}else a.visible&&w.push(e,i,a,n,U.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)gt(i[e],t,n,r)}function _t(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;T.setupLightsView(n),_e===!0&&Ue.setGlobalState(A.clippingPlanes,n),r&&G.viewport(oe.copy(r)),i.length>0&&yt(i,t,n),a.length>0&&yt(a,t,n),o.length>0&&yt(o,t,n),G.buffers.depth.setTest(!0),G.buffers.depth.setMask(!0),G.buffers.color.setMask(!0),G.setPolygonOffset(!1)}function vt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[r.id]===void 0){let e=Te.has(`EXT_color_buffer_half_float`)||Te.has(`EXT_color_buffer_float`);T.state.transmissionRenderTarget[r.id]=new Oe(1,1,{generateMipmaps:!0,type:e?O:Je,minFilter:Ie,samples:Math.max(4,Ee.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:jt.workingColorSpace})}let a=T.state.transmissionRenderTarget[r.id],o=r.viewport||oe;a.setSize(o.z*A.transmissionResolutionScale,o.w*A.transmissionResolutionScale);let s=A.getRenderTarget(),c=A.getActiveCubeFace(),l=A.getActiveMipmapLevel();A.setRenderTarget(a),A.getClearColor(ce),le=A.getClearAlpha(),le<1&&A.setClearColor(16777215,.5),A.clear(),Se&&Ge.render(n);let u=A.toneMapping;A.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),T.setupLightsView(r),_e===!0&&Ue.setGlobalState(A.clippingPlanes,r),yt(e,n,r),q.updateMultisampleRenderTarget(a),q.updateRenderTargetMipmap(a),Te.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,bt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(q.updateMultisampleRenderTarget(a),q.updateRenderTargetMipmap(a))}A.setRenderTarget(s,c,l),A.setClearColor(ce,le),d!==void 0&&(r.viewport=d),A.toneMapping=u}function yt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&bt(o,t,n,s,l,c)}}function bt(e,t,n,r,i,a){j!==null&&i.isNodeMaterial&&j.setObject(e,i),e.onBeforeRender(A,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(A,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,A.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,A.renderBufferDirect(n,t,r,i,e,a),i.side=2):A.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(A,t,n,r,i,a)}function xt(e,t,n){t.isScene!==!0&&(t=xe);let r=K.get(e),i=T.state.lights,a=T.state.shadowsArray,o=i.state.version,s=Re.getParameters(e,i.state,a,t,n,T.state.lightProbeGridArray),c=Re.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Me.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,at),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Ct(e,s),d}else s.uniforms=Re.getUniforms(e),j!==null&&e.isNodeMaterial&&j.build(e,n,s),e.onBeforeCompile(s,A),d=Re.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ue.uniform),Ct(e,s),r.needsLights=Ot(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=T.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function St(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=zr.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Ct(e,t){let n=K.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function wt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];C.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(C))return n}return null}function Tt(e,t,n,r,i){t.isScene!==!0&&(t=xe),q.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=F===null?A.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:jt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Me.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(h=A.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=K.get(r),y=T.state.lights;if(_e===!0&&(ve===!0||e!==ae)){let t=e===ae&&r.id===ie;Ue.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ue.numPlanes||v.numIntersection!==Ue.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=T.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=xt(r,t,i),j&&r.isNodeMaterial&&j.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,E=x.getUniforms(),D=v.uniforms;if(G.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==ie&&(ie=r.id,C=!0),v.needsLights){let e=wt(T.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||ae!==e){G.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),E.setValue(W,`projectionMatrix`,e.projectionMatrix),E.setValue(W,`viewMatrix`,e.matrixWorldInverse);let t=E.map.cameraPosition;t!==void 0&&t.setValue(W,be.setFromMatrixPosition(e.matrixWorld)),Ee.logarithmicDepthBuffer&&E.setValue(W,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&E.setValue(W,`isOrthographic`,e.isOrthographicCamera===!0),ae!==e&&(ae=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&E.setValue(W,`sunShadowMap`,y.state.sunShadowMap,q),y.state.directionalShadowMap.length>0&&E.setValue(W,`directionalShadowMap`,y.state.directionalShadowMap,q),y.state.spotShadowMap.length>0&&E.setValue(W,`spotShadowMap`,y.state.spotShadowMap,q),y.state.pointShadowMap.length>0&&E.setValue(W,`pointShadowMap`,y.state.pointShadowMap,q)),i.isSkinnedMesh){E.setOptional(W,i,`bindMatrix`),E.setOptional(W,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),E.setValue(W,`boneTexture`,e.boneTexture,q))}i.isBatchedMesh&&(E.setOptional(W,i,`batchingTexture`),E.setValue(W,`batchingTexture`,i._matricesTexture,q),E.setOptional(W,i,`batchingIdTexture`),E.setValue(W,`batchingIdTexture`,i._indirectTexture,q),E.setOptional(W,i,`batchingColorTexture`),i._colorsTexture!==null&&E.setValue(W,`batchingColorTexture`,i._colorsTexture,q));let O=n.morphAttributes;if((O.position!==void 0||O.normal!==void 0||O.color!==void 0)&&Ke.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,E.setValue(W,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(D.envMapIntensity.value=t.environmentIntensity),D.dfgLUT!==void 0&&(D.dfgLUT.value=oa()),C){if(E.setValue(W,`toneMappingExposure`,A.toneMappingExposure),v.needsLights&&Dt(D,w),a&&r.fog===!0&&ze.refreshFogUniforms(D,a),ze.refreshMaterialUniforms(D,r,ue,B,T.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;D.probesSH.value=e.texture,D.probesMin.value.copy(e.boundingBox.min),D.probesMax.value.copy(e.boundingBox.max),D.probesResolution.value.copy(e.resolution)}zr.upload(W,St(v),D,q)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(zr.upload(W,St(v),D,q),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&E.setValue(W,`center`,i.center),E.setValue(W,`modelViewMatrix`,i.modelViewMatrix),E.setValue(W,`normalMatrix`,i.normalMatrix),E.setValue(W,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Qe.update(n,x),Qe.bind(n,x)}}return x}function Dt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Ot(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return re},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(e,t,n){let r=K.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),K.get(e.texture).__webglTexture=t,K.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=K.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){F=e,P=t,re=n;let r=null,i=!1,a=!1;if(e){let o=K.get(e);if(o.__useDefaultFramebuffer!==void 0){G.bindFramebuffer(W.FRAMEBUFFER,o.__webglFramebuffer),oe.copy(e.viewport),R.copy(e.scissor),se=e.scissorTest,G.viewport(oe),G.scissor(R),G.setScissorTest(se),ie=-1;return}if(o.__webglFramebuffer===void 0)q.setupRenderTarget(e);else if(o.__hasExternalTextures)q.rebindTextures(e,K.get(e.texture).__webglTexture,K.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&K.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);q.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=K.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&q.useMultisampledRTT(e)===!1?K.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,oe.copy(e.viewport),R.copy(e.scissor),se=e.scissorTest}else oe.copy(pe).multiplyScalar(ue).floor(),R.copy(me).multiplyScalar(ue).floor(),se=he;if(n!==0&&(r=te),G.bindFramebuffer(W.FRAMEBUFFER,r)&&G.drawBuffers(e,r),G.viewport(oe),G.scissor(R),G.setScissorTest(se),i){let r=K.get(e.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=K.get(e.textures[t]);W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=K.get(e.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,t.__webglTexture,n)}ie=-1};function kt(e){let t=K.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ee.textureFormatReadable(e.format),t.__typeReadable=Ee.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=K.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){G.bindFramebuffer(W.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+s);let u=kt(o);if(u.__formatReadable===!1){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){V(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&W.readPixels(t,n,r,i,Xe.convert(c),Xe.convert(l),a)}finally{let e=F===null?null:K.get(F).__webglFramebuffer;G.bindFramebuffer(W.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=K.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){G.bindFramebuffer(W.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&W.readBuffer(W.COLOR_ATTACHMENT0+s);let d=kt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,f),W.bufferData(W.PIXEL_PACK_BUFFER,a.byteLength,W.STREAM_READ),W.readPixels(t,n,r,i,Xe.convert(l),Xe.convert(u),0),W.bindBuffer(W.PIXEL_PACK_BUFFER,null);let m=F===null?null:K.get(F).__webglFramebuffer;G.bindFramebuffer(W.FRAMEBUFFER,m);let h=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await p(W,h,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,f),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,a),W.bindBuffer(W.PIXEL_PACK_BUFFER,null),W.deleteBuffer(f),W.deleteSync(h),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;q.setTexture2D(e,0),W.copyTexSubImage2D(W.TEXTURE_2D,n,0,0,o,s,i,a),G.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Xe.convert(t.format),_=Xe.convert(t.type),v;t.isData3DTexture?(q.setTexture3D(t,0),v=W.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(q.setTexture2DArray(t,0),v=W.TEXTURE_2D_ARRAY):(q.setTexture2D(t,0),v=W.TEXTURE_2D),G.activeTexture(W.TEXTURE0),G.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,t.flipY),G.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),G.pixelStorei(W.UNPACK_ALIGNMENT,t.unpackAlignment);let y=G.getParameter(W.UNPACK_ROW_LENGTH),b=G.getParameter(W.UNPACK_IMAGE_HEIGHT),x=G.getParameter(W.UNPACK_SKIP_PIXELS),S=G.getParameter(W.UNPACK_SKIP_ROWS),C=G.getParameter(W.UNPACK_SKIP_IMAGES);G.pixelStorei(W.UNPACK_ROW_LENGTH,h.width),G.pixelStorei(W.UNPACK_IMAGE_HEIGHT,h.height),G.pixelStorei(W.UNPACK_SKIP_PIXELS,l),G.pixelStorei(W.UNPACK_SKIP_ROWS,u),G.pixelStorei(W.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=K.get(e),r=K.get(t),h=K.get(n.__renderTarget),g=K.get(r.__renderTarget);G.bindFramebuffer(W.READ_FRAMEBUFFER,h.__webglFramebuffer),G.bindFramebuffer(W.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,K.get(e).__webglTexture,i,d+n),W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,K.get(t).__webglTexture,a,m+n)),W.blitFramebuffer(l,u,o,s,f,p,o,s,W.DEPTH_BUFFER_BIT,W.NEAREST);G.bindFramebuffer(W.READ_FRAMEBUFFER,null),G.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||K.has(e)){let n=K.get(e),r=K.get(t);G.bindFramebuffer(W.READ_FRAMEBUFFER,M),G.bindFramebuffer(W.DRAW_FRAMEBUFFER,ne);for(let e=0;e<c;e++)w?W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):W.framebufferTexture2D(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,n.__webglTexture,i),T?W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):W.framebufferTexture2D(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_2D,r.__webglTexture,a),i===0?T?W.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):W.copyTexSubImage2D(v,a,f,p,l,u,o,s):W.blitFramebuffer(l,u,o,s,f,p,o,s,W.COLOR_BUFFER_BIT,W.NEAREST);G.bindFramebuffer(W.READ_FRAMEBUFFER,null),G.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?W.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?W.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):W.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):W.texSubImage2D(W.TEXTURE_2D,a,f,p,o,s,g,_,h);G.pixelStorei(W.UNPACK_ROW_LENGTH,y),G.pixelStorei(W.UNPACK_IMAGE_HEIGHT,b),G.pixelStorei(W.UNPACK_SKIP_PIXELS,x),G.pixelStorei(W.UNPACK_SKIP_ROWS,S),G.pixelStorei(W.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&W.generateMipmap(v),G.unbindTexture()},this.initRenderTarget=function(e){K.get(e).__webglFramebuffer===void 0&&q.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?q.setTextureCube(e,0):e.isData3DTexture?q.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?q.setTexture2DArray(e,0):q.setTexture2D(e,0),G.unbindTexture()},this.resetState=function(){P=0,re=0,F=null,G.reset(),Ze.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return He}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=jt._getDrawingBufferColorSpace(e),t.unpackColorSpace=jt._getUnpackColorSpace()}},ca=[`chant`,`music`,`ambience`,`sfx`],la=[`sfx_horn_motorbike_01`,`sfx_horn_motorbike_02`],ua=[`concrete`,`sand`].flatMap(e=>[1,2,3,4,5].map(t=>`sfx_step_${e}_0${t}`)),da=[`sfx_ui_click_01`,`sfx_ui_click_02`,`sfx_ui_confirm_01`,`sfx_ui_back_01`],fa=[`sfx_hen_squawk_01`,`sfx_hen_squawk_02`],pa=[`sfx_hen_cluck_01`,`sfx_egungun_rattle_01`,`sfx_egungun_rattle_02`,`sfx_cloth_swish_01`,`sfx_cloth_rustle_01`,`sfx_spotted_01`,`sfx_raffia_01`,`sfx_raffia_02`,`sfx_bells_01`,`sfx_bells_02`,`sfx_power_cut`,`sfx_thunder_01`],ma=[`drum_hit_01`,`drum_hit_02`,`drum_hit_03`],ha=[`sfx_hit_soft_01`,`sfx_hit_soft_02`];[...la,...fa,...pa,...ha,...ma,...ua,...da];var ga={chant_intro:`chant`,chant_ask:`chant`,chant_not_yet:`chant`,chant_open:`chant`,chant_hunt:`chant`,caught:`chant`,drum_loop:`music`,amb_market:`ambience`,amb_generator:`ambience`,amb_rain:`ambience`,sfx_horn_motorbike_01:`sfx`,sfx_horn_motorbike_02:`sfx`,sfx_rooster_01:`sfx`,sfx_paint:`sfx`,jingle_win:`sfx`,jingle_caught:`sfx`,...Object.fromEntries([...ua,...da,...ha,...ma,...fa,...pa].map(e=>[e,`sfx`]))},_a=new Set(la),va=`boju.muted`,ya={channels:{chant:1.15,music:.3,ambience:.35,sfx:.65},duck:{ambience:.15,music:.15,sfx:.4},duckAttackSeconds:.12,duckReleaseSeconds:.9,duckHoldSeconds:.45,limiter:{threshold:-3,knee:0,ratio:20,attack:.003,release:.12},heart:{level:.5,minShare:.3,bodyHz:56,knockHz:130,knockShare:.6}};function ba(e,t=.6){let n=Math.max(1,Math.round(e.sampleRate*t)),r=e.createBuffer(2,n,e.sampleRate);for(let e=0;e<2;e++){let t=r.getChannelData(e);for(let e=0;e<n;e++)t[e]=(Math.random()*2-1)*(1-e/n)**3}return r}function xa(e,t,n,r,i={}){let a=e.createBiquadFilter();a.type=`lowpass`,a.frequency.value=i.cutoff??1200,a.Q.value=.7;let o=e.createGain();o.gain.value=i.gain??.45;let s=e.createGain(),c=e.createConvolver();c.buffer=r;let l=e.createGain();return l.gain.value=i.wet??.35,t.connect(a).connect(o),o.connect(s).connect(n),o.connect(c).connect(l).connect(n),[a,o,s,c,l]}var Sa={chant_intro:110,chant_ask:140,chant_not_yet:100,chant_open:170,chant_hunt:200,caught:70},Ca=44100;function wa(e,t,n,r,i){let a=e.createOscillator(),o=e.createGain();a.type=`sine`,a.frequency.setValueAtTime(n*2,t),a.frequency.exponentialRampToValueAtTime(n,t+.08),o.gain.setValueAtTime(i,t),o.gain.exponentialRampToValueAtTime(.001,t+r),a.connect(o).connect(e.destination),a.start(t),a.stop(t+r);let s=e.createOscillator(),c=e.createGain();s.type=`triangle`,s.frequency.setValueAtTime(n*4,t),c.gain.setValueAtTime(i*.4,t),c.gain.exponentialRampToValueAtTime(.001,t+.05),s.connect(c).connect(e.destination),s.start(t),s.stop(t+.06)}async function Ta(e){if(e===`drum_loop`){let e=new OfflineAudioContext(1,Ca*2,Ca);return[0,.5,1,1.5].forEach((t,n)=>wa(e,t,n%2?150:80,.3,.8)),wa(e,.75,180,.15,.4),wa(e,1.75,180,.15,.4),e.startRendering()}if(e===`amb_market`||e===`amb_generator`){let t=new OfflineAudioContext(1,Ca*4,Ca),n=t.createBuffer(1,Ca*4,Ca),r=n.getChannelData(0);for(let e=0;e<r.length;e++){let t=Math.min(e,r.length-e)/(Ca*.25);r[e]=(Math.random()*2-1)*Math.min(1,t)}let i=t.createBufferSource();i.buffer=n;let a=t.createBiquadFilter();a.type=`lowpass`,a.frequency.value=e===`amb_market`?400:1400;let o=t.createGain();return o.gain.value=.35,i.connect(a).connect(o).connect(t.destination),i.start(),t.startRendering()}let t=new OfflineAudioContext(1,Math.round(Ca*.4),Ca);return wa(t,0,Sa[e]??120,.35,.9),t.startRendering()}function Ea(e,t,n,r){e.positionX?(e.positionX.value=t,e.positionY.value=n,e.positionZ.value=r):e.setPosition(t,n,r)}var Z=new class{ctx=null;master;channelGain={};duckGain={};heartBus;chantVoices=0;duckHold=null;volumes={...ya.channels};muted=!1;buffers=new Map;warned=new Set;voices=new Set;stopGen=new Map;impulse=null;chantToken=0;chantReadyFlag=!1;chantPhase=`idle`;suspicion=0;heartTimer=null;constructor(){try{this.muted=localStorage.getItem(va)===`1`}catch{}}get unlocked(){return this.ctx!==null}async unlock(){if(!this.ctx){let e=window.AudioContext??window.webkitAudioContext;this.ctx=new e,this.master=this.ctx.createGain(),this.master.gain.value=+!this.muted;let t=this.ctx.createDynamicsCompressor(),n=ya.limiter;t.threshold.value=n.threshold,t.knee.value=n.knee,t.ratio.value=n.ratio,t.attack.value=n.attack,t.release.value=n.release,this.master.connect(t).connect(this.ctx.destination);for(let e of ca){let t=this.ctx.createGain();t.gain.value=this.volumes[e];let n=this.ctx.createGain();t.connect(n).connect(this.master),this.channelGain[e]=t,this.duckGain[e]=n}this.heartBus=this.ctx.createGain(),this.heartBus.gain.value=ya.heart.level,this.heartBus.connect(this.master)}this.ctx.state!==`running`&&await this.ctx.resume()}async suspend(){this.ctx&&this.ctx.state===`running`&&await this.ctx.suspend()}async resume(){this.ctx&&this.ctx.state===`suspended`&&await this.ctx.resume()}isMuted(){return this.muted}setMuted(e){this.muted=e;try{localStorage.setItem(va,e?`1`:`0`)}catch{}this.ctx&&this.master.gain.setTargetAtTime(+!e,this.ctx.currentTime,.03)}getVolume(e){return this.volumes[e]}setVolume(e,t){this.volumes[e]=Math.min(1,Math.max(0,t)),this.ctx&&this.channelGain[e].gain.setTargetAtTime(this.volumes[e],this.ctx.currentTime,.03)}setListener(e,t,n,r=0,i=0,a=-1){if(!this.ctx)return;let o=this.ctx.listener,s=this.ctx.currentTime;o.positionX?(o.positionX.setTargetAtTime(e,s,.03),o.positionY.setTargetAtTime(t,s,.03),o.positionZ.setTargetAtTime(n,s,.03),o.forwardX.value=r,o.forwardY.value=i,o.forwardZ.value=a,o.upX.value=0,o.upY.value=1,o.upZ.value=0):(o.setPosition(e,t,n),o.setOrientation(r,i,a,0,1,0))}loadBuffer(e){let t=this.buffers.get(e);return t||(t=this.fetchOrSynth(e),this.buffers.set(e,t)),t}prefetched=new Map;async prefetch(e,t){await Promise.all(e.map(async e=>{try{let t=await fetch(`./audio/${e}.ogg`);t.ok&&this.prefetched.set(e,await t.arrayBuffer())}catch{}t?.()}))}async fetchOrSynth(e){if(!this.ctx)return null;try{let t=this.prefetched.get(e),n;if(t)n=t.slice(0);else{let t=await fetch(`./audio/${e}.ogg`);if(!t.ok)throw Error(`HTTP ${t.status}`);n=await t.arrayBuffer()}return await this.ctx.decodeAudioData(n)}catch(t){this.warned.has(e)||(this.warned.add(e),console.warn(`[audio] ${e}.ogg unavailable (${String(t)}), using synthesized placeholder`));try{return await Ta(e)}catch(t){return console.warn(`[audio] placeholder for ${e} failed`,t),null}}}preload(e){return Promise.all(e.map(e=>this.loadBuffer(e)))}async start(e,t){let n=this.ctx;if(!n)return null;let r=this.stopGen.get(e)??0,i=await this.loadBuffer(e);if(!i||(this.stopGen.get(e)??0)!==r)return null;let a=t.channel??ga[e],o=n.createBufferSource();o.buffer=i,o.loop=t.loop??!1,t.rate&&(o.playbackRate.value=t.rate);let s=n.createGain(),c=t.volume??1,l=n.currentTime;t.fadeIn?(s.gain.setValueAtTime(0,l),s.gain.linearRampToValueAtTime(c,l+t.fadeIn)):s.gain.value=c;let u=t.distant??_a.has(e),d=[],f=0,p=null,m=this.channelGain[a];if(t.spatial){let e=t.spatial;p=n.createPanner(),p.panningModel=`equalpower`,p.distanceModel=`inverse`,p.refDistance=e.refDistance??2,p.maxDistance=e.maxDistance??30,p.rolloffFactor=e.rolloff??1.5,Ea(p,e.position.x,e.position.y,e.position.z),p.connect(m),m=p}if(u){let e=u===!0?{}:u;this.impulse??=ba(n,e.reverbSeconds??.6);let t=e.reverbSeconds?ba(n,e.reverbSeconds):this.impulse;d=xa(n,s,m,t,e),f=((e.reverbSeconds??.6)+.1)*1e3,o.connect(s)}else o.connect(s).connect(m);let h,g=new Promise(e=>h=e),_={name:e,voice:null},v={name:e,duration:i.duration,ended:g,stop:(e=0)=>{let t=n.currentTime;if(e>0){s.gain.cancelScheduledValues(t),s.gain.setValueAtTime(s.gain.value,t),s.gain.linearRampToValueAtTime(0,t+e);try{o.stop(t+e+.02)}catch{}}else try{o.stop()}catch{}},setPosition:(e,t,n)=>{p&&Ea(p,e,t,n)}};return _.voice=v,this.voices.add(_),a===`chant`&&this.chantStarted(),o.onended=()=>{this.voices.delete(_),a===`chant`&&this.chantEnded(),o.disconnect(),h(),window.setTimeout(()=>{s.disconnect(),p?.disconnect(),d.forEach(e=>e.disconnect())},f)},o.start(),v}playOnce(e,t={}){return this.start(e,{...t,loop:!1})}loop(e,t={}){return this.start(e,{...t,loop:!0})}stop(e,t=0){this.stopGen.set(e,(this.stopGen.get(e)??0)+1);for(let n of[...this.voices])n.name===e&&n.voice.stop(t)}stopAll(e=0){this.cancelChant(),this.cancelDrumRoll(),this.setSuspicion(0);for(let t of[...this.voices])t.voice.stop(e)}async crossfade(e,t,n=2){return this.stop(e,n),this.loop(t,{fadeIn:n})}duckTo(e){if(!this.ctx)return;let t=this.ctx.currentTime,n=e?ya.duckAttackSeconds:ya.duckReleaseSeconds;for(let r of ca){let i=this.duckGain[r].gain;i.cancelScheduledValues(t),i.setTargetAtTime(e?ya.duck[r]??1:1,t,n/3)}}chantStarted(){this.chantVoices++,this.duckHold!==null&&window.clearTimeout(this.duckHold),this.duckHold=null,this.duckTo(!0)}chantEnded(){this.chantVoices=Math.max(0,this.chantVoices-1),!(this.chantVoices>0)&&(this.duckHold=window.setTimeout(()=>{this.duckHold=null,this.chantVoices===0&&this.duckTo(!1)},ya.duckHoldSeconds*1e3))}mixSnapshot(){return Object.fromEntries(ca.map(e=>[e,this.duckGain[e]?+this.duckGain[e].gain.value.toFixed(3):1]))}squawk(e,t,n=.6){let r=fa[Math.floor(Math.random()*fa.length)];this.playOnce(r,{volume:n,rate:.92+Math.random()*.2,spatial:{position:{x:e,y:.3,z:t},refDistance:2.5,maxDistance:30,rolloff:1.2}})}rollTimers=[];drumRoll(e){this.cancelDrumRoll();for(let t=0;t<12;t++){let n=e*(t/12)**.7*.92,r=.22+t/12*.5,i=ma[1+t%2];this.rollTimers.push(window.setTimeout(()=>void this.playOnce(i,{volume:r,rate:1.1+t/12*.2}),n*1e3))}this.rollTimers.push(window.setTimeout(()=>void this.playOnce(`drum_hit_01`,{volume:.95}),e*1e3))}cancelDrumRoll(){for(let e of this.rollTimers)window.clearTimeout(e);this.rollTimers=[]}get chantState(){return this.chantPhase}async startChant(e={}){if(!this.ctx)return`cancelled`;this.cancelChant();let t=++this.chantToken;this.chantReadyFlag=!1;let n=e.timeoutMs??2e4,r=t=>{this.chantPhase=t,e.onPhase?.(t)},i=()=>t===this.chantToken,a=async t=>{let n=await this.playOnce(t);n&&i()&&(e.onLine?.(t,n.duration),await n.ended)},o=`timeout`,s=performance.now()+n;try{for(r(`intro`),await a(`chant_intro`),r(`asking`);i()&&!this.chantReadyFlag&&performance.now()<s&&(await a(`chant_ask`),!(!i()||this.chantReadyFlag||performance.now()>=s));)await a(`chant_not_yet`);return!i()||(o=this.chantReadyFlag?`ready`:`timeout`,r(`open`),await a(`chant_open`),!i())?`cancelled`:(r(`hunt`),await a(`chant_hunt`),i()?o:`cancelled`)}finally{i()&&r(`idle`)}}chantReady(){this.chantReadyFlag=!0}cancelChant(){this.chantToken++;for(let e of[`chant_intro`,`chant_ask`,`chant_not_yet`,`chant_open`,`chant_hunt`])this.stop(e);this.chantPhase=`idle`}setSuspicion(e){this.suspicion=Math.min(1,Math.max(0,e)),this.ctx&&(this.suspicion<=.02?(this.heartTimer!==null&&window.clearTimeout(this.heartTimer),this.heartTimer=null):this.heartTimer===null&&this.beat())}beat(){let e=this.ctx;if(!e||this.suspicion<=.02){this.heartTimer=null;return}let t=this.suspicion,n=ya.heart,r=n.minShare+(1-n.minShare)*t,i=e.currentTime;this.thump(i,n.bodyHz,n.knockHz,r),this.thump(i+.17-.05*t,n.bodyHz*.82,n.knockHz*.85,r*.7);let a=1.1-.75*t;this.heartTimer=window.setTimeout(()=>this.beat(),a*1e3)}thump(e,t,n,r){let i=this.ctx,a=ya.heart,o=(t,n,r)=>{let a=i.createOscillator(),o=i.createGain();a.type=`sine`,a.frequency.setValueAtTime(t*1.6,e),a.frequency.exponentialRampToValueAtTime(t,e+.06),o.gain.setValueAtTime(n,e),o.gain.exponentialRampToValueAtTime(.001,e+r),a.connect(o).connect(this.heartBus),a.start(e),a.stop(e+r+.02),a.onended=()=>o.disconnect()};o(t,r,.16),o(n,r*a.knockShare,.07)}},Da=[{x:12.2,z:0,rx:3.2,rz:4.2},{x:-11,z:1.8,rx:2.2,rz:1.6},{x:2,z:-5.6,rx:1.6,rz:1.3},{x:-3,z:5.4,rx:1.8,rz:1.2}],Oa={halfX:15,halfZ:9,patches:Da},ka=e=>{Oa=e};function Aa(e,t){return Math.abs(e)>Oa.halfX||Math.abs(t)>Oa.halfZ||Oa.patches.some(n=>((e-n.x)/n.rx)**2+((t-n.z)/n.rz)**2<=1)}var ja={strideWalk:.85,strideRun:1.25,minSpeed:.5,player:{volume:.3,runVolume:.42,rateJitter:.08},seeker:{volume:.75,rate:.78,rateJitter:.05,refDistance:3,maxDistance:26,rolloff:1.4},costume:{swish:1.2,raffia:.5,bells:.28,bellsChance:.8,rattleChance:.3,rattle:[.2,.45]},variations:5},Ma=e=>String(e).padStart(2,`0`),Na=(e,t)=>Aa(e,t)?`sand`:`concrete`,Pa=class{who;onStep;pitch;walked=0;last=-1;constructor(e,t,n=1){this.who=e,this.onStep=t,this.pitch=n}advance(e,t,n,r,i=!0){let a=ja;if(r<a.minSpeed||!i){this.walked=0;return}let o=r>3.6;if(this.walked+=r*e,this.walked<(o?a.strideRun:a.strideWalk))return;this.walked=0;let s=Math.floor(Math.random()*a.variations);s===this.last&&(s=(s+1)%a.variations),this.last=s;let c=`sfx_step_${Na(t,n)}_${Ma(s+1)}`;if(this.onStep?.(t,n,o),this.who===`player`)Z.playOnce(c,{volume:o?a.player.runVolume:a.player.volume,rate:1+(Math.random()*2-1)*a.player.rateJitter});else{let e=a.seeker,r={position:{x:t,y:1,z:n},refDistance:e.refDistance,maxDistance:e.maxDistance,rolloff:e.rolloff};if(Z.playOnce(`sfx_cloth_swish_01`,{volume:a.costume.swish,rate:.9+Math.random()*.2,spatial:r}),Z.playOnce(Math.random()<.5?`sfx_raffia_01`:`sfx_raffia_02`,{volume:a.costume.raffia,rate:.9+Math.random()*.2,spatial:r}),Math.random()<a.costume.bellsChance&&Z.playOnce(Math.random()<.5?`sfx_bells_01`:`sfx_bells_02`,{volume:a.costume.bells,rate:.9+Math.random()*.25,spatial:r}),Math.random()<a.costume.rattleChance){let e=Math.random()<.5?0:1;Z.playOnce(e===0?`sfx_egungun_rattle_01`:`sfx_egungun_rattle_02`,{volume:a.costume.rattle[e],rate:.95+Math.random()*.1,spatial:r})}Z.playOnce(c,{volume:e.volume,rate:(e.rate+(Math.random()*2-1)*e.rateJitter)*this.pitch,spatial:{position:{x:t,y:.1,z:n},refDistance:e.refDistance,maxDistance:e.maxDistance,rolloff:e.rolloff}})}}},Fa=class{bounds;cell;w;h;blocked;constructor(e,t,n,r){this.bounds=t,this.cell=r,this.w=Math.ceil((t.maxX-t.minX)/r),this.h=Math.ceil((t.maxZ-t.minZ)/r),this.blocked=new Uint8Array(this.w*this.h);for(let i=0;i<this.h;i++)for(let a=0;a<this.w;a++){let o=t.minX+(a+.5)*r,s=t.minZ+(i+.5)*r,c=!1;for(let t of e)if(!(t.climb&&t.top<=.25)){if(t.kind===`box`){let e=Math.max(t.minX-o,0,o-t.maxX),r=Math.max(t.minZ-s,0,s-t.maxZ);e*e+r*r<n*n&&(c=!0)}else(o-t.x)**2+(s-t.z)**2<(n+t.r)**2&&(c=!0);if(c)break}this.blocked[i*this.w+a]=+!!c}}ix(e){return Math.floor((e-this.bounds.minX)/this.cell)}iz(e){return Math.floor((e-this.bounds.minZ)/this.cell)}isBlockedCell(e,t){return e<0||t<0||e>=this.w||t>=this.h||this.blocked[t*this.w+e]===1}mainArea(){let e=new Int32Array(this.w*this.h).fill(-1),t=-1,n=0,r=0;for(let i=0;i<e.length;i++){if(e[i]!==-1||this.blocked[i])continue;let a=r++,o=0,s=[i];for(e[i]=a;s.length;){let t=s.pop();o++;let n=t%this.w,r=Math.floor(t/this.w);for(let t=-1;t<=1;t++)for(let i=-1;i<=1;i++){if(!i&&!t)continue;let o=n+i,c=r+t;if(this.isBlockedCell(o,c)||i&&t&&(this.isBlockedCell(n+i,r)||this.isBlockedCell(n,r+t)))continue;let l=c*this.w+o;e[l]===-1&&(e[l]=a,s.push(l))}}o>n&&(n=o,t=a)}return Uint8Array.from(e,e=>+(e===t))}centre(e,t){return{x:this.bounds.minX+(e+.5)*this.cell,z:this.bounds.minZ+(t+.5)*this.cell}}free(e,t){return!this.isBlockedCell(this.ix(e),this.iz(t))}nearestFree(e,t,n=12){let r=this.ix(e),i=this.iz(t);if(!this.isBlockedCell(r,i))return{x:e,z:t};let a=null,o=1/0;for(let s=1;s<=n;s++){for(let n=-s;n<=s;n++)for(let c=-s;c<=s;c++){if(Math.max(Math.abs(c),Math.abs(n))!==s||this.isBlockedCell(r+c,i+n))continue;let l=this.bounds.minX+(r+c+.5)*this.cell,u=this.bounds.minZ+(i+n+.5)*this.cell,d=(l-e)**2+(u-t)**2;d<o&&(o=d,a={x:l,z:u})}if(a)return a}return null}lineClear(e,t){let n=Math.hypot(t.x-e.x,t.z-e.z),r=Math.max(1,Math.ceil(n/(this.cell*.5)));for(let n=0;n<=r;n++){let i=n/r;if(!this.free(e.x+(t.x-e.x)*i,e.z+(t.z-e.z)*i))return!1}return!0}path(e,t,n=0){let r=this.nearestFree(e.x,e.z,4),i=this.nearestFree(t.x,t.z,12);if(!r||!i)return null;let a=this.w,o=this.iz(r.z)*a+this.ix(r.x),s=this.iz(i.z)*a+this.ix(i.x),c=new Float32Array(this.w*this.h).fill(1/0),l=new Int32Array(this.w*this.h).fill(-1),u=new Uint8Array(this.w*this.h),d=[[0,o]];c[o]=0;let f=e=>{d.push(e);let t=d.length-1;for(;t>0;){let e=t-1>>1;if(d[e][0]<=d[t][0])break;[d[e],d[t]]=[d[t],d[e]],t=e}},p=()=>{let e=d[0],t=d.pop();if(d.length){d[0]=t;let e=0;for(;;){let t=e*2+1,n=t+1,r=e;if(t<d.length&&d[t][0]<d[r][0]&&(r=t),n<d.length&&d[n][0]<d[r][0]&&(r=n),r===e)break;[d[r],d[e]]=[d[e],d[r]],e=r}}return e},m=s%a,h=Math.floor(s/a),g=!1;for(;d.length;){let[,e]=p();if(u[e])continue;if(u[e]=1,e===s){g=!0;break}let t=e%a,n=Math.floor(e/a);for(let r=-1;r<=1;r++)for(let i=-1;i<=1;i++){if(!i&&!r)continue;let o=t+i,s=n+r;if(this.isBlockedCell(o,s)||i&&r&&(this.isBlockedCell(t+i,n)||this.isBlockedCell(t,n+r)))continue;let d=s*a+o;if(u[d])continue;let p=c[e]+(i&&r?1.414:1);p<c[d]&&(c[d]=p,l[d]=e,f([p+Math.hypot(m-o,h-s),d]))}}if(!g)return null;let _=[];for(let e=s;e!==-1;e=l[e])_.push({x:this.bounds.minX+(e%a+.5)*this.cell,z:this.bounds.minZ+(Math.floor(e/a)+.5)*this.cell});_.reverse();let v=[],y=0;for(;y<_.length-1;){let e=_.length-1;for(;e>y+1&&!this.lineClear(_[y],_[e]);)e--;v.push(_[e]),y=e}return n>0?this.rounded([{x:r.x,z:r.z},...v],n).slice(1):v}rounded(e,t){if(e.length<3)return e;let n=[e[0]];for(let r=1;r<e.length-1;r++){let i=e[r-1],a=e[r],o=e[r+1],s=Math.hypot(i.x-a.x,i.z-a.z),c=Math.hypot(o.x-a.x,o.z-a.z),l=Math.min(t,s/2,c/2);if(l<.2){n.push(a);continue}let u={x:a.x+(i.x-a.x)/s*l,z:a.z+(i.z-a.z)/s*l},d={x:a.x+(o.x-a.x)/c*l,z:a.z+(o.z-a.z)/c*l};this.free(u.x,u.z)&&this.free(d.x,d.z)&&this.lineClear(u,d)?n.push(u,d):n.push(a)}return n.push(e[e.length-1]),n}},Ia={cell:.5,playerRadius:.3,seekerRadius:.65,eyeHeight:1.9,targetHeights:[1.1,.35],endMargin:.3,range:12,losStep:.2,heightCell:.25,thin:3,firmMargin:.3,cornerMerge:1},La=class{bounds;cfg;player;seeker;cells=[];cellAt;viewpoints=[];reach;tops;tw;th;constructor(e,t,n=Ia){this.bounds=t,this.cfg=n,this.player=new Fa(e,t,n.playerRadius,n.cell),this.seeker=new Fa(e,t,n.seekerRadius,n.cell),this.reach=new Uint8Array,this.cellAt=new Int32Array(this.player.w*this.player.h).fill(-1);for(let e=0;e<this.player.h;e++)for(let t=0;t<this.player.w;t++){if(this.player.isBlockedCell(t,e))continue;let n=this.player.centre(t,e);this.cellAt[e*this.player.w+t]=this.cells.length,this.cells.push({...n,ix:t,iz:e})}let r=this.seeker.mainArea();for(let e=0;e<this.seeker.h;e++)for(let t=0;t<this.seeker.w;t++)r[e*this.seeker.w+t]&&this.viewpoints.push(this.seeker.centre(t,e));this.reach=r;let i=n.heightCell;this.tw=Math.ceil((t.maxX-t.minX)/i),this.th=Math.ceil((t.maxZ-t.minZ)/i),this.tops=new Float32Array(this.tw*this.th);for(let n of e){let[e,r,a,o]=n.kind===`box`?[n.minX,n.maxX,n.minZ,n.maxZ]:[n.x-n.r,n.x+n.r,n.z-n.r,n.z+n.r],s=Math.max(0,Math.floor((e-t.minX)/i)),c=Math.min(this.tw-1,Math.floor((r-t.minX)/i)),l=Math.max(0,Math.floor((a-t.minZ)/i)),u=Math.min(this.th-1,Math.floor((o-t.minZ)/i));for(let e=l;e<=u;e++)for(let r=s;r<=c;r++){if(n.kind===`circle`&&Math.hypot(t.minX+(r+.5)*i-n.x,t.minZ+(e+.5)*i-n.z)>n.r)continue;let a=e*this.tw+r;n.top>this.tops[a]&&(this.tops[a]=n.top)}}}topAt(e,t){let n=Math.floor((e-this.bounds.minX)/this.cfg.heightCell),r=Math.floor((t-this.bounds.minZ)/this.cfg.heightCell);return n<0||r<0||n>=this.tw||r>=this.th?0:this.tops[r*this.tw+n]}sees(e,t,n,r){let i=this.cfg,a=n-e,o=r-t,s=Math.hypot(a,o);if(s>i.range)return!1;let c=s-i.endMargin,l=Math.max(1,Math.ceil(Math.max(0,c)/i.losStep));for(let n of i.targetHeights){let r=!0;for(let u=1;u<=l;u++){let d=Math.min(c,u*c/l)/s||0;if(this.topAt(e+a*d,t+o*d)>i.eyeHeight+(n-i.eyeHeight)*d){r=!1;break}}if(r)return!0}return!1}reachable(e,t){let n=this.seeker.ix(e),r=this.seeker.iz(t);return n>=0&&r>=0&&n<this.seeker.w&&r<this.seeker.h&&this.reach[r*this.seeker.w+n]===1}seesFirmly(e,t,n,r,i=this.cfg.firmMargin){if(!this.sees(e,t,n,r))return!1;let a=0;for(let[o,s]of[[i,0],[-i,0],[0,i],[0,-i]])this.sees(e+o,t+s,n,r)&&a++;return a>=3}cellIndex(e,t){let n=this.player.ix(e),r=this.player.iz(t);return n<0||r<0||n>=this.player.w||r>=this.player.h?-1:this.cellAt[r*this.player.w+n]}visibleFrom(e,t,n=this.cfg.range,r,i,a=!1){let o=[];for(let s=0;s<this.cells.length;s++){let c=this.cells[s],l=Math.hypot(c.x-e,c.z-t);if(!(l>n)){if(r!==void 0&&i!==void 0&&l>.6){let n=Math.atan2(c.x-e,c.z-t)-r;if(Math.abs(Math.atan2(Math.sin(n),Math.cos(n)))>i)continue}(a?this.seesFirmly(e,t,c.x,c.z):this.sees(e,t,c.x,c.z))&&o.push(s)}}return o}viewCounts(e=1){let t=new Uint16Array(this.cells.length),n=this.cfg.range**2;for(let r=0;r<this.viewpoints.length;r+=e){let e=this.viewpoints[r];for(let r=0;r<this.cells.length;r++){let i=this.cells[r];(i.x-e.x)**2+(i.z-e.z)**2>n||this.sees(e.x,e.z,i.x,i.z)&&t[r]++}}return t}clusters(e,t=1){let n=new Uint8Array(this.cells.length),r=[],i=this.player.w;for(let a=0;a<this.cells.length;a++){if(n[a]||!e(a))continue;let o=[a];n[a]=1;let s=[];for(;o.length;){let r=o.pop();s.push(r);let a=this.cells[r];for(let r=-t;r<=t;r++)for(let s=-t;s<=t;s++){let t=a.ix+s,c=a.iz+r;if(t<0||c<0||t>=i||c>=this.player.h)continue;let l=this.cellAt[c*i+t];l<0||n[l]||!e(l)||(n[l]=1,o.push(l))}}let c=s.map(e=>this.cells[e].x),l=s.map(e=>this.cells[e].z);r.push({cells:s,area:s.length*this.cfg.cell**2,cx:c.reduce((e,t)=>e+t,0)/s.length,cz:l.reduce((e,t)=>e+t,0)/s.length,minX:Math.min(...c),maxX:Math.max(...c),minZ:Math.min(...l),maxZ:Math.max(...l)})}return r}deadZones(e){return this.clusters(t=>e[t]===0).sort((e,t)=>t.area-e.area)}thinZones(e){return this.clusters(t=>e[t]>0&&e[t]<=this.cfg.thin).sort((e,t)=>t.area-e.area)}corners(){let e=(e,t)=>this.player.isBlockedCell(e,t);return this.clusters(t=>{let{ix:n,iz:r}=this.cells[t];return(e(n-1,r)||e(n+1,r))&&(e(n,r-1)||e(n,r+1))},this.cfg.cornerMerge).map(e=>{let t=e.cells[0],n=1/0;for(let r of e.cells){let i=(this.cells[r].x-e.cx)**2+(this.cells[r].z-e.cz)**2;i<n&&(n=i,t=r)}return{x:this.cells[t].x,z:this.cells[t].z,cell:t}})}},Ra={max:60,fadeSeconds:10,width:.26,length:.5,footOffset:.16,lift:.03,color:`#f2e4c0`,opacity:.75};function za(){let e=document.createElement(`canvas`);e.width=64,e.height=128;let t=e.getContext(`2d`);t.fillStyle=`#fff`,t.beginPath(),t.ellipse(32,44,22,38,0,0,Math.PI*2),t.fill(),t.beginPath(),t.ellipse(32,104,16,18,0,0,Math.PI*2),t.fill();let n=new Pt(e);return n.colorSpace=o,n}var Ba=class{cfg;mesh;alpha;prints=[];yaws=[];slot=0;nextId=1;side=1;m=new je;q=new ge;e=new z;s=new Y(1,1,1);p=new Y;constructor(e,t=Ra){this.cfg=t;let n=new B(t.width,t.length).rotateX(-Math.PI/2);this.alpha=new Te(new Float32Array(t.max),1),n.setAttribute(`aAlpha`,this.alpha);let r=new H({color:t.color,map:za(),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});r.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
attribute float aAlpha;
varying float vAlpha;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vAlpha = aAlpha;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying float vAlpha;`).replace(`#include <color_fragment>`,`#include <color_fragment>
diffuseColor.a *= vAlpha;`)},r.customProgramCacheKey=()=>`footprint-fade`,this.mesh=new ce(n,r,t.max),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2,this.mesh.count=0,e.add(this.mesh)}add(e,t,n){let r=this.cfg;this.side=-this.side;let i=e+Math.cos(n)*r.footOffset*this.side,a=t-Math.sin(n)*r.footOffset*this.side,o={id:this.nextId++,x:i,z:a,age:0},s=this.slot;this.slot=(this.slot+1)%r.max,this.prints[s]=o,this.yaws[s]=n,this.e.set(0,n,0),this.q.setFromEuler(this.e),this.m.compose(this.p.set(i,r.lift,a),this.q,this.s),this.mesh.setMatrixAt(s,this.m),this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.count=Math.max(this.mesh.count,s+1),this.alpha.setX(s,r.opacity),this.alpha.needsUpdate=!0}update(e){let t=this.cfg,n=!1;for(let r=0;r<this.prints.length;r++){let i=this.prints[r];!i||i.age>=t.fadeSeconds||(i.age+=e,this.alpha.setX(r,i.age>=t.fadeSeconds?0:t.opacity*(1-i.age/t.fadeSeconds)),n=!0)}n&&(this.alpha.needsUpdate=!0)}list(){return this.prints.filter(e=>e&&e.age<this.cfg.fadeSeconds).sort((e,t)=>e.id-t.id)}clear(){for(let e=0;e<this.prints.length;e++)this.alpha.setX(e,0);this.prints=[],this.alpha.needsUpdate=!0,this.slot=0}},Va={openColor:`#6dff9a`,lockedColor:`#d8503a`,lockedGlow:.1,pulseLow:.55,pulseHz:1.6,height:3.1};function Ha(){let e=document.createElement(`canvas`);e.width=512,e.height=128;let t=e.getContext(`2d`);t.font=`900 78px "Arial Black", Impact, system-ui, sans-serif`,t.textAlign=`center`,t.textBaseline=`middle`,t.lineWidth=12,t.strokeStyle=`#0a2a14`,t.strokeText(`RUN HOME`,256,66),t.fillStyle=`#d8ffe3`,t.fillText(`RUN HOME`,256,66);let n=new Pt(e);return n.colorSpace=o,n}function Ua(e,t=Va){let n=new gt;n.position.set(e.x-.55,0,e.z);let r=e=>new H({color:t.lockedColor,transparent:!0,opacity:e,depthWrite:!1,blending:2,side:2}),i=e.halfWidth*2,a=new It(new B(i,t.height).rotateY(Math.PI/2).translate(0,t.height/2,0),r(.2)),o=new It(new B(1.4,i).rotateX(-Math.PI/2).translate(-.5,.05,0),r(.4)),s=[-1,1].map(n=>new It(new Qe(.09,.09,t.height,8,1,!0).translate(0,t.height/2,n*e.halfWidth),r(.6))),l=new Se(new Ee({map:Ha(),transparent:!0,depthWrite:!1,depthTest:!1}));l.scale.set(3.4,.85,1),l.position.set(-.3,t.height+.5,0),l.renderOrder=5,n.add(a,o,...s,l);let u=new c;return{group:n,update(e,r,i){if(n.visible=i,!i)return;let c=r?t.pulseLow+(1-t.pulseLow)*(.5+.5*Math.sin(e*Math.PI*2*t.pulseHz)):t.lockedGlow;u.set(r?t.openColor:t.lockedColor),a.material.color.copy(u),o.material.color.copy(u),a.material.opacity=.32*c,o.material.opacity=.7*c;for(let e of s)e.material.color.copy(u),e.material.opacity=c;l.visible=r,l.material.opacity=.75+.25*c}}}var Wa=Math.PI*2,Ga=e=>1-(1-Math.min(1,Math.max(0,e)))**3,Ka={sing_eyes_covered:e=>{let t=Math.sin(e*1.8);return{body:{rz:t*.035,rx:.02},head:{rz:-t*.1,ry:Math.sin(e*.9)*.1,py:Math.abs(Math.sin(e*3.6))*.012},shoulderL:{rx:-1.9,rz:.62},shoulderR:{rx:-1.9,rz:-.62},elbowL:{rx:-1.5},elbowR:{rx:-1.5},footL:{py:Math.max(0,t)*.03},footR:{py:Math.max(0,-t)*.03}}},search_walk:e=>{let t=e*Wa*.9,n=Math.sin(t);return{root:{py:Math.abs(Math.cos(t))*.02},body:{rx:.05,rz:n*.03},head:{ry:Math.sin(e*.8)*.75,rx:.05},shoulderL:{rx:n*.4,rz:-.3},shoulderR:{rx:-n*.4,rz:.3},elbowL:{rx:-.35},elbowR:{rx:-.35},footL:{pz:n*.18,py:Math.max(0,Math.cos(t))*.07},footR:{pz:-n*.18,py:Math.max(0,-Math.cos(t))*.07}}},look_around:e=>{let t=Math.sin(e*1.1);return{body:{ry:Math.sin(e*1.1-.7)*.25,rx:.03},head:{ry:t*1,rx:.04,rz:Math.sin(e*2.2)*.04},shoulderR:{rx:-2.3,rz:-.25},elbowR:{rx:-1.5},shoulderL:{rx:0,rz:-.5},elbowL:{rx:-.9}}},suspicious_lean:e=>({body:{rx:.3,rz:.03+Math.sin(e*1.3)*.015},head:{rx:.15,rz:.25,ry:Math.sin(e*.8)*.2},shoulderL:{rx:-1.7,rz:.4},elbowL:{rx:-2.1},shoulderR:{rx:.4,rz:-.25},elbowR:{rx:-.4},footL:{pz:.12},footR:{pz:-.06}}),catch_lunge:e=>{let t=Ga(e/.3);return{root:{py:.01*t},body:{rx:.4*t},head:{rx:-.2*t,ry:Math.sin(e*6)*.03*t},shoulderR:{rx:-1.75*t,rz:.12*t},elbowR:{rx:-.15*t},shoulderL:{rx:.35*t,rz:-.5*t},elbowL:{rx:-.4*t},footL:{pz:.26*t},footR:{pz:-.2*t}}},spin_wind:e=>{let t=Ga(e/.6),n=Math.sin(e*38)*.012*t;return{root:{py:-.05*t+n},body:{rx:-.08*t,rz:Math.sin(e*22)*.02*t},head:{rx:-.2*t},shoulderL:{rx:-1.2*t,rz:-1.15*t},shoulderR:{rx:-1.2*t,rz:1.15*t},elbowL:{rx:-.25*t},elbowR:{rx:-.25*t},footL:{pz:.1*t},footR:{pz:-.1*t}}},spin_sweep:e=>({root:{py:.05},body:{rz:Math.sin(e*18)*.02},head:{rx:-.15},shoulderL:{rx:-1.57,rz:-1.57},shoulderR:{rx:-1.57,rz:1.57},elbowL:{rx:-.05},elbowR:{rx:-.05},footL:{py:.05},footR:{py:.05}}),victory_dance:e=>{let t=e*Wa*1.4,n=Math.sin(t);return{root:{py:Math.abs(n)*.1,ry:e*4.5},body:{rz:n*.06},head:{rz:-n*.12,rx:-.1},shoulderL:{rx:-2.7,rz:-.55+n*.3},shoulderR:{rx:-2.7,rz:.55-n*.3},elbowL:{rx:-.3},elbowR:{rx:-.3},footL:{py:Math.max(0,n)*.08},footR:{py:Math.max(0,-n)*.08}}}},qa=`#8e1b1b`,Ja=`#2a2f72`,Ya=`#d4a017`,Xa=`#efe6d2`,Za=`#15151a`,Qa=`#1f4fb0`,$a=`#4a2a14`,eo=[qa,Ja,Ya,Xa,Za,Qa],to=1.72,no=1.5,ro=.36,io=.18,ao=[{n:12,r0:.26,R:.42,y:1.74,base:[Qa,Xa],hem:Ya,decor:!1,clearance:.47,fields:[],bar:!1,fringe:!1,trim:[Xa,Qa]},{n:16,r0:.29,R:.66,y:1.72,base:[qa,Za],hem:Xa,decor:!1,clearance:.4,fields:[1],bar:!1,fringe:!1,trim:[Qa,qa]},{n:22,r0:.32,R:.95,y:1.7,base:[qa,Qa,qa,Ja],hem:Ya,decor:!0,clearance:.32,fields:[1,2],bar:!0,fringe:!0,trim:[Qa,qa]}],oo={[qa]:[Za,Ya,Xa],[Qa]:[Za,qa,Ya],[Ja]:[Za,Ya,qa],[Za]:[qa,Ya,Za],[Xa]:[Qa,qa,Ya]},so=[.3,.3,.28,.12],co=so.length,lo=.022;function uo(){let e=new gt,t=new gt;e.add(t);let n={root:t},r=[],i=(e,t,i=0,a=0,o=0)=>{let s=new We;return r.push(s),s.position.set(i,a,o),t.add(s),n[e]=s,s},a=[],o=(e,t)=>{let n=Tt(e,t);return a.push(n),n},s=(e,t,n=0,r=0,i=0)=>{let a=new It(e,t);return a.position.set(n,r,i),a},l=i(`body`,t,0,0,0),u=i(`head`,l,0,to,0),d=i(`shoulderL`,l,-.36,no),f=i(`shoulderR`,l,ro,no),p=i(`elbowL`,d,0,-.42),h=i(`elbowR`,f,0,-.42),g=i(`footL`,t,-.16,.07,.04),_=i(`footR`,t,.16,.07,.04),v=o(Ya),y=o(`#14122a`,{side:2});l.add(s(nt(new Qe(.2,.455,1.7,12,1,!0)),y,0,1.15,0));let b=o(Za),x=o(Xa),S=o(qa);for(let e of[g,_]){e.add(s(nt(new Qe(.075,.088,.3,7)),b,0,.08,0)),e.add(s(nt(new Qe(.082,.082,.04,7)),v,0,.2,0)),e.add(s(nt(new Qe(.081,.085,.025,7)),S,0,.12,0));let t=s(nt(new k(.09,6,5)),b,0,-.02,.06);t.scale.set(1,.6,1.5);let n=s(nt(new k(.055,6,4)),x,0,-.02,.15);n.scale.set(1,.7,.9),e.add(t,n)}let C=o(qa),w=o($a);for(let[e,t]of[[d,p],[f,h]]){e.add(s(nt(new k(.09,6,5)),C)),e.add(s(nt(new Qe(.085,.07,.42,6).translate(0,-.21,0)),C)),t.add(s(nt(new Qe(.07,.095,.36,6).translate(0,-.18,0)),C)),t.add(s(nt(new Qe(.1,.1,.05,8)),v,0,-.34,0));let n=s(nt(new k(.075,6,5)),x,0,-.41,0);n.scale.set(1,1.5,.85),t.add(n)}let T=o(qa),E=s(nt(new k(.22,12,9)),T,0,io,0);E.scale.set(1,1.2,1.1),u.add(E),u.add(s(nt(new Qe(.15,.19,.08,10)),v,0,0,0)),u.add(s(nt(new Le(.2,.022,5,14)).rotateX(Math.PI/2),v,0,.31,0));let D=.16,O=.245,A=o(`#4a4a58`),ee=1.05,te=s(nt(new Qe(O,O,.2,12,1,!0,-1.05/2,ee)),o(`#0b0b10`,{side:2}),0,D,0);te.scale.z=1.1,u.add(te);let M=.249;for(let e=0;e<=8;e++){let t=-1.05/2+ee*e/8,n=s(new G(.006,.2,.006),A,Math.sin(t)*M,D,Math.cos(t)*M*1.1);n.rotation.y=t,u.add(n)}for(let e=0;e<=4;e++){let t=.06+.05*e;for(let e=0;e<8;e++){let n=-1.05/2+ee*e/8,r=-1.05/2+ee*(e+1)/8,i=(n+r)/2,a=2*M*Math.sin((r-n)/2),o=s(new G(a,.006,.006),A,Math.sin(i)*M,t,Math.cos(i)*M*1.1);o.rotation.y=i,u.add(o)}}let N=o(Xa),ne=nt(new k(.02,6,4)),P=(e,t,n,r=1)=>{let i=s(ne,N,Math.sin(e)*n,t,Math.cos(e)*n*1.1);i.rotation.y=e,i.scale.set(.85*r,1.25*r,.7*r),u.add(i)};for(let e=0;e<9;e++)P(-1.05/2+ee*e/8,.275,.261,1.1);for(let e=0;e<6;e++){let t=-.445+.89*e/5;for(let e=0;e<4;e++)P(t,.23-e*.045,.265)}u.add(s(nt(new Qe(.045,.07,.16,6)),w,0,.49,0));for(let e of[0,.07,.14])u.add(s(nt(new Le(.062-e*.15,.011,4,10)).rotateX(Math.PI/2),v,0,.42+e,0));let re=s(nt(new Qe(.12,.12,.035,12)),w,0,.69,0);re.rotation.x=Math.PI/2,u.add(re),u.add(s(nt(new Le(.12,.012,4,14)),v,0,.69,.022)),u.add(s(nt(new Le(.07,.01,4,12)),v,0,.69,.022)),u.add(s(nt(new k(.03,6,4)),o(qa),0,.69,.03)),u.add(s(nt(new Qe(.19,.17,.025,12)),w,0,.565,0)),u.add(s(nt(new Le(.185,.012,4,14)).rotateX(Math.PI/2),v,0,.58,0)),u.add(s(nt(new de(.04,.1,6)),w,0,.8600000000000001,0)),u.add(s(nt(new k(.03,6,5)),w,0,.9400000000000001,0)),u.add(s(nt(new de(.03,.05,5)),v,0,.9950000000000001,0));for(let e of[-1,1]){let t=s(new G(.075,.014,.014),w,e*.05,.91,0);t.rotation.z=e*.6,u.add(t)}let F=[],ie=[],I=[],L=[],ae=0;ao.forEach((e,t)=>{let n=e.y-e.clearance,r=Math.atan((e.R-e.r0)/n),i=Math.hypot(n,e.R-e.r0),a=Wa*e.r0/e.n*.95,o=Wa*e.R/e.n*1.22;for(let n=0;n<e.n;n++){let s=(n+t%2*.5)/e.n*Wa,c=new je().makeRotationY(s).setPosition(Math.sin(s)*e.r0,e.y,Math.cos(s)*e.r0),l=0,u=[],d=[],f=[];so.forEach(e=>{let t=i*e;u.push(t),d.push(a+(o-a)*(l/i)),l+=t,f.push(a+(o-a)*(l/i))});let p={anchor:c,slope:r,tier:t,base:ae,lens:u,top:d,bottom:f,ax:[-r,0,0,0],az:[0,0,0,0],vx:[0,0,0,0],vz:[0,0,0,0],phase:Math.random()*Wa,out:[Math.sin(s),Math.cos(s)],tiles:[],decors:[]},m=e.base[n%e.base.length];for(let t=0;t<co;t++)L.push(t===co-1?e.hem:m);ae+=co;let h=F.length;F.push(p);let g=e=>(d[e]+f[e])/2,[_,v,y]=oo[m];e.bar&&I.push({panel:h,seg:0,x:0,y:.1,w:g(0)*.7,h:u[0]*.12,rot:0,layer:0,color:Ya}),e.fields.forEach((e,t)=>{let n=g(e)*.76,r=Math.min(n*.62,u[e]*.3);I.push({panel:h,seg:e,x:0,y:.5,w:n,h:u[e]*.84,rot:0,layer:0,color:_}),I.push({panel:h,seg:e,x:0,y:.5,w:r,h:r,rot:Math.PI/4,layer:1,color:t%2?y:v}),I.push({panel:h,seg:e,x:0,y:.5,w:r*.45,h:r*.45,rot:Math.PI/4,layer:2,color:_})});let b=co-1;if(e.trim){let t=g(b)/5/Math.SQRT2;for(let n=0;n<5;n++)I.push({panel:h,seg:b,x:(n+.5)/5-.5,y:.5,w:t,h:t,rot:Math.PI/4,layer:0,color:e.trim[n%2]})}if(e.fringe){let t=.075;for(let n=0;n<6;n++)I.push({panel:h,seg:b,x:(n+.5)/6-.5,y:1+(t/2-.01)/u[b],w:g(b)/6*.4,h:t,rot:0,layer:-1,color:e.hem})}if(e.decor){let t=[.04,.055,.02],n=[.026,.026,.008];ie.push({panel:h,seg:0,x:-.2,y:.45,size:t},{panel:h,seg:0,x:.2,y:.75,size:t});for(let t of e.fields)for(let e of[-.3,.3])for(let r of[.12,.88])ie.push({panel:h,seg:t,x:e,y:r,size:n})}}}),I.forEach((e,t)=>F[e.panel].tiles.push(t)),ie.forEach((e,t)=>F[e.panel].decors.push(t));let oe=ae,R=new G(1,1,1).translate(0,-.5,0),se=new m({color:16777215,gradientMap:Pe()});a.push(se);let le=new Float32Array(oe);F.forEach(e=>{for(let t=0;t<co;t++)le[e.base+t]=e.top[t]/e.bottom[t]}),R.setAttribute(`aTaper`,new Te(le,1)),se.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
attribute float aTaper;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
transformed.x *= mix(aTaper, 1.0, clamp(-position.y, 0.0, 1.0));`)},se.customProgramCacheKey=()=>`egungun-panel-taper`;let B=new ce(R,se,oe),ue=new c;L.forEach((e,t)=>B.setColorAt(t,ue.set(e)));let V=new G(1,1,1),H=new ce(V,o(`#ffffff`),Math.max(1,I.length));I.forEach((e,t)=>H.setColorAt(t,ue.set(e.color)));let fe=nt(new k(1,6,4)),pe=new ce(fe,o(`#ffffff`),Math.max(1,ie.length));ie.forEach((e,t)=>pe.setColorAt(t,ue.set(e.size[2]>.01?Xa:Ya)));for(let e of[B,H,pe])e.instanceMatrix.setUsage(j),e.frustumCulled=!1,l.add(e);let me=Array.from({length:co},()=>new je),he=new je,_e=new je,ve=new z;function ye(){for(let e of F){he.copy(e.anchor);for(let t=0;t<co;t++)_e.makeRotationFromEuler(ve.set(e.ax[t],0,e.az[t])),t>0&&_e.setPosition(0,-e.lens[t-1],0),he.multiply(_e),me[t].copy(he),B.setMatrixAt(e.base+t,_e.copy(he).multiply(be.makeScale(e.bottom[t],e.lens[t],lo)));for(let t of e.tiles){let n=I[t],r=(e.top[n.seg]+e.bottom[n.seg])/2,i=n.layer<0?0:.013999999999999999+n.layer*.004;_e.copy(me[n.seg]).multiply(be.makeTranslation(n.x*r,-n.y*e.lens[n.seg],i)),_e.multiply(U.makeRotationZ(n.rot)),H.setMatrixAt(t,_e.multiply(be.makeScale(n.w,n.h,n.layer<0?lo:.006)))}for(let t of e.decors){let n=ie[t],r=(e.top[n.seg]+e.bottom[n.seg])/2;_e.copy(me[n.seg]).multiply(be.makeTranslation(n.x*r,-n.y*e.lens[n.seg],.023+n.size[2]*.5)),pe.setMatrixAt(t,_e.multiply(be.makeScale(n.size[0],n.size[1],n.size[2])))}}B.instanceMatrix.needsUpdate=!0,H.instanceMatrix.needsUpdate=!0,pe.instanceMatrix.needsUpdate=!0}let be=new je,U=new je,xe=Tt(`#ffffff`,{vertexColors:!0});a.push(xe);let Se=[],Ce=[];t.traverse(e=>{e instanceof It&&!e.isInstancedMesh&&(e.material===y?Se:Ce).push(e)});let W=K(t,r,[{meshes:Se,material:y,vertexColors:!1},{meshes:Ce,material:xe,vertexColors:!0}]),we=new Me(n,Ka,`search_walk`,.25);ye();let Ee=new Y,De=new Y,Oe=new ge,ke=new Y,q=new Y,Ae=new Y,J=0,Ne=0,Fe=0,Ie=!1,Re=new Y(0,1.72,0),ze=()=>new z().setFromQuaternion(t.getWorldQuaternion(Oe),`YXZ`).y,Be=6.2,Ve=[.05,.07,.09,.11],He=[.006,.01,.014,.018],Ue=[.5,1,1,1],Ge=e=>Math.max(-.5,Math.min(.5,e));function Ke(t){if(we.update(t),t=Math.min(t,1/30),t<=0)return;Fe+=t,l.localToWorld(De.copy(Re));let n=ze();Ie||=(Ee.copy(De),J=n,!0);let r=De.clone().sub(Ee).divideScalar(t);Ee.copy(De);let i=n-J;i=Math.atan2(Math.sin(i),Math.cos(i)),J=n,Ne+=(i/t-Ne)*.25,e.getWorldQuaternion(Oe).invert(),r.applyQuaternion(Oe),q.copy(ke),ke.lerp(r,.3),Ae.copy(ke).sub(q).divideScalar(t),Ae.clampLength(0,30);let a=Math.min(.33,Math.max(Math.abs(Ne)*.07,qe.lift*.28));for(let e of F){let[n,r]=e.out,i=ke.x*n+ke.z*r,o=ke.x*r-ke.z*n,s=Ae.x*n+Ae.z*r,c=Ae.x*r-Ae.z*n;for(let n=0;n<co;n++){let r=Math.sin(Fe*1.7+e.phase+n*.7)*(.012+.012*n),l=n===0?-e.slope:0,u=Ge(l+Ve[n]*i+He[n]*s-a*Ue[n]+r),d=Ge(Ve[n]*o+He[n]*c+Math.cos(Fe*1.3+e.phase)*.008*(n+1));e.vx[n]+=((u-e.ax[n])*40-e.vx[n]*Be)*t,e.vz[n]+=((d-e.az[n])*40-e.vz[n]*Be)*t,e.ax[n]+=e.vx[n]*t,e.az[n]+=e.vz[n]*t}}ye()}let qe={group:e,animator:we,lift:0,play:(e,t)=>we.play(e,t),update:Ke,dispose(){W.forEach(e=>e.geometry.dispose()),R.dispose(),fe.dispose(),V.dispose(),B.dispose(),H.dispose(),pe.dispose(),a.forEach(e=>e.dispose())}};return qe}function fo(e){e.setPixelRatio(Math.min(window.devicePixelRatio||1,2))}var po=Math.PI*2,mo=(e,t)=>e+Math.random()*(t-e);function ho(e){return new he({uniforms:{uScale:{value:500}},vertexShader:`
      uniform float uScale;
      attribute vec3 aColor;
      attribute float aSize;
      attribute float aAlpha;
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        vColor = aColor;
        vAlpha = aAlpha;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * uScale / max(0.1, -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,fragmentShader:`
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5 || vAlpha <= 0.002) discard;
        gl_FragColor = vec4(vColor, vAlpha * smoothstep(0.5, 0.3, d));
        #include <colorspace_fragment>
      }`,transparent:!0,depthWrite:!1,blending:e?2:1})}var go=class{capacity;points;material;pos;col;size;alpha;geo=new Lt;constructor(e,t){this.capacity=e,this.pos=new Float32Array(e*3),this.col=new Float32Array(e*3),this.size=new Float32Array(e),this.alpha=new Float32Array(e),this.geo.setAttribute(`position`,new Ot(this.pos,3).setUsage(j)),this.geo.setAttribute(`aColor`,new Ot(this.col,3).setUsage(j)),this.geo.setAttribute(`aSize`,new Ot(this.size,1).setUsage(j)),this.geo.setAttribute(`aAlpha`,new Ot(this.alpha,1).setUsage(j)),this.material=ho(t),this.points=new s(this.geo,this.material),this.points.frustumCulled=!1}set(e,t,n,r,i,a,o,s,c){let l=e*3;this.pos[l]=t,this.pos[l+1]=n,this.pos[l+2]=r,this.col[l]=i,this.col[l+1]=a,this.col[l+2]=o,this.size[e]=s,this.alpha[e]=c}setMotion(e,t,n,r,i,a){let o=e*3;this.pos[o]=t,this.pos[o+1]=n,this.pos[o+2]=r,this.size[e]=i,this.alpha[e]=a}hide(e){this.size[e]=0,this.alpha[e]=0}flush(e=!0){let t=this.geo.attributes;t.position.needsUpdate=!0,t.aSize.needsUpdate=!0,t.aAlpha.needsUpdate=!0,e&&(t.aColor.needsUpdate=!0)}dispose(){this.geo.dispose(),this.material.dispose()}},_o=320,vo=9,yo=class{pool=new go(_o,!1);vel=new Float32Array(_o*3);px=new Float32Array(_o*3);life=new Float32Array(_o);maxLife=new Float32Array(_o);size0=new Float32Array(_o);cursor=0;active=0;dirtyColors=!1;c=new c;constructor(){for(let e=0;e<_o;e++)this.pool.hide(e);this.pool.flush()}emit(e,t,n){this.c.set(t);for(let t=0;t<n;t++){let t=this.cursor;this.cursor=(this.cursor+1)%_o;let n=mo(0,po),r=mo(.2,1),i=mo(1.2,3.4),a=t*3;this.vel[a]=Math.cos(n)*i*(1-r*.5),this.vel[a+1]=r*i*1.4+.8,this.vel[a+2]=Math.sin(n)*i*(1-r*.5),this.px[a]=e.x+mo(-.04,.04),this.px[a+1]=e.y+mo(-.04,.04),this.px[a+2]=e.z+mo(-.04,.04);let o=mo(.85,1.15);this.maxLife[t]=this.life[t]=mo(.5,.9),this.size0[t]=mo(.05,.11),this.pool.set(t,this.px[a],this.px[a+1],this.px[a+2],Math.min(1,this.c.r*o),Math.min(1,this.c.g*o),Math.min(1,this.c.b*o),this.size0[t],1)}this.dirtyColors=!0,this.active=_o}update(e){if(!this.active)return;let t=0;for(let n=0;n<_o;n++){if(this.life[n]<=0)continue;if(this.life[n]-=e,this.life[n]<=0){this.pool.hide(n);continue}t++;let r=n*3;this.vel[r+1]-=vo*e,this.px[r]+=this.vel[r]*e,this.px[r+1]+=this.vel[r+1]*e,this.px[r+2]+=this.vel[r+2]*e,this.px[r+1]<.02&&(this.px[r+1]=.02,this.vel[r]*=.4,this.vel[r+1]=0,this.vel[r+2]*=.4);let i=this.life[n]/this.maxLife[n];this.pool.setMotion(n,this.px[r],this.px[r+1],this.px[r+2],this.size0[n]*(.4+.6*i),Math.min(1,i*2))}this.pool.flush(this.dirtyColors),this.dirtyColors=!1,this.active=t}},bo=160,xo=class{mesh;geo=new B(.07,.24);mat=Tt(`#ffffff`,{side:2});pos=new Float32Array(480);vel=new Float32Array(480);rot=new Float32Array(480);spin=new Float32Array(480);life=new Float32Array(bo);cursor=0;active=0;dummy=new F;c=new c;t=0;constructor(){this.mesh=new ce(this.geo,this.mat,bo),this.mesh.instanceMatrix.setUsage(j),this.mesh.frustumCulled=!1,this.dummy.scale.setScalar(0),this.dummy.updateMatrix();for(let e=0;e<bo;e++)this.mesh.setMatrixAt(e,this.dummy.matrix),this.mesh.setColorAt(e,this.c.set(`#ffffff`))}burst(e,t,n){for(let r=0;r<n;r++){let n=this.cursor;this.cursor=(this.cursor+1)%bo;let r=mo(0,po),i=mo(.8,3.2),a=n*3;this.pos[a]=e.x,this.pos[a+1]=e.y,this.pos[a+2]=e.z,this.vel[a]=Math.cos(r)*i,this.vel[a+1]=mo(3.5,7),this.vel[a+2]=Math.sin(r)*i;for(let e=0;e<3;e++)this.rot[a+e]=mo(0,po),this.spin[a+e]=mo(-9,9);this.life[n]=mo(2.2,3.2),this.mesh.setColorAt(n,this.c.set(t[Math.random()*t.length|0]))}this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0),this.active=bo}update(e){if(!this.active)return;this.t+=e;let t=0,n=this.dummy;for(let r=0;r<bo;r++){if(this.life[r]<=0)continue;this.life[r]-=e;let i=r*3;if(this.life[r]<=0)n.scale.setScalar(0),n.updateMatrix(),this.mesh.setMatrixAt(r,n.matrix);else{if(t++,this.pos[i+1]<=.015)this.rot[i]+=(-Math.PI/2-this.rot[i])*Math.min(1,e*10);else{this.vel[i+1]=Math.max(this.vel[i+1]-9*e,-1.1);let t=Math.exp(-2.2*e);this.vel[i]=this.vel[i]*t+Math.sin(this.t*5+r)*.5*e,this.vel[i+2]=this.vel[i+2]*t+Math.cos(this.t*4+r)*.5*e,this.pos[i]+=this.vel[i]*e,this.pos[i+1]=Math.max(.015,this.pos[i+1]+this.vel[i+1]*e),this.pos[i+2]+=this.vel[i+2]*e,this.rot[i]+=this.spin[i]*e,this.rot[i+1]+=this.spin[i+1]*e,this.rot[i+2]+=this.spin[i+2]*e}n.position.set(this.pos[i],this.pos[i+1],this.pos[i+2]),n.rotation.set(this.rot[i],this.rot[i+1],this.rot[i+2]),n.scale.setScalar(Math.min(1,this.life[r]/.5)),n.updateMatrix(),this.mesh.setMatrixAt(r,n.matrix)}}this.mesh.instanceMatrix.needsUpdate=!0,this.active=t}dispose(){this.geo.dispose(),this.mat.dispose(),this.mesh.dispose()}},So=140,Co=class{pool=new go(So,!0);base=new Float32Array(420);phase=new Float32Array(420);beam=new Float32Array(So);t=0;center=new Y(0,1.6,0);size=new Y(14,3.2,8);lightDir=new Y(-.5,-1,-.6).normalize();constructor(){this.scatter()}setArea(e,t,n){this.center.copy(e),this.size.copy(t),n&&this.lightDir.copy(n).normalize(),this.scatter()}scatter(){let e=new Y,t=new Y,n=new c(`#ffe9b0`);for(let r=0;r<So;r++){let i=r*3;this.base[i]=this.center.x+mo(-.5,.5)*this.size.x,this.base[i+1]=this.center.y+mo(-.5,.5)*this.size.y,this.base[i+2]=this.center.z+mo(-.5,.5)*this.size.z;for(let e=0;e<3;e++)this.phase[i+e]=mo(0,po);e.set(this.base[i],this.base[i+1],this.base[i+2]),t.copy(e).sub(this.center);let a=t.dot(this.lightDir),o=t.addScaledVector(this.lightDir,-a).length();this.beam[r]=.3+.7*Math.exp(-(o*o)/5),this.pool.set(r,e.x,e.y,e.z,n.r,n.g,n.b,mo(.025,.06),0)}this.pool.flush()}update(e){this.t+=e;let t=this.t;for(let e=0;e<So;e++){let n=e*3,r=this.phase,i=this.base[n]+Math.sin(t*.21+r[n])*.5+t*.03*Math.sin(r[n+1]),a=this.base[n+1]+Math.sin(t*.33+r[n+1])*.25,o=this.base[n+2]+Math.sin(t*.17+r[n+2])*.5,s=.5+.5*Math.sin(t*.9+r[n+2]*3);this.pool.setMotion(e,i,a,o,.02+.025*(e%5/4),this.beam[e]*(.15+.45*s))}this.pool.flush(!1)}},wo=new c(`#ffd84a`),To=new c(`#ff2a1c`);function Eo(e,t,n=28){let r=At.degToRad(t)/2,i=[0,0,0],a=[];for(let t=0;t<=n;t++){let o=-r+2*r*t/n;i.push(Math.sin(o)*e,0,Math.cos(o)*e),t>0&&a.push(0,t+1,t)}let o=new Lt;o.setAttribute(`position`,new C(i,3)),o.setIndex(a);let s=new he({uniforms:{uColor:{value:wo.clone()},uRange:{value:e},uHalf:{value:r},uAlpha:{value:.4}},vertexShader:`
      varying vec2 vP;
      void main() {
        vP = position.xz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,fragmentShader:`
      uniform vec3 uColor;
      uniform float uRange, uHalf, uAlpha;
      varying vec2 vP;
      void main() {
        float dist = length(vP) / uRange;
        float ang = abs(atan(vP.x, vP.y)) / uHalf;
        float radial = pow(1.0 - smoothstep(0.0, 1.0, dist), 0.8);
        float edge = 1.0 - smoothstep(0.7, 1.0, ang);
        float a = uAlpha * radial * edge * (0.6 + 0.4 * (1.0 - dist));
        gl_FragColor = vec4(uColor, a);
        #include <colorspace_fragment>
      }`,transparent:!0,depthWrite:!1,side:2,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),c=new It(o,s);c.position.y=.03,c.renderOrder=1,c.frustumCulled=!1;let l=0,u=0,d=()=>{s.uniforms.uColor.value.copy(wo).lerp(To,l);let e=l>.75?.1*Math.sin(u*14)*(l-.75)*4:0;s.uniforms.uAlpha.value=.34+.34*l+e};return d(),{mesh:c,setSuspicion(e){l=Math.min(1,Math.max(0,e)),d()},tick(e){u+=e,l>.75&&d()},dispose(){o.dispose(),s.dispose()}}}function Do(){let e=document.createElement(`canvas`);e.width=128,e.height=256;let t=e.getContext(`2d`),n=()=>{t.beginPath(),t.moveTo(35.84,25.6),t.quadraticCurveTo(64,10.24,92.16,25.6),t.lineTo(74.24,168.96),t.lineTo(53.76,168.96),t.closePath()},r=()=>{t.beginPath(),t.arc(64,209.92,14.72,0,po)};t.lineJoin=`round`,t.strokeStyle=`#000`,t.lineWidth=18,n(),t.stroke(),r(),t.stroke(),t.fillStyle=`#fff`,n(),t.fill(),r(),t.fill();let i=new Pt(e);return i.colorSpace=``,i}function Oo(){let e=Do(),t=new he({uniforms:{uMap:{value:e},uFill:{value:0},uLow:{value:wo.clone()},uHigh:{value:To.clone()}},vertexShader:`
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
      uniform sampler2D uMap;
      uniform float uFill;
      uniform vec3 uLow, uHigh;
      varying vec2 vUv;
      void main() {
        vec4 t = texture2D(uMap, vUv);
        if (t.a < 0.05) discard;
        float f = mix(0.1, 0.9, uFill);
        float on = step(vUv.y, f);
        vec3 fillCol = mix(uLow, uHigh, uFill);
        vec3 inner = mix(vec3(0.22), fillCol, on);
        gl_FragColor = vec4(mix(vec3(0.0), inner, t.r), t.a);
        #include <colorspace_fragment>
      }`,transparent:!0,depthWrite:!1,depthTest:!1}),n=new B(.5,1),r=new It(n,t);r.renderOrder=10,r.visible=!1,r.frustumCulled=!1;let i=0,a=0,o=new ge;return{mesh:r,set(e){i=Math.min(1,Math.max(0,e)),t.uniforms.uFill.value=i,r.visible=i>.01},tick(e,t){if(!r.visible)return;a+=e,r.parent?(r.parent.getWorldQuaternion(o).invert(),r.quaternion.copy(o).multiply(t.quaternion)):r.quaternion.copy(t.quaternion);let n=i>.92?1+.12*Math.sin(a*16):1;r.scale.setScalar(n)},dispose(){n.dispose(),t.dispose(),e.dispose()}}}var ko=class{splash=new yo;confetti=new xo;dust=new Co;cones=[];indicators=[];baseDrawCalls=3;constructor(e){e.add(this.splash.pool.points,this.confetti.mesh,this.dust.pool.points)}paintSplash(e,t,n=28){this.splash.emit(e,t,n)}caughtBurst(e,t=eo,n=70){this.confetti.burst(e,t,n)}addVisionCone(e,t=5,n=70){let r=Eo(t,n);return e.add(r.mesh),this.cones.push(r),r}removeVisionCone(e){e.mesh.parent?.remove(e.mesh),this.cones=this.cones.filter(t=>t!==e),e.dispose()}addSuspicionIndicator(e,t=3.15){let n=Oo();return n.mesh.position.y=t,e.add(n.mesh),this.indicators.push(n),n}update(e,t,n){let r=n.domElement.height/(2*Math.tan(At.degToRad(t.fov)/2));this.splash.pool.material.uniforms.uScale.value=r,this.dust.pool.material.uniforms.uScale.value=r,this.splash.update(e),this.confetti.update(e),this.dust.update(e);for(let t of this.cones)t.tick(e);for(let n of this.indicators)n.tick(e,t)}dispose(){this.splash.pool.dispose(),this.confetti.dispose(),this.dust.pool.dispose(),this.cones.forEach(e=>e.dispose()),this.indicators.forEach(e=>e.dispose())}},Ao=(e,t,n,r,i=!1,a=1/0,o=!1)=>({kind:`box`,minX:Math.min(e,n),maxX:Math.max(e,n),minZ:Math.min(t,r),maxZ:Math.max(t,r),wall:i,top:a,climb:o}),jo=(e,t,n,r=1/0,i=!1)=>({kind:`circle`,x:e,z:t,r:n,top:r,climb:i}),Mo=2.8,No=4.8,Po=.3,Fo=22,Io=7,Lo=.1,Ro=.12,zo=13,Bo=16,Vo=3.5,Ho=.1,Uo=(e,t)=>!e.climb||t+.55<e.top;function Wo(e,t,n,r,i,a,o){let s=e+n*(a+.12),c=t+r*(a+.12),l=null;for(let e of o)!e.climb||i+.55>=e.top||e.top-i>1.5||(e.kind===`box`?s>=e.minX&&s<=e.maxX&&c>=e.minZ&&c<=e.maxZ:Math.hypot(s-e.x,c-e.z)<=e.r)&&(l===null||e.top<l)&&(l=e.top);return l}function Go(e,t,n,r){let i=0,a=.12;for(let o of r)!o.climb||o.top>n+.55+.001||o.top<=i||(o.kind===`box`?e>=o.minX-a&&e<=o.maxX+a&&t>=o.minZ-a&&t<=o.maxZ+a:Math.hypot(e-o.x,t-o.z)<=o.r+a)&&(i=o.top);return i}function Ko(e,t,n){let r=null;for(let i of n){if(i.kind!==`box`||!i.wall)continue;let n=Math.min(i.maxX,Math.max(i.minX,e.x)),a=Math.min(i.maxZ,Math.max(i.minZ,e.z)),o=e.x-n,s=e.z-a,c=Math.hypot(o,s);c>t||r&&c>=r.distance||c<1e-6||(r={distance:c,normal:{x:o/c,z:s/c},point:{x:n,z:a}})}return r}function qo(e,t,n,r=0){let i=!1;for(let a=0;a<3;a++){let a=!1;for(let o of n)if(Uo(o,r)){if(o.kind===`box`){let n=Math.min(o.maxX,Math.max(o.minX,e.x)),r=Math.min(o.maxZ,Math.max(o.minZ,e.z)),s=e.x-n,c=e.z-r,l=s*s+c*c;if(l>=t*t)continue;if(a=i=!0,l>1e-10){let i=Math.sqrt(l);e.x=n+s/i*t,e.z=r+c/i*t}else{let n=e.x-o.minX,r=o.maxX-e.x,i=e.z-o.minZ,a=o.maxZ-e.z,s=Math.min(n,r,i,a);s===n?e.x=o.minX-t:s===r?e.x=o.maxX+t:e.z=s===i?o.minZ-t:o.maxZ+t}}else{let n=e.x-o.x,r=e.z-o.z,s=t+o.r,c=n*n+r*r;if(c>=s*s)continue;a=i=!0;let l=Math.sqrt(c)||1e-5;e.x=o.x+n/l*s,e.z=o.z+r/l*s}}if(!a)break}return i}var Jo=class e{el;keys=new Set;pointer=null;stick;knob;override=null;blocked=null;jumpQueued=!1;queueJump(){this.jumpQueued=!0}static STICK_RADIUS=64;constructor(e){this.el=e,addEventListener(`keydown`,e=>{e.target instanceof HTMLInputElement||(e.code===`Space`&&(e.preventDefault(),e.repeat||(this.jumpQueued=!0)),this.keys.add(e.code))}),addEventListener(`keyup`,e=>this.keys.delete(e.code)),addEventListener(`blur`,()=>{this.keys.clear(),this.pointer=null,this.showStick(!1)}),e.style.touchAction=`none`,e.addEventListener(`pointerdown`,t=>{this.pointer||this.blocked?.()||(this.pointer={id:t.pointerId,ox:t.clientX,oy:t.clientY,x:t.clientX,y:t.clientY},e.setPointerCapture(t.pointerId),this.showStick(!0))}),e.addEventListener(`pointermove`,e=>{this.pointer?.id===e.pointerId&&(this.pointer.x=e.clientX,this.pointer.y=e.clientY,this.moveStick())});let t=e=>{this.pointer?.id===e.pointerId&&(this.pointer=null,this.showStick(!1))};e.addEventListener(`pointerup`,t),e.addEventListener(`pointercancel`,t),this.stick=document.createElement(`div`),this.stick.style.cssText=`position:fixed;width:128px;height:128px;margin:-64px 0 0 -64px;border-radius:50%;border:2px solid rgba(255,255,255,.55);background:rgba(255,255,255,.12);pointer-events:none;display:none;z-index:5`,this.knob=document.createElement(`div`),this.knob.style.cssText=`position:absolute;left:44px;top:44px;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.7)`,this.stick.appendChild(this.knob),document.body.appendChild(this.stick)}showStick(e){this.stick.style.display=e?`block`:`none`,e&&this.pointer&&(this.stick.style.left=`${this.pointer.ox}px`,this.stick.style.top=`${this.pointer.oy}px`,this.knob.style.transform=`translate(0,0)`)}moveStick(){let t=this.pointer;if(!t)return;let n=t.x-t.ox,r=t.y-t.oy,i=Math.hypot(n,r);i>e.STICK_RADIUS&&(n=n/i*e.STICK_RADIUS,r=r/i*e.STICK_RADIUS),this.knob.style.transform=`translate(${n}px,${r}px)`}read(){let e=this.readMove();return this.jumpQueued&&(this.jumpQueued=!1,e.jump=!0),e}readMove(){if(this.override)return{...this.override};let t=0,n=0,r=this.keys;(r.has(`KeyA`)||r.has(`ArrowLeft`))&&--t,(r.has(`KeyD`)||r.has(`ArrowRight`))&&(t+=1),(r.has(`KeyW`)||r.has(`ArrowUp`))&&--n,(r.has(`KeyS`)||r.has(`ArrowDown`))&&(n+=1);let i=r.has(`ShiftLeft`)||r.has(`ShiftRight`);if(t||n){let e=Math.hypot(t,n);return{x:t/e,y:n/e,run:i}}let a=this.pointer;if(a){let t=a.x-a.ox,n=a.y-a.oy,r=Math.hypot(t,n);if(r>8){let a=Math.min(1,(r-8)/(e.STICK_RADIUS-8)),o=a**1.25;return i=a>.85,{x:t/r*o,y:n/r*o,run:i}}}return{x:0,y:0,run:!1}}},Yo=class{pos;vx=0;vz=0;vy=0;grounded=!0;radius=Po;coyote=Lo;jumpBuffer=0;pushT=0;climbing=!1;constructor(e){this.pos=e}get speed(){return Math.hypot(this.vx,this.vz)}update(e,t,n,r){let i=Math.hypot(e.x,e.y),a=Math.min(1,i),o=a>.01,s=0,c=0;if(o){let t=e.run?No:Mo*Math.max(.5,a);s=e.x/i*t,c=e.y/i*t}let l=this.grounded?o?zo:Bo:Vo,u=1-Math.exp(-l*t);if(this.vx+=(s-this.vx)*u,this.vz+=(c-this.vz)*u,!o&&Math.hypot(this.vx,this.vz)<.12&&(this.vx=this.vz=0),o&&this.grounded&&!e.jump){let r=Wo(this.pos.x,this.pos.z,e.x/i,e.y/i,this.pos.y,this.radius,n);this.pushT=r===null?0:this.pushT+t,r!==null&&this.pushT>=Ho&&(this.vy=Math.sqrt(44*(r-this.pos.y+.14)),this.pos.y+=.01,this.grounded=!1,this.coyote=0,this.pushT=0,this.climbing=!0)}else o||(this.pushT=0);this.grounded&&(this.climbing=!1);let d=this.pos.x,f=this.pos.z,p={x:d,z:f},m=Math.max(1,Math.ceil(this.speed*t/.12));for(let e=0;e<m;e++)p.x+=this.vx*t/m,p.z+=this.vz*t/m,qo(p,this.radius,n,this.pos.y),p.x=Math.min(r.maxX,Math.max(r.minX,p.x)),p.z=Math.min(r.maxZ,Math.max(r.minZ,p.z));t>1e-4&&(this.vx=(p.x-d)/t,this.vz=(p.z-f)/t),this.pos.x=p.x,this.pos.z=p.z;let h=Go(p.x,p.z,this.pos.y,n);this.pos.y<h?(this.pos.y=Math.min(h,this.pos.y+Math.max(.2,h-this.pos.y)*Math.min(1,t*14)),h-this.pos.y<.005&&(this.pos.y=h),this.vy=0,this.grounded=!0):this.pos.y>h+1e-4?(this.vy-=Fo*t,this.pos.y+=this.vy*t,this.grounded=!1,this.pos.y<=h&&(this.pos.y=h,this.vy=0,this.grounded=!0)):(this.grounded=!0,this.vy=0),this.coyote=this.grounded?Lo:Math.max(0,this.coyote-t),this.jumpBuffer=e.jump?Ro:Math.max(0,this.jumpBuffer-t),this.jumpBuffer>0&&this.coyote>0&&(this.vy=Io,this.pos.y+=.01,this.grounded=!1,this.coyote=0,this.jumpBuffer=0);let g=o?Math.atan2(e.x,e.y):this.speed>.6?Math.atan2(this.vx,this.vz):null;return{speed:this.speed,heading:g,grounded:this.grounded,vy:this.vy}}};function Xo(e){let t=new Map,n=new Map,r=e.clone();return Zo(e,r,function(e,r){t.set(r,e),n.set(e,r)}),r.traverse(function(e){if(!e.isSkinnedMesh)return;let r=e,i=t.get(e),a=i.skeleton.bones;r.skeleton=i.skeleton.clone(),r.bindMatrix.copy(i.bindMatrix),r.skeleton.bones=a.map(function(e){return n.get(e)}),r.bind(r.skeleton,r.bindMatrix)}),r}function Zo(e,t,n){n(e,t);for(let r=0;r<e.children.length;r++)Zo(e.children[r],t.children[r],n)}var Qo=class extends Ke{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new as(e)}),this.register(function(e){return new os(e)}),this.register(function(e){return new hs(e)}),this.register(function(e){return new gs(e)}),this.register(function(e){return new _s(e)}),this.register(function(e){return new cs(e)}),this.register(function(e){return new ls(e)}),this.register(function(e){return new us(e)}),this.register(function(e){return new ds(e)}),this.register(function(e){return new is(e)}),this.register(function(e){return new fs(e)}),this.register(function(e){return new ss(e)}),this.register(function(e){return new ms(e)}),this.register(function(e){return new ps(e)}),this.register(function(e){return new ns(e)}),this.register(function(e){return new vs(e,ts.EXT_MESHOPT_COMPRESSION)}),this.register(function(e){return new vs(e,ts.KHR_MESHOPT_COMPRESSION)}),this.register(function(e){return new ys(e)})}load(e,t,n,r){let i=this,a;if(this.resourcePath!==``)a=this.resourcePath;else if(this.path!==``){let t=Ue.extractUrlBase(e);a=Ue.resolveURL(t,this.path)}else a=Ue.extractUrlBase(e);this.manager.itemStart(e);let o=function(t){r?r(t):console.error(t),i.manager.itemError(e),i.manager.itemEnd(e)},s=new _e(this.manager);s.setPath(this.path),s.setResponseType(`arraybuffer`),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,function(n){try{i.parse(n,a,function(n){t(n),i.manager.itemEnd(e)},o)}catch(e){o(e)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let i,a={},o={},s=new TextDecoder;if(typeof e==`string`)i=JSON.parse(e);else if(e instanceof ArrayBuffer){if(s.decode(new Uint8Array(e,0,4))===bs){try{a[ts.KHR_BINARY_GLTF]=new Cs(e)}catch(e){r&&r(e);return}i=JSON.parse(a[ts.KHR_BINARY_GLTF].content)}else i=JSON.parse(s.decode(e))}else i=e;if(i.asset===void 0||i.asset.version[0]<2){r&&r(Error(`THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.`));return}let c=new Ys(i,{path:t||this.resourcePath||``,crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let e=0;e<this.pluginCallbacks.length;e++){let t=this.pluginCallbacks[e](c);t.name||console.error(`THREE.GLTFLoader: Invalid plugin found: missing name`),o[t.name]=t,a[t.name]=!0}if(i.extensionsUsed)for(let e=0;e<i.extensionsUsed.length;++e){let t=i.extensionsUsed[e],n=i.extensionsRequired||[];switch(t){case ts.KHR_MATERIALS_UNLIT:a[t]=new rs;break;case ts.KHR_DRACO_MESH_COMPRESSION:a[t]=new ws(i,this.dracoLoader);break;case ts.KHR_TEXTURE_TRANSFORM:a[t]=new Ts;break;case ts.KHR_MESH_QUANTIZATION:a[t]=new Es;break;default:n.indexOf(t)>=0&&o[t]===void 0&&console.warn(`THREE.GLTFLoader: Unknown extension "`+t+`".`)}}c.setExtensions(a),c.setPlugins(o),c.parse(n,r)}parseAsync(e,t){let n=this;return new Promise(function(r,i){n.parse(e,t,r,i)})}};function $o(){let e={};return{get:function(t){return e[t]},add:function(t,n){e[t]=n},remove:function(t){delete e[t]},removeAll:function(){e={}}}}function es(e,t,n){let r=e.json.materials[t];return r.extensions&&r.extensions[n]?r.extensions[n]:null}var ts={KHR_BINARY_GLTF:`KHR_binary_glTF`,KHR_DRACO_MESH_COMPRESSION:`KHR_draco_mesh_compression`,KHR_LIGHTS_PUNCTUAL:`KHR_lights_punctual`,KHR_MATERIALS_CLEARCOAT:`KHR_materials_clearcoat`,KHR_MATERIALS_DISPERSION:`KHR_materials_dispersion`,KHR_MATERIALS_IOR:`KHR_materials_ior`,KHR_MATERIALS_SHEEN:`KHR_materials_sheen`,KHR_MATERIALS_SPECULAR:`KHR_materials_specular`,KHR_MATERIALS_TRANSMISSION:`KHR_materials_transmission`,KHR_MATERIALS_IRIDESCENCE:`KHR_materials_iridescence`,KHR_MATERIALS_ANISOTROPY:`KHR_materials_anisotropy`,KHR_MATERIALS_UNLIT:`KHR_materials_unlit`,KHR_MATERIALS_VOLUME:`KHR_materials_volume`,KHR_TEXTURE_BASISU:`KHR_texture_basisu`,KHR_TEXTURE_TRANSFORM:`KHR_texture_transform`,KHR_MESH_QUANTIZATION:`KHR_mesh_quantization`,KHR_MATERIALS_EMISSIVE_STRENGTH:`KHR_materials_emissive_strength`,EXT_MATERIALS_BUMP:`EXT_materials_bump`,EXT_TEXTURE_WEBP:`EXT_texture_webp`,EXT_TEXTURE_AVIF:`EXT_texture_avif`,EXT_MESHOPT_COMPRESSION:`EXT_meshopt_compression`,KHR_MESHOPT_COMPRESSION:`KHR_meshopt_compression`,EXT_MESH_GPU_INSTANCING:`EXT_mesh_gpu_instancing`},ns=class{constructor(e){this.parser=e,this.name=ts.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n=`light:`+e,r=t.cache.get(n);if(r)return r;let i=t.json,a=((i.extensions&&i.extensions[this.name]||{}).lights||[])[e],o,s=new c(16777215);a.color!==void 0&&s.setRGB(a.color[0],a.color[1],a.color[2],ht);let l=a.range===void 0?0:a.range;switch(a.type){case`directional`:o=new E(s),o.target.position.set(0,0,-1),o.add(o.target);break;case`point`:o=new Vt(s),o.distance=l;break;case`spot`:o=new we(s),o.distance=l,a.spot=a.spot||{},a.spot.innerConeAngle=a.spot.innerConeAngle===void 0?0:a.spot.innerConeAngle,a.spot.outerConeAngle=a.spot.outerConeAngle===void 0?Math.PI/4:a.spot.outerConeAngle,o.angle=a.spot.outerConeAngle,o.penumbra=1-a.spot.innerConeAngle/a.spot.outerConeAngle,o.target.position.set(0,0,-1),o.add(o.target);break;default:throw Error(`THREE.GLTFLoader: Unexpected light type: `+a.type)}return o.position.set(0,0,0),Vs(o,a),a.intensity!==void 0&&(o.intensity=a.intensity),o.name=t.createUniqueName(a.name||`light_`+e),r=Promise.resolve(o),t.cache.add(n,r),r}getDependency(e,t){if(e===`light`)return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],i=(r.extensions&&r.extensions[this.name]||{}).light;return i===void 0?null:this._loadLight(i).then(function(e){return n._getNodeRef(t.cache,i,e)})}},rs=class{constructor(){this.name=ts.KHR_MATERIALS_UNLIT}getMaterialType(){return H}extendParams(e,t,n){let r=[];e.color=new c(1,1,1),e.opacity=1;let i=t.pbrMetallicRoughness;if(i){if(Array.isArray(i.baseColorFactor)){let t=i.baseColorFactor;e.color.setRGB(t[0],t[1],t[2],ht),e.opacity=t[3]}i.baseColorTexture!==void 0&&r.push(n.assignTexture(e,`map`,i.baseColorTexture,o))}return Promise.all(r)}},is=class{constructor(e){this.parser=e,this.name=ts.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=es(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},as=class{constructor(e){this.parser=e,this.name=ts.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return es(this.parser,e,this.name)===null?null:pe}extendMaterialParams(e,t){let n=es(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatMap`,n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatRoughnessMap`,n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(r.push(this.parser.assignTexture(t,`clearcoatNormalMap`,n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let e=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ze(e,e)}return Promise.all(r)}},os=class{constructor(e){this.parser=e,this.name=ts.KHR_MATERIALS_DISPERSION}getMaterialType(e){return es(this.parser,e,this.name)===null?null:pe}extendMaterialParams(e,t){let n=es(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion===void 0?0:n.dispersion),Promise.resolve()}},ss=class{constructor(e){this.parser=e,this.name=ts.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return es(this.parser,e,this.name)===null?null:pe}extendMaterialParams(e,t){let n=es(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceMap`,n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceThicknessMap`,n.iridescenceThicknessTexture)),Promise.all(r)}},cs=class{constructor(e){this.parser=e,this.name=ts.KHR_MATERIALS_SHEEN}getMaterialType(e){return es(this.parser,e,this.name)===null?null:pe}extendMaterialParams(e,t){let n=es(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(t.sheenColor=new c(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let e=n.sheenColorFactor;t.sheenColor.setRGB(e[0],e[1],e[2],ht)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenColorMap`,n.sheenColorTexture,o)),n.sheenRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenRoughnessMap`,n.sheenRoughnessTexture)),Promise.all(r)}},ls=class{constructor(e){this.parser=e,this.name=ts.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return es(this.parser,e,this.name)===null?null:pe}extendMaterialParams(e,t){let n=es(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&r.push(this.parser.assignTexture(t,`transmissionMap`,n.transmissionTexture)),Promise.all(r)}},us=class{constructor(e){this.parser=e,this.name=ts.KHR_MATERIALS_VOLUME}getMaterialType(e){return es(this.parser,e,this.name)===null?null:pe}extendMaterialParams(e,t){let n=es(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.thickness=n.thicknessFactor===void 0?0:n.thicknessFactor,n.thicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`thicknessMap`,n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let i=n.attenuationColor||[1,1,1];return t.attenuationColor=new c().setRGB(i[0],i[1],i[2],ht),Promise.all(r)}},ds=class{constructor(e){this.parser=e,this.name=ts.KHR_MATERIALS_IOR}getMaterialType(e){return es(this.parser,e,this.name)===null?null:pe}extendMaterialParams(e,t){let n=es(this.parser,e,this.name);return n===null||(t.ior=n.ior===void 0?1.5:n.ior,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},fs=class{constructor(e){this.parser=e,this.name=ts.KHR_MATERIALS_SPECULAR}getMaterialType(e){return es(this.parser,e,this.name)===null?null:pe}extendMaterialParams(e,t){let n=es(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.specularIntensity=n.specularFactor===void 0?1:n.specularFactor,n.specularTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularIntensityMap`,n.specularTexture));let i=n.specularColorFactor||[1,1,1];return t.specularColor=new c().setRGB(i[0],i[1],i[2],ht),n.specularColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularColorMap`,n.specularColorTexture,o)),Promise.all(r)}},ps=class{constructor(e){this.parser=e,this.name=ts.EXT_MATERIALS_BUMP}getMaterialType(e){return es(this.parser,e,this.name)===null?null:pe}extendMaterialParams(e,t){let n=es(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return t.bumpScale=n.bumpFactor===void 0?1:n.bumpFactor,n.bumpTexture!==void 0&&r.push(this.parser.assignTexture(t,`bumpMap`,n.bumpTexture)),Promise.all(r)}},ms=class{constructor(e){this.parser=e,this.name=ts.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return es(this.parser,e,this.name)===null?null:pe}extendMaterialParams(e,t){let n=es(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&r.push(this.parser.assignTexture(t,`anisotropyMap`,n.anisotropyTexture)),Promise.all(r)}},hs=class{constructor(e){this.parser=e,this.name=ts.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let i=r.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures`);return null}return t.loadTextureImage(e,i.source,a)}},gs=class{constructor(e){this.parser=e,this.name=ts.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},_s=class{constructor(e){this.parser=e,this.name=ts.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},vs=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let e=n.extensions[this.name],r=this.parser.getDependency(`buffer`,e.buffer),i=this.parser.options.meshoptDecoder;if(!i||!i.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files`);return null}return r.then(function(t){let n=e.byteOffset||0,r=e.byteLength||0,a=e.count,o=e.byteStride,s=new Uint8Array(t,n,r);return i.decodeGltfBufferAsync?i.decodeGltfBufferAsync(a,o,s,e.mode,e.filter).then(function(e){return e.buffer}):i.ready.then(function(){let t=new ArrayBuffer(a*o);return i.decodeGltfBuffer(new Uint8Array(t),a,o,s,e.mode,e.filter),t})})}return null}},ys=class{constructor(e){this.name=ts.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let r=t.meshes[n.mesh];for(let e of r.primitives)if(e.mode!==As.TRIANGLES&&e.mode!==As.TRIANGLE_STRIP&&e.mode!==As.TRIANGLE_FAN&&e.mode!==void 0)return null;let i=n.extensions[this.name].attributes,a=[],o={};for(let e in i)a.push(this.parser.getDependency(`accessor`,i[e]).then(t=>(o[e]=t,o[e])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(e=>{let t=e.pop(),n=t.isGroup?t.children:[t],r=e[0].count,i=[];for(let e of n){let t=new je,n=new Y,a=new ge,s=new Y(1,1,1),c=new ce(e.geometry,e.material,r);for(let e=0;e<r;e++)o.TRANSLATION&&n.fromBufferAttribute(o.TRANSLATION,e),o.ROTATION&&a.fromBufferAttribute(o.ROTATION,e),o.SCALE&&s.fromBufferAttribute(o.SCALE,e),c.setMatrixAt(e,t.compose(n,a,s));let l=null;for(let e in o)if(e===`_COLOR_0`){let t=o[e];c.instanceColor=new Te(t.array,t.itemSize,t.normalized)}else if(e!==`TRANSLATION`&&e!==`ROTATION`&&e!==`SCALE`){if(l===null){let e=c.geometry;l=new Lt,l.name=e.name;for(let t in e.attributes)l.setAttribute(t,e.attributes[t]);for(let t in e.morphAttributes)l.morphAttributes[t]=e.morphAttributes[t];e.index!==null&&l.setIndex(e.index),l.morphTargetsRelative=e.morphTargetsRelative;for(let t of e.groups)l.addGroup(t.start,t.count,t.materialIndex);e.boundingBox!==null&&(l.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(l.boundingSphere=e.boundingSphere.clone()),l.drawRange.start=e.drawRange.start,l.drawRange.count=e.drawRange.count,l.userData=Object.assign({},e.userData),c.geometry=l}let t=o[e];l.setAttribute(e,new Te(t.array,t.itemSize,t.normalized))}F.prototype.copy.call(c,e),this.parser.assignFinalMaterial(c),i.push(c)}return t.isGroup?(t.clear(),t.add(...i),t):i[0]}))}},bs=`glTF`,xs=12,Ss={JSON:1313821514,BIN:5130562},Cs=class{constructor(e){this.name=ts.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,xs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==bs)throw Error(`THREE.GLTFLoader: Unsupported glTF-Binary header.`);if(this.header.version<2)throw Error(`THREE.GLTFLoader: Legacy binary file detected.`);let r=this.header.length-xs,i=new DataView(e,xs),a=0;for(;a<r;){let t=i.getUint32(a,!0);a+=4;let r=i.getUint32(a,!0);if(a+=4,r===Ss.JSON){let r=new Uint8Array(e,xs+a,t);this.content=n.decode(r)}else if(r===Ss.BIN){let n=xs+a;this.body=e.slice(n,n+t)}a+=t}if(this.content===null)throw Error(`THREE.GLTFLoader: JSON content not found.`)}},ws=class{constructor(e,t){if(!t)throw Error(`THREE.GLTFLoader: No DRACOLoader instance provided.`);this.name=ts.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,r=this.dracoLoader,i=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},s={},c={};for(let e in a){let t=Fs[e]||e.toLowerCase();o[t]=a[e]}for(let t in e.attributes){let r=Fs[t]||t.toLowerCase();if(a[t]!==void 0){let i=n.accessors[e.attributes[t]];c[r]=js[i.componentType].name,s[r]=i.normalized===!0}}return t.getDependency(`bufferView`,i).then(function(e){return new Promise(function(t,n){r.decodeDracoFile(e,function(e){for(let t in e.attributes){let n=e.attributes[t],r=s[t];r!==void 0&&(n.normalized=r)}t(e)},o,c,ht,n)})})}},Ts=class{constructor(){this.name=ts.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let t=Math.cos(e.rotation),n=Math.sin(e.rotation);e.matrix.set(e.repeat.x*t,e.repeat.y*n,e.offset.x,-e.repeat.x*n,e.repeat.y*t,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},Es=class{constructor(){this.name=ts.KHR_MESH_QUANTIZATION}},Ds=class extends ut{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r*3+r;for(let e=0;e!==r;e++)t[e]=n[i+e];return t}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=o*2,c=o*3,l=r-t,u=(n-t)/l,d=u*u,f=d*u,p=e*c,m=p-c,h=-2*f+3*d,g=f-d,_=1-h,v=g-d+u;for(let e=0;e!==o;e++){let t=a[m+e+o],n=a[m+e+s]*l,r=a[p+e+o],c=a[p+e]*l;i[e]=_*t+v*n+h*r+g*c}return i}},Os=new ge,ks=class extends Ds{interpolate_(e,t,n,r){let i=super.interpolate_(e,t,n,r);return Os.fromArray(i).normalize().toArray(i),i}},As={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},js={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ms={9728:tt,9729:Dt,9984:Ze,9985:Be,9986:i,9987:Ie},Ns={33071:ue,33648:ae,10497:re},Ps={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Fs={POSITION:`position`,NORMAL:`normal`,TANGENT:`tangent`,TEXCOORD_0:`uv`,TEXCOORD_1:`uv1`,TEXCOORD_2:`uv2`,TEXCOORD_3:`uv3`,COLOR_0:`color`,WEIGHTS_0:`skinWeight`,JOINTS_0:`skinIndex`},Is={scale:`scale`,translation:`position`,rotation:`quaternion`,weights:`morphTargetInfluences`},Ls={CUBICSPLINE:void 0,LINEAR:Ye,STEP:yt},Rs={OPAQUE:`OPAQUE`,MASK:`MASK`,BLEND:`BLEND`};function zs(e){return e.DefaultMaterial===void 0&&(e.DefaultMaterial=new _({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:0})),e.DefaultMaterial}function Bs(e,t,n){for(let r in n.extensions)e[r]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[r]=n.extensions[r])}function Vs(e,t){t.extras!==void 0&&(typeof t.extras==`object`?Object.assign(e.userData,t.extras):console.warn(`THREE.GLTFLoader: Ignoring primitive type .extras, `+t.extras))}function Hs(e,t,n){let r=!1,i=!1,a=!1;for(let e=0,n=t.length;e<n;e++){let n=t[e];if(n.POSITION!==void 0&&(r=!0),n.NORMAL!==void 0&&(i=!0),n.COLOR_0!==void 0&&(a=!0),r&&i&&a)break}if(!r&&!i&&!a)return Promise.resolve(e);let o=[],s=[],c=[];for(let l=0,u=t.length;l<u;l++){let u=t[l];if(r){let t=u.POSITION===void 0?e.attributes.position:n.getDependency(`accessor`,u.POSITION);o.push(t)}if(i){let t=u.NORMAL===void 0?e.attributes.normal:n.getDependency(`accessor`,u.NORMAL);s.push(t)}if(a){let t=u.COLOR_0===void 0?e.attributes.color:n.getDependency(`accessor`,u.COLOR_0);c.push(t)}}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(c)]).then(function(t){let n=t[0],o=t[1],s=t[2];return r&&(e.morphAttributes.position=n),i&&(e.morphAttributes.normal=o),a&&(e.morphAttributes.color=s),e.morphTargetsRelative=!0,e})}function Us(e,t){if(e.updateMorphTargets(),t.weights!==void 0)for(let n=0,r=t.weights.length;n<r;n++)e.morphTargetInfluences[n]=t.weights[n];if(t.extras&&Array.isArray(t.extras.targetNames)){let n=t.extras.targetNames;if(e.morphTargetInfluences.length===n.length){e.morphTargetDictionary={};for(let t=0,r=n.length;t<r;t++)e.morphTargetDictionary[n[t]]=t}else console.warn(`THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.`)}}function Ws(e){let t,n=e.extensions&&e.extensions[ts.KHR_DRACO_MESH_COMPRESSION];if(t=n?`draco:`+n.bufferView+`:`+n.indices+`:`+Gs(n.attributes):e.indices+`:`+Gs(e.attributes)+`:`+e.mode,e.targets!==void 0)for(let n=0,r=e.targets.length;n<r;n++)t+=`:`+Gs(e.targets[n]);return t}function Gs(e){let t=``,n=Object.keys(e).sort();for(let r=0,i=n.length;r<i;r++)t+=n[r]+`:`+e[n[r]]+`;`;return t}function Ks(e){switch(e){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw Error(`THREE.GLTFLoader: Unsupported normalized accessor component type.`)}}function qs(e){return e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0?`image/jpeg`:e.search(/\.webp($|\?)/i)>0||e.search(/^data\:image\/webp/)===0?`image/webp`:e.search(/\.ktx2($|\?)/i)>0||e.search(/^data\:image\/ktx2/)===0?`image/ktx2`:`image/png`}var Js=new je,Ys=class{constructor(e={},n={}){this.json=e,this.extensions={},this.plugins={},this.options=n,this.cache=new $o,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let r=!1,i=-1,a=!1,o=-1;if(typeof navigator<`u`&&navigator.userAgent!==void 0){let e=navigator.userAgent;r=/^((?!chrome|android).)*safari/i.test(e)===!0;let t=e.match(/Version\/(\d+)/);i=r&&t?parseInt(t[1],10):-1,a=e.indexOf(`Firefox`)>-1,o=a?e.match(/Firefox\/([0-9]+)\./)[1]:-1}this.textureLoader=typeof createImageBitmap>`u`||r&&i<17||a&&o<98?new t(this.options.manager):new xe(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new _e(this.options.manager),this.fileLoader.setResponseType(`arraybuffer`),this.options.crossOrigin===`use-credentials`&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,r=this.json,i=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(e){return e._markDefs&&e._markDefs()}),Promise.all(this._invokeAll(function(e){return e.beforeRoot&&e.beforeRoot()})).then(function(){return Promise.all([n.getDependencies(`scene`),n.getDependencies(`animation`),n.getDependencies(`camera`)])}).then(function(t){let a={scene:t[0][r.scene||0],scenes:t[0],animations:t[1],cameras:t[2],asset:r.asset,parser:n,userData:{}};return Bs(i,a,r),Vs(a,r),Promise.all(n._invokeAll(function(e){return e.afterRoot&&e.afterRoot(a)})).then(function(){for(let e of a.scenes)e.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n].joints;for(let t=0,n=r.length;t<n;t++)e[r[t]].isBone=!0}for(let t=0,r=e.length;t<r;t++){let r=e[t];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let r=n.clone(),i=(e,t)=>{let n=this.associations.get(e);n!=null&&this.associations.set(t,n);for(let[n,r]of e.children.entries())i(r,t.children[n])};return i(n,r),r.name+=`_instance_`+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let r=e(t[n]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let r=0;r<t.length;r++){let i=e(t[r]);i&&n.push(i)}return n}getDependency(e,t){let n=e+`:`+t,r=this.cache.get(n);if(!r){switch(e){case`scene`:r=this.loadScene(t);break;case`node`:r=this._invokeOne(function(e){return e.loadNode&&e.loadNode(t)});break;case`mesh`:r=this._invokeOne(function(e){return e.loadMesh&&e.loadMesh(t)});break;case`accessor`:r=this.loadAccessor(t);break;case`bufferView`:r=this._invokeOne(function(e){return e.loadBufferView&&e.loadBufferView(t)});break;case`buffer`:r=this.loadBuffer(t);break;case`material`:r=this._invokeOne(function(e){return e.loadMaterial&&e.loadMaterial(t)});break;case`texture`:r=this._invokeOne(function(e){return e.loadTexture&&e.loadTexture(t)});break;case`skin`:r=this.loadSkin(t);break;case`animation`:r=this._invokeOne(function(e){return e.loadAnimation&&e.loadAnimation(t)});break;case`camera`:r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(n){return n!=this&&n.getDependency&&n.getDependency(e,t)}),!r)throw Error(`Unknown type: `+e)}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,r=this.json[e+(e===`mesh`?`es`:`s`)]||[];t=Promise.all(r.map(function(t,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!==`arraybuffer`)throw Error(`THREE.GLTFLoader: `+t.type+` buffer type is not supported.`);if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ts.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(e,i){n.load(Ue.resolveURL(t.uri,r.path),e,void 0,function(){i(Error(`THREE.GLTFLoader: Failed to load buffer "`+t.uri+`".`))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency(`buffer`,t.buffer).then(function(e){let n=t.byteLength||0,r=t.byteOffset||0;return e.slice(r,r+n)})}loadAccessor(e){let t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let e=Ps[r.type],t=js[r.componentType],n=r.normalized===!0,i=new t(r.count*e);return Promise.resolve(new Ot(i,e,n))}let i=[];return r.bufferView===void 0?i.push(null):i.push(this.getDependency(`bufferView`,r.bufferView)),r.sparse!==void 0&&(i.push(this.getDependency(`bufferView`,r.sparse.indices.bufferView)),i.push(this.getDependency(`bufferView`,r.sparse.values.bufferView))),Promise.all(i).then(function(e){let i=e[0],a=Ps[r.type],o=js[r.componentType],s=o.BYTES_PER_ELEMENT,c=s*a,l=r.byteOffset||0,u=r.bufferView===void 0?void 0:n.bufferViews[r.bufferView].byteStride,d=r.normalized===!0,f,p;if(u&&u!==c){let e=Math.floor(l/u),n=`InterleavedBuffer:`+r.bufferView+`:`+r.componentType+`:`+e+`:`+r.count,c=t.cache.get(n);c||(f=new o(i,e*u,r.count*u/s),c=new Re(f,u/s),t.cache.add(n,c)),p=new wt(c,a,l%u/s,d)}else f=i===null?new o(r.count*a):new o(i,l,r.count*a),p=new Ot(f,a,d);if(r.sparse!==void 0){let t=Ps.SCALAR,n=js[r.sparse.indices.componentType],s=r.sparse.indices.byteOffset||0,c=r.sparse.values.byteOffset||0,l=new n(e[1],s,r.sparse.count*t),u=new o(e[2],c,r.sparse.count*a);i!==null&&(p=new Ot(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let e=0,t=l.length;e<t;e++){let t=l[e];if(p.setX(t,u[e*a]),a>=2&&p.setY(t,u[e*a+1]),a>=3&&p.setZ(t,u[e*a+2]),a>=4&&p.setW(t,u[e*a+3]),a>=5)throw Error(`THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.`)}p.normalized=d}return p})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,i=t.images[r],a=this.textureLoader;if(i.uri){let e=n.manager.getHandler(i.uri);e!==null&&(a=e)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let r=this,i=this.json,a=i.textures[e],o=i.images[t],s=(o.uri||o.bufferView)+`:`+a.sampler;if(this.textureCache[s])return this.textureCache[s];let c=this.loadImageSource(t,n).then(function(t){t.flipY=!1,t.name=a.name||o.name||``,t.name===``&&typeof o.uri==`string`&&o.uri.startsWith(`data:image/`)===!1&&(t.name=o.uri);let n=(i.samplers||{})[a.sampler]||{};return t.magFilter=Ms[n.magFilter]||1006,t.minFilter=Ms[n.minFilter]||1008,t.wrapS=Ns[n.wrapS]||1e3,t.wrapT=Ns[n.wrapT]||1e3,t.generateMipmaps=!t.isCompressedTexture&&t.minFilter!==1003&&t.minFilter!==1006,r.associations.set(t,{textures:e}),t}).catch(function(){return null});return this.textureCache[s]=c,c}loadImageSource(e,t){let n=this,r=this.json,i=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(e=>e.clone());let a=r.images[e],o=self.URL||self.webkitURL,s=a.uri||``,c=!1;if(a.bufferView!==void 0)s=n.getDependency(`bufferView`,a.bufferView).then(function(e){c=!0;let t=new Blob([e],{type:a.mimeType});return s=o.createObjectURL(t),s});else if(a.uri===void 0)throw Error(`THREE.GLTFLoader: Image `+e+` is missing URI and bufferView`);let l=Promise.resolve(s).then(function(e){return new Promise(function(n,r){let a=n;t.isImageBitmapLoader===!0&&(a=function(e){let t=new le(e);t.needsUpdate=!0,n(t)}),t.load(Ue.resolveURL(e,i.path),a,void 0,r)})}).then(function(e){return c===!0&&o.revokeObjectURL(s),Vs(e,a),e.userData.mimeType=a.mimeType||qs(a.uri),e}).catch(function(e){throw console.error(`THREE.GLTFLoader: Couldn't load texture`,s),e});return this.sourceCache[e]=l,l}assignTexture(e,t,n,r){let i=this;return this.getDependency(`texture`,n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),i.extensions[ts.KHR_TEXTURE_TRANSFORM]){let e=n.extensions===void 0?void 0:n.extensions[ts.KHR_TEXTURE_TRANSFORM];if(e){let t=i.associations.get(a);a=i.extensions[ts.KHR_TEXTURE_TRANSFORM].extendTexture(a,e),i.associations.set(a,t)}}return r!==void 0&&(a.colorSpace=r),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,r=t.attributes.tangent===void 0,i=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let e=`PointsMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new ye,ke.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,t.sizeAttenuation=!1,this.cache.add(e,t)),n=t}else if(e.isLine){let e=`LineBasicMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new xt,ke.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,this.cache.add(e,t)),n=t}if(r||i||a){let e=`ClonedMaterial:`+n.uuid+`:`;r&&(e+=`derivative-tangents:`),i&&(e+=`vertex-colors:`),a&&(e+=`flat-shading:`);let t=this.cache.get(e);t||(t=n.clone(),i&&(t.vertexColors=!0),a&&(t.flatShading=!0),r&&(t.normalScale&&(t.normalScale.y*=-1),t.clearcoatNormalScale&&(t.clearcoatNormalScale.y*=-1)),this.cache.add(e,t),this.associations.set(t,this.associations.get(n))),n=t}e.material=n}getMaterialType(){return _}loadMaterial(e){let t=this,n=this.json,r=this.extensions,i=n.materials[e],a,s={},l=i.extensions||{},u=[];if(l[ts.KHR_MATERIALS_UNLIT]){let e=r[ts.KHR_MATERIALS_UNLIT];a=e.getMaterialType(),u.push(e.extendParams(s,i,t))}else{let n=i.pbrMetallicRoughness||{};if(s.color=new c(1,1,1),s.opacity=1,Array.isArray(n.baseColorFactor)){let e=n.baseColorFactor;s.color.setRGB(e[0],e[1],e[2],ht),s.opacity=e[3]}n.baseColorTexture!==void 0&&u.push(t.assignTexture(s,`map`,n.baseColorTexture,o)),s.metalness=n.metallicFactor===void 0?1:n.metallicFactor,s.roughness=n.roughnessFactor===void 0?1:n.roughnessFactor,n.metallicRoughnessTexture!==void 0&&(u.push(t.assignTexture(s,`metalnessMap`,n.metallicRoughnessTexture)),u.push(t.assignTexture(s,`roughnessMap`,n.metallicRoughnessTexture))),a=this._invokeOne(function(t){return t.getMaterialType&&t.getMaterialType(e)}),u.push(Promise.all(this._invokeAll(function(t){return t.extendMaterialParams&&t.extendMaterialParams(e,s)})))}i.doubleSided===!0&&(s.side=2);let d=i.alphaMode||Rs.OPAQUE;if(d===Rs.BLEND?(s.transparent=!0,s.depthWrite=!1):(s.transparent=!1,d===Rs.MASK&&(s.alphaTest=i.alphaCutoff===void 0?.5:i.alphaCutoff)),i.normalTexture!==void 0&&a!==H&&(u.push(t.assignTexture(s,`normalMap`,i.normalTexture)),s.normalScale=new ze(1,1),i.normalTexture.scale!==void 0)){let e=i.normalTexture.scale;s.normalScale.set(e,e)}if(i.occlusionTexture!==void 0&&a!==H&&(u.push(t.assignTexture(s,`aoMap`,i.occlusionTexture)),i.occlusionTexture.strength!==void 0&&(s.aoMapIntensity=i.occlusionTexture.strength)),i.emissiveFactor!==void 0&&a!==H){let e=i.emissiveFactor;s.emissive=new c().setRGB(e[0],e[1],e[2],ht)}return i.emissiveTexture!==void 0&&a!==H&&u.push(t.assignTexture(s,`emissiveMap`,i.emissiveTexture,o)),Promise.all(u).then(function(){let n=new a(s);return i.name&&(n.name=i.name),Vs(n,i),t.associations.set(n,{materials:e}),i.extensions&&Bs(r,n,i),n})}createUniqueName(e){let t=T.sanitizeNodeName(e||``);return t in this.nodeNamesUsed?t+`_`+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,r=this.primitiveCache;function i(e){return n[ts.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e,t).then(function(n){return Zs(n,e,t)})}let a=[];for(let n=0,o=e.length;n<o;n++){let o=e[n],s=Ws(o),c=r[s];if(c)a.push(c.promise);else{let e;e=o.extensions&&o.extensions[ts.KHR_DRACO_MESH_COMPRESSION]?i(o):Zs(new Lt,o,t),o.mode===As.TRIANGLE_STRIP?e=e.then(e=>bt(e,1)):o.mode===As.TRIANGLE_FAN&&(e=e.then(e=>bt(e,2))),r[s]={primitive:o,promise:e},a.push(e)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,r=this.extensions,i=n.meshes[e],a=i.primitives,o=[];for(let e=0,t=a.length;e<t;e++){let t=a[e].material===void 0?zs(this.cache):this.getDependency(`material`,a[e].material);o.push(t)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(n){let o=n.slice(0,n.length-1),c=n[n.length-1],l=[];for(let n=0,u=c.length;n<u;n++){let u=c[n],d=a[n],f,p=o[n];if(d.mode===As.TRIANGLES||d.mode===As.TRIANGLE_STRIP||d.mode===As.TRIANGLE_FAN||d.mode===void 0){let e=i.isSkinnedMesh===!0,t=u.hasAttribute(`skinIndex`)&&u.hasAttribute(`skinWeight`);e&&t===!1&&console.warn(`THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled.`),f=e&&t?new A(u,p):new It(u,p),f.isSkinnedMesh===!0&&f.normalizeSkinWeights()}else if(d.mode===As.LINES)f=new it(u,p);else if(d.mode===As.LINE_STRIP)f=new pt(u,p);else if(d.mode===As.LINE_LOOP)f=new Ne(u,p);else if(d.mode===As.POINTS)f=new s(u,p);else throw Error(`THREE.GLTFLoader: Primitive mode unsupported: `+d.mode);Object.keys(f.geometry.morphAttributes).length>0&&Us(f,i),f.name=t.createUniqueName(i.name||`mesh_`+e),Vs(f,i),d.extensions&&Bs(r,f,d),t.assignFinalMaterial(f),l.push(f)}for(let n=0,r=l.length;n<r;n++)t.associations.set(l[n],{meshes:e,primitives:n});if(l.length===1)return i.extensions&&Bs(r,l[0],i),l[0];let u=new gt;i.extensions&&Bs(r,u,i),t.associations.set(u,{meshes:e});for(let e=0,t=l.length;e<t;e++)u.add(l[e]);return u})}loadCamera(e){let t,n=this.json.cameras[e],r=n[n.type];if(!r)console.warn(`THREE.GLTFLoader: Missing camera parameters.`);else return n.type===`perspective`?t=new D(At.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type===`orthographic`&&(t=new b(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Vs(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let e=0,r=t.joints.length;e<r;e++)n.push(this._loadNodeShallow(t.joints[e]));return t.inverseBindMatrices===void 0?n.push(null):n.push(this.getDependency(`accessor`,t.inverseBindMatrices)),Promise.all(n).then(function(e){let n=e.pop(),r=e,i=[],a=[];for(let e=0,o=r.length;e<o;e++){let o=r[e];if(o){i.push(o);let t=new je;n!==null&&t.fromArray(n.array,e*16),a.push(t)}else console.warn(`THREE.GLTFLoader: Joint "%s" could not be found.`,t.joints[e])}return new S(i,a)})}loadAnimation(e){let t=this.json,n=this,r=t.animations[e],i=r.name?r.name:`animation_`+e,a=[],o=[],s=[],c=[],l=[];for(let e=0,t=r.channels.length;e<t;e++){let t=r.channels[e],n=r.samplers[t.sampler],i=t.target,u=i.node,d=r.parameters===void 0?n.input:r.parameters[n.input],f=r.parameters===void 0?n.output:r.parameters[n.output];i.node!==void 0&&(a.push(this.getDependency(`node`,u)),o.push(this.getDependency(`accessor`,d)),s.push(this.getDependency(`accessor`,f)),c.push(n),l.push(i))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(s),Promise.all(c),Promise.all(l)]).then(function(e){let t=e[0],a=e[1],o=e[2],s=e[3],c=e[4],l=[];for(let e=0,r=t.length;e<r;e++){let r=t[e],i=a[e],u=o[e],d=s[e],f=c[e];if(r===void 0)continue;r.updateMatrix&&r.updateMatrix();let p=n._createAnimationTracks(r,i,u,d,f);if(p)for(let e=0;e<p.length;e++)l.push(p[e])}let u=new mt(i,void 0,l);return Vs(u,r),u})}createNodeMesh(e){let t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency(`mesh`,r.mesh).then(function(e){let t=n._getNodeRef(n.meshCache,r.mesh,e);return r.weights!==void 0&&t.traverse(function(e){if(e.isMesh)for(let t=0,n=r.weights.length;t<n;t++)e.morphTargetInfluences[t]=r.weights[t]}),t})}loadNode(e){let t=this.json,n=this,r=t.nodes[e],i=n._loadNodeShallow(e),a=[],o=r.children||[];for(let e=0,t=o.length;e<t;e++)a.push(n.getDependency(`node`,o[e]));let s=r.skin===void 0?Promise.resolve(null):n.getDependency(`skin`,r.skin);return Promise.all([i,Promise.all(a),s]).then(function(e){let t=e[0],n=e[1],r=e[2];r!==null&&t.traverse(function(e){e.isSkinnedMesh&&e.bind(r,Js)});for(let e=0,r=n.length;e<r;e++)t.add(n[e]);if(t.userData.pivot!==void 0&&n.length>0){let e=t.userData.pivot,r=n[0];t.pivot=new Y().fromArray(e),t.position.x-=e[0],t.position.y-=e[1],t.position.z-=e[2],r.position.set(0,0,0),delete t.userData.pivot}return t})}_loadNodeShallow(e){let t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let i=t.nodes[e],a=i.name?r.createUniqueName(i.name):``,o=[],s=r._invokeOne(function(t){return t.createNodeMesh&&t.createNodeMesh(e)});return s&&o.push(s),i.camera!==void 0&&o.push(r.getDependency(`camera`,i.camera).then(function(e){return r._getNodeRef(r.cameraCache,i.camera,e)})),r._invokeAll(function(t){return t.createNodeAttachment&&t.createNodeAttachment(e)}).forEach(function(e){o.push(e)}),this.nodeCache[e]=Promise.all(o).then(function(t){let o;if(o=i.isBone===!0?new We:t.length>1?new gt:t.length===1?t[0]:new F,o!==t[0])for(let e=0,n=t.length;e<n;e++)o.add(t[e]);if(i.name&&(o.userData.name=i.name,o.name=a),Vs(o,i),i.extensions&&Bs(n,o,i),i.matrix!==void 0){let e=new je;e.fromArray(i.matrix),o.applyMatrix4(e)}else i.translation!==void 0&&o.position.fromArray(i.translation),i.rotation!==void 0&&o.quaternion.fromArray(i.rotation),i.scale!==void 0&&o.scale.fromArray(i.scale);if(!r.associations.has(o))r.associations.set(o,{});else if(i.mesh!==void 0&&r.meshCache.refs[i.mesh]>1){let e=r.associations.get(o);r.associations.set(o,{...e})}return r.associations.get(o).nodes=e,o}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],r=this,i=new gt;n.name&&(i.name=r.createUniqueName(n.name)),Vs(i,n),n.extensions&&Bs(t,i,n);let a=n.nodes||[],o=[];for(let e=0,t=a.length;e<t;e++)o.push(r.getDependency(`node`,a[e]));return Promise.all(o).then(function(e){for(let t=0,n=e.length;t<n;t++){let n=e[t];n.parent===null?i.add(n):i.add(Xo(n))}return r.associations=(e=>{let t=new Map;for(let[e,n]of r.associations)(e instanceof ke||e instanceof le)&&t.set(e,n);return e.traverse(e=>{let n=r.associations.get(e);n!=null&&t.set(e,n)}),t})(i),i})}_createAnimationTracks(e,t,n,r,i){let a=[],o=e.name?e.name:e.uuid,s=[];function c(e){e.morphTargetInfluences&&s.push(e.name?e.name:e.uuid)}Is[i.path]===Is.weights?(c(e),e.isGroup&&e.children.forEach(c)):s.push(o);let l;switch(Is[i.path]){case Is.weights:l=ne;break;case Is.rotation:l=U;break;case Is.translation:case Is.scale:l=Ge;break;default:switch(n.itemSize){case 1:l=ne;break;default:l=Ge}}let u=r.interpolation===void 0?Ye:Ls[r.interpolation],d=this._getArrayFromAccessor(n);for(let e=0,n=s.length;e<n;e++){let n=new l(s[e]+`.`+Is[i.path],t.array,d,u);r.interpolation===`CUBICSPLINE`&&this._createCubicSplineTrackInterpolant(n),a.push(n)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let e=Ks(t.constructor),n=new Float32Array(t.length);for(let r=0,i=t.length;r<i;r++)n[r]=t[r]*e;t=n}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(e){return new(this instanceof U?ks:Ds)(this.times,this.values,this.getValueSize()/3,e)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Xs(e,t,n){let r=t.attributes,i=new Ve;if(r.POSITION!==void 0){let e=n.json.accessors[r.POSITION],t=e.min,a=e.max;if(t!==void 0&&a!==void 0){if(i.set(new Y(t[0],t[1],t[2]),new Y(a[0],a[1],a[2])),e.normalized){let t=Ks(js[e.componentType]);i.min.multiplyScalar(t),i.max.multiplyScalar(t)}}else{console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`);return}}else return;let a=t.targets;if(a!==void 0){let e=new Y,t=new Y;for(let r=0,i=a.length;r<i;r++){let i=a[r];if(i.POSITION!==void 0){let r=n.json.accessors[i.POSITION],a=r.min,o=r.max;if(a!==void 0&&o!==void 0){if(t.setX(Math.max(Math.abs(a[0]),Math.abs(o[0]))),t.setY(Math.max(Math.abs(a[1]),Math.abs(o[1]))),t.setZ(Math.max(Math.abs(a[2]),Math.abs(o[2]))),r.normalized){let e=Ks(js[r.componentType]);t.multiplyScalar(e)}e.max(t)}else console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`)}}i.expandByVector(e)}e.boundingBox=i;let o=new _t;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,e.boundingSphere=o}function Zs(e,t,n){let r=t.attributes,i=[];function a(t,r){return n.getDependency(`accessor`,t).then(function(t){e.setAttribute(r,t)})}for(let t in r){let n=Fs[t]||t.toLowerCase();n in e.attributes||i.push(a(r[t],n))}if(t.indices!==void 0&&!e.index){let r=n.getDependency(`accessor`,t.indices).then(function(t){e.setIndex(t)});i.push(r)}return jt.workingColorSpace!==`srgb-linear`&&`COLOR_0`in r&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${jt.workingColorSpace}" not supported.`),Vs(e,t),Xs(e,t,n),Promise.all(i).then(function(){return t.targets===void 0?e:Hs(e,t.targets,n)})}var Qs=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,$s=class{image;size;data;constructor(e,t=128){this.image=e,this.size=t;let n=document.createElement(`canvas`);n.width=n.height=t;let r=n.getContext(`2d`,{willReadFrequently:!0});r.drawImage(e,0,0,t,t),this.data=r.getImageData(0,0,t,t).data}at(e,t,n=new c){let r=Math.min(this.size-1,Math.max(0,Math.floor((e-Math.floor(e))*this.size))),i=(Math.min(this.size-1,Math.max(0,Math.floor((t-Math.floor(t))*this.size)))*this.size+r)*4;return n.setRGB(Qs(this.data[i]/255),Qs(this.data[i+1]/255),Qs(this.data[i+2]/255),ht)}average(){let e=new c(0,0,0),t=new c,n=this.size*this.size;for(let r=0;r<n;r++){let n=r*4;t.setRGB(Qs(this.data[n]/255),Qs(this.data[n+1]/255),Qs(this.data[n+2]/255),ht),e.r+=t.r,e.g+=t.g,e.b+=t.b}return e.multiplyScalar(1/n)}};function ec(e){return new Promise((t,n)=>{let r=new Image;r.onload=()=>t(r),r.onerror=()=>n(Error(`image failed: ${e}`)),r.src=e})}async function tc(e,t){let n={};return await Promise.all(e.map(async e=>{let r=await ec(`./textures/surfaces/${e}.webp`),i=new le(r);i.colorSpace=o,i.wrapS=i.wrapT=re,i.anisotropy=4,i.needsUpdate=!0,n[e]={name:e,tex:i,avg:new $s(r,32).average()},t?.()})),n}var nc=class{name;boxes=[];materials=[];opacity=1;target=1;constructor(e){this.name=e}blocks(e,t,n){for(let r of this.boxes){let i=0,a=1,o=!0;for(let s of[`x`,`y`,`z`]){let c=t[s]-e[s],l=r.min[s]-n,u=r.max[s]+n;if(Math.abs(c)<1e-9){if(e[s]<l||e[s]>u){o=!1;break}}else{let t=(l-e[s])/c,n=(u-e[s])/c;if(t>n&&([t,n]=[n,t]),i=Math.max(i,t),a=Math.min(a,n),i>a){o=!1;break}}}if(o)return!0}return!1}update(e){this.opacity+=(this.target-this.opacity)*Math.min(1,e*9),Math.abs(this.opacity-this.target)<.01&&(this.opacity=this.target);for(let e of this.materials)e.opacity=this.opacity}},rc=new je,ic=new ge,ac=new z;function Q(e,t,n,r=0,i=0,a=0,o=1){return ic.setFromEuler(ac.set(i,r,a,`YXZ`)),new je().compose(new Y(e,t,n),ic,new Y(o,o,o))}var oc=class{name;tex;opts;parts=[];tints=[];constructor(e,t,n={}){this.name=e,this.tex=t,this.opts=n}rawTint=!1;raw(){return this.rawTint=!0,this}tintFor(e){if(this.rawTint&&this.tex)return{tint:new c(1,1,1),base:this.tex.avg.clone()};let t=new c(e);if(!this.tex)return{tint:t,base:t.clone()};let n=this.tex.avg,r=new c(Math.min(4,t.r/Math.max(n.r,.02)),Math.min(4,t.g/Math.max(n.g,.02)),Math.min(4,t.b/Math.max(n.b,.02)));return{tint:r,base:r.clone().multiply(n)}}baseOf(e){return this.tintFor(e).base}add(e,t,n){let r=e.index?e.toNonIndexed():e.clone();for(let e of Object.keys(r.attributes))e!==`position`&&e!==`normal`&&r.deleteAttribute(e);r.applyMatrix4(t);let i=r.attributes.position,a=r.attributes.normal,o=this.opts.texel??2,s=new Float32Array(i.count*2),c=new Float32Array(i.count*3),{tint:l}=this.tintFor(n);for(let e=0;e<i.count;e++){let t=i.getX(e),n=i.getY(e),r=i.getZ(e),u=Math.abs(a.getX(e)),d=Math.abs(a.getY(e)),f=Math.abs(a.getZ(e)),p,m;d>=u&&d>=f?[p,m]=[t,r]:u>=f?[p,m]=[r,n]:[p,m]=[t,n],s[e*2]=p/o,s[e*2+1]=m/o,c[e*3]=l.r,c[e*3+1]=l.g,c[e*3+2]=l.b}r.setAttribute(`uv`,new Ot(s,2)),r.setAttribute(`color`,new Ot(c,3)),r.computeBoundingBox(),this.opts.fade?.boxes.push(r.boundingBox.clone()),this.parts.push(r),this.tints.push(this.tintFor(n).base)}box(e,t,n,r,i,a,o,s=0,c=0,l=0){this.add(new G(r,i,a),Q(e,t,n,s,c,l),o)}span(e,t,n,r,i,a,o){this.box((e+r)/2,(t+i)/2,(n+a)/2,Math.abs(r-e),Math.abs(i-t),Math.abs(a-n),o)}cyl(e,t,n,r,i,a,o,s=10){this.add(new Qe(i,r,a,s),rc.makeTranslation(e,t+a/2,n).clone(),o)}get count(){return this.parts.length}build(){if(!this.parts.length)return null;let e=dt(this.parts,!1);this.parts.forEach(e=>e.dispose());let t=Tt(`#ffffff`,{map:this.tex?.tex??null,vertexColors:!0,transparent:!!this.opts.fade,side:this.opts.doubleSide?2:0});this.opts.fade?.materials.push(t);let n=new It(e,t);n.name=this.name,n.castShadow=this.opts.cast??!0,n.receiveShadow=this.opts.receive??!0;let r=new c(0,0,0);for(let e of this.tints)r.add(e);return n.userData.baseColor=r.multiplyScalar(1/this.tints.length),n.userData.merged=!0,n}};function sc(e,t,n,r=.028,i=4){let a=n*i,o=[],s=e=>Math.sin(e/i*Math.PI*2)*r;for(let n=0;n<a;n++){let r=-e/2+n/a*e,i=-e/2+(n+1)/a*e,c=s(n),l=s(n+1);o.push(r,-t/2,c,i,-t/2,l,i,t/2,l,r,-t/2,c,i,t/2,l,r,t/2,c)}let c=new Lt;return c.setAttribute(`position`,new C(o,3)),c.computeVertexNormals(),c}var cc=class{group=new gt;list=[];byId=new Map;constructor(){this.group.name=`surfaces`}add(e,t,n,r,i,a,o){let s=new F;s.name=`surface:${e}`,s.position.set(...r);let c=new Ve().setFromCenterAndSize(new Y(...r),new Y(...i)),l={id:e,label:t,kind:n,bounds:c,normal:new Y(...a),baseColor:o.clone()};return s.userData={baseColor:l.baseColor,baseColorHex:`#${l.baseColor.getHexString()}`,surfaceId:e,label:t,kind:n,normal:l.normal,bounds:c},this.group.add(s),this.list.push(l),this.byId.set(e,s),s}get(e){let t=this.list.find(t=>t.id===e);if(!t)throw Error(`unknown surface ${e}`);return t}baseColorAt(e,t=.6){return this.nearest(e,t)?.baseColor.clone()??null}nearest(e,t=.6){let n=new Y,r=null,i=1/0,a=1/0;for(let o of this.list){let s=o.bounds.distanceToPoint(e);if(s>t)continue;o.bounds.getSize(n);let c=Math.max(n.x,.05)*Math.max(n.y,.05)*Math.max(n.z,.05);(s<i-.15||s<=i+.15&&c<a)&&(r=o,a=c,i=Math.min(s,i))}return r}},lc=new Qo,uc=new Map;function dc(e){let t=uc.get(e);return t||(t=new Promise((t,n)=>{lc.load(`./models/${e}.json`,e=>{e.scene.updateMatrixWorld(!0);let n=[];e.scene.traverse(e=>{if(!(e instanceof It))return;let t=e.material,r=t.map??null,i=Tt(t.color??`#ffffff`,{map:r}),a=new c(t.color??`#ffffff`),o=e.geometry.attributes.uv;if(r?.image&&o){let e=new $s(r.image,256),n=new c(0,0,0),i=new c;for(let t=0;t<o.count;t++)e.at(o.getX(t),o.getY(t),i),n.add(i);a=n.multiplyScalar(1/o.count).multiply(t.color??new c(1,1,1))}n.push({name:e.name,materialName:t.name,geometry:e.geometry,material:i,local:e.matrixWorld.clone(),baseColor:a})}),t(n)},void 0,n)}),uc.set(e,t)),t}function fc(e){let t=typeof e.s==`number`?[e.s,e.s,e.s]:e.s??[1,1,1];return ic.setFromEuler(ac.set(e.rx??0,e.ry??0,0,`YXZ`)),new je().compose(new Y(e.x,e.y??0,e.z),ic,new Y(...t))}function pc(e,t,n={}){return e.map(e=>{let r=n.materials?.[e.materialName]??e.material,i=new ce(e.geometry,r,t.length),a=new c;return t.forEach((t,n)=>{i.setMatrixAt(n,fc(t).multiply(e.local)),t.tint!==void 0&&i.setColorAt(n,a.set(t.tint))}),i.instanceMatrix.needsUpdate=!0,i.castShadow=n.cast??!0,i.receiveShadow=n.receive??!0,i.name=e.name,i.userData.baseColor=n.materials?.[e.materialName]?.color.clone()??e.baseColor.clone(),i})}function mc(e,t){let n=e.baseColor.clone();return t!==void 0&&n.multiply(new c(t)),n}var hc=[`plaster_wall`,`painted_concrete`,`corrugated_metal`,`rusty_metal`,`dirt_ground`,`old_wood`,`cracked_tiles`],gc=[`car_van`,`car_cone`,`surv_bucket`,`surv_box`,`surv_box-large`,`surv_metal-panel`,`nat_plant_bushLarge`,`nat_plant_bush`,`nat_tree_palm`,`nat_tree_palmShort`],_c=3.2,vc=6,yc=.85,bc=2.2,xc=5,Sc=1.4,Cc=15;function wc(e){let t=e>>>0;return()=>(t=t*1664525+1013904223>>>0)/4294967296}function Tc(e,t,n,r,i,a,o){e.font=`900 ${i}px "Arial Black", Impact, "DejaVu Sans", sans-serif`;let s=[...t].map(t=>e.measureText(t).width*.96),c=n-s.reduce((e,t)=>e+t,0)/2;e.fillStyle=a,e.strokeStyle=a,e.lineJoin=`round`,e.lineWidth=i*.06,[...t].forEach((t,n)=>{e.save(),e.translate(c+s[n]/2,r+(o()-.5)*i*.07),e.rotate((o()-.5)*.09),e.globalAlpha=.86+o()*.14,e.textAlign=`center`,e.fillText(t,0,0),e.strokeText(t,0,0),t!==` `&&o()<.16&&e.fillRect(-i*.02+(o()-.5)*i*.3,i*.02,i*.045,i*(.08+o()*.2)),e.restore(),c+=s[n]})}function Ec(e,t,n){let r=document.createElement(`canvas`);r.width=e,r.height=t,n(r.getContext(`2d`));let i=new Pt(r);return i.colorSpace=o,i.anisotropy=4,i}function Dc(e,t,n,r,i,a,o){let s=Tt(`#ffffff`,{map:e,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),c=new It(new B(t,n),s);return c.position.set(r,i,a),c.rotation.y=o,c.receiveShadow=!0,c.userData.decal=!0,c}var Oc=`#e8bf1a`;function kc(e){let t=Tt(`#ffffff`,{map:e});return t.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vObj;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
vObj = position;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying vec3 vObj;`).replace(`#include <color_fragment>`,`#include <color_fragment>
      {
        vec3 c = diffuseColor.rgb;
        float lum = dot(c, vec3(0.2126, 0.7152, 0.0722));
        float body = step(0.22, c.b - c.r) * step(lum, 0.55);
        vec3 yellow = vec3(0.807, 0.521, 0.010) * clamp(lum / 0.19, 0.75, 1.15);
        diffuseColor.rgb = mix(c, yellow, body);
        float stripe = step(0.30, vObj.y) * step(vObj.y, 0.35) + step(0.38, vObj.y) * step(vObj.y, 0.395);
        float slash = step(vObj.z, -1.38) * (step(abs(vObj.x * 0.9 + vObj.y - 0.50), 0.04) + step(abs(vObj.x * 0.9 + vObj.y - 0.80), 0.04));
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.012), clamp(stripe + slash, 0.0, 1.0) * body);
      }`)},t.customProgramCacheKey=()=>`danfo-yellow-v1`,t}var Ac=hc.length+gc.length;async function jc(e){let[t,...n]=await Promise.all([tc(hc,e),...gc.map(t=>dc(t).then(t=>(e?.(),t)))]),r=Object.fromEntries(gc.map((e,t)=>[e,n[t]])),i=t,a=new gt;a.name=`compound`;let o=new cc;a.add(o.group);let s=[],l=[],u=e=>e&&a.add(e),d=(e,t,n,r,i,a,s)=>o.add(e,t,n,r,i,a,s),f=new oc(`ground`,i.corrugated_metal,{texel:3,cast:!1});f.span(-15,-.05,-9,Cc,0,9,`#b3a995`);let p=new oc(`dirt`,i.dirt_ground,{texel:4,cast:!1});p.span(-90,-.12,-90,90,-.02,90,`#7d6f52`);let m=(e,t,n,r,i,a)=>{let o=wc(a);for(let a=0;a<i;a++){let i=new Qe(1,1,.012,9);i.scale(n*(.45+o()*.4),1,r*(.45+o()*.4)),p.add(i,Q(e+(o()-.5)*n,.006,t+(o()-.5)*r,o()*3),`#6f6044`)}};m(12.2,0,2.6,3.5,6,11),m(-11,1.8,1.8,1.2,4,12),m(2,-5.6,1.2,.9,3,13),m(-3,5.4,1.4,.8,3,14);let h=new oc(`veranda-tiles`,i.cracked_tiles,{texel:1.6,cast:!1});d(`yard_concrete`,`Yard concrete`,`floor`,[0,0,0],[30,.1,18],[0,1,0],f.baseOf(`#b3a995`)),d(`dirt`,`Bare dirt`,`floor`,[12.2,0,0],[5,.1,7],[0,1,0],p.baseOf(`#6f6044`)),u(f.build()),u(p.build());let g=[`#2f7d3a`,`#2a5db0`,`#a8322d`,`#7a4a2a`,`#e0b030`,`#4a4a8a`],_=[`#8d8f91`,`#7b5a42`,`#a9abae`,`#6f7173`,`#8a6a50`,`#b8b9bb`],v=(e,t,n,r,a,o,c)=>{let f=-9*e,p=t=>f-e*t,m=6/c;for(let h=0;h<c;h++){let c=new nc(`${t}-${h}`);l.push(c);let g=new oc(`${t}-plaster-${h}`,i.plaster_wall,{texel:2.5,fade:c}),v=new oc(`${t}-eave-${h}`,i.rusty_metal,{texel:1.5,fade:c,doubleSide:!0});for(let i=0;i<m;i++){let c=h*m+i,l=-15+c*xc,u=l+xc/2,y=u-Sc/2,b=u+Sc/2;g.span(l,0,p(.83),l+xc,_c,p(vc),a);for(let[e,t]of[[l,y],[b,l+xc]])g.span(e,0,p(0),t,1.1,p(yc),r),g.span(e,1.1,p(0),t,_c,p(yc),a),s.push(Ao(e,p(0),t,p(yc),!0));g.span(y,2.2,p(0),b,_c,p(yc),a),g.box(u,1.08,p(.7999999999999999),1.3599999999999999,2.16,.06,o[c]),g.box(u+.5,1,p(.75),.05,.05,.1,`#d9b34a`),g.box(l+.9,1.5,f+e*.03,.9,.9,.06,`#252b33`);for(let t=0;t<3;t++)g.box(l+.9,1.25+t*.25,f+e*.07,.9,.04,.03,`#4b5661`);d(`${t}_door_${c}`,`${n} door ${c+1}`,`door`,[u,1.08,p(.7999999999999999)],[Sc,2.16,.2],[0,0,e],g.baseOf(o[c]));let x=2.35,S=3.25-2.62,C=Math.hypot(x,S);v.add(sc(4.96,C,16),Q(u,5.87/2,p(-1.125),0,e*Math.atan2(S,x)).multiply(Q(0,0,0,0,-Math.PI/2)),_[(c+(e>0?0:3))%_.length])}let y=h*m*xc-Cc;for(let e=0;e<=m;e++){let t=y+e*xc;g.add(new Qe(.09,.09,2.66,8),Q(t,1.33,p(-2.2)),`#3a3a38`),s.push(jo(t,p(-2.2),.13))}g.span(y,_c,p(0),y+m*xc,3.3200000000000003,p(vc),`#6d6b66`),u(g.build()),u(v.build()),d(`${t}_eave_${h}`,`${n} zinc eave ${h+1}`,`roof edge`,[y+m*xc/2,2.95,p(-1.1)],[m*xc,.6,2.3],[0,-1,e],v.baseOf(_[0]))}s.push(Ao(-15,p(yc),Cc,p(vc),!0));let g=new oc(`probe`,i.plaster_wall);d(`${t}_lower`,`${n}, lower band`,`wall`,[0,.55,p(.1)],[30,1.1,.4],[0,0,e],g.baseOf(r)),d(`${t}_upper`,`${n}, upper wall`,`wall`,[0,2.15,p(.1)],[30,2.1,.4],[0,0,e],g.baseOf(a)),h.span(-15,0,f,Cc,.015,p(-2.2),`#b49a82`),d(`${t}_veranda`,`${n} veranda tiles`,`floor`,[0,0,p(-2.2/2)],[30,.1,bc],[0,1,0],h.baseOf(`#b49a82`))};v(1,`north`,`North block`,`#2b958f`,`#e8dcb8`,g,3),v(-1,`south`,`South block`,`#b0603c`,`#ead9a2`,[...g].reverse(),3),u(h.build());let b=new oc(`walls`,i.painted_concrete,{texel:3}),x=`#2fa59b`;b.span(-15,0,-9,-14.7,2.6,9,x),b.span(-15.05,2.6,-9,-14.65,2.72,9,`#d6cdb0`),s.push(Ao(-15.4,-9,-14.7,9,!0)),d(`west_wall`,`West wall (turquoise)`,`wall`,[-14.7,1.3,0],[.3,2.6,18],[1,0,0],b.baseOf(x));let S=new oc(`zinc-fence`,i.rusty_metal,{texel:1.5,doubleSide:!0}),C=[`#8d8f91`,`#7b5a42`,`#a7a9ac`,`#6f7173`,`#8a6a50`,`#9a9c9f`],w=6.4/6;for(let e of[-1,1]){for(let t=0;t<6;t++){let n=e*(2.6+w*(t+.5)),r=C[(t*2+ +(e>0))%C.length];S.add(sc(1.0866666666666667,2.2,4),Q(14.9,1.1,n,-Math.PI/2),r),d(`zinc_${e>0?`s`:`n`}${t}`,`Zinc fence sheet`,`fence`,[14.9,1.1,n],[.1,2.2,w],[-1,0,0],S.baseOf(r))}S.span(14.84,2.2,Math.min(e*2.6,e*9),14.98,2.28,Math.max(e*2.6,e*9),`#4b4038`),s.push(Ao(14.8,Math.min(e*2.6,e*9),15,Math.max(e*2.6,e*9),!0));for(let t=0;t<=6;t++)b.add(new Qe(.06,.06,2.3,6),Q(14.8,1.15,e*(2.6+w*t)),`#5a4332`)}for(let e of[-1,1]){let t=e*2.6,n=e*3.1;b.span(14.5,0,Math.min(t,n),15.1,2.9,Math.max(t,n),`#e8dcb8`),b.span(14.45,2.9,Math.min(t,n)-.05,15.15,3.05,Math.max(t,n)+.05,`#2b958f`),s.push(Ao(14.5,Math.min(t,n),15.1,Math.max(t,n),!0)),d(`gate_pillar_${e>0?`s`:`n`}`,`Gate pillar`,`wall`,[14.5,1.45,(t+n)/2],[.1,2.9,.5],[-1,0,0],b.baseOf(`#e8dcb8`))}u(S.build());let T=wc(419),E=Ec(1024,400,e=>{Tc(e,`THIS HOUSE IS`,512,120,118,`#0d0d0d`,T),Tc(e,`NOT FOR SALE`,512,250,118,`#0d0d0d`,T),Tc(e,`BEWARE OF 419`,512,370,78,`#b3261e`,T)}),D=`#e9dfc0`,O=Ec(768,320,e=>{e.fillStyle=D,e.beginPath();for(let t=0;t<=40;t++)((t,n)=>e.lineTo(t+(T()-.5)*7,n+(T()-.5)*7))(14+t/40*740,14);for(let t=0;t<=14;t++)e.lineTo(754+(T()-.5)*7,14+t/14*292);for(let t=0;t<=40;t++)e.lineTo(754-t/40*740+(T()-.5)*7,306+(T()-.5)*7);for(let t=0;t<=14;t++)e.lineTo(14+(T()-.5)*7,306-t/14*292);e.closePath(),e.fill(),Tc(e,`POST NO BILL`,384,205,112,`#6e1f1a`,T)}),A=new nc(`sign-wall`);l.push(A);let ee=new oc(`sign-wall`,i.painted_concrete,{texel:3,fade:A});ee.span(-14.7,0,-1.6,-8.5,2.4,-1.3,x),ee.span(-14.75,2.4,-1.65,-8.45,2.5,-1.25,`#d6cdb0`),u(ee.build()),s.push(Ao(-14.7,-1.65,-8.45,-1.25,!0)),d(`sign_wall`,`Painted partition wall (THIS HOUSE IS NOT FOR SALE)`,`wall`,[-11.6,1.2,-1.3],[6.2,2.4,.3],[0,0,1],ee.baseOf(x)),u(Dc(E,4.3,1.75,-11.6,1.38,-1.285,0)),u(Dc(O,1.6,.67,-10.9,1.55,-8.988,0)),d(`post_no_bill`,`"POST NO BILL" cream patch`,`wall`,[-10.9,1.55,-8.99],[1.6,.67,.1],[0,0,1],new c(D));let j=new oc(`props`,null),te=new oc(`wood-props`,i.old_wood,{texel:1.2}),M=(e,t,n,r,i,a,o,s,c,l=0,u=0)=>e.add(new G(a,o,s),t.clone().multiply(Q(n,r,i,0,l,u)),c),N=(e,t,n,r,i,a,o,s,c,l=10)=>e.add(new Qe(o,a,s,l),t.clone().multiply(Q(n,r+s/2,i)),c),ne=`#1e56b8`,P=(e,t,n=ne)=>{let r=Q(e,0,t);N(j,r,0,0,0,.3,.3,.95,n,12);for(let e of[.28,.62])N(j,r,0,e,0,.318,.318,.05,`#163f8a`,12);N(j,r,0,.95,0,.26,.26,.04,`#3a76d6`,12),N(j,r,.11,.99,.05,.04,.04,.05,`#f0f0ea`,6),s.push(jo(e,t,.32,.95,!0))},re=(e,t,n,r,i)=>{i.forEach(([e,t],i)=>P(n+e,r+t,i===1?`#1a4aa0`:ne));let a=i.reduce((e,t)=>e+t[0],0)/i.length+n,o=i.reduce((e,t)=>e+t[1],0)/i.length+r;d(e,t,`drums`,[a,.5,o],[1.5+Math.abs(i[1][0]),1,1.5],[0,0,1],j.baseOf(ne))};re(`drums_a`,`Blue drum cluster (north veranda)`,-10.5,-5.8,[[0,0],[.66,.12],[.28,.64],[-.45,.5]]),re(`drums_b`,`Blue drum cluster (south veranda)`,4.6,5.7,[[0,0],[.64,.05],[.3,-.55]]),re(`drums_c`,`Blue drums by the signs`,-14,-7,[[0,0],[.1,.65]]);for(let[e,t,n]of[[-7,-7.4,`#e07b2a`],[8.6,-7.5,`#2e8b57`],[7.3,7.7,`#d9577a`],[-1.5,6.1,`#e8c23a`]]){let r=Q(e,0,t);N(j,r,0,0,0,.3,.4,.17,n,14),N(j,r,0,.15,0,.34,.34,.03,`#2b2b2b`,14),s.push(jo(e,t,.38,.17,!0))}let F=(e,t,n,r,i=`#f2f2ee`)=>{let a=Q(e,t,n,r);M(j,a,0,.45,0,.46,.05,.44,i),M(j,a,0,.74,-.2,.46,.5,.04,i,-.1);for(let[e,t]of[[-.2,-.18],[.2,-.18],[-.2,.18],[.2,.18]])N(j,a,e,0,t,.022,.022,.45,`#dcdcd6`,6)};for(let[e,t,n]of[[-4.3,-8.2,0],[-3.65,-8,.25],[4.6,-7.1,Math.PI],[5.4,-7.15,Math.PI-.2],[-9,8.15,Math.PI],[-8.15,8.25,Math.PI+.3]])F(e,0,t,n),s.push(jo(e,t,.27));for(let e=0;e<5;e++)F(9.3+e%2*.02,e*.13,8.4,.4+e*.05);s.push(jo(9.3,8.4,.34)),d(`chairs_stack`,`Stacked white plastic chairs`,`chairs`,[9.3,.6,8.4],[.7,1.2,.7],[0,0,1],j.baseOf(`#f2f2ee`)),d(`chairs_north`,`White plastic chairs`,`chairs`,[-3.97,.5,-8.1],[1.2,1,.6],[0,0,1],j.baseOf(`#f2f2ee`));let ie=Q(-13.2,0,4.6);M(te,ie,0,.06,0,1.3,.12,.95,`#8c8574`),M(j,ie,0,.43,0,1,.62,.7,`#d2492e`),M(j,ie,0,.84,0,.88,.22,.4,`#a52d1a`),M(j,ie,.51,.45,0,.05,.32,.42,`#1f1f22`),M(j,ie,.53,.52,.1,.03,.08,.08,`#7bd36b`),N(j,ie,-.35,.74,-.36,.04,.04,.6,`#2b2b2d`,6);for(let[e,t]of[[-.5,-.36],[.5,-.36],[-.5,.36],[.5,.36]])N(j,ie,e,.12,t,.02,.02,.9,`#3a3a3c`,5);s.push(Ao(-13.85,4.1,-12.55,5.1,!1,1.05,!0)),d(`generator`,`Diesel generator`,`generator`,[-13.2,.5,4.6],[1.3,1.1,.95],[1,0,0],j.baseOf(`#d2492e`));let I=new Y(-13.2,.6,4.6),L=Q(-7.5,0,0);for(let e of[-3.6,3.6])N(j,L,0,0,e,.06,.05,2.6,`#4a3a2c`,6),s.push(jo(-7.5,e,.1));M(j,L,0,2.43,0,.012,.012,7.2,`#2a2a2a`),[`#d9382c`,`#f2f0e6`,`#2a5db0`,`#f2c230`,`#2f9d57`,`#e2762c`,`#7b3fa0`,`#f4a8c0`,`#1d1d1f`].forEach((e,t)=>{let n=.95+t%3*.12,r=.5+t%2*.12,i=-3.1+t*.78,a=Q(-7.5+t*7%5*.012,0,i,(t%3-1)*.15);M(j,a,0,2.4-n/2,0,.025,n,r,e),d(`cloth_${t}`,`Cloth on the line`,`cloth`,[-7.5,2.4-n/2,i],[.3,n,r],[1,0,0],j.baseOf(e))});let ae=Q(-4.5,0,8.35);M(te,ae,0,.45,0,2.2,.06,.45,`#8a5a32`);for(let e of[-.95,.95])M(te,ae,e,.22,0,.08,.44,.38,`#6e4526`);s.push(Ao(-5.6,8.1,-3.4,8.6,!1,.5,!0)),d(`bench`,`Wooden bench`,`bench`,[-4.5,.3,8.35],[2.2,.6,.45],[0,0,1],te.baseOf(`#8a5a32`));let oe=Q(5,0,-8);M(te,oe,0,.74,0,1.4,.06,.8,`#7d5030`);for(let[e,t]of[[-.62,-.33],[.62,-.33],[-.62,.33],[.62,.33]])M(te,oe,e,.37,t,.07,.74,.07,`#5f3b20`);s.push(Ao(4.3,-8.4,5.7,-7.6,!1,.77,!0)),d(`table`,`Wooden table`,`table`,[5,.4,-8],[1.4,.8,.8],[0,0,1],te.baseOf(`#7d5030`));let R=Math.PI*2,le=wc(77),z=`#d6c7a0`,B=(e,t,n,r,i=z)=>{let a=new k(.5,8,6);a.scale(.72,.3,.5),j.add(a,Q(e,t,n,r),i)};for(let[e,t,n,r,i]of[[-.55,.15,-8.1,.1,z],[.02,.15,-8.06,-.15,`#a8402f`],[.57,.15,-8.12,.2,z],[-.27,.42,-8.08,.05,`#4b7a45`],[.28,.42,-8.1,-.1,z],[0,.69,-8.09,.2,z]])B(e,t,n,r,i);s.push(Ao(-.95,-8.45,.95,-7.75,!1,.82,!0)),d(`sacks`,`Pile of sacks`,`sacks`,[0,.45,-8.1],[1.9,.9,.7],[0,0,1],j.baseOf(z));let ue=`#1d1d20`;for(let e=0;e<4;e++)j.add(new Le(.26,.09,6,12),Q(12.9,.09+e*.18,-3.5,e*.5,Math.PI/2),ue);j.add(new Le(.26,.09,6,12),Q(12.2,.09,-3.95,.3,Math.PI/2),ue),s.push(jo(12.9,-3.5,.38,.76,!0),jo(12.2,-3.95,.36,.18,!0)),d(`tyres`,`Stack of tyres`,`tyres`,[12.9,.4,-3.5],[.8,.8,.8],[-1,0,0],j.baseOf(ue));let V=(e,t,n)=>{j.add(new Qe(.17,.17,.05,10),Q(e,.025,t),`#2b2b2b`),j.add(new Qe(.16,.16,.46,10),Q(e,.28,t),n),j.add(new k(.16,10,5,0,R,0,Math.PI/2),Q(e,.51,t),n),j.add(new Qe(.06,.06,.1,6),Q(e,.7,t),`#d9b34a`)};for(let[e,t,n]of[[-13.6,8.2,`#c0291f`],[-13.05,8.35,`#2f7d3a`],[-13.3,7.8,`#c0291f`]])V(e,t,n);s.push(Ao(-13.9,7.5,-12.75,8.6,!1,.66,!0)),d(`gas`,`Gas cylinders`,`gas`,[-13.3,.35,8.1],[1.2,.7,1.1],[0,0,-1],j.baseOf(`#c0291f`));let de=Q(3.4,0,-3.4);M(te,de,0,.76,0,1.7,.06,.8,`#8a5a32`);for(let[e,t]of[[-.78,-.33],[.78,-.33],[-.78,.33],[.78,.33]])M(te,de,e,.38,t,.06,.76,.06,`#5f3b20`);[`#d13b2e`,`#f1c232`,`#2a5db0`,`#2f9d57`,`#e2762c`,`#7b3fa0`,`#f4a8c0`,`#17a2a8`].forEach((e,t)=>M(j,de,-.62+t%4*.42,.86+Math.floor(t/4)*.15,t%2*.1-.05,.38,.14,.3,e)),j.add(new Qe(.03,.03,2.3,6),Q(3.4,1.15,-3.4),`#3a3a38`),s.push(Ao(2.55,-3.8,4.25,-3,!1,.8,!0)),d(`stall_fabric`,`Market stall (ankara bolts)`,`fabric`,[3.4,.95,-3.4],[1.7,.5,.8],[0,0,1],j.baseOf(`#d13b2e`));let fe=new nc(`umbrella`);l.push(fe);let pe=new oc(`umbrella`,null,{fade:fe,doubleSide:!0}),me=[`#d13b2e`,`#f1c232`];for(let e=0;e<8;e++)pe.add(new Qe(.03,1.4,.45,3,1,!0,e*R/8,R/8),Q(3.4,2.3,-3.4),me[e%2]);u(pe.build()),d(`umbrella`,`Market umbrella`,`canopy`,[3.4,2.3,-3.4],[2.8,.5,2.8],[0,-1,0],pe.baseOf(`#d13b2e`));let he=`#9b9a93`;for(let[e,t,n]of[[6.95,7.4,.4],[7.4,7.85,.8],[7.85,8.3,1.2]])j.span(10,0,e,11.4,n,t,he),s.push(Ao(10,e,11.4,t,!1,n,!0));d(`block_steps`,`Hollow-block steps`,`blocks`,[10.7,.6,7.6],[1.4,1.2,1.35],[0,0,-1],j.baseOf(he));let ge=Q(14,0,7.4);for(let[e,t]of[[-.42,-.42],[.42,-.42],[-.42,.42],[.42,.42]])N(j,ge,e,0,t,.045,.045,1.32,`#4a4d52`,6);M(j,ge,0,1.36,0,1,.08,1,`#4a4d52`),N(j,ge,0,1.4,0,.5,.48,.95,`#25282b`,14),j.add(new k(.48,14,5,0,R,0,Math.PI/2),ge.clone().multiply(Q(0,2.35,0)),`#2f3235`),s.push(jo(14,7.4,.6)),d(`water_tank`,`Black water tank on a stand`,`tank`,[14,1.4,7.4],[1.1,2.8,1.1],[-1,0,0],j.baseOf(`#25282b`));let _e=`#6a4a2c`;[[-14.38,.1,0],[-14.14,.1,0],[-13.9,.1,0],[-14.26,.29,0],[-14.02,.29,0],[-14.14,.48,0]].forEach(([e,t],n)=>{for(let r=0;r<2;r++)j.add(new Qe(.1,.1,.55,7),Q(e,t,-4.45+r*.52+(le()-.5)*.04,0,Math.PI/2),(n+r)%2?_e:`#7d5a36`)}),s.push(Ao(-14.65,-4.75,-13.75,-3.9,!1,.62,!0)),d(`firewood`,`Firewood stack`,`firewood`,[-14.2,.3,-4.2],[.9,.65,1],[1,0,0],j.baseOf(_e));let ve=`#b8321f`,ye=Q(-1.5,0,-3.3);for(let e of[-.7,.7])j.add(new Le(.26,.07,6,14),ye.clone().multiply(Q(e,.33,0)),`#1d1d20`),N(j,ye,e,.28,-.05,.07,.07,.1,`#9a9a9a`,8);M(j,ye,0,.42,0,1,.07,.1,`#7d2417`),M(j,ye,.2,.64,0,.42,.2,.3,ve),M(j,ye,-.32,.66,0,.62,.1,.28,`#1f1f22`),M(j,ye,.05,.3,0,.3,.24,.22,`#6b6b6b`),M(j,ye,.62,.58,0,.05,.62,.08,`#4a4a4a`,0,-.32),M(j,ye,.54,.88,0,.06,.05,.55,`#2a2a2a`),j.add(new k(.09,8,6),ye.clone().multiply(Q(.7,.8,0)),`#f3e7a3`),N(j,ye,-.4,.24,.16,.035,.03,.55,`#555`,6),s.push(Ao(-2.45,-3.55,-.55,-3.05,!1,.95,!0)),d(`okada`,`Okada (red motorbike)`,`bike`,[-1.5,.5,-3.3],[1.9,1,.45],[0,0,1],j.baseOf(ve));let be=`#2e7d5b`,U=new nc(`container`);l.push(U);let xe=new oc(`container`,i.rusty_metal,{texel:1.5,fade:U,doubleSide:!0});xe.add(sc(3.2,2.4,14),Q(7.2,1.25,-1,Math.PI),be),xe.add(sc(3.2,2.4,14),Q(7.2,1.25,1.4,0),be),xe.add(sc(2.4,2.4,10),Q(8.8,1.25,.2,Math.PI/2),be),xe.add(sc(3.4,2.6,15),Q(7.2,2.5,.2,0,-Math.PI/2),`#2a6a4d`),xe.add(sc(1.2,2.3,6),Q(5,1.2,-1.07,Math.PI),`#2a5db0`),xe.add(sc(1.2,2.3,6),Q(5,1.2,1.47,0),`#2a5db0`),xe.add(new G(.12,2.5,.12),Q(5.6,1.25,-.98),`#23272b`),xe.add(new G(.12,2.5,.12),Q(5.6,1.25,1.38),`#23272b`),xe.add(new G(.14,.14,2.5),Q(5.6,2.45,.2),`#23272b`),u(xe.build()),M(te,Q(7.2,0,.2),0,.05,0,3,.1,2.3,`#7a5a38`),s.push(Ao(5.5,-1.1,8.9,-.97,!0),Ao(5.5,1.34,8.9,1.47,!0),Ao(8.77,-1.1,8.9,1.47,!0),Ao(4.4,-1.15,5.6,-.99,!0),Ao(4.4,1.38,5.6,1.52,!0),Ao(5.7,-.9,8.7,1.3,!1,.1,!0));for(let[e,t,n,r]of[[8.35,-.55,.3,`#e8b520`],[8.35,-.55,.6,`#c0291f`]])j.span(e-.3,.1+(n-.3),t-.22,e+.3,.1+n,t+.22,r);B(8.3,.25,.85,.3),B(8.28,.5,.82,-.2,`#a8402f`),s.push(Ao(8.03,-.77,8.67,-.33,!1,.7,!0),jo(8.3,.85,.34,.65,!0)),d(`container_north`,`Container shop, outer wall`,`container`,[7.2,1.25,-1],[3.2,2.4,.2],[0,0,-1],xe.baseOf(be)),d(`container_south`,`Container shop, outer wall`,`container`,[7.2,1.25,1.4],[3.2,2.4,.2],[0,0,1],xe.baseOf(be)),d(`container_inside`,`Container shop, inner back wall`,`container`,[8.7,1.25,.2],[.2,2.4,2.3],[-1,0,0],xe.baseOf(be)),d(`container_doors`,`Container doors (blue)`,`container`,[5,1.2,-1.07],[1.2,2.3,.2],[0,0,-1],xe.baseOf(`#2a5db0`));for(let[e,t,n]of[[0,.3,`#e8b520`],[1,.6,`#c0291f`],[2,.9,`#e8b520`]]){let r=-5.6+e*.55;j.span(r,0,3.2,r+.55,t,3.75,n),j.span(r+.05,t,3.25,r+.5,t+.015,3.7,`#6f5410`),s.push(Ao(r,3.2,r+.55,3.75,!1,t,!0))}d(`crate_stairs`,`Crate stairs`,`crates`,[-4.8,.45,3.5],[1.65,.9,.55],[0,0,1],j.baseOf(`#e8b520`)),j.span(-9.8,0,5.9,-6.8,.85,6.5,`#a9a79f`),j.span(-9.7,.85,5.95,-6.9,.92,6.45,`#4e6b34`),s.push(Ao(-9.8,5.9,-6.8,6.5,!1,.85,!0)),d(`planter`,`Concrete planter`,`planter`,[-8.3,.45,6.2],[3,.9,.6],[0,0,-1],j.baseOf(`#a9a79f`)),M(te,Q(-10,0,3.4),0,.075,0,1.2,.15,1,`#8a6a42`);for(let e=0;e<4;e++)for(let[t,n]of[[-.28,-.2],[.28,-.2],[-.28,.2],[.28,.2]])M(j,Q(-10+e%2*.03,0,3.4,e*.5),t,.21+e*.12,n,.5,.12,.33,e%2?`#b8b2a4`:`#a39d90`);s.push(Ao(-10.6,2.9,-9.4,3.9,!1,.66,!0)),d(`cement_bags`,`Cement bags on a pallet`,`sacks`,[-10,.4,3.4],[1.2,.8,1],[0,0,-1],j.baseOf(`#b8b2a4`)),u(j.build()),u(te.build());let Se=`#5a8a38`,Ce={grass:Tt(Se),leafsGreen:Tt(`#4f8a3a`),woodBark:Tt(`#8a6a46`)},W=(e,t,n={})=>{for(let i of pc(r[e],t,n))a.add(i)},we=[{x:-.95,z:8.55,rx:.2,s:[4.2,3.4,4.2],tint:`#d49a6a`},{x:0,z:8.55,rx:.22,ry:.06,s:[4.2,3.4,4.2],tint:`#b9bec3`},{x:.95,z:8.55,rx:.2,ry:-.05,s:[4.2,3.4,4.2],tint:`#e0b896`}];W(`surv_metal-panel`,we),s.push(Ao(-1.6,8.3,1.6,8.9)),we.forEach((e,t)=>d(`sheet_${t}`,`Leaning zinc sheet`,`sheets`,[e.x,.9,8.6],[2,1.8,.4],[0,0,1],mc(r[`surv_metal-panel`][0],e.tint))),W(`surv_box`,[{x:12.4,z:-8,s:3.4},{x:13.4,z:-8.05,ry:.15,s:3.4},{x:12.9,y:.86,z:-8,ry:.4,s:3.4}]),W(`surv_box-large`,[{x:14.1,z:-6.9,ry:1.2,s:3.4}]),s.push(Ao(11.95,-8.45,12.85,-7.55,!1,.85,!0),Ao(12.95,-8.5,13.85,-7.6,!1,.85,!0),Ao(12.45,-8.45,13.35,-7.55,!1,1.71,!0),jo(14.1,-6.9,.6,.85,!0)),d(`crates`,`Stacked crates`,`crates`,[13,.6,-7.9],[2.4,1.3,1.1],[0,0,1],mc(r.surv_box[0]));let Te=[{x:1.55,z:-8.3,s:2.3,tint:`#e0503c`},{x:-7.2,z:-8,s:2.3,tint:`#2a6fd0`},{x:-12,z:8.05,s:2.3,tint:`#f0c030`},{x:12.5,z:7.9,s:2.3,tint:`#3da35a`}];W(`surv_bucket`,Te),Te.forEach(e=>s.push(jo(e.x,e.z,.2,.44,!0)));let Ee=[{x:8,z:3.1},{x:8.3,z:6},{x:13.7,z:-3.4}];W(`car_cone`,Ee),Ee.forEach(e=>s.push(jo(e.x,e.z,.22))),W(`nat_plant_bushLarge`,[{x:13.9,z:-5.4,s:5.2,ry:.4},{x:-13.7,z:2,s:5,ry:2},{x:-17.5,z:-11,s:5.5},{x:-18.5,z:6,s:6},{x:18,z:-12.5,s:5.5,ry:1},{x:19,z:8.5,s:5.2},{x:-4,z:-17.5,s:5.5},{x:6,z:18,s:5.2}],{materials:Ce}),s.push(jo(13.9,-5.4,.85),jo(-13.7,2,.8)),d(`bush_east`,`Bush against the east fence`,`foliage`,[13.9,.6,-5.4],[2,1.2,2],[1,0,0],new c(Se)),d(`bush_west`,`Bush by the west wall`,`foliage`,[-13.7,.6,2],[2,1.2,2],[-1,0,0],new c(Se)),W(`nat_plant_bush`,[{x:-6,z:-17,s:5},{x:10,z:-18,s:5,ry:2},{x:22,z:2,s:5},{x:-21,z:-3,s:5}],{materials:Ce}),W(`nat_tree_palm`,[{x:-19,z:-4,s:4.5},{x:-20,z:12,s:4.2,ry:1},{x:20,z:-9,s:4.4},{x:21,z:12,s:4.6,ry:2},{x:-9,z:-19,s:4.4},{x:11,z:20,s:4.3}],{materials:Ce}),W(`nat_tree_palmShort`,[{x:18,z:0,s:4},{x:4,z:-20,s:4,ry:1},{x:-22,z:7,s:4,ry:2}],{materials:Ce});let De=r.car_van,Oe=De.find(e=>e.name===`body`),ke=De.filter(e=>e.name.startsWith(`wheel`)),K=new gt;K.position.set(10.65,0,4.4),K.rotation.y=Math.PI/2,K.scale.set(1.35,1.7,1.7);let q=new It(Oe.geometry,kc(Oe.material.map));q.applyMatrix4(Oe.local),q.castShadow=q.receiveShadow=!0,q.name=`danfo-body`,q.userData.baseColor=new c(Oc);let Ae=ke.map(e=>e.geometry.clone().applyMatrix4(e.local)),je=new It(dt(Ae,!1),ke[0].material);je.castShadow=!0,je.name=`danfo-wheels`,je.userData.baseColor=ke[0].baseColor.clone(),K.add(q,je),a.add(K),s.push(Ao(8.3,3.35,13,5.45,!0)),d(`danfo`,`Danfo (yellow, black stripes)`,`vehicle`,[10.65,1,4.4],[4.7,2.1,2],[0,0,-1],new c(Oc));let Me=(e,t)=>new Y(e,0,t),J=(e,t)=>new Y(e,0,t),Ne=[{id:`sign_wall`,label:`Painted turquoise wall (THIS HOUSE IS NOT FOR SALE)`,shape:`flat wall`,at:Me(-11.6,-.9),facing:J(0,-1)},{id:`post_no_bill`,label:`POST NO BILL cream patch`,shape:`flat wall, small patch`,at:Me(-10.9,-8.45),facing:J(0,-1),probeY:1.55},{id:`drums_a`,label:`Blue drum cluster`,shape:`round cluster`,at:Me(-10.2,-4.5),facing:J(0,-1)},{id:`drums_b`,label:`Blue drums by the south veranda`,shape:`round cluster`,at:Me(4.9,4.55),facing:J(0,1)},{id:`doorway_north`,label:`Red doorway recess (north row)`,shape:`recess`,at:Me(-2.5,Pe(.45)),facing:J(0,-1),reach:.4},{id:`doorway_south`,label:`Yellow doorway recess (south row)`,shape:`recess`,at:Me(-7.5,9.45),facing:J(0,1),reach:.4},{id:`clothesline`,label:`Under the clothes line`,shape:`hanging cloth, multicolour`,at:Me(-7.5,.35),facing:J(0,1)},{id:`danfo`,label:`Beside the danfo`,shape:`long vehicle`,at:Me(10.65,2.95),facing:J(0,1)},{id:`zinc_fence`,label:`Against the zinc fence`,shape:`corrugated fence`,at:Me(14.3,6.2),facing:J(1,0)},{id:`generator`,label:`Behind the generator`,shape:`box block`,at:Me(-14.2,4.6),facing:J(1,0)},{id:`chairs_stack`,label:`Stacked white chairs`,shape:`tall stack`,at:Me(9.3,7.65),facing:J(0,1)},{id:`bush_east`,label:`Bush in the east corner`,shape:`foliage`,at:Me(12.75,-5.4),facing:J(1,0)},{id:`bench`,label:`Wooden bench on the south veranda`,shape:`low bench`,at:Me(-4.5,7.6),facing:J(0,1)},{id:`sheets`,label:`Rusty zinc sheets leaning on the wall`,shape:`leaning slabs`,at:Me(0,7.9),facing:J(0,1)},{id:`crates`,label:`Stacked crates`,shape:`stepped boxes`,at:Me(12.9,-6.9),facing:J(0,-1)},{id:`container`,label:`Inside the container shop`,shape:`enclosed box, one open side`,at:Me(8.3,.2),facing:J(1,0),probeY:1},{id:`crate_stairs`,label:`Bottle-crate stairs (climbable)`,shape:`stepped crates`,at:Me(-4.8,2.55),facing:J(0,1),probeY:.4},{id:`planter`,label:`Concrete planter (climbable)`,shape:`long low wall`,at:Me(-8.3,5.2),facing:J(0,1),probeY:.5},{id:`cement_bags`,label:`Cement bags on a pallet (climbable)`,shape:`grey pile`,at:Me(-10,2.5),facing:J(0,1),probeY:.4},{id:`sacks`,label:`Pile of sacks`,shape:`soft pile`,at:Me(0,-7.25),facing:J(0,-1)},{id:`tyres`,label:`Stack of tyres`,shape:`black stack`,at:Me(11.85,-3.4),facing:J(1,0)},{id:`gas`,label:`Gas cylinders`,shape:`round cluster, low`,at:Me(-13.3,7),facing:J(0,1)},{id:`stall_fabric`,label:`Market stall with ankara bolts`,shape:`multicolour table`,at:Me(3.4,-2.6),facing:J(0,-1),probeY:.9},{id:`block_steps`,label:`Hollow-block steps (climbable)`,shape:`stepped blocks`,at:Me(10.7,6.45),facing:J(0,1),probeY:.4},{id:`water_tank`,label:`Water tank on a stand`,shape:`tall cylinder`,at:Me(13.1,7.4),facing:J(1,0),probeY:1.6},{id:`firewood`,label:`Firewood stack`,shape:`low log pile`,at:Me(-13.1,-4.2),facing:J(-1,0),probeY:.4},{id:`okada`,label:`Okada (motorbike)`,shape:`low vehicle`,at:Me(-1.5,-2.45),facing:J(0,-1),probeY:.5},{id:`north_wall`,label:`Turquoise band under the north veranda`,shape:`flat wall band`,at:Me(-12.5,-8.5),facing:J(0,-1)}];function Pe(e){return-9-e}let Fe=Ne.map(e=>{let t=e.at.clone().addScaledVector(e.facing,e.reach??.55);t.y=e.probeY??.9;let n={s:o.nearest(t,1.5)},r={x:e.at.x,z:e.at.z};return qo(r,.3-.02,s)&&console.warn(`[compound] hiding spot ${e.id} overlaps a collider (would move to ${r.x.toFixed(2)}, ${r.z.toFixed(2)})`),{id:e.id,label:e.label,shape:e.shape,position:e.at,facing:e.facing.normalize(),baseColor:n.s.baseColor.clone(),surfaceId:n.s.id}}),Ie=new gt;Ie.visible=!1,Ie.name=`hiding-markers`;let Re=()=>new H({color:`#ff2fd0`,depthTest:!1,transparent:!0,opacity:.9}),ze=new ce(new se(.14),Re(),Fe.length),Be=new ce(new y(.28,.36,20).rotateX(-Math.PI/2),Re(),Fe.length);Fe.forEach((e,t)=>{ze.setMatrixAt(t,Q(e.position.x,2.45,e.position.z)),Be.setMatrixAt(t,Q(e.position.x,.05,e.position.z))});for(let e of[ze,Be])e.renderOrder=999,e.frustumCulled=!1,Ie.add(e);return a.add(Ie),{group:a,colliders:s,surfaces:o,hidingSpots:Fe,fadeGroups:l,bounds:{minX:-14.7,maxX:14.75,minZ:-9.6,maxZ:9.6},id:`compound`,name:`The Compound`,assetCount:Ac,chickenCount:7,seekerTuning:{speed:1,fov:1,range:1},ambience:{chatter:1,generator:!0},seekerStart:{x:13.2,z:0,yaw:-Math.PI/2},lobbyPos:{x:.5,z:.5},chickenArea:{minX:-14.2,maxX:14.2,minZ:-8.7,maxZ:8.7},ground:{halfX:15,halfZ:9,patches:Da},spawn:new Y(.5,0,.5),generator:I,gate:{x:14.6,z:0,halfWidth:2.6},baseColorAt:e=>o.baseColorAt(e),setMarkersVisible:e=>Ie.visible=e}}function Mc(e,t){e.background=new c(`#d9b88f`),e.fog=new be(`#d9b48b`,42,105);let n=new W(`#b4c8e4`,`#80603f`,1.3),r=new E(`#ffcf9a`,3);r.castShadow=!0;let i=t;r.shadow.mapSize.set(i,i);let a=r.shadow.camera;a.left=a.bottom=-17,a.right=a.top=17,a.near=1,a.far=110,r.shadow.radius=2.5,r.shadow.bias=-4e-4,r.shadow.normalBias=.05,e.add(r,r.target,n);let o=new Y(-.72,.5,.42).normalize(),s={bg:new c(`#d9b88f`),fog:new c(`#d9b48b`),near:42,far:105,hemi:1.3,sun:3,hemiSky:new c(`#b4c8e4`),hemiGround:new c(`#80603f`)},l={bg:new c(`#0b1124`),near:7,far:48,hemi:.42,sun:.28,hemiSky:new c(`#5b72b8`),hemiGround:new c(`#2b2a3a`)},u={bg:new c(`#a9b0b8`),near:22,far:70,hemi:1.05,sun:1.5};return{sun:r,setMood(t,i){let a=Math.min(1,Math.max(0,t)),o=Math.min(1,Math.max(0,i))*(1-a),c=s.bg.clone().lerp(u.bg,o).lerp(l.bg,a);e.background.copy(c);let d=e.fog;d.color.copy(c),d.near=s.near+(u.near-s.near)*o+(l.near-s.near)*a,d.far=s.far+(u.far-s.far)*o+(l.far-s.far)*a,n.intensity=s.hemi+(u.hemi-s.hemi)*o+(l.hemi-s.hemi)*a,r.intensity=s.sun+(u.sun-s.sun)*o+(l.sun-s.sun)*a,n.color.copy(s.hemiSky).lerp(l.hemiSky,a),n.groundColor.copy(s.hemiGround).lerp(l.hemiGround,a)},setShadowSize(e){e!==i&&(i=e,r.shadow.mapSize.set(e,e),r.shadow.map?.dispose(),r.shadow.map=null)},follow(e){let t=34/i,n=new Y(0,1,0).cross(o).normalize(),a=new Y().crossVectors(o,n),s=Math.round((e.x*n.x+e.z*n.z)/t)*t,c=Math.round((e.x*a.x+e.y*a.y+e.z*a.z)/t)*t,l=e.x*o.x+e.y*o.y+e.z*o.z;r.target.position.copy(n).multiplyScalar(s).addScaledVector(a,c).addScaledVector(o,l),r.position.copy(r.target.position).addScaledVector(o,60)}}}var Nc=[{id:`compound`,name:`The Compound`,blurb:`A Lagos yard: rooms, a danfo, drums and a zinc fence.`},{id:`market`,name:`The Market`,blurb:`Stalls hung with ankara cloth, produce crates and a keke. Busier backgrounds.`},{id:`classroom`,name:`The Classroom`,blurb:`Rows of desks, a chalkboard, lockers and bookcases. Try the school uniform.`}],Pc=`boju.level`;function Fc(){let e=null;try{e=localStorage.getItem(Pc)}catch{}return Nc.some(t=>t.id===e)?e:Nc[0].id}function Ic(e){try{localStorage.setItem(Pc,e)}catch{}}var Lc=e=>e===`market`?14:e===`classroom`?12:17;async function Rc(e,t){return e===`market`?(await Ht(async()=>{let{createMarket:e}=await import(`./market-BeMUZQMs.js`);return{createMarket:e}},__vite__mapDeps([0,1,2,3]),import.meta.url)).createMarket(t):e===`classroom`?(await Ht(async()=>{let{createClassroom:e}=await import(`./classroom-D4hwMM-Q.js`);return{createClassroom:e}},__vite__mapDeps([4,1,2,3]),import.meta.url)).createClassroom(t):(await Ht(async()=>{let{createCompound:e}=await import(`./compound-Dre63tS7.js`);return{createCompound:e}},[],import.meta.url)).createCompound(t)}var zc={count:7,radius:.14,walkSpeed:.7,fleeSpeed:3.4,scareDistance:2,runBoost:1.5,fleeTime:[.9,1.6],idleTime:[1.5,4],peckTime:[1.5,3.5],wanderRange:[1,4],area:{minX:-14.2,maxX:14.2,minZ:-8.7,maxZ:8.7},noticeRange:4,alertTime:.45,hearRange:14,panicTime:2.6,squawkEvery:.7,snitchCooldown:9,plumage:[`#f2eee4`,`#8a4b2a`,`#2b2623`,`#c8903f`,`#a89a82`,`#d9d2c0`,`#6b3a22`]},Bc=new je,Vc=new ge,Hc=new z,Uc=(e,t,n,r=0,i=0,a=0,o=1,s=1,c=1)=>new je().compose(new Y(e,t,n),Vc.setFromEuler(Hc.set(r,i,a,`YXZ`)),new Y(o,s,c));function Wc(e,t,n){let r=nt(e.clone());for(let e of Object.keys(r.attributes))e!==`position`&&e!==`normal`&&r.deleteAttribute(e);r.applyMatrix4(t);let i=new c(n),a=new Float32Array(r.attributes.position.count*3);for(let e=0;e<r.attributes.position.count;e++)a.set([i.r,i.g,i.b],e*3);return r.setAttribute(`color`,new Ot(a,3)),r}var Gc=(e,[t,n])=>t+e()*(n-t),Kc=class{colliders;cfg;group=new gt;hens=[];body;head;face;legs;r;constructor(e,t=5,n=zc){this.colliders=e,this.cfg=n;let r=t>>>0;this.r=()=>(r=r*1664525+1013904223>>>0)/4294967296;let i=`#ffffff`,a=new k(1,8,6),o=dt([Wc(a,Uc(0,0,0,0,0,0,.15,.14,.22),i),Wc(a,Uc(0,.1,.15,0,0,0,.08,.1,.08),i),Wc(new de(.08,.24,5),Uc(0,.1,-.23,-2.2),i),Wc(a,Uc(-.13,.02,-.02,0,0,.12,.04,.11,.17),i),Wc(a,Uc(.13,.02,-.02,0,0,-.12,.04,.11,.17),i)]),s=Wc(a,Uc(0,0,0,0,0,0,.062,.062,.07),i),l=dt([Wc(new de(.026,.075,5),Uc(0,-.012,.09,Math.PI/2),`#e8a020`),Wc(new G(.02,.045,.075),Uc(0,.07,0),`#c4262e`),Wc(a,Uc(0,-.055,.055,0,0,0,.016,.024,.016),`#c4262e`),Wc(a,Uc(-.052,.014,.04,0,0,0,.011,.011,.011),`#111111`),Wc(a,Uc(.052,.014,.04,0,0,0,.011,.011,.011),`#111111`)]),u=dt([Wc(new Qe(.011,.014,.14,5),Uc(0,-.07,0),`#d9a441`),Wc(new G(.05,.012,.075),Uc(0,-.14,.02),`#d9a441`)]),d=n.count,f=Tt(`#ffffff`,{vertexColors:!0}),p=Tt(`#ffffff`,{vertexColors:!0});this.body=new ce(o,f,d),this.head=new ce(s,f,d),this.face=new ce(l,p,d),this.legs=new ce(u,p,d*2);let m=new c;for(let e=0;e<d;e++)m.set(n.plumage[e%n.plumage.length]),this.body.setColorAt(e,m),this.head.setColorAt(e,m),this.face.setColorAt(e,m.set(`#ffffff`)),this.legs.setColorAt(e*2,m),this.legs.setColorAt(e*2+1,m);for(let e of[this.body,this.head,this.face,this.legs])e.instanceMatrix.setUsage(j),e.castShadow=!0,e.receiveShadow=!0,e.frustumCulled=!1,this.group.add(e);this.body.userData.baseColor=new c(n.plumage[0]),this.group.name=`chickens`;let h=n.area;for(let e=0;e<d;e++){let e={x:0,z:0,yaw:this.r()*Math.PI*2,state:`idle`,timer:Gc(this.r,n.idleTime)*this.r(),tx:0,tz:0,phase:this.r()*6,peckPhase:this.r()*6,hop:0,hopV:0,lookYaw:0,lookTarget:0,speed:0,stuck:0,snitchCd:0,squawkT:0,hopT:0};for(let t=0;t<40&&(e.x=h.minX+this.r()*(h.maxX-h.minX),e.z=h.minZ+this.r()*(h.maxZ-h.minZ),!this.free(e.x,e.z));t++);this.hens.push(e)}this.write()}free(e,t){return!qo({x:e,z:t},this.cfg.radius+.15,this.colliders,-5)}pickTarget(e){let t=this.cfg.area;for(let n=0;n<12;n++){let n=this.r()*Math.PI*2,r=Gc(this.r,this.cfg.wanderRange),i=Math.min(t.maxX,Math.max(t.minX,e.x+Math.sin(n)*r)),a=Math.min(t.maxZ,Math.max(t.minZ,e.z+Math.cos(n)*r));if(this.free(i,a)){e.tx=i,e.tz=a;return}}e.tx=e.x,e.tz=e.z}update(e,t,n){let r=this.cfg;e=Math.min(e,.05);let i=[];for(let a of this.hens){a.snitchCd=Math.max(0,a.snitchCd-e);let o=0,s=0,c=!1;for(let e of t){let t=a.x-e.x,n=a.z-e.z,i=Math.hypot(t,n);i<r.scareDistance*(e.running?r.runBoost:1)&&(c=!0,o+=t/(i||1),s+=n/(i||1))}if(n?.active&&a.state!==`panic`&&a.state!==`alert`&&a.snitchCd<=0&&Math.hypot(a.x-n.player.x,a.z-n.player.z)<=r.noticeRange&&(a.state=`alert`,a.timer=r.alertTime,a.hopV=1.2),a.state===`alert`){let t=n?n.player.x-a.x:0,o=n?n.player.z-a.z:0,s=Math.hypot(t,o),c=Math.atan2(Math.sin(Math.atan2(t,o)-a.yaw),Math.cos(Math.atan2(t,o)-a.yaw));a.yaw+=Math.max(-9*e,Math.min(9*e,c)),a.timer-=e,!n?.active||s>r.noticeRange*1.5?(a.state=`idle`,a.timer=Gc(this.r,r.idleTime)):a.timer<=0&&(a.state=`panic`,a.timer=r.panicTime,a.snitchCd=r.snitchCooldown+r.panicTime,a.squawkT=r.squawkEvery,a.hopT=0,a.hopV=2.4,i.push({x:a.x,z:a.z,first:!0}))}if(a.state===`panic`){if(a.hopT-=e,a.hopT<=0){a.hopT=.35,a.hopV=2+this.r()*.6;let e=this.r()*Math.PI*2;a.tx=a.x+Math.sin(e)*2.5,a.tz=a.z+Math.cos(e)*2.5}a.squawkT-=e,a.squawkT<=0&&(a.squawkT=r.squawkEvery,i.push({x:a.x,z:a.z,first:!1}))}c&&a.state!==`flee`&&a.state!==`panic`&&(a.state=`flee`,a.timer=Gc(this.r,r.fleeTime),a.hopV=1.6+this.r()*.6),a.state===`flee`&&c&&(a.tx=a.x+o*3,a.tz=a.z+s*3,a.timer=Math.max(a.timer,.35)),a.state!==`alert`&&(a.timer-=e),a.state===`idle`&&a.timer<=0?this.r()<.55?(a.state=`peck`,a.timer=Gc(this.r,r.peckTime)):(a.state=`walk`,this.pickTarget(a),a.timer=6):(a.state===`peck`&&a.timer<=0||(a.state===`flee`||a.state===`panic`)&&a.timer<=0)&&(a.state=`idle`,a.timer=Gc(this.r,r.idleTime));let l=0;if(a.state===`walk`||a.state===`flee`||a.state===`panic`){let t=a.tx-a.x,n=a.tz-a.z,i=Math.hypot(t,n);if(i<.1&&a.state===`walk`)a.state=`idle`,a.timer=Gc(this.r,r.idleTime);else if(l=a.state===`flee`?r.fleeSpeed:a.state===`panic`?r.fleeSpeed*.85:r.walkSpeed,i>.25){let r=Math.atan2(t,n),i=Math.atan2(Math.sin(r-a.yaw),Math.cos(r-a.yaw)),o=(a.state===`flee`||a.state===`panic`?11:4.5)*e;a.yaw+=Math.max(-o,Math.min(o,i))}}if(a.speed+=(l-a.speed)*Math.min(1,e*9),a.speed>.02){let t={x:a.x+Math.sin(a.yaw)*a.speed*e,z:a.z+Math.cos(a.yaw)*a.speed*e},n=qo(t,r.radius,this.colliders,-5);t.x=Math.min(r.area.maxX+.5,Math.max(r.area.minX-.5,t.x)),t.z=Math.min(r.area.maxZ+.5,Math.max(r.area.minZ-.5,t.z)),a.x=t.x,a.z=t.z,a.stuck=n&&a.state===`walk`?a.stuck+e:0,a.stuck>.45&&(a.stuck=0,this.pickTarget(a)),a.phase+=e*(3+a.speed*5)}a.state===`peck`&&(a.peckPhase+=e*7),a.state===`idle`&&this.r()<e*.8&&(a.lookTarget=(this.r()-.5)*1.6),a.lookYaw+=(a.lookTarget-a.lookYaw)*Math.min(1,e*8),a.state!==`idle`&&(a.lookTarget=0),(a.hopV!==0||a.hop>0)&&(a.hopV-=9*e,a.hop=Math.max(0,a.hop+a.hopV*e),a.hop===0&&a.hopV<0&&(a.hopV=0))}return this.write(),i}write(){this.hens.forEach((e,t)=>{let n=e.speed>.05,r=n?Math.abs(Math.sin(e.phase))*.012:0,i=e.state===`peck`?Math.max(0,Math.sin(e.peckPhase))**2:0,a=+(e.state===`flee`||e.state===`panic`),o=.22+r+e.hop,s=Uc(e.x,o,e.z,i*.3-a*.12,e.yaw,0);this.body.setMatrixAt(t,s);let c=n?Math.sin(e.phase*2)*.03:0,l=s.clone().multiply(Uc(0,.2-i*.1,.2+c+i*.09,i*1.2,e.lookYaw,0));this.head.setMatrixAt(t,l),this.face.setMatrixAt(t,l);let u=n?Math.sin(e.phase)*Math.min(1,.4+e.speed*.4):0,d=Uc(e.x,o-.08-r*.2,e.z,0,e.yaw,0);this.legs.setMatrixAt(t*2,Bc.copy(d).multiply(Uc(-.06,0,0,u,0,0))),this.legs.setMatrixAt(t*2+1,Bc.copy(d).multiply(Uc(.06,0,0,-u,0,0)))});for(let e of[this.body,this.head,this.face,this.legs])e.instanceMatrix.needsUpdate=!0}positions(){return this.hens.map(e=>({x:e.x,z:e.z}))}get states(){return this.hens.map(e=>e.state)}},qc={colorMaxPoints:75,zoneWeight:{top:.55,bottom:.45},labPerfect:8,labWorst:60,colorCurve:1.4,patternOnClothCredit:.35,patternOnPlainCredit:-.12,unpaintedCredit:0,zoneHeights:{default:{top:1.15,bottom:.5},crouch:{top:.78,bottom:.36},curl_ball:{top:.5,bottom:.3}},shapeMaxPoints:25,pose:{wall_flat:{maxWallDistance:.45,backToWallDot:.7},curl_ball:{radius:1.1,kinds:[`drums`,`crates`,`chairs`,`sacks`,`tyres`,`firewood`]},crouch:{radius:1.2,maxHeight:1.3,kinds:[`bench`,`table`,`crates`,`chairs`,`generator`,`drums`,`sacks`,`tyres`,`gas`,`bike`,`blocks`,`firewood`,`fabric`,`planter`],viewerSideDot:.3},stand_stiff:{radius:.9,kinds:[`cloth`,`foliage`,`chairs`,`tank`,`gas`,`canopy`]}},mismatchCredit:0,skinPenalty:6,skinPoseFactor:{curl_ball:.4,crouch:.75,wall_flat:.85},hairPenalty:9,hatPenalty:12,accessoryPenalty:8,movePenaltyWalk:55,movePenaltyRun:80,moveRecoverSeconds:1,meterSmoothing:10,evalHz:12};function Jc(e){let t=(.4124564*e.r+.3575761*e.g+.1804375*e.b)/.95047,n=.2126729*e.r+.7151522*e.g+.072175*e.b,r=(.0193339*e.r+.119192*e.g+.9503041*e.b)/1.08883,i=e=>e>.008856?Math.cbrt(e):7.787*e+16/116,a=i(t),o=i(n),s=i(r);return[116*o-16,500*(a-o),200*(o-s)]}function Yc(e,t){let[n,r,i]=Jc(e),[a,o,s]=Jc(t);return Math.hypot(n-a,r-o,i-s)}var Xc=e=>Math.min(1,Math.max(0,e)),Zc=class{probe;config;breakdown;display=0;slow=null;sinceEval=1/0;moveLevel=0;moveAtStop=0;tmp=new Y;constructor(e,t=qc){this.probe=e,this.config=t,this.breakdown={total:0,zones:[],colorPoints:0,shape:{pose:`none`,credit:0,points:0,reason:``},exposure:{skin:0,hair:0,hat:0,accessory:0,total:0},movement:{penalty:0,moving:!1}}}invalidate(){this.sinceEval=1/0}update(e,t){let n=this.config,r=t.speed>.05;r?(this.moveLevel=t.running?n.movePenaltyRun:n.movePenaltyWalk,this.moveAtStop=this.moveLevel):this.moveLevel>0&&(this.moveLevel=Math.max(0,this.moveLevel-this.moveAtStop/n.moveRecoverSeconds*e)),this.sinceEval+=e,(!this.slow||this.sinceEval>=1/n.evalHz)&&(this.sinceEval=0,this.slow={zones:this.colorTerms(t),shape:this.shapeTerm(t)});let i=this.slow.zones.reduce((e,t)=>e+t.points,0),a=n.skinPenalty*(t.pose?n.skinPoseFactor[t.pose]??1:1),o=t.hairVisible?n.hairPenalty:0,s=t.hatVisible?n.hatPenalty:0,c=t.accessoryVisible?n.accessoryPenalty:0,l=a+o+s+c,u=Math.min(100,Math.max(0,i+this.slow.shape.points-l-this.moveLevel));return this.breakdown={total:u,zones:this.slow.zones,colorPoints:i,shape:this.slow.shape,exposure:{skin:a,hair:o,hat:s,accessory:c,total:l},movement:{penalty:this.moveLevel,moving:r}},this.display+=(u-this.display)*Math.min(1,e*n.meterSmoothing),this.breakdown}colorTerms(e){let t=this.config,n=e.pose&&t.zoneHeights[e.pose]||t.zoneHeights.default,r=[];for(let i of[`top`,`bottom`]){let a=this.tmp.copy(e.position);a.y+=n[i];let o=this.probe.behind(e.eye,a),s=0,c=null;e.painted[i]?o&&(c=Yc(e.zones[i],o.color),s=Xc(1-(c-t.labPerfect)/(t.labWorst-t.labPerfect))**t.colorCurve,e.patterns&&e.patterns[i]!==`solid`&&(s=Xc(s+(o.kind===`cloth`?t.patternOnClothCredit:t.patternOnPlainCredit)))):s=t.unpaintedCredit,r.push({zone:i,painted:e.painted[i],behind:o?`${o.label} #${o.color.getHexString()}`:`nothing`,deltaE:c,credit:s,points:t.colorMaxPoints*t.zoneWeight[i]*s})}return r}shapeTerm(e){let t=this.config,n=(n,r)=>({pose:e.pose??`none`,credit:n,points:t.shapeMaxPoints*n,reason:r});if(!e.pose||e.pose===`idle`||e.pose===`walk`||e.pose===`run`)return n(0,`no pose held`);let r=e=>n(t.mismatchCredit,e),i=Math.sin(e.yaw),a=Math.cos(e.yaw);if(e.pose===`wall_flat`){let o=t.pose.wall_flat,s=this.probe.wall(e.position,o.maxWallDistance);if(!s)return r(`no wall within ${o.maxWallDistance} m`);let c=i*s.normal.x+a*s.normal.z;return c<o.backToWallDot?r(`wall ${s.distance.toFixed(2)} m away but not facing out (${c.toFixed(2)})`):n(1,`back to a wall, ${s.distance.toFixed(2)} m away`)}let o=t.pose[e.pose],s=this.probe.near(e.position,o.radius).filter(e=>o.kinds.includes(e.kind));if(e.pose===`crouch`){let i=t.pose.crouch,a=this.tmp.copy(e.eye).sub(e.position),o=Math.hypot(a.x,a.z)||1,c=s.filter(e=>e.maxY<=i.maxHeight&&(e.dir.x*a.x+e.dir.z*a.z)/o>=i.viewerSideDot);if(!c.length)return r(s.length?`low prop is not between you and the viewer`:`no low prop within ${i.radius} m`);let l=c.reduce((e,t)=>e.distance<t.distance?e:t);return n(Xc((i.radius-l.distance)/(i.radius*.4)),`hiding behind ${l.kind} (${l.id}), ${l.distance.toFixed(2)} m`)}if(!s.length)return r(`no ${o.kinds.join(`/`)} within ${o.radius} m`);let c=s.reduce((e,t)=>e.distance<t.distance?e:t);return n(Xc((o.radius-c.distance)/(o.radius*.4)),`next to ${c.kind} (${c.id}), ${c.distance.toFixed(2)} m`)}};function Qc(e,t=qc){let n=e=>e.toFixed(1).padStart(5),r=[];for(let i of e.zones)r.push(i.painted?`colour ${i.zone.padEnd(6)} ${n(i.points)}  dE ${i.deltaE===null?` n/a`:i.deltaE.toFixed(1).padStart(4)} -> ${(i.credit*100).toFixed(0).padStart(3)}%  behind: ${i.behind}`:`colour ${i.zone.padEnd(6)} ${n(i.points)}  not painted yet (credit ${(t.unpaintedCredit*100).toFixed(0)}%)  behind: ${i.behind}`);return r.push(`shape  ${e.shape.pose.padEnd(11)} ${n(e.shape.points)}  ${e.shape.reason}`),r.push(`skin                ${n(-e.exposure.skin)}`),r.push(`hair/hat/accessory  ${n(-(e.exposure.hair+e.exposure.hat+e.exposure.accessory))}  (${e.exposure.hair.toFixed(0)}/${e.exposure.hat.toFixed(0)}/${e.exposure.accessory.toFixed(0)})`),r.push(`movement            ${n(-e.movement.penalty)}  ${e.movement.moving?`moving`:e.movement.penalty>0?`recovering`:`still`}`),r.push(`TOTAL               ${n(e.total)}  (colour ${e.colorPoints.toFixed(1)} + shape ${e.shape.points.toFixed(1)} - ${e.exposure.total.toFixed(1)} - ${e.movement.penalty.toFixed(1)})`),r.join(`
`)}var $c=(e,t)=>e.style.cssText=t,el=e=>`#${e.getHexString()}`,tl=[`1 Stiff`,`2 Crouch`,`3 Wall`,`4 Ball`],nl=[`stand_stiff`,`crouch`,`wall_flat`,`curl_ball`];function rl(e,t){let n=document.createElement(`div`);$c(n,`position:fixed;inset:0;pointer-events:none;z-index:6;font:12px/1.4 system-ui,sans-serif;color:#fff;text-shadow:0 1px 3px #000`),document.body.appendChild(n);let r=document.createElement(`div`);$c(r,`position:absolute;top:8px;right:8px;width:260px;display:flex;flex-direction:column;gap:6px;align-items:stretch`),n.appendChild(r);let i=()=>innerWidth<600,a=document.createElement(`div`);$c(a,`background:#000a;border-radius:6px;padding:6px 8px`);let o=document.createElement(`div`);$c(o,`display:flex;justify-content:space-between;font-weight:600`);let s=Object.assign(document.createElement(`span`),{textContent:`0`});o.append(Object.assign(document.createElement(`span`),{textContent:`CAMO`}),s);let l=document.createElement(`div`);$c(l,`height:10px;border-radius:5px;background:#fff3;margin-top:4px;overflow:hidden`);let u=document.createElement(`div`);$c(u,`height:100%;width:0;border-radius:5px;background:#e33`),l.appendChild(u);let d=document.createElement(`div`);$c(d,`margin-top:4px;opacity:.8;font-size:11px`),a.append(o,l,d);let f=document.createElement(`div`);$c(f,`display:flex;flex-wrap:wrap;gap:4px 8px;background:#000a;border-radius:6px;padding:6px 8px;align-items:center`);let p={};for(let e of[`top`,`bottom`]){let t=document.createElement(`div`);$c(t,`display:flex;align-items:center;gap:6px;padding:3px 6px;border-radius:5px;border:2px solid transparent`);let n=document.createElement(`div`);$c(n,`width:26px;height:26px;border-radius:4px;border:1px solid #fff9`);let r=document.createElement(`div`),i=document.createElement(`div`);$c(i,`font-size:10px;opacity:.75`),r.append(Object.assign(document.createElement(`div`),{textContent:e}),i),t.append(n,r),f.appendChild(t),p[e]={wrap:t,chip:n,note:i}}for(let e of[`top`,`bottom`]){let n=p[e].wrap;$c(n,n.style.cssText+`;pointer-events:auto;cursor:pointer`),n.title=`Paint the ${e} (Q switches)`,n.addEventListener(`pointerdown`,n=>{n.stopPropagation(),t.selectZone(e)})}let m=document.createElement(`div`);$c(m,`display:none;background:#2a7fffd9;border-radius:6px;padding:6px 8px;font-weight:600;font-size:12px;line-height:1.35`);let h=document.createElement(`div`);$c(h,`display:none;background:#000a;border-radius:6px;padding:6px 8px`);let g=Object.assign(document.createElement(`div`),{textContent:`Recent colours (click to paint the selected zone)`});$c(g,`font-size:10px;opacity:.75;margin-bottom:4px`);let _=document.createElement(`div`);$c(_,`display:flex;flex-wrap:wrap;gap:5px`),h.append(g,_),r.append(m,a,f,h);let v=document.createElement(`pre`);$c(v,`margin:0;background:#000b;border-radius:6px;padding:6px 8px;font:10px/1.45 monospace;white-space:pre-wrap;word-break:break-word`),r.appendChild(v);let y=document.createElement(`div`);$c(y,`position:absolute;left:50%;bottom:12px;transform:translateX(-50%);display:`+(e?`none`:`flex`)+`;gap:6px 18px;flex-wrap:wrap;justify-content:center;max-width:min(1100px,calc(100% - 24px));background:#000d;border:1px solid #fff3;border-radius:10px;padding:8px 14px;font:600 14px/1.2 system-ui,sans-serif;color:#fff;text-shadow:none`);let b=e=>`<kbd style="display:inline-block;min-width:22px;text-align:center;padding:3px 7px;margin:0 2px;border:1px solid #fffa;border-bottom-width:3px;border-radius:6px;background:#ffffff26;font:700 13px ui-monospace,monospace">${e}</kbd>`,x=(e,t)=>`<span style="display:inline-flex;align-items:center;gap:4px"><span style="opacity:.65;font-weight:500;margin-right:3px">${e}</span>${t}</span>`;y.innerHTML=[x(`Move`,b(`W`)+b(`A`)+b(`S`)+b(`D`)),x(`Run`,b(`Shift`)),x(`Jump / climb`,b(`Space`)),x(`Eyedropper`,b(`E`)+` then click`),x(`Zone`,b(`Q`)),x(`Pattern`,b(`T`)),x(`Uniform`,b(`U`)),x(`Poses`,b(`1`)+b(`2`)+b(`3`)+b(`4`)),x(`Hunt mode`,b(`H`)),x(`Camo text`,b(`C`)),x(`Hiding spots`,b(`M`)),x(`Hide this`,b(`K`))].join(``),n.appendChild(y);let S=document.createElement(`div`);$c(S,`position:absolute;left:50%;top:14%;transform:translateX(-50%);background:#000a;padding:6px 12px;border-radius:14px;opacity:0;transition:opacity .25s;font-size:13px;white-space:nowrap`),n.appendChild(S);let C=0,w=document.createElement(`div`);$c(w,`position:absolute;left:0;top:0;width:0;height:0;display:none`);let T=document.createElement(`div`);$c(T,`position:absolute;left:-18px;top:-18px;width:32px;height:32px;border:2px solid #fff;border-radius:50%;box-shadow:0 0 0 1px #000a`);let E=document.createElement(`div`);$c(E,`position:absolute;left:-4px;top:-4px;width:6px;height:6px;border-radius:50%;background:#fff;box-shadow:0 0 0 1px #000a`);let D=document.createElement(`div`);$c(D,`position:absolute;left:24px;top:14px;display:flex;align-items:center;gap:6px;background:#000c;padding:3px 7px;border-radius:5px;white-space:nowrap`);let O=document.createElement(`span`);$c(O,`width:16px;height:16px;border-radius:3px;border:1px solid #fff9;display:inline-block`);let k=document.createElement(`span`);D.append(O,k),w.append(T,E,D),n.appendChild(w);let A=[[`#479fe0`,`Lagos sky`],[`#ccccc2`,`Harmattan haze`],[`#d88b47`,`Late sun`],[`#92572f`,`Red earth`],[`#514d48`,`Shadow`],[`#301e16`,`Dark wood`],[`#e8bf1a`,`Danfo yellow`],[`#2fa59b`,`Compound turquoise`],[`#e8dcb8`,`Cream plaster`],[`#a8322d`,`Door red`],[`#2a5db0`,`Drum blue`],[`#2f7d3a`,`Door green`]],ee=document.createElement(`div`);$c(ee,`position:absolute;left:${e?8:74}px;top:8px;background:#000b;border-radius:8px;padding:8px 10px;width:${e?`fit-content`:`176px`};pointer-events:auto;display:${e?`none`:`block`}`);let j=document.createElement(`div`);$c(j,`font:700 12px system-ui;margin-bottom:6px;display:flex;justify-content:space-between`),j.innerHTML=`<span>Palette</span><span style="opacity:.6;font-weight:500">P</span>`;let te=document.createElement(`div`);$c(te,`display:grid;grid-template-columns:repeat(4,${e?`46px`:`1fr`});gap:6px`);let M=document.createElement(`input`);M.type=`range`,M.min=`45`,M.max=`150`,M.value=`100`,$c(M,`width:100%;margin:8px 0 0;accent-color:#f1c232;height:${e?44:16}px;touch-action:none`);let N=Object.assign(document.createElement(`div`),{textContent:`Brightness`});$c(N,`font:11px system-ui;opacity:.75;margin-top:6px`);let ne=e=>new c(e).multiplyScalar(Number(M.value)/100),P=[];for(let[n,r]of A){let i=document.createElement(`button`);$c(i,`height:${e?46:30}px;border-radius:6px;border:2px solid #fffb;cursor:pointer;padding:0`),i.title=`${r} ${n}`,i.addEventListener(`pointerdown`,e=>{e.stopPropagation(),t.palette(ne(n),r)}),te.appendChild(i),P.push([i,n])}let re=()=>P.forEach(([e,t])=>e.style.background=el(ne(t)));re(),M.addEventListener(`input`,re),M.addEventListener(`pointerdown`,e=>e.stopPropagation()),ee.append(j,te,N,M),n.appendChild(ee);let F=null,ie=null,I=[],L=document.createElement(`div`);$c(L,`position:absolute;left:8px;top:50%;transform:translateY(-50%);display:`+(e?`none`:`flex`)+`;flex-direction:column;gap:6px`),n.appendChild(L);let ae=(e,t,r,i=n)=>{let a=document.createElement(`button`);return a.textContent=e,$c(a,`pointer-events:auto;touch-action:manipulation;font:600 12px system-ui;color:#fff;background:#000a;border:2px solid #fff8;cursor:pointer;${r}`),a.addEventListener(`pointerdown`,e=>{e.stopPropagation(),t()}),i.appendChild(a),a},oe=()=>{ee.style.display=ee.style.display===`none`?`block`:`none`},R=()=>{i()?(r.style.cssText=`position:absolute;top:60px;left:8px;width:158px;display:flex;flex-direction:column;gap:6px;align-items:stretch`,ee.style.left=`8px`,ee.style.top=`300px`):(r.style.cssText=`position:absolute;top:8px;right:8px;width:260px;display:flex;flex-direction:column;gap:6px;align-items:stretch`,ee.style.left=e?`8px`:`74px`,ee.style.top=`8px`)};if(R(),addEventListener(`resize`,R),e){let e=`position:absolute;border-radius:26px;`;F=ae(`Eyedropper`,t.eyedropper,e+`right:12px;bottom:196px;width:100px;height:52px`),ae(`Palette`,oe,e+`right:12px;bottom:140px;width:100px;height:46px`),ae(`Zone`,t.zone,e+`right:12px;bottom:84px;width:100px;height:46px`),ie=ae(`Pattern: solid`,t.pattern,e+`right:120px;bottom:84px;width:96px;height:46px;font-size:12px`),ae(`Uniform`,t.uniform,e+`right:120px;bottom:136px;width:96px;height:46px;font-size:12px`),ae(`Jump`,t.jump,e+`right:12px;bottom:20px;width:100px;height:54px;background:#1a8a3acc`),I=tl.map((n,r)=>ae(n,()=>t.pose(r),`${e}left:${10+r*62}px;bottom:28px;width:58px;height:46px;border-radius:12px;font-size:11px`))}else{let e=`width:56px;height:46px;border-radius:12px;line-height:1.15;`;F=ae(`Pick
(E)`,t.eyedropper,e,L),ae(`Zone
(Q)`,t.zone,e,L),ie=ae(`Solid
(T)`,t.pattern,e,L),ae(`School
(U)`,t.uniform,e,L),ae(`Palette
(P)`,oe,e,L),I=[`Stiff
(1)`,`Crouch
(2)`,`Wall
(3)`,`Ball
(4)`].map((n,r)=>ae(n,()=>t.pose(r),e,L));for(let e of[F,...I])e.style.whiteSpace=`pre`;for(let e of L.querySelectorAll(`button`))e.style.whiteSpace=`pre`}return{setZones(e,t,n,r){for(let[i,a]of[[`top`,e],[`bottom`,t]]){let e=p[i];e.chip.style.background=el(a),e.wrap.style.borderColor=i===n?`#fff`:`transparent`,e.note.textContent=`${el(a)}${r[i]?``:` (unpainted)`}`}},setScore(e){s.textContent=e.toFixed(0),u.style.width=`${Math.min(100,Math.max(0,e))}%`,u.style.background=e<35?`#e5533d`:e<65?`#e8b33a`:`#58c26a`},setDebug(e){v.textContent!==e&&(v.textContent=e)},setDebugVisible(e){v.style.display=e?`block`:`none`},toast(e){S.textContent=e,S.style.opacity=`1`,clearTimeout(C),C=window.setTimeout(()=>S.style.opacity=`0`,1600)},crosshair(e,t=0,n=0,r=!0,i=null,a=!1){if(w.style.display=e?`block`:`none`,!e)return;w.style.transform=`translate(${t}px,${n}px)`,w.style.opacity=a?`0.45`:`1`;let o=r?`#fff`:`#ff5a4a`;T.style.borderColor=o,E.style.background=o,D.style.display=i?`flex`:`none`,i&&(O.style.background=el(i.color),k.textContent=`${i.label} ${el(i.color)}${r?``:` (too far)`}`)},setAiming(t){F&&(F.style.background=t?`#2a7fffcc`:`#000a`),m.style.display=t?`block`:`none`,m.textContent=e?`EYEDROPPER: tap a surface within 4 m`:`EYEDROPPER ON: click a surface within 4 m. Q switches zone, E or Esc stops`},setRecent(e){h.style.display=e.length?`block`:`none`,_.replaceChildren(...e.map((e,n)=>{let r=document.createElement(`button`);return $c(r,`pointer-events:auto;cursor:pointer;width:24px;height:24px;border-radius:5px;border:2px solid #fffb;padding:0;background:${el(e.color)}`),r.title=`${e.label} ${el(e.color)}`,r.addEventListener(`pointerdown`,e=>{e.stopPropagation(),t.recent(n)}),r}))},setLegend(t){e||(y.style.display=t?`flex`:`none`)},toggleLegend(){y.style.display=y.style.display===`none`?`flex`:`none`},togglePalette:oe,show(e){n.style.display=e?`block`:`none`},setPaletteTop(e){i()||(ee.style.top=`${e}px`)},setPattern(t){if(!ie)return;let n=t===`solid`?`Solid`:t===`stripes`?`Stripes`:`Dots`;ie.textContent=e?`Pattern: ${n.toLowerCase()}`:`${n}\n(T)`,ie.style.background=t===`solid`?`#000a`:`#7a5ad0cc`},setPose(e){d.textContent=e?`pose: ${e}`:`pose: none (moving breaks a pose)`;let t=nl.indexOf(e??``);I.forEach((e,n)=>e.style.background=n===t?`#2a7fffcc`:`#000a`)}}}var il=class{level;colliders;ray=new r;targets=[];blockers=[];v=new Y;constructor(e,t){this.level=e,this.colliders=t;let n=e=>{e.name!==`hiding-markers`&&e.name!==`surfaces`&&(e instanceof It&&(this.targets.push(e),![`ground`,`dirt`,`veranda-tiles`,`umbrella`].includes(e.name)&&!e.userData.decal&&this.blockers.push(e)),e.children.forEach(n))};n(e.group)}read(e){let t=this.level.surfaces.nearest(e.point,.35);if(t)return{color:t.baseColor.clone(),id:t.id,label:t.label,kind:t.kind,point:e.point.clone(),distance:e.distance};let n=e.object.userData.baseColor;return n?{color:n.clone(),id:e.object.name||`mesh`,label:e.object.name||`surface`,point:e.point.clone(),distance:e.distance}:null}pick(e,t){this.ray.setFromCamera(t,e),this.ray.far=120;for(let e of this.ray.intersectObjects(this.targets,!1))if(!(e.object.material.opacity<.5))return this.read(e);return null}behind(e,t){let n=this.v.copy(t).sub(e),r=n.length();this.ray.set(e,n.normalize()),this.ray.far=120;for(let e of this.ray.intersectObjects(this.targets,!1)){if(e.distance<=r+.05)continue;let t=this.read(e);if(t)return t}return null}blocked(e,t,n=.3){let r=this.v.copy(t).sub(e),i=r.length();return i<n?!1:(this.ray.set(e,r.normalize()),this.ray.far=i-n,this.ray.intersectObjects(this.blockers,!1).length>0)}near(e,t){let n=[];for(let r of this.level.surfaces.list){let i=r.bounds,a=Math.max(i.min.x-e.x,0,e.x-i.max.x),o=Math.max(i.min.z-e.z,0,e.z-i.max.z),s=Math.hypot(a,o);if(s>t)continue;let c=(i.min.x+i.max.x)/2-e.x,l=(i.min.z+i.max.z)/2-e.z,u=Math.hypot(c,l)||1;n.push({id:r.id,kind:r.kind,distance:s,maxY:i.max.y,dir:{x:c/u,z:l/u}})}return n}wall(e,t){return Ko(e,t,this.colliders)}},al=.4,ol=.24,sl=[`stand_stiff`,`crouch`,`wall_flat`,`curl_ball`],cl={crouch:[.85,.4],curl_ball:[.5,.3]},ll={top:`#f1eee2`,bottom:`#1f3a78`},ul=class{o;probe;camo;zone=`top`;painted={top:!1,bottom:!1};patternKind=`solid`;lastPick={};pose=null;aimOn=!1;eDownAt=0;eSuppressRelease=!1;recent=[];hitMarker;cooldownUntil=0;snap=null;poseYaw=null;pointer=new ze(innerWidth/2,innerHeight/2);reachRing;hud;hover=null;sinceHover=1;debugOn=!1;torso=new Y;constructor(e){this.o=e,this.probe=new il(e.level,e.level.colliders),this.camo=new Zc(this.probe),e.player.setHuntMode(e.hunt),this.hud=rl(e.touch,{eyedropper:()=>this.toggleAim(),zone:()=>this.toggleZone(),pattern:()=>this.cyclePattern(),uniform:()=>this.wearUniform(),selectZone:e=>{this.zone=e},recent:e=>{let t=this.recent[e];t&&!this.cooling&&this.paint({color:t.color,label:t.label})},pose:e=>this.setPose(sl[e]),jump:()=>e.input.queueJump(),palette:(e,t)=>{this.cooling||this.paint({color:e,label:t})}}),this.hud.setPose(null),this.hud.setDebugVisible(this.debugOn),this.reachRing=new It(new y(3.95,4,72).rotateX(-Math.PI/2),new H({color:`#ffffff`,transparent:!0,opacity:.4,depthWrite:!1})),this.reachRing.visible=!1,this.reachRing.renderOrder=5,this.hitMarker=new It(new k(.07,10,8),new H({color:`#ffffff`,depthTest:!1,transparent:!0,opacity:.95})),this.hitMarker.visible=!1,this.hitMarker.renderOrder=6,e.scene.add(this.reachRing,this.hitMarker),e.input.blocked=()=>this.aiming,addEventListener(`keydown`,e=>this.onKey(e,!0)),addEventListener(`keyup`,e=>this.onKey(e,!1)),addEventListener(`blur`,()=>{this.aimOn&&performance.now()-this.eDownAt>350&&(this.aimOn=!1)}),addEventListener(`pointermove`,e=>this.pointer.set(e.clientX,e.clientY)),e.input.el.addEventListener(`pointerdown`,e=>{this.pointer.set(e.clientX,e.clientY),this.aiming&&this.pickAndPaint()})}get cooling(){return performance.now()<this.cooldownUntil}setLegend(e){this.hud.setLegend(e)}toast(e){this.hud.toast(e)}setPaletteTop(e){this.hud.setPaletteTop(e)}setPlayer(e){this.o.player=e,this.camo.invalidate()}escUsed=!1;show(e){this.hud.show(e),e||(this.aimOn=!1)}resetPaint(e,t){this.o.player.setZoneColor(`top`,e),this.o.player.setZoneColor(`bottom`,t),this.painted.top=this.painted.bottom=!1,this.patternKind=`solid`,this.hud.setPattern(`solid`),this.lastPick={},this.recent=[],this.hud.setRecent([]),this.zone=`top`,this.aimOn=!1,this.clearPose(),this.camo.invalidate()}fadePaint(e,t,n,r){let i={top:new c(e),bottom:new c(t)},a=!1;for(let e of[`top`,`bottom`]){if(!this.painted[e])continue;this.o.player.getZonePattern(e).kind!==`solid`&&this.o.player.setZoneColor(e,this.o.player.getZoneColor(e));let t=this.o.player.getZoneColor(e).clone().lerp(i[e],n);this.o.player.setZoneColor(e,t),(t.r-i[e].r)**2+(t.g-i[e].g)**2+(t.b-i[e].b)**2<8e-4&&(this.painted[e]=!1),a=!0}a&&performance.now()>=this.fadeNext&&(this.fadeNext=performance.now()+r*1e3,this.camo.invalidate())}fadeNext=0;wearUniform(){let{top:e,bottom:t}=ll;this.patternKind=`solid`,this.hud.setPattern(`solid`),this.o.player.setZoneColor(`top`,e),this.o.player.setZoneColor(`bottom`,t),this.lastPick={top:new c(e),bottom:new c(t)},this.painted.top=this.painted.bottom=!0,this.camo.invalidate(),this.hud.toast(`School uniform on: white shirt, navy bottoms`),Z.unlock().then(()=>Z.playOnce(`sfx_cloth_rustle_01`,{volume:2}))}cyclePattern(){this.patternKind=this.patternKind===`solid`?`stripes`:this.patternKind===`stripes`?`dots`:`solid`,this.hud.setPattern(this.patternKind),this.hud.toast(this.patternKind===`solid`?`Pattern off: picks paint one solid colour`:`Pattern: ${this.patternKind}. Pick a colour and it goes over the zone's last colour in ${this.patternKind}.`)}clearPose(){this.pose=null,this.snap=null,this.poseYaw=null}get aiming(){return this.aimOn}onKey(e,t){if(e.code===`KeyE`){if(e.repeat)return;t?this.aimOn?(this.aimOn=!1,this.eSuppressRelease=!0):(this.aimOn=!0,this.eDownAt=performance.now(),this.sinceHover=1):(!this.eSuppressRelease&&performance.now()-this.eDownAt>350&&(this.aimOn=!1),this.eSuppressRelease=!1)}else if(t&&!e.repeat){if(e.code===`KeyQ`)this.toggleZone();else if(e.code===`KeyT`)this.cyclePattern();else if(e.code===`KeyU`)this.wearUniform();else if(e.code===`KeyH`)this.o.player.setHuntMode(!this.o.player.huntMode),this.camo.invalidate(),this.hud.toast(this.o.player.huntMode?`Hunt mode: hair, hat and accessory hidden`:`Hunt mode off: hair, hat and accessory visible (exposure penalty)`);else if(e.code===`KeyC`)this.debugOn=!this.debugOn,this.hud.setDebugVisible(this.debugOn);else if(e.code===`KeyK`)this.hud.toggleLegend();else if(e.code===`KeyP`)this.hud.togglePalette();else if(e.code===`Escape`&&this.aimOn)this.aimOn=!1,this.escUsed=!0;else{let t=/^(?:Digit|Numpad)([1-4])$/.exec(e.code);t&&this.setPose(sl[Number(t[1])-1])}}}toggleAim(){this.aimOn=!this.aimOn,this.eDownAt=0,this.aimOn&&this.pointer.set(innerWidth/2,innerHeight/2),this.sinceHover=1}toggleZone(){this.zone=this.zone===`top`?`bottom`:`top`,this.hud.toast(`Painting the ${this.zone}`)}setPose(e){if(this.pose===e)this.pose=null,this.snap=null,this.poseYaw=null;else{if(e===`wall_flat`){let e=Ko(this.o.pos,1,this.o.level.colliders);if(!e){this.hud.toast(`No wall within 1 m`);return}let t=new Y(e.point.x+e.normal.x*ol,this.o.pos.y,e.point.z+e.normal.z*ol),n={x:t.x,z:t.z};qo(n,.18,this.o.level.colliders),t.set(n.x,t.y,n.z),this.snap={from:this.o.pos.clone(),to:t,t:0},this.poseYaw=Math.atan2(e.normal.x,e.normal.z)}else this.poseYaw=null,this.snap=null;this.pose=e,Z.unlock().then(()=>Z.playOnce(`sfx_cloth_rustle_01`,{volume:2}))}}ndc(){return new ze(this.pointer.x/innerWidth*2-1,-(this.pointer.y/innerHeight)*2+1)}pickAndPaint(){let e=this.probe.pick(this.o.camera,this.ndc());if(!e)return this.hud.toast(`Nothing to read there`);this.torso.copy(this.o.pos),this.torso.y+=1;let t=this.torso.distanceTo(e.point);if(t>4)return this.hud.toast(`Too far: ${t.toFixed(1)} m (reach 4 m)`);this.cooling||(this.paint(e),this.o.touch&&(this.aimOn=!1))}paint(e){this.cooldownUntil=performance.now()+al*1e3;let{player:t,fx:n,pos:r}=this.o;if(this.patternKind===`solid`)t.setZoneColor(this.zone,e.color);else{let n=this.lastPick[this.zone]??t.getZoneColor(this.zone);t.setZonePattern(this.zone,this.patternKind,e.color,n)}this.lastPick[this.zone]=e.color.clone(),this.painted[this.zone]=!0;let i=e.color.getHexString();this.recent=[{color:e.color.clone(),label:e.label},...this.recent.filter(e=>e.color.getHexString()!==i)].slice(0,8),this.hud.setRecent(this.recent),this.camo.invalidate();let a=(cl[this.pose??``]??[1.25,.6])[this.zone===`top`?0:1];n.paintSplash(this.torso.set(r.x,r.y+a,r.z),e.color),Z.unlock().then(()=>Z.playOnce(`sfx_paint`,{volume:.6})),this.hud.toast(`${this.zone} painted ${e.label} #${e.color.getHexString()}`)}update(e,t){let{pos:n,player:r,camera:i}=this.o;if(t.speed>0&&(this.pose=null,this.snap=null,this.poseYaw=null),this.snap){this.snap.t=Math.min(1,this.snap.t+e/.18);let t=1-(1-this.snap.t)**3;n.lerpVectors(this.snap.from,this.snap.to,t),this.snap.t>=1&&(this.snap=null)}let a=this.aiming;if(this.o.input.el.style.cursor=a?`crosshair`:``,this.reachRing.visible=a,this.hitMarker.visible=!1,a){this.reachRing.position.set(n.x,.06,n.z),this.sinceHover+=e,this.sinceHover>1/30&&(this.sinceHover=0,this.hover=this.probe.pick(i,this.ndc()));let t=!1;this.hover&&(this.torso.copy(n),this.torso.y+=1,t=this.torso.distanceTo(this.hover.point)<=4),this.hover&&(this.hitMarker.position.copy(this.hover.point),this.hitMarker.visible=!0,this.hitMarker.material.color.set(t?`#ffffff`:`#ff5a4a`)),this.hud.crosshair(!0,this.pointer.x,this.pointer.y,t,this.hover?{color:this.hover.color,label:this.hover.label}:null,this.cooling)}else this.hud.crosshair(!1),this.hover=null;this.hud.setAiming(a);let o=r.style,s=r.huntMode,c=this.camo.update(e,{zones:{top:r.getZoneColor(`top`),bottom:r.getZoneColor(`bottom`)},painted:this.painted,patterns:{top:r.getZonePattern(`top`).kind,bottom:r.getZonePattern(`bottom`).kind},pose:this.pose,speed:t.speed,running:t.speed>3.5,yaw:this.poseYaw??t.yaw,position:n,eye:this.o.eye?.()??i.position,hairVisible:!s&&o.hair!==`bald`,hatVisible:!s&&o.hat!==`none`,accessoryVisible:!s&&o.accessory!==`none`});return this.hud.setScore(this.camo.display),this.hud.setZones(r.getZoneColor(`top`),r.getZoneColor(`bottom`),this.zone,this.painted),this.hud.setPose(this.pose),this.debugOn&&this.hud.setDebug(`${Qc(c)}\nhunt mode: ${s?`on`:`off`}   viewer: ${this.o.eye?.()?`seeker's eye`:`camera (no seeker)`}`),{state:this.pose??`idle`,yaw:this.poseYaw}}},dl={chant_intro:{text:`Bojú bojú o! Ẹ̀gúngún ń bọ̀! Ẹ sá pamọ́!`,english:`Eyes covered, eyes covered! The masquerade is coming! Go and hide!`,singer:`Egungun`},chant_ask:{text:`Ṣé kí n ṣí i?`,english:`Shall I open it?`,singer:`Egungun`},chant_not_yet:{text:`Má ṣí i!`,english:`Don't open it!`,singer:`Children`},chant_open:{text:`Ṣí i!`,english:`Open it!`,singer:`Children`},chant_hunt:{text:`Ẹni tí mo bá rí, màá jẹ ẹ́!`,english:`Whoever I spot, I'll gobble up!`,singer:`Egungun`},caught:{text:`Mo rí ẹ!`,english:`I see you!`,singer:`Egungun`}};function fl(){let e=document.createElement(`div`);e.style.cssText=`position:fixed;left:50%;bottom:150px;transform:translateX(-50%);z-index:7;pointer-events:none;text-align:center;opacity:0;transition:opacity .25s;max-width:min(90vw,900px)`;let t=document.createElement(`div`);t.style.cssText=`font:700 12px system-ui;letter-spacing:3px;text-transform:uppercase;color:#f1c232;text-shadow:0 2px 6px #000;margin-bottom:4px`;let n=document.createElement(`div`);n.style.cssText=`font:800 clamp(24px,5vw,40px)/1.2 system-ui,sans-serif;color:#fff;text-shadow:0 3px 10px #000,0 0 3px #000;letter-spacing:1px`;let r=document.createElement(`div`);r.style.cssText=`font:italic 600 17px/1.3 system-ui,sans-serif;color:#fff;opacity:.92;text-shadow:0 2px 8px #000,0 0 3px #000;margin-top:4px`,e.append(t,n,r),document.body.appendChild(e);let i=()=>e.style.bottom=innerWidth<600?`262px`:`150px`;i(),addEventListener(`resize`,i);let a=[],o=()=>{a.forEach(clearTimeout),a=[]};return{sing(i,s){let c=dl[i];if(!c)return;o(),t.textContent=c.singer,r.textContent=c.english;let l=c.text.split(` `);n.replaceChildren(...l.map(e=>{let t=document.createElement(`span`);return t.textContent=e+` `,t.style.cssText=`color:#ffffffa0;transition:color .12s,transform .12s;display:inline-block;white-space:pre`,t})),e.style.opacity=`1`;let u=l.reduce((e,t)=>e+t.length+1,0),d=0;l.forEach((e,t)=>{let r=n.children[t];a.push(window.setTimeout(()=>{r.style.color=`#f1c232`,r.style.transform=`scale(1.12)`},d*s*1e3*.92),window.setTimeout(()=>{r.style.color=`#ffffff`,r.style.transform=`scale(1)`},(d+(e.length+1)/u)*s*1e3)),d+=(e.length+1)/u}),a.push(window.setTimeout(()=>e.style.opacity=`0`,s*1e3+700))},hide(){o(),e.style.opacity=`0`}}}var pl=(e,t)=>e.style.cssText=t;function ml(){let e=document.createElement(`div`);pl(e,`position:fixed;inset:0;pointer-events:none;z-index:6;font-family:system-ui,sans-serif;color:#fff;text-shadow:0 2px 6px #000;display:none`),document.body.appendChild(e);let t=document.createElement(`div`);pl(t,`position:absolute;left:50%;top:8px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:4px;background:#000a;border-radius:12px;padding:6px 16px 8px;min-width:190px`);let n=document.createElement(`div`);pl(n,`display:flex;align-items:center;gap:8px;font:800 26px system-ui;letter-spacing:1px`);let r=document.createElement(`span`);pl(r,`display:inline-block;width:20px;height:28px`),r.innerHTML=`<svg viewBox="0 0 20 28" width="20" height="28"><path d="M2 1h16M2 27h16" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M4 1c0 8 6 9 6 13s-6 5-6 13M16 1c0 8-6 9-6 13s6 5 6 13" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M6 24h8c-1-3-3-4-4-4s-3 1-4 4z" fill="#f1c232"/></svg>`;let i=document.createElement(`span`),a=document.createElement(`span`);pl(a,`font:700 13px system-ui;opacity:.85;margin-left:6px;letter-spacing:2px`),n.append(r,i,a);let o=document.createElement(`div`);pl(o,`font:700 12px system-ui;letter-spacing:2px;opacity:.9;text-align:center`);let s=document.createElement(`div`);pl(s,`display:flex;gap:6px`);let c=document.createElement(`button`);pl(c,`pointer-events:auto;display:none;margin-top:4px;min-height:44px;padding:0 20px;border:0;border-radius:999px;cursor:pointer;touch-action:manipulation;font:800 15px system-ui;color:#1f2118;background:#d8fd71;text-shadow:none`),t.append(n,o,s,c),e.appendChild(t);let l=()=>innerWidth<600,u=()=>{t.style.cssText=l()?`position:absolute;right:8px;top:8px;display:flex;flex-direction:column;align-items:center;gap:3px;background:#000a;border-radius:12px;padding:5px 10px 7px;width:196px;box-sizing:border-box`:`position:absolute;left:50%;top:8px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:4px;background:#000a;border-radius:12px;padding:6px 16px 8px;min-width:190px`,d.style.display=l()?`none`:`flex`},d=document.createElement(`div`);pl(d,`position:absolute;right:12px;bottom:12px;display:flex;align-items:baseline;gap:8px;background:#000a;border-radius:12px;padding:6px 14px`);let f=document.createElement(`span`);pl(f,`font:800 34px system-ui;line-height:1`);let p=Object.assign(document.createElement(`span`),{textContent:`hiders left`});pl(p,`font:600 12px system-ui;opacity:.85`),d.append(f,p),e.appendChild(d),u(),addEventListener(`resize`,u);let m=document.createElement(`div`);e.appendChild(m);let h=()=>pl(m,l()?`position:absolute;right:8px;top:118px;width:196px;display:flex;flex-direction:column;align-items:flex-end;gap:4px`:`position:absolute;left:50%;top:112px;transform:translateX(-50%);width:min(560px,calc(100% - 24px));display:flex;flex-direction:column;align-items:center;gap:4px`);h(),addEventListener(`resize`,h);let g=document.createElement(`div`);pl(g,`position:absolute;inset:0;display:none;align-items:center;justify-content:center;font:800 clamp(34px,8vw,64px) system-ui;letter-spacing:4px;text-shadow:0 4px 18px #000;text-align:center;padding:0 12px`),e.appendChild(g);let _={onReady:null,show(t){e.style.display=t?`block`:`none`},banner(e,t=`#8e1b1b66`){g.style.display=e?`flex`:`none`,g.style.background=t,g.textContent=e??``},popup(e,n=`#d8fd71`,r=1.8){for(;m.children.length>=5;)m.firstElementChild?.remove();m.style.top=`${Math.round(t.getBoundingClientRect().bottom+8)}px`;let i=document.createElement(`div`);pl(i,`font:800 ${l()?15:18}px system-ui;color:${n};text-shadow:0 2px 6px #000;background:#000a;border-radius:16px;padding:3px 12px;text-align:center;max-width:100%;box-sizing:border-box`),i.textContent=e,m.appendChild(i);let a=i.animate([{opacity:0,transform:`translateY(8px) scale(.9)`},{opacity:1,transform:`translateY(0) scale(1)`,offset:.12},{opacity:1,offset:.75},{opacity:0,transform:`translateY(-14px)`}],{duration:r*1e3,easing:`ease-out`});a.onfinish=()=>i.remove()},update(e){let t=Math.max(0,Math.ceil(e.seconds));i.textContent=`${Math.floor(t/60)}:${String(t%60).padStart(2,`0`)}`,a.textContent=`ROUND ${e.round}`,o.textContent=e.label;let n=e=>`<span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${e?`#d33`:`#48c26a`};border:2px solid #fff;text-align:center;font:800 13px/18px system-ui">${e?`✕`:`●`}</span>`;s.innerHTML=Array.from({length:e.hiders},(t,r)=>n(r<e.caught)).join(``),f.textContent=String(Math.max(0,e.hiders-e.caught)),e.ready?(c.style.display=`block`,c.textContent=`Ready!  (Enter)  +${e.ready.bonus}`):c.style.display=`none`}};return c.addEventListener(`pointerdown`,e=>{e.stopPropagation(),_.onReady?.()}),_}function hl(e,t,n,r,i){let a=2/r,o=a*i,s=1/(1+o+.48*o*o+.235*o*o*o),c=e-t,l=(n.v+a*c)*i;return n.v=(n.v-a*l)*s,t+(c+l)*s}var gl=class{offset;camera;focus=new Y;vx={v:0};vy={v:0};vz={v:0};samples=[new Y,new Y,new Y];constructor(e,t=new Y(0,10.5,7.8)){this.offset=t,this.camera=new D(38,e,.5,160),this.setAspect(e)}setAspect(e){this.camera.aspect=e,this.camera.fov=e<1?52:38,this.camera.updateProjectionMatrix()}snapTo(e){this.focus.copy(e),this.vx.v=this.vy.v=this.vz.v=0,this.apply()}update(e,t,n=0,r=0){let i=.16;this.focus.x=hl(this.focus.x,t.x+n*i,this.vx,.16,e),this.focus.z=hl(this.focus.z,t.z+r*i,this.vz,.16,e),this.focus.y=hl(this.focus.y,t.y,this.vy,.32,e),this.apply()}apply(){this.camera.position.copy(this.focus).add(this.offset),this.camera.lookAt(this.focus.x,this.focus.y+.9,this.focus.z)}fade(e,t,n){this.samples[0].set(t.x,t.y+.15,t.z),this.samples[1].set(t.x,t.y+.9,t.z),this.samples[2].set(t.x,t.y+1.6,t.z);for(let t of e)t.target=this.samples.some(e=>t.blocks(this.camera.position,e,.08))?.18:1,t.update(n)}},_l={prepSeconds:25,huntSeconds:90,regulars:{stillSeconds:12,stillRadius:2.5},camoHoldSeconds:3,chantTimeoutSeconds:8,clearedSeconds:3.4,slowMoSeconds:1,slowMoScale:.25,readyBonusPerSecond:2,score:{survivalPerSecond:2,nearMissPerSecond:8,runHomeBonus:250,runHomeBonusPerSecondLeft:2,camoBonusPerPoint:2,popupEvery:{survival:5,nearMiss:1}},runHome:{seekerDistance:12,reachX:13.9},teaching:{rounds:1,speedMul:.75,rateMul:.85,spin:!1,hintDelay:1.5,hintRepeat:12,hintMax:3},ramps:{visionFovDeg:{start:52,perRound:4,limit:90},visionRange:{start:9,perRound:.6,limit:13},rateMax:{start:.65,perRound:.12,limit:1.5},cheatInterval:{start:24,perRound:-2.5,limit:9},cheatCandidates:{start:2,perRound:.5,limit:4},patrolSpeed:{start:3,perRound:.1,limit:4},investigateSpeed:{start:3.4,perRound:.1,limit:4.3},checkSpeed:{start:3.2,perRound:.1,limit:4.1},lostDecay:{start:.1,perRound:-.01,limit:.04}}};function vl(e,t=_l){let n={};for(let[r,i]of Object.entries(t.ramps)){let t=i.start+i.perRound*(e-1);n[r]=i.perRound>=0?Math.min(i.limit,t):Math.max(i.limit,t)}return n.cheatCandidates=Math.floor(n.cheatCandidates),n}var yl=()=>({rounds:0,hiddenSeconds:0,bestCamo:0,score:0,parts:{survival:0,nearMiss:0,ready:0,runHome:0,camo:0},ranHome:0});function bl(e,t,n){e.parts[t]+=n,e.score+=n}var xl=[{when:e=>e.rounds===0&&e.hiddenSeconds<8,line:`Chai! Caught before the chant finished its second line. The masquerade did not even have to look twice.`},{when:e=>e.rounds===0&&e.bestCamo<25,line:`You hid like someone waiting for a danfo: very visible, and loud about it. Match the wall, not your mood.`},{when:e=>e.rounds===0,line:`So close! You almost had the masquerade walking past. Hold the pose a little longer next time.`},{when:e=>e.bestCamo>=92&&e.rounds>=3,line:`You and that wall are now family. The masquerade passed by like you were a water drum.`},{when:e=>e.ranHome>=2,line:`You left the masquerade searching and went home through the front gate. Very bold, very Lagos.`},{when:e=>e.rounds>=6,line:`The compound has a new legend. Even the generator hums your name.`},{when:e=>e.rounds>=4,line:`Madam or Oga, respect! The masquerade looked straight at you and saw only plaster.`},{when:e=>e.rounds>=2&&e.bestCamo<55,line:`You survived on quick legs and luck. A closer colour match and you will not need the luck.`},{when:e=>e.rounds>=2,line:`Two rounds under the egungun's nose. Not bad at all, not bad at all.`},{when:e=>e.rounds>=1&&e.bestCamo>=80,line:`Nicely blended. The masquerade is still wondering why the wall is breathing.`},{when:()=>!0,line:`One round down. The yard remembers your footsteps, so tread softer next time.`}],Sl=e=>(xl.find(t=>t.when(e))??xl[xl.length-1]).line,Cl=class{best=0;t=0;q=[];holdSeconds;constructor(e=3){this.holdSeconds=e}beginHunt(){this.t=0,this.q=[]}reset(){this.best=0,this.beginHunt()}add(e,t){let n=Math.min(100,Math.max(0,Number.isFinite(e)?e:0));for(this.t+=t;this.q.length&&this.q[this.q.length-1][1]>=n;)this.q.pop();this.q.push([this.t,n]);let r=this.t-this.holdSeconds;for(;this.q[0][0]<=r;)this.q.shift();this.t+1e-9>=this.holdSeconds&&(this.best=Math.max(this.best,Math.floor(this.q[0][1]+1e-9)))}},wl={radius:1.6,winsToHunt:3,forget:.34,max:24},Tl=class{list=[];cfg;constructor(e=wl){this.cfg=e}won(e,t){let n=this.cfg,r=null,i=n.radius;for(let n of this.list){let a=Math.hypot(n.x-e,n.z-t);a<=i&&(i=a,r=n)}for(let e of this.list)e!==r&&(e.wins-=n.forget);return r?(r.x+=(e-r.x)/(r.wins+1),r.z+=(t-r.z)/(r.wins+1),r.wins+=1):(r={x:e,z:t,wins:1},this.list.push(r)),this.list=this.list.filter(e=>e.wins>0),this.list.length>n.max&&(this.list.sort((e,t)=>t.wins-e.wins),this.list.length=n.max),r.wins}regulars(){return this.list.filter(e=>e.wins>=this.cfg.winsToHunt-1e-9)}toJSON(){return this.list.map(e=>[+e.x.toFixed(2),+e.z.toFixed(2),+e.wins.toFixed(2)])}load(e){if(this.list=[],Array.isArray(e)){for(let t of e)!Array.isArray(t)||t.length!==3||!t.every(e=>typeof e==`number`&&Number.isFinite(e))||t[2]<=0||this.list.push({x:t[0],z:t[1],wins:Math.min(99,t[2])});this.list.length=Math.min(this.list.length,this.cfg.max)}}},El={storageKey:`boju.seekerMemory.v1`,suspectedHeat:.6,caughtHeat:1.5,spread:1.8,maxHeat:3,roundDecay:.93,forget:.04,weightSeconds:150,hotFirst:1,firstChance:.6,regularHeat:3,regularFirstChance:1},Dl=class{cov;cfg;heat;hideouts=new Tl;sig;constructor(e,t=El){this.cov=e,this.cfg=t,this.heat=new Float32Array(e.cells.length),this.sig=`${e.cells.length}:${e.player.w}x${e.player.h}`,this.load()}load(){try{let e=localStorage.getItem(this.cfg.storageKey);if(!e)return;let t=JSON.parse(e);if(t.sig!==this.sig||!Array.isArray(t.cells))return;this.hideouts.load(t.hideouts);let n=this.cov.player.w;for(let[e,r,i]of t.cells){let t=this.cov.cellIndex(this.cov.player.centre(e,r).x,this.cov.player.centre(e,r).z);t>=0&&e<n&&Number.isFinite(i)&&(this.heat[t]=Math.min(this.cfg.maxHeat,Math.max(0,i)))}}catch{}}save(){try{let e=[];this.cov.cells.forEach((t,n)=>{this.heat[n]>=this.cfg.forget&&e.push([t.ix,t.iz,+this.heat[n].toFixed(2)])}),localStorage.setItem(this.cfg.storageKey,JSON.stringify({sig:this.sig,cells:e,hideouts:this.hideouts.toJSON()}))}catch{}}note(e,t,n){let r=this.cfg;for(let i=0;i<this.cov.cells.length;i++){let a=this.cov.cells[i],o=Math.hypot(a.x-e,a.z-t);o>r.spread||(this.heat[i]=Math.min(r.maxHeat,this.heat[i]+n*(1-o/r.spread)))}}won(e,t){let n=this.hideouts.won(e,t);this.save();let r=wl.winsToHunt;return n>=r-1e-9&&n-1<r-1e-9}get hasRegular(){return this.hideouts.regulars().length>0}stampRegulars(){for(let e of this.hideouts.regulars())this.note(e.x,e.z,this.cfg.regularHeat)}decay(){for(let e=0;e<this.heat.length;e++)this.heat[e]*=this.cfg.roundDecay,this.heat[e]<this.cfg.forget&&(this.heat[e]=0)}clear(){this.heat.fill(0),this.hideouts.list=[],this.save()}total(){let e=0;for(let t of this.heat)e+=t;return e}},Ol={lookRange:6,spotArc:1.2,startAge:45,ageCap:240,agePower:2,jitter:.3,forceAge:80,assumedLook:2.5,assumedSpeed:3.4,spotStandOff:2,cornerView:[2.5,5],mergeDistance:2,coverRounds:40,pointBlank:1.3,snoozeSeconds:45,sweepSeconds:2.4,farShare:.6},kl=class{cov;cfg;memory;stops=[];age;interest;last=null;clock=0;firstPick=!0;snoozed=new Map;constructor(e,t,n,r=Ol,i=null){this.cov=e,this.cfg=r,this.memory=i,this.age=new Float32Array(e.cells.length).fill(r.startAge),this.interest=new Float32Array(e.cells.length);let a=e.seeker;for(let i of t){let t=e.player.nearestFree(i.position.x-i.facing.x*.45,i.position.z-i.facing.z*.45,4)??{x:i.position.x,z:i.position.z},o=n(i),s=a.nearestFree(o.x,o.z,6);if((n=>!!n&&e.reachable(n.x,n.z)&&Math.hypot(n.x-t.x,n.z-t.z)<=r.lookRange-.5&&e.seesFirmly(n.x,n.z,t.x,t.z))(s)||(s=this.viewing(t.x,t.z,[1.2,r.lookRange-1],r.spotStandOff)),!s){this.blind.push(i.id);continue}let c=Math.atan2(t.x-s.x,t.z-s.z);this.add({id:`spot ${i.id}`,kind:`spot`,x:s.x,z:s.z,lookAt:{x:i.position.x,z:i.position.z},cells:Int32Array.from(e.visibleFrom(s.x,s.z,r.lookRange,c,r.spotArc,!0))})}for(let t of e.corners()){if(this.stops.some(e=>Math.hypot(e.x-t.x,e.z-t.z)<r.mergeDistance))continue;let n=this.viewing(t.x,t.z);n&&!this.stops.some(e=>Math.hypot(e.x-n.x,e.z-n.z)<r.mergeDistance)&&this.add({id:`corner ${t.x.toFixed(1)},${t.z.toFixed(1)}`,kind:`corner`,x:n.x,z:n.z,lookAt:null,cells:Int32Array.from(e.visibleFrom(n.x,n.z,r.lookRange,void 0,void 0,!0))})}let o=new Set;for(let t=0;t<r.coverRounds;t++){let t=new Uint8Array(e.cells.length);for(let e of this.stops)for(let n of e.cells)t[n]=1;let n=t.findIndex((e,t)=>!e&&!o.has(t));if(n<0)break;let i=e.cells[n],a=this.viewing(i.x,i.z)??this.viewing(i.x,i.z,[1,r.lookRange-.5]);a?this.add({id:`cover ${a.x.toFixed(1)},${a.z.toFixed(1)}`,kind:`cover`,x:a.x,z:a.z,lookAt:null,cells:Int32Array.from(e.visibleFrom(a.x,a.z,r.lookRange,void 0,void 0,!0))}):(o.add(n),this.unreachable.push(n))}}blind=[];unreachable=[];add(e){if(e.kind===`spot`){let t=this.cfg.pointBlank**2;e.cells=e.cells.filter(n=>(this.cov.cells[n].x-e.x)**2+(this.cov.cells[n].z-e.z)**2>=t)}e.cells.length>0&&this.stops.push(e)}viewing(e,t,n=this.cfg.cornerView,r=(n[0]+n[1])/2){let i=null,a=1/0,o=r;for(let r of this.cov.viewpoints){let s=Math.hypot(r.x-e,r.z-t);if(s<n[0]||s>n[1])continue;let c=Math.abs(s-o);c>=a||this.cov.seesFirmly(r.x,r.z,e,t)&&(a=c,i=r)}return i}tick(e){this.clock+=e;let t=this.cfg.ageCap;for(let n=0;n<this.age.length;n++)this.age[n]<t&&(this.age[n]+=e)}beginRound(){this.firstPick=!0}snooze(e,t=this.cfg.snoozeSeconds){this.snoozed.set(e,this.clock+t)}isSnoozed(e){let t=this.snoozed.get(e);return t===void 0?!1:this.clock>=t?(this.snoozed.delete(e),!1):!0}visited(e){for(let t of e.cells)this.age[t]=0;this.last=e}looked(e){for(let t=0;t<e.length;t++)this.age[e[t]]=0}reset(){this.snoozed.clear(),this.age.fill(this.cfg.startAge),this.last=null}next(e,t,n,r){this.cfg;let i=new Set;for(let[e,t]of this.claims)e!==r&&i.add(t);let a=this.choose(e,t,n,i);return r&&this.claims.set(r,a),a}claims=new Map;choose(e,t,n,r){let i=this.cfg,a=r.size?new Set([...n??[],...r]):n,o=this.stops[0],s=-1/0;if(this.firstPick){this.firstPick=!1;let n=this.memory;if(n&&Math.random()<(n.hasRegular?El.regularFirstChance:El.firstChance)){let r=-1,i=El.hotFirst;for(let e=0;e<n.heat.length;e++)n.heat[e]>i&&(i=n.heat[e],r=e);if(r>=0){let n=null,i=1/0;for(let o of this.stops){if(a?.has(o)||this.isSnoozed(o)||!o.cells.includes(r))continue;let s=Math.hypot(o.x-e,o.z-t);s<i&&(i=s,n=o)}if(n)return n}}}let c=-1,l=i.forceAge;for(let e=0;e<this.age.length;e++)this.age[e]>l&&(l=this.age[e],c=e);if(c>=0){let n=null,r=1/0;for(let i of this.stops){if(a?.has(i)||this.isSnoozed(i)||!i.cells.includes(c))continue;let o=Math.hypot(i.x-e,i.z-t);o<r&&(r=o,n=i)}if(n)return n}for(let n of this.stops){if(n===this.last&&this.stops.length>1||a?.has(n)||this.isSnoozed(n))continue;let r=0;for(let e of n.cells)r+=Math.min(i.ageCap,this.age[e]+this.interest[e]+(this.memory?this.memory.heat[e]*El.weightSeconds:0))**i.agePower;let c=Math.hypot(n.x-e,n.z-t)/i.assumedSpeed+i.assumedLook,l=r/c*(1+(Math.random()*2-1)*i.jitter);l>s&&(s=l,o=n)}return o}freshShare(e){let t=0;for(let n of this.age)n<=e&&t++;return t/this.age.length}};function Al(e,t){let n=Math.min(100,Math.max(0,Number.isFinite(e)?e:0));if(n<=t[0][0])return t[0][1];for(let e=1;e<t.length;e++){let[r,i]=t[e];if(n<=r){let[a,o]=t[e-1];return o+(i-o)*(n-a)/(r-a)}}return t[t.length-1][1]}var jl={visionFovDeg:70,visionRange:12,eyeHeight:1.9,sampleHeights:{stand:[1.45,.9,.35],crouch:[.95,.6,.25],curl_ball:[.5,.35,.2]},losHz:15,hearRunRadius:6,hearWalkRadius:2,noiseCooldown:1.2,noiseRetargetDistance:2,rateMax:1,exposureCurve:[[0,1],[20,.62],[30,.39],[40,.28],[50,.215],[60,.18],[70,.143],[80,.117],[90,.05],[100,0]],minDistanceFactor:.15,nearRadius:3,nearBoost:1.4,seenDecay:.02,lostDecay:.08,curiousAt:.2,curiousCooldown:4,leanAt:.5,leanExit:.35,catchAt:1,patrolSpeed:3.4,investigateSpeed:3.8,checkSpeed:3.6,turnRate:6,arriveRadius:.5,radius:.6,navCell:.5,pathRound:.9,lookTime:[2.5,4],investigateLookTime:[2.5,3.5],lookSweepAngle:.9,checkStandOff:2,catchRange:6,catchLungeSeconds:.5,catchLungeDistance:1.6,chaseSpeed:4.6,chaseRetarget:.35,caughtTime:2.8,spinInterval:[18,25],spinTelegraph:1,spinSeconds:1.5,spinRadius:5,printNoticeAge:8,printRange:9,printStep:3.5,trailSpeed:4.2,nearMissRange:8,lanternColor:`#ffb15c`,lanternIntensity:140,lanternRange:15,lanternAngle:.38,glanceSeconds:2.4,glanceCooldown:5,cheatInterval:15,cheatCandidates:3},Ml=(e,t)=>e+Math.random()*(t-e),Nl=e=>Math.atan2(Math.sin(e),Math.cos(e)),Pl=class{host;fx;cfg;masq;group;debugGroup=new gt;state=`patrol_walk`;suspicion=0;onCaught=null;onCatchStart=null;onSpotted=null;onSpinTelegraph=null;onSpinStart=null;onSpinEnd=null;blind=!1;frustrated=!1;eye=new Y;nav;cone;indicator;pos=new Y;yaw=0;path=[];pathIdx=0;stuckT=0;stuckFails=0;stuckFrom=new ze;lookT=0;lookDur=3;lookBase=0;lookAt=null;buildMs;cov;patrol;memory;scale;quiet;ownsPatrol;lantern;beam;curStop=null;sweeping=!1;chasing=!1;spinIn=20;spinT=0;ring;trailId=null;trailSeen=0;printT=0;curiousT=0;closeSense=0;glanceT=0;chaseT=0;cheatTimer=0;noiseTimer=0;lastSeen=null;catchT=0;caughtT=0;losT=0;visFrac=0;speed=0;anim=`search_walk`;targetLabel=`none`;targetPoint=null;debugOn=!1;line;tmp=new Y;sense={inCone:!1,rate:0,exposure:0,distFactor:0,dist:0,heard:``,canCatch:!1};pathAge=0;constructor(e,t,n,r={...jl},i={}){this.host=e,this.fx=t,this.cfg=r,this.scale=i.scale??1,this.quiet=!!i.quiet,this.ownsPatrol=!i.share,this.masq=uo(),this.group=this.masq.group,this.group.scale.setScalar(this.scale),this.cfg.eyeHeight*=this.scale,this.cone=t.addVisionCone(this.group,r.visionRange,r.visionFovDeg),this.cone.mesh.scale.setScalar(1/this.scale),this.indicator=t.addSuspicionIndicator(this.group),this.ring=new It(new y(r.spinRadius-.45,r.spinRadius,56).rotateX(-Math.PI/2),new H({color:`#ffb347`,transparent:!0,opacity:0,depthWrite:!1,side:2})),this.ring.position.y=.06,this.ring.visible=!1,this.ring.scale.setScalar(1/this.scale),this.group.add(this.ring),this.lantern=new gt;let a=new It(new Qe(.06,.06,.2,8),new H({color:`#ffd68a`})),o=new It(new Qe(.075,.075,.03,8),new H({color:`#2a1d12`}));o.position.y=.115,this.lantern.add(a,o),this.lantern.position.set(.52,1,.42),this.lantern.visible=!1,this.beam=new we(jl.lanternColor,0,jl.lanternRange,jl.lanternAngle,.55,1.2),this.beam.position.copy(this.lantern.position),this.beam.target.position.set(.52,.2,8),this.group.add(this.lantern,this.beam,this.beam.target),n.add(this.group,this.debugGroup);let s=performance.now();i.share?(this.cov=i.share.cov,this.memory=i.share.memory,this.patrol=i.share.patrol):(this.cov=new La(e.colliders,e.bounds,{...Ia,cell:r.navCell,seekerRadius:r.radius+.05}),this.memory=new Dl(this.cov),this.patrol=new kl(this.cov,e.spots,e=>this.standPoint(e),void 0,this.memory)),this.nav=this.cov.seeker,this.buildMs=Math.round(performance.now()-s),this.group.traverse(e=>{e instanceof It&&!(e.material instanceof he)&&(e.castShadow=!0)});let c=new Lt().setFromPoints(Array.from({length:24},()=>new Y));this.line=new pt(c,new xt({color:`#ff2fd0`,depthTest:!1})),this.line.renderOrder=998,this.line.frustumCulled=!1,this.debugGroup.add(this.line),this.debugGroup.visible=!1,this.reset()}applyDifficulty(e){let t=e.visionFovDeg!==void 0&&e.visionFovDeg!==this.cfg.visionFovDeg||e.visionRange!==void 0&&e.visionRange!==this.cfg.visionRange;Object.assign(this.cfg,e),t&&(this.fx.removeVisionCone(this.cone),this.cone=this.fx.addVisionCone(this.group,this.cfg.visionRange,this.cfg.visionFovDeg),this.cone.mesh.scale.setScalar(1/this.scale))}setLantern(e){this.lantern.visible=e,this.beam.intensity=e?jl.lanternIntensity:0}setPresent(e){this.group.visible=e}setDebug(e){this.debugOn=e,this.debugGroup.visible=e}get debug(){return this.debugOn}get position(){return this.pos}get heading(){return this.yaw}reset(e){this.suspicion=0,this.lastSeen=null,this.catchT=this.caughtT=0,this.cheatTimer=0,this.noiseTimer=0,this.speed=0,this.endSpin(!1),this.patrol?.beginRound(),this.spinIn=Ml(...this.cfg.spinInterval),this.trailId=null,this.trailSeen=0,e&&this.placeAt(e.x,e.z,e.yaw??this.yaw),this.startPatrol(),this.applyFx()}placeAt(e,t,n){this.pos.set(e,0,t),this.yaw=n,this.group.position.copy(this.pos),this.group.rotation.y=n,this.path=[]}goTo(e,t,n){let r=this.nav.path(this.pos,{x:e,z:t},this.cfg.pathRound);return!r||!r.length?!1:(this.path=r,this.pathIdx=0,this.targetPoint=r[r.length-1],this.targetLabel=n,this.stuckT=0,this.stuckFrom.set(this.pos.x,this.pos.z),this.pathAge=0,!0)}standPoint(e){return{x:e.position.x-e.facing.x*this.cfg.checkStandOff,z:e.position.z-e.facing.z*this.cfg.checkStandOff}}startPatrol(){this.state=`patrol_walk`,this.chasing=!1;let e=new Set;for(let t=0;t<5;t++){let t=this.patrol.next(this.pos.x,this.pos.z,e,this);if(e.add(t),this.goTo(t.x,t.z,`patrol: ${t.id}`)){this.curStop=t,this.lookAt=t.lookAt?new Y(t.lookAt.x,0,t.lookAt.z):null;return}}this.curStop=null,this.startLook(`patrol_look`)}startLook(e){this.state=e,this.lookT=0,this.lookDur=Ml(...e===`investigate_look`?this.cfg.investigateLookTime:this.cfg.lookTime),this.lookBase=this.lookAt?Math.atan2(this.lookAt.x-this.pos.x,this.lookAt.z-this.pos.z):this.yaw,this.path=[],this.sweeping=e===`patrol_look`&&!!this.curStop&&this.curStop.kind!==`spot`,this.sweeping&&(this.lookDur=this.patrol.cfg.sweepSeconds),(e===`patrol_look`||e===`check_look`)&&this.curStop&&this.patrol.visited(this.curStop)}startInvestigate(e,t,n,r=null){this.curStop=null,this.trailId=r,this.goTo(e,t,n)?(this.state=`investigate_walk`,this.lookAt=new Y(e,0,t)):this.startPatrol()}startCheck(e){let t=[...this.host.spots].sort((t,n)=>(t.position.x-e.x)**2+(t.position.z-e.z)**2-((n.position.x-e.x)**2+(n.position.z-e.z)**2)).slice(0,this.cfg.cheatCandidates),n=t[Math.floor(Math.random()*t.length)];if(!n)return;let r=this.patrol.stops.find(e=>e.id===`spot ${n.id}`),i=r??this.standPoint(n);this.goTo(i.x,i.z,`check: ${n.id}`)&&(this.curStop=r??null,this.state=`check_walk`,this.lookAt=n.position.clone())}update(e,t){let n=this.cfg;if(e=Math.min(e,.05),this.noiseTimer=Math.max(0,this.noiseTimer-e),this.glanceT=Math.max(0,this.glanceT-e),this.cheatTimer+=e,this.ownsPatrol&&this.patrol.tick(e),this.eye.set(this.pos.x+Math.sin(this.yaw)*.12,n.eyeHeight,this.pos.z+Math.cos(this.yaw)*.12),this.state===`caught`)this.caughtT+=e,this.anim=`victory_dance`,this.finish(e);else if(this.blind||this.frustrated)this.anim=this.blind?`sing_eyes_covered`:`look_around`,this.speed=0,this.suspicion=0,this.path=[],this.finish(e);else{if(this.sees(e,t),this.hears(t),this.tickSpin(e),this.scanPrints(e),this.state!==`catch`){if(this.suspicion>=n.catchAt)this.sense.canCatch?(this.endSpin(!1),this.state=`catch`,this.catchT=0,this.path=[],this.chasing=!1,this.onCatchStart?.()):this.chase(e,t);else{this.chasing=!1,this.curiousT-=e;let r=this.state===`patrol_walk`||this.state===`patrol_look`||this.state===`check_walk`||this.state===`check_look`||this.state===`investigate_look`;this.suspicion>=n.curiousAt&&this.suspicion<n.leanAt&&r&&this.curiousT<=0&&this.lastSeen?(this.curiousT=n.curiousCooldown,this.startInvestigate(this.lastSeen.x,this.lastSeen.z,`curious: something moved`)):this.suspicion>=n.leanAt&&this.state!==`suspicious`?(this.endSpin(!1),this.state=`suspicious`,this.memory.note(t.position.x,t.position.z,El.suspectedHeat),this.onSpotted?.(),this.path=[]):this.state===`suspicious`&&this.suspicion<n.leanExit&&(this.lastSeen?this.startInvestigate(this.lastSeen.x,this.lastSeen.z,`investigate: last seen`):this.startPatrol())}}switch(this.state){case`patrol_walk`:case`investigate_walk`:case`check_walk`:{this.anim=`search_walk`;let t=this.state===`patrol_walk`?n.patrolSpeed:this.state===`investigate_walk`?this.chasing?n.chaseSpeed:this.trailId===null?n.investigateSpeed:n.trailSpeed:n.checkSpeed;if(this.follow(e,t)){if(this.state===`investigate_walk`&&this.trailId!==null&&this.nextOnTrail())break;let e=this.state===`patrol_walk`?`patrol_look`:this.state===`investigate_walk`?`investigate_look`:`check_look`;this.startLook(e)}break}case`patrol_look`:case`investigate_look`:case`check_look`:{this.anim=`look_around`,this.speed+=(0-this.speed)*Math.min(1,e*8),this.lookT+=e;let r=this.sweeping?this.lookT/this.lookDur*Math.PI*2:Math.sin(this.lookT*1.1)*n.lookSweepAngle*Math.min(1,this.lookT/.6);this.yaw+=Nl(this.lookBase+r-this.yaw)*Math.min(1,e*(this.sweeping?8:5)),this.lookT>=this.lookDur&&this.startPatrol(),this.cheatTick(t);break}case`suspicious`:{this.anim=`suspicious_lean`,this.speed+=(0-this.speed)*Math.min(1,e*10);let n=this.lastSeen??t.position;this.yaw+=Nl(Math.atan2(n.x-this.pos.x,n.z-this.pos.z)-this.yaw)*Math.min(1,e*8);break}case`spin_wind`:{this.anim=`spin_wind`,this.speed+=(0-this.speed)*Math.min(1,e*10),this.spinT+=e;let t=Math.min(1,this.spinT/n.spinTelegraph);this.masq.lift=t,this.ringMaterial.opacity=.3+.4*t*(.5+.5*Math.sin(this.spinT*20)),this.spinT>=n.spinTelegraph&&(this.state=`spin`,this.spinT=0,this.onSpinStart?.());break}case`spin`:this.anim=`spin_sweep`,this.speed+=(0-this.speed)*Math.min(1,e*10),this.spinT+=e,this.yaw+=Math.PI*2/n.spinSeconds*e,this.masq.lift=1,this.ringMaterial.opacity=.75,this.spinT>=n.spinSeconds&&(this.endSpin(!0),this.startPatrol());break;case`catch`:{this.anim=`catch_lunge`,this.catchT+=e;let r=t.position.x-this.pos.x,i=t.position.z-this.pos.z,a=Math.hypot(r,i);if(this.yaw+=Nl(Math.atan2(r,i)-this.yaw)*Math.min(1,e*14),this.catchT<n.catchLungeSeconds&&a>1){let t=Math.min(n.catchLungeDistance/n.catchLungeSeconds*e,a-1),o={x:this.pos.x+r/a*t,z:this.pos.z+i/a*t};qo(o,n.radius-.05,this.host.colliders,-5),this.pos.x=o.x,this.pos.z=o.z,this.speed=n.catchLungeDistance/n.catchLungeSeconds}else this.speed=0;this.catchT>=n.catchLungeSeconds&&(this.state=`caught`,this.caughtT=0,this.suspicion=1,this.memory.note(t.position.x,t.position.z,El.caughtHeat),this.memory.save(),this.onCaught?.());break}}this.finish(e)}}get ringMaterial(){return this.ring.material}tickSpin(e){this.state!==`spin_wind`&&this.state!==`spin`&&(this.state!==`patrol_walk`&&this.state!==`patrol_look`&&this.state!==`investigate_walk`&&this.state!==`investigate_look`&&this.state!==`check_walk`&&this.state!==`check_look`||this.suspicion>=this.cfg.leanAt||(this.spinIn-=e,!(this.spinIn>0)&&(this.state=`spin_wind`,this.spinT=0,this.path=[],this.chasing=!1,this.ring.visible=!0,this.onSpinTelegraph?.())))}endSpin(e){let t=this.state===`spin_wind`||this.state===`spin`;this.masq.lift=0,this.ring.visible=!1,this.ringMaterial.opacity=0,this.spinT=0,this.spinIn=Ml(...this.cfg.spinInterval),t&&e&&this.onSpinEnd?.()}get spinning(){return this.state===`spin`}get spinWarning(){return this.state===`spin_wind`}glance(e,t){let n=this.cfg;return this.blind||this.frustrated||this.glanceT>0||this.suspicion>=n.leanAt||this.state!==`patrol_walk`&&this.state!==`patrol_look`&&this.state!==`check_walk`&&this.state!==`check_look`&&this.state!==`investigate_walk`&&this.state!==`investigate_look`||this.chasing?!1:(this.glanceT=n.glanceCooldown,this.trailId=null,this.curStop=null,this.lookAt=new Y(e,0,t),this.startLook(`investigate_look`),this.lookDur=n.glanceSeconds,!0)}get nearMiss(){return!this.blind&&!this.frustrated&&this.state!==`catch`&&this.state!==`caught`&&this.sense.inCone&&this.visFrac>0&&this.sense.dist<=this.cfg.nearMissRange}scanPrints(e){let t=this.cfg;if(this.printT-=e,this.printT>0)return;this.printT=.25;let n=this.host.prints?.list();if(!n||!n.length||!(this.state===`patrol_walk`||this.state===`patrol_look`||this.state===`investigate_look`||this.state===`check_walk`||this.state===`check_look`||this.state===`investigate_walk`&&this.trailId===null&&!this.chasing)||this.suspicion>=t.leanAt)return;let r=Math.cos(At.degToRad(t.visionFovDeg/2)),i=null;for(let e of n){if(e.age>t.printNoticeAge||e.id<=this.trailSeen)continue;let n=e.x-this.pos.x,a=e.z-this.pos.z,o=Math.hypot(n,a);o>t.printRange||o>.3&&(Math.sin(this.yaw)*n+Math.cos(this.yaw)*a)/o<r||this.host.blocked(this.eye,this.tmp.set(e.x,.05,e.z))||(!i||e.id>i.id)&&(i=e)}i&&(this.trailSeen=i.id,this.startInvestigate(i.x,i.z,`footprint`,i.id))}nextOnTrail(){let e=this.host.prints?.list(),t=this.trailId??0,n=e?.find(e=>e.id>t&&e.age<=this.cfg.printNoticeAge+2&&Math.hypot(e.x-this.pos.x,e.z-this.pos.z)<=this.cfg.printStep);return n?(this.trailSeen=Math.max(this.trailSeen,n.id),this.startInvestigate(n.x,n.z,`footprint trail`,n.id),!0):(this.trailId=null,!1)}chase(e,t){if(this.chasing=!0,this.chaseT-=e,this.state===`investigate_walk`&&this.chaseT>0)return;this.chaseT=this.cfg.chaseRetarget;let n=this.visFrac>0?t.position:this.lastSeen??t.position;this.startInvestigate(n.x,n.z,`chase`)}canSee(e,t,n=this.cfg.visionRange){let r=e-this.pos.x,i=t-this.pos.z,a=Math.hypot(r,i);return a>n||a>.2&&(Math.sin(this.yaw)*r+Math.cos(this.yaw)*i)/a<Math.cos(At.degToRad(this.cfg.visionFovDeg/2))?!1:this.cfg.sampleHeights.stand.some(n=>!this.host.blocked(this.eye,this.tmp.set(e,n,t)))}cheatTick(e){this.cheatTimer>=this.cfg.cheatInterval&&(this.state===`patrol_look`||this.state===`patrol_walk`)&&(this.cheatTimer=0,this.startCheck(e.position))}finish(e){this.group.position.set(this.pos.x,0,this.pos.z),this.group.rotation.y=this.yaw,this.masq.play(this.anim,.25),this.masq.animator.speed=this.anim===`search_walk`?Math.max(.6,Math.min(1.5,this.speed/2.4)):1,this.masq.update(e),this.applyFx(),this.debugOn&&this.drawDebug()}applyFx(){this.cone.mesh.visible=!this.blind&&!this.frustrated&&this.state!==`caught`,this.cone.setSuspicion(this.suspicion),this.indicator.set(this.suspicion),this.quiet||Z.setSuspicion(this.suspicion)}sees(e,t){let n=this.cfg,r=t.position.x-this.pos.x,i=t.position.z-this.pos.z,a=Math.hypot(r,i),o=this.state===`spin`?a<=n.spinRadius:a<=this.closeSense||a<=n.visionRange&&(a<.2||(Math.sin(this.yaw)*r+Math.cos(this.yaw)*i)/a>=Math.cos(At.degToRad(n.visionFovDeg/2)));if(this.losT+=e,o){if(this.losT>=1/n.losHz){this.losT=0;let e=n.sampleHeights[t.pose&&n.sampleHeights[t.pose]?t.pose:`stand`],r=0;for(let n of e)this.host.blocked(this.eye,this.tmp.set(t.position.x,t.position.y+n,t.position.z))||r++;this.visFrac=r/e.length}}else this.visFrac=0;let s=Al(t.camo,n.exposureCurve),c=Math.min(1,Math.max(n.minDistanceFactor,1-a/n.visionRange));a<n.nearRadius&&(c*=n.nearBoost);let l=o&&this.visFrac>0,u=l?n.rateMax*s*c*this.visFrac:0;this.sense={...this.sense,inCone:o,rate:u,exposure:s,distFactor:c,dist:a,canCatch:l&&a<=n.catchRange},l?(this.lastSeen=(this.lastSeen??new Y).copy(t.position),this.suspicion+=(u-n.seenDecay)*e):this.suspicion-=n.lostDecay*e,this.suspicion=Math.min(1,Math.max(0,this.suspicion))}hears(e){let t=this.cfg,n=e.landed||e.speed>3.6?t.hearRunRadius:e.speed>.35?t.hearWalkRadius:0,r=Math.hypot(e.position.x-this.pos.x,e.position.z-this.pos.z);if(this.sense.heard=n&&r<=n?`${e.landed?`landing`:e.speed>3.6?`running`:`walking`} at ${r.toFixed(1)} m`:``,!n||r>n||this.noiseTimer>0||this.state===`suspicious`||this.state===`catch`||this.state===`caught`)return;let i=this.targetPoint;(this.state===`investigate_walk`||this.state===`investigate_look`)&&i&&Math.hypot(i.x-e.position.x,i.z-e.position.z)<t.noiseRetargetDistance||(this.noiseTimer=t.noiseCooldown,this.startInvestigate(e.position.x,e.position.z,`noise: ${this.sense.heard}`))}follow(e,t){let n=this.cfg;if(!this.path.length||this.pathIdx>=this.path.length)return!0;let r=this.path[this.pathIdx],i=r.x-this.pos.x,a=r.z-this.pos.z;if(Math.hypot(i,a)<(this.pathIdx===this.path.length-1?n.arriveRadius*.6:n.arriveRadius))return this.pathIdx++,this.pathIdx>=this.path.length;this.yaw+=Nl(Math.atan2(i,a)-this.yaw)*(1-Math.exp(-e*n.turnRate));let o=Math.max(.25,Math.cos(Nl(Math.atan2(i,a)-this.yaw)));this.speed+=(t*o-this.speed)*Math.min(1,e*6);let s={x:this.pos.x+Math.sin(this.yaw)*this.speed*e,z:this.pos.z+Math.cos(this.yaw)*this.speed*e};if(qo(s,n.radius-.05,this.host.colliders,-5),this.pos.x=s.x,this.pos.z=s.z,this.stuckT+=e,this.stuckT>1.5){if(Math.hypot(this.pos.x-this.stuckFrom.x,this.pos.z-this.stuckFrom.y)<.4){this.stuckFails++;let e=this.targetPoint;if(this.stuckFails>=2||!e||!this.goTo(e.x,e.z,this.targetLabel))return this.stuckFails=0,this.curStop&&this.patrol.snooze(this.curStop),(this.state===`patrol_walk`||this.state===`check_walk`)&&this.startPatrol(),this.state!==`patrol_walk`&&this.state!==`check_walk`}else this.stuckFails=0;this.stuckT=0,this.stuckFrom.set(this.pos.x,this.pos.z)}return!1}describe(e){let t=this.sense,n=this.targetPoint,r=`#`.repeat(Math.round(this.suspicion*20)).padEnd(20,`.`);return[`AI state   ${this.state}`,`target     ${this.targetLabel}${n?` (${n.x.toFixed(1)}, ${n.z.toFixed(1)}) ${Math.hypot(n.x-this.pos.x,n.z-this.pos.z).toFixed(1)} m away`:``}`,`suspicion  ${this.suspicion.toFixed(2)} [${r}]  lean@${this.cfg.leanAt} catch@${this.cfg.catchAt}`,`sight      ${t.inCone?`in cone`:`outside cone`}, d ${t.dist.toFixed(1)} m, line of sight ${(this.visFrac*100).toFixed(0)}%`,`rate       ${t.rate.toFixed(3)}/s = max ${this.cfg.rateMax} x exposure ${t.exposure.toFixed(3)} (camo ${e?e.camo.toFixed(0):`?`}) x dist ${t.distFactor.toFixed(2)} x vis ${this.visFrac.toFixed(2)}`,`hearing    ${t.heard||`nothing`}${this.noiseTimer>0?` (cooling down)`:``}`,`cheat      next peek in ${Math.max(0,this.cfg.cheatInterval-this.cheatTimer).toFixed(1)} s`].join(`
`)}drawDebug(){let e=[new Y(this.pos.x,.2,this.pos.z)];for(let t=this.pathIdx;t<this.path.length&&e.length<24;t++)e.push(new Y(this.path[t].x,.2,this.path[t].z));for(;e.length<24;)e.push(e[e.length-1].clone());this.line.geometry.setFromPoints(e)}},Fl={drops:750,half:18,height:13,fallSpeed:15,length:.55,slant:.12,color:`#d4e4ff`,opacity:.45},Il=class{cfg;object;pos;seed;on=!1;constructor(e,t=Fl){this.cfg=t;let n=t.drops;this.pos=new Float32Array(n*6),this.seed=new Float32Array(n*3);for(let e=0;e<n;e++)this.seed.set([Math.random(),Math.random(),Math.random()],e*3);let r=new Lt;r.setAttribute(`position`,new Ot(this.pos,3)),this.object=new it(r,new xt({color:t.color,transparent:!0,opacity:t.opacity,depthWrite:!1,fog:!1})),this.object.frustumCulled=!1,this.object.visible=!1,e.add(this.object)}set enabled(e){this.on=e,this.object.visible=e}update(e,t,n){if(!this.on)return;let r=this.cfg,i=r.half*2;for(let e=0;e<r.drops;e++){let[a,o,s]=[this.seed[e*3],this.seed[e*3+1],this.seed[e*3+2]],c=((o*r.height-n*r.fallSpeed*(.8+.4*s))%r.height+r.height)%r.height,l=(e,t)=>((e*i-t)%i+i)%i-r.half+t,u=l(a+c*r.slant*.02,t.x),d=l(s,t.z);this.pos.set([u,c,d,u+r.slant,c+r.length,d],e*6)}this.object.geometry.attributes.position.needsUpdate=!0}},Ll={nepaRound:3,rainRound:4,secondRound:5,nepa:{visionFovDeg:34,visionRange:9,senseRadius:1.8},rain:{fadeTau:38,refresh:.6,thunder:[14,28]},second:{scale:.72,radius:.45,speedMul:1.18,fovMul:.85,startOffsetZ:-2.4}};function Rl(e,t=Ll){let n=e>=t.secondRound,r=e===t.nepaRound,i=e===t.rainRound;e>t.secondRound&&(r=e%2==1,i=!r);let a=[];r&&a.push(`NEPA TOOK THE LIGHT`),i&&a.push(`RAIN`),n&&a.push(`A SECOND MASQUERADE`);let o=[];return r&&o.push(`It sees only by its lantern. Stay out of the beam.`),i&&o.push(`The rain is washing your paint away.`),n&&o.push(`A smaller, faster egungun joins the hunt.`),{nepa:r,rain:i,second:n,title:a.join(` · `),tagline:o.join(` `)}}var zl={targetFps:45,windowSeconds:5,minFrames:3,maxFrameSeconds:2},Bl=[`full`,`low shadows`,`low shadows + pixel ratio 1`,`low shadows + pixel ratio 1 + no dust`],Vl=class{apply;cfg;tier=0;lastFps=0;time=0;frames=0;measuring=!1;settled=!1;constructor(e,t=zl){this.apply=e,this.cfg=t}begin(){this.settled||(this.measuring=!0,this.time=0,this.frames=0)}stop(){this.measuring=!1}frame(e){if(!this.measuring||e>this.cfg.maxFrameSeconds||(this.time+=e,this.frames++,this.time<this.cfg.windowSeconds))return;let t=this.frames/this.time;this.lastFps=t;let n=this.frames>=this.cfg.minFrames;this.time=0,this.frames=0,n&&(t>=this.cfg.targetFps||this.tier>=3?(this.settled=!0,this.measuring=!1,console.info(`[quality] ${t.toFixed(1)} fps over ${this.cfg.windowSeconds} s: keeping tier ${this.tier} (${Bl[this.tier]})`)):(this.tier+=1,console.info(`[quality] ${t.toFixed(1)} fps is under ${this.cfg.targetFps}: dropping to tier ${this.tier} (${Bl[this.tier]}), measuring again`),this.apply(this.tier)))}},Hl=`#d8fd71`,Ul=(e,t)=>e.style.cssText=t,$=(e,t=``,n)=>{let r=document.createElement(e);return t&&(r.style.cssText=t),n!==void 0&&(r.textContent=n),r},Wl=e=>`${Math.floor(e/60)}:${String(Math.round(e)%60).padStart(2,`0`)}`,Gl=`font:800 16px system-ui,sans-serif;min-height:48px;padding:0 22px;border:0;border-radius:999px;cursor:pointer;touch-action:manipulation;color:#1f2118;background:${Hl}`,Kl=`font:700 14px system-ui,sans-serif;min-height:44px;padding:0 18px;border:2px solid #fff9;border-radius:999px;cursor:pointer;touch-action:manipulation;color:#fff;background:#0006`,ql=class{h;root=$(`div`,`position:fixed;inset:0;z-index:20;pointer-events:none;font-family:system-ui,sans-serif;color:#fff`);lobby=$(`div`,`position:absolute;inset:0;display:none;overflow:auto;pointer-events:none`);results=$(`div`,`position:absolute;inset:0;display:none;background:#150c0acc;overflow:auto;pointer-events:auto`);pause=$(`div`,`position:absolute;inset:0;display:none;align-items:center;justify-content:center;background:#000a;pointer-events:auto`);card=$(`div`,`position:fixed;top:8px;left:8px;z-index:6;display:none;align-items:center;gap:10px;padding:6px 16px 6px 6px;border-radius:999px;background:#292a23e6;color:#fffefa;font-family:system-ui,sans-serif;pointer-events:none`);cardFace=$(`img`,`width:44px;height:44px;border-radius:50%;background:${Hl};object-fit:cover`);cardName=$(`b`,`display:block;font-size:15px`);cardAccount=$(`span`,`font-size:11px;opacity:.7`);constructor(e){this.h=e,this.root.append(this.lobby,this.results,this.pause),document.body.append(this.root);let t=$(`div`);t.append(this.cardName,this.cardAccount),this.card.append(this.cardFace,t),document.body.append(this.card),this.buildPause()}setCard(e){if(!e){this.card.style.display=`none`;return}let t=innerWidth<600;this.cardFace.style.width=this.cardFace.style.height=t?`34px`:`44px`,this.cardName.style.cssText=`display:block;font-size:${t?13:15}px;max-width:${t?84:180}px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`,this.card.style.padding=t?`4px 10px 4px 4px`:`6px 16px 6px 6px`,this.card.style.maxWidth=t?`160px`:`320px`,this.cardFace.src=e.face,this.cardName.textContent=e.name,this.cardAccount.textContent=e.account?`@${e.account}`:`Not signed in`,this.card.style.display=`flex`}levelSelect=null;setLevels(e,t,n){this.levelSelect={levels:e,current:t,pick:n}}showLobby(e,t,n,r){this.hideAll(),this.lobby.replaceChildren();let i=innerWidth<innerHeight?`46vh`:`20px`;Ul(this.lobby,`position:absolute;inset:0;display:flex;flex-wrap:wrap;align-content:flex-start;gap:16px;padding:${i} 20px 20px;overflow:auto;pointer-events:none`);let a=$(`div`,`pointer-events:auto;width:min(380px,100%);display:flex;flex-direction:column;gap:12px`);a.append($(`div`,`font:800 clamp(34px,6vw,52px)/1 system-ui;letter-spacing:1px;text-shadow:0 4px 18px #000`,`Boju Boju`),$(`div`,`font:600 16px system-ui;opacity:.92;text-shadow:0 2px 8px #000;margin-top:-6px`,`Hide from the masquerade`));let o=$(`div`,`display:flex;align-items:center;gap:12px;padding:10px 14px;background:#150c0acc;border-radius:16px`),s=$(`img`,`width:64px;height:64px;border-radius:50%;background:${Hl};object-fit:cover`);s.src=e.face,s.alt=``;let c=$(`div`);if(c.append($(`div`,`font:800 22px system-ui`,e.name),$(`div`,`font:12px system-ui;opacity:.75`,e.account?`@${e.account}`:e.signedIn?``:`Playing as a guest`)),o.append(s,c),a.append(o),a.append($(`div`,`padding:8px 14px;background:#150c0acc;border-radius:12px;font:600 14px system-ui`,t?`Your best run: ${t.score} points · ${t.rounds} round${t.rounds===1?``:`s`} · ${t.camo}% camo`:e.signedIn?`No run saved yet. Go on, hide!`:`Sign in to save your best run.`)),this.levelSelect&&this.levelSelect.levels.length>1){let{levels:e,current:t,pick:n}=this.levelSelect,r=$(`div`,`display:flex;gap:8px`);for(let i of e){let e=i.id===t,a=$(`button`,`flex:1 1 0;min-height:44px;padding:6px 8px;border-radius:14px;cursor:pointer;touch-action:manipulation;border:2px solid ${e?Hl:`#fff3`};background:${e?`#2a3a0acc`:`#150c0acc`};color:${e?Hl:`#fff`};font:800 14px system-ui`,i.name.replace(`The `,``));a.title=i.blurb,a.setAttribute(`aria-pressed`,String(e)),a.onclick=()=>{e||n(i.id)},r.append(a)}a.append(r,$(`div`,`font:600 12px/1.35 system-ui;opacity:.9;text-shadow:0 1px 6px #000;margin-top:-4px`,e.find(e=>e.id===t)?.blurb??``))}let l=$(`button`,Gl+`;font-size:20px;min-height:56px`,`Play`);if(l.onclick=()=>this.h.play(),a.append(l),r&&!e.signedIn){let e=$(`button`,Kl,`Sign in to save your score`);e.onclick=()=>this.h.signIn(),a.append(e)}a.append(this.howToPlay()),this.lobby.append(a),n?.length&&this.lobby.append(this.boardPanel(`Top hiders`,n,e.id,`pointer-events:auto;width:min(420px,100%);align-self:flex-start;margin-left:auto`)),this.lobby.style.display=`flex`}hideLobby(){this.lobby.style.display=`none`}howToPlay(){let e=$(`div`,`background:#150c0acc;border-radius:16px;padding:12px 14px;font:13px/1.55 system-ui`),t=matchMedia(`(pointer: coarse)`).matches;e.append($(`div`,`font:800 15px system-ui;margin-bottom:6px`,`How to play`));let n=t?[`The masquerade counts with its eyes covered. Hide before the chant ends, then press Ready (or let the timer run out).`,`Drag anywhere to walk. Jump climbs low things; walking into a prop hops you up.`,`Eyedropper: tap it, then tap a surface within 4 m to copy its colour onto your clothes.`,`Zone switches between your top and your trousers. Palette picks a swatch.`,`Stiff, Crouch, Wall and Ball are poses: Wall presses you flat to the nearest wall.`,`Stay still and blended until the hourglass runs out. Moving breaks a pose and gives you away.`]:[`The masquerade counts with its eyes covered. Hide before the chant ends, then press Ready (Enter) or let the timer run out.`,`W A S D walk, Shift runs, Space jumps. Walking into a low prop hops you up onto it.`,`E turns the eyedropper on: click a surface within 4 m to copy its colour onto your clothes. Q switches top or trousers, P opens the palette.`,`1 Stiff, 2 Crouch, 3 Wall (presses you flat to the nearest wall), 4 Ball. Moving breaks a pose.`,`Stay still and blended until the hourglass runs out. Esc pauses.`];for(let t of n)e.append($(`div`,`margin:3px 0`,t));return e}boardPanel(e,t,n,r=``){let i=$(`div`,`background:#150c0acc;border-radius:16px;padding:12px 14px;${r}`);i.append($(`div`,`font:800 15px system-ui;margin-bottom:6px`,e));let a=$(`table`,`width:100%;border-collapse:collapse;font:13px system-ui`),o=$(`tr`,`opacity:.6;font-size:11px;text-align:right`);for(let[e,t]of[`#`,`Hider`,`Score`,`Rounds`,`Camo`].entries())o.append($(`td`,`padding:2px 6px;${e<2?`text-align:left`:``}`,t));a.append(o);for(let e of t.slice(0,10)){let t=$(`tr`,`text-align:right;${n!==null&&e.player_id===n?`background:${Hl};color:#1f2118;font-weight:800`:``}`);[String(e.rank),e.name,String(e.stats.score??e.score),String(e.stats.rounds??0),`${e.stats.camo??0}%`].forEach((e,n)=>t.append($(`td`,`padding:3px 6px;${n<2?`text-align:left`:``}${n===1?`;max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`:``}`,e))),a.append(t)}return i.append(a),i}showResults(e,t,n,r,i,a){this.hideAll(),this.results.replaceChildren();let o=$(`div`,`display:flex;flex-wrap:wrap;gap:14px;justify-content:center;align-items:flex-start;padding:16px;box-sizing:border-box;width:100%;max-width:960px;margin:auto`),s=$(`div`,`background:#291410f2;border:1px solid #fff3;border-radius:20px;padding:14px 20px 16px;width:min(420px,100%);box-sizing:border-box;display:flex;flex-direction:column;gap:6px`);s.append($(`div`,`font:800 28px system-ui;letter-spacing:1px`,`Run over`));let c=$(`div`,`display:flex;justify-content:space-between;align-items:baseline;font:800 26px system-ui;padding:2px 0 6px;border-bottom:2px solid #fff4`);c.append($(`span`,``,`Score`),$(`b`,`color:${Hl}`,String(e.score))),s.append(c);let l=[[`Survival`,String(e.parts.survival)],[`Near misses`,String(e.parts.nearMiss)],[`Ready early`,String(e.parts.ready)],[`Run home`,String(e.parts.runHome)],[`Camo bonus`,String(e.parts.camo)],[`Rounds survived`,String(e.rounds)],[`Time hidden`,Wl(e.hiddenSeconds)],[`Best camo (held 3 s)`,`${e.bestCamo}%`]];for(let[e,t]of l){let n=$(`div`,`display:flex;justify-content:space-between;font:600 15px system-ui;padding:2px 0;border-bottom:1px solid #fff2`);n.append($(`span`,`opacity:.8`,e),$(`b`,``,t)),s.append(n)}s.append($(`div`,`font:italic 600 14px/1.4 system-ui;margin:4px 0`,`"${t}"`)),n&&s.append($(`div`,`font:700 13px system-ui;color:${Hl}`,n));let u=$(`div`,`display:flex;gap:10px;flex-wrap:wrap;margin-top:4px`),d=$(`button`,Gl,`Play again`);d.onclick=()=>this.h.again();let f=$(`button`,Kl,`Back to lobby`);if(f.onclick=()=>this.h.lobby(),u.append(d,f),a){let e=$(`button`,Kl,`Sign in to save`);e.onclick=()=>this.h.signIn(),u.append(e)}s.append(u),o.append(s),r?.length&&o.append(this.boardPanel(`Top hiders`,r,i,`width:min(440px,100%);box-sizing:border-box;align-self:flex-start`)),this.results.append(o),this.results.style.display=`flex`}buildPause(){let e=$(`div`,`background:#291410f2;border-radius:20px;padding:22px 26px;display:flex;flex-direction:column;gap:12px;align-items:center;min-width:240px`);e.append($(`div`,`font:800 32px system-ui;letter-spacing:2px`,`Paused`));let t=$(`button`,Gl,`Resume`);t.onclick=()=>this.h.resume();let n=$(`button`,Kl,`Quit run`);n.onclick=()=>this.h.quit(),e.append(t,n,$(`div`,`font:12px system-ui;opacity:.7`,`Esc resumes`)),this.pause.append(e)}showPause(e){this.pause.style.display=e?`flex`:`none`}get pausedVisible(){return this.pause.style.display!==`none`}hideAll(){this.lobby.style.display=`none`,this.results.style.display=`none`,this.pause.style.display=`none`}},Jl=e({GAME_CONFIG:()=>Xl,startGame:()=>Ql}),Yl=!1,Xl={lobbyTurnRate:.55,lobbyCamera:{x:1.3,y:1.5,z:4.8,lookX:-.9,lookY:1},celebrateColors:[`#f4a300`,`#2fa59b`,`#d13b2e`,`#2a5db0`,`#e8dcb8`],hopInterval:.7};function Zl(e){let t=document.createElement(`div`);return t.style.cssText=`position:fixed;z-index:6;font:13px/1.4 system-ui,sans-serif;color:#fff;text-shadow:0 1px 3px #000;${e}`,document.body.appendChild(t),t}async function Ql(e=ct()){let t=new URLSearchParams(location.search),n=e=>Yl,r=matchMedia(`(pointer: coarse)`).matches;document.body.style.cssText=`margin:0;overflow:hidden;background:#d9b88f;overscroll-behavior:none`;let i=new sa({antialias:!r,powerPreference:`high-performance`});fo(i),r&&i.setPixelRatio(Math.min(1.5,window.devicePixelRatio||1)),i.setSize(innerWidth,innerHeight),i.shadowMap.enabled=!0,i.shadowMap.type=1,document.body.appendChild(i.domElement);let a=Zl(`inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;z-index:30;background:radial-gradient(circle at 50% 40%,#e7c79c,#b98e5e)`),o=document.createElement(`div`);o.style.cssText=`font:800 clamp(38px,9vw,64px) system-ui,sans-serif;letter-spacing:1px;text-shadow:0 4px 18px #0006`,o.textContent=`Boju Boju`;let s=document.createElement(`div`);s.style.cssText=`width:min(300px,70vw);height:12px;border-radius:6px;background:#00000033;overflow:hidden`;let c=document.createElement(`div`);c.style.cssText=`height:100%;width:0;background:#d8fd71;border-radius:6px;transition:width .15s`,s.append(c);let l=document.createElement(`div`);l.style.cssText=`font:600 14px system-ui,sans-serif;opacity:.9`,l.textContent=`Loading the compound…`,a.append(o,s,l);let u=[`amb_market`,`amb_generator`,`sfx_rooster_01`,`sfx_paint`,`jingle_win`,`jingle_caught`,`chant_intro`,`chant_ask`,`chant_not_yet`,`chant_open`,`chant_hunt`,`caught`,`amb_rain`,...ua,...da,...ha,...la,...fa,...pa],d=0,f=Fc(),p=Lc(f),h=p+u.length,g=()=>{d++,c.style.width=`${Math.round(d/h*100)}%`,l.textContent=d<p?`Loading ${Nc.find(e=>e.id===f)?.name.toLowerCase()??`the level`}…`:`Warming up the drums…`},_=new w,[v,y]=await Promise.all([Rc(f,g),e.identity(),Z.prefetch(u,g)]).then(([e,t])=>[e,t]),b=y;_.add(v.group);let x=Mc(_,r?1024:2048);ka(v.ground);let S={...Xl,seekerStart:v.seekerStart,lobbyPos:v.lobbyPos},C=v.spawn,T=new Y(S.lobbyPos.x,.1,S.lobbyPos.z),E=e=>{let t=qe(e.style);return t.group.traverse(e=>{e instanceof It&&(e.castShadow=!0)}),t},D=E(b);_.add(D.group);let O=C.clone(),k=new It(new Qe(.85,.95,.1,28),new m({color:`#4a2f1d`}));k.position.set(T.x,.05,T.z),k.receiveShadow=!0,k.castShadow=!0,_.add(k);let A=new gl(innerWidth/innerHeight);A.snapTo(O);let ee=new Jo(i.domElement),j=new ko(_),te=new Vl(e=>{e>=1&&x.setShadowSize(512),e>=2&&i.setPixelRatio(1),e>=3&&(j.dust.pool.points.visible=!1)}),M=new Kc(v.colliders,5,{...zc,area:v.chickenArea,count:v.chickenCount}),N=new Ba(_),ne=Ua(v.gate);_.add(ne.group),_.add(M.group);let P=null,re=r||n(`buttons`),F=new ul({level:v,player:D,fx:j,camera:A.camera,scene:_,input:ee,pos:O,touch:re,hunt:!1,eye:()=>P?.eye??null}),ie={colliders:v.colliders,bounds:v.bounds,spots:v.hidingSpots.map(e=>({id:e.id,position:e.position,facing:e.facing})),blocked:(e,t)=>F.probe.blocked(e,t),prints:N},I=null;P=new Pl(ie,j,_),P.blind=!0,P.reset(S.seekerStart),n(`ai`)&&P.setDebug(!0),F.show(!1);let L=Zl(`left:8px;bottom:8px;font:11px monospace;background:#0008;padding:4px 6px;border-radius:4px;display:none;pointer-events:none`),ae=Zl(`left:74px;top:214px;font:11px/1.45 monospace;background:#000b;padding:6px 8px;border-radius:6px;display:none;pointer-events:none;white-space:pre`);Zl(`left:8px;top:250px;max-width:340px;max-height:calc(100% - 300px);overflow:auto;background:#000b;padding:8px 10px;border-radius:6px;font:11px/1.5 monospace;display:none`);let oe=n(`stats`)||t.get(`perf`)===`1`;oe&&(L.style.display=`block`),addEventListener(`resize`,()=>{i.setSize(innerWidth,innerHeight),A.setAspect(innerWidth/innerHeight),B===`lobby`&&Fe()});let R=ml(),se=fl(),ce=-9,le=e=>()=>{if(performance.now()-ce<3e3)return;ce=performance.now();let t=e.position;Z.playOnce(`sfx_spotted_01`,{volume:1,rate:e.scale<1?1.1:.85,spatial:{position:{x:t.x,y:1.6*e.scale,z:t.z},refDistance:3,maxDistance:26,rolloff:1.2}})};P&&(P.onSpotted=le(P),P.onSpinTelegraph=()=>{Z.drumRoll(jl.spinTelegraph),R.popup(`SPIN SWEEP! Get out of the ring!`,`#ffb347`,1.6)});let z={..._l,prepSeconds:_l.prepSeconds,huntSeconds:_l.huntSeconds},B=`lobby`,ue=!1,V=1,H=Rl(1),de=new Il(_),fe=0,pe=0,me=0,he=0,ge=null,_e=0,ve=0,ye=0,be=()=>P?I&&I.group.visible?[P,I]:[P]:[],U=yl(),xe=new Cl(z.camoHoldSeconds),Se=0,Ce=0,W=0,we=0,Te=1,Ee=-1,De=!1,G=0,Oe=0,ke=0,K=null,q=null,Ae=``,je=Promise.resolve(),Me=!1,J={position:O,speed:0,landed:!1,camo:0,pose:null},Ne=async()=>{K=await e.board(),q=await e.best()},Pe=new ql({play:()=>void Be(),again:()=>void Be(),lobby:()=>Le(),resume:()=>nt(!1),quit:()=>{nt(!1),tt()},signIn:()=>{let t=e.signInUrl();t&&(location.href=t)}});document.addEventListener(`click`,e=>{let t=e.target?.closest(`button`);if(!t||!(B===`lobby`||B===`results`||ue))return;let n=t.textContent?.trim().toLowerCase()??``,r=/^(play|again|play again)/.test(n)?`sfx_ui_confirm_01`:/^(quit|back|lobby|resume)/.test(n)?`sfx_ui_back_01`:`sfx_ui_click_01`;Z.unlock().then(()=>Z.playOnce(r,{volume:.5}))}),Pe.setLevels(Nc,f,e=>{Ic(e),location.reload()});function Fe(){Pe.showLobby(b,q,K,e.signInUrl()!==null&&!t.has(`guest`))}function Ie(){D.setHuntMode(!1),F.resetPaint(b.style.primaryColor,b.style.secondaryColor),F.setPaletteTop(8)}function Le(){B=`lobby`,ue=!1,Z.cancelChant(),Z.setSuspicion(0),se.hide(),R.show(!1),R.banner(null),F.show(!1),Pe.setCard(null),Ie(),N.clear(),Z.cancelDrumRoll(),it.vx=it.vz=it.vy=0,O.copy(C),Tt(Rl(1)),P&&(P.blind=!0,P.frustrated=!1,P.applyDifficulty(vl(1)),P.reset(S.seekerStart)),k.visible=!0,Oe=0,Ne().then(()=>B===`lobby`&&Fe()),Fe()}let Re=!1;function ze(){Re||(Re=!0,Z.preload([`amb_market`,`amb_generator`,`sfx_rooster_01`,`sfx_paint`,`jingle_win`,`jingle_caught`,...ua,...da,...ha,...la,...fa,...pa]).then(()=>{Z.loop(`amb_market`,{volume:.28*v.ambience.chatter});let e=v.generator;e&&v.ambience.generator&&Z.loop(`amb_generator`,{volume:.55,spatial:{position:{x:e.x,y:e.y,z:e.z},refDistance:2.5,maxDistance:32,rolloff:1.7}});let t=()=>{Z.playOnce(`sfx_rooster_01`,{volume:.3,distant:{gain:.6}}),window.setTimeout(t,12e3+Math.random()*18e3)};window.setTimeout(t,5e3+Math.random()*6e3);let n=()=>{Z.playOnce(la[Math.floor(Math.random()*la.length)],{volume:.5}),window.setTimeout(n,18e3+Math.random()*3e4)};window.setTimeout(n,9e3+Math.random()*9e3);let r=()=>{if(B===`prep`||B===`hunt`){let e=M.positions(),t=e[Math.floor(Math.random()*e.length)];t&&Z.playOnce(`sfx_hen_cluck_01`,{volume:.35,rate:.9+Math.random()*.25,spatial:{position:{x:t.x,y:.3,z:t.z},refDistance:2.5,maxDistance:22,rolloff:1.4}})}window.setTimeout(r,7e3+Math.random()*9e3)};window.setTimeout(r,4e3+Math.random()*4e3)}))}async function Be(){await Z.unlock(),ze(),V=1,U=yl(),xe.reset(),Ae=``,Me=!1,P?.patrol.reset(),Pe.hideAll(),Ve()}function Ve(){B=`prep`,k.visible=!1,Se=z.prepSeconds,Ee=-1,De=!1,Te=1,R.banner(null),se.hide(),it.vx=it.vz=it.vy=0,O.copy(C),ot=0,Ie(),F.setLegend(V<=z.teaching.rounds),V===z.teaching.rounds+1&&F.toast(`Controls card hidden. K shows it again.`),dt.t=0,dt.paint={at:-99,n:0},dt.pose={at:-99,n:0},dt.paintedAt=-1,dt.gate=!1,Tt(Rl(V)),P&&(P.memory.decay(),P.memory.stampRegulars(),P.memory.save(),P.applyDifficulty(Ct(V,!1)),P.frustrated=!1,P.blind=!0,P.reset(S.seekerStart),I&&H.second&&(I.applyDifficulty(Ct(V,!0)),I.frustrated=!1,I.blind=!0,I.reset({x:S.seekerStart.x,z:S.seekerStart.z+Ll.second.startOffsetZ,yaw:S.seekerStart.yaw}))),Pe.setCard(null),R.show(!0),F.show(!0),A.snapTo(O),H.title&&(R.banner(H.title,H.nepa?`#05081acc`:`#1d3a5acc`),ve=3.2,R.popup(H.tagline,`#ffd68a`,5)),Z.startChant({timeoutMs:(z.prepSeconds+6)*1e3,onLine:(e,t)=>se.sing(e,t),onPhase:e=>{e===`hunt`&&B===`prep`&&Ue()}}).then(e=>{e!==`cancelled`&&B===`prep`&&Ee<0&&(Ee=0)})}function He(e){if(!(B!==`prep`||Ee>=0)){if(e){let e=Math.floor(Se)*z.readyBonusPerSecond;bl(U,`ready`,e),e>0&&R.popup(`+${e} Ready early`,`#d8fd71`)}Ee=z.chantTimeoutSeconds,Z.unlocked&&Z.chantState!==`idle`?Z.chantReady():Ee=.5}}function Ue(){if(B===`prep`){B=`hunt`,te.begin(),Ce=z.huntSeconds,Ee=-1,Ke=Je=0,xe.beginHunt(),ut.x=O.x,ut.z=O.z,ut.t=0,We.survival=We.nearMiss=Ge.survival=Ge.nearMiss=0,lt=!1,D.setHuntMode(!0),Pe.setCard(b),F.setPaletteTop(72);for(let e of be())e.blind=!1,e.reset()}}let We={survival:0,nearMiss:0},Ge={survival:0,nearMiss:0},Ke=0,Je=0;function Ye(e=!1){let t=z.score.popupEvery;We.survival>=1&&(e||Ge.survival>=t.survival)&&(R.popup(`+${Math.round(We.survival)} Survival`,`#d8fd71`),We.survival=Ge.survival=0),We.nearMiss>=1&&(e||Ge.nearMiss>=t.nearMiss||!be().some(e=>e.nearMiss))&&(R.popup(`+${Math.round(We.nearMiss)} NEAR MISS!`,`#ffb347`),We.nearMiss=Ge.nearMiss=0)}function Xe(e=!1){B=`cleared`,te.stop(),W=z.clearedSeconds,G=0,U.rounds++;let t=Je>0?Ke/Je:0,n=Math.round(t*z.score.camoBonusPerPoint);bl(U,`camo`,n),Ye(!0),n>0&&R.popup(`+${n} Camo bonus (${Math.round(t)}% average)`,`#7fd6ff`,2.4),!e&&P&&ut.t>=z.regulars.stillSeconds&&P.memory.won(ut.x,ut.z)&&R.popup(`The masquerade has learned this hiding place`,`#ff9d6d`,4.5),$e(),P?.memory.save(),R.banner(e?`YOU MADE IT HOME!`:`ROUND ${V} CLEARED!`,`#1c7a3a55`),j.caughtBurst(new Y(O.x,O.y+1.4,O.z),S.celebrateColors,90),Z.playOnce(`jingle_win`,{volume:.5}),Z.setSuspicion(0),Z.cancelDrumRoll();for(let e of be())e.frustrated=!0;F.clearPose()}function Ze(){if(B!==`hunt`)return;let e=z.score.runHomeBonus+Math.floor(Ce)*z.score.runHomeBonusPerSecondLeft;bl(U,`runHome`,e),U.ranHome++,R.popup(`RUN HOME!  +${e}`,`#6dff9a`,2.8),Xe(!0)}function $e(){let t={...U},n=je.then(async()=>{let n=await e.submit(t);return n.improved&&(Me=!0),n}).catch(()=>null);return je=n,n}function et(){B===`hunt`&&(B=`dying`,te.stop(),Z.cancelDrumRoll(),we=z.slowMoSeconds,Te=z.slowMoScale,De=!1,Z.unlock().then(async()=>{let e=await Z.playOnce(`caught`,{volume:1});se.sing(`caught`,e?.duration??.9)}))}function tt(){if(B===`results`)return;B=`results`,Te=1,ue=!1,Z.cancelChant(),Z.setSuspicion(0),se.hide(),te.stop(),R.show(!1),R.banner(null),F.show(!1),Pe.setCard(null),Ie(),U.hiddenSeconds=Math.round(U.hiddenSeconds),U.bestCamo=Math.round(U.bestCamo);for(let e of Object.keys(U.parts))U.parts[e]=Math.round(U.parts[e]);U.score=Object.values(U.parts).reduce((e,t)=>e+t,0),Z.cancelDrumRoll();let t=Sl(U);Z.playOnce(`jingle_caught`,{volume:.75}),(async()=>{let n=await $e();await Ne(),Ae=n?n.saved&&!n.improved&&Me?n.message.replace(/^Not your best this time\./,`Saved.`):n.message:``,B===`results`&&Pe.showResults(U,t,Ae,K,b.id,!b.signedIn&&e.signInUrl()!==null)})(),Pe.showResults(U,t,``,K,b.id,!b.signedIn&&e.signInUrl()!==null)}function nt(e){e!==ue&&(!e||B!==`lobby`&&B!==`results`)&&(ue=e,e?te.stop():B===`hunt`&&te.begin(),Pe.showPause(e),e?(Z.setSuspicion(0),Z.suspend()):Z.resume())}async function rt(){let t=await e.refresh();if(!t)return;let n=JSON.stringify(t.style)!==JSON.stringify(b.style)||t.id!==b.id||t.name!==b.name||t.signedIn!==b.signedIn||t.face!==b.face;b=t,n&&(_.remove(D.group),D.dispose(),D=E(b),_.add(D.group),F.setPlayer(D),D.play(`idle`,.01),at=`idle`,B===`lobby`?(Ne().then(()=>B===`lobby`&&Fe()),Fe()):(B===`prep`||B===`hunt`)&&(Ie(),B===`hunt`&&(D.setHuntMode(!0),Pe.setCard(b))))}addEventListener(`focus`,()=>void rt()),addEventListener(`keydown`,e=>{if(e.code===`Enter`&&B===`prep`&&!ue&&He(!0),e.code===`Escape`){if(F.escUsed){F.escUsed=!1;return}(B===`prep`||B===`hunt`||B===`cleared`||B===`dying`)&&nt(!ue)}}),document.addEventListener(`visibilitychange`,()=>{document.hidden?nt(!0):rt()}),R.onReady=()=>He(!0);let it=new Yo(O),at=`idle`;D.play(`idle`,.01);let ot=0,st=!0,lt=!1,ut={x:0,z:0,t:0},dt={t:0,paint:{at:-99,n:0},pose:{at:-99,n:0},paintedAt:-1,gate:!1};function ft(e,t,n,r){let i=z.teaching;t||e.n>=i.hintMax||dt.t<n+i.hintDelay||dt.t-e.at<i.hintRepeat||(e.at=dt.t,e.n++,R.popup(r,`#ffd68a`,6))}let pt=(()=>{try{return localStorage.getItem(`boju.runHomeHint`)===`1`}catch{return!1}})(),mt=new Pa(`player`,(e,t,n)=>{n&&Aa(e,t)&&N.add(e,t,ot)}),ht=new Pa(`seeker`),gt=0,_t=0,vt=e=>{e.onCatchStart=et,e.onCaught=()=>{j.caughtBurst(new Y(O.x,O.y+1.2,O.z)),De=!0}};P&&vt(P);let yt=new Pa(`seeker`,void 0,1.25),bt=0,xt=0;function Ct(e,t){let n={...vl(e,z)},r=Ll,i=v.seekerTuning;n.patrolSpeed*=i.speed,n.investigateSpeed*=i.speed,n.checkSpeed*=i.speed,n.visionFovDeg*=i.fov,n.visionRange*=i.range,H.nepa&&(n.visionFovDeg=Math.min(n.visionFovDeg,r.nepa.visionFovDeg),n.visionRange=Math.min(n.visionRange,r.nepa.visionRange)),t&&(n.patrolSpeed*=r.second.speedMul,n.investigateSpeed*=r.second.speedMul,n.checkSpeed*=r.second.speedMul,n.visionFovDeg*=r.second.fovMul);let a=e<=z.teaching.rounds&&!t?z.teaching:null;a&&(n.patrolSpeed*=a.speedMul,n.investigateSpeed*=a.speedMul,n.checkSpeed*=a.speedMul,n.rateMax*=a.rateMul);let o=i.speed*(t?r.second.speedMul:1)*(a?.speedMul??1),s=t||a&&!a.spin?[1e9,1e9]:jl.spinInterval;return{...n,chaseSpeed:jl.chaseSpeed*o,trailSpeed:jl.trailSpeed*o,spinInterval:s}}function wt(){if(I||!P)return;let e=Ll.second;I=new Pl(ie,j,_,{...jl,radius:e.radius,spinInterval:[1e9,1e9]},{share:P,scale:e.scale,quiet:!0}),I.onSpotted=le(I),vt(I),I.blind=!0,I.reset({x:S.seekerStart.x,z:S.seekerStart.z+e.startOffsetZ,yaw:S.seekerStart.yaw})}function Tt(e){let t=H.nepa;H=e,e.second?(wt(),I?.setPresent(!0)):I?.setPresent(!1),P&&(P.setLantern(e.nepa),P.closeSense=e.nepa?Ll.nepa.senseRadius:0),pe=+!!e.nepa,he=+!!e.rain,_e=Ll.rain.thunder[0]+Math.random()*(Ll.rain.thunder[1]-Ll.rain.thunder[0]),e.nepa&&!t&&Z.unlock().then(()=>Z.playOnce(`sfx_power_cut`,{volume:.8})),e.rain&&!ge?(ge=void 0,Z.unlock().then(()=>Z.loop(`amb_rain`,{volume:.55,fadeIn:2.5})).then(e=>ge=e)):!e.rain&&ge&&(ge.stop(2),ge=null)}let Et=-1,Dt=-1;function Ot(e){fe+=(pe-fe)*Math.min(1,e*2.2),me+=(he-me)*Math.min(1,e*1.2),(Math.abs(fe-Et)>.003||Math.abs(me-Dt)>.003)&&(Et=fe,Dt=me,x.setMood(fe,me)),de.enabled=me>.02,ye+=e,de.update(e,O,ye),ve>0&&(ve-=e,ve<=0&&B!==`cleared`&&R.banner(null)),B===`hunt`&&H.rain&&(F.fadePaint(b.style.primaryColor,b.style.secondaryColor,1-Math.exp(-e/Ll.rain.fadeTau),Ll.rain.refresh),_e-=e,_e<=0&&(_e=Ll.rain.thunder[0]+Math.random()*(Ll.rain.thunder[1]-Ll.rain.thunder[0]),Z.playOnce(`sfx_thunder_01`,{volume:.5})))}let kt=()=>B===`prep`?`HIDE! THE MASQUERADE IS COUNTING`:B===`hunt`?`THE HUNT IS ON${H.title?` · ${H.title}`:``}`:B===`cleared`?`ROUND CLEARED`:B===`dying`?`CAUGHT`:``;function At(e){if(B===`lobby`||B===`results`){B===`lobby`?(Oe+=e*S.lobbyTurnRate,ke+=e,D.group.position.copy(T),D.group.rotation.y=Oe,D.play(`idle`,.3),D.update(e)):(D.group.position.copy(O),D.group.rotation.y=ot,D.update(e));for(let t of be())t.update(e,{...J,camo:100,speed:0});return M.update(e,[]),{speed:0}}let t=B===`dying`||B===`cleared`?{x:0,y:0,run:!1}:ee.read();B===`cleared`&&(G+=e,G>=S.hopInterval&&(G=0,t={...t,jump:!0})),it.radius=F.pose===`wall_flat`?.2:Po;let n=it.update(t,e,v.colliders,v.bounds),r=1-Math.exp(-e*16);n.heading!==null&&(ot+=Math.atan2(Math.sin(n.heading-ot),Math.cos(n.heading-ot))*r),mt.advance(e,O.x,O.z,n.speed,n.grounded);let i=!n.grounded,a=n.grounded&&!st;st=n.grounded,a&&B!==`cleared`&&Z.playOnce(ha[Math.floor(Math.random()*ha.length)],{volume:.35});let o=n.speed>.35||i,s=F.update(e,{speed:o?Math.max(n.speed,i?Mo:0):0,yaw:ot});s.yaw!==null&&(ot+=Math.atan2(Math.sin(s.yaw-ot),Math.cos(s.yaw-ot))*r);let c=i?`jump`:n.speed>.35?n.speed>3.6?`run`:`walk`:s.state;c!==at&&(at=c,D.play(at,at===`jump`?.08:.2)),D.animator.speed=at===`walk`?Math.min(1.35,Math.max(.5,n.speed/Mo)):at===`run`?Math.min(1.25,n.speed/No):1,D.group.position.copy(O),D.group.rotation.y=ot,D.update(e),P&&(J.speed=o?n.speed:0,J.landed=a,J.camo=F.camo.breakdown.total,J.pose=F.pose,P.update(e,J),e>0&&ht.advance(e,P.position.x,P.position.z,Math.hypot(P.position.x-gt,P.position.z-_t)/e),gt=P.position.x,_t=P.position.z,I&&I.group.visible&&(I.update(e,J),e>0&&yt.advance(e,I.position.x,I.position.z,Math.hypot(I.position.x-bt,I.position.z-xt)/e),bt=I.position.x,xt=I.position.z,I.suspicion>P.suspicion&&Z.setSuspicion(I.suspicion)));let l=M.update(e,[{x:O.x,z:O.z,running:n.speed>3.6},...P?[{x:P.position.x,z:P.position.z,running:!1}]:[]],{active:B===`hunt`&&!!P&&!P.blind&&!P.frustrated,player:O});for(let e of l)Z.squawk(e.x,e.z),e.first&&be().find(t=>Math.hypot(t.position.x-e.x,t.position.z-e.z)<=zc.hearRange&&t.glance(e.x,e.z))&&R.popup(`A chicken is giving you away!`,`#ffb347`,2);if(N.update(e),B===`prep`){if(Se-=e,V<=z.teaching.rounds&&Ee<0){dt.t+=e;let t=F.painted.top||F.painted.bottom;t&&dt.paintedAt<0&&(dt.paintedAt=dt.t),ft(dt.paint,t,0,re?`Tap Eyedropper, then tap the wall behind you to paint your clothes like it`:`Press E, aim at the wall behind you and click: your clothes take its colour`),ft(dt.pose,!t||F.pose===`wall_flat`,dt.paintedAt,re?`Now tap the Wall pose, with your back to the wall`:`Now press 3 (wall_flat), with your back to the wall`)}Se<=0&&He(!1),Ee>0?(Ee-=e,Ee<=0&&(Z.cancelChant(),Ue())):Ee===0&&(Z.cancelChant(),Ue())}else if(B===`hunt`){Ce-=e,U.hiddenSeconds+=e;let t=F.camo.breakdown.total;Math.hypot(O.x-ut.x,O.z-ut.z)>z.regulars.stillRadius?(ut.x=O.x,ut.z=O.z,ut.t=0):ut.t+=e,xe.add(t,e),U.bestCamo=xe.best,Ke+=t*e,Je+=e;let n=z.score;bl(U,`survival`,e*n.survivalPerSecond),We.survival+=e*n.survivalPerSecond,Ge.survival+=e,be().some(e=>e.nearMiss)&&(bl(U,`nearMiss`,e*n.nearMissPerSecond),We.nearMiss+=e*n.nearMissPerSecond,Ge.nearMiss+=e),Ye();let r=!!P&&!P.blind&&be().every(e=>Math.hypot(e.position.x-v.gate.x,e.position.z-v.gate.z)>z.runHome.seekerDistance),i=V<=z.teaching.rounds;if(r&&!lt&&(!pt||i&&!dt.gate)){pt=!0,dt.gate=!0;try{localStorage.setItem(`boju.runHomeHint`,`1`)}catch{}R.popup(i?`The gate glows: run home!`:`Run home! The gate is open: touch it now to end the round.`,`#6dff9a`,5)}lt=r,r&&O.x>=z.runHome.reachX&&Math.abs(O.z-v.gate.z)<=v.gate.halfWidth?Ze():Ce<=0&&Xe()}else B===`cleared`&&(W-=e,W<=0&&(V++,Ve()));return n}let jt=0;function Mt(e){if(ue)return;let t=Math.min(.05,e);B===`dying`&&(we-=t,we<=0&&(Te=1),we<=0&&De||we<-3)?tt():(At(t*Te),Ot(t),jt+=t,ne.update(jt,lt&&B===`hunt`,B===`prep`||B===`hunt`),B!==`lobby`&&B!==`results`&&R.update({label:kt(),seconds:B===`prep`?Se:B===`hunt`?Ce:0,round:V,ready:B===`prep`&&Ee<0?{bonus:Math.floor(Se)*z.readyBonusPerSecond}:null,hiders:1,caught:+(B===`dying`),points:Math.round(U.score)}))}a.remove(),Le(),b.source===`local guest`&&St()&&(window.setTimeout(()=>void rt(),3e3),window.setTimeout(()=>void rt(),8e3));let Nt=performance.now(),Pt=0,Ft=0,Lt=0;i.setAnimationLoop(e=>{let t=Math.max(0,(e-Nt)/1e3);Nt=e,Mt(t),B===`hunt`&&!ue&&te.frame(t);let n=ue?0:Math.min(.05,t);if(P?.debug&&(ae.textContent=P.describe(J)),ae.style.display=P?.debug?`block`:`none`,j.update(n*Te,A.camera,i),B===`lobby`){let e=S.lobbyCamera,t=innerWidth<innerHeight;A.camera.position.set(T.x+(t?.4:e.x)+Math.sin(ke*.25)*.25,t?1.4:e.y,T.z+(t?5.4:e.z)),A.camera.lookAt(T.x+(t?0:e.lookX),t?-.05:e.lookY,T.z),x.follow(T)}else if(B===`results`){let e=P?.position??O;A.camera.position.set(e.x-3.2,3.4,e.z+6.4),A.camera.lookAt(e.x,1.4,e.z),x.follow(e)}else A.update(n,O,it.vx,it.vz),A.fade(v.fadeGroups,O,n),x.follow(O),Z.setListener(O.x,1.2,O.z,0,0,-1);i.render(_,A.camera),Pt++,Ft+=t,Ft>=.5&&(Lt=Pt/Ft,Pt=Ft=0,oe&&(L.textContent=`${Lt.toFixed(0)} fps · ${i.info.render.calls} draw calls (incl. shadow pass) · ${(i.info.render.triangles/1e3).toFixed(0)}k tris · quality tier ${te.tier} (${Bl[te.tier]})${te.lastFps?` · last window ${te.lastFps.toFixed(0)} fps`:``}`))})}export{Xl as GAME_CONFIG,qo as _,$s as a,sc as c,tc as d,Q as f,jo as g,Ao as h,jc as i,pc as l,Po as m,Ac as n,oc as o,mc as p,Mc as r,cc as s,Ql as startGame,Jl as t,dc as u};