import{$n as e,A as t,An as n,At as r,B as i,Bn as a,Bt as o,C as s,Cr as c,Ct as l,D as u,Dn as d,Dr as f,Dt as p,E as m,Er as h,Et as g,F as _,Fn as v,Ft as y,G as b,Gn as x,H as S,Hn as C,Ht as w,I as T,It as E,J as D,Jn as O,Kn as k,Kt as ee,L as A,Lt as j,M,Mn as N,Mt as P,N as te,Nn as F,Nt as ne,O as I,On as re,Ot as L,P as R,Pn as ie,Pt as ae,Q as oe,Qn as z,R as se,Rt as ce,S as le,Sr as ue,St as B,T as de,Tr as fe,Tt as pe,U as me,Un as he,Ut as ge,V as _e,Vn as ve,Vt as ye,W as be,Wt as xe,X as Se,Xn as Ce,Xt as we,Y as Te,Yn as V,Z as Ee,Zn as De,Zt as Oe,_ as ke,_r as H,_t as Ae,a as U,at as W,br as G,bt as je,c as Me,cr as Ne,ct as K,d as Pe,dr as q,dt as Fe,er as Ie,et as Le,fr as Re,ft as ze,g as Be,gr as Ve,gt as He,h as Ue,hr as We,ht as Ge,i as Ke,ir as qe,it as Je,j as Ye,jt as Xe,k as Ze,kn as Qe,kt as $e,l as J,lr as et,lt as tt,m as nt,mr as rt,mt as it,n as at,nr as ot,nt as st,o as ct,or as lt,ot as ut,p as dt,pr as ft,pt,q as mt,qn as ht,rt as gt,s as _t,sr as vt,st as yt,t as bt,tr as xt,tt as St,u as Ct,ur as wt,ut as Tt,v as Et,vr as Dt,vt as Ot,w as kt,wr as At,wt as jt,x as Mt,xr as Nt,xt as Pt,y as Ft,yr as It,yt as Lt,z as Rt,zt}from"./startng-CbZMv0-D.js";function Bt(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Vt(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Y={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},X={common:{diffuse:{value:new s(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Lt}},envmap:{envMap:{value:null},envMapRotation:{value:new Lt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Lt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Lt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Lt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Lt},normalScale:{value:new wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Lt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Lt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Lt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Lt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new s(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new q},probesMax:{value:new q},probesResolution:{value:new q}},points:{diffuse:{value:new s(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0},uvTransform:{value:new Lt}},sprite:{diffuse:{value:new s(16777215)},opacity:{value:1},center:{value:new wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Lt},alphaMap:{value:null},alphaMapTransform:{value:new Lt},alphaTest:{value:0}}},Ht={basic:{uniforms:At([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.fog]),vertexShader:Y.meshbasic_vert,fragmentShader:Y.meshbasic_frag},lambert:{uniforms:At([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new s(0)},envMapIntensity:{value:1}}]),vertexShader:Y.meshlambert_vert,fragmentShader:Y.meshlambert_frag},phong:{uniforms:At([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new s(0)},specular:{value:new s(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Y.meshphong_vert,fragmentShader:Y.meshphong_frag},standard:{uniforms:At([X.common,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.roughnessmap,X.metalnessmap,X.fog,X.lights,{emissive:{value:new s(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Y.meshphysical_vert,fragmentShader:Y.meshphysical_frag},toon:{uniforms:At([X.common,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.gradientmap,X.fog,X.lights,{emissive:{value:new s(0)}}]),vertexShader:Y.meshtoon_vert,fragmentShader:Y.meshtoon_frag},matcap:{uniforms:At([X.common,X.bumpmap,X.normalmap,X.displacementmap,X.fog,{matcap:{value:null}}]),vertexShader:Y.meshmatcap_vert,fragmentShader:Y.meshmatcap_frag},points:{uniforms:At([X.points,X.fog]),vertexShader:Y.points_vert,fragmentShader:Y.points_frag},dashed:{uniforms:At([X.common,X.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Y.linedashed_vert,fragmentShader:Y.linedashed_frag},depth:{uniforms:At([X.common,X.displacementmap]),vertexShader:Y.depth_vert,fragmentShader:Y.depth_frag},normal:{uniforms:At([X.common,X.bumpmap,X.normalmap,X.displacementmap,{opacity:{value:1}}]),vertexShader:Y.meshnormal_vert,fragmentShader:Y.meshnormal_frag},sprite:{uniforms:At([X.sprite,X.fog]),vertexShader:Y.sprite_vert,fragmentShader:Y.sprite_frag},background:{uniforms:{uvTransform:{value:new Lt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Y.background_vert,fragmentShader:Y.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Lt}},vertexShader:Y.backgroundCube_vert,fragmentShader:Y.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Y.cube_vert,fragmentShader:Y.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Y.equirect_vert,fragmentShader:Y.equirect_frag},distance:{uniforms:At([X.common,X.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Y.distance_vert,fragmentShader:Y.distance_frag},shadow:{uniforms:At([X.lights,X.fog,{color:{value:new s(0)},opacity:{value:1}}]),vertexShader:Y.shadow_vert,fragmentShader:Y.shadow_frag}};Ht.physical={uniforms:At([Ht.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Lt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Lt},clearcoatNormalScale:{value:new wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Lt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Lt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Lt},sheen:{value:0},sheenColor:{value:new s(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Lt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Lt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Lt},transmissionSamplerSize:{value:new wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Lt},attenuationDistance:{value:0},attenuationColor:{value:new s(0)},specularColor:{value:new s(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Lt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Lt},anisotropyVector:{value:new wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Lt}}]),vertexShader:Y.meshphysical_vert,fragmentShader:Y.meshphysical_frag};var Ut={r:0,b:0,g:0},Wt=new je,Gt=new Lt;Gt.set(-1,0,0,0,1,0,0,0,1);function Kt(e,t,n,r,i,a){let o=new s(0),c=i===!0?0:1,l,u,d=null,f=0,p=null;function m(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function h(t){let r=!1,i=m(t);i===null?_(o,c):i&&i.isColor&&(_(i,1),r=!0);let s=e.xr.getEnvironmentBlendMode();s===`additive`?n.buffers.color.setClear(0,0,0,1,a):s===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function g(t,n){let i=m(n);i&&(i.isCubeTexture||i.mapping===306)?(u===void 0&&(u=new Pt(new ke(1,1,1),new he({name:`BackgroundCubeMaterial`,uniforms:H(Ht.backgroundCube.uniforms),vertexShader:Ht.backgroundCube.vertexShader,fragmentShader:Ht.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute(`normal`),u.geometry.deleteAttribute(`uv`),u.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=i,u.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Wt.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(Gt),u.material.toneMapped=kt.getTransfer(i.colorSpace)!==ve,(d!==i||f!==i.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,d=i,f=i.version,p=e.toneMapping),u.layers.enableAll(),t.unshift(u,u.geometry,u.material,0,0,null)):i&&i.isTexture&&(l===void 0&&(l=new Pt(new ce(2,2),new he({name:`BackgroundMaterial`,uniforms:H(Ht.background.uniforms),vertexShader:Ht.background.vertexShader,fragmentShader:Ht.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=i,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.toneMapped=kt.getTransfer(i.colorSpace)!==ve,i.matrixAutoUpdate===!0&&i.updateMatrix(),l.material.uniforms.uvTransform.value.copy(i.matrix),(d!==i||f!==i.version||p!==e.toneMapping)&&(l.material.needsUpdate=!0,d=i,f=i.version,p=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null))}function _(t,r){t.getRGB(Ut,ue(e)),n.buffers.color.setClear(Ut.r,Ut.g,Ut.b,r,a)}function v(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),c=t,_(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(e){c=e,_(o,c)},render:h,addToRenderList:g,dispose:v}}function qt(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Jt(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Yt(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(h(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&h(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_TEXTURE_SIZE),_=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),v=e.getParameter(e.MAX_VERTEX_ATTRIBS),y=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),b=e.getParameter(e.MAX_VARYING_VECTORS),x=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),S=e.getParameter(e.MAX_SAMPLES),C=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:g,maxCubemapSize:_,maxAttributes:v,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:x,maxSamples:S,samples:C}}function Xt(e){let t=this,n=null,r=0,i=!1,a=!1,o=new j,s=new Lt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Zt=4,Qt=6,$t=20,en=256,tn=new y,nn=new s,rn=null,an=0,on=0,sn=!1,cn=new q,ln=new q,un=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=cn}=i;rn=this._renderer.getRenderTarget(),an=this._renderer.getActiveCubeFace(),on=this._renderer.getActiveMipmapLevel(),sn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_n(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gn(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(rn,an,on),this._renderer.xr.enabled=sn,e.scissorTest=!1,pn(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),rn=this._renderer.getRenderTarget(),an=this._renderer.getActiveCubeFace(),on=this._renderer.getActiveMipmapLevel(),sn=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Tt,minFilter:Tt,generateMipmaps:!1,type:D,format:we,colorSpace:pt,depthBuffer:!1},r=fn(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fn(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=dn(r)),this._blurMaterial=hn(r,e,t),this._ggxMaterial=mn(r,e,t)}return r}_compileMaterial(e){let t=new Pt(new Ft,e);this._renderer.compile(t,tn)}_sceneToCubeUV(e,t,n,r,i){let a=new E(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(nn),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Pt(new ke,new B({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(nn),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;pn(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=_n()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gn());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;pn(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,tn)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Zt?n-d+Zt:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,pn(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,tn),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,pn(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,tn)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];pn(t,3*l*(r>this._lodMax-Zt?r-this._lodMax+Zt:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,tn)}};function dn(e){let t=[],n=[],r=e,i=e-Zt+1+Qt;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?ln.set(1,r,n):e===1?ln.set(-n,1,-r):e===2?ln.set(-n,r,1):e===3?ln.set(-1,r,-n):e===4?ln.set(-n,-1,r):ln.set(n,r,-1),ln.toArray(l,(e*6+t)*3)}}let u=new Ft;u.setAttribute(`position`,new Et(c,3)),u.setAttribute(`outputDirection`,new Et(l,3)),n.push(new Pt(u,null)),r>Zt&&r--}return{lodMeshes:n,sizeLods:t}}function fn(e,t,n){let r=new We(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function pn(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function mn(e,t,n){return new he({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:en,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:vn(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function hn(e,t,n){return new he({name:`SphericalGaussianBlur`,defines:{SAMPLES:$t,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:vn(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function gn(){return new he({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:vn(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function _n(){return new he({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function vn(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var yn=class extends We{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new I(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new ke(5,5,5),i=new he({name:`CubemapFromEquirect`,uniforms:H(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Pt(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=Tt),new m(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function bn(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new yn(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new un(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new un(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function xn(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&f(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Sn(t,n,r,i){let a={},o=new WeakMap;function s(e){let t=e.target;t.index!==null&&n.remove(t.index);for(let e in t.attributes)n.remove(t.attributes[e]);t.removeEventListener(`dispose`,s),delete a[t.id];let c=o.get(t);c&&(n.remove(c),o.delete(t)),i.releaseStatesOfGeometry(t),t.isInstancedBufferGeometry===!0&&delete t._maxInstanceCount,r.memory.geometries--}function c(e,t){return a[t.id]===!0||(t.addEventListener(`dispose`,s),a[t.id]=!0,r.memory.geometries++),t}function l(e){let r=e.attributes;for(let e in r)n.update(r[e],t.ARRAY_BUFFER)}function u(t){let r=[],i=t.index,a=t.attributes.position,s=0;if(a===void 0)return;if(i!==null){let e=i.array;s=i.version;for(let t=0,n=e.length;t<n;t+=3){let n=e[t+0],i=e[t+1],a=e[t+2];r.push(n,i,i,a,a,n)}}else{let e=a.array;s=a.version;for(let t=0,n=e.length/3-1;t<n;t+=3){let e=t+0,n=t+1,i=t+2;r.push(e,n,n,i,i,e)}}let c=new(a.count>=65535?Ie:e)(r,1);c.version=s;let l=o.get(t);l&&n.remove(l),o.set(t,c)}function d(e){let t=o.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&u(e)}else u(e);return o.get(e)}return{get:c,update:l,getWireframeAttribute:d}}function Cn(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function wn(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:G(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Tn(e,t,n){let r=new WeakMap,i=new Re;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Ye(h,p,m,u);g.type=me,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new wt(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function En(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Dn={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function On(e,t,n,r,i,a){let o=new We(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new Ft;l.setAttribute(`position`,new S([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new S([0,2,0,0,2,0],2));let u=new Qe({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Pt(l,u),f=new y(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],b=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,b=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new We(t,n,{type:D,depthBuffer:!1,stencilBuffer:!1}),c=new We(t,n,{type:D,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},kt.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Dn[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var kn=new Ce,An=new _(1,1),jn=new Ye,Mn=new t,Nn=new I,Pn=[],Fn=[],In=new Float32Array(16),Ln=new Float32Array(9),Rn=new Float32Array(4);function zn(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Pn[i];if(a===void 0&&(a=new Float32Array(i),Pn[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Bn(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Vn(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Hn(e,t){let n=Fn[t];n===void 0&&(n=new Int32Array(t),Fn[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Un(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Wn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Bn(n,t))return;e.uniform2fv(this.addr,t),Vn(n,t)}}function Gn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Bn(n,t))return;e.uniform3fv(this.addr,t),Vn(n,t)}}function Kn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Bn(n,t))return;e.uniform4fv(this.addr,t),Vn(n,t)}}function qn(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Bn(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Vn(n,t)}else{if(Bn(n,r))return;Rn.set(r),e.uniformMatrix2fv(this.addr,!1,Rn),Vn(n,r)}}function Jn(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Bn(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Vn(n,t)}else{if(Bn(n,r))return;Ln.set(r),e.uniformMatrix3fv(this.addr,!1,Ln),Vn(n,r)}}function Yn(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Bn(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Vn(n,t)}else{if(Bn(n,r))return;In.set(r),e.uniformMatrix4fv(this.addr,!1,In),Vn(n,r)}}function Xn(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Zn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Bn(n,t))return;e.uniform2iv(this.addr,t),Vn(n,t)}}function Qn(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Bn(n,t))return;e.uniform3iv(this.addr,t),Vn(n,t)}}function $n(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Bn(n,t))return;e.uniform4iv(this.addr,t),Vn(n,t)}}function er(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function tr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Bn(n,t))return;e.uniform2uiv(this.addr,t),Vn(n,t)}}function nr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Bn(n,t))return;e.uniform3uiv(this.addr,t),Vn(n,t)}}function rr(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Bn(n,t))return;e.uniform4uiv(this.addr,t),Vn(n,t)}}function ir(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(An.compareFunction=n.isReversedDepthBuffer()?518:515,a=An):a=kn,n.setTexture2D(t||a,i)}function ar(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Mn,i)}function or(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Nn,i)}function sr(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||jn,i)}function cr(e){switch(e){case 5126:return Un;case 35664:return Wn;case 35665:return Gn;case 35666:return Kn;case 35674:return qn;case 35675:return Jn;case 35676:return Yn;case 5124:case 35670:return Xn;case 35667:case 35671:return Zn;case 35668:case 35672:return Qn;case 35669:case 35673:return $n;case 5125:return er;case 36294:return tr;case 36295:return nr;case 36296:return rr;case 35678:case 36198:case 36298:case 36306:case 35682:return ir;case 35679:case 36299:case 36307:return ar;case 35680:case 36300:case 36308:case 36293:return or;case 36289:case 36303:case 36311:case 36292:return sr}}function lr(e,t){e.uniform1fv(this.addr,t)}function ur(e,t){let n=zn(t,this.size,2);e.uniform2fv(this.addr,n)}function dr(e,t){let n=zn(t,this.size,3);e.uniform3fv(this.addr,n)}function fr(e,t){let n=zn(t,this.size,4);e.uniform4fv(this.addr,n)}function pr(e,t){let n=zn(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function mr(e,t){let n=zn(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function hr(e,t){let n=zn(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function gr(e,t){e.uniform1iv(this.addr,t)}function _r(e,t){e.uniform2iv(this.addr,t)}function vr(e,t){e.uniform3iv(this.addr,t)}function yr(e,t){e.uniform4iv(this.addr,t)}function br(e,t){e.uniform1uiv(this.addr,t)}function xr(e,t){e.uniform2uiv(this.addr,t)}function Sr(e,t){e.uniform3uiv(this.addr,t)}function Cr(e,t){e.uniform4uiv(this.addr,t)}function wr(e,t,n){let r=this.cache,i=t.length,a=Hn(n,i);Bn(r,a)||(e.uniform1iv(this.addr,a),Vn(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?An:kn;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Tr(e,t,n){let r=this.cache,i=t.length,a=Hn(n,i);Bn(r,a)||(e.uniform1iv(this.addr,a),Vn(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Mn,a[e])}function Er(e,t,n){let r=this.cache,i=t.length,a=Hn(n,i);Bn(r,a)||(e.uniform1iv(this.addr,a),Vn(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Nn,a[e])}function Dr(e,t,n){let r=this.cache,i=t.length,a=Hn(n,i);Bn(r,a)||(e.uniform1iv(this.addr,a),Vn(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||jn,a[e])}function Or(e){switch(e){case 5126:return lr;case 35664:return ur;case 35665:return dr;case 35666:return fr;case 35674:return pr;case 35675:return mr;case 35676:return hr;case 5124:case 35670:return gr;case 35667:case 35671:return _r;case 35668:case 35672:return vr;case 35669:case 35673:return yr;case 5125:return br;case 36294:return xr;case 36295:return Sr;case 36296:return Cr;case 35678:case 36198:case 36298:case 36306:case 35682:return wr;case 35679:case 36299:case 36307:return Tr;case 35680:case 36300:case 36308:case 36293:return Er;case 36289:case 36303:case 36311:case 36292:return Dr}}var kr=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=cr(t.type)}},Ar=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Or(t.type)}},jr=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Mr=/(\w+)(\])?(\[|\.)?/g;function Nr(e,t){e.seq.push(t),e.map[t.id]=t}function Pr(e,t,n){let r=e.name,i=r.length;for(Mr.lastIndex=0;;){let a=Mr.exec(r),o=Mr.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Nr(n,l===void 0?new kr(s,e,t):new Ar(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new jr(s),Nr(n,e)),n=e}}}var Fr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Pr(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Ir(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Lr=37297,Rr=0;function zr(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Br=new Lt;function Vr(e){kt._getMatrix(Br,kt.workingColorSpace,e);let t=`mat3( ${Br.elements.map(e=>e.toFixed(4))} )`;switch(kt.getTransfer(e)){case it:return[t,`LinearTransferOETF`];case ve:return[t,`sRGBTransferOETF`];default:return h(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Hr(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+zr(e.getShaderSource(t),r)}return i}function Ur(e,t){let n=Vr(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Wr={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Gr(e,t){let n=Wr[t];return n===void 0?(h(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Kr=new q;function qr(){return kt.getLuminanceCoefficients(Kr),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Kr.x.toFixed(4)}, ${Kr.y.toFixed(4)}, ${Kr.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Jr(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Zr).join(`
`)}function Yr(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Xr(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Zr(e){return e!==``}function Qr(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function $r(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var ei=/^[ \t]*#include +<([\w\d./]+)>/gm;function ti(e){return e.replace(ei,ri)}var ni=new Map;function ri(e,t){let n=Y[t];if(n===void 0){let e=ni.get(t);if(e!==void 0)n=Y[e],h(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return ti(n)}var ii=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ai(e){return e.replace(ii,oi)}function oi(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function si(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}var ci={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function li(e){return ci[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var ui={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function di(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:ui[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var fi={302:`ENVMAP_MODE_REFRACTION`};function pi(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:fi[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var mi={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function hi(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:mi[e.combine]||`ENVMAP_BLENDING_NONE`}function gi(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function _i(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=li(n),l=di(n),u=pi(n),d=hi(n),f=gi(n),p=Jr(n),m=Yr(a),g=i.createProgram(),_,v,y=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Zr).join(`
`),_.length>0&&(_+=`
`),v=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Zr).join(`
`),v.length>0&&(v+=`
`)):(_=[si(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Zr).join(`
`),v=[si(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Y.tonemapping_pars_fragment,n.toneMapping===0?``:Gr(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Y.colorspace_pars_fragment,Ur(`linearToOutputTexel`,n.outputColorSpace),qr(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Zr).join(`
`)),o=ti(o),o=Qr(o,n),o=$r(o,n),s=ti(s),s=Qr(s,n),s=$r(s,n),o=ai(o),s=ai(s),n.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,_=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+_,v=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+v);let b=y+_+o,x=y+v+s,S=Ir(i,i.VERTEX_SHADER,b),C=Ir(i,i.FRAGMENT_SHADER,x);i.attachShader(g,S),i.attachShader(g,C),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(g,0,`position`):i.bindAttribLocation(g,0,n.index0AttributeName),i.linkProgram(g);function w(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(g)||``,r=i.getShaderInfoLog(S)||``,a=i.getShaderInfoLog(C)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,g,S,C);else{let e=Hr(i,S,`vertex`),n=Hr(i,C,`fragment`);G(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):h(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:_},fragmentShader:{log:c,prefix:v}})}i.deleteShader(S),i.deleteShader(C),T=new Fr(i,g),E=Xr(i,g)}let T;this.getUniforms=function(){return T===void 0&&w(this),T};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let D=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=i.getProgramParameter(g,Lr)),D},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Rr++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=S,this.fragmentShader=C,this}var vi=0,yi=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new bi(e),t.set(e,n)),n}},bi=class{constructor(e){this.id=vi++,this.code=e,this.usedTimes=0}};function xi(e){return e===1030||e===37490||e===36285}function Si(e,t,n,r,i,a){let o=new W,s=new yi,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function g(i,o,l,u,g,_){let v=u.fog,y=g.geometry,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,x=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,S=t.get(i.envMap||b,x),C=S&&S.mapping===306?S.image.height:null,w=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&h(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let T=y.morphAttributes.position||y.morphAttributes.normal||y.morphAttributes.color,E=T===void 0?0:T.length,D=0;y.morphAttributes.position!==void 0&&(D=1),y.morphAttributes.normal!==void 0&&(D=2),y.morphAttributes.color!==void 0&&(D=3);let O,k,ee,A;if(w){let e=Ht[w];O=e.vertexShader,k=e.fragmentShader}else{O=i.vertexShader,k=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),ee=e.id,A=t.id}let j=e.getRenderTarget(),M=e.state.buffers.depth.getReversed(),N=g.isInstancedMesh===!0,P=g.isBatchedMesh===!0,te=!!i.map,F=!!i.matcap,ne=!!S,I=!!i.aoMap,re=!!i.lightMap,L=!!i.bumpMap&&i.wireframe===!1,R=!!i.normalMap,ie=!!i.displacementMap,ae=!!i.emissiveMap,oe=!!i.metalnessMap,z=!!i.roughnessMap,se=i.anisotropy>0,ce=i.clearcoat>0,le=i.dispersion>0,ue=i.retroreflectivity>0,B=i.iridescence>0,de=i.sheen>0,fe=i.transmission>0,pe=se&&!!i.anisotropyMap,me=ce&&!!i.clearcoatMap,he=ce&&!!i.clearcoatNormalMap,ge=ce&&!!i.clearcoatRoughnessMap,_e=B&&!!i.iridescenceMap,ve=B&&!!i.iridescenceThicknessMap,ye=de&&!!i.sheenColorMap,be=de&&!!i.sheenRoughnessMap,xe=!!i.specularMap,Se=!!i.specularColorMap,Ce=!!i.specularIntensityMap,we=fe&&!!i.transmissionMap,Te=fe&&!!i.thicknessMap,V=!!i.gradientMap,Ee=!!i.alphaMap,De=i.alphaTest>0,Oe=!!i.alphaHash,ke=!!i.extensions,H=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(H=e.toneMapping);let Ae={shaderID:w,shaderType:i.type,shaderName:i.name,vertexShader:O,fragmentShader:k,defines:i.defines,customVertexShaderID:ee,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:P,batchingColor:P&&g._colorsTexture!==null,instancing:N,instancingColor:N&&g.instanceColor!==null,instancingMorph:N&&g.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:kt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:te,matcap:F,envMap:ne,envMapMode:ne&&S.mapping,envMapCubeUVHeight:C,aoMap:I,lightMap:re,bumpMap:L,normalMap:R,displacementMap:ie,emissiveMap:ae,normalMapObjectSpace:R&&i.normalMapType===1,normalMapTangentSpace:R&&i.normalMapType===0,packedNormalMap:R&&i.normalMapType===0&&xi(i.normalMap.format),metalnessMap:oe,roughnessMap:z,anisotropy:se,anisotropyMap:pe,clearcoat:ce,clearcoatMap:me,clearcoatNormalMap:he,clearcoatRoughnessMap:ge,dispersion:le,retroreflection:ue,iridescence:B,iridescenceMap:_e,iridescenceThicknessMap:ve,sheen:de,sheenColorMap:ye,sheenRoughnessMap:be,specularMap:xe,specularColorMap:Se,specularIntensityMap:Ce,transmission:fe,transmissionMap:we,thicknessMap:Te,gradientMap:V,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Ee,alphaTest:De,alphaHash:Oe,combine:i.combine,mapUv:te&&m(i.map.channel),aoMapUv:I&&m(i.aoMap.channel),lightMapUv:re&&m(i.lightMap.channel),bumpMapUv:L&&m(i.bumpMap.channel),normalMapUv:R&&m(i.normalMap.channel),displacementMapUv:ie&&m(i.displacementMap.channel),emissiveMapUv:ae&&m(i.emissiveMap.channel),metalnessMapUv:oe&&m(i.metalnessMap.channel),roughnessMapUv:z&&m(i.roughnessMap.channel),anisotropyMapUv:pe&&m(i.anisotropyMap.channel),clearcoatMapUv:me&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:he&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:_e&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:ve&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:ye&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:be&&m(i.sheenRoughnessMap.channel),specularMapUv:xe&&m(i.specularMap.channel),specularColorMapUv:Se&&m(i.specularColorMap.channel),specularIntensityMapUv:Ce&&m(i.specularIntensityMap.channel),transmissionMapUv:we&&m(i.transmissionMap.channel),thicknessMapUv:Te&&m(i.thicknessMap.channel),alphaMapUv:Ee&&m(i.alphaMap.channel),vertexTangents:!!y.attributes.tangent&&(R||se),vertexNormals:!!y.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!y.attributes.color&&y.attributes.color.itemSize===4,pointsUvs:g.isPoints===!0&&!!y.attributes.uv&&(te||Ee),fog:!!v,useFog:i.fog===!0,fogExp2:!!v&&v.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||y.attributes.normal===void 0&&R===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:M,skinning:g.isSkinnedMesh===!0,hasPositionAttribute:y.attributes.position!==void 0,morphTargets:y.morphAttributes.position!==void 0,morphNormals:y.morphAttributes.normal!==void 0,morphColors:y.morphAttributes.color!==void 0,morphTargetsCount:E,morphTextureStride:D,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:_.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:H,decodeVideoTexture:te&&i.map.isVideoTexture===!0&&kt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ae&&i.emissiveMap.isVideoTexture===!0&&kt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:ke&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(ke&&i.extensions.multiDraw===!0||P)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ae.vertexUv1s=c.has(1),Ae.vertexUv2s=c.has(2),Ae.vertexUv3s=c.has(3),c.clear(),Ae}function _(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(v(n,t),y(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function v(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function y(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function b(e){let t=p[e.type],n;if(t){let e=Ht[t];n=xt.clone(e.uniforms)}else n=e.uniforms;return n}function x(t,n){let r=u.get(n);return r===void 0?(r=new _i(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function S(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function C(e){s.remove(e)}function w(){s.dispose()}return{getParameters:g,getProgramCacheKey:_,getUniforms:b,acquireProgram:x,releaseProgram:S,releaseShaderCache:C,programs:l,dispose:w}}function Ci(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function wi(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Ti(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Ei(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||wi),r.length>1&&r.sort(t||Ti),i.length>1&&i.sort(t||Ti)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Di(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Ei,e.set(t,[i])):n>=r.length?(i=new Ei,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Oi(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new q,color:new s};break;case`SpotLight`:n={position:new q,direction:new q,color:new s,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new q,color:new s,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new q,skyColor:new s,groundColor:new s};break;case`RectAreaLight`:n={color:new s,position:new q,halfWidth:new q,halfHeight:new q}}return e[t.id]=n,n}}}function ki(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Ai=0;function ji(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Mi(e){let t=new Oi,n=ki(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new q);let i=new q,a=new je,o=new je;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(ji);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=X.LTC_FLOAT_1,r.rectAreaLTC2=X.LTC_FLOAT_2):(r.rectAreaLTC1=X.LTC_HALF_1,r.rectAreaLTC2=X.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Ai++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Ni(e){let t=new Mi(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Pi(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Ni(e),t.set(n,[a])):r>=i.length?(a=new Ni(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Fi=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ii=`uniform sampler2D shadow_pass;
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
}`,Li=[new q(1,0,0),new q(-1,0,0),new q(0,1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1)],Ri=[new q(0,-1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1),new q(0,-1,0),new q(0,-1,0)],zi=new je,Bi=new q,Vi=new q;function Hi(e,t,n){let r=new b,i=new wt,a=new wt,o=new Re,s=new l,c=new jt,f={},p=n.maxTextureSize,m={0:1,1:0,2:2},g=new he({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new wt},radius:{value:4}},vertexShader:Fi,fragmentShader:Ii}),v=g.clone();v.defines.HORIZONTAL_PASS=1;let y=new Ft;y.setAttribute(`position`,new Et(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Pt(y,g),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let C=this.type;this.render=function(t,n,s){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||t.length===0)return;this.type===2&&(h(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.state;m.setBlending(0),m.buffers.depth.getReversed()===!0?m.buffers.color.setClear(0,0,0,0):m.buffers.color.setClear(1,1,1,1),m.buffers.depth.setTest(!0),m.setScissorTest(!1);let g=C!==this.type;g&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],f=l.shadow;if(f===void 0){h(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(f.autoUpdate===!1&&f.needsUpdate===!1)continue;i.copy(f.mapSize);let v=f.getFrameExtents();i.multiply(v),a.copy(f.mapSize),(i.x>p||i.y>p)&&(i.x>p&&(a.x=Math.floor(p/v.x),i.x=a.x*v.x,f.mapSize.x=a.x),i.y>p&&(a.y=Math.floor(p/v.y),i.y=a.y*v.y,f.mapSize.y=a.y));let y=e.state.buffers.depth.getReversed();if(f.camera._reversedDepth=y,f.map===null||g===!0){if(f.map!==null&&(f.map.depthTexture!==null&&(f.map.depthTexture.dispose(),f.map.depthTexture=null),f.map.dispose()),this.type===3){if(l.isPointLight){h(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}f.map=new We(i.x,i.y,{format:d,type:D,minFilter:Tt,magFilter:Tt,generateMipmaps:!1}),f.map.texture.name=l.name+`.shadowMap`,f.map.depthTexture=new _(i.x,i.y,me),f.map.depthTexture.name=l.name+`.shadowMapDepth`,f.map.depthTexture.format=te,f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=$e,f.map.depthTexture.magFilter=$e}else l.isPointLight?(f.map=new yn(i.x),f.map.depthTexture=new u(i.x,lt)):(f.map=new We(i.x,i.y),f.map.depthTexture=new _(i.x,i.y,lt)),f.map.depthTexture.name=l.name+`.shadowMap`,f.map.depthTexture.format=te,this.type===1?(f.map.depthTexture.compareFunction=y?518:515,f.map.depthTexture.minFilter=Tt,f.map.depthTexture.magFilter=Tt):(f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=$e,f.map.depthTexture.magFilter=$e);f.camera.updateProjectionMatrix()}f.map.isWebGLCubeRenderTarget!==!0&&(f.map.width!==i.x||f.map.height!==i.y)&&f.map.setSize(i.x,i.y);let b=f.map.isWebGLCubeRenderTarget?6:f.getViewportCount();l.isPointLight!==!0&&f.updateMatrices(l,s);for(let t=0;t<b;t++){let i=f.getCamera(t);if(l.isPointLight){let e=f.camera,n=f.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Bi.setFromMatrixPosition(l.matrixWorld),e.position.copy(Bi),Vi.copy(e.position),Vi.add(Li[t]),e.up.copy(Ri[t]),e.lookAt(Vi),e.updateMatrixWorld(),n.makeTranslation(-Bi.x,-Bi.y,-Bi.z),zi.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),f._frustum.setFromProjectionMatrix(zi,e.coordinateSystem,e.reversedDepth)}if(f.map.isWebGLCubeRenderTarget)e.setRenderTarget(f.map,t),e.clear();else{t===0&&(e.setRenderTarget(f.map),e.clear());let n=f.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),m.viewport(o)}r=f.getFrustum(t),E(n,s,i,l,this.type)}f.isPointLightShadow!==!0&&this.type===3&&w(f,s),f.needsUpdate=!1}C=this.type,S.needsUpdate=!1,e.setRenderTarget(c,l,f)};function w(n,r){let a=t.update(x);g.defines.VSM_SAMPLES!==n.blurSamples&&(g.defines.VSM_SAMPLES=n.blurSamples,v.defines.VSM_SAMPLES=n.blurSamples,g.needsUpdate=!0,v.needsUpdate=!0),n.mapPass===null?n.mapPass=new We(i.x,i.y,{format:d,type:D}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),g.uniforms.shadow_pass.value=n.map.depthTexture,g.uniforms.resolution.value.set(n.map.width,n.map.height),g.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,g,x,null),v.uniforms.shadow_pass.value=n.mapPass.texture,v.uniforms.resolution.value.set(n.map.width,n.map.height),v.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,v,x,null)}function T(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=f[e];r===void 0&&(r={},f[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,O)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?m[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function E(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=T(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=T(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)E(c[e],i,a,o,s)}function O(e){e.target.removeEventListener(`dispose`,O);for(let t in f){let n=f[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Ui(e,t){function n(){let t=!1,n=new Re,r=null,i=new Re(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?z(e.DEPTH_TEST):se(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=ie[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?z(e.STENCIL_TEST):se(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,c=new i,l=new WeakMap,u=new WeakMap,d={},f={},p={},m=new WeakMap,h=[],g=null,_=!1,v=null,y=null,b=null,x=null,S=null,C=null,w=null,T=new s(0,0,0),E=0,D=!1,O=null,k=null,ee=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,te=e.getParameter(e.VERSION);te.indexOf(`WebGL`)===-1?te.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(te)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(te)[1]),N=P>=1);let F=null,ne={},I=e.getParameter(e.SCISSOR_BOX),re=e.getParameter(e.VIEWPORT),L=new Re().fromArray(I),R=new Re().fromArray(re);function ae(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let oe={};oe[e.TEXTURE_2D]=ae(e.TEXTURE_2D,e.TEXTURE_2D,1),oe[e.TEXTURE_CUBE_MAP]=ae(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[e.TEXTURE_2D_ARRAY]=ae(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),oe[e.TEXTURE_3D]=ae(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),c.setClear(0),z(e.DEPTH_TEST),o.setFunc(3),me(!1),he(1),z(e.CULL_FACE),fe(0);function z(t){d[t]!==!0&&(e.enable(t),d[t]=!0)}function se(t){d[t]!==!1&&(e.disable(t),d[t]=!1)}function ce(t,n){return p[t]!==n&&(e.bindFramebuffer(t,n),p[t]=n,t===e.DRAW_FRAMEBUFFER&&(p[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(p[e.DRAW_FRAMEBUFFER]=n),!0)}function le(t,n){let r=h,i=!1;if(t){r=m.get(n),r===void 0&&(r=[],m.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ue(t){return g!==t&&(e.useProgram(t),g=t,!0)}let B={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};B[103]=e.MIN,B[104]=e.MAX;let de={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function fe(t,n,r,i,a,o,s,c,l,u){if(t===0)_===!0&&(se(e.BLEND),_=!1);else if(_===!1&&(z(e.BLEND),_=!0),t!==5){if(t!==v||u!==D){if((y!==100||S!==100)&&(e.blendEquation(e.FUNC_ADD),y=100,S=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:G(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:G(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:G(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:G(`WebGLState: Invalid blending: `,t)}b=null,x=null,C=null,w=null,T.set(0,0,0),E=0,v=t,D=u}}else a||=n,o||=r,s||=i,(n!==y||a!==S)&&(e.blendEquationSeparate(B[n],B[a]),y=n,S=a),(r!==b||i!==x||o!==C||s!==w)&&(e.blendFuncSeparate(de[r],de[i],de[o],de[s]),b=r,x=i,C=o,w=s),(c.equals(T)===!1||l!==E)&&(e.blendColor(c.r,c.g,c.b,l),T.copy(c),E=l),v=t,D=!1}function pe(t,n){t.side===2?se(e.CULL_FACE):z(e.CULL_FACE);let r=t.side===1;n&&(r=!r),me(r),t.blending===1&&t.transparent===!1?fe(0):fe(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;c.setTest(i),i&&(c.setMask(t.stencilWriteMask),c.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),c.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),_e(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?z(e.SAMPLE_ALPHA_TO_COVERAGE):se(e.SAMPLE_ALPHA_TO_COVERAGE)}function me(t){O!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),O=t)}function he(t){t===0?se(e.CULL_FACE):(z(e.CULL_FACE),t!==k&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),k=t}function ge(t){t!==ee&&(N&&e.lineWidth(t),ee=t)}function _e(t,n,r){t?(z(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):se(e.POLYGON_OFFSET_FILL)}function ve(t){t?z(e.SCISSOR_TEST):se(e.SCISSOR_TEST)}function ye(t){t===void 0&&(t=e.TEXTURE0+M-1),F!==t&&(e.activeTexture(t),F=t)}function be(t,n,r){r===void 0&&(r=F===null?e.TEXTURE0+M-1:F);let i=ne[r];i===void 0&&(i={type:void 0,texture:void 0},ne[r]=i),(i.type!==t||i.texture!==n)&&(F!==r&&(e.activeTexture(r),F=r),e.bindTexture(t,n||oe[t]),i.type=t,i.texture=n)}function xe(){let t=ne[F];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Se(){try{e.compressedTexImage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Ce(){try{e.compressedTexImage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function we(){try{e.texSubImage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Te(){try{e.texSubImage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function V(){try{e.compressedTexSubImage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Ee(){try{e.compressedTexSubImage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function De(){try{e.texStorage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Oe(){try{e.texStorage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function ke(){try{e.texImage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function H(){try{e.texImage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Ae(t){return f[t]===void 0?e.getParameter(t):f[t]}function U(t,n){f[t]!==n&&(e.pixelStorei(t,n),f[t]=n)}function W(t){L.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),L.copy(t))}function je(t){R.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),R.copy(t))}function Me(t,n){let r=u.get(n);r===void 0&&(r=new WeakMap,u.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Ne(t,n){let r=u.get(n).get(t);l.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),l.set(n,r))}function K(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),d={},f={},F=null,ne={},p={},m=new WeakMap,h=[],g=null,_=!1,v=null,y=null,b=null,x=null,S=null,C=null,w=null,T=new s(0,0,0),E=0,D=!1,O=null,k=null,ee=null,A=null,j=null,L.set(0,0,e.canvas.width,e.canvas.height),R.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),c.reset()}return{buffers:{color:a,depth:o,stencil:c},enable:z,disable:se,bindFramebuffer:ce,drawBuffers:le,useProgram:ue,setBlending:fe,setMaterial:pe,setFlipSided:me,setCullFace:he,setLineWidth:ge,setPolygonOffset:_e,setScissorTest:ve,activeTexture:ye,bindTexture:be,unbindTexture:xe,compressedTexImage2D:Se,compressedTexImage3D:Ce,texImage2D:ke,texImage3D:H,pixelStorei:U,getParameter:Ae,updateUBOMapping:Me,uniformBlockBinding:Ne,texStorage2D:De,texStorage3D:Oe,texSubImage2D:we,texSubImage3D:Te,compressedTexSubImage2D:V,compressedTexSubImage3D:Ee,scissor:W,viewport:je,reset:K}}function Wi(e,t,n,i,a,o,s){let c=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,l=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),u=new wt,d=new WeakMap,f=new Set,p,m=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function _(e,t){return g?new OffscreenCanvas(e,t):It(`canvas`)}function v(e,t,n){let r=1,i=V(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);p===void 0&&(p=_(n,a));let o=t?_(n,a):p;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),h(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&h(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function y(e){return e.generateMipmaps}function b(t){e.generateMipmap(t)}function x(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function S(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];h(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||h(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?it:kt.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function C(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,h(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function w(e,t){return y(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function T(e){let t=e.target;t.removeEventListener(`dispose`,T),D(t),t.isVideoTexture&&d.delete(t),t.isHTMLTexture&&f.delete(t)}function E(e){let t=e.target;t.removeEventListener(`dispose`,E),k(t)}function D(e){let t=i.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=m.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&O(e),Object.keys(r).length===0&&m.delete(n)}i.remove(e)}function O(t){let n=i.get(t);e.deleteTexture(n.__webglTexture);let r=t.source,a=m.get(r);delete a[n.__cacheKey],s.memory.textures--}function k(t){let n=i.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),i.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let r=t.textures;for(let t=0,n=r.length;t<n;t++){let n=i.get(r[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),s.memory.textures--),i.remove(r[t])}i.remove(t)}let ee=0;function A(){ee=0}function j(){return ee}function M(e){ee=e}function N(){let e=ee;return e>=a.maxTextures&&h(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+a.maxTextures),ee+=1,e}function P(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function te(t,r){let a=i.get(t);if(t.isVideoTexture&&we(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)h(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)h(`WebGLRenderer: Texture marked for update but image is incomplete`);else{B(a,t,r);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+r)}function ne(t,r){let a=i.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?B(a,t,r):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+r))}function I(t,r){let a=i.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?B(a,t,r):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+r)}function re(t,r){let a=i.get(t);t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version?de(a,t,r):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+r)}let ie={[F]:e.REPEAT,[le]:e.CLAMP_TO_EDGE,[L]:e.MIRRORED_REPEAT},ae={[$e]:e.NEAREST,[Xe]:e.NEAREST_MIPMAP_NEAREST,[r]:e.NEAREST_MIPMAP_LINEAR,[Tt]:e.LINEAR,[ze]:e.LINEAR_MIPMAP_NEAREST,[Fe]:e.LINEAR_MIPMAP_LINEAR},oe={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function z(n,r){if(r.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(r.magFilter===1006||r.magFilter===1007||r.magFilter===1005||r.magFilter===1008||r.minFilter===1006||r.minFilter===1007||r.minFilter===1005||r.minFilter===1008)&&h(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,ie[r.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,ie[r.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,ie[r.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ae[r.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ae[r.minFilter]),r.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,oe[r.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(r.magFilter===1003||r.minFilter!==1005&&r.minFilter!==1008||r.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(r.anisotropy>1||i.get(r).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(r.anisotropy,a.getMaxAnisotropy())),i.get(r).__currentAnisotropy=r.anisotropy}}}function se(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,T));let i=n.source,a=m.get(i);a===void 0&&(a={},m.set(i,a));let o=P(n);if(o!==t.__cacheKey){a[o]===void 0&&(a[o]={texture:e.createTexture(),usedTimes:0},s.memory.textures++,r=!0),a[o].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&O(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return r}function ce(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ue(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=ce(n.start,r.width,4),c=ce(t.start,r.width,4);n.start<=i+1&&a===c&&ce(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function B(t,r,s){let c=e.TEXTURE_2D;(r.isDataArrayTexture||r.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),r.isData3DTexture&&(c=e.TEXTURE_3D);let l=se(t,r),u=r.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let d=i.get(u);if(u.version!==d.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&r.image instanceof ImageBitmap)){let t=kt.getPrimaries(kt.workingColorSpace),i=r.colorSpace===``?null:kt.getPrimaries(r.colorSpace),a=r.colorSpace===``||t===i?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,r.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,a)}n.pixelStorei(e.UNPACK_ALIGNMENT,r.unpackAlignment);let t=v(r.image,!1,a.maxTextureSize);t=Te(r,t);let i=o.convert(r.format,r.colorSpace),p=o.convert(r.type),m=S(r.internalFormat,i,p,r.normalized,r.colorSpace,r.isVideoTexture);z(c,r);let g,_=r.mipmaps,x=r.isVideoTexture!==!0,T=d.__version===void 0||l===!0,E=u.dataReady,D=w(r,t);if(r.isDepthTexture)m=C(r.format===R,r.type),T&&(x?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,i,p,null));else if(r.isDataTexture){if(_.length>0){x&&T&&n.texStorage2D(e.TEXTURE_2D,D,m,_[0].width,_[0].height);for(let t=0,r=_.length;t<r;t++)g=_[t],x?E&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,i,p,g.data):n.texImage2D(e.TEXTURE_2D,t,m,g.width,g.height,0,i,p,g.data);r.generateMipmaps=!1}else x?(T&&n.texStorage2D(e.TEXTURE_2D,D,m,t.width,t.height),E&&ue(r,t,i,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,i,p,t.data)}else if(r.isCompressedTexture){if(r.isCompressedArrayTexture){x&&T&&n.texStorage3D(e.TEXTURE_2D_ARRAY,D,m,_[0].width,_[0].height,t.depth);for(let a=0,o=_.length;a<o;a++)if(g=_[a],r.format!==1023){if(i!==null){if(x){if(E){if(r.layerUpdates.size>0){let t=Nt(g.width,g.height,r.format,r.type);for(let o of r.layerUpdates){let r=g.data.subarray(o*t/g.data.BYTES_PER_ELEMENT,(o+1)*t/g.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,a,0,0,o,g.width,g.height,1,i,r)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,a,0,0,0,g.width,g.height,t.depth,i,g.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,a,m,g.width,g.height,t.depth,0,g.data,0,0)}else h(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else x?E&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,a,0,0,0,g.width,g.height,t.depth,i,p,g.data):n.texImage3D(e.TEXTURE_2D_ARRAY,a,m,g.width,g.height,t.depth,0,i,p,g.data);r.layerUpdates.size>0&&r.clearLayerUpdates()}else{x&&T&&n.texStorage2D(e.TEXTURE_2D,D,m,_[0].width,_[0].height);for(let t=0,a=_.length;t<a;t++)g=_[t],r.format===1023?x?E&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,i,p,g.data):n.texImage2D(e.TEXTURE_2D,t,m,g.width,g.height,0,i,p,g.data):i===null?h(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):x?E&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,i,g.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,g.width,g.height,0,g.data)}}else if(r.isDataArrayTexture){if(x){if(T&&n.texStorage3D(e.TEXTURE_2D_ARRAY,D,m,t.width,t.height,t.depth),E){if(r.layerUpdates.size>0){let a=Nt(t.width,t.height,r.format,r.type);for(let o of r.layerUpdates){let r=t.data.subarray(o*a/t.data.BYTES_PER_ELEMENT,(o+1)*a/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,o,t.width,t.height,1,i,p,r)}r.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,i,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,i,p,t.data)}else if(r.isData3DTexture)x?(T&&n.texStorage3D(e.TEXTURE_3D,D,m,t.width,t.height,t.depth),E&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,i,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,i,p,t.data);else if(r.isFramebufferTexture){if(T){if(x)n.texStorage2D(e.TEXTURE_2D,D,m,t.width,t.height);else{let r=t.width,a=t.height;for(let t=0;t<D;t++)n.texImage2D(e.TEXTURE_2D,t,m,r,a,0,i,p,null),r>>=1,a>>=1}}}else if(r.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),f.add(r),n.onpaint=e=>{let t=e.changedElements;for(let e of f)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(_.length>0){if(x&&T){let t=V(_[0]);n.texStorage2D(e.TEXTURE_2D,D,m,t.width,t.height)}for(let t=0,r=_.length;t<r;t++)g=_[t],x?E&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,i,p,g):n.texImage2D(e.TEXTURE_2D,t,m,i,p,g);r.generateMipmaps=!1}else if(x){if(T){let r=V(t);n.texStorage2D(e.TEXTURE_2D,D,m,r.width,r.height)}E&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,i,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,i,p,t);y(r)&&b(c),d.__version=u.version,r.onUpdate&&r.onUpdate(r)}t.__version=r.version}function de(t,r,s){if(r.image.length!==6)return;let c=se(t,r),l=r.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=i.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=kt.getPrimaries(kt.workingColorSpace),i=r.colorSpace===``?null:kt.getPrimaries(r.colorSpace),d=r.colorSpace===``||t===i?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,r.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,r.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,r.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=r.isCompressedTexture||r.image[0].isCompressedTexture,p=r.image[0]&&r.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=v(r.image[e],!0,a.maxCubemapSize):m[e]=p?r.image[e].image:r.image[e],m[e]=Te(r,m[e]);let g=m[0],_=o.convert(r.format,r.colorSpace),x=o.convert(r.type),C=S(r.internalFormat,_,x,r.normalized,r.colorSpace),T=r.isVideoTexture!==!0,E=u.__version===void 0||c===!0,D=l.dataReady,O=w(r,g);z(e.TEXTURE_CUBE_MAP,r);let k;if(f){T&&E&&n.texStorage2D(e.TEXTURE_CUBE_MAP,O,C,g.width,g.height);for(let t=0;t<6;t++){k=m[t].mipmaps;for(let i=0;i<k.length;i++){let a=k[i];r.format===1023?T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,i,0,0,a.width,a.height,_,x,a.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,i,C,a.width,a.height,0,_,x,a.data):_===null?h(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):T?D&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,i,0,0,a.width,a.height,_,a.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,i,C,a.width,a.height,0,a.data)}}}else{if(k=r.mipmaps,T&&E){k.length>0&&O++;let t=V(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,O,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,_,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,_,x,m[t].data);for(let r=0;r<k.length;r++){let i=k[r].image[t].image;T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,_,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,_,x,i.data)}}else{T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,_,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,_,x,m[t]);for(let r=0;r<k.length;r++){let i=k[r];T?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,_,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,_,x,i.image[t])}}}y(r)&&b(e.TEXTURE_CUBE_MAP),u.__version=l.version,r.onUpdate&&r.onUpdate(r)}t.__version=r.version}function fe(t,r,a,s,l,u){let d=o.convert(a.format,a.colorSpace),f=o.convert(a.type),p=S(a.internalFormat,d,f,a.normalized,a.colorSpace),m=i.get(r),h=i.get(a);if(h.__renderTarget=r,!m.__hasExternalTextures){let t=Math.max(1,r.width>>u),i=Math.max(1,r.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,i,r.depth,0,d,f,null):n.texImage2D(l,u,p,t,i,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Ce(r)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,s,l,h.__webglTexture,0,Se(r)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,s,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function pe(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=C(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ce(n)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Se(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Se(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let a=t[i],s=o.convert(a.format,a.colorSpace),l=o.convert(a.type),u=S(a.internalFormat,s,l,a.normalized,a.colorSpace);Ce(n)?c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Se(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Se(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function me(t,r,a){let s=r.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(r.depthTexture&&r.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=i.get(r.depthTexture);if(l.__renderTarget=r,(!l.__webglTexture||r.depthTexture.image.width!==r.width||r.depthTexture.image.height!==r.height)&&(r.depthTexture.image.width=r.width,r.depthTexture.image.height=r.height,r.depthTexture.needsUpdate=!0),s){if(l.__webglInit===void 0&&(l.__webglInit=!0,r.depthTexture.addEventListener(`dispose`,T)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),z(e.TEXTURE_CUBE_MAP,r.depthTexture);let t=o.convert(r.depthTexture.format),i=o.convert(r.depthTexture.type),a;r.depthTexture.format===1026?a=e.DEPTH_COMPONENT24:r.depthTexture.format===1027&&(a=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,a,r.width,r.height,0,t,i,null)}}else te(r.depthTexture,0);let u=l.__webglTexture,d=Se(r),f=s?e.TEXTURE_CUBE_MAP_POSITIVE_X+a:e.TEXTURE_2D,p=r.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(r.depthTexture.format===1026)Ce(r)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(r.depthTexture.format===1027)Ce(r)?c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function he(t){let r=i.get(t),a=t.isWebGLCubeRenderTarget===!0;if(r.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(r.__depthDisposeCallback&&r.__depthDisposeCallback(),e){let t=()=>{delete r.__boundDepthTexture,delete r.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),r.__depthDisposeCallback=t}r.__boundDepthTexture=e}if(t.depthTexture&&!r.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)me(r.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?me(r.__webglFramebuffer[0],t,0):me(r.__webglFramebuffer,t,0)}}else if(a){r.__webglDepthbuffer=[];for(let i=0;i<6;i++)if(n.bindFramebuffer(e.FRAMEBUFFER,r.__webglFramebuffer[i]),r.__webglDepthbuffer[i]===void 0)r.__webglDepthbuffer[i]=e.createRenderbuffer(),pe(r.__webglDepthbuffer[i],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=r.__webglDepthbuffer[i];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let i=t.texture.mipmaps;if(i&&i.length>0?n.bindFramebuffer(e.FRAMEBUFFER,r.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,r.__webglFramebuffer),r.__webglDepthbuffer===void 0)r.__webglDepthbuffer=e.createRenderbuffer(),pe(r.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,i=r.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,i),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,i)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function ge(t,n,r){let a=i.get(t);n!==void 0&&fe(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),r!==void 0&&he(t)}function _e(t){let r=t.texture,a=i.get(t),c=i.get(r);t.addEventListener(`dispose`,E);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=r.version,s.memory.textures++),u){a.__webglFramebuffer=[];for(let t=0;t<6;t++)if(r.mipmaps&&r.mipmaps.length>0){a.__webglFramebuffer[t]=[];for(let n=0;n<r.mipmaps.length;n++)a.__webglFramebuffer[t][n]=e.createFramebuffer()}else a.__webglFramebuffer[t]=e.createFramebuffer()}else{if(r.mipmaps&&r.mipmaps.length>0){a.__webglFramebuffer=[];for(let t=0;t<r.mipmaps.length;t++)a.__webglFramebuffer[t]=e.createFramebuffer()}else a.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=i.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),s.memory.textures++)}if(t.samples>0&&Ce(t)===!1){a.__webglMultisampledFramebuffer=e.createFramebuffer(),a.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,a.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];a.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,a.__webglColorRenderbuffer[n]);let i=o.convert(r.format,r.colorSpace),s=o.convert(r.type),c=S(r.internalFormat,i,s,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Se(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,a.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(a.__webglDepthRenderbuffer=e.createRenderbuffer(),pe(a.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),z(e.TEXTURE_CUBE_MAP,r);for(let n=0;n<6;n++)if(r.mipmaps&&r.mipmaps.length>0)for(let i=0;i<r.mipmaps.length;i++)fe(a.__webglFramebuffer[n][i],t,r,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,i);else fe(a.__webglFramebuffer[n],t,r,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);y(r)&&b(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let r=0,o=l.length;r<o;r++){let o=l[r],s=i.get(o),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,s.__webglTexture),z(c,o),fe(a.__webglFramebuffer,t,o,e.COLOR_ATTACHMENT0+r,c,0),y(o)&&b(c)}n.unbindTexture()}else{let i=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(i=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(i,c.__webglTexture),z(i,r),r.mipmaps&&r.mipmaps.length>0)for(let n=0;n<r.mipmaps.length;n++)fe(a.__webglFramebuffer[n],t,r,e.COLOR_ATTACHMENT0,i,n);else fe(a.__webglFramebuffer,t,r,e.COLOR_ATTACHMENT0,i,0);y(r)&&b(i),n.unbindTexture()}t.depthBuffer&&he(t)}function ve(e){let t=e.textures;for(let r=0,a=t.length;r<a;r++){let a=t[r];if(y(a)){let t=x(e),r=i.get(a).__webglTexture;n.bindTexture(t,r),b(t),n.unbindTexture()}}}let ye=[],be=[];function xe(t){if(t.samples>0){if(Ce(t)===!1){let r=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,c=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=i.get(t),d=r.length>1;if(d)for(let t=0;t<r.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<r.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=i.get(r[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),l===!0&&(ye.length=0,be.length=0,ye.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(ye.push(c),be.push(c),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,be)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ye))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<r.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=i.get(r[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&l){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Se(e){return Math.min(a.maxSamples,e.samples)}function Ce(e){let n=i.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function we(e){let t=s.render.frame;d.get(e)!==t&&(d.set(e,t),e.update())}function Te(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(kt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&h(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):G(`WebGLTextures: Unsupported texture color space:`,n)),t}function V(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(u.width=e.naturalWidth||e.width,u.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(u.width=e.displayWidth,u.height=e.displayHeight):(u.width=e.width,u.height=e.height),u}this.allocateTextureUnit=N,this.resetTextureUnits=A,this.getTextureUnits=j,this.setTextureUnits=M,this.setTexture2D=te,this.setTexture2DArray=ne,this.setTexture3D=I,this.setTextureCube=re,this.rebindTextures=ge,this.setupRenderTarget=_e,this.updateRenderTargetMipmap=ve,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=he,this.setupFrameBufferTexture=fe,this.useMultisampledRTT=Ce,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Gi(e,t){function n(n,r=``){let i,a=kt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Ki=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,qi=`
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

}`,Ji=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new i(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new he({vertexShader:Ki,fragmentShader:qi,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Pt(new ce(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Yi=class extends Rt{constructor(e,t){super();let n=this,r=null,a=1,o=null,s=`local-floor`,c=1,l=null,u=null,d=null,f=null,p=null,m=null,g=typeof XRWebGLBinding<`u`,v=new Ji,y={},b=t.getContextAttributes(),x=null,S=null,C=[],w=[],T=new wt,D=null,O=null,k=new E;k.viewport=new Re;let A=new E;A.viewport=new Re;let j=[k,A],M=new nt,N=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new Ve,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new Ve,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new Ve,C[e]=t),t.getHandSpace()};function F(e){let t=w.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,l||o),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ne(){r.removeEventListener(`select`,F),r.removeEventListener(`selectstart`,F),r.removeEventListener(`selectend`,F),r.removeEventListener(`squeeze`,F),r.removeEventListener(`squeezestart`,F),r.removeEventListener(`squeezeend`,F),r.removeEventListener(`end`,ne),r.removeEventListener(`inputsourceschange`,I);for(let e=0;e<C.length;e++){let t=w[e];t!==null&&(w[e]=null,C[e].disconnect(t))}N=null,P=null,v.reset();for(let e in y)delete y[e];if(e.setRenderTarget(x),p=null,f=null,d=null,r=null,S=null,ce.stop(),n.isPresenting=!1,e.setPixelRatio(D),e.setSize(T.width,T.height,!1),O!==null){let e=O.camera;e.fov=O.fov,e.zoom=O.zoom,e.updateProjectionMatrix(),O=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){a=e,n.isPresenting===!0&&h(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){s=e,n.isPresenting===!0&&h(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(e){l=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(i){if(r=i,r!==null){if(x=e.getRenderTarget(),r.addEventListener(`select`,F),r.addEventListener(`selectstart`,F),r.addEventListener(`selectend`,F),r.addEventListener(`squeeze`,F),r.addEventListener(`squeezestart`,F),r.addEventListener(`squeezeend`,F),r.addEventListener(`end`,ne),r.addEventListener(`inputsourceschange`,I),b.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(T),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,i=null,o=null;b.depth&&(o=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=b.stencil?R:te,i=b.stencil?qe:lt);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:a};d=this.getBinding(),f=d.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new We(f.textureWidth,f.textureHeight,{format:we,type:ot,depthTexture:new _(f.textureWidth,f.textureHeight,i,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new We(p.framebufferWidth,p.framebufferHeight,{format:we,type:ot,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(s),ce.setContext(r),ce.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function I(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=w.indexOf(n);r>=0&&(w[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=w.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=w.length){w.push(n),r=e;break}else if(w[e]===null){w[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let re=new q,L=new q;function ie(e,t,n){re.setFromMatrixPosition(t.matrixWorld),L.setFromMatrixPosition(n.matrixWorld);let r=re.distanceTo(L),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ae(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;v.texture!==null&&(v.depthNear>0&&(t=v.depthNear),v.depthFar>0&&(n=v.depthFar)),M.near=A.near=k.near=t,M.far=A.far=k.far=n,(N!==M.near||P!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),N=M.near,P=M.far),M.layers.mask=e.layers.mask|6,k.layers.mask=M.layers.mask&-5,A.layers.mask=M.layers.mask&-3;let i=e.parent,a=M.cameras;ae(M,i);for(let e=0;e<a.length;e++)ae(a[e],i);a.length===2?ie(M,k,A):M.projectionMatrix.copy(k.projectionMatrix),O===null&&e.isPerspectiveCamera&&(O={camera:e,fov:e.fov,zoom:e.zoom}),oe(e,M,i)};function oe(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=ee*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(f!==null||p!==null)return c},this.setFoveation=function(e){c=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)},this.getCameraTexture=function(e){return y[e]};let z=null;function se(t,a){if(u=a.getViewerPose(l||o),m=a,u!==null){let t=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let a=!1;t.length!==M.cameras.length&&(M.cameras.length=0,a=!0);for(let n=0;n<t.length;n++){let r=t[n],i=null;if(p!==null)i=p.getViewport(r);else{let t=d.getViewSubImage(f,r);i=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=j[n];o===void 0&&(o=new E,o.layers.enable(n),o.viewport=new Re,j[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(i.x,i.y,i.width,i.height),n===0&&(M.matrix.copy(o.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),a===!0&&M.cameras.push(o)}let o=r.enabledFeatures;if(o&&o.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&g){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&v.init(e,r.renderState)}if(o&&o.includes(`camera-access`)&&g){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=y[n];e||(e=new i,y[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=w[e],n=C[e];t!==null&&n!==void 0&&n.update(t,a,l||o)}z&&z(t,a),a.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:a}),m=null}let ce=new Bt;ce.setAnimationLoop(se),this.setAnimationLoop=function(e){z=e},this.dispose=function(){}}},Xi=new je,Zi=new Lt;Zi.set(-1,0,0,0,1,0,0,0,1);function Qi(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,ue(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Xi.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Zi),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function $i(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(_(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,y));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return G(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(g(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=v(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function g(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function _(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=v(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function v(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?h(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):h(`WebGLRenderer: Unsupported uniform value type.`,e),t}function y(t){let n=t.target;n.removeEventListener(`dispose`,y);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function b(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:b}}var ea=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ta=null;function na(){return ta===null&&(ta=new M(ea,16,16,d,D),ta.name=`DFG_LUT`,ta.minFilter=Tt,ta.magFilter=Tt,ta.wrapS=le,ta.wrapT=le,ta.generateMipmaps=!1,ta.needsUpdate=!0),ta}var ra=class{constructor(e={}){let{canvas:t=Dt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:o=!1,antialias:l=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:d=!1,powerPreference:f=`default`,failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:m=!1,outputBufferType:g=ot}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);_=n.getContextAttributes().alpha}else _=o;let v=g,y=new Set([Oe,re,N]),x=new Set([ot,lt,et,qe,vt,Ne]),S=new Uint32Array(4),C=new Int32Array(4),w=new q,T=null,E=null,O=[],k=[],ee=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,j=!1,M=null,P=null,te=null,F=null;this._outputColorSpace=a;let ne=0,I=0,L=null,R=-1,ie=null,ae=new Re,oe=new Re,z=null,se=new s(0),ce=0,le=t.width,ue=t.height,B=1,de=null,pe=null,me=new Re(0,0,le,ue),he=new Re(0,0,le,ue),ge=!1,_e=new b,ve=!1,ye=!1,be=new je,xe=new q,Se=new Re,Ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},we=!1;function Te(){return L===null?B:1}let V=n;function Ee(e,n){return t.getContext(e,n)}let De,ke,H,Ae,U,W,Me,K,Pe,Ie,Le,ze,Be,Ve,He,Ue,Ge,Ke,Je,Ye,Xe,Ze,Qe;try{let e={alpha:!0,depth:r,stencil:i,antialias:l,premultipliedAlpha:u,preserveDrawingBuffer:d,powerPreference:f,failIfMajorPerformanceCaveat:p};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,tt,!1),t.addEventListener(`webglcontextrestored`,nt,!1),t.addEventListener(`webglcontextcreationerror`,it,!1),V===null){let t=`webgl2`;if(V=Ee(t,e),V===null)throw Ee(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}$e()}catch(e){throw t.removeEventListener(`webglcontextlost`,tt,!1),t.removeEventListener(`webglcontextrestored`,nt,!1),t.removeEventListener(`webglcontextcreationerror`,it,!1),G(`WebGLRenderer: `+e.message),e}function $e(){De=new xn(V),De.init(),Xe=new Gi(V,De),ke=new Yt(V,De,e,Xe),H=new Ui(V,De),ke.reversedDepthBuffer&&m&&H.buffers.depth.setReversed(!0),P=V.createFramebuffer(),te=V.createFramebuffer(),F=V.createFramebuffer(),Ae=new wn(V),U=new Ci,W=new Wi(V,De,H,U,ke,Xe,Ae),Me=new bn(A),K=new Vt(V),Ze=new qt(V,K),Pe=new Sn(V,K,Ae,Ze),Ie=new En(V,Pe,K,Ze,Ae),Ke=new Tn(V,ke,W),He=new Xt(U),Le=new Si(A,Me,De,ke,Ze,He),ze=new Qi(A,U),Be=new Di,Ve=new Pi(De),Ge=new Kt(A,Me,H,Ie,_,u),Ue=new Hi(A,Ie,ke),Qe=new $i(V,Ae,ke,H),Je=new Jt(V,De,Ae),Ye=new Cn(V,De,Ae),Ae.programs=Le.programs,A.capabilities=ke,A.extensions=De,A.properties=U,A.renderLists=Be,A.shadowMap=Ue,A.state=H,A.info=Ae}v!==1009&&(ee=new On(v,t.width,t.height,l,r,i));let J=new Yi(A,V);this.xr=J,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){let e=De.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=De.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(e){e!==void 0&&(B=e,this.setSize(le,ue,!1))},this.getSize=function(e){return e.set(le,ue)},this.setSize=function(e,n,r=!0){J.isPresenting?h(`WebGLRenderer: Can't change size while VR device is presenting.`):(le=e,ue=n,t.width=Math.floor(e*B),t.height=Math.floor(n*B),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),ee!==null&&ee.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(le*B,ue*B).floor()},this.setDrawingBufferSize=function(e,n,r){le=e,ue=n,B=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(v===1009)G(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){h(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}ee.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(ae)},this.getViewport=function(e){return e.copy(me)},this.setViewport=function(e,t,n,r){e.isVector4?me.set(e.x,e.y,e.z,e.w):me.set(e,t,n,r),H.viewport(ae.copy(me).multiplyScalar(B).round())},this.getScissor=function(e){return e.copy(he)},this.setScissor=function(e,t,n,r){e.isVector4?he.set(e.x,e.y,e.z,e.w):he.set(e,t,n,r),H.scissor(oe.copy(he).multiplyScalar(B).round())},this.getScissorTest=function(){return ge},this.setScissorTest=function(e){H.setScissorTest(ge=e)},this.setOpaqueSort=function(e){de=e},this.setTransparentSort=function(e){pe=e},this.getClearColor=function(e){return e.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor(...arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(L!==null){let t=L.texture.format;e=y.has(t)}if(e){let e=L.texture.type,t=x.has(e),n=Ge.getClearColor(),r=Ge.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(S[0]=i,S[1]=a,S[2]=o,S[3]=r,V.clearBufferuiv(V.COLOR,0,S)):(C[0]=i,C[1]=a,C[2]=o,C[3]=r,V.clearBufferiv(V.COLOR,0,C))}else r|=V.COLOR_BUFFER_BIT}t&&(r|=V.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&V.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),M=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,tt,!1),t.removeEventListener(`webglcontextrestored`,nt,!1),t.removeEventListener(`webglcontextcreationerror`,it,!1),Ge.dispose(),Be.dispose(),Ve.dispose(),U.dispose(),Me.dispose(),Ie.dispose(),Ze.dispose(),Qe.dispose(),Le.dispose(),J.dispose(),J.removeEventListener(`sessionstart`,pt),J.removeEventListener(`sessionend`,mt),ht.stop()};function tt(e){e.preventDefault(),c(`WebGLRenderer: Context Lost.`),j=!0}function nt(){c(`WebGLRenderer: Context Restored.`),j=!1;let e=Ae.autoReset,t=Ue.enabled,n=Ue.autoUpdate,r=Ue.needsUpdate,i=Ue.type;$e(),Ae.autoReset=e,Ue.enabled=t,Ue.autoUpdate=n,Ue.needsUpdate=r,Ue.type=i}function it(e){G(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function at(e){let t=e.target;t.removeEventListener(`dispose`,at),st(t)}function st(e){ct(e),U.remove(e)}function ct(e){let t=U.get(e).programs;t!==void 0&&(t.forEach(function(e){Le.releaseProgram(e)}),e.isShaderMaterial&&Le.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Ce);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Et(e,t,n,r,i);H.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Pe.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ze.setup(i,r,s,n,c);let h,g=Je;if(c!==null&&(h=K.get(c),g=Ye,g.setIndex(h)),i.isMesh)r.wireframe===!0?(H.setLineWidth(r.wireframeLinewidth*Te()),g.setMode(V.LINES)):g.setMode(V.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),H.setLineWidth(e*Te()),i.isLineSegments?g.setMode(V.LINES):i.isLineLoop?g.setMode(V.LINE_LOOP):g.setMode(V.LINE_STRIP)}else i.isPoints?g.setMode(V.POINTS):i.isSprite&&g.setMode(V.TRIANGLES);if(i.isBatchedMesh){if(De.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?K.get(c).bytesPerElement:1,o=U.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(V,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function ut(e,t,n,r){M!==null&&e.isNodeMaterial&&M.setObject(r,e),ve===!0&&He.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,St(e,t,r),e.side=0,e.needsUpdate=!0,St(e,t,r),e.side=2):St(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),M!==null&&M.renderStart(e,t,n),E=Ve.get(n),E.init(t),k.push(E),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(E.pushLight(e),e.castShadow&&E.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(E.pushLight(e),e.castShadow&&E.pushShadow(e))}),E.setupLights(),M!==null&&M.updateLights(E.state.lightsArray),ye=this.localClippingEnabled,ve=He.init(this.clippingPlanes,ye),ve===!0&&He.setGlobalState(this.clippingPlanes,t),M!==null&&Ue.render(E.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];ut(o,n,t,e),r.add(o)}else ut(i,n,t,e),r.add(i)}}),E=k.pop(),M!==null&&M.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=U.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}De.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let dt=null;function ft(e){dt&&dt(e)}function pt(){ht.stop()}function mt(){ht.start()}let ht=new Bt;ht.setAnimationLoop(ft),typeof self<`u`&&ht.setContext(self),this.setAnimationLoop=function(e){dt=e,J.setAnimationLoop(e),e===null?ht.stop():ht.start()},J.addEventListener(`sessionstart`,pt),J.addEventListener(`sessionend`,mt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){G(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(j===!0)return;M!==null&&M.renderStart(e,t);let n=J.enabled===!0&&J.isPresenting===!0,r=ee!==null&&(L===null||n)&&ee.begin(A,L);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(ee===null||ee.isCompositing()===!1)&&(J.cameraAutoUpdate===!0&&J.updateCamera(t),t=J.getCamera()),e.isScene===!0&&e.onBeforeRender(A,e,t,L),E=Ve.get(e,k.length),E.init(t),E.state.textureUnits=W.getTextureUnits(),k.push(E),be.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),_e.setFromProjectionMatrix(be,rt,t.reversedDepth),ye=this.localClippingEnabled,ve=He.init(this.clippingPlanes,ye),T=Be.get(e,O.length),T.init(),O.push(T),J.enabled===!0&&J.isPresenting===!0){let e=A.xr.getDepthSensingMesh();e!==null&&gt(e,t,-1/0,A.sortObjects)}gt(e,t,0,A.sortObjects),T.finish(),M!==null&&M.updateLights(E.state.lightsArray),A.sortObjects===!0&&T.sort(de,pe),we=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,we&&Ge.addToRenderList(T,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ve===!0&&He.beginShadows();let i=E.state.shadowsArray;if(Ue.render(i,e,t),ve===!0&&He.endShadows(),(r&&ee.hasRenderPass())===!1){let n=T.opaque,r=T.transmissive;if(E.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];yt(n,r,e,a)}we&&Ge.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];_t(T,e,n,n.viewport)}}else r.length>0&&yt(n,r,e,t),we&&Ge.render(e),_t(T,e,t)}L!==null&&I===0&&(W.updateMultisampleRenderTarget(L),W.updateRenderTargetMipmap(L)),r&&ee.end(A),e.isScene===!0&&e.onAfterRender(A,e,t),Ze.resetDefaultState(),R=-1,ie=null,k.pop(),k.length>0?(E=k[k.length-1],W.setTextureUnits(E.state.textureUnits),ve===!0&&He.setGlobalState(A.clippingPlanes,E.state.camera)):E=null,O.pop(),T=O.length>0?O[O.length-1]:null,M!==null&&M.renderEnd()};function gt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)E.pushLightProbeGrid(e);else if(e.isLight)E.pushLight(e),e.castShadow&&E.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(_e)){r&&Se.setFromMatrixPosition(e.matrixWorld).applyMatrix4(be);let i=Ie.update(e),a=e.material;a.visible&&T.push(e,i,a,n,Se.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(_e))){let i=Ie.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Se.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Se.copy(e.boundingSphere.center)),Se.applyMatrix4(e.matrixWorld).applyMatrix4(be)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&T.push(e,i,c,n,Se.z,s,t)}}else a.visible&&T.push(e,i,a,n,Se.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)gt(i[e],t,n,r)}function _t(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;E.setupLightsView(n),ve===!0&&He.setGlobalState(A.clippingPlanes,n),r&&H.viewport(ae.copy(r)),i.length>0&&bt(i,t,n),a.length>0&&bt(a,t,n),o.length>0&&bt(o,t,n),H.buffers.depth.setTest(!0),H.buffers.depth.setMask(!0),H.buffers.color.setMask(!0),H.setPolygonOffset(!1)}function yt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[r.id]===void 0){let e=De.has(`EXT_color_buffer_half_float`)||De.has(`EXT_color_buffer_float`);E.state.transmissionRenderTarget[r.id]=new We(1,1,{generateMipmaps:!0,type:e?D:ot,minFilter:Fe,samples:Math.max(4,ke.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:kt.workingColorSpace})}let a=E.state.transmissionRenderTarget[r.id],o=r.viewport||ae;a.setSize(o.z*A.transmissionResolutionScale,o.w*A.transmissionResolutionScale);let s=A.getRenderTarget(),c=A.getActiveCubeFace(),l=A.getActiveMipmapLevel();A.setRenderTarget(a),A.getClearColor(se),ce=A.getClearAlpha(),ce<1&&A.setClearColor(16777215,.5),A.clear(),we&&Ge.render(n);let u=A.toneMapping;A.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),E.setupLightsView(r),ve===!0&&He.setGlobalState(A.clippingPlanes,r),bt(e,n,r),W.updateMultisampleRenderTarget(a),W.updateRenderTargetMipmap(a),De.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,xt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(W.updateMultisampleRenderTarget(a),W.updateRenderTargetMipmap(a))}A.setRenderTarget(s,c,l),A.setClearColor(se,ce),d!==void 0&&(r.viewport=d),A.toneMapping=u}function bt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&xt(o,t,n,s,l,c)}}function xt(e,t,n,r,i,a){M!==null&&i.isNodeMaterial&&M.setObject(e,i),e.onBeforeRender(A,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(A,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,A.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,A.renderBufferDirect(n,t,r,i,e,a),i.side=2):A.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(A,t,n,r,i,a)}function St(e,t,n){t.isScene!==!0&&(t=Ce);let r=U.get(e),i=E.state.lights,a=E.state.shadowsArray,o=i.state.version,s=Le.getParameters(e,i.state,a,t,n,E.state.lightProbeGridArray),c=Le.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Me.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,at),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return wt(e,s),d}else s.uniforms=Le.getUniforms(e),M!==null&&e.isNodeMaterial&&M.build(e,n,s),e.onBeforeCompile(s,A),d=Le.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=He.uniform),wt(e,s),r.needsLights=At(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=E.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Ct(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Fr.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function wt(e,t){let n=U.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Tt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];w.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(w))return n}return null}function Et(e,t,n,r,i){t.isScene!==!0&&(t=Ce),W.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=L===null?A.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:kt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Me.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(h=A.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=U.get(r),y=E.state.lights;if(ve===!0&&(ye===!0||e!==ie)){let t=e===ie&&r.id===R;He.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==He.numPlanes||v.numIntersection!==He.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=E.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=St(r,t,i),M&&r.isNodeMaterial&&M.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),D=v.uniforms;if(H.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==R&&(R=r.id,C=!0),v.needsLights){let e=Tt(E.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||ie!==e){H.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(V,`projectionMatrix`,e.projectionMatrix),T.setValue(V,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(V,xe.setFromMatrixPosition(e.matrixWorld)),ke.logarithmicDepthBuffer&&T.setValue(V,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(V,`isOrthographic`,e.isOrthographicCamera===!0),ie!==e&&(ie=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(V,`sunShadowMap`,y.state.sunShadowMap,W),y.state.directionalShadowMap.length>0&&T.setValue(V,`directionalShadowMap`,y.state.directionalShadowMap,W),y.state.spotShadowMap.length>0&&T.setValue(V,`spotShadowMap`,y.state.spotShadowMap,W),y.state.pointShadowMap.length>0&&T.setValue(V,`pointShadowMap`,y.state.pointShadowMap,W)),i.isSkinnedMesh){T.setOptional(V,i,`bindMatrix`),T.setOptional(V,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(V,`boneTexture`,e.boneTexture,W))}i.isBatchedMesh&&(T.setOptional(V,i,`batchingTexture`),T.setValue(V,`batchingTexture`,i._matricesTexture,W),T.setOptional(V,i,`batchingIdTexture`),T.setValue(V,`batchingIdTexture`,i._indirectTexture,W),T.setOptional(V,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(V,`batchingColorTexture`,i._colorsTexture,W));let O=n.morphAttributes;if((O.position!==void 0||O.normal!==void 0||O.color!==void 0)&&Ke.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(V,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(D.envMapIntensity.value=t.environmentIntensity),D.dfgLUT!==void 0&&(D.dfgLUT.value=na()),C){if(T.setValue(V,`toneMappingExposure`,A.toneMappingExposure),v.needsLights&&Ot(D,w),a&&r.fog===!0&&ze.refreshFogUniforms(D,a),ze.refreshMaterialUniforms(D,r,B,ue,E.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;D.probesSH.value=e.texture,D.probesMin.value.copy(e.boundingBox.min),D.probesMax.value.copy(e.boundingBox.max),D.probesResolution.value.copy(e.resolution)}Fr.upload(V,Ct(v),D,W)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Fr.upload(V,Ct(v),D,W),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(V,`center`,i.center),T.setValue(V,`modelViewMatrix`,i.modelViewMatrix),T.setValue(V,`normalMatrix`,i.normalMatrix),T.setValue(V,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Qe.update(n,x),Qe.bind(n,x)}}return x}function Ot(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function At(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ne},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(e,t,n){let r=U.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),U.get(e.texture).__webglTexture=t,U.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=U.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){L=e,ne=t,I=n;let r=null,i=!1,a=!1;if(e){let o=U.get(e);if(o.__useDefaultFramebuffer!==void 0){H.bindFramebuffer(V.FRAMEBUFFER,o.__webglFramebuffer),ae.copy(e.viewport),oe.copy(e.scissor),z=e.scissorTest,H.viewport(ae),H.scissor(oe),H.setScissorTest(z),R=-1;return}if(o.__webglFramebuffer===void 0)W.setupRenderTarget(e);else if(o.__hasExternalTextures)W.rebindTextures(e,U.get(e.texture).__webglTexture,U.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&U.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);W.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=U.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&W.useMultisampledRTT(e)===!1?U.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,ae.copy(e.viewport),oe.copy(e.scissor),z=e.scissorTest}else ae.copy(me).multiplyScalar(B).floor(),oe.copy(he).multiplyScalar(B).floor(),z=ge;if(n!==0&&(r=P),H.bindFramebuffer(V.FRAMEBUFFER,r)&&H.drawBuffers(e,r),H.viewport(ae),H.scissor(oe),H.setScissorTest(z),i){let r=U.get(e.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=U.get(e.textures[t]);V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=U.get(e.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,t.__webglTexture,n)}R=-1};function jt(e){let t=U.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=ke.textureFormatReadable(e.format),t.__typeReadable=ke.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){G(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=U.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){H.bindFramebuffer(V.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+s);let u=jt(o);if(u.__formatReadable===!1){G(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){G(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&V.readPixels(t,n,r,i,Xe.convert(c),Xe.convert(l),a)}finally{let e=L===null?null:U.get(L).__webglFramebuffer;H.bindFramebuffer(V.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=U.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){H.bindFramebuffer(V.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+s);let d=jt(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=V.createBuffer();V.bindBuffer(V.PIXEL_PACK_BUFFER,f),V.bufferData(V.PIXEL_PACK_BUFFER,a.byteLength,V.STREAM_READ),V.readPixels(t,n,r,i,Xe.convert(l),Xe.convert(u),0),V.bindBuffer(V.PIXEL_PACK_BUFFER,null);let p=L===null?null:U.get(L).__webglFramebuffer;H.bindFramebuffer(V.FRAMEBUFFER,p);let m=V.fenceSync(V.SYNC_GPU_COMMANDS_COMPLETE,0);return V.flush(),await fe(V,m,4),V.bindBuffer(V.PIXEL_PACK_BUFFER,f),V.getBufferSubData(V.PIXEL_PACK_BUFFER,0,a),V.bindBuffer(V.PIXEL_PACK_BUFFER,null),V.deleteBuffer(f),V.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;W.setTexture2D(e,0),V.copyTexSubImage2D(V.TEXTURE_2D,n,0,0,o,s,i,a),H.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Xe.convert(t.format),_=Xe.convert(t.type),v;t.isData3DTexture?(W.setTexture3D(t,0),v=V.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(W.setTexture2DArray(t,0),v=V.TEXTURE_2D_ARRAY):(W.setTexture2D(t,0),v=V.TEXTURE_2D),H.activeTexture(V.TEXTURE0),H.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,t.flipY),H.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),H.pixelStorei(V.UNPACK_ALIGNMENT,t.unpackAlignment);let y=H.getParameter(V.UNPACK_ROW_LENGTH),b=H.getParameter(V.UNPACK_IMAGE_HEIGHT),x=H.getParameter(V.UNPACK_SKIP_PIXELS),S=H.getParameter(V.UNPACK_SKIP_ROWS),C=H.getParameter(V.UNPACK_SKIP_IMAGES);H.pixelStorei(V.UNPACK_ROW_LENGTH,h.width),H.pixelStorei(V.UNPACK_IMAGE_HEIGHT,h.height),H.pixelStorei(V.UNPACK_SKIP_PIXELS,l),H.pixelStorei(V.UNPACK_SKIP_ROWS,u),H.pixelStorei(V.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=U.get(e),r=U.get(t),h=U.get(n.__renderTarget),g=U.get(r.__renderTarget);H.bindFramebuffer(V.READ_FRAMEBUFFER,h.__webglFramebuffer),H.bindFramebuffer(V.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,U.get(e).__webglTexture,i,d+n),V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,U.get(t).__webglTexture,a,m+n)),V.blitFramebuffer(l,u,o,s,f,p,o,s,V.DEPTH_BUFFER_BIT,V.NEAREST);H.bindFramebuffer(V.READ_FRAMEBUFFER,null),H.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||U.has(e)){let n=U.get(e),r=U.get(t);H.bindFramebuffer(V.READ_FRAMEBUFFER,te),H.bindFramebuffer(V.DRAW_FRAMEBUFFER,F);for(let e=0;e<c;e++)w?V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):V.framebufferTexture2D(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,n.__webglTexture,i),T?V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):V.framebufferTexture2D(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,r.__webglTexture,a),i===0?T?V.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):V.copyTexSubImage2D(v,a,f,p,l,u,o,s):V.blitFramebuffer(l,u,o,s,f,p,o,s,V.COLOR_BUFFER_BIT,V.NEAREST);H.bindFramebuffer(V.READ_FRAMEBUFFER,null),H.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?V.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?V.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):V.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):V.texSubImage2D(V.TEXTURE_2D,a,f,p,o,s,g,_,h);H.pixelStorei(V.UNPACK_ROW_LENGTH,y),H.pixelStorei(V.UNPACK_IMAGE_HEIGHT,b),H.pixelStorei(V.UNPACK_SKIP_PIXELS,x),H.pixelStorei(V.UNPACK_SKIP_ROWS,S),H.pixelStorei(V.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&V.generateMipmap(v),H.unbindTexture()},this.initRenderTarget=function(e){U.get(e).__webglFramebuffer===void 0&&W.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?W.setTextureCube(e,0):e.isData3DTexture?W.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?W.setTexture2DArray(e,0):W.setTexture2D(e,0),H.unbindTexture()},this.resetState=function(){ne=0,I=0,L=null,H.reset(),Ze.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return rt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=kt._getDrawingBufferColorSpace(e),t.unpackColorSpace=kt._getUnpackColorSpace()}},ia=[`chant`,`music`,`ambience`,`sfx`],aa=[`sfx_horn_motorbike_01`,`sfx_horn_motorbike_02`];[...aa];var oa={chant_intro:`chant`,chant_ask:`chant`,chant_not_yet:`chant`,chant_open:`chant`,chant_hunt:`chant`,caught:`chant`,drum_loop:`music`,amb_market:`ambience`,amb_generator:`ambience`,sfx_horn_motorbike_01:`sfx`,sfx_horn_motorbike_02:`sfx`,sfx_rooster_01:`sfx`,sfx_paint:`sfx`,jingle_win:`sfx`,jingle_caught:`sfx`},sa=new Set(aa),ca=`boju.muted`;function la(e,t=.6){let n=Math.max(1,Math.round(e.sampleRate*t)),r=e.createBuffer(2,n,e.sampleRate);for(let e=0;e<2;e++){let t=r.getChannelData(e);for(let e=0;e<n;e++)t[e]=(Math.random()*2-1)*(1-e/n)**3}return r}function ua(e,t,n,r,i={}){let a=e.createBiquadFilter();a.type=`lowpass`,a.frequency.value=i.cutoff??1200,a.Q.value=.7;let o=e.createGain();o.gain.value=i.gain??.45;let s=e.createGain(),c=e.createConvolver();c.buffer=r;let l=e.createGain();return l.gain.value=i.wet??.35,t.connect(a).connect(o),o.connect(s).connect(n),o.connect(c).connect(l).connect(n),[a,o,s,c,l]}var da={chant_intro:110,chant_ask:140,chant_not_yet:100,chant_open:170,chant_hunt:200,caught:70},fa=44100;function pa(e,t,n,r,i){let a=e.createOscillator(),o=e.createGain();a.type=`sine`,a.frequency.setValueAtTime(n*2,t),a.frequency.exponentialRampToValueAtTime(n,t+.08),o.gain.setValueAtTime(i,t),o.gain.exponentialRampToValueAtTime(.001,t+r),a.connect(o).connect(e.destination),a.start(t),a.stop(t+r);let s=e.createOscillator(),c=e.createGain();s.type=`triangle`,s.frequency.setValueAtTime(n*4,t),c.gain.setValueAtTime(i*.4,t),c.gain.exponentialRampToValueAtTime(.001,t+.05),s.connect(c).connect(e.destination),s.start(t),s.stop(t+.06)}async function ma(e){if(e===`drum_loop`){let e=new OfflineAudioContext(1,fa*2,fa);return[0,.5,1,1.5].forEach((t,n)=>pa(e,t,n%2?150:80,.3,.8)),pa(e,.75,180,.15,.4),pa(e,1.75,180,.15,.4),e.startRendering()}if(e===`amb_market`||e===`amb_generator`){let t=new OfflineAudioContext(1,fa*4,fa),n=t.createBuffer(1,fa*4,fa),r=n.getChannelData(0);for(let e=0;e<r.length;e++){let t=Math.min(e,r.length-e)/(fa*.25);r[e]=(Math.random()*2-1)*Math.min(1,t)}let i=t.createBufferSource();i.buffer=n;let a=t.createBiquadFilter();a.type=`lowpass`,a.frequency.value=e===`amb_market`?400:1400;let o=t.createGain();return o.gain.value=.35,i.connect(a).connect(o).connect(t.destination),i.start(),t.startRendering()}let t=new OfflineAudioContext(1,Math.round(fa*.4),fa);return pa(t,0,da[e]??120,.35,.9),t.startRendering()}function ha(e,t,n,r){e.positionX?(e.positionX.value=t,e.positionY.value=n,e.positionZ.value=r):e.setPosition(t,n,r)}var ga=new class{ctx=null;master;channelGain={};volumes={chant:1,music:.7,ambience:.6,sfx:1};muted=!1;buffers=new Map;warned=new Set;voices=new Set;stopGen=new Map;impulse=null;chantToken=0;chantReadyFlag=!1;chantPhase=`idle`;suspicion=0;heartTimer=null;constructor(){try{this.muted=localStorage.getItem(ca)===`1`}catch{}}get unlocked(){return this.ctx!==null}async unlock(){if(!this.ctx){let e=window.AudioContext??window.webkitAudioContext;this.ctx=new e,this.master=this.ctx.createGain(),this.master.gain.value=+!this.muted,this.master.connect(this.ctx.destination);for(let e of ia){let t=this.ctx.createGain();t.gain.value=this.volumes[e],t.connect(this.master),this.channelGain[e]=t}}this.ctx.state!==`running`&&await this.ctx.resume()}async suspend(){this.ctx&&this.ctx.state===`running`&&await this.ctx.suspend()}async resume(){this.ctx&&this.ctx.state===`suspended`&&await this.ctx.resume()}isMuted(){return this.muted}setMuted(e){this.muted=e;try{localStorage.setItem(ca,e?`1`:`0`)}catch{}this.ctx&&this.master.gain.setTargetAtTime(+!e,this.ctx.currentTime,.03)}getVolume(e){return this.volumes[e]}setVolume(e,t){this.volumes[e]=Math.min(1,Math.max(0,t)),this.ctx&&this.channelGain[e].gain.setTargetAtTime(this.volumes[e],this.ctx.currentTime,.03)}setListener(e,t,n,r=0,i=0,a=-1){if(!this.ctx)return;let o=this.ctx.listener,s=this.ctx.currentTime;o.positionX?(o.positionX.setTargetAtTime(e,s,.03),o.positionY.setTargetAtTime(t,s,.03),o.positionZ.setTargetAtTime(n,s,.03),o.forwardX.value=r,o.forwardY.value=i,o.forwardZ.value=a,o.upX.value=0,o.upY.value=1,o.upZ.value=0):(o.setPosition(e,t,n),o.setOrientation(r,i,a,0,1,0))}loadBuffer(e){let t=this.buffers.get(e);return t||(t=this.fetchOrSynth(e),this.buffers.set(e,t)),t}async fetchOrSynth(e){if(!this.ctx)return null;try{let t=await fetch(`./audio/${e}.ogg`);if(!t.ok)throw Error(`HTTP ${t.status}`);return await this.ctx.decodeAudioData(await t.arrayBuffer())}catch(t){this.warned.has(e)||(this.warned.add(e),console.warn(`[audio] ${e}.ogg unavailable (${String(t)}), using synthesized placeholder`));try{return await ma(e)}catch(t){return console.warn(`[audio] placeholder for ${e} failed`,t),null}}}preload(e){return Promise.all(e.map(e=>this.loadBuffer(e)))}async start(e,t){let n=this.ctx;if(!n)return null;let r=this.stopGen.get(e)??0,i=await this.loadBuffer(e);if(!i||(this.stopGen.get(e)??0)!==r)return null;let a=t.channel??oa[e],o=n.createBufferSource();o.buffer=i,o.loop=t.loop??!1;let s=n.createGain(),c=t.volume??1,l=n.currentTime;t.fadeIn?(s.gain.setValueAtTime(0,l),s.gain.linearRampToValueAtTime(c,l+t.fadeIn)):s.gain.value=c;let u=t.distant??sa.has(e),d=[],f=0,p=null,m=this.channelGain[a];if(t.spatial){let e=t.spatial;p=n.createPanner(),p.panningModel=`equalpower`,p.distanceModel=`inverse`,p.refDistance=e.refDistance??2,p.maxDistance=e.maxDistance??30,p.rolloffFactor=e.rolloff??1.5,ha(p,e.position.x,e.position.y,e.position.z),p.connect(m),m=p}if(u){let e=u===!0?{}:u;this.impulse??=la(n,e.reverbSeconds??.6);let t=e.reverbSeconds?la(n,e.reverbSeconds):this.impulse;d=ua(n,s,m,t,e),f=((e.reverbSeconds??.6)+.1)*1e3,o.connect(s)}else o.connect(s).connect(m);let h,g=new Promise(e=>h=e),_={name:e,voice:null},v={name:e,duration:i.duration,ended:g,stop:(e=0)=>{let t=n.currentTime;if(e>0){s.gain.cancelScheduledValues(t),s.gain.setValueAtTime(s.gain.value,t),s.gain.linearRampToValueAtTime(0,t+e);try{o.stop(t+e+.02)}catch{}}else try{o.stop()}catch{}},setPosition:(e,t,n)=>{p&&ha(p,e,t,n)}};return _.voice=v,this.voices.add(_),o.onended=()=>{this.voices.delete(_),o.disconnect(),h(),window.setTimeout(()=>{s.disconnect(),p?.disconnect(),d.forEach(e=>e.disconnect())},f)},o.start(),v}playOnce(e,t={}){return this.start(e,{...t,loop:!1})}loop(e,t={}){return this.start(e,{...t,loop:!0})}stop(e,t=0){this.stopGen.set(e,(this.stopGen.get(e)??0)+1);for(let n of[...this.voices])n.name===e&&n.voice.stop(t)}stopAll(e=0){this.cancelChant(),this.setSuspicion(0);for(let t of[...this.voices])t.voice.stop(e)}async crossfade(e,t,n=2){return this.stop(e,n),this.loop(t,{fadeIn:n})}get chantState(){return this.chantPhase}async startChant(e={}){if(!this.ctx)return`cancelled`;this.cancelChant();let t=++this.chantToken;this.chantReadyFlag=!1;let n=e.timeoutMs??2e4,r=t=>{this.chantPhase=t,e.onPhase?.(t)},i=()=>t===this.chantToken,a=async t=>{let n=await this.playOnce(t);n&&i()&&(e.onLine?.(t,n.duration),await n.ended)},o=`timeout`,s=performance.now()+n;try{for(r(`intro`),await a(`chant_intro`),r(`asking`);i()&&!this.chantReadyFlag&&performance.now()<s&&(await a(`chant_ask`),!(!i()||this.chantReadyFlag||performance.now()>=s));)await a(`chant_not_yet`);return!i()||(o=this.chantReadyFlag?`ready`:`timeout`,r(`open`),await a(`chant_open`),!i())?`cancelled`:(r(`hunt`),await a(`chant_hunt`),i()?o:`cancelled`)}finally{i()&&r(`idle`)}}chantReady(){this.chantReadyFlag=!0}cancelChant(){this.chantToken++;for(let e of[`chant_intro`,`chant_ask`,`chant_not_yet`,`chant_open`,`chant_hunt`])this.stop(e);this.chantPhase=`idle`}setSuspicion(e){this.suspicion=Math.min(1,Math.max(0,e)),this.ctx&&(this.suspicion<=.02?(this.heartTimer!==null&&window.clearTimeout(this.heartTimer),this.heartTimer=null):this.heartTimer===null&&this.beat())}beat(){let e=this.ctx;if(!e||this.suspicion<=.02){this.heartTimer=null;return}let t=this.suspicion,n=.15+.85*t,r=e.currentTime;this.thump(r,58,n),this.thump(r+.17-.05*t,46,n*.7);let i=1.1-.75*t;this.heartTimer=window.setTimeout(()=>this.beat(),i*1e3)}thump(e,t,n){let r=this.ctx,i=r.createOscillator(),a=r.createGain();i.type=`sine`,i.frequency.setValueAtTime(t*1.6,e),i.frequency.exponentialRampToValueAtTime(t,e+.06),a.gain.setValueAtTime(n,e),a.gain.exponentialRampToValueAtTime(.001,e+.16),i.connect(a).connect(this.channelGain.sfx),i.start(e),i.stop(e+.18),i.onended=()=>a.disconnect()}},_a=Math.PI*2,va=e=>1-(1-Math.min(1,Math.max(0,e)))**3,ya={sing_eyes_covered:e=>{let t=Math.sin(e*1.8);return{body:{rz:t*.035,rx:.02},head:{rz:-t*.1,ry:Math.sin(e*.9)*.1,py:Math.abs(Math.sin(e*3.6))*.012},shoulderL:{rx:-1.9,rz:.62},shoulderR:{rx:-1.9,rz:-.62},elbowL:{rx:-1.5},elbowR:{rx:-1.5},footL:{py:Math.max(0,t)*.03},footR:{py:Math.max(0,-t)*.03}}},search_walk:e=>{let t=e*_a*.9,n=Math.sin(t);return{root:{py:Math.abs(Math.cos(t))*.02},body:{rx:.05,rz:n*.03},head:{ry:Math.sin(e*.8)*.75,rx:.05},shoulderL:{rx:n*.4,rz:-.3},shoulderR:{rx:-n*.4,rz:.3},elbowL:{rx:-.35},elbowR:{rx:-.35},footL:{pz:n*.18,py:Math.max(0,Math.cos(t))*.07},footR:{pz:-n*.18,py:Math.max(0,-Math.cos(t))*.07}}},look_around:e=>{let t=Math.sin(e*1.1);return{body:{ry:Math.sin(e*1.1-.7)*.25,rx:.03},head:{ry:t*1,rx:.04,rz:Math.sin(e*2.2)*.04},shoulderR:{rx:-2.3,rz:-.25},elbowR:{rx:-1.5},shoulderL:{rx:0,rz:-.5},elbowL:{rx:-.9}}},suspicious_lean:e=>({body:{rx:.3,rz:.03+Math.sin(e*1.3)*.015},head:{rx:.15,rz:.25,ry:Math.sin(e*.8)*.2},shoulderL:{rx:-1.7,rz:.4},elbowL:{rx:-2.1},shoulderR:{rx:.4,rz:-.25},elbowR:{rx:-.4},footL:{pz:.12},footR:{pz:-.06}}),catch_lunge:e=>{let t=va(e/.3);return{root:{py:.01*t},body:{rx:.4*t},head:{rx:-.2*t,ry:Math.sin(e*6)*.03*t},shoulderR:{rx:-1.75*t,rz:.12*t},elbowR:{rx:-.15*t},shoulderL:{rx:.35*t,rz:-.5*t},elbowL:{rx:-.4*t},footL:{pz:.26*t},footR:{pz:-.2*t}}},victory_dance:e=>{let t=e*_a*1.4,n=Math.sin(t);return{root:{py:Math.abs(n)*.1,ry:e*4.5},body:{rz:n*.06},head:{rz:-n*.12,rx:-.1},shoulderL:{rx:-2.7,rz:-.55+n*.3},shoulderR:{rx:-2.7,rz:.55-n*.3},elbowL:{rx:-.3},elbowR:{rx:-.3},footL:{py:Math.max(0,n)*.08},footR:{py:Math.max(0,-n)*.08}}}},ba=`#8e1b1b`,xa=`#2a2f72`,Sa=`#d4a017`,Ca=`#efe6d2`,wa=`#15151a`,Ta=`#1f4fb0`,Ea=`#4a2a14`,Da=[ba,xa,Sa,Ca,wa,Ta],Oa=1.72,ka=1.5,Aa=.36,ja=.18,Ma=[{n:12,r0:.26,R:.42,y:1.74,base:[Ta,Ca],hem:Sa,decor:!1,clearance:.47,fields:[],bar:!1,fringe:!1,trim:[Ca,Ta]},{n:16,r0:.29,R:.66,y:1.72,base:[ba,wa],hem:Ca,decor:!1,clearance:.4,fields:[1],bar:!1,fringe:!1,trim:[Ta,ba]},{n:22,r0:.32,R:.95,y:1.7,base:[ba,Ta,ba,xa],hem:Sa,decor:!0,clearance:.32,fields:[1,2],bar:!0,fringe:!0,trim:[Ta,ba]}],Na={[ba]:[wa,Sa,Ca],[Ta]:[wa,ba,Sa],[xa]:[wa,Sa,ba],[wa]:[ba,Sa,wa],[Ca]:[Ta,ba,Sa]},Pa=[.3,.3,.28,.12],Fa=Pa.length,Ia=.022;function La(){let e=new mt,t=new mt;e.add(t);let n={root:t},r=[],i=(e,t,i=0,a=0,o=0)=>{let s=new Ue;return r.push(s),s.position.set(i,a,o),t.add(s),n[e]=s,s},a=[],o=(e,t)=>{let n=Ct(e,t);return a.push(n),n},c=(e,t,n=0,r=0,i=0)=>{let a=new Pt(e,t);return a.position.set(n,r,i),a},l=i(`body`,t,0,0,0),u=i(`head`,l,0,Oa,0),d=i(`shoulderL`,l,-.36,ka),f=i(`shoulderR`,l,Aa,ka),m=i(`elbowL`,d,0,-.42),h=i(`elbowR`,f,0,-.42),g=i(`footL`,t,-.16,.07,.04),_=i(`footR`,t,.16,.07,.04),v=o(Sa),y=o(`#14122a`,{side:2});l.add(c(J(new Ze(.2,.455,1.7,12,1,!0)),y,0,1.15,0));let b=o(wa),x=o(Ca),S=o(ba);for(let e of[g,_]){e.add(c(J(new Ze(.075,.088,.3,7)),b,0,.08,0)),e.add(c(J(new Ze(.082,.082,.04,7)),v,0,.2,0)),e.add(c(J(new Ze(.081,.085,.025,7)),S,0,.12,0));let t=c(J(new O(.09,6,5)),b,0,-.02,.06);t.scale.set(1,.6,1.5);let n=c(J(new O(.055,6,4)),x,0,-.02,.15);n.scale.set(1,.7,.9),e.add(t,n)}let C=o(ba),w=o(Ea);for(let[e,t]of[[d,m],[f,h]]){e.add(c(J(new O(.09,6,5)),C)),e.add(c(J(new Ze(.085,.07,.42,6).translate(0,-.21,0)),C)),t.add(c(J(new Ze(.07,.095,.36,6).translate(0,-.18,0)),C)),t.add(c(J(new Ze(.1,.1,.05,8)),v,0,-.34,0));let n=c(J(new O(.075,6,5)),x,0,-.41,0);n.scale.set(1,1.5,.85),t.add(n)}let T=o(ba),E=c(J(new O(.22,12,9)),T,0,ja,0);E.scale.set(1,1.2,1.1),u.add(E),u.add(c(J(new Ze(.15,.19,.08,10)),v,0,0,0)),u.add(c(J(new z(.2,.022,5,14)).rotateX(Math.PI/2),v,0,.31,0));let D=.16,k=.245,ee=o(`#4a4a58`),j=1.05,M=c(J(new Ze(k,k,.2,12,1,!0,-1.05/2,j)),o(`#0b0b10`,{side:2}),0,D,0);M.scale.z=1.1,u.add(M);let N=.249;for(let e=0;e<=8;e++){let t=-1.05/2+j*e/8,n=c(new ke(.006,.2,.006),ee,Math.sin(t)*N,D,Math.cos(t)*N*1.1);n.rotation.y=t,u.add(n)}for(let e=0;e<=4;e++){let t=.06+.05*e;for(let e=0;e<8;e++){let n=-1.05/2+j*e/8,r=-1.05/2+j*(e+1)/8,i=(n+r)/2,a=2*N*Math.sin((r-n)/2),o=c(new ke(a,.006,.006),ee,Math.sin(i)*N,t,Math.cos(i)*N*1.1);o.rotation.y=i,u.add(o)}}let P=o(Ca),te=J(new O(.02,6,4)),F=(e,t,n,r=1)=>{let i=c(te,P,Math.sin(e)*n,t,Math.cos(e)*n*1.1);i.rotation.y=e,i.scale.set(.85*r,1.25*r,.7*r),u.add(i)};for(let e=0;e<9;e++)F(-1.05/2+j*e/8,.275,.261,1.1);for(let e=0;e<6;e++){let t=-.445+.89*e/5;for(let e=0;e<4;e++)F(t,.23-e*.045,.265)}u.add(c(J(new Ze(.045,.07,.16,6)),w,0,.49,0));for(let e of[0,.07,.14])u.add(c(J(new z(.062-e*.15,.011,4,10)).rotateX(Math.PI/2),v,0,.42+e,0));let ne=c(J(new Ze(.12,.12,.035,12)),w,0,.69,0);ne.rotation.x=Math.PI/2,u.add(ne),u.add(c(J(new z(.12,.012,4,14)),v,0,.69,.022)),u.add(c(J(new z(.07,.01,4,12)),v,0,.69,.022)),u.add(c(J(new O(.03,6,4)),o(ba),0,.69,.03)),u.add(c(J(new Ze(.19,.17,.025,12)),w,0,.565,0)),u.add(c(J(new z(.185,.012,4,14)).rotateX(Math.PI/2),v,0,.58,0)),u.add(c(J(new de(.04,.1,6)),w,0,.8600000000000001,0)),u.add(c(J(new O(.03,6,5)),w,0,.9400000000000001,0)),u.add(c(J(new de(.03,.05,5)),v,0,.9950000000000001,0));for(let e of[-1,1]){let t=c(new ke(.075,.014,.014),w,e*.05,.91,0);t.rotation.z=e*.6,u.add(t)}let I=[],re=[],L=[],R=[],ie=0;Ma.forEach((e,t)=>{let n=e.y-e.clearance,r=Math.atan((e.R-e.r0)/n),i=Math.hypot(n,e.R-e.r0),a=_a*e.r0/e.n*.95,o=_a*e.R/e.n*1.22;for(let n=0;n<e.n;n++){let s=(n+t%2*.5)/e.n*_a,c=new je().makeRotationY(s).setPosition(Math.sin(s)*e.r0,e.y,Math.cos(s)*e.r0),l=0,u=[],d=[],f=[];Pa.forEach(e=>{let t=i*e;u.push(t),d.push(a+(o-a)*(l/i)),l+=t,f.push(a+(o-a)*(l/i))});let p={anchor:c,slope:r,tier:t,base:ie,lens:u,top:d,bottom:f,ax:[-r,0,0,0],az:[0,0,0,0],vx:[0,0,0,0],vz:[0,0,0,0],phase:Math.random()*_a,out:[Math.sin(s),Math.cos(s)],tiles:[],decors:[]},m=e.base[n%e.base.length];for(let t=0;t<Fa;t++)R.push(t===Fa-1?e.hem:m);ie+=Fa;let h=I.length;I.push(p);let g=e=>(d[e]+f[e])/2,[_,v,y]=Na[m];e.bar&&L.push({panel:h,seg:0,x:0,y:.1,w:g(0)*.7,h:u[0]*.12,rot:0,layer:0,color:Sa}),e.fields.forEach((e,t)=>{let n=g(e)*.76,r=Math.min(n*.62,u[e]*.3);L.push({panel:h,seg:e,x:0,y:.5,w:n,h:u[e]*.84,rot:0,layer:0,color:_}),L.push({panel:h,seg:e,x:0,y:.5,w:r,h:r,rot:Math.PI/4,layer:1,color:t%2?y:v}),L.push({panel:h,seg:e,x:0,y:.5,w:r*.45,h:r*.45,rot:Math.PI/4,layer:2,color:_})});let b=Fa-1;if(e.trim){let t=g(b)/5/Math.SQRT2;for(let n=0;n<5;n++)L.push({panel:h,seg:b,x:(n+.5)/5-.5,y:.5,w:t,h:t,rot:Math.PI/4,layer:0,color:e.trim[n%2]})}if(e.fringe){let t=.075;for(let n=0;n<6;n++)L.push({panel:h,seg:b,x:(n+.5)/6-.5,y:1+(t/2-.01)/u[b],w:g(b)/6*.4,h:t,rot:0,layer:-1,color:e.hem})}if(e.decor){let t=[.04,.055,.02],n=[.026,.026,.008];re.push({panel:h,seg:0,x:-.2,y:.45,size:t},{panel:h,seg:0,x:.2,y:.75,size:t});for(let t of e.fields)for(let e of[-.3,.3])for(let r of[.12,.88])re.push({panel:h,seg:t,x:e,y:r,size:n})}}}),L.forEach((e,t)=>I[e.panel].tiles.push(t)),re.forEach((e,t)=>I[e.panel].decors.push(t));let ae=ie,ce=new ke(1,1,1).translate(0,-.5,0),le=new p({color:16777215,gradientMap:Pe()});a.push(le);let ue=new Float32Array(ae);I.forEach(e=>{for(let t=0;t<Fa;t++)ue[e.base+t]=e.top[t]/e.bottom[t]}),ce.setAttribute(`aTaper`,new Ee(ue,1)),le.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
attribute float aTaper;`).replace(`#include <begin_vertex>`,`#include <begin_vertex>
transformed.x *= mix(aTaper, 1.0, clamp(-position.y, 0.0, 1.0));`)},le.customProgramCacheKey=()=>`egungun-panel-taper`;let B=new oe(ce,le,ae),fe=new s;R.forEach((e,t)=>B.setColorAt(t,fe.set(e)));let pe=new ke(1,1,1),me=new oe(pe,o(`#ffffff`),Math.max(1,L.length));L.forEach((e,t)=>me.setColorAt(t,fe.set(e.color)));let he=J(new O(1,6,4)),_e=new oe(he,o(`#ffffff`),Math.max(1,re.length));re.forEach((e,t)=>_e.setColorAt(t,fe.set(e.size[2]>.01?Ca:Sa)));for(let e of[B,me,_e])e.instanceMatrix.setUsage(A),e.frustumCulled=!1,l.add(e);let ve=Array.from({length:Fa},()=>new je),ye=new je,be=new je,xe=new se;function Se(){for(let e of I){ye.copy(e.anchor);for(let t=0;t<Fa;t++)be.makeRotationFromEuler(xe.set(e.ax[t],0,e.az[t])),t>0&&be.setPosition(0,-e.lens[t-1],0),ye.multiply(be),ve[t].copy(ye),B.setMatrixAt(e.base+t,be.copy(ye).multiply(Ce.makeScale(e.bottom[t],e.lens[t],Ia)));for(let t of e.tiles){let n=L[t],r=(e.top[n.seg]+e.bottom[n.seg])/2,i=n.layer<0?0:.013999999999999999+n.layer*.004;be.copy(ve[n.seg]).multiply(Ce.makeTranslation(n.x*r,-n.y*e.lens[n.seg],i)),be.multiply(we.makeRotationZ(n.rot)),me.setMatrixAt(t,be.multiply(Ce.makeScale(n.w,n.h,n.layer<0?Ia:.006)))}for(let t of e.decors){let n=re[t],r=(e.top[n.seg]+e.bottom[n.seg])/2;be.copy(ve[n.seg]).multiply(Ce.makeTranslation(n.x*r,-n.y*e.lens[n.seg],.023+n.size[2]*.5)),_e.setMatrixAt(t,be.multiply(Ce.makeScale(n.size[0],n.size[1],n.size[2])))}}B.instanceMatrix.needsUpdate=!0,me.instanceMatrix.needsUpdate=!0,_e.instanceMatrix.needsUpdate=!0}let Ce=new je,we=new je,Te=Ct(`#ffffff`,{vertexColors:!0});a.push(Te);let V=[],De=[];t.traverse(e=>{e instanceof Pt&&!e.isInstancedMesh&&(e.material===y?V:De).push(e)});let Oe=U(t,r,[{meshes:V,material:y,vertexColors:!1},{meshes:De,material:Te,vertexColors:!0}]),H=new Me(n,ya,`search_walk`,.25);Se();let Ae=new q,W=new q,G=new ge,Ne=new q,K=new q,Fe=new q,Ie=0,Le=0,Re=0,ze=!1,Be=new q(0,1.72,0),Ve=()=>new se().setFromQuaternion(t.getWorldQuaternion(G),`YXZ`).y,He=6.2,We=[.05,.07,.09,.11],Ge=[.006,.01,.014,.018],Ke=[.5,1,1,1],qe=e=>Math.max(-.5,Math.min(.5,e));function Je(t){if(H.update(t),t=Math.min(t,1/30),t<=0)return;Re+=t,l.localToWorld(W.copy(Be));let n=Ve();ze||=(Ae.copy(W),Ie=n,!0);let r=W.clone().sub(Ae).divideScalar(t);Ae.copy(W);let i=n-Ie;i=Math.atan2(Math.sin(i),Math.cos(i)),Ie=n,Le+=(i/t-Le)*.25,e.getWorldQuaternion(G).invert(),r.applyQuaternion(G),K.copy(Ne),Ne.lerp(r,.3),Fe.copy(Ne).sub(K).divideScalar(t),Fe.clampLength(0,30);let a=Math.min(.33,Math.abs(Le)*.07);for(let e of I){let[n,r]=e.out,i=Ne.x*n+Ne.z*r,o=Ne.x*r-Ne.z*n,s=Fe.x*n+Fe.z*r,c=Fe.x*r-Fe.z*n;for(let n=0;n<Fa;n++){let r=Math.sin(Re*1.7+e.phase+n*.7)*(.012+.012*n),l=n===0?-e.slope:0,u=qe(l+We[n]*i+Ge[n]*s-a*Ke[n]+r),d=qe(We[n]*o+Ge[n]*c+Math.cos(Re*1.3+e.phase)*.008*(n+1));e.vx[n]+=((u-e.ax[n])*40-e.vx[n]*He)*t,e.vz[n]+=((d-e.az[n])*40-e.vz[n]*He)*t,e.ax[n]+=e.vx[n]*t,e.az[n]+=e.vz[n]*t}}Se()}return{group:e,animator:H,play:(e,t)=>H.play(e,t),update:Je,dispose(){Oe.forEach(e=>e.geometry.dispose()),ce.dispose(),he.dispose(),pe.dispose(),B.dispose(),me.dispose(),_e.dispose(),a.forEach(e=>e.dispose())}}}function Ra(e){e.setPixelRatio(Math.min(window.devicePixelRatio||1,2))}var za=Math.PI*2,Ba=(e,t)=>e+Math.random()*(t-e);function Va(e){return new he({uniforms:{uScale:{value:500}},vertexShader:`
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
      }`,transparent:!0,depthWrite:!1,blending:e?2:1})}var Ha=class{capacity;points;material;pos;col;size;alpha;geo=new Ft;constructor(e,t){this.capacity=e,this.pos=new Float32Array(e*3),this.col=new Float32Array(e*3),this.size=new Float32Array(e),this.alpha=new Float32Array(e),this.geo.setAttribute(`position`,new Et(this.pos,3).setUsage(A)),this.geo.setAttribute(`aColor`,new Et(this.col,3).setUsage(A)),this.geo.setAttribute(`aSize`,new Et(this.size,1).setUsage(A)),this.geo.setAttribute(`aAlpha`,new Et(this.alpha,1).setUsage(A)),this.material=Va(t),this.points=new o(this.geo,this.material),this.points.frustumCulled=!1}set(e,t,n,r,i,a,o,s,c){let l=e*3;this.pos[l]=t,this.pos[l+1]=n,this.pos[l+2]=r,this.col[l]=i,this.col[l+1]=a,this.col[l+2]=o,this.size[e]=s,this.alpha[e]=c}setMotion(e,t,n,r,i,a){let o=e*3;this.pos[o]=t,this.pos[o+1]=n,this.pos[o+2]=r,this.size[e]=i,this.alpha[e]=a}hide(e){this.size[e]=0,this.alpha[e]=0}flush(e=!0){let t=this.geo.attributes;t.position.needsUpdate=!0,t.aSize.needsUpdate=!0,t.aAlpha.needsUpdate=!0,e&&(t.aColor.needsUpdate=!0)}dispose(){this.geo.dispose(),this.material.dispose()}},Ua=320,Wa=9,Ga=class{pool=new Ha(Ua,!1);vel=new Float32Array(Ua*3);px=new Float32Array(Ua*3);life=new Float32Array(Ua);maxLife=new Float32Array(Ua);size0=new Float32Array(Ua);cursor=0;active=0;dirtyColors=!1;c=new s;constructor(){for(let e=0;e<Ua;e++)this.pool.hide(e);this.pool.flush()}emit(e,t,n){this.c.set(t);for(let t=0;t<n;t++){let t=this.cursor;this.cursor=(this.cursor+1)%Ua;let n=Ba(0,za),r=Ba(.2,1),i=Ba(1.2,3.4),a=t*3;this.vel[a]=Math.cos(n)*i*(1-r*.5),this.vel[a+1]=r*i*1.4+.8,this.vel[a+2]=Math.sin(n)*i*(1-r*.5),this.px[a]=e.x+Ba(-.04,.04),this.px[a+1]=e.y+Ba(-.04,.04),this.px[a+2]=e.z+Ba(-.04,.04);let o=Ba(.85,1.15);this.maxLife[t]=this.life[t]=Ba(.5,.9),this.size0[t]=Ba(.05,.11),this.pool.set(t,this.px[a],this.px[a+1],this.px[a+2],Math.min(1,this.c.r*o),Math.min(1,this.c.g*o),Math.min(1,this.c.b*o),this.size0[t],1)}this.dirtyColors=!0,this.active=Ua}update(e){if(!this.active)return;let t=0;for(let n=0;n<Ua;n++){if(this.life[n]<=0)continue;if(this.life[n]-=e,this.life[n]<=0){this.pool.hide(n);continue}t++;let r=n*3;this.vel[r+1]-=Wa*e,this.px[r]+=this.vel[r]*e,this.px[r+1]+=this.vel[r+1]*e,this.px[r+2]+=this.vel[r+2]*e,this.px[r+1]<.02&&(this.px[r+1]=.02,this.vel[r]*=.4,this.vel[r+1]=0,this.vel[r+2]*=.4);let i=this.life[n]/this.maxLife[n];this.pool.setMotion(n,this.px[r],this.px[r+1],this.px[r+2],this.size0[n]*(.4+.6*i),Math.min(1,i*2))}this.pool.flush(this.dirtyColors),this.dirtyColors=!1,this.active=t}},Ka=160,qa=class{mesh;geo=new ce(.07,.24);mat=Ct(`#ffffff`,{side:2});pos=new Float32Array(480);vel=new Float32Array(480);rot=new Float32Array(480);spin=new Float32Array(480);life=new Float32Array(Ka);cursor=0;active=0;dummy=new ne;c=new s;t=0;constructor(){this.mesh=new oe(this.geo,this.mat,Ka),this.mesh.instanceMatrix.setUsage(A),this.mesh.frustumCulled=!1,this.dummy.scale.setScalar(0),this.dummy.updateMatrix();for(let e=0;e<Ka;e++)this.mesh.setMatrixAt(e,this.dummy.matrix),this.mesh.setColorAt(e,this.c.set(`#ffffff`))}burst(e,t,n){for(let r=0;r<n;r++){let n=this.cursor;this.cursor=(this.cursor+1)%Ka;let r=Ba(0,za),i=Ba(.8,3.2),a=n*3;this.pos[a]=e.x,this.pos[a+1]=e.y,this.pos[a+2]=e.z,this.vel[a]=Math.cos(r)*i,this.vel[a+1]=Ba(3.5,7),this.vel[a+2]=Math.sin(r)*i;for(let e=0;e<3;e++)this.rot[a+e]=Ba(0,za),this.spin[a+e]=Ba(-9,9);this.life[n]=Ba(2.2,3.2),this.mesh.setColorAt(n,this.c.set(t[Math.random()*t.length|0]))}this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0),this.active=Ka}update(e){if(!this.active)return;this.t+=e;let t=0,n=this.dummy;for(let r=0;r<Ka;r++){if(this.life[r]<=0)continue;this.life[r]-=e;let i=r*3;if(this.life[r]<=0)n.scale.setScalar(0),n.updateMatrix(),this.mesh.setMatrixAt(r,n.matrix);else{if(t++,this.pos[i+1]<=.015)this.rot[i]+=(-Math.PI/2-this.rot[i])*Math.min(1,e*10);else{this.vel[i+1]=Math.max(this.vel[i+1]-9*e,-1.1);let t=Math.exp(-2.2*e);this.vel[i]=this.vel[i]*t+Math.sin(this.t*5+r)*.5*e,this.vel[i+2]=this.vel[i+2]*t+Math.cos(this.t*4+r)*.5*e,this.pos[i]+=this.vel[i]*e,this.pos[i+1]=Math.max(.015,this.pos[i+1]+this.vel[i+1]*e),this.pos[i+2]+=this.vel[i+2]*e,this.rot[i]+=this.spin[i]*e,this.rot[i+1]+=this.spin[i+1]*e,this.rot[i+2]+=this.spin[i+2]*e}n.position.set(this.pos[i],this.pos[i+1],this.pos[i+2]),n.rotation.set(this.rot[i],this.rot[i+1],this.rot[i+2]),n.scale.setScalar(Math.min(1,this.life[r]/.5)),n.updateMatrix(),this.mesh.setMatrixAt(r,n.matrix)}}this.mesh.instanceMatrix.needsUpdate=!0,this.active=t}dispose(){this.geo.dispose(),this.mat.dispose(),this.mesh.dispose()}},Ja=140,Ya=class{pool=new Ha(Ja,!0);base=new Float32Array(420);phase=new Float32Array(420);beam=new Float32Array(Ja);t=0;center=new q(0,1.6,0);size=new q(14,3.2,8);lightDir=new q(-.5,-1,-.6).normalize();constructor(){this.scatter()}setArea(e,t,n){this.center.copy(e),this.size.copy(t),n&&this.lightDir.copy(n).normalize(),this.scatter()}scatter(){let e=new q,t=new q,n=new s(`#ffe9b0`);for(let r=0;r<Ja;r++){let i=r*3;this.base[i]=this.center.x+Ba(-.5,.5)*this.size.x,this.base[i+1]=this.center.y+Ba(-.5,.5)*this.size.y,this.base[i+2]=this.center.z+Ba(-.5,.5)*this.size.z;for(let e=0;e<3;e++)this.phase[i+e]=Ba(0,za);e.set(this.base[i],this.base[i+1],this.base[i+2]),t.copy(e).sub(this.center);let a=t.dot(this.lightDir),o=t.addScaledVector(this.lightDir,-a).length();this.beam[r]=.3+.7*Math.exp(-(o*o)/5),this.pool.set(r,e.x,e.y,e.z,n.r,n.g,n.b,Ba(.025,.06),0)}this.pool.flush()}update(e){this.t+=e;let t=this.t;for(let e=0;e<Ja;e++){let n=e*3,r=this.phase,i=this.base[n]+Math.sin(t*.21+r[n])*.5+t*.03*Math.sin(r[n+1]),a=this.base[n+1]+Math.sin(t*.33+r[n+1])*.25,o=this.base[n+2]+Math.sin(t*.17+r[n+2])*.5,s=.5+.5*Math.sin(t*.9+r[n+2]*3);this.pool.setMotion(e,i,a,o,.02+.025*(e%5/4),this.beam[e]*(.15+.45*s))}this.pool.flush(!1)}},Xa=new s(`#ffd84a`),Za=new s(`#ff2a1c`);function Qa(e,t,n=28){let r=Ot.degToRad(t)/2,i=[0,0,0],a=[];for(let t=0;t<=n;t++){let o=-r+2*r*t/n;i.push(Math.sin(o)*e,0,Math.cos(o)*e),t>0&&a.push(0,t+1,t)}let o=new Ft;o.setAttribute(`position`,new S(i,3)),o.setIndex(a);let s=new he({uniforms:{uColor:{value:Xa.clone()},uRange:{value:e},uHalf:{value:r},uAlpha:{value:.4}},vertexShader:`
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
      }`,transparent:!0,depthWrite:!1,side:2,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),c=new Pt(o,s);c.position.y=.03,c.renderOrder=1,c.frustumCulled=!1;let l=0,u=0,d=()=>{s.uniforms.uColor.value.copy(Xa).lerp(Za,l);let e=l>.75?.1*Math.sin(u*14)*(l-.75)*4:0;s.uniforms.uAlpha.value=.34+.34*l+e};return d(),{mesh:c,setSuspicion(e){l=Math.min(1,Math.max(0,e)),d()},tick(e){u+=e,l>.75&&d()},dispose(){o.dispose(),s.dispose()}}}function $a(){let e=document.createElement(`canvas`);e.width=128,e.height=256;let t=e.getContext(`2d`),n=()=>{t.beginPath(),t.moveTo(35.84,25.6),t.quadraticCurveTo(64,10.24,92.16,25.6),t.lineTo(74.24,168.96),t.lineTo(53.76,168.96),t.closePath()},r=()=>{t.beginPath(),t.arc(64,209.92,14.72,0,za)};t.lineJoin=`round`,t.strokeStyle=`#000`,t.lineWidth=18,n(),t.stroke(),r(),t.stroke(),t.fillStyle=`#fff`,n(),t.fill(),r(),t.fill();let i=new Mt(e);return i.colorSpace=``,i}function eo(){let e=$a(),t=new he({uniforms:{uMap:{value:e},uFill:{value:0},uLow:{value:Xa.clone()},uHigh:{value:Za.clone()}},vertexShader:`
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
      }`,transparent:!0,depthWrite:!1,depthTest:!1}),n=new ce(.5,1),r=new Pt(n,t);r.renderOrder=10,r.visible=!1,r.frustumCulled=!1;let i=0,a=0,o=new ge;return{mesh:r,set(e){i=Math.min(1,Math.max(0,e)),t.uniforms.uFill.value=i,r.visible=i>.01},tick(e,t){if(!r.visible)return;a+=e,r.parent?(r.parent.getWorldQuaternion(o).invert(),r.quaternion.copy(o).multiply(t.quaternion)):r.quaternion.copy(t.quaternion);let n=i>.92?1+.12*Math.sin(a*16):1;r.scale.setScalar(n)},dispose(){n.dispose(),t.dispose(),e.dispose()}}}var to=class{splash=new Ga;confetti=new qa;dust=new Ya;cones=[];indicators=[];baseDrawCalls=3;constructor(e){e.add(this.splash.pool.points,this.confetti.mesh,this.dust.pool.points)}paintSplash(e,t,n=28){this.splash.emit(e,t,n)}caughtBurst(e,t=Da,n=70){this.confetti.burst(e,t,n)}addVisionCone(e,t=5,n=70){let r=Qa(t,n);return e.add(r.mesh),this.cones.push(r),r}removeVisionCone(e){e.mesh.parent?.remove(e.mesh),this.cones=this.cones.filter(t=>t!==e),e.dispose()}addSuspicionIndicator(e,t=3.15){let n=eo();return n.mesh.position.y=t,e.add(n.mesh),this.indicators.push(n),n}update(e,t,n){let r=n.domElement.height/(2*Math.tan(Ot.degToRad(t.fov)/2));this.splash.pool.material.uniforms.uScale.value=r,this.dust.pool.material.uniforms.uScale.value=r,this.splash.update(e),this.confetti.update(e),this.dust.update(e);for(let t of this.cones)t.tick(e);for(let n of this.indicators)n.tick(e,t)}dispose(){this.splash.pool.dispose(),this.confetti.dispose(),this.dust.pool.dispose(),this.cones.forEach(e=>e.dispose()),this.indicators.forEach(e=>e.dispose())}},no=(e,t,n,r,i=!1,a=1/0,o=!1)=>({kind:`box`,minX:Math.min(e,n),maxX:Math.max(e,n),minZ:Math.min(t,r),maxZ:Math.max(t,r),wall:i,top:a,climb:o}),ro=(e,t,n,r=1/0,i=!1)=>({kind:`circle`,x:e,z:t,r:n,top:r,climb:i}),io=2.8,ao=4.8,oo=.3,so=22,co=7,lo=.1,uo=.12,fo=13,po=16,mo=3.5,ho=.1,go=(e,t)=>!e.climb||t+.55<e.top;function _o(e,t,n,r,i,a,o){let s=e+n*(a+.12),c=t+r*(a+.12),l=null;for(let e of o)!e.climb||i+.55>=e.top||e.top-i>1.5||(e.kind===`box`?s>=e.minX&&s<=e.maxX&&c>=e.minZ&&c<=e.maxZ:Math.hypot(s-e.x,c-e.z)<=e.r)&&(l===null||e.top<l)&&(l=e.top);return l}function vo(e,t,n,r){let i=0,a=.12;for(let o of r)!o.climb||o.top>n+.55+.001||o.top<=i||(o.kind===`box`?e>=o.minX-a&&e<=o.maxX+a&&t>=o.minZ-a&&t<=o.maxZ+a:Math.hypot(e-o.x,t-o.z)<=o.r+a)&&(i=o.top);return i}function yo(e,t,n){let r=null;for(let i of n){if(i.kind!==`box`||!i.wall)continue;let n=Math.min(i.maxX,Math.max(i.minX,e.x)),a=Math.min(i.maxZ,Math.max(i.minZ,e.z)),o=e.x-n,s=e.z-a,c=Math.hypot(o,s);c>t||r&&c>=r.distance||c<1e-6||(r={distance:c,normal:{x:o/c,z:s/c},point:{x:n,z:a}})}return r}function bo(e,t,n,r=0){let i=!1;for(let a=0;a<3;a++){let a=!1;for(let o of n)if(go(o,r)){if(o.kind===`box`){let n=Math.min(o.maxX,Math.max(o.minX,e.x)),r=Math.min(o.maxZ,Math.max(o.minZ,e.z)),s=e.x-n,c=e.z-r,l=s*s+c*c;if(l>=t*t)continue;if(a=i=!0,l>1e-10){let i=Math.sqrt(l);e.x=n+s/i*t,e.z=r+c/i*t}else{let n=e.x-o.minX,r=o.maxX-e.x,i=e.z-o.minZ,a=o.maxZ-e.z,s=Math.min(n,r,i,a);s===n?e.x=o.minX-t:s===r?e.x=o.maxX+t:e.z=s===i?o.minZ-t:o.maxZ+t}}else{let n=e.x-o.x,r=e.z-o.z,s=t+o.r,c=n*n+r*r;if(c>=s*s)continue;a=i=!0;let l=Math.sqrt(c)||1e-5;e.x=o.x+n/l*s,e.z=o.z+r/l*s}}if(!a)break}return i}var xo=class e{el;keys=new Set;pointer=null;stick;knob;override=null;blocked=null;jumpQueued=!1;queueJump(){this.jumpQueued=!0}static STICK_RADIUS=64;constructor(e){this.el=e,addEventListener(`keydown`,e=>{e.target instanceof HTMLInputElement||(e.code===`Space`&&(e.preventDefault(),e.repeat||(this.jumpQueued=!0)),this.keys.add(e.code))}),addEventListener(`keyup`,e=>this.keys.delete(e.code)),addEventListener(`blur`,()=>{this.keys.clear(),this.pointer=null,this.showStick(!1)}),e.style.touchAction=`none`,e.addEventListener(`pointerdown`,t=>{this.pointer||this.blocked?.()||(this.pointer={id:t.pointerId,ox:t.clientX,oy:t.clientY,x:t.clientX,y:t.clientY},e.setPointerCapture(t.pointerId),this.showStick(!0))}),e.addEventListener(`pointermove`,e=>{this.pointer?.id===e.pointerId&&(this.pointer.x=e.clientX,this.pointer.y=e.clientY,this.moveStick())});let t=e=>{this.pointer?.id===e.pointerId&&(this.pointer=null,this.showStick(!1))};e.addEventListener(`pointerup`,t),e.addEventListener(`pointercancel`,t),this.stick=document.createElement(`div`),this.stick.style.cssText=`position:fixed;width:128px;height:128px;margin:-64px 0 0 -64px;border-radius:50%;border:2px solid rgba(255,255,255,.55);background:rgba(255,255,255,.12);pointer-events:none;display:none;z-index:5`,this.knob=document.createElement(`div`),this.knob.style.cssText=`position:absolute;left:44px;top:44px;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.7)`,this.stick.appendChild(this.knob),document.body.appendChild(this.stick)}showStick(e){this.stick.style.display=e?`block`:`none`,e&&this.pointer&&(this.stick.style.left=`${this.pointer.ox}px`,this.stick.style.top=`${this.pointer.oy}px`,this.knob.style.transform=`translate(0,0)`)}moveStick(){let t=this.pointer;if(!t)return;let n=t.x-t.ox,r=t.y-t.oy,i=Math.hypot(n,r);i>e.STICK_RADIUS&&(n=n/i*e.STICK_RADIUS,r=r/i*e.STICK_RADIUS),this.knob.style.transform=`translate(${n}px,${r}px)`}read(){let e=this.readMove();return this.jumpQueued&&(this.jumpQueued=!1,e.jump=!0),e}readMove(){if(this.override)return{...this.override};let t=0,n=0,r=this.keys;(r.has(`KeyA`)||r.has(`ArrowLeft`))&&--t,(r.has(`KeyD`)||r.has(`ArrowRight`))&&(t+=1),(r.has(`KeyW`)||r.has(`ArrowUp`))&&--n,(r.has(`KeyS`)||r.has(`ArrowDown`))&&(n+=1);let i=r.has(`ShiftLeft`)||r.has(`ShiftRight`);if(t||n){let e=Math.hypot(t,n);return{x:t/e,y:n/e,run:i}}let a=this.pointer;if(a){let t=a.x-a.ox,n=a.y-a.oy,r=Math.hypot(t,n);if(r>8){let a=Math.min(1,(r-8)/(e.STICK_RADIUS-8)),o=a**1.25;return i=a>.85,{x:t/r*o,y:n/r*o,run:i}}}return{x:0,y:0,run:!1}}},So=class{pos;vx=0;vz=0;vy=0;grounded=!0;radius=oo;coyote=lo;jumpBuffer=0;pushT=0;climbing=!1;constructor(e){this.pos=e}get speed(){return Math.hypot(this.vx,this.vz)}update(e,t,n,r){let i=Math.hypot(e.x,e.y),a=Math.min(1,i),o=a>.01,s=0,c=0;if(o){let t=e.run?ao:io*Math.max(.5,a);s=e.x/i*t,c=e.y/i*t}let l=this.grounded?o?fo:po:mo,u=1-Math.exp(-l*t);if(this.vx+=(s-this.vx)*u,this.vz+=(c-this.vz)*u,!o&&Math.hypot(this.vx,this.vz)<.12&&(this.vx=this.vz=0),o&&this.grounded&&!e.jump){let r=_o(this.pos.x,this.pos.z,e.x/i,e.y/i,this.pos.y,this.radius,n);this.pushT=r===null?0:this.pushT+t,r!==null&&this.pushT>=ho&&(this.vy=Math.sqrt(44*(r-this.pos.y+.14)),this.pos.y+=.01,this.grounded=!1,this.coyote=0,this.pushT=0,this.climbing=!0)}else o||(this.pushT=0);this.grounded&&(this.climbing=!1);let d=this.pos.x,f=this.pos.z,p={x:d,z:f},m=Math.max(1,Math.ceil(this.speed*t/.12));for(let e=0;e<m;e++)p.x+=this.vx*t/m,p.z+=this.vz*t/m,bo(p,this.radius,n,this.pos.y),p.x=Math.min(r.maxX,Math.max(r.minX,p.x)),p.z=Math.min(r.maxZ,Math.max(r.minZ,p.z));t>1e-4&&(this.vx=(p.x-d)/t,this.vz=(p.z-f)/t),this.pos.x=p.x,this.pos.z=p.z;let h=vo(p.x,p.z,this.pos.y,n);this.pos.y<h?(this.pos.y=Math.min(h,this.pos.y+Math.max(.2,h-this.pos.y)*Math.min(1,t*14)),h-this.pos.y<.005&&(this.pos.y=h),this.vy=0,this.grounded=!0):this.pos.y>h+1e-4?(this.vy-=so*t,this.pos.y+=this.vy*t,this.grounded=!1,this.pos.y<=h&&(this.pos.y=h,this.vy=0,this.grounded=!0)):(this.grounded=!0,this.vy=0),this.coyote=this.grounded?lo:Math.max(0,this.coyote-t),this.jumpBuffer=e.jump?uo:Math.max(0,this.jumpBuffer-t),this.jumpBuffer>0&&this.coyote>0&&(this.vy=co,this.pos.y+=.01,this.grounded=!1,this.coyote=0,this.jumpBuffer=0);let g=o?Math.atan2(e.x,e.y):this.speed>.6?Math.atan2(this.vx,this.vz):null;return{speed:this.speed,heading:g,grounded:this.grounded,vy:this.vy}}};function Co(e){let t=new Map,n=new Map,r=e.clone();return wo(e,r,function(e,r){t.set(r,e),n.set(e,r)}),r.traverse(function(e){if(!e.isSkinnedMesh)return;let r=e,i=t.get(e),a=i.skeleton.bones;r.skeleton=i.skeleton.clone(),r.bindMatrix.copy(i.bindMatrix),r.skeleton.bones=a.map(function(e){return n.get(e)}),r.bind(r.skeleton,r.bindMatrix)}),r}function wo(e,t,n){n(e,t);for(let r=0;r<e.children.length;r++)wo(e.children[r],t.children[r],n)}var To=class extends Ge{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new jo(e)}),this.register(function(e){return new Mo(e)}),this.register(function(e){return new Vo(e)}),this.register(function(e){return new Ho(e)}),this.register(function(e){return new Uo(e)}),this.register(function(e){return new Po(e)}),this.register(function(e){return new Fo(e)}),this.register(function(e){return new Io(e)}),this.register(function(e){return new Lo(e)}),this.register(function(e){return new Ao(e)}),this.register(function(e){return new Ro(e)}),this.register(function(e){return new No(e)}),this.register(function(e){return new Bo(e)}),this.register(function(e){return new zo(e)}),this.register(function(e){return new Oo(e)}),this.register(function(e){return new Wo(e,Z.EXT_MESHOPT_COMPRESSION)}),this.register(function(e){return new Wo(e,Z.KHR_MESHOPT_COMPRESSION)}),this.register(function(e){return new Go(e)})}load(e,t,n,r){let i=this,a;if(this.resourcePath!==``)a=this.resourcePath;else if(this.path!==``){let t=He.extractUrlBase(e);a=He.resolveURL(t,this.path)}else a=He.extractUrlBase(e);this.manager.itemStart(e);let o=function(t){r?r(t):console.error(t),i.manager.itemError(e),i.manager.itemEnd(e)},s=new _e(this.manager);s.setPath(this.path),s.setResponseType(`arraybuffer`),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,function(n){try{i.parse(n,a,function(n){t(n),i.manager.itemEnd(e)},o)}catch(e){o(e)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let i,a={},o={},s=new TextDecoder;if(typeof e==`string`)i=JSON.parse(e);else if(e instanceof ArrayBuffer){if(s.decode(new Uint8Array(e,0,4))===Ko){try{a[Z.KHR_BINARY_GLTF]=new Yo(e)}catch(e){r&&r(e);return}i=JSON.parse(a[Z.KHR_BINARY_GLTF].content)}else i=JSON.parse(s.decode(e))}else i=e;if(i.asset===void 0||i.asset.version[0]<2){r&&r(Error(`THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.`));return}let c=new xs(i,{path:t||this.resourcePath||``,crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let e=0;e<this.pluginCallbacks.length;e++){let t=this.pluginCallbacks[e](c);t.name||console.error(`THREE.GLTFLoader: Invalid plugin found: missing name`),o[t.name]=t,a[t.name]=!0}if(i.extensionsUsed)for(let e=0;e<i.extensionsUsed.length;++e){let t=i.extensionsUsed[e],n=i.extensionsRequired||[];switch(t){case Z.KHR_MATERIALS_UNLIT:a[t]=new ko;break;case Z.KHR_DRACO_MESH_COMPRESSION:a[t]=new Xo(i,this.dracoLoader);break;case Z.KHR_TEXTURE_TRANSFORM:a[t]=new Zo;break;case Z.KHR_MESH_QUANTIZATION:a[t]=new Qo;break;default:n.indexOf(t)>=0&&o[t]===void 0&&console.warn(`THREE.GLTFLoader: Unknown extension "`+t+`".`)}}c.setExtensions(a),c.setPlugins(o),c.parse(n,r)}parseAsync(e,t){let n=this;return new Promise(function(r,i){n.parse(e,t,r,i)})}};function Eo(){let e={};return{get:function(t){return e[t]},add:function(t,n){e[t]=n},remove:function(t){delete e[t]},removeAll:function(){e={}}}}function Do(e,t,n){let r=e.json.materials[t];return r.extensions&&r.extensions[n]?r.extensions[n]:null}var Z={KHR_BINARY_GLTF:`KHR_binary_glTF`,KHR_DRACO_MESH_COMPRESSION:`KHR_draco_mesh_compression`,KHR_LIGHTS_PUNCTUAL:`KHR_lights_punctual`,KHR_MATERIALS_CLEARCOAT:`KHR_materials_clearcoat`,KHR_MATERIALS_DISPERSION:`KHR_materials_dispersion`,KHR_MATERIALS_IOR:`KHR_materials_ior`,KHR_MATERIALS_SHEEN:`KHR_materials_sheen`,KHR_MATERIALS_SPECULAR:`KHR_materials_specular`,KHR_MATERIALS_TRANSMISSION:`KHR_materials_transmission`,KHR_MATERIALS_IRIDESCENCE:`KHR_materials_iridescence`,KHR_MATERIALS_ANISOTROPY:`KHR_materials_anisotropy`,KHR_MATERIALS_UNLIT:`KHR_materials_unlit`,KHR_MATERIALS_VOLUME:`KHR_materials_volume`,KHR_TEXTURE_BASISU:`KHR_texture_basisu`,KHR_TEXTURE_TRANSFORM:`KHR_texture_transform`,KHR_MESH_QUANTIZATION:`KHR_mesh_quantization`,KHR_MATERIALS_EMISSIVE_STRENGTH:`KHR_materials_emissive_strength`,EXT_MATERIALS_BUMP:`EXT_materials_bump`,EXT_TEXTURE_WEBP:`EXT_texture_webp`,EXT_TEXTURE_AVIF:`EXT_texture_avif`,EXT_MESHOPT_COMPRESSION:`EXT_meshopt_compression`,KHR_MESHOPT_COMPRESSION:`KHR_meshopt_compression`,EXT_MESH_GPU_INSTANCING:`EXT_mesh_gpu_instancing`},Oo=class{constructor(e){this.parser=e,this.name=Z.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n=`light:`+e,r=t.cache.get(n);if(r)return r;let i=t.json,a=((i.extensions&&i.extensions[this.name]||{}).lights||[])[e],o,c=new s(16777215);a.color!==void 0&&c.setRGB(a.color[0],a.color[1],a.color[2],pt);let l=a.range===void 0?0:a.range;switch(a.type){case`directional`:o=new T(c),o.target.position.set(0,0,-1),o.add(o.target);break;case`point`:o=new zt(c),o.distance=l;break;case`spot`:o=new V(c),o.distance=l,a.spot=a.spot||{},a.spot.innerConeAngle=a.spot.innerConeAngle===void 0?0:a.spot.innerConeAngle,a.spot.outerConeAngle=a.spot.outerConeAngle===void 0?Math.PI/4:a.spot.outerConeAngle,o.angle=a.spot.outerConeAngle,o.penumbra=1-a.spot.innerConeAngle/a.spot.outerConeAngle,o.target.position.set(0,0,-1),o.add(o.target);break;default:throw Error(`THREE.GLTFLoader: Unexpected light type: `+a.type)}return o.position.set(0,0,0),ps(o,a),a.intensity!==void 0&&(o.intensity=a.intensity),o.name=t.createUniqueName(a.name||`light_`+e),r=Promise.resolve(o),t.cache.add(n,r),r}getDependency(e,t){if(e===`light`)return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],i=(r.extensions&&r.extensions[this.name]||{}).light;return i===void 0?null:this._loadLight(i).then(function(e){return n._getNodeRef(t.cache,i,e)})}},ko=class{constructor(){this.name=Z.KHR_MATERIALS_UNLIT}getMaterialType(){return B}extendParams(e,t,n){let r=[];e.color=new s(1,1,1),e.opacity=1;let i=t.pbrMetallicRoughness;if(i){if(Array.isArray(i.baseColorFactor)){let t=i.baseColorFactor;e.color.setRGB(t[0],t[1],t[2],pt),e.opacity=t[3]}i.baseColorTexture!==void 0&&r.push(n.assignTexture(e,`map`,i.baseColorTexture,a))}return Promise.all(r)}},Ao=class{constructor(e){this.parser=e,this.name=Z.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Do(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},jo=class{constructor(e){this.parser=e,this.name=Z.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Do(this.parser,e,this.name)===null?null:pe}extendMaterialParams(e,t){let n=Do(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatMap`,n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatRoughnessMap`,n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(r.push(this.parser.assignTexture(t,`clearcoatNormalMap`,n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let e=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new wt(e,e)}return Promise.all(r)}},Mo=class{constructor(e){this.parser=e,this.name=Z.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Do(this.parser,e,this.name)===null?null:pe}extendMaterialParams(e,t){let n=Do(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion===void 0?0:n.dispersion),Promise.resolve()}},No=class{constructor(e){this.parser=e,this.name=Z.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Do(this.parser,e,this.name)===null?null:pe}extendMaterialParams(e,t){let n=Do(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceMap`,n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceThicknessMap`,n.iridescenceThicknessTexture)),Promise.all(r)}},Po=class{constructor(e){this.parser=e,this.name=Z.KHR_MATERIALS_SHEEN}getMaterialType(e){return Do(this.parser,e,this.name)===null?null:pe}extendMaterialParams(e,t){let n=Do(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(t.sheenColor=new s(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let e=n.sheenColorFactor;t.sheenColor.setRGB(e[0],e[1],e[2],pt)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenColorMap`,n.sheenColorTexture,a)),n.sheenRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenRoughnessMap`,n.sheenRoughnessTexture)),Promise.all(r)}},Fo=class{constructor(e){this.parser=e,this.name=Z.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Do(this.parser,e,this.name)===null?null:pe}extendMaterialParams(e,t){let n=Do(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&r.push(this.parser.assignTexture(t,`transmissionMap`,n.transmissionTexture)),Promise.all(r)}},Io=class{constructor(e){this.parser=e,this.name=Z.KHR_MATERIALS_VOLUME}getMaterialType(e){return Do(this.parser,e,this.name)===null?null:pe}extendMaterialParams(e,t){let n=Do(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.thickness=n.thicknessFactor===void 0?0:n.thicknessFactor,n.thicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`thicknessMap`,n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let i=n.attenuationColor||[1,1,1];return t.attenuationColor=new s().setRGB(i[0],i[1],i[2],pt),Promise.all(r)}},Lo=class{constructor(e){this.parser=e,this.name=Z.KHR_MATERIALS_IOR}getMaterialType(e){return Do(this.parser,e,this.name)===null?null:pe}extendMaterialParams(e,t){let n=Do(this.parser,e,this.name);return n===null||(t.ior=n.ior===void 0?1.5:n.ior,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},Ro=class{constructor(e){this.parser=e,this.name=Z.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Do(this.parser,e,this.name)===null?null:pe}extendMaterialParams(e,t){let n=Do(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.specularIntensity=n.specularFactor===void 0?1:n.specularFactor,n.specularTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularIntensityMap`,n.specularTexture));let i=n.specularColorFactor||[1,1,1];return t.specularColor=new s().setRGB(i[0],i[1],i[2],pt),n.specularColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularColorMap`,n.specularColorTexture,a)),Promise.all(r)}},zo=class{constructor(e){this.parser=e,this.name=Z.EXT_MATERIALS_BUMP}getMaterialType(e){return Do(this.parser,e,this.name)===null?null:pe}extendMaterialParams(e,t){let n=Do(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return t.bumpScale=n.bumpFactor===void 0?1:n.bumpFactor,n.bumpTexture!==void 0&&r.push(this.parser.assignTexture(t,`bumpMap`,n.bumpTexture)),Promise.all(r)}},Bo=class{constructor(e){this.parser=e,this.name=Z.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Do(this.parser,e,this.name)===null?null:pe}extendMaterialParams(e,t){let n=Do(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&r.push(this.parser.assignTexture(t,`anisotropyMap`,n.anisotropyTexture)),Promise.all(r)}},Vo=class{constructor(e){this.parser=e,this.name=Z.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let i=r.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures`);return null}return t.loadTextureImage(e,i.source,a)}},Ho=class{constructor(e){this.parser=e,this.name=Z.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},Uo=class{constructor(e){this.parser=e,this.name=Z.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},Wo=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let e=n.extensions[this.name],r=this.parser.getDependency(`buffer`,e.buffer),i=this.parser.options.meshoptDecoder;if(!i||!i.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files`);return null}return r.then(function(t){let n=e.byteOffset||0,r=e.byteLength||0,a=e.count,o=e.byteStride,s=new Uint8Array(t,n,r);return i.decodeGltfBufferAsync?i.decodeGltfBufferAsync(a,o,s,e.mode,e.filter).then(function(e){return e.buffer}):i.ready.then(function(){let t=new ArrayBuffer(a*o);return i.decodeGltfBuffer(new Uint8Array(t),a,o,s,e.mode,e.filter),t})})}return null}},Go=class{constructor(e){this.name=Z.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let r=t.meshes[n.mesh];for(let e of r.primitives)if(e.mode!==ns.TRIANGLES&&e.mode!==ns.TRIANGLE_STRIP&&e.mode!==ns.TRIANGLE_FAN&&e.mode!==void 0)return null;let i=n.extensions[this.name].attributes,a=[],o={};for(let e in i)a.push(this.parser.getDependency(`accessor`,i[e]).then(t=>(o[e]=t,o[e])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(e=>{let t=e.pop(),n=t.isGroup?t.children:[t],r=e[0].count,i=[];for(let e of n){let t=new je,n=new q,a=new ge,s=new q(1,1,1),c=new oe(e.geometry,e.material,r);for(let e=0;e<r;e++)o.TRANSLATION&&n.fromBufferAttribute(o.TRANSLATION,e),o.ROTATION&&a.fromBufferAttribute(o.ROTATION,e),o.SCALE&&s.fromBufferAttribute(o.SCALE,e),c.setMatrixAt(e,t.compose(n,a,s));let l=null;for(let e in o)if(e===`_COLOR_0`){let t=o[e];c.instanceColor=new Ee(t.array,t.itemSize,t.normalized)}else if(e!==`TRANSLATION`&&e!==`ROTATION`&&e!==`SCALE`){if(l===null){let e=c.geometry;l=new Ft,l.name=e.name;for(let t in e.attributes)l.setAttribute(t,e.attributes[t]);for(let t in e.morphAttributes)l.morphAttributes[t]=e.morphAttributes[t];e.index!==null&&l.setIndex(e.index),l.morphTargetsRelative=e.morphTargetsRelative;for(let t of e.groups)l.addGroup(t.start,t.count,t.materialIndex);e.boundingBox!==null&&(l.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(l.boundingSphere=e.boundingSphere.clone()),l.drawRange.start=e.drawRange.start,l.drawRange.count=e.drawRange.count,l.userData=Object.assign({},e.userData),c.geometry=l}let t=o[e];l.setAttribute(e,new Ee(t.array,t.itemSize,t.normalized))}ne.prototype.copy.call(c,e),this.parser.assignFinalMaterial(c),i.push(c)}return t.isGroup?(t.clear(),t.add(...i),t):i[0]}))}},Ko=`glTF`,qo=12,Jo={JSON:1313821514,BIN:5130562},Yo=class{constructor(e){this.name=Z.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,qo),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Ko)throw Error(`THREE.GLTFLoader: Unsupported glTF-Binary header.`);if(this.header.version<2)throw Error(`THREE.GLTFLoader: Legacy binary file detected.`);let r=this.header.length-qo,i=new DataView(e,qo),a=0;for(;a<r;){let t=i.getUint32(a,!0);a+=4;let r=i.getUint32(a,!0);if(a+=4,r===Jo.JSON){let r=new Uint8Array(e,qo+a,t);this.content=n.decode(r)}else if(r===Jo.BIN){let n=qo+a;this.body=e.slice(n,n+t)}a+=t}if(this.content===null)throw Error(`THREE.GLTFLoader: JSON content not found.`)}},Xo=class{constructor(e,t){if(!t)throw Error(`THREE.GLTFLoader: No DRACOLoader instance provided.`);this.name=Z.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,r=this.dracoLoader,i=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},s={},c={};for(let e in a){let t=ss[e]||e.toLowerCase();o[t]=a[e]}for(let t in e.attributes){let r=ss[t]||t.toLowerCase();if(a[t]!==void 0){let i=n.accessors[e.attributes[t]];c[r]=rs[i.componentType].name,s[r]=i.normalized===!0}}return t.getDependency(`bufferView`,i).then(function(e){return new Promise(function(t,n){r.decodeDracoFile(e,function(e){for(let t in e.attributes){let n=e.attributes[t],r=s[t];r!==void 0&&(n.normalized=r)}t(e)},o,c,pt,n)})})}},Zo=class{constructor(){this.name=Z.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let t=Math.cos(e.rotation),n=Math.sin(e.rotation);e.matrix.set(e.repeat.x*t,e.repeat.y*n,e.offset.x,-e.repeat.x*n,e.repeat.y*t,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},Qo=class{constructor(){this.name=Z.KHR_MESH_QUANTIZATION}},$o=class extends st{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r*3+r;for(let e=0;e!==r;e++)t[e]=n[i+e];return t}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=o*2,c=o*3,l=r-t,u=(n-t)/l,d=u*u,f=d*u,p=e*c,m=p-c,h=-2*f+3*d,g=f-d,_=1-h,v=g-d+u;for(let e=0;e!==o;e++){let t=a[m+e+o],n=a[m+e+s]*l,r=a[p+e+o],c=a[p+e]*l;i[e]=_*t+v*n+h*r+g*c}return i}},es=new ge,ts=class extends $o{interpolate_(e,t,n,r){let i=super.interpolate_(e,t,n,r);return es.fromArray(i).normalize().toArray(i),i}},ns={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},rs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},is={9728:$e,9729:Tt,9984:Xe,9985:ze,9986:r,9987:Fe},as={33071:le,33648:L,10497:F},os={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ss={POSITION:`position`,NORMAL:`normal`,TANGENT:`tangent`,TEXCOORD_0:`uv`,TEXCOORD_1:`uv1`,TEXCOORD_2:`uv2`,TEXCOORD_3:`uv3`,COLOR_0:`color`,WEIGHTS_0:`skinWeight`,JOINTS_0:`skinIndex`},cs={scale:`scale`,translation:`position`,rotation:`quaternion`,weights:`morphTargetInfluences`},ls={CUBICSPLINE:void 0,LINEAR:Je,STEP:gt},us={OPAQUE:`OPAQUE`,MASK:`MASK`,BLEND:`BLEND`};function ds(e){return e.DefaultMaterial===void 0&&(e.DefaultMaterial=new g({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:0})),e.DefaultMaterial}function fs(e,t,n){for(let r in n.extensions)e[r]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[r]=n.extensions[r])}function ps(e,t){t.extras!==void 0&&(typeof t.extras==`object`?Object.assign(e.userData,t.extras):console.warn(`THREE.GLTFLoader: Ignoring primitive type .extras, `+t.extras))}function ms(e,t,n){let r=!1,i=!1,a=!1;for(let e=0,n=t.length;e<n;e++){let n=t[e];if(n.POSITION!==void 0&&(r=!0),n.NORMAL!==void 0&&(i=!0),n.COLOR_0!==void 0&&(a=!0),r&&i&&a)break}if(!r&&!i&&!a)return Promise.resolve(e);let o=[],s=[],c=[];for(let l=0,u=t.length;l<u;l++){let u=t[l];if(r){let t=u.POSITION===void 0?e.attributes.position:n.getDependency(`accessor`,u.POSITION);o.push(t)}if(i){let t=u.NORMAL===void 0?e.attributes.normal:n.getDependency(`accessor`,u.NORMAL);s.push(t)}if(a){let t=u.COLOR_0===void 0?e.attributes.color:n.getDependency(`accessor`,u.COLOR_0);c.push(t)}}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(c)]).then(function(t){let n=t[0],o=t[1],s=t[2];return r&&(e.morphAttributes.position=n),i&&(e.morphAttributes.normal=o),a&&(e.morphAttributes.color=s),e.morphTargetsRelative=!0,e})}function hs(e,t){if(e.updateMorphTargets(),t.weights!==void 0)for(let n=0,r=t.weights.length;n<r;n++)e.morphTargetInfluences[n]=t.weights[n];if(t.extras&&Array.isArray(t.extras.targetNames)){let n=t.extras.targetNames;if(e.morphTargetInfluences.length===n.length){e.morphTargetDictionary={};for(let t=0,r=n.length;t<r;t++)e.morphTargetDictionary[n[t]]=t}else console.warn(`THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.`)}}function gs(e){let t,n=e.extensions&&e.extensions[Z.KHR_DRACO_MESH_COMPRESSION];if(t=n?`draco:`+n.bufferView+`:`+n.indices+`:`+_s(n.attributes):e.indices+`:`+_s(e.attributes)+`:`+e.mode,e.targets!==void 0)for(let n=0,r=e.targets.length;n<r;n++)t+=`:`+_s(e.targets[n]);return t}function _s(e){let t=``,n=Object.keys(e).sort();for(let r=0,i=n.length;r<i;r++)t+=n[r]+`:`+e[n[r]]+`;`;return t}function vs(e){switch(e){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw Error(`THREE.GLTFLoader: Unsupported normalized accessor component type.`)}}function ys(e){return e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0?`image/jpeg`:e.search(/\.webp($|\?)/i)>0||e.search(/^data\:image\/webp/)===0?`image/webp`:e.search(/\.ktx2($|\?)/i)>0||e.search(/^data\:image\/ktx2/)===0?`image/ktx2`:`image/png`}var bs=new je,xs=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Eo,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,i=!1,a=-1;if(typeof navigator<`u`&&navigator.userAgent!==void 0){let e=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(e)===!0;let t=e.match(/Version\/(\d+)/);r=n&&t?parseInt(t[1],10):-1,i=e.indexOf(`Firefox`)>-1,a=i?e.match(/Firefox\/([0-9]+)\./)[1]:-1}this.textureLoader=typeof createImageBitmap>`u`||n&&r<17||i&&a<98?new De(this.options.manager):new Se(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new _e(this.options.manager),this.fileLoader.setResponseType(`arraybuffer`),this.options.crossOrigin===`use-credentials`&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,r=this.json,i=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(e){return e._markDefs&&e._markDefs()}),Promise.all(this._invokeAll(function(e){return e.beforeRoot&&e.beforeRoot()})).then(function(){return Promise.all([n.getDependencies(`scene`),n.getDependencies(`animation`),n.getDependencies(`camera`)])}).then(function(t){let a={scene:t[0][r.scene||0],scenes:t[0],animations:t[1],cameras:t[2],asset:r.asset,parser:n,userData:{}};return fs(i,a,r),ps(a,r),Promise.all(n._invokeAll(function(e){return e.afterRoot&&e.afterRoot(a)})).then(function(){for(let e of a.scenes)e.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n].joints;for(let t=0,n=r.length;t<n;t++)e[r[t]].isBone=!0}for(let t=0,r=e.length;t<r;t++){let r=e[t];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let r=n.clone(),i=(e,t)=>{let n=this.associations.get(e);n!=null&&this.associations.set(t,n);for(let[n,r]of e.children.entries())i(r,t.children[n])};return i(n,r),r.name+=`_instance_`+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let r=e(t[n]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let r=0;r<t.length;r++){let i=e(t[r]);i&&n.push(i)}return n}getDependency(e,t){let n=e+`:`+t,r=this.cache.get(n);if(!r){switch(e){case`scene`:r=this.loadScene(t);break;case`node`:r=this._invokeOne(function(e){return e.loadNode&&e.loadNode(t)});break;case`mesh`:r=this._invokeOne(function(e){return e.loadMesh&&e.loadMesh(t)});break;case`accessor`:r=this.loadAccessor(t);break;case`bufferView`:r=this._invokeOne(function(e){return e.loadBufferView&&e.loadBufferView(t)});break;case`buffer`:r=this.loadBuffer(t);break;case`material`:r=this._invokeOne(function(e){return e.loadMaterial&&e.loadMaterial(t)});break;case`texture`:r=this._invokeOne(function(e){return e.loadTexture&&e.loadTexture(t)});break;case`skin`:r=this.loadSkin(t);break;case`animation`:r=this._invokeOne(function(e){return e.loadAnimation&&e.loadAnimation(t)});break;case`camera`:r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(n){return n!=this&&n.getDependency&&n.getDependency(e,t)}),!r)throw Error(`Unknown type: `+e)}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,r=this.json[e+(e===`mesh`?`es`:`s`)]||[];t=Promise.all(r.map(function(t,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!==`arraybuffer`)throw Error(`THREE.GLTFLoader: `+t.type+` buffer type is not supported.`);if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Z.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(e,i){n.load(He.resolveURL(t.uri,r.path),e,void 0,function(){i(Error(`THREE.GLTFLoader: Failed to load buffer "`+t.uri+`".`))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency(`buffer`,t.buffer).then(function(e){let n=t.byteLength||0,r=t.byteOffset||0;return e.slice(r,r+n)})}loadAccessor(e){let t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let e=os[r.type],t=rs[r.componentType],n=r.normalized===!0,i=new t(r.count*e);return Promise.resolve(new Et(i,e,n))}let i=[];return r.bufferView===void 0?i.push(null):i.push(this.getDependency(`bufferView`,r.bufferView)),r.sparse!==void 0&&(i.push(this.getDependency(`bufferView`,r.sparse.indices.bufferView)),i.push(this.getDependency(`bufferView`,r.sparse.values.bufferView))),Promise.all(i).then(function(e){let i=e[0],a=os[r.type],o=rs[r.componentType],s=o.BYTES_PER_ELEMENT,c=s*a,l=r.byteOffset||0,u=r.bufferView===void 0?void 0:n.bufferViews[r.bufferView].byteStride,d=r.normalized===!0,f,p;if(u&&u!==c){let e=Math.floor(l/u),n=`InterleavedBuffer:`+r.bufferView+`:`+r.componentType+`:`+e+`:`+r.count,c=t.cache.get(n);c||(f=new o(i,e*u,r.count*u/s),c=new Le(f,u/s),t.cache.add(n,c)),p=new St(c,a,l%u/s,d)}else f=i===null?new o(r.count*a):new o(i,l,r.count*a),p=new Et(f,a,d);if(r.sparse!==void 0){let t=os.SCALAR,n=rs[r.sparse.indices.componentType],s=r.sparse.indices.byteOffset||0,c=r.sparse.values.byteOffset||0,l=new n(e[1],s,r.sparse.count*t),u=new o(e[2],c,r.sparse.count*a);i!==null&&(p=new Et(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let e=0,t=l.length;e<t;e++){let t=l[e];if(p.setX(t,u[e*a]),a>=2&&p.setY(t,u[e*a+1]),a>=3&&p.setZ(t,u[e*a+2]),a>=4&&p.setW(t,u[e*a+3]),a>=5)throw Error(`THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.`)}p.normalized=d}return p})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,i=t.images[r],a=this.textureLoader;if(i.uri){let e=n.manager.getHandler(i.uri);e!==null&&(a=e)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let r=this,i=this.json,a=i.textures[e],o=i.images[t],s=(o.uri||o.bufferView)+`:`+a.sampler;if(this.textureCache[s])return this.textureCache[s];let c=this.loadImageSource(t,n).then(function(t){t.flipY=!1,t.name=a.name||o.name||``,t.name===``&&typeof o.uri==`string`&&o.uri.startsWith(`data:image/`)===!1&&(t.name=o.uri);let n=(i.samplers||{})[a.sampler]||{};return t.magFilter=is[n.magFilter]||1006,t.minFilter=is[n.minFilter]||1008,t.wrapS=as[n.wrapS]||1e3,t.wrapT=as[n.wrapT]||1e3,t.generateMipmaps=!t.isCompressedTexture&&t.minFilter!==1003&&t.minFilter!==1006,r.associations.set(t,{textures:e}),t}).catch(function(){return null});return this.textureCache[s]=c,c}loadImageSource(e,t){let n=this,r=this.json,i=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(e=>e.clone());let a=r.images[e],o=self.URL||self.webkitURL,s=a.uri||``,c=!1;if(a.bufferView!==void 0)s=n.getDependency(`bufferView`,a.bufferView).then(function(e){c=!0;let t=new Blob([e],{type:a.mimeType});return s=o.createObjectURL(t),s});else if(a.uri===void 0)throw Error(`THREE.GLTFLoader: Image `+e+` is missing URI and bufferView`);let l=Promise.resolve(s).then(function(e){return new Promise(function(n,r){let a=n;t.isImageBitmapLoader===!0&&(a=function(e){let t=new Ce(e);t.needsUpdate=!0,n(t)}),t.load(He.resolveURL(e,i.path),a,void 0,r)})}).then(function(e){return c===!0&&o.revokeObjectURL(s),ps(e,a),e.userData.mimeType=a.mimeType||ys(a.uri),e}).catch(function(e){throw console.error(`THREE.GLTFLoader: Couldn't load texture`,s),e});return this.sourceCache[e]=l,l}assignTexture(e,t,n,r){let i=this;return this.getDependency(`texture`,n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),i.extensions[Z.KHR_TEXTURE_TRANSFORM]){let e=n.extensions===void 0?void 0:n.extensions[Z.KHR_TEXTURE_TRANSFORM];if(e){let t=i.associations.get(a);a=i.extensions[Z.KHR_TEXTURE_TRANSFORM].extendTexture(a,e),i.associations.set(a,t)}}return r!==void 0&&(a.colorSpace=r),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,r=t.attributes.tangent===void 0,i=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let e=`PointsMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new ye,Ae.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,t.sizeAttenuation=!1,this.cache.add(e,t)),n=t}else if(e.isLine){let e=`LineBasicMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new yt,Ae.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,this.cache.add(e,t)),n=t}if(r||i||a){let e=`ClonedMaterial:`+n.uuid+`:`;r&&(e+=`derivative-tangents:`),i&&(e+=`vertex-colors:`),a&&(e+=`flat-shading:`);let t=this.cache.get(e);t||(t=n.clone(),i&&(t.vertexColors=!0),a&&(t.flatShading=!0),r&&(t.normalScale&&(t.normalScale.y*=-1),t.clearcoatNormalScale&&(t.clearcoatNormalScale.y*=-1)),this.cache.add(e,t),this.associations.set(t,this.associations.get(n))),n=t}e.material=n}getMaterialType(){return g}loadMaterial(e){let t=this,n=this.json,r=this.extensions,i=n.materials[e],o,c={},l=i.extensions||{},u=[];if(l[Z.KHR_MATERIALS_UNLIT]){let e=r[Z.KHR_MATERIALS_UNLIT];o=e.getMaterialType(),u.push(e.extendParams(c,i,t))}else{let n=i.pbrMetallicRoughness||{};if(c.color=new s(1,1,1),c.opacity=1,Array.isArray(n.baseColorFactor)){let e=n.baseColorFactor;c.color.setRGB(e[0],e[1],e[2],pt),c.opacity=e[3]}n.baseColorTexture!==void 0&&u.push(t.assignTexture(c,`map`,n.baseColorTexture,a)),c.metalness=n.metallicFactor===void 0?1:n.metallicFactor,c.roughness=n.roughnessFactor===void 0?1:n.roughnessFactor,n.metallicRoughnessTexture!==void 0&&(u.push(t.assignTexture(c,`metalnessMap`,n.metallicRoughnessTexture)),u.push(t.assignTexture(c,`roughnessMap`,n.metallicRoughnessTexture))),o=this._invokeOne(function(t){return t.getMaterialType&&t.getMaterialType(e)}),u.push(Promise.all(this._invokeAll(function(t){return t.extendMaterialParams&&t.extendMaterialParams(e,c)})))}i.doubleSided===!0&&(c.side=2);let d=i.alphaMode||us.OPAQUE;if(d===us.BLEND?(c.transparent=!0,c.depthWrite=!1):(c.transparent=!1,d===us.MASK&&(c.alphaTest=i.alphaCutoff===void 0?.5:i.alphaCutoff)),i.normalTexture!==void 0&&o!==B&&(u.push(t.assignTexture(c,`normalMap`,i.normalTexture)),c.normalScale=new wt(1,1),i.normalTexture.scale!==void 0)){let e=i.normalTexture.scale;c.normalScale.set(e,e)}if(i.occlusionTexture!==void 0&&o!==B&&(u.push(t.assignTexture(c,`aoMap`,i.occlusionTexture)),i.occlusionTexture.strength!==void 0&&(c.aoMapIntensity=i.occlusionTexture.strength)),i.emissiveFactor!==void 0&&o!==B){let e=i.emissiveFactor;c.emissive=new s().setRGB(e[0],e[1],e[2],pt)}return i.emissiveTexture!==void 0&&o!==B&&u.push(t.assignTexture(c,`emissiveMap`,i.emissiveTexture,a)),Promise.all(u).then(function(){let n=new o(c);return i.name&&(n.name=i.name),ps(n,i),t.associations.set(n,{materials:e}),i.extensions&&fs(r,n,i),n})}createUniqueName(e){let t=w.sanitizeNodeName(e||``);return t in this.nodeNamesUsed?t+`_`+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,r=this.primitiveCache;function i(e){return n[Z.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e,t).then(function(n){return Cs(n,e,t)})}let a=[];for(let n=0,o=e.length;n<o;n++){let o=e[n],s=gs(o),c=r[s];if(c)a.push(c.promise);else{let e;e=o.extensions&&o.extensions[Z.KHR_DRACO_MESH_COMPRESSION]?i(o):Cs(new Ft,o,t),o.mode===ns.TRIANGLE_STRIP?e=e.then(e=>_t(e,1)):o.mode===ns.TRIANGLE_FAN&&(e=e.then(e=>_t(e,2))),r[s]={primitive:o,promise:e},a.push(e)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,r=this.extensions,i=n.meshes[e],a=i.primitives,s=[];for(let e=0,t=a.length;e<t;e++){let t=a[e].material===void 0?ds(this.cache):this.getDependency(`material`,a[e].material);s.push(t)}return s.push(t.loadGeometries(a)),Promise.all(s).then(async function(n){let s=n.slice(0,n.length-1),c=n[n.length-1],l=[];for(let n=0,u=c.length;n<u;n++){let u=c[n],d=a[n],f,p=s[n];if(d.mode===ns.TRIANGLES||d.mode===ns.TRIANGLE_STRIP||d.mode===ns.TRIANGLE_FAN||d.mode===void 0){let e=i.isSkinnedMesh===!0,t=u.hasAttribute(`skinIndex`)&&u.hasAttribute(`skinWeight`);e&&t===!1&&console.warn(`THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled.`),f=e&&t?new k(u,p):new Pt(u,p),f.isSkinnedMesh===!0&&f.normalizeSkinWeights()}else if(d.mode===ns.LINES)f=new tt(u,p);else if(d.mode===ns.LINE_STRIP)f=new ut(u,p);else if(d.mode===ns.LINE_LOOP)f=new K(u,p);else if(d.mode===ns.POINTS)f=new o(u,p);else throw Error(`THREE.GLTFLoader: Primitive mode unsupported: `+d.mode);Object.keys(f.geometry.morphAttributes).length>0&&hs(f,i),f.name=t.createUniqueName(i.name||`mesh_`+e),ps(f,i),d.extensions&&fs(r,f,d),t.assignFinalMaterial(f),l.push(f)}for(let n=0,r=l.length;n<r;n++)t.associations.set(l[n],{meshes:e,primitives:n});if(l.length===1)return i.extensions&&fs(r,l[0],i),l[0];let u=new mt;i.extensions&&fs(r,u,i),t.associations.set(u,{meshes:e});for(let e=0,t=l.length;e<t;e++)u.add(l[e]);return u})}loadCamera(e){let t,n=this.json.cameras[e],r=n[n.type];if(!r)console.warn(`THREE.GLTFLoader: Missing camera parameters.`);else return n.type===`perspective`?t=new E(Ot.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type===`orthographic`&&(t=new y(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ps(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let e=0,r=t.joints.length;e<r;e++)n.push(this._loadNodeShallow(t.joints[e]));return t.inverseBindMatrices===void 0?n.push(null):n.push(this.getDependency(`accessor`,t.inverseBindMatrices)),Promise.all(n).then(function(e){let n=e.pop(),r=e,i=[],a=[];for(let e=0,o=r.length;e<o;e++){let o=r[e];if(o){i.push(o);let t=new je;n!==null&&t.fromArray(n.array,e*16),a.push(t)}else console.warn(`THREE.GLTFLoader: Joint "%s" could not be found.`,t.joints[e])}return new x(i,a)})}loadAnimation(e){let t=this.json,n=this,r=t.animations[e],i=r.name?r.name:`animation_`+e,a=[],o=[],s=[],c=[],l=[];for(let e=0,t=r.channels.length;e<t;e++){let t=r.channels[e],n=r.samplers[t.sampler],i=t.target,u=i.node,d=r.parameters===void 0?n.input:r.parameters[n.input],f=r.parameters===void 0?n.output:r.parameters[n.output];i.node!==void 0&&(a.push(this.getDependency(`node`,u)),o.push(this.getDependency(`accessor`,d)),s.push(this.getDependency(`accessor`,f)),c.push(n),l.push(i))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(s),Promise.all(c),Promise.all(l)]).then(function(e){let t=e[0],a=e[1],o=e[2],s=e[3],c=e[4],l=[];for(let e=0,r=t.length;e<r;e++){let r=t[e],i=a[e],u=o[e],d=s[e],f=c[e];if(r===void 0)continue;r.updateMatrix&&r.updateMatrix();let p=n._createAnimationTracks(r,i,u,d,f);if(p)for(let e=0;e<p.length;e++)l.push(p[e])}let u=new dt(i,void 0,l);return ps(u,r),u})}createNodeMesh(e){let t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency(`mesh`,r.mesh).then(function(e){let t=n._getNodeRef(n.meshCache,r.mesh,e);return r.weights!==void 0&&t.traverse(function(e){if(e.isMesh)for(let t=0,n=r.weights.length;t<n;t++)e.morphTargetInfluences[t]=r.weights[t]}),t})}loadNode(e){let t=this.json,n=this,r=t.nodes[e],i=n._loadNodeShallow(e),a=[],o=r.children||[];for(let e=0,t=o.length;e<t;e++)a.push(n.getDependency(`node`,o[e]));let s=r.skin===void 0?Promise.resolve(null):n.getDependency(`skin`,r.skin);return Promise.all([i,Promise.all(a),s]).then(function(e){let t=e[0],n=e[1],r=e[2];r!==null&&t.traverse(function(e){e.isSkinnedMesh&&e.bind(r,bs)});for(let e=0,r=n.length;e<r;e++)t.add(n[e]);if(t.userData.pivot!==void 0&&n.length>0){let e=t.userData.pivot,r=n[0];t.pivot=new q().fromArray(e),t.position.x-=e[0],t.position.y-=e[1],t.position.z-=e[2],r.position.set(0,0,0),delete t.userData.pivot}return t})}_loadNodeShallow(e){let t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let i=t.nodes[e],a=i.name?r.createUniqueName(i.name):``,o=[],s=r._invokeOne(function(t){return t.createNodeMesh&&t.createNodeMesh(e)});return s&&o.push(s),i.camera!==void 0&&o.push(r.getDependency(`camera`,i.camera).then(function(e){return r._getNodeRef(r.cameraCache,i.camera,e)})),r._invokeAll(function(t){return t.createNodeAttachment&&t.createNodeAttachment(e)}).forEach(function(e){o.push(e)}),this.nodeCache[e]=Promise.all(o).then(function(t){let o;if(o=i.isBone===!0?new Ue:t.length>1?new mt:t.length===1?t[0]:new ne,o!==t[0])for(let e=0,n=t.length;e<n;e++)o.add(t[e]);if(i.name&&(o.userData.name=i.name,o.name=a),ps(o,i),i.extensions&&fs(n,o,i),i.matrix!==void 0){let e=new je;e.fromArray(i.matrix),o.applyMatrix4(e)}else i.translation!==void 0&&o.position.fromArray(i.translation),i.rotation!==void 0&&o.quaternion.fromArray(i.rotation),i.scale!==void 0&&o.scale.fromArray(i.scale);if(!r.associations.has(o))r.associations.set(o,{});else if(i.mesh!==void 0&&r.meshCache.refs[i.mesh]>1){let e=r.associations.get(o);r.associations.set(o,{...e})}return r.associations.get(o).nodes=e,o}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],r=this,i=new mt;n.name&&(i.name=r.createUniqueName(n.name)),ps(i,n),n.extensions&&fs(t,i,n);let a=n.nodes||[],o=[];for(let e=0,t=a.length;e<t;e++)o.push(r.getDependency(`node`,a[e]));return Promise.all(o).then(function(e){for(let t=0,n=e.length;t<n;t++){let n=e[t];n.parent===null?i.add(n):i.add(Co(n))}return r.associations=(e=>{let t=new Map;for(let[e,n]of r.associations)(e instanceof Ae||e instanceof Ce)&&t.set(e,n);return e.traverse(e=>{let n=r.associations.get(e);n!=null&&t.set(e,n)}),t})(i),i})}_createAnimationTracks(e,t,n,r,i){let a=[],o=e.name?e.name:e.uuid,s=[];function c(e){e.morphTargetInfluences&&s.push(e.name?e.name:e.uuid)}cs[i.path]===cs.weights?(c(e),e.isGroup&&e.children.forEach(c)):s.push(o);let l;switch(cs[i.path]){case cs.weights:l=P;break;case cs.rotation:l=xe;break;case cs.translation:case cs.scale:l=ft;break;default:switch(n.itemSize){case 1:l=P;break;default:l=ft}}let u=r.interpolation===void 0?Je:ls[r.interpolation],d=this._getArrayFromAccessor(n);for(let e=0,n=s.length;e<n;e++){let n=new l(s[e]+`.`+cs[i.path],t.array,d,u);r.interpolation===`CUBICSPLINE`&&this._createCubicSplineTrackInterpolant(n),a.push(n)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let e=vs(t.constructor),n=new Float32Array(t.length);for(let r=0,i=t.length;r<i;r++)n[r]=t[r]*e;t=n}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(e){return new(this instanceof xe?ts:$o)(this.times,this.values,this.getValueSize()/3,e)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Ss(e,t,n){let r=t.attributes,i=new Be;if(r.POSITION!==void 0){let e=n.json.accessors[r.POSITION],t=e.min,a=e.max;if(t!==void 0&&a!==void 0){if(i.set(new q(t[0],t[1],t[2]),new q(a[0],a[1],a[2])),e.normalized){let t=vs(rs[e.componentType]);i.min.multiplyScalar(t),i.max.multiplyScalar(t)}}else{console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`);return}}else return;let a=t.targets;if(a!==void 0){let e=new q,t=new q;for(let r=0,i=a.length;r<i;r++){let i=a[r];if(i.POSITION!==void 0){let r=n.json.accessors[i.POSITION],a=r.min,o=r.max;if(a!==void 0&&o!==void 0){if(t.setX(Math.max(Math.abs(a[0]),Math.abs(o[0]))),t.setY(Math.max(Math.abs(a[1]),Math.abs(o[1]))),t.setZ(Math.max(Math.abs(a[2]),Math.abs(o[2]))),r.normalized){let e=vs(rs[r.componentType]);t.multiplyScalar(e)}e.max(t)}else console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`)}}i.expandByVector(e)}e.boundingBox=i;let o=new ht;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,e.boundingSphere=o}function Cs(e,t,n){let r=t.attributes,i=[];function a(t,r){return n.getDependency(`accessor`,t).then(function(t){e.setAttribute(r,t)})}for(let t in r){let n=ss[t]||t.toLowerCase();n in e.attributes||i.push(a(r[t],n))}if(t.indices!==void 0&&!e.index){let r=n.getDependency(`accessor`,t.indices).then(function(t){e.setIndex(t)});i.push(r)}return kt.workingColorSpace!==`srgb-linear`&&`COLOR_0`in r&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${kt.workingColorSpace}" not supported.`),ps(e,t),Ss(e,t,n),Promise.all(i).then(function(){return t.targets===void 0?e:ms(e,t.targets,n)})}var ws=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,Ts=class{image;size;data;constructor(e,t=128){this.image=e,this.size=t;let n=document.createElement(`canvas`);n.width=n.height=t;let r=n.getContext(`2d`,{willReadFrequently:!0});r.drawImage(e,0,0,t,t),this.data=r.getImageData(0,0,t,t).data}at(e,t,n=new s){let r=Math.min(this.size-1,Math.max(0,Math.floor((e-Math.floor(e))*this.size))),i=(Math.min(this.size-1,Math.max(0,Math.floor((t-Math.floor(t))*this.size)))*this.size+r)*4;return n.setRGB(ws(this.data[i]/255),ws(this.data[i+1]/255),ws(this.data[i+2]/255),pt)}average(){let e=new s(0,0,0),t=new s,n=this.size*this.size;for(let r=0;r<n;r++){let n=r*4;t.setRGB(ws(this.data[n]/255),ws(this.data[n+1]/255),ws(this.data[n+2]/255),pt),e.r+=t.r,e.g+=t.g,e.b+=t.b}return e.multiplyScalar(1/n)}};function Es(e){return new Promise((t,n)=>{let r=new Image;r.onload=()=>t(r),r.onerror=()=>n(Error(`image failed: ${e}`)),r.src=e})}async function Ds(e){let t={};return await Promise.all(e.map(async e=>{let n=await Es(`./textures/surfaces/${e}.webp`),r=new Ce(n);r.colorSpace=a,r.wrapS=r.wrapT=F,r.anisotropy=4,r.needsUpdate=!0,t[e]={name:e,tex:r,avg:new Ts(n,32).average()}})),t}var Os=class{name;boxes=[];materials=[];opacity=1;target=1;constructor(e){this.name=e}blocks(e,t,n){for(let r of this.boxes){let i=0,a=1,o=!0;for(let s of[`x`,`y`,`z`]){let c=t[s]-e[s],l=r.min[s]-n,u=r.max[s]+n;if(Math.abs(c)<1e-9){if(e[s]<l||e[s]>u){o=!1;break}}else{let t=(l-e[s])/c,n=(u-e[s])/c;if(t>n&&([t,n]=[n,t]),i=Math.max(i,t),a=Math.min(a,n),i>a){o=!1;break}}}if(o)return!0}return!1}update(e){this.opacity+=(this.target-this.opacity)*Math.min(1,e*9),Math.abs(this.opacity-this.target)<.01&&(this.opacity=this.target);for(let e of this.materials)e.opacity=this.opacity}},ks=new je,As=new ge,js=new se;function Q(e,t,n,r=0,i=0,a=0,o=1){return As.setFromEuler(js.set(i,r,a,`YXZ`)),new je().compose(new q(e,t,n),As,new q(o,o,o))}var Ms=class{name;tex;opts;parts=[];tints=[];constructor(e,t,n={}){this.name=e,this.tex=t,this.opts=n}tintFor(e){let t=new s(e);if(!this.tex)return{tint:t,base:t.clone()};let n=this.tex.avg,r=new s(Math.min(4,t.r/Math.max(n.r,.02)),Math.min(4,t.g/Math.max(n.g,.02)),Math.min(4,t.b/Math.max(n.b,.02)));return{tint:r,base:r.clone().multiply(n)}}baseOf(e){return this.tintFor(e).base}add(e,t,n){let r=e.index?e.toNonIndexed():e.clone();for(let e of Object.keys(r.attributes))e!==`position`&&e!==`normal`&&r.deleteAttribute(e);r.applyMatrix4(t);let i=r.attributes.position,a=r.attributes.normal,o=this.opts.texel??2,s=new Float32Array(i.count*2),c=new Float32Array(i.count*3),{tint:l}=this.tintFor(n);for(let e=0;e<i.count;e++){let t=i.getX(e),n=i.getY(e),r=i.getZ(e),u=Math.abs(a.getX(e)),d=Math.abs(a.getY(e)),f=Math.abs(a.getZ(e)),p,m;d>=u&&d>=f?[p,m]=[t,r]:u>=f?[p,m]=[r,n]:[p,m]=[t,n],s[e*2]=p/o,s[e*2+1]=m/o,c[e*3]=l.r,c[e*3+1]=l.g,c[e*3+2]=l.b}r.setAttribute(`uv`,new Et(s,2)),r.setAttribute(`color`,new Et(c,3)),r.computeBoundingBox(),this.opts.fade?.boxes.push(r.boundingBox.clone()),this.parts.push(r),this.tints.push(this.tintFor(n).base)}box(e,t,n,r,i,a,o,s=0,c=0,l=0){this.add(new ke(r,i,a),Q(e,t,n,s,c,l),o)}span(e,t,n,r,i,a,o){this.box((e+r)/2,(t+i)/2,(n+a)/2,Math.abs(r-e),Math.abs(i-t),Math.abs(a-n),o)}cyl(e,t,n,r,i,a,o,s=10){this.add(new Ze(i,r,a,s),ks.makeTranslation(e,t+a/2,n).clone(),o)}get count(){return this.parts.length}build(){if(!this.parts.length)return null;let e=ct(this.parts,!1);this.parts.forEach(e=>e.dispose());let t=Ct(`#ffffff`,{map:this.tex?.tex??null,vertexColors:!0,transparent:!!this.opts.fade,side:this.opts.doubleSide?2:0});this.opts.fade?.materials.push(t);let n=new Pt(e,t);n.name=this.name,n.castShadow=this.opts.cast??!0,n.receiveShadow=this.opts.receive??!0;let r=new s(0,0,0);for(let e of this.tints)r.add(e);return n.userData.baseColor=r.multiplyScalar(1/this.tints.length),n.userData.merged=!0,n}};function Ns(e,t,n,r=.028,i=4){let a=n*i,o=[],s=e=>Math.sin(e/i*Math.PI*2)*r;for(let n=0;n<a;n++){let r=-e/2+n/a*e,i=-e/2+(n+1)/a*e,c=s(n),l=s(n+1);o.push(r,-t/2,c,i,-t/2,l,i,t/2,l,r,-t/2,c,i,t/2,l,r,t/2,c)}let c=new Ft;return c.setAttribute(`position`,new S(o,3)),c.computeVertexNormals(),c}var Ps=class{group=new mt;list=[];byId=new Map;constructor(){this.group.name=`surfaces`}add(e,t,n,r,i,a,o){let s=new ne;s.name=`surface:${e}`,s.position.set(...r);let c=new Be().setFromCenterAndSize(new q(...r),new q(...i)),l={id:e,label:t,kind:n,bounds:c,normal:new q(...a),baseColor:o.clone()};return s.userData={baseColor:l.baseColor,baseColorHex:`#${l.baseColor.getHexString()}`,surfaceId:e,label:t,kind:n,normal:l.normal,bounds:c},this.group.add(s),this.list.push(l),this.byId.set(e,s),s}get(e){let t=this.list.find(t=>t.id===e);if(!t)throw Error(`unknown surface ${e}`);return t}baseColorAt(e,t=.6){return this.nearest(e,t)?.baseColor.clone()??null}nearest(e,t=.6){let n=new q,r=null,i=1/0,a=1/0;for(let o of this.list){let s=o.bounds.distanceToPoint(e);if(s>t)continue;o.bounds.getSize(n);let c=Math.max(n.x,.05)*Math.max(n.y,.05)*Math.max(n.z,.05);(s<i-.15||s<=i+.15&&c<a)&&(r=o,a=c,i=Math.min(s,i))}return r}},Fs=new To,Is=new Map;function Ls(e){let t=Is.get(e);return t||(t=new Promise((t,n)=>{Fs.load(`./models/${e}.json`,e=>{e.scene.updateMatrixWorld(!0);let n=[];e.scene.traverse(e=>{if(!(e instanceof Pt))return;let t=e.material,r=t.map??null,i=Ct(t.color??`#ffffff`,{map:r}),a=new s(t.color??`#ffffff`),o=e.geometry.attributes.uv;if(r?.image&&o){let e=new Ts(r.image,256),n=new s(0,0,0),i=new s;for(let t=0;t<o.count;t++)e.at(o.getX(t),o.getY(t),i),n.add(i);a=n.multiplyScalar(1/o.count).multiply(t.color??new s(1,1,1))}n.push({name:e.name,materialName:t.name,geometry:e.geometry,material:i,local:e.matrixWorld.clone(),baseColor:a})}),t(n)},void 0,n)}),Is.set(e,t)),t}function Rs(e){let t=typeof e.s==`number`?[e.s,e.s,e.s]:e.s??[1,1,1];return As.setFromEuler(js.set(e.rx??0,e.ry??0,0,`YXZ`)),new je().compose(new q(e.x,e.y??0,e.z),As,new q(...t))}function zs(e,t,n={}){return e.map(e=>{let r=n.materials?.[e.materialName]??e.material,i=new oe(e.geometry,r,t.length),a=new s;return t.forEach((t,n)=>{i.setMatrixAt(n,Rs(t).multiply(e.local)),t.tint!==void 0&&i.setColorAt(n,a.set(t.tint))}),i.instanceMatrix.needsUpdate=!0,i.castShadow=n.cast??!0,i.receiveShadow=n.receive??!0,i.name=e.name,i.userData.baseColor=n.materials?.[e.materialName]?.color.clone()??e.baseColor.clone(),i})}function Bs(e,t){let n=e.baseColor.clone();return t!==void 0&&n.multiply(new s(t)),n}var Vs=[`plaster_wall`,`painted_concrete`,`corrugated_metal`,`rusty_metal`,`dirt_ground`,`old_wood`,`cracked_tiles`],Hs=[`car_van`,`car_cone`,`surv_bucket`,`surv_box`,`surv_box-large`,`surv_metal-panel`,`nat_plant_bushLarge`,`nat_plant_bush`,`nat_tree_palm`,`nat_tree_palmShort`],Us=3.2,Ws=6,Gs=.85,Ks=2.2,qs=5,Js=1.4,Ys=15;function Xs(e){let t=e>>>0;return()=>(t=t*1664525+1013904223>>>0)/4294967296}function Zs(e,t,n,r,i,a,o){e.font=`900 ${i}px "Arial Black", Impact, "DejaVu Sans", sans-serif`;let s=[...t].map(t=>e.measureText(t).width*.96),c=n-s.reduce((e,t)=>e+t,0)/2;e.fillStyle=a,e.strokeStyle=a,e.lineJoin=`round`,e.lineWidth=i*.06,[...t].forEach((t,n)=>{e.save(),e.translate(c+s[n]/2,r+(o()-.5)*i*.07),e.rotate((o()-.5)*.09),e.globalAlpha=.86+o()*.14,e.textAlign=`center`,e.fillText(t,0,0),e.strokeText(t,0,0),t!==` `&&o()<.16&&e.fillRect(-i*.02+(o()-.5)*i*.3,i*.02,i*.045,i*(.08+o()*.2)),e.restore(),c+=s[n]})}function Qs(e,t,n){let r=document.createElement(`canvas`);r.width=e,r.height=t,n(r.getContext(`2d`));let i=new Mt(r);return i.colorSpace=a,i.anisotropy=4,i}function $s(e,t,n,r,i,a,o){let s=Ct(`#ffffff`,{map:e,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),c=new Pt(new ce(t,n),s);return c.position.set(r,i,a),c.rotation.y=o,c.receiveShadow=!0,c.userData.decal=!0,c}var ec=`#e8bf1a`;function tc(e){let t=Ct(`#ffffff`,{map:e});return t.onBeforeCompile=e=>{e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
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
      }`)},t.customProgramCacheKey=()=>`danfo-yellow-v1`,t}async function nc(){let[e,...t]=await Promise.all([Ds(Vs),...Hs.map(e=>Ls(e))]),n=Object.fromEntries(Hs.map((e,n)=>[e,t[n]])),r=e,i=new mt;i.name=`compound`;let a=new Ps;i.add(a.group);let o=[],c=[],l=e=>e&&i.add(e),u=(e,t,n,r,i,o,s)=>a.add(e,t,n,r,i,o,s),d=new Ms(`ground`,r.corrugated_metal,{texel:3,cast:!1});d.span(-15,-.05,-9,Ys,0,9,`#b3a995`);let f=new Ms(`dirt`,r.dirt_ground,{texel:4,cast:!1});f.span(-90,-.12,-90,90,-.02,90,`#7d6f52`);let p=(e,t,n,r,i,a)=>{let o=Xs(a);for(let a=0;a<i;a++){let i=new Ze(1,1,.012,9);i.scale(n*(.45+o()*.4),1,r*(.45+o()*.4)),f.add(i,Q(e+(o()-.5)*n,.006,t+(o()-.5)*r,o()*3),`#6f6044`)}};p(12.2,0,2.6,3.5,6,11),p(-11,1.8,1.8,1.2,4,12),p(2,-5.6,1.2,.9,3,13),p(-3,5.4,1.4,.8,3,14);let m=new Ms(`veranda-tiles`,r.cracked_tiles,{texel:1.6,cast:!1});u(`yard_concrete`,`Yard concrete`,`floor`,[0,0,0],[30,.1,18],[0,1,0],d.baseOf(`#b3a995`)),u(`dirt`,`Bare dirt`,`floor`,[12.2,0,0],[5,.1,7],[0,1,0],f.baseOf(`#6f6044`)),l(d.build()),l(f.build());let h=[`#2f7d3a`,`#2a5db0`,`#a8322d`,`#7a4a2a`,`#e0b030`,`#4a4a8a`],g=[`#8d8f91`,`#7b5a42`,`#a9abae`,`#6f7173`,`#8a6a50`,`#b8b9bb`],_=(e,t,n,i,a,s,d)=>{let f=-9*e,p=t=>f-e*t,h=6/d;for(let m=0;m<d;m++){let d=new Os(`${t}-${m}`);c.push(d);let _=new Ms(`${t}-plaster-${m}`,r.plaster_wall,{texel:2.5,fade:d}),v=new Ms(`${t}-eave-${m}`,r.rusty_metal,{texel:1.5,fade:d,doubleSide:!0});for(let r=0;r<h;r++){let c=m*h+r,l=-15+c*qs,d=l+qs/2,y=d-Js/2,b=d+Js/2;_.span(l,0,p(.83),l+qs,Us,p(Ws),a);for(let[e,t]of[[l,y],[b,l+qs]])_.span(e,0,p(0),t,1.1,p(Gs),i),_.span(e,1.1,p(0),t,Us,p(Gs),a),o.push(no(e,p(0),t,p(Gs),!0));_.span(y,2.2,p(0),b,Us,p(Gs),a),_.box(d,1.08,p(.7999999999999999),1.3599999999999999,2.16,.06,s[c]),_.box(d+.5,1,p(.75),.05,.05,.1,`#d9b34a`),_.box(l+.9,1.5,f+e*.03,.9,.9,.06,`#252b33`);for(let t=0;t<3;t++)_.box(l+.9,1.25+t*.25,f+e*.07,.9,.04,.03,`#4b5661`);u(`${t}_door_${c}`,`${n} door ${c+1}`,`door`,[d,1.08,p(.7999999999999999)],[Js,2.16,.2],[0,0,e],_.baseOf(s[c]));let x=2.35,S=3.25-2.62,C=Math.hypot(x,S);v.add(Ns(4.96,C,16),Q(d,5.87/2,p(-1.125),0,e*Math.atan2(S,x)).multiply(Q(0,0,0,0,-Math.PI/2)),g[(c+(e>0?0:3))%g.length])}let y=m*h*qs-Ys;for(let e=0;e<=h;e++){let t=y+e*qs;_.add(new Ze(.09,.09,2.66,8),Q(t,1.33,p(-2.2)),`#3a3a38`),o.push(ro(t,p(-2.2),.13))}_.span(y,Us,p(0),y+h*qs,3.3200000000000003,p(Ws),`#6d6b66`),l(_.build()),l(v.build()),u(`${t}_eave_${m}`,`${n} zinc eave ${m+1}`,`roof edge`,[y+h*qs/2,2.95,p(-1.1)],[h*qs,.6,2.3],[0,-1,e],v.baseOf(g[0]))}o.push(no(-15,p(Gs),Ys,p(Ws),!0));let _=new Ms(`probe`,r.plaster_wall);u(`${t}_lower`,`${n}, lower band`,`wall`,[0,.55,p(.1)],[30,1.1,.4],[0,0,e],_.baseOf(i)),u(`${t}_upper`,`${n}, upper wall`,`wall`,[0,2.15,p(.1)],[30,2.1,.4],[0,0,e],_.baseOf(a)),m.span(-15,0,f,Ys,.015,p(-2.2),`#b49a82`),u(`${t}_veranda`,`${n} veranda tiles`,`floor`,[0,0,p(-2.2/2)],[30,.1,Ks],[0,1,0],m.baseOf(`#b49a82`))};_(1,`north`,`North block`,`#2b958f`,`#e8dcb8`,h,3),_(-1,`south`,`South block`,`#b0603c`,`#ead9a2`,[...h].reverse(),3),l(m.build());let y=new Ms(`walls`,r.painted_concrete,{texel:3}),b=`#2fa59b`;y.span(-15,0,-9,-14.7,2.6,9,b),y.span(-15.05,2.6,-9,-14.65,2.72,9,`#d6cdb0`),o.push(no(-15.4,-9,-14.7,9,!0)),u(`west_wall`,`West wall (turquoise)`,`wall`,[-14.7,1.3,0],[.3,2.6,18],[1,0,0],y.baseOf(b));let x=new Ms(`zinc-fence`,r.rusty_metal,{texel:1.5,doubleSide:!0}),S=[`#8d8f91`,`#7b5a42`,`#a7a9ac`,`#6f7173`,`#8a6a50`,`#9a9c9f`],C=6.4/6;for(let e of[-1,1]){for(let t=0;t<6;t++){let n=e*(2.6+C*(t+.5)),r=S[(t*2+ +(e>0))%S.length];x.add(Ns(1.0866666666666667,2.2,4),Q(14.9,1.1,n,-Math.PI/2),r),u(`zinc_${e>0?`s`:`n`}${t}`,`Zinc fence sheet`,`fence`,[14.9,1.1,n],[.1,2.2,C],[-1,0,0],x.baseOf(r))}x.span(14.84,2.2,Math.min(e*2.6,e*9),14.98,2.28,Math.max(e*2.6,e*9),`#4b4038`),o.push(no(14.8,Math.min(e*2.6,e*9),15,Math.max(e*2.6,e*9),!0));for(let t=0;t<=6;t++)y.add(new Ze(.06,.06,2.3,6),Q(14.8,1.15,e*(2.6+C*t)),`#5a4332`)}for(let e of[-1,1]){let t=e*2.6,n=e*3.1;y.span(14.5,0,Math.min(t,n),15.1,2.9,Math.max(t,n),`#e8dcb8`),y.span(14.45,2.9,Math.min(t,n)-.05,15.15,3.05,Math.max(t,n)+.05,`#2b958f`),o.push(no(14.5,Math.min(t,n),15.1,Math.max(t,n),!0)),u(`gate_pillar_${e>0?`s`:`n`}`,`Gate pillar`,`wall`,[14.5,1.45,(t+n)/2],[.1,2.9,.5],[-1,0,0],y.baseOf(`#e8dcb8`))}l(x.build());let w=Xs(419),T=Qs(1024,400,e=>{Zs(e,`THIS HOUSE IS`,512,120,118,`#0d0d0d`,w),Zs(e,`NOT FOR SALE`,512,250,118,`#0d0d0d`,w),Zs(e,`BEWARE OF 419`,512,370,78,`#b3261e`,w)}),E=`#e9dfc0`,D=Qs(768,320,e=>{e.fillStyle=E,e.beginPath();for(let t=0;t<=40;t++)((t,n)=>e.lineTo(t+(w()-.5)*7,n+(w()-.5)*7))(14+t/40*740,14);for(let t=0;t<=14;t++)e.lineTo(754+(w()-.5)*7,14+t/14*292);for(let t=0;t<=40;t++)e.lineTo(754-t/40*740+(w()-.5)*7,306+(w()-.5)*7);for(let t=0;t<=14;t++)e.lineTo(14+(w()-.5)*7,306-t/14*292);e.closePath(),e.fill(),Zs(e,`POST NO BILL`,384,205,112,`#6e1f1a`,w)}),k=new Os(`sign-wall`);c.push(k);let ee=new Ms(`sign-wall`,r.painted_concrete,{texel:3,fade:k});ee.span(-14.7,0,-1.6,-8.5,2.4,-1.3,b),ee.span(-14.75,2.4,-1.65,-8.45,2.5,-1.25,`#d6cdb0`),l(ee.build()),o.push(no(-14.7,-1.65,-8.45,-1.25,!0)),u(`sign_wall`,`Painted partition wall (THIS HOUSE IS NOT FOR SALE)`,`wall`,[-11.6,1.2,-1.3],[6.2,2.4,.3],[0,0,1],ee.baseOf(b)),l($s(T,4.3,1.75,-11.6,1.38,-1.285,0)),l($s(D,1.6,.67,-10.9,1.55,-8.988,0)),u(`post_no_bill`,`"POST NO BILL" cream patch`,`wall`,[-10.9,1.55,-8.99],[1.6,.67,.1],[0,0,1],new s(E));let A=new Ms(`props`,null),j=new Ms(`wood-props`,r.old_wood,{texel:1.2}),M=(e,t,n,r,i,a,o,s,c,l=0,u=0)=>e.add(new ke(a,o,s),t.clone().multiply(Q(n,r,i,0,l,u)),c),N=(e,t,n,r,i,a,o,s,c,l=10)=>e.add(new Ze(o,a,s,l),t.clone().multiply(Q(n,r+s/2,i)),c),P=`#1e56b8`,te=(e,t,n=P)=>{let r=Q(e,0,t);N(A,r,0,0,0,.3,.3,.95,n,12);for(let e of[.28,.62])N(A,r,0,e,0,.318,.318,.05,`#163f8a`,12);N(A,r,0,.95,0,.26,.26,.04,`#3a76d6`,12),N(A,r,.11,.99,.05,.04,.04,.05,`#f0f0ea`,6),o.push(ro(e,t,.32,.95,!0))},F=(e,t,n,r,i)=>{i.forEach(([e,t],i)=>te(n+e,r+t,i===1?`#1a4aa0`:P));let a=i.reduce((e,t)=>e+t[0],0)/i.length+n,o=i.reduce((e,t)=>e+t[1],0)/i.length+r;u(e,t,`drums`,[a,.5,o],[1.5+Math.abs(i[1][0]),1,1.5],[0,0,1],A.baseOf(P))};F(`drums_a`,`Blue drum cluster (north veranda)`,-10.5,-5.8,[[0,0],[.66,.12],[.28,.64],[-.45,.5]]),F(`drums_b`,`Blue drum cluster (south veranda)`,4.6,5.7,[[0,0],[.64,.05],[.3,-.55]]),F(`drums_c`,`Blue drums by the signs`,-14,-7,[[0,0],[.1,.65]]);for(let[e,t,n]of[[-7,-7.4,`#e07b2a`],[8.6,-7.5,`#2e8b57`],[7.3,7.7,`#d9577a`],[-1.5,6.1,`#e8c23a`]]){let r=Q(e,0,t);N(A,r,0,0,0,.3,.4,.17,n,14),N(A,r,0,.15,0,.34,.34,.03,`#2b2b2b`,14),o.push(ro(e,t,.38,.17,!0))}let ne=(e,t,n,r,i=`#f2f2ee`)=>{let a=Q(e,t,n,r);M(A,a,0,.45,0,.46,.05,.44,i),M(A,a,0,.74,-.2,.46,.5,.04,i,-.1);for(let[e,t]of[[-.2,-.18],[.2,-.18],[-.2,.18],[.2,.18]])N(A,a,e,0,t,.022,.022,.45,`#dcdcd6`,6)};for(let[e,t,n]of[[-4.3,-8.2,0],[-3.65,-8,.25],[4.6,-7.1,Math.PI],[5.4,-7.15,Math.PI-.2],[-9,8.15,Math.PI],[-8.15,8.25,Math.PI+.3]])ne(e,0,t,n),o.push(ro(e,t,.27));for(let e=0;e<5;e++)ne(9.3+e%2*.02,e*.13,6.5,.4+e*.05);o.push(ro(9.3,6.5,.34)),u(`chairs_stack`,`Stacked white plastic chairs`,`chairs`,[9.3,.6,6.5],[.7,1.2,.7],[0,0,1],A.baseOf(`#f2f2ee`)),u(`chairs_north`,`White plastic chairs`,`chairs`,[-3.97,.5,-8.1],[1.2,1,.6],[0,0,1],A.baseOf(`#f2f2ee`));let I=Q(-13.2,0,4.6);M(j,I,0,.06,0,1.3,.12,.95,`#8c8574`),M(A,I,0,.43,0,1,.62,.7,`#d2492e`),M(A,I,0,.84,0,.88,.22,.4,`#a52d1a`),M(A,I,.51,.45,0,.05,.32,.42,`#1f1f22`),M(A,I,.53,.52,.1,.03,.08,.08,`#7bd36b`),N(A,I,-.35,.74,-.36,.04,.04,.6,`#2b2b2d`,6);for(let[e,t]of[[-.5,-.36],[.5,-.36],[-.5,.36],[.5,.36]])N(A,I,e,.12,t,.02,.02,.9,`#3a3a3c`,5);o.push(no(-13.85,4.1,-12.55,5.1,!1,1.05,!0)),u(`generator`,`Diesel generator`,`generator`,[-13.2,.5,4.6],[1.3,1.1,.95],[1,0,0],A.baseOf(`#d2492e`));let re=new q(-13.2,.6,4.6),L=Q(-7.5,0,0);for(let e of[-3.6,3.6])N(A,L,0,0,e,.06,.05,2.6,`#4a3a2c`,6),o.push(ro(-7.5,e,.1));M(A,L,0,2.43,0,.012,.012,7.2,`#2a2a2a`),[`#d9382c`,`#f2f0e6`,`#2a5db0`,`#f2c230`,`#2f9d57`,`#e2762c`,`#7b3fa0`,`#f4a8c0`,`#1d1d1f`].forEach((e,t)=>{let n=.95+t%3*.12,r=.5+t%2*.12,i=-3.1+t*.78,a=Q(-7.5+t*7%5*.012,0,i,(t%3-1)*.15);M(A,a,0,2.4-n/2,0,.025,n,r,e),u(`cloth_${t}`,`Cloth on the line`,`cloth`,[-7.5,2.4-n/2,i],[.3,n,r],[1,0,0],A.baseOf(e))});let R=Q(-4.5,0,8.35);M(j,R,0,.45,0,2.2,.06,.45,`#8a5a32`);for(let e of[-.95,.95])M(j,R,e,.22,0,.08,.44,.38,`#6e4526`);o.push(no(-5.6,8.1,-3.4,8.6,!1,.5,!0)),u(`bench`,`Wooden bench`,`bench`,[-4.5,.3,8.35],[2.2,.6,.45],[0,0,1],j.baseOf(`#8a5a32`));let ie=Q(5,0,-8);M(j,ie,0,.74,0,1.4,.06,.8,`#7d5030`);for(let[e,t]of[[-.62,-.33],[.62,-.33],[-.62,.33],[.62,.33]])M(j,ie,e,.37,t,.07,.74,.07,`#5f3b20`);o.push(no(4.3,-8.4,5.7,-7.6,!1,.77,!0)),u(`table`,`Wooden table`,`table`,[5,.4,-8],[1.4,.8,.8],[0,0,1],j.baseOf(`#7d5030`));let se=Math.PI*2,ce=Xs(77),le=`#d6c7a0`,ue=(e,t,n,r,i=le)=>{let a=new O(.5,8,6);a.scale(.72,.3,.5),A.add(a,Q(e,t,n,r),i)};for(let[e,t,n,r,i]of[[-.55,.15,-8.1,.1,le],[.02,.15,-8.06,-.15,`#a8402f`],[.57,.15,-8.12,.2,le],[-.27,.42,-8.08,.05,`#4b7a45`],[.28,.42,-8.1,-.1,le],[0,.69,-8.09,.2,le]])ue(e,t,n,r,i);o.push(no(-.95,-8.45,.95,-7.75,!1,.82,!0)),u(`sacks`,`Pile of sacks`,`sacks`,[0,.45,-8.1],[1.9,.9,.7],[0,0,1],A.baseOf(le));let de=`#1d1d20`;for(let e=0;e<4;e++)A.add(new z(.26,.09,6,12),Q(12.9,.09+e*.18,-3.5,e*.5,Math.PI/2),de);A.add(new z(.26,.09,6,12),Q(12.2,.09,-3.95,.3,Math.PI/2),de),o.push(ro(12.9,-3.5,.38,.76,!0),ro(12.2,-3.95,.36,.18,!0)),u(`tyres`,`Stack of tyres`,`tyres`,[12.9,.4,-3.5],[.8,.8,.8],[-1,0,0],A.baseOf(de));let fe=(e,t,n)=>{A.add(new Ze(.17,.17,.05,10),Q(e,.025,t),`#2b2b2b`),A.add(new Ze(.16,.16,.46,10),Q(e,.28,t),n),A.add(new O(.16,10,5,0,se,0,Math.PI/2),Q(e,.51,t),n),A.add(new Ze(.06,.06,.1,6),Q(e,.7,t),`#d9b34a`)};for(let[e,t,n]of[[-13.6,8.2,`#c0291f`],[-13.05,8.35,`#2f7d3a`],[-13.3,7.8,`#c0291f`]])fe(e,t,n);o.push(no(-13.9,7.5,-12.75,8.6,!1,.66,!0)),u(`gas`,`Gas cylinders`,`gas`,[-13.3,.35,8.1],[1.2,.7,1.1],[0,0,-1],A.baseOf(`#c0291f`));let pe=Q(3.4,0,-3.4);M(j,pe,0,.76,0,1.7,.06,.8,`#8a5a32`);for(let[e,t]of[[-.78,-.33],[.78,-.33],[-.78,.33],[.78,.33]])M(j,pe,e,.38,t,.06,.76,.06,`#5f3b20`);[`#d13b2e`,`#f1c232`,`#2a5db0`,`#2f9d57`,`#e2762c`,`#7b3fa0`,`#f4a8c0`,`#17a2a8`].forEach((e,t)=>M(A,pe,-.62+t%4*.42,.86+Math.floor(t/4)*.15,t%2*.1-.05,.38,.14,.3,e)),A.add(new Ze(.03,.03,2.3,6),Q(3.4,1.15,-3.4),`#3a3a38`),o.push(no(2.55,-3.8,4.25,-3,!1,.8,!0)),u(`stall_fabric`,`Market stall (ankara bolts)`,`fabric`,[3.4,.95,-3.4],[1.7,.5,.8],[0,0,1],A.baseOf(`#d13b2e`));let me=new Os(`umbrella`);c.push(me);let he=new Ms(`umbrella`,null,{fade:me,doubleSide:!0}),ge=[`#d13b2e`,`#f1c232`];for(let e=0;e<8;e++)he.add(new Ze(.03,1.4,.45,3,1,!0,e*se/8,se/8),Q(3.4,2.3,-3.4),ge[e%2]);l(he.build()),u(`umbrella`,`Market umbrella`,`canopy`,[3.4,2.3,-3.4],[2.8,.5,2.8],[0,-1,0],he.baseOf(`#d13b2e`));let _e=`#9b9a93`;for(let[e,t,n]of[[6.95,7.4,.4],[7.4,7.85,.8],[7.85,8.3,1.2]])A.span(10,0,e,11.4,n,t,_e),o.push(no(10,e,11.4,t,!1,n,!0));u(`block_steps`,`Hollow-block steps`,`blocks`,[10.7,.6,7.6],[1.4,1.2,1.35],[0,0,-1],A.baseOf(_e));let ve=Q(14,0,7.4);for(let[e,t]of[[-.42,-.42],[.42,-.42],[-.42,.42],[.42,.42]])N(A,ve,e,0,t,.045,.045,1.32,`#4a4d52`,6);M(A,ve,0,1.36,0,1,.08,1,`#4a4d52`),N(A,ve,0,1.4,0,.5,.48,.95,`#25282b`,14),A.add(new O(.48,14,5,0,se,0,Math.PI/2),ve.clone().multiply(Q(0,2.35,0)),`#2f3235`),o.push(ro(14,7.4,.6)),u(`water_tank`,`Black water tank on a stand`,`tank`,[14,1.4,7.4],[1.1,2.8,1.1],[-1,0,0],A.baseOf(`#25282b`));let ye=`#6a4a2c`;[[-14.38,.1,0],[-14.14,.1,0],[-13.9,.1,0],[-14.26,.29,0],[-14.02,.29,0],[-14.14,.48,0]].forEach(([e,t],n)=>{for(let r=0;r<2;r++)A.add(new Ze(.1,.1,.55,7),Q(e,t,-4.45+r*.52+(ce()-.5)*.04,0,Math.PI/2),(n+r)%2?ye:`#7d5a36`)}),o.push(no(-14.65,-4.75,-13.75,-3.9,!1,.62,!0)),u(`firewood`,`Firewood stack`,`firewood`,[-14.2,.3,-4.2],[.9,.65,1],[1,0,0],A.baseOf(ye));let be=`#b8321f`,xe=Q(-1.5,0,-3.3);for(let e of[-.7,.7])A.add(new z(.26,.07,6,14),xe.clone().multiply(Q(e,.33,0)),`#1d1d20`),N(A,xe,e,.28,-.05,.07,.07,.1,`#9a9a9a`,8);M(A,xe,0,.42,0,1,.07,.1,`#7d2417`),M(A,xe,.2,.64,0,.42,.2,.3,be),M(A,xe,-.32,.66,0,.62,.1,.28,`#1f1f22`),M(A,xe,.05,.3,0,.3,.24,.22,`#6b6b6b`),M(A,xe,.62,.58,0,.05,.62,.08,`#4a4a4a`,0,-.32),M(A,xe,.54,.88,0,.06,.05,.55,`#2a2a2a`),A.add(new O(.09,8,6),xe.clone().multiply(Q(.7,.8,0)),`#f3e7a3`),N(A,xe,-.4,.24,.16,.035,.03,.55,`#555`,6),o.push(no(-2.45,-3.55,-.55,-3.05,!1,.95,!0)),u(`okada`,`Okada (red motorbike)`,`bike`,[-1.5,.5,-3.3],[1.9,1,.45],[0,0,1],A.baseOf(be));let Se=`#2e7d5b`,Ce=new Os(`container`);c.push(Ce);let we=new Ms(`container`,r.rusty_metal,{texel:1.5,fade:Ce,doubleSide:!0});we.add(Ns(3.2,2.4,14),Q(7.2,1.25,-1,Math.PI),Se),we.add(Ns(3.2,2.4,14),Q(7.2,1.25,1.4,0),Se),we.add(Ns(2.4,2.4,10),Q(8.8,1.25,.2,Math.PI/2),Se),we.add(Ns(3.4,2.6,15),Q(7.2,2.5,.2,0,-Math.PI/2),`#2a6a4d`),we.add(Ns(1.2,2.3,6),Q(5,1.2,-1.07,Math.PI),`#2a5db0`),we.add(Ns(1.2,2.3,6),Q(5,1.2,1.47,0),`#2a5db0`),we.add(new ke(.12,2.5,.12),Q(5.6,1.25,-.98),`#23272b`),we.add(new ke(.12,2.5,.12),Q(5.6,1.25,1.38),`#23272b`),we.add(new ke(.14,.14,2.5),Q(5.6,2.45,.2),`#23272b`),l(we.build()),M(j,Q(7.2,0,.2),0,.05,0,3,.1,2.3,`#7a5a38`),o.push(no(5.5,-1.1,8.9,-.97,!0),no(5.5,1.34,8.9,1.47,!0),no(8.77,-1.1,8.9,1.47,!0),no(4.4,-1.15,5.6,-.99,!0),no(4.4,1.38,5.6,1.52,!0),no(5.7,-.9,8.7,1.3,!1,.1,!0));for(let[e,t,n,r]of[[8.35,-.55,.3,`#e8b520`],[8.35,-.55,.6,`#c0291f`]])A.span(e-.3,.1+(n-.3),t-.22,e+.3,.1+n,t+.22,r);ue(8.3,.25,.85,.3),ue(8.28,.5,.82,-.2,`#a8402f`),o.push(no(8.03,-.77,8.67,-.33,!1,.7,!0),ro(8.3,.85,.34,.65,!0)),u(`container_north`,`Container shop, outer wall`,`container`,[7.2,1.25,-1],[3.2,2.4,.2],[0,0,-1],we.baseOf(Se)),u(`container_south`,`Container shop, outer wall`,`container`,[7.2,1.25,1.4],[3.2,2.4,.2],[0,0,1],we.baseOf(Se)),u(`container_inside`,`Container shop, inner back wall`,`container`,[8.7,1.25,.2],[.2,2.4,2.3],[-1,0,0],we.baseOf(Se)),u(`container_doors`,`Container doors (blue)`,`container`,[5,1.2,-1.07],[1.2,2.3,.2],[0,0,-1],we.baseOf(`#2a5db0`));for(let[e,t,n]of[[0,.3,`#e8b520`],[1,.6,`#c0291f`],[2,.9,`#e8b520`]]){let r=-5.6+e*.55;A.span(r,0,3.2,r+.55,t,3.75,n),A.span(r+.05,t,3.25,r+.5,t+.015,3.7,`#6f5410`),o.push(no(r,3.2,r+.55,3.75,!1,t,!0))}u(`crate_stairs`,`Crate stairs`,`crates`,[-4.8,.45,3.5],[1.65,.9,.55],[0,0,1],A.baseOf(`#e8b520`)),A.span(-9.8,0,5.9,-6.8,.85,6.5,`#a9a79f`),A.span(-9.7,.85,5.95,-6.9,.92,6.45,`#4e6b34`),o.push(no(-9.8,5.9,-6.8,6.5,!1,.85,!0)),u(`planter`,`Concrete planter`,`planter`,[-8.3,.45,6.2],[3,.9,.6],[0,0,-1],A.baseOf(`#a9a79f`)),M(j,Q(-10,0,3.4),0,.075,0,1.2,.15,1,`#8a6a42`);for(let e=0;e<4;e++)for(let[t,n]of[[-.28,-.2],[.28,-.2],[-.28,.2],[.28,.2]])M(A,Q(-10+e%2*.03,0,3.4,e*.5),t,.21+e*.12,n,.5,.12,.33,e%2?`#b8b2a4`:`#a39d90`);o.push(no(-10.6,2.9,-9.4,3.9,!1,.66,!0)),u(`cement_bags`,`Cement bags on a pallet`,`sacks`,[-10,.4,3.4],[1.2,.8,1],[0,0,-1],A.baseOf(`#b8b2a4`)),l(A.build()),l(j.build());let Te=`#5a8a38`,V={grass:Ct(Te),leafsGreen:Ct(`#4f8a3a`),woodBark:Ct(`#8a6a46`)},Ee=(e,t,r={})=>{for(let a of zs(n[e],t,r))i.add(a)},De=[{x:-.95,z:8.55,rx:.2,s:[4.2,3.4,4.2],tint:`#d49a6a`},{x:0,z:8.55,rx:.22,ry:.06,s:[4.2,3.4,4.2],tint:`#b9bec3`},{x:.95,z:8.55,rx:.2,ry:-.05,s:[4.2,3.4,4.2],tint:`#e0b896`}];Ee(`surv_metal-panel`,De),o.push(no(-1.6,8.3,1.6,8.9)),De.forEach((e,t)=>u(`sheet_${t}`,`Leaning zinc sheet`,`sheets`,[e.x,.9,8.6],[2,1.8,.4],[0,0,1],Bs(n[`surv_metal-panel`][0],e.tint))),Ee(`surv_box`,[{x:12.4,z:-8,s:3.4},{x:13.4,z:-8.05,ry:.15,s:3.4},{x:12.9,y:.86,z:-8,ry:.4,s:3.4}]),Ee(`surv_box-large`,[{x:14.1,z:-6.9,ry:1.2,s:3.4}]),o.push(no(11.95,-8.45,12.85,-7.55,!1,.85,!0),no(12.95,-8.5,13.85,-7.6,!1,.85,!0),no(12.45,-8.45,13.35,-7.55,!1,1.71,!0),ro(14.1,-6.9,.6,.85,!0)),u(`crates`,`Stacked crates`,`crates`,[13,.6,-7.9],[2.4,1.3,1.1],[0,0,1],Bs(n.surv_box[0]));let Oe=[{x:1.55,z:-8.3,s:2.3,tint:`#e0503c`},{x:-7.2,z:-8,s:2.3,tint:`#2a6fd0`},{x:-12,z:8.05,s:2.3,tint:`#f0c030`},{x:12.5,z:7.9,s:2.3,tint:`#3da35a`}];Ee(`surv_bucket`,Oe),Oe.forEach(e=>o.push(ro(e.x,e.z,.2,.44,!0)));let H=[{x:8,z:3.1},{x:8.3,z:6},{x:13.7,z:-3.4}];Ee(`car_cone`,H),H.forEach(e=>o.push(ro(e.x,e.z,.22))),Ee(`nat_plant_bushLarge`,[{x:13.9,z:-5.4,s:5.2,ry:.4},{x:-13.7,z:2,s:5,ry:2},{x:-17.5,z:-11,s:5.5},{x:-18.5,z:6,s:6},{x:18,z:-12.5,s:5.5,ry:1},{x:19,z:8.5,s:5.2},{x:-4,z:-17.5,s:5.5},{x:6,z:18,s:5.2}],{materials:V}),o.push(ro(13.9,-5.4,.85),ro(-13.7,2,.8)),u(`bush_east`,`Bush against the east fence`,`foliage`,[13.9,.6,-5.4],[2,1.2,2],[1,0,0],new s(Te)),u(`bush_west`,`Bush by the west wall`,`foliage`,[-13.7,.6,2],[2,1.2,2],[-1,0,0],new s(Te)),Ee(`nat_plant_bush`,[{x:-6,z:-17,s:5},{x:10,z:-18,s:5,ry:2},{x:22,z:2,s:5},{x:-21,z:-3,s:5}],{materials:V}),Ee(`nat_tree_palm`,[{x:-19,z:-4,s:4.5},{x:-20,z:12,s:4.2,ry:1},{x:20,z:-9,s:4.4},{x:21,z:12,s:4.6,ry:2},{x:-9,z:-19,s:4.4},{x:11,z:20,s:4.3}],{materials:V}),Ee(`nat_tree_palmShort`,[{x:18,z:0,s:4},{x:4,z:-20,s:4,ry:1},{x:-22,z:7,s:4,ry:2}],{materials:V});let Ae=n.car_van,U=Ae.find(e=>e.name===`body`),W=Ae.filter(e=>e.name.startsWith(`wheel`)),G=new mt;G.position.set(11.2,0,4.4),G.rotation.y=Math.PI/2,G.scale.set(1.35,1.7,1.7);let je=new Pt(U.geometry,tc(U.material.map));je.applyMatrix4(U.local),je.castShadow=je.receiveShadow=!0,je.name=`danfo-body`,je.userData.baseColor=new s(ec);let Me=W.map(e=>e.geometry.clone().applyMatrix4(e.local)),Ne=new Pt(ct(Me,!1),W[0].material);Ne.castShadow=!0,Ne.name=`danfo-wheels`,Ne.userData.baseColor=W[0].baseColor.clone(),G.add(je,Ne),i.add(G),o.push(no(8.85,3.35,13.55,5.45,!0)),u(`danfo`,`Danfo (yellow, black stripes)`,`vehicle`,[11.2,1,4.4],[4.7,2.1,2],[0,0,-1],new s(ec));let K=(e,t)=>new q(e,0,t),Pe=(e,t)=>new q(e,0,t),Fe=[{id:`sign_wall`,label:`Painted turquoise wall (THIS HOUSE IS NOT FOR SALE)`,shape:`flat wall`,at:K(-11.6,-.9),facing:Pe(0,-1)},{id:`post_no_bill`,label:`POST NO BILL cream patch`,shape:`flat wall, small patch`,at:K(-10.9,-8.45),facing:Pe(0,-1),probeY:1.55},{id:`drums_a`,label:`Blue drum cluster`,shape:`round cluster`,at:K(-10.2,-4.5),facing:Pe(0,-1)},{id:`drums_b`,label:`Blue drums by the south veranda`,shape:`round cluster`,at:K(4.9,4.55),facing:Pe(0,1)},{id:`doorway_north`,label:`Red doorway recess (north row)`,shape:`recess`,at:K(-2.5,Ie(.45)),facing:Pe(0,-1),reach:.4},{id:`doorway_south`,label:`Yellow doorway recess (south row)`,shape:`recess`,at:K(-7.5,9.45),facing:Pe(0,1),reach:.4},{id:`clothesline`,label:`Under the clothes line`,shape:`hanging cloth, multicolour`,at:K(-7.5,.35),facing:Pe(0,1)},{id:`danfo`,label:`Beside the danfo`,shape:`long vehicle`,at:K(11.2,2.95),facing:Pe(0,1)},{id:`zinc_fence`,label:`Against the zinc fence`,shape:`corrugated fence`,at:K(14.3,6.2),facing:Pe(1,0)},{id:`generator`,label:`Behind the generator`,shape:`box block`,at:K(-14.2,4.6),facing:Pe(1,0)},{id:`chairs_stack`,label:`Stacked white chairs`,shape:`tall stack`,at:K(9.3,5.75),facing:Pe(0,1)},{id:`bush_east`,label:`Bush in the east corner`,shape:`foliage`,at:K(12.75,-5.4),facing:Pe(1,0)},{id:`bench`,label:`Wooden bench on the south veranda`,shape:`low bench`,at:K(-4.5,7.6),facing:Pe(0,1)},{id:`sheets`,label:`Rusty zinc sheets leaning on the wall`,shape:`leaning slabs`,at:K(0,7.9),facing:Pe(0,1)},{id:`crates`,label:`Stacked crates`,shape:`stepped boxes`,at:K(12.9,-6.9),facing:Pe(0,-1)},{id:`container`,label:`Inside the container shop`,shape:`enclosed box, one open side`,at:K(8.3,.2),facing:Pe(1,0),probeY:1},{id:`crate_stairs`,label:`Bottle-crate stairs (climbable)`,shape:`stepped crates`,at:K(-4.8,2.55),facing:Pe(0,1),probeY:.4},{id:`planter`,label:`Concrete planter (climbable)`,shape:`long low wall`,at:K(-8.3,5.2),facing:Pe(0,1),probeY:.5},{id:`cement_bags`,label:`Cement bags on a pallet (climbable)`,shape:`grey pile`,at:K(-10,2.5),facing:Pe(0,1),probeY:.4},{id:`sacks`,label:`Pile of sacks`,shape:`soft pile`,at:K(0,-7.25),facing:Pe(0,-1)},{id:`tyres`,label:`Stack of tyres`,shape:`black stack`,at:K(11.85,-3.4),facing:Pe(1,0)},{id:`gas`,label:`Gas cylinders`,shape:`round cluster, low`,at:K(-13.3,7),facing:Pe(0,1)},{id:`stall_fabric`,label:`Market stall with ankara bolts`,shape:`multicolour table`,at:K(3.4,-2.6),facing:Pe(0,-1),probeY:.9},{id:`block_steps`,label:`Hollow-block steps (climbable)`,shape:`stepped blocks`,at:K(10.7,6.45),facing:Pe(0,1),probeY:.4},{id:`water_tank`,label:`Water tank on a stand`,shape:`tall cylinder`,at:K(13.1,7.4),facing:Pe(1,0),probeY:1.6},{id:`firewood`,label:`Firewood stack`,shape:`low log pile`,at:K(-13.1,-4.2),facing:Pe(-1,0),probeY:.4},{id:`okada`,label:`Okada (motorbike)`,shape:`low vehicle`,at:K(-1.5,-2.45),facing:Pe(0,-1),probeY:.5},{id:`north_wall`,label:`Turquoise band under the north veranda`,shape:`flat wall band`,at:K(-12.5,-8.5),facing:Pe(0,-1)}];function Ie(e){return-9-e}let Le=Fe.map(e=>{let t=e.at.clone().addScaledVector(e.facing,e.reach??.55);t.y=e.probeY??.9;let n={s:a.nearest(t,1.5)},r={x:e.at.x,z:e.at.z};return bo(r,.3-.02,o)&&console.warn(`[compound] hiding spot ${e.id} overlaps a collider (would move to ${r.x.toFixed(2)}, ${r.z.toFixed(2)})`),{id:e.id,label:e.label,shape:e.shape,position:e.at,facing:e.facing.normalize(),baseColor:n.s.baseColor.clone(),surfaceId:n.s.id}}),Re=new mt;Re.visible=!1,Re.name=`hiding-markers`;let ze=()=>new B({color:`#ff2fd0`,depthTest:!1,transparent:!0,opacity:.9}),Be=new oe(new ae(.14),ze(),Le.length),Ve=new oe(new v(.28,.36,20).rotateX(-Math.PI/2),ze(),Le.length);Le.forEach((e,t)=>{Be.setMatrixAt(t,Q(e.position.x,2.45,e.position.z)),Ve.setMatrixAt(t,Q(e.position.x,.05,e.position.z))});for(let e of[Be,Ve])e.renderOrder=999,e.frustumCulled=!1,Re.add(e);return i.add(Re),{group:i,colliders:o,surfaces:a,hidingSpots:Le,fadeGroups:c,bounds:{minX:-14.7,maxX:19.5,minZ:-14.6,maxZ:14.6},spawn:new q(.5,0,.5),generator:re,baseColorAt:e=>a.baseColorAt(e),setMarkersVisible:e=>Re.visible=e}}function rc(e,t){e.background=new s(`#d9b88f`),e.fog=new be(`#d9b48b`,42,105);let n=new Te(`#b4c8e4`,`#80603f`,1.3),r=new T(`#ffcf9a`,3);r.castShadow=!0,r.shadow.mapSize.set(t,t);let i=r.shadow.camera;i.left=i.bottom=-17,i.right=i.top=17,i.near=1,i.far=110,r.shadow.radius=2.5,r.shadow.bias=-4e-4,r.shadow.normalBias=.05,e.add(r,r.target,n);let a=new q(-.72,.5,.42).normalize();return{sun:r,follow(e){let n=34/t,i=new q(0,1,0).cross(a).normalize(),o=new q().crossVectors(a,i),s=Math.round((e.x*i.x+e.z*i.z)/n)*n,c=Math.round((e.x*o.x+e.y*o.y+e.z*o.z)/n)*n,l=e.x*a.x+e.y*a.y+e.z*a.z;r.target.position.copy(i).multiplyScalar(s).addScaledVector(o,c).addScaledVector(a,l),r.position.copy(r.target.position).addScaledVector(a,60)}}}var ic={count:7,radius:.14,walkSpeed:.7,fleeSpeed:3.4,scareDistance:2,runBoost:1.5,fleeTime:[.9,1.6],idleTime:[1.5,4],peckTime:[1.5,3.5],wanderRange:[1,4],area:{minX:-14.2,maxX:14.2,minZ:-8.7,maxZ:8.7},plumage:[`#f2eee4`,`#8a4b2a`,`#2b2623`,`#c8903f`,`#a89a82`,`#d9d2c0`,`#6b3a22`]},ac=new je,oc=new ge,sc=new se,cc=(e,t,n,r=0,i=0,a=0,o=1,s=1,c=1)=>new je().compose(new q(e,t,n),oc.setFromEuler(sc.set(r,i,a,`YXZ`)),new q(o,s,c));function lc(e,t,n){let r=J(e.clone());for(let e of Object.keys(r.attributes))e!==`position`&&e!==`normal`&&r.deleteAttribute(e);r.applyMatrix4(t);let i=new s(n),a=new Float32Array(r.attributes.position.count*3);for(let e=0;e<r.attributes.position.count;e++)a.set([i.r,i.g,i.b],e*3);return r.setAttribute(`color`,new Et(a,3)),r}var uc=(e,[t,n])=>t+e()*(n-t),dc=class{colliders;cfg;group=new mt;hens=[];body;head;face;legs;r;constructor(e,t=5,n=ic){this.colliders=e,this.cfg=n;let r=t>>>0;this.r=()=>(r=r*1664525+1013904223>>>0)/4294967296;let i=`#ffffff`,a=new O(1,8,6),o=ct([lc(a,cc(0,0,0,0,0,0,.15,.14,.22),i),lc(a,cc(0,.1,.15,0,0,0,.08,.1,.08),i),lc(new de(.08,.24,5),cc(0,.1,-.23,-2.2),i),lc(a,cc(-.13,.02,-.02,0,0,.12,.04,.11,.17),i),lc(a,cc(.13,.02,-.02,0,0,-.12,.04,.11,.17),i)]),c=lc(a,cc(0,0,0,0,0,0,.062,.062,.07),i),l=ct([lc(new de(.026,.075,5),cc(0,-.012,.09,Math.PI/2),`#e8a020`),lc(new ke(.02,.045,.075),cc(0,.07,0),`#c4262e`),lc(a,cc(0,-.055,.055,0,0,0,.016,.024,.016),`#c4262e`),lc(a,cc(-.052,.014,.04,0,0,0,.011,.011,.011),`#111111`),lc(a,cc(.052,.014,.04,0,0,0,.011,.011,.011),`#111111`)]),u=ct([lc(new Ze(.011,.014,.14,5),cc(0,-.07,0),`#d9a441`),lc(new ke(.05,.012,.075),cc(0,-.14,.02),`#d9a441`)]),d=n.count,f=Ct(`#ffffff`,{vertexColors:!0}),p=Ct(`#ffffff`,{vertexColors:!0});this.body=new oe(o,f,d),this.head=new oe(c,f,d),this.face=new oe(l,p,d),this.legs=new oe(u,p,d*2);let m=new s;for(let e=0;e<d;e++)m.set(n.plumage[e%n.plumage.length]),this.body.setColorAt(e,m),this.head.setColorAt(e,m),this.face.setColorAt(e,m.set(`#ffffff`)),this.legs.setColorAt(e*2,m),this.legs.setColorAt(e*2+1,m);for(let e of[this.body,this.head,this.face,this.legs])e.instanceMatrix.setUsage(A),e.castShadow=!0,e.receiveShadow=!0,e.frustumCulled=!1,this.group.add(e);this.body.userData.baseColor=new s(n.plumage[0]),this.group.name=`chickens`;let h=n.area;for(let e=0;e<d;e++){let e={x:0,z:0,yaw:this.r()*Math.PI*2,state:`idle`,timer:uc(this.r,n.idleTime)*this.r(),tx:0,tz:0,phase:this.r()*6,peckPhase:this.r()*6,hop:0,hopV:0,lookYaw:0,lookTarget:0,speed:0,stuck:0};for(let t=0;t<40&&(e.x=h.minX+this.r()*(h.maxX-h.minX),e.z=h.minZ+this.r()*(h.maxZ-h.minZ),!this.free(e.x,e.z));t++);this.hens.push(e)}this.write()}free(e,t){return!bo({x:e,z:t},this.cfg.radius+.15,this.colliders,-5)}pickTarget(e){let t=this.cfg.area;for(let n=0;n<12;n++){let n=this.r()*Math.PI*2,r=uc(this.r,this.cfg.wanderRange),i=Math.min(t.maxX,Math.max(t.minX,e.x+Math.sin(n)*r)),a=Math.min(t.maxZ,Math.max(t.minZ,e.z+Math.cos(n)*r));if(this.free(i,a)){e.tx=i,e.tz=a;return}}e.tx=e.x,e.tz=e.z}update(e,t){let n=this.cfg;e=Math.min(e,.05);for(let r of this.hens){let i=0,a=0,o=!1;for(let e of t){let t=r.x-e.x,s=r.z-e.z,c=Math.hypot(t,s);c<n.scareDistance*(e.running?n.runBoost:1)&&(o=!0,i+=t/(c||1),a+=s/(c||1))}o&&r.state!==`flee`&&(r.state=`flee`,r.timer=uc(this.r,n.fleeTime),r.hopV=1.6+this.r()*.6),r.state===`flee`&&o&&(r.tx=r.x+i*3,r.tz=r.z+a*3,r.timer=Math.max(r.timer,.35)),r.timer-=e,r.state===`idle`&&r.timer<=0?this.r()<.55?(r.state=`peck`,r.timer=uc(this.r,n.peckTime)):(r.state=`walk`,this.pickTarget(r),r.timer=6):(r.state===`peck`&&r.timer<=0||r.state===`flee`&&r.timer<=0)&&(r.state=`idle`,r.timer=uc(this.r,n.idleTime));let s=0;if(r.state===`walk`||r.state===`flee`){let t=r.tx-r.x,i=r.tz-r.z,a=Math.hypot(t,i);if(a<.1&&r.state===`walk`)r.state=`idle`,r.timer=uc(this.r,n.idleTime);else if(s=r.state===`flee`?n.fleeSpeed:n.walkSpeed,a>.25){let n=Math.atan2(t,i),a=Math.atan2(Math.sin(n-r.yaw),Math.cos(n-r.yaw)),o=(r.state===`flee`?11:4.5)*e;r.yaw+=Math.max(-o,Math.min(o,a))}}if(r.speed+=(s-r.speed)*Math.min(1,e*9),r.speed>.02){let t={x:r.x+Math.sin(r.yaw)*r.speed*e,z:r.z+Math.cos(r.yaw)*r.speed*e},i=bo(t,n.radius,this.colliders,-5);t.x=Math.min(n.area.maxX+.5,Math.max(n.area.minX-.5,t.x)),t.z=Math.min(n.area.maxZ+.5,Math.max(n.area.minZ-.5,t.z)),r.x=t.x,r.z=t.z,r.stuck=i&&r.state===`walk`?r.stuck+e:0,r.stuck>.45&&(r.stuck=0,this.pickTarget(r)),r.phase+=e*(3+r.speed*5)}r.state===`peck`&&(r.peckPhase+=e*7),r.state===`idle`&&this.r()<e*.8&&(r.lookTarget=(this.r()-.5)*1.6),r.lookYaw+=(r.lookTarget-r.lookYaw)*Math.min(1,e*8),r.state!==`idle`&&(r.lookTarget=0),(r.hopV!==0||r.hop>0)&&(r.hopV-=9*e,r.hop=Math.max(0,r.hop+r.hopV*e),r.hop===0&&r.hopV<0&&(r.hopV=0))}this.write()}write(){this.hens.forEach((e,t)=>{let n=e.speed>.05,r=n?Math.abs(Math.sin(e.phase))*.012:0,i=e.state===`peck`?Math.max(0,Math.sin(e.peckPhase))**2:0,a=+(e.state===`flee`),o=.22+r+e.hop,s=cc(e.x,o,e.z,i*.3-a*.12,e.yaw,0);this.body.setMatrixAt(t,s);let c=n?Math.sin(e.phase*2)*.03:0,l=s.clone().multiply(cc(0,.2-i*.1,.2+c+i*.09,i*1.2,e.lookYaw,0));this.head.setMatrixAt(t,l),this.face.setMatrixAt(t,l);let u=n?Math.sin(e.phase)*Math.min(1,.4+e.speed*.4):0,d=cc(e.x,o-.08-r*.2,e.z,0,e.yaw,0);this.legs.setMatrixAt(t*2,ac.copy(d).multiply(cc(-.06,0,0,u,0,0))),this.legs.setMatrixAt(t*2+1,ac.copy(d).multiply(cc(.06,0,0,-u,0,0)))});for(let e of[this.body,this.head,this.face,this.legs])e.instanceMatrix.needsUpdate=!0}positions(){return this.hens.map(e=>({x:e.x,z:e.z}))}get states(){return this.hens.map(e=>e.state)}},fc={colorMaxPoints:75,zoneWeight:{top:.55,bottom:.45},labPerfect:8,labWorst:60,colorCurve:1.4,unpaintedCredit:0,zoneHeights:{default:{top:1.15,bottom:.5},crouch:{top:.78,bottom:.36},curl_ball:{top:.5,bottom:.3}},shapeMaxPoints:25,pose:{wall_flat:{maxWallDistance:.45,backToWallDot:.7},curl_ball:{radius:1.1,kinds:[`drums`,`crates`,`chairs`,`sacks`,`tyres`,`firewood`]},crouch:{radius:1.2,maxHeight:1.3,kinds:[`bench`,`table`,`crates`,`chairs`,`generator`,`drums`,`sacks`,`tyres`,`gas`,`bike`,`blocks`,`firewood`,`fabric`,`planter`],viewerSideDot:.3},stand_stiff:{radius:.9,kinds:[`cloth`,`foliage`,`chairs`,`tank`,`gas`,`canopy`]}},mismatchCredit:0,skinPenalty:6,skinPoseFactor:{curl_ball:.4,crouch:.75,wall_flat:.85},hairPenalty:9,hatPenalty:12,accessoryPenalty:8,movePenaltyWalk:55,movePenaltyRun:80,moveRecoverSeconds:1,meterSmoothing:10,evalHz:12};function pc(e){let t=(.4124564*e.r+.3575761*e.g+.1804375*e.b)/.95047,n=.2126729*e.r+.7151522*e.g+.072175*e.b,r=(.0193339*e.r+.119192*e.g+.9503041*e.b)/1.08883,i=e=>e>.008856?Math.cbrt(e):7.787*e+16/116,a=i(t),o=i(n),s=i(r);return[116*o-16,500*(a-o),200*(o-s)]}function mc(e,t){let[n,r,i]=pc(e),[a,o,s]=pc(t);return Math.hypot(n-a,r-o,i-s)}var hc=e=>Math.min(1,Math.max(0,e)),gc=class{probe;config;breakdown;display=0;slow=null;sinceEval=1/0;moveLevel=0;moveAtStop=0;tmp=new q;constructor(e,t=fc){this.probe=e,this.config=t,this.breakdown={total:0,zones:[],colorPoints:0,shape:{pose:`none`,credit:0,points:0,reason:``},exposure:{skin:0,hair:0,hat:0,accessory:0,total:0},movement:{penalty:0,moving:!1}}}invalidate(){this.sinceEval=1/0}update(e,t){let n=this.config,r=t.speed>.05;r?(this.moveLevel=t.running?n.movePenaltyRun:n.movePenaltyWalk,this.moveAtStop=this.moveLevel):this.moveLevel>0&&(this.moveLevel=Math.max(0,this.moveLevel-this.moveAtStop/n.moveRecoverSeconds*e)),this.sinceEval+=e,(!this.slow||this.sinceEval>=1/n.evalHz)&&(this.sinceEval=0,this.slow={zones:this.colorTerms(t),shape:this.shapeTerm(t)});let i=this.slow.zones.reduce((e,t)=>e+t.points,0),a=n.skinPenalty*(t.pose?n.skinPoseFactor[t.pose]??1:1),o=t.hairVisible?n.hairPenalty:0,s=t.hatVisible?n.hatPenalty:0,c=t.accessoryVisible?n.accessoryPenalty:0,l=a+o+s+c,u=Math.min(100,Math.max(0,i+this.slow.shape.points-l-this.moveLevel));return this.breakdown={total:u,zones:this.slow.zones,colorPoints:i,shape:this.slow.shape,exposure:{skin:a,hair:o,hat:s,accessory:c,total:l},movement:{penalty:this.moveLevel,moving:r}},this.display+=(u-this.display)*Math.min(1,e*n.meterSmoothing),this.breakdown}colorTerms(e){let t=this.config,n=e.pose&&t.zoneHeights[e.pose]||t.zoneHeights.default,r=[];for(let i of[`top`,`bottom`]){let a=this.tmp.copy(e.position);a.y+=n[i];let o=this.probe.behind(e.eye,a),s=0,c=null;e.painted[i]?o&&(c=mc(e.zones[i],o.color),s=hc(1-(c-t.labPerfect)/(t.labWorst-t.labPerfect))**t.colorCurve):s=t.unpaintedCredit,r.push({zone:i,painted:e.painted[i],behind:o?`${o.label} #${o.color.getHexString()}`:`nothing`,deltaE:c,credit:s,points:t.colorMaxPoints*t.zoneWeight[i]*s})}return r}shapeTerm(e){let t=this.config,n=(n,r)=>({pose:e.pose??`none`,credit:n,points:t.shapeMaxPoints*n,reason:r});if(!e.pose||e.pose===`idle`||e.pose===`walk`||e.pose===`run`)return n(0,`no pose held`);let r=e=>n(t.mismatchCredit,e),i=Math.sin(e.yaw),a=Math.cos(e.yaw);if(e.pose===`wall_flat`){let o=t.pose.wall_flat,s=this.probe.wall(e.position,o.maxWallDistance);if(!s)return r(`no wall within ${o.maxWallDistance} m`);let c=i*s.normal.x+a*s.normal.z;return c<o.backToWallDot?r(`wall ${s.distance.toFixed(2)} m away but not facing out (${c.toFixed(2)})`):n(1,`back to a wall, ${s.distance.toFixed(2)} m away`)}let o=t.pose[e.pose],s=this.probe.near(e.position,o.radius).filter(e=>o.kinds.includes(e.kind));if(e.pose===`crouch`){let i=t.pose.crouch,a=this.tmp.copy(e.eye).sub(e.position),o=Math.hypot(a.x,a.z)||1,c=s.filter(e=>e.maxY<=i.maxHeight&&(e.dir.x*a.x+e.dir.z*a.z)/o>=i.viewerSideDot);if(!c.length)return r(s.length?`low prop is not between you and the viewer`:`no low prop within ${i.radius} m`);let l=c.reduce((e,t)=>e.distance<t.distance?e:t);return n(hc((i.radius-l.distance)/(i.radius*.4)),`hiding behind ${l.kind} (${l.id}), ${l.distance.toFixed(2)} m`)}if(!s.length)return r(`no ${o.kinds.join(`/`)} within ${o.radius} m`);let c=s.reduce((e,t)=>e.distance<t.distance?e:t);return n(hc((o.radius-c.distance)/(o.radius*.4)),`next to ${c.kind} (${c.id}), ${c.distance.toFixed(2)} m`)}};function _c(e,t=fc){let n=e=>e.toFixed(1).padStart(5),r=[];for(let i of e.zones)r.push(i.painted?`colour ${i.zone.padEnd(6)} ${n(i.points)}  dE ${i.deltaE===null?` n/a`:i.deltaE.toFixed(1).padStart(4)} -> ${(i.credit*100).toFixed(0).padStart(3)}%  behind: ${i.behind}`:`colour ${i.zone.padEnd(6)} ${n(i.points)}  not painted yet (credit ${(t.unpaintedCredit*100).toFixed(0)}%)  behind: ${i.behind}`);return r.push(`shape  ${e.shape.pose.padEnd(11)} ${n(e.shape.points)}  ${e.shape.reason}`),r.push(`skin                ${n(-e.exposure.skin)}`),r.push(`hair/hat/accessory  ${n(-(e.exposure.hair+e.exposure.hat+e.exposure.accessory))}  (${e.exposure.hair.toFixed(0)}/${e.exposure.hat.toFixed(0)}/${e.exposure.accessory.toFixed(0)})`),r.push(`movement            ${n(-e.movement.penalty)}  ${e.movement.moving?`moving`:e.movement.penalty>0?`recovering`:`still`}`),r.push(`TOTAL               ${n(e.total)}  (colour ${e.colorPoints.toFixed(1)} + shape ${e.shape.points.toFixed(1)} - ${e.exposure.total.toFixed(1)} - ${e.movement.penalty.toFixed(1)})`),r.join(`
`)}var vc=(e,t)=>e.style.cssText=t,yc=e=>`#${e.getHexString()}`,bc=[`1 Stiff`,`2 Crouch`,`3 Wall`,`4 Ball`],xc=[`stand_stiff`,`crouch`,`wall_flat`,`curl_ball`];function Sc(e,t){let n=document.createElement(`div`);vc(n,`position:fixed;inset:0;pointer-events:none;z-index:6;font:12px/1.4 system-ui,sans-serif;color:#fff;text-shadow:0 1px 3px #000`),document.body.appendChild(n);let r=document.createElement(`div`);vc(r,`position:absolute;top:8px;right:8px;width:260px;display:flex;flex-direction:column;gap:6px;align-items:stretch`),n.appendChild(r);let i=()=>innerWidth<600,a=document.createElement(`div`);vc(a,`background:#000a;border-radius:6px;padding:6px 8px`);let o=document.createElement(`div`);vc(o,`display:flex;justify-content:space-between;font-weight:600`);let c=Object.assign(document.createElement(`span`),{textContent:`0`});o.append(Object.assign(document.createElement(`span`),{textContent:`CAMO`}),c);let l=document.createElement(`div`);vc(l,`height:10px;border-radius:5px;background:#fff3;margin-top:4px;overflow:hidden`);let u=document.createElement(`div`);vc(u,`height:100%;width:0;border-radius:5px;background:#e33`),l.appendChild(u);let d=document.createElement(`div`);vc(d,`margin-top:4px;opacity:.8;font-size:11px`),a.append(o,l,d);let f=document.createElement(`div`);vc(f,`display:flex;flex-wrap:wrap;gap:4px 8px;background:#000a;border-radius:6px;padding:6px 8px;align-items:center`);let p={};for(let e of[`top`,`bottom`]){let t=document.createElement(`div`);vc(t,`display:flex;align-items:center;gap:6px;padding:3px 6px;border-radius:5px;border:2px solid transparent`);let n=document.createElement(`div`);vc(n,`width:26px;height:26px;border-radius:4px;border:1px solid #fff9`);let r=document.createElement(`div`),i=document.createElement(`div`);vc(i,`font-size:10px;opacity:.75`),r.append(Object.assign(document.createElement(`div`),{textContent:e}),i),t.append(n,r),f.appendChild(t),p[e]={wrap:t,chip:n,note:i}}for(let e of[`top`,`bottom`]){let n=p[e].wrap;vc(n,n.style.cssText+`;pointer-events:auto;cursor:pointer`),n.title=`Paint the ${e} (Q switches)`,n.addEventListener(`pointerdown`,n=>{n.stopPropagation(),t.selectZone(e)})}let m=document.createElement(`div`);vc(m,`display:none;background:#2a7fffd9;border-radius:6px;padding:6px 8px;font-weight:600;font-size:12px;line-height:1.35`);let h=document.createElement(`div`);vc(h,`display:none;background:#000a;border-radius:6px;padding:6px 8px`);let g=Object.assign(document.createElement(`div`),{textContent:`Recent colours (click to paint the selected zone)`});vc(g,`font-size:10px;opacity:.75;margin-bottom:4px`);let _=document.createElement(`div`);vc(_,`display:flex;flex-wrap:wrap;gap:5px`),h.append(g,_),r.append(m,a,f,h);let v=document.createElement(`pre`);vc(v,`margin:0;background:#000b;border-radius:6px;padding:6px 8px;font:10px/1.45 monospace;white-space:pre-wrap;word-break:break-word`),r.appendChild(v);let y=document.createElement(`div`);vc(y,`position:absolute;left:50%;bottom:12px;transform:translateX(-50%);display:`+(e?`none`:`flex`)+`;gap:6px 18px;flex-wrap:wrap;justify-content:center;max-width:min(1100px,calc(100% - 24px));background:#000d;border:1px solid #fff3;border-radius:10px;padding:8px 14px;font:600 14px/1.2 system-ui,sans-serif;color:#fff;text-shadow:none`);let b=e=>`<kbd style="display:inline-block;min-width:22px;text-align:center;padding:3px 7px;margin:0 2px;border:1px solid #fffa;border-bottom-width:3px;border-radius:6px;background:#ffffff26;font:700 13px ui-monospace,monospace">${e}</kbd>`,x=(e,t)=>`<span style="display:inline-flex;align-items:center;gap:4px"><span style="opacity:.65;font-weight:500;margin-right:3px">${e}</span>${t}</span>`;y.innerHTML=[x(`Move`,b(`W`)+b(`A`)+b(`S`)+b(`D`)),x(`Run`,b(`Shift`)),x(`Jump / climb`,b(`Space`)),x(`Eyedropper`,b(`E`)+` then click`),x(`Zone`,b(`Q`)),x(`Poses`,b(`1`)+b(`2`)+b(`3`)+b(`4`)),x(`Hunt mode`,b(`H`)),x(`Camo text`,b(`C`)),x(`Hiding spots`,b(`M`)),x(`Hide this`,b(`K`))].join(``),n.appendChild(y);let S=document.createElement(`div`);vc(S,`position:absolute;left:50%;top:14%;transform:translateX(-50%);background:#000a;padding:6px 12px;border-radius:14px;opacity:0;transition:opacity .25s;font-size:13px;white-space:nowrap`),n.appendChild(S);let C=0,w=document.createElement(`div`);vc(w,`position:absolute;left:0;top:0;width:0;height:0;display:none`);let T=document.createElement(`div`);vc(T,`position:absolute;left:-18px;top:-18px;width:32px;height:32px;border:2px solid #fff;border-radius:50%;box-shadow:0 0 0 1px #000a`);let E=document.createElement(`div`);vc(E,`position:absolute;left:-4px;top:-4px;width:6px;height:6px;border-radius:50%;background:#fff;box-shadow:0 0 0 1px #000a`);let D=document.createElement(`div`);vc(D,`position:absolute;left:24px;top:14px;display:flex;align-items:center;gap:6px;background:#000c;padding:3px 7px;border-radius:5px;white-space:nowrap`);let O=document.createElement(`span`);vc(O,`width:16px;height:16px;border-radius:3px;border:1px solid #fff9;display:inline-block`);let k=document.createElement(`span`);D.append(O,k),w.append(T,E,D),n.appendChild(w);let ee=[[`#479fe0`,`Lagos sky`],[`#ccccc2`,`Harmattan haze`],[`#d88b47`,`Late sun`],[`#92572f`,`Red earth`],[`#514d48`,`Shadow`],[`#301e16`,`Dark wood`],[`#e8bf1a`,`Danfo yellow`],[`#2fa59b`,`Compound turquoise`],[`#e8dcb8`,`Cream plaster`],[`#a8322d`,`Door red`],[`#2a5db0`,`Drum blue`],[`#2f7d3a`,`Door green`]],A=document.createElement(`div`);vc(A,`position:absolute;left:${e?8:74}px;top:8px;background:#000b;border-radius:8px;padding:8px 10px;width:${e?`fit-content`:`176px`};pointer-events:auto;display:${e?`none`:`block`}`);let j=document.createElement(`div`);vc(j,`font:700 12px system-ui;margin-bottom:6px;display:flex;justify-content:space-between`),j.innerHTML=`<span>Palette</span><span style="opacity:.6;font-weight:500">P</span>`;let M=document.createElement(`div`);vc(M,`display:grid;grid-template-columns:repeat(4,${e?`46px`:`1fr`});gap:6px`);let N=document.createElement(`input`);N.type=`range`,N.min=`45`,N.max=`150`,N.value=`100`,vc(N,`width:100%;margin:8px 0 0;accent-color:#f1c232;height:${e?44:16}px;touch-action:none`);let P=Object.assign(document.createElement(`div`),{textContent:`Brightness`});vc(P,`font:11px system-ui;opacity:.75;margin-top:6px`);let te=e=>new s(e).multiplyScalar(Number(N.value)/100),F=[];for(let[n,r]of ee){let i=document.createElement(`button`);vc(i,`height:${e?46:30}px;border-radius:6px;border:2px solid #fffb;cursor:pointer;padding:0`),i.title=`${r} ${n}`,i.addEventListener(`pointerdown`,e=>{e.stopPropagation(),t.palette(te(n),r)}),M.appendChild(i),F.push([i,n])}let ne=()=>F.forEach(([e,t])=>e.style.background=yc(te(t)));ne(),N.addEventListener(`input`,ne),N.addEventListener(`pointerdown`,e=>e.stopPropagation()),A.append(j,M,P,N),n.appendChild(A);let I=null,re=[],L=document.createElement(`div`);vc(L,`position:absolute;left:8px;top:50%;transform:translateY(-50%);display:`+(e?`none`:`flex`)+`;flex-direction:column;gap:6px`),n.appendChild(L);let R=(e,t,r,i=n)=>{let a=document.createElement(`button`);return a.textContent=e,vc(a,`pointer-events:auto;touch-action:manipulation;font:600 12px system-ui;color:#fff;background:#000a;border:2px solid #fff8;cursor:pointer;${r}`),a.addEventListener(`pointerdown`,e=>{e.stopPropagation(),t()}),i.appendChild(a),a},ie=()=>{A.style.display=A.style.display===`none`?`block`:`none`},ae=()=>{i()?(r.style.cssText=`position:absolute;top:60px;left:8px;width:158px;display:flex;flex-direction:column;gap:6px;align-items:stretch`,A.style.left=`8px`,A.style.top=`300px`):(r.style.cssText=`position:absolute;top:8px;right:8px;width:260px;display:flex;flex-direction:column;gap:6px;align-items:stretch`,A.style.left=e?`8px`:`74px`,A.style.top=`8px`)};if(ae(),addEventListener(`resize`,ae),e){let e=`position:absolute;border-radius:26px;`;I=R(`Eyedropper`,t.eyedropper,e+`right:12px;bottom:196px;width:100px;height:52px`),R(`Palette`,ie,e+`right:12px;bottom:140px;width:100px;height:46px`),R(`Zone`,t.zone,e+`right:12px;bottom:84px;width:100px;height:46px`),R(`Jump`,t.jump,e+`right:12px;bottom:20px;width:100px;height:54px;background:#1a8a3acc`),re=bc.map((n,r)=>R(n,()=>t.pose(r),`${e}left:${10+r*62}px;bottom:28px;width:58px;height:46px;border-radius:12px;font-size:11px`))}else{let e=`width:56px;height:46px;border-radius:12px;line-height:1.15;`;I=R(`Pick
(E)`,t.eyedropper,e,L),R(`Zone
(Q)`,t.zone,e,L),R(`Palette
(P)`,ie,e,L),re=[`Stiff
(1)`,`Crouch
(2)`,`Wall
(3)`,`Ball
(4)`].map((n,r)=>R(n,()=>t.pose(r),e,L));for(let e of[I,...re])e.style.whiteSpace=`pre`;for(let e of L.querySelectorAll(`button`))e.style.whiteSpace=`pre`}return{setZones(e,t,n,r){for(let[i,a]of[[`top`,e],[`bottom`,t]]){let e=p[i];e.chip.style.background=yc(a),e.wrap.style.borderColor=i===n?`#fff`:`transparent`,e.note.textContent=`${yc(a)}${r[i]?``:` (unpainted)`}`}},setScore(e){c.textContent=e.toFixed(0),u.style.width=`${Math.min(100,Math.max(0,e))}%`,u.style.background=e<35?`#e5533d`:e<65?`#e8b33a`:`#58c26a`},setDebug(e){v.textContent!==e&&(v.textContent=e)},setDebugVisible(e){v.style.display=e?`block`:`none`},toast(e){S.textContent=e,S.style.opacity=`1`,clearTimeout(C),C=window.setTimeout(()=>S.style.opacity=`0`,1600)},crosshair(e,t=0,n=0,r=!0,i=null,a=!1){if(w.style.display=e?`block`:`none`,!e)return;w.style.transform=`translate(${t}px,${n}px)`,w.style.opacity=a?`0.45`:`1`;let o=r?`#fff`:`#ff5a4a`;T.style.borderColor=o,E.style.background=o,D.style.display=i?`flex`:`none`,i&&(O.style.background=yc(i.color),k.textContent=`${i.label} ${yc(i.color)}${r?``:` (too far)`}`)},setAiming(t){I&&(I.style.background=t?`#2a7fffcc`:`#000a`),m.style.display=t?`block`:`none`,m.textContent=e?`EYEDROPPER: tap a surface within 4 m`:`EYEDROPPER ON: click a surface within 4 m. Q switches zone, E or Esc stops`},setRecent(e){h.style.display=e.length?`block`:`none`,_.replaceChildren(...e.map((e,n)=>{let r=document.createElement(`button`);return vc(r,`pointer-events:auto;cursor:pointer;width:24px;height:24px;border-radius:5px;border:2px solid #fffb;padding:0;background:${yc(e.color)}`),r.title=`${e.label} ${yc(e.color)}`,r.addEventListener(`pointerdown`,e=>{e.stopPropagation(),t.recent(n)}),r}))},toggleLegend(){y.style.display=y.style.display===`none`?`flex`:`none`},togglePalette:ie,show(e){n.style.display=e?`block`:`none`},setPaletteTop(e){i()||(A.style.top=`${e}px`)},setPose(e){d.textContent=e?`pose: ${e}`:`pose: none (moving breaks a pose)`;let t=xc.indexOf(e??``);re.forEach((e,n)=>e.style.background=n===t?`#2a7fffcc`:`#000a`)}}}var Cc=class{level;colliders;ray=new n;targets=[];blockers=[];v=new q;constructor(e,t){this.level=e,this.colliders=t;let n=e=>{e.name!==`hiding-markers`&&e.name!==`surfaces`&&(e instanceof Pt&&(this.targets.push(e),![`ground`,`dirt`,`veranda-tiles`,`umbrella`].includes(e.name)&&!e.userData.decal&&this.blockers.push(e)),e.children.forEach(n))};n(e.group)}read(e){let t=this.level.surfaces.nearest(e.point,.35);if(t)return{color:t.baseColor.clone(),id:t.id,label:t.label,point:e.point.clone(),distance:e.distance};let n=e.object.userData.baseColor;return n?{color:n.clone(),id:e.object.name||`mesh`,label:e.object.name||`surface`,point:e.point.clone(),distance:e.distance}:null}pick(e,t){this.ray.setFromCamera(t,e),this.ray.far=120;for(let e of this.ray.intersectObjects(this.targets,!1))if(!(e.object.material.opacity<.5))return this.read(e);return null}behind(e,t){let n=this.v.copy(t).sub(e),r=n.length();this.ray.set(e,n.normalize()),this.ray.far=120;for(let e of this.ray.intersectObjects(this.targets,!1)){if(e.distance<=r+.05)continue;let t=this.read(e);if(t)return t}return null}blocked(e,t,n=.3){let r=this.v.copy(t).sub(e),i=r.length();return i<n?!1:(this.ray.set(e,r.normalize()),this.ray.far=i-n,this.ray.intersectObjects(this.blockers,!1).length>0)}near(e,t){let n=[];for(let r of this.level.surfaces.list){let i=r.bounds,a=Math.max(i.min.x-e.x,0,e.x-i.max.x),o=Math.max(i.min.z-e.z,0,e.z-i.max.z),s=Math.hypot(a,o);if(s>t)continue;let c=(i.min.x+i.max.x)/2-e.x,l=(i.min.z+i.max.z)/2-e.z,u=Math.hypot(c,l)||1;n.push({id:r.id,kind:r.kind,distance:s,maxY:i.max.y,dir:{x:c/u,z:l/u}})}return n}wall(e,t){return yo(e,t,this.colliders)}},wc=.4,Tc=.24,Ec=[`stand_stiff`,`crouch`,`wall_flat`,`curl_ball`],Dc={crouch:[.85,.4],curl_ball:[.5,.3]},Oc=class{o;probe;camo;zone=`top`;painted={top:!1,bottom:!1};pose=null;aimOn=!1;eDownAt=0;eSuppressRelease=!1;recent=[];hitMarker;cooldownUntil=0;snap=null;poseYaw=null;pointer=new wt(innerWidth/2,innerHeight/2);reachRing;hud;hover=null;sinceHover=1;debugOn=!1;torso=new q;constructor(e){this.o=e,this.probe=new Cc(e.level,e.level.colliders),this.camo=new gc(this.probe),e.player.setHuntMode(e.hunt),this.hud=Sc(e.touch,{eyedropper:()=>this.toggleAim(),zone:()=>this.toggleZone(),selectZone:e=>{this.zone=e},recent:e=>{let t=this.recent[e];t&&!this.cooling&&this.paint({color:t.color,label:t.label})},pose:e=>this.setPose(Ec[e]),jump:()=>e.input.queueJump(),palette:(e,t)=>{this.cooling||this.paint({color:e,label:t})}}),this.hud.setPose(null),this.hud.setDebugVisible(this.debugOn),this.reachRing=new Pt(new v(3.95,4,72).rotateX(-Math.PI/2),new B({color:`#ffffff`,transparent:!0,opacity:.4,depthWrite:!1})),this.reachRing.visible=!1,this.reachRing.renderOrder=5,this.hitMarker=new Pt(new O(.07,10,8),new B({color:`#ffffff`,depthTest:!1,transparent:!0,opacity:.95})),this.hitMarker.visible=!1,this.hitMarker.renderOrder=6,e.scene.add(this.reachRing,this.hitMarker),e.input.blocked=()=>this.aiming,addEventListener(`keydown`,e=>this.onKey(e,!0)),addEventListener(`keyup`,e=>this.onKey(e,!1)),addEventListener(`blur`,()=>{this.aimOn&&performance.now()-this.eDownAt>350&&(this.aimOn=!1)}),addEventListener(`pointermove`,e=>this.pointer.set(e.clientX,e.clientY)),e.input.el.addEventListener(`pointerdown`,e=>{this.pointer.set(e.clientX,e.clientY),this.aiming&&this.pickAndPaint()})}get cooling(){return performance.now()<this.cooldownUntil}toast(e){this.hud.toast(e)}setPaletteTop(e){this.hud.setPaletteTop(e)}setPlayer(e){this.o.player=e,this.camo.invalidate()}escUsed=!1;show(e){this.hud.show(e),e||(this.aimOn=!1)}resetPaint(e,t){this.o.player.setZoneColor(`top`,e),this.o.player.setZoneColor(`bottom`,t),this.painted.top=this.painted.bottom=!1,this.recent=[],this.hud.setRecent([]),this.zone=`top`,this.aimOn=!1,this.clearPose(),this.camo.invalidate()}clearPose(){this.pose=null,this.snap=null,this.poseYaw=null}get aiming(){return this.aimOn}onKey(e,t){if(e.code===`KeyE`){if(e.repeat)return;t?this.aimOn?(this.aimOn=!1,this.eSuppressRelease=!0):(this.aimOn=!0,this.eDownAt=performance.now(),this.sinceHover=1):(!this.eSuppressRelease&&performance.now()-this.eDownAt>350&&(this.aimOn=!1),this.eSuppressRelease=!1)}else if(t&&!e.repeat){if(e.code===`KeyQ`)this.toggleZone();else if(e.code===`KeyH`)this.o.player.setHuntMode(!this.o.player.huntMode),this.camo.invalidate(),this.hud.toast(this.o.player.huntMode?`Hunt mode: hair, hat and accessory hidden`:`Hunt mode off: hair, hat and accessory visible (exposure penalty)`);else if(e.code===`KeyC`)this.debugOn=!this.debugOn,this.hud.setDebugVisible(this.debugOn);else if(e.code===`KeyK`)this.hud.toggleLegend();else if(e.code===`KeyP`)this.hud.togglePalette();else if(e.code===`Escape`&&this.aimOn)this.aimOn=!1,this.escUsed=!0;else{let t=/^(?:Digit|Numpad)([1-4])$/.exec(e.code);t&&this.setPose(Ec[Number(t[1])-1])}}}toggleAim(){this.aimOn=!this.aimOn,this.eDownAt=0,this.aimOn&&this.pointer.set(innerWidth/2,innerHeight/2),this.sinceHover=1}toggleZone(){this.zone=this.zone===`top`?`bottom`:`top`,this.hud.toast(`Painting the ${this.zone}`)}setPose(e){if(this.pose===e)this.pose=null,this.snap=null,this.poseYaw=null;else{if(e===`wall_flat`){let e=yo(this.o.pos,1,this.o.level.colliders);if(!e){this.hud.toast(`No wall within 1 m`);return}let t=new q(e.point.x+e.normal.x*Tc,this.o.pos.y,e.point.z+e.normal.z*Tc),n={x:t.x,z:t.z};bo(n,.18,this.o.level.colliders),t.set(n.x,t.y,n.z),this.snap={from:this.o.pos.clone(),to:t,t:0},this.poseYaw=Math.atan2(e.normal.x,e.normal.z)}else this.poseYaw=null,this.snap=null;this.pose=e}}ndc(){return new wt(this.pointer.x/innerWidth*2-1,-(this.pointer.y/innerHeight)*2+1)}pickAndPaint(){let e=this.probe.pick(this.o.camera,this.ndc());if(!e)return this.hud.toast(`Nothing to read there`);this.torso.copy(this.o.pos),this.torso.y+=1;let t=this.torso.distanceTo(e.point);if(t>4)return this.hud.toast(`Too far: ${t.toFixed(1)} m (reach 4 m)`);this.cooling||(this.paint(e),this.o.touch&&(this.aimOn=!1))}paint(e){this.cooldownUntil=performance.now()+wc*1e3;let{player:t,fx:n,pos:r}=this.o;t.setZoneColor(this.zone,e.color),this.painted[this.zone]=!0;let i=e.color.getHexString();this.recent=[{color:e.color.clone(),label:e.label},...this.recent.filter(e=>e.color.getHexString()!==i)].slice(0,8),this.hud.setRecent(this.recent),this.camo.invalidate();let a=(Dc[this.pose??``]??[1.25,.6])[this.zone===`top`?0:1];n.paintSplash(this.torso.set(r.x,r.y+a,r.z),e.color),ga.unlock().then(()=>ga.playOnce(`sfx_paint`,{volume:.9})),this.hud.toast(`${this.zone} painted ${e.label} #${e.color.getHexString()}`)}update(e,t){let{pos:n,player:r,camera:i}=this.o;if(t.speed>0&&(this.pose=null,this.snap=null,this.poseYaw=null),this.snap){this.snap.t=Math.min(1,this.snap.t+e/.18);let t=1-(1-this.snap.t)**3;n.lerpVectors(this.snap.from,this.snap.to,t),this.snap.t>=1&&(this.snap=null)}let a=this.aiming;if(this.o.input.el.style.cursor=a?`crosshair`:``,this.reachRing.visible=a,this.hitMarker.visible=!1,a){this.reachRing.position.set(n.x,.06,n.z),this.sinceHover+=e,this.sinceHover>1/30&&(this.sinceHover=0,this.hover=this.probe.pick(i,this.ndc()));let t=!1;this.hover&&(this.torso.copy(n),this.torso.y+=1,t=this.torso.distanceTo(this.hover.point)<=4),this.hover&&(this.hitMarker.position.copy(this.hover.point),this.hitMarker.visible=!0,this.hitMarker.material.color.set(t?`#ffffff`:`#ff5a4a`)),this.hud.crosshair(!0,this.pointer.x,this.pointer.y,t,this.hover?{color:this.hover.color,label:this.hover.label}:null,this.cooling)}else this.hud.crosshair(!1),this.hover=null;this.hud.setAiming(a);let o=r.style,s=r.huntMode,c=this.camo.update(e,{zones:{top:r.getZoneColor(`top`),bottom:r.getZoneColor(`bottom`)},painted:this.painted,pose:this.pose,speed:t.speed,running:t.speed>3.5,yaw:this.poseYaw??t.yaw,position:n,eye:this.o.eye?.()??i.position,hairVisible:!s&&o.hair!==`bald`,hatVisible:!s&&o.hat!==`none`,accessoryVisible:!s&&o.accessory!==`none`});return this.hud.setScore(this.camo.display),this.hud.setZones(r.getZoneColor(`top`),r.getZoneColor(`bottom`),this.zone,this.painted),this.hud.setPose(this.pose),this.debugOn&&this.hud.setDebug(`${_c(c)}\nhunt mode: ${s?`on`:`off`}   viewer: ${this.o.eye?.()?`seeker's eye`:`camera (no seeker)`}`),{state:this.pose??`idle`,yaw:this.poseYaw}}},kc={chant_intro:{text:`Bojú bojú o! Ẹ̀gúngún ń bọ̀! Ẹ sá pamọ́!`,english:`Eyes covered, eyes covered! The masquerade is coming! Go and hide!`,singer:`Egungun`},chant_ask:{text:`Ṣé kí n ṣí i?`,english:`Shall I open it?`,singer:`Egungun`},chant_not_yet:{text:`Má ṣí i!`,english:`Don't open it!`,singer:`Children`},chant_open:{text:`Ṣí i!`,english:`Open it!`,singer:`Children`},chant_hunt:{text:`Ẹni tí mo bá rí, màá jẹ ẹ́!`,english:`Whoever I spot, I'll gobble up!`,singer:`Egungun`},caught:{text:`Mo rí ẹ!`,english:`I see you!`,singer:`Egungun`}};function Ac(){let e=document.createElement(`div`);e.style.cssText=`position:fixed;left:50%;bottom:150px;transform:translateX(-50%);z-index:7;pointer-events:none;text-align:center;opacity:0;transition:opacity .25s;max-width:min(90vw,900px)`;let t=document.createElement(`div`);t.style.cssText=`font:700 12px system-ui;letter-spacing:3px;text-transform:uppercase;color:#f1c232;text-shadow:0 2px 6px #000;margin-bottom:4px`;let n=document.createElement(`div`);n.style.cssText=`font:800 clamp(24px,5vw,40px)/1.2 system-ui,sans-serif;color:#fff;text-shadow:0 3px 10px #000,0 0 3px #000;letter-spacing:1px`;let r=document.createElement(`div`);r.style.cssText=`font:italic 600 17px/1.3 system-ui,sans-serif;color:#fff;opacity:.92;text-shadow:0 2px 8px #000,0 0 3px #000;margin-top:4px`,e.append(t,n,r),document.body.appendChild(e);let i=()=>e.style.bottom=innerWidth<600?`262px`:`150px`;i(),addEventListener(`resize`,i);let a=[],o=()=>{a.forEach(clearTimeout),a=[]};return{sing(i,s){let c=kc[i];if(!c)return;o(),t.textContent=c.singer,r.textContent=c.english;let l=c.text.split(` `);n.replaceChildren(...l.map(e=>{let t=document.createElement(`span`);return t.textContent=e+` `,t.style.cssText=`color:#ffffffa0;transition:color .12s,transform .12s;display:inline-block;white-space:pre`,t})),e.style.opacity=`1`;let u=l.reduce((e,t)=>e+t.length+1,0),d=0;l.forEach((e,t)=>{let r=n.children[t];a.push(window.setTimeout(()=>{r.style.color=`#f1c232`,r.style.transform=`scale(1.12)`},d*s*1e3*.92),window.setTimeout(()=>{r.style.color=`#ffffff`,r.style.transform=`scale(1)`},(d+(e.length+1)/u)*s*1e3)),d+=(e.length+1)/u}),a.push(window.setTimeout(()=>e.style.opacity=`0`,s*1e3+700))},hide(){o(),e.style.opacity=`0`}}}var jc=(e,t)=>e.style.cssText=t;function Mc(){let e=document.createElement(`div`);jc(e,`position:fixed;inset:0;pointer-events:none;z-index:6;font-family:system-ui,sans-serif;color:#fff;text-shadow:0 2px 6px #000;display:none`),document.body.appendChild(e);let t=document.createElement(`div`);jc(t,`position:absolute;left:50%;top:8px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:4px;background:#000a;border-radius:12px;padding:6px 16px 8px;min-width:190px`);let n=document.createElement(`div`);jc(n,`display:flex;align-items:center;gap:8px;font:800 26px system-ui;letter-spacing:1px`);let r=document.createElement(`span`);jc(r,`display:inline-block;width:20px;height:28px`),r.innerHTML=`<svg viewBox="0 0 20 28" width="20" height="28"><path d="M2 1h16M2 27h16" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M4 1c0 8 6 9 6 13s-6 5-6 13M16 1c0 8-6 9-6 13s6 5 6 13" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M6 24h8c-1-3-3-4-4-4s-3 1-4 4z" fill="#f1c232"/></svg>`;let i=document.createElement(`span`),a=document.createElement(`span`);jc(a,`font:700 13px system-ui;opacity:.85;margin-left:6px;letter-spacing:2px`),n.append(r,i,a);let o=document.createElement(`div`);jc(o,`font:700 12px system-ui;letter-spacing:2px;opacity:.9;text-align:center`);let s=document.createElement(`div`);jc(s,`display:flex;gap:6px`);let c=document.createElement(`button`);jc(c,`pointer-events:auto;display:none;margin-top:4px;min-height:44px;padding:0 20px;border:0;border-radius:999px;cursor:pointer;touch-action:manipulation;font:800 15px system-ui;color:#1f2118;background:#d8fd71;text-shadow:none`),t.append(n,o,s,c),e.appendChild(t);let l=()=>innerWidth<600,u=()=>{t.style.cssText=l()?`position:absolute;right:8px;top:8px;display:flex;flex-direction:column;align-items:center;gap:3px;background:#000a;border-radius:12px;padding:5px 10px 7px;width:196px;box-sizing:border-box`:`position:absolute;left:50%;top:8px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:4px;background:#000a;border-radius:12px;padding:6px 16px 8px;min-width:190px`,d.style.display=l()?`none`:`flex`},d=document.createElement(`div`);jc(d,`position:absolute;right:12px;bottom:12px;display:flex;align-items:baseline;gap:8px;background:#000a;border-radius:12px;padding:6px 14px`);let f=document.createElement(`span`);jc(f,`font:800 34px system-ui;line-height:1`);let p=Object.assign(document.createElement(`span`),{textContent:`hiders left`});jc(p,`font:600 12px system-ui;opacity:.85`),d.append(f,p),e.appendChild(d),u(),addEventListener(`resize`,u);let m=document.createElement(`div`);jc(m,`position:absolute;inset:0;display:none;align-items:center;justify-content:center;font:800 clamp(34px,8vw,64px) system-ui;letter-spacing:4px;text-shadow:0 4px 18px #000;text-align:center;padding:0 12px`),e.appendChild(m);let h={onReady:null,show(t){e.style.display=t?`block`:`none`},banner(e,t=`#8e1b1b66`){m.style.display=e?`flex`:`none`,m.style.background=t,m.textContent=e??``},update(e){let t=Math.max(0,Math.ceil(e.seconds));i.textContent=`${Math.floor(t/60)}:${String(t%60).padStart(2,`0`)}`,a.textContent=`ROUND ${e.round}`,o.textContent=e.label;let n=e=>`<span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${e?`#d33`:`#48c26a`};border:2px solid #fff;text-align:center;font:800 13px/18px system-ui">${e?`✕`:`●`}</span>`;s.innerHTML=Array.from({length:e.hiders},(t,r)=>n(r<e.caught)).join(``),f.textContent=String(Math.max(0,e.hiders-e.caught)),e.ready?(c.style.display=`block`,c.textContent=`Ready!  (Enter)  +${e.ready.bonus}`):c.style.display=`none`}};return c.addEventListener(`pointerdown`,e=>{e.stopPropagation(),h.onReady?.()}),h}function Nc(e,t,n,r,i){let a=2/r,o=a*i,s=1/(1+o+.48*o*o+.235*o*o*o),c=e-t,l=(n.v+a*c)*i;return n.v=(n.v-a*l)*s,t+(c+l)*s}var Pc=class{offset;camera;focus=new q;vx={v:0};vy={v:0};vz={v:0};samples=[new q,new q,new q];constructor(e,t=new q(0,10.5,7.8)){this.offset=t,this.camera=new E(38,e,.5,160),this.setAspect(e)}setAspect(e){this.camera.aspect=e,this.camera.fov=e<1?52:38,this.camera.updateProjectionMatrix()}snapTo(e){this.focus.copy(e),this.vx.v=this.vy.v=this.vz.v=0,this.apply()}update(e,t,n=0,r=0){let i=.16;this.focus.x=Nc(this.focus.x,t.x+n*i,this.vx,.16,e),this.focus.z=Nc(this.focus.z,t.z+r*i,this.vz,.16,e),this.focus.y=Nc(this.focus.y,t.y,this.vy,.32,e),this.apply()}apply(){this.camera.position.copy(this.focus).add(this.offset),this.camera.lookAt(this.focus.x,this.focus.y+.9,this.focus.z)}fade(e,t,n){this.samples[0].set(t.x,t.y+.15,t.z),this.samples[1].set(t.x,t.y+.9,t.z),this.samples[2].set(t.x,t.y+1.6,t.z);for(let t of e)t.target=this.samples.some(e=>t.blocks(this.camera.position,e,.08))?.18:1,t.update(n)}},Fc={prepSeconds:25,huntSeconds:90,chantTimeoutSeconds:8,clearedSeconds:3.4,slowMoSeconds:1,slowMoScale:.25,readyBonusPerSecond:2,clearPoints:100,hiddenPointsPerSecond:1,ramps:{visionFovDeg:{start:52,perRound:4,limit:90},visionRange:{start:9,perRound:.6,limit:13},rateMax:{start:.65,perRound:.12,limit:1.5},cheatInterval:{start:24,perRound:-2.5,limit:9},cheatCandidates:{start:2,perRound:.5,limit:4},patrolSpeed:{start:3,perRound:.1,limit:4},investigateSpeed:{start:3.4,perRound:.1,limit:4.3},checkSpeed:{start:3.2,perRound:.1,limit:4.1},lostDecay:{start:.1,perRound:-.01,limit:.04}}};function Ic(e,t=Fc){let n={};for(let[r,i]of Object.entries(t.ramps)){let t=i.start+i.perRound*(e-1);n[r]=i.perRound>=0?Math.min(i.limit,t):Math.max(i.limit,t)}return n.cheatCandidates=Math.floor(n.cheatCandidates),n}var Lc=()=>({rounds:0,hiddenSeconds:0,bestCamo:0,points:0}),Rc=[{when:e=>e.rounds===0&&e.hiddenSeconds<8,line:`Chai! Caught before the chant finished its second line. The masquerade did not even have to look twice.`},{when:e=>e.rounds===0&&e.bestCamo<25,line:`You hid like someone waiting for a danfo: very visible, and loud about it. Match the wall, not your mood.`},{when:e=>e.rounds===0,line:`So close! You almost had the masquerade walking past. Hold the pose a little longer next time.`},{when:e=>e.bestCamo>=92&&e.rounds>=3,line:`You and that wall are now family. The masquerade passed by like you were a water drum.`},{when:e=>e.rounds>=6,line:`The compound has a new legend. Even the generator hums your name.`},{when:e=>e.rounds>=4,line:`Madam or Oga, respect! The masquerade looked straight at you and saw only plaster.`},{when:e=>e.rounds>=2&&e.bestCamo<55,line:`You survived on quick legs and luck. A closer colour match and you will not need the luck.`},{when:e=>e.rounds>=2,line:`Two rounds under the egungun's nose. Not bad at all, not bad at all.`},{when:e=>e.rounds>=1&&e.bestCamo>=80,line:`Nicely blended. The masquerade is still wondering why the wall is breathing.`},{when:()=>!0,line:`One round down. The yard remembers your footsteps, so tread softer next time.`}],zc=e=>(Rc.find(t=>t.when(e))??Rc[Rc.length-1]).line,Bc={visionFovDeg:70,visionRange:12,eyeHeight:1.9,sampleHeights:{stand:[1.45,.9,.35],crouch:[.95,.6,.25],curl_ball:[.5,.35,.2]},losHz:15,hearRunRadius:6,hearWalkRadius:2,noiseCooldown:1.2,noiseRetargetDistance:2,rateMax:1,exposurePower:2,minDistanceFactor:.15,nearRadius:3,nearBoost:1.4,seenDecay:.02,lostDecay:.08,leanAt:.5,leanExit:.35,catchAt:1,patrolSpeed:3.4,investigateSpeed:3.8,checkSpeed:3.6,turnRate:6,arriveRadius:.5,radius:.5,navCell:.4,lookTime:[2.5,4],investigateLookTime:[2.5,3.5],lookSweepAngle:.9,checkStandOff:2,catchDashSpeed:8,catchReach:1,catchDashMax:.5,caughtTime:2.8,cheatInterval:15,cheatCandidates:3},Vc=class{bounds;cell;w;h;blocked;constructor(e,t,n,r){this.bounds=t,this.cell=r,this.w=Math.ceil((t.maxX-t.minX)/r),this.h=Math.ceil((t.maxZ-t.minZ)/r),this.blocked=new Uint8Array(this.w*this.h);for(let i=0;i<this.h;i++)for(let a=0;a<this.w;a++){let o=t.minX+(a+.5)*r,s=t.minZ+(i+.5)*r,c=!1;for(let t of e)if(!(t.climb&&t.top<=.25)){if(t.kind===`box`){let e=Math.max(t.minX-o,0,o-t.maxX),r=Math.max(t.minZ-s,0,s-t.maxZ);e*e+r*r<n*n&&(c=!0)}else(o-t.x)**2+(s-t.z)**2<(n+t.r)**2&&(c=!0);if(c)break}this.blocked[i*this.w+a]=+!!c}}ix(e){return Math.floor((e-this.bounds.minX)/this.cell)}iz(e){return Math.floor((e-this.bounds.minZ)/this.cell)}isBlockedCell(e,t){return e<0||t<0||e>=this.w||t>=this.h||this.blocked[t*this.w+e]===1}free(e,t){return!this.isBlockedCell(this.ix(e),this.iz(t))}nearestFree(e,t,n=12){let r=this.ix(e),i=this.iz(t);if(!this.isBlockedCell(r,i))return{x:e,z:t};let a=null,o=1/0;for(let s=1;s<=n;s++){for(let n=-s;n<=s;n++)for(let c=-s;c<=s;c++){if(Math.max(Math.abs(c),Math.abs(n))!==s||this.isBlockedCell(r+c,i+n))continue;let l=this.bounds.minX+(r+c+.5)*this.cell,u=this.bounds.minZ+(i+n+.5)*this.cell,d=(l-e)**2+(u-t)**2;d<o&&(o=d,a={x:l,z:u})}if(a)return a}return null}lineClear(e,t){let n=Math.hypot(t.x-e.x,t.z-e.z),r=Math.max(1,Math.ceil(n/(this.cell*.5)));for(let n=0;n<=r;n++){let i=n/r;if(!this.free(e.x+(t.x-e.x)*i,e.z+(t.z-e.z)*i))return!1}return!0}path(e,t){let n=this.nearestFree(e.x,e.z,4),r=this.nearestFree(t.x,t.z,12);if(!n||!r)return null;let i=this.w,a=this.iz(n.z)*i+this.ix(n.x),o=this.iz(r.z)*i+this.ix(r.x),s=new Float32Array(this.w*this.h).fill(1/0),c=new Int32Array(this.w*this.h).fill(-1),l=new Uint8Array(this.w*this.h),u=[[0,a]];s[a]=0;let d=e=>{u.push(e);let t=u.length-1;for(;t>0;){let e=t-1>>1;if(u[e][0]<=u[t][0])break;[u[e],u[t]]=[u[t],u[e]],t=e}},f=()=>{let e=u[0],t=u.pop();if(u.length){u[0]=t;let e=0;for(;;){let t=e*2+1,n=t+1,r=e;if(t<u.length&&u[t][0]<u[r][0]&&(r=t),n<u.length&&u[n][0]<u[r][0]&&(r=n),r===e)break;[u[r],u[e]]=[u[e],u[r]],e=r}}return e},p=o%i,m=Math.floor(o/i),h=!1;for(;u.length;){let[,e]=f();if(l[e])continue;if(l[e]=1,e===o){h=!0;break}let t=e%i,n=Math.floor(e/i);for(let r=-1;r<=1;r++)for(let a=-1;a<=1;a++){if(!a&&!r)continue;let o=t+a,u=n+r;if(this.isBlockedCell(o,u)||a&&r&&(this.isBlockedCell(t+a,n)||this.isBlockedCell(t,n+r)))continue;let f=u*i+o;if(l[f])continue;let h=s[e]+(a&&r?1.414:1);h<s[f]&&(s[f]=h,c[f]=e,d([h+Math.hypot(p-o,m-u),f]))}}if(!h)return null;let g=[];for(let e=o;e!==-1;e=c[e])g.push({x:this.bounds.minX+(e%i+.5)*this.cell,z:this.bounds.minZ+(Math.floor(e/i)+.5)*this.cell});g.reverse();let _=[],v=0;for(;v<g.length-1;){let e=g.length-1;for(;e>v+1&&!this.lineClear(g[v],g[e]);)e--;_.push(g[e]),v=e}return _}},Hc=(e,t)=>e+Math.random()*(t-e),Uc=e=>Math.atan2(Math.sin(e),Math.cos(e)),Wc=class{host;fx;cfg;masq;group;debugGroup=new mt;state=`patrol_walk`;suspicion=0;onCaught=null;onCatchStart=null;blind=!1;frustrated=!1;eye=new q;nav;cone;indicator;pos=new q;yaw=0;path=[];pathIdx=0;stuckT=0;stuckFrom=new wt;lookT=0;lookDur=3;lookBase=0;lookAt=null;order=[];orderIdx=0;cheatTimer=0;noiseTimer=0;lastSeen=null;catchT=0;caughtT=0;losT=0;visFrac=0;speed=0;anim=`search_walk`;targetLabel=`none`;targetPoint=null;debugOn=!1;line;tmp=new q;sense={inCone:!1,rate:0,exposure:0,distFactor:0,dist:0,heard:``};pathAge=0;constructor(e,t,n,r={...Bc}){this.host=e,this.fx=t,this.cfg=r,this.masq=La(),this.group=this.masq.group,this.cone=t.addVisionCone(this.group,r.visionRange,r.visionFovDeg),this.indicator=t.addSuspicionIndicator(this.group),n.add(this.group,this.debugGroup),this.nav=new Vc(e.colliders,e.bounds,r.radius+.05,r.navCell),this.group.traverse(e=>{e instanceof Pt&&!(e.material instanceof he)&&(e.castShadow=!0)});let i=new Ft().setFromPoints(Array.from({length:24},()=>new q));this.line=new ut(i,new yt({color:`#ff2fd0`,depthTest:!1})),this.line.renderOrder=998,this.line.frustumCulled=!1,this.debugGroup.add(this.line),this.debugGroup.visible=!1,this.reset()}applyDifficulty(e){let t=e.visionFovDeg!==void 0&&e.visionFovDeg!==this.cfg.visionFovDeg||e.visionRange!==void 0&&e.visionRange!==this.cfg.visionRange;Object.assign(this.cfg,e),t&&(this.fx.removeVisionCone(this.cone),this.cone=this.fx.addVisionCone(this.group,this.cfg.visionRange,this.cfg.visionFovDeg))}setDebug(e){this.debugOn=e,this.debugGroup.visible=e}get debug(){return this.debugOn}get position(){return this.pos}get heading(){return this.yaw}reset(e){this.suspicion=0,this.lastSeen=null,this.catchT=this.caughtT=0,this.cheatTimer=0,this.noiseTimer=0,this.speed=0,this.shuffle(),e&&this.placeAt(e.x,e.z,e.yaw??this.yaw),this.startPatrol(),this.applyFx()}placeAt(e,t,n){this.pos.set(e,0,t),this.yaw=n,this.group.position.copy(this.pos),this.group.rotation.y=n,this.path=[]}shuffle(){this.order=this.host.spots.map((e,t)=>t);for(let e=this.order.length-1;e>0;e--){let t=Math.floor(Math.random()*(e+1));[this.order[e],this.order[t]]=[this.order[t],this.order[e]]}this.orderIdx=0}goTo(e,t,n){let r=this.nav.path(this.pos,{x:e,z:t});return!r||!r.length?!1:(this.path=r,this.pathIdx=0,this.targetPoint=r[r.length-1],this.targetLabel=n,this.stuckT=0,this.stuckFrom.set(this.pos.x,this.pos.z),this.pathAge=0,!0)}standPoint(e){return{x:e.position.x-e.facing.x*this.cfg.checkStandOff,z:e.position.z-e.facing.z*this.cfg.checkStandOff}}startPatrol(){this.state=`patrol_walk`;for(let e=0;e<this.host.spots.length;e++){this.orderIdx>=this.order.length&&this.shuffle();let e=this.host.spots[this.order[this.orderIdx++]],t=this.standPoint(e);if(this.goTo(t.x,t.z,`patrol: ${e.id}`)){this.lookAt=e.position.clone();return}}this.startLook(`patrol_look`)}startLook(e){this.state=e,this.lookT=0,this.lookDur=Hc(...e===`investigate_look`?this.cfg.investigateLookTime:this.cfg.lookTime),this.lookBase=this.lookAt?Math.atan2(this.lookAt.x-this.pos.x,this.lookAt.z-this.pos.z):this.yaw,this.path=[]}startInvestigate(e,t,n){this.goTo(e,t,n)?(this.state=`investigate_walk`,this.lookAt=new q(e,0,t)):this.startPatrol()}startCheck(e){let t=[...this.host.spots].sort((t,n)=>(t.position.x-e.x)**2+(t.position.z-e.z)**2-((n.position.x-e.x)**2+(n.position.z-e.z)**2)).slice(0,this.cfg.cheatCandidates),n=t[Math.floor(Math.random()*t.length)];if(!n)return;let r=this.standPoint(n);this.goTo(r.x,r.z,`check: ${n.id}`)&&(this.state=`check_walk`,this.lookAt=n.position.clone())}update(e,t){let n=this.cfg;if(e=Math.min(e,.05),this.noiseTimer=Math.max(0,this.noiseTimer-e),this.cheatTimer+=e,this.eye.set(this.pos.x+Math.sin(this.yaw)*.12,n.eyeHeight,this.pos.z+Math.cos(this.yaw)*.12),this.state===`caught`)this.caughtT+=e,this.anim=`victory_dance`,this.finish(e);else if(this.blind||this.frustrated)this.anim=this.blind?`sing_eyes_covered`:`look_around`,this.speed=0,this.suspicion=0,this.path=[],this.finish(e);else{switch(this.sees(e,t),this.hears(t),this.state!==`catch`&&(this.suspicion>=n.catchAt?(this.state=`catch`,this.catchT=0,this.path=[],this.onCatchStart?.()):this.suspicion>=n.leanAt&&this.state!==`suspicious`?(this.state=`suspicious`,this.path=[]):this.state===`suspicious`&&this.suspicion<n.leanExit&&(this.lastSeen?this.startInvestigate(this.lastSeen.x,this.lastSeen.z,`investigate: last seen`):this.startPatrol())),this.state){case`patrol_walk`:case`investigate_walk`:case`check_walk`:{this.anim=`search_walk`;let t=this.state===`patrol_walk`?n.patrolSpeed:this.state===`investigate_walk`?n.investigateSpeed:n.checkSpeed;if(this.follow(e,t)){let e=this.state===`patrol_walk`?`patrol_look`:this.state===`investigate_walk`?`investigate_look`:`check_look`;this.startLook(e)}break}case`patrol_look`:case`investigate_look`:case`check_look`:{this.anim=`look_around`,this.speed+=(0-this.speed)*Math.min(1,e*8),this.lookT+=e;let r=Math.sin(this.lookT*1.1)*n.lookSweepAngle*Math.min(1,this.lookT/.6);this.yaw+=Uc(this.lookBase+r-this.yaw)*Math.min(1,e*5),this.lookT>=this.lookDur&&this.startPatrol(),this.cheatTick(t);break}case`suspicious`:{this.anim=`suspicious_lean`,this.speed+=(0-this.speed)*Math.min(1,e*10);let n=this.lastSeen??t.position;this.yaw+=Uc(Math.atan2(n.x-this.pos.x,n.z-this.pos.z)-this.yaw)*Math.min(1,e*8);break}case`catch`:{this.anim=`catch_lunge`,this.catchT+=e;let r=t.position.x-this.pos.x,i=t.position.z-this.pos.z,a=Math.hypot(r,i);if(this.yaw+=Uc(Math.atan2(r,i)-this.yaw)*Math.min(1,e*14),a>n.catchReach&&this.catchT<n.catchDashMax){let t=Math.min(n.catchDashSpeed*e,a-n.catchReach*.8);this.pos.x+=r/a*t,this.pos.z+=i/a*t,this.speed=n.catchDashSpeed}else this.speed=0;(a<=n.catchReach||this.catchT>=n.catchDashMax)&&this.catchT>.25&&(this.state=`caught`,this.caughtT=0,this.suspicion=1,this.onCaught?.());break}}this.finish(e)}}cheatTick(e){this.cheatTimer>=this.cfg.cheatInterval&&(this.state===`patrol_look`||this.state===`patrol_walk`)&&(this.cheatTimer=0,this.startCheck(e.position))}finish(e){this.group.position.set(this.pos.x,0,this.pos.z),this.group.rotation.y=this.yaw,this.masq.play(this.anim,.25),this.masq.animator.speed=this.anim===`search_walk`?Math.max(.6,Math.min(1.5,this.speed/2.4)):1,this.masq.update(e),this.applyFx(),this.debugOn&&this.drawDebug()}applyFx(){this.cone.mesh.visible=!this.blind&&!this.frustrated&&this.state!==`caught`,this.cone.setSuspicion(this.suspicion),this.indicator.set(this.suspicion),ga.setSuspicion(this.suspicion)}sees(e,t){let n=this.cfg,r=t.position.x-this.pos.x,i=t.position.z-this.pos.z,a=Math.hypot(r,i),o=a<=n.visionRange&&(a<.2||(Math.sin(this.yaw)*r+Math.cos(this.yaw)*i)/a>=Math.cos(Ot.degToRad(n.visionFovDeg/2)));if(this.losT+=e,o){if(this.losT>=1/n.losHz){this.losT=0;let e=n.sampleHeights[t.pose&&n.sampleHeights[t.pose]?t.pose:`stand`],r=0;for(let n of e)this.host.blocked(this.eye,this.tmp.set(t.position.x,t.position.y+n,t.position.z))||r++;this.visFrac=r/e.length}}else this.visFrac=0;let s=((100-Math.min(100,Math.max(0,t.camo)))/100)**n.exposurePower,c=Math.min(1,Math.max(n.minDistanceFactor,1-a/n.visionRange));a<n.nearRadius&&(c*=n.nearBoost);let l=o&&this.visFrac>0,u=l?n.rateMax*s*c*this.visFrac:0;this.sense={...this.sense,inCone:o,rate:u,exposure:s,distFactor:c,dist:a},l?(this.lastSeen=(this.lastSeen??new q).copy(t.position),this.suspicion+=(u-n.seenDecay)*e):this.suspicion-=n.lostDecay*e,this.suspicion=Math.min(1,Math.max(0,this.suspicion))}hears(e){let t=this.cfg,n=e.landed||e.speed>3.6?t.hearRunRadius:e.speed>.35?t.hearWalkRadius:0,r=Math.hypot(e.position.x-this.pos.x,e.position.z-this.pos.z);if(this.sense.heard=n&&r<=n?`${e.landed?`landing`:e.speed>3.6?`running`:`walking`} at ${r.toFixed(1)} m`:``,!n||r>n||this.noiseTimer>0||this.state===`suspicious`||this.state===`catch`||this.state===`caught`)return;let i=this.targetPoint;(this.state===`investigate_walk`||this.state===`investigate_look`)&&i&&Math.hypot(i.x-e.position.x,i.z-e.position.z)<t.noiseRetargetDistance||(this.noiseTimer=t.noiseCooldown,this.startInvestigate(e.position.x,e.position.z,`noise: ${this.sense.heard}`))}follow(e,t){let n=this.cfg;if(!this.path.length||this.pathIdx>=this.path.length)return!0;let r=this.path[this.pathIdx],i=r.x-this.pos.x,a=r.z-this.pos.z;if(Math.hypot(i,a)<(this.pathIdx===this.path.length-1?n.arriveRadius*.6:n.arriveRadius))return this.pathIdx++,this.pathIdx>=this.path.length;this.yaw+=Uc(Math.atan2(i,a)-this.yaw)*(1-Math.exp(-e*n.turnRate));let o=Math.max(.25,Math.cos(Uc(Math.atan2(i,a)-this.yaw)));this.speed+=(t*o-this.speed)*Math.min(1,e*6);let s={x:this.pos.x+Math.sin(this.yaw)*this.speed*e,z:this.pos.z+Math.cos(this.yaw)*this.speed*e};if(bo(s,n.radius-.05,this.host.colliders,-5),this.pos.x=s.x,this.pos.z=s.z,this.stuckT+=e,this.stuckT>1.5){if(Math.hypot(this.pos.x-this.stuckFrom.x,this.pos.z-this.stuckFrom.y)<.4){let e=this.targetPoint;if(!e||!this.goTo(e.x,e.z,this.targetLabel))return!0}this.stuckT=0,this.stuckFrom.set(this.pos.x,this.pos.z)}return!1}describe(e){let t=this.sense,n=this.targetPoint,r=`#`.repeat(Math.round(this.suspicion*20)).padEnd(20,`.`);return[`AI state   ${this.state}`,`target     ${this.targetLabel}${n?` (${n.x.toFixed(1)}, ${n.z.toFixed(1)}) ${Math.hypot(n.x-this.pos.x,n.z-this.pos.z).toFixed(1)} m away`:``}`,`suspicion  ${this.suspicion.toFixed(2)} [${r}]  lean@${this.cfg.leanAt} catch@${this.cfg.catchAt}`,`sight      ${t.inCone?`in cone`:`outside cone`}, d ${t.dist.toFixed(1)} m, line of sight ${(this.visFrac*100).toFixed(0)}%`,`rate       ${t.rate.toFixed(3)}/s = max ${this.cfg.rateMax} x exposure ${t.exposure.toFixed(3)} (camo ${e?e.camo.toFixed(0):`?`}) x dist ${t.distFactor.toFixed(2)} x vis ${this.visFrac.toFixed(2)}`,`hearing    ${t.heard||`nothing`}${this.noiseTimer>0?` (cooling down)`:``}`,`cheat      next peek in ${Math.max(0,this.cfg.cheatInterval-this.cheatTimer).toFixed(1)} s`].join(`
`)}drawDebug(){let e=[new q(this.pos.x,.2,this.pos.z)];for(let t=this.pathIdx;t<this.path.length&&e.length<24;t++)e.push(new q(this.path[t].x,.2,this.path[t].z));for(;e.length<24;)e.push(e[e.length-1].clone());this.line.geometry.setFromPoints(e)}},Gc=`#d8fd71`,Kc=(e,t)=>e.style.cssText=t,$=(e,t=``,n)=>{let r=document.createElement(e);return t&&(r.style.cssText=t),n!==void 0&&(r.textContent=n),r},qc=e=>`${Math.floor(e/60)}:${String(Math.round(e)%60).padStart(2,`0`)}`,Jc=`font:800 16px system-ui,sans-serif;min-height:48px;padding:0 22px;border:0;border-radius:999px;cursor:pointer;touch-action:manipulation;color:#1f2118;background:${Gc}`,Yc=`font:700 14px system-ui,sans-serif;min-height:44px;padding:0 18px;border:2px solid #fff9;border-radius:999px;cursor:pointer;touch-action:manipulation;color:#fff;background:#0006`,Xc=class{h;root=$(`div`,`position:fixed;inset:0;z-index:20;pointer-events:none;font-family:system-ui,sans-serif;color:#fff`);lobby=$(`div`,`position:absolute;inset:0;display:none;overflow:auto;pointer-events:none`);results=$(`div`,`position:absolute;inset:0;display:none;align-items:center;justify-content:center;background:#150c0acc;overflow:auto;pointer-events:auto`);pause=$(`div`,`position:absolute;inset:0;display:none;align-items:center;justify-content:center;background:#000a;pointer-events:auto`);card=$(`div`,`position:fixed;top:8px;left:8px;z-index:6;display:none;align-items:center;gap:10px;padding:6px 16px 6px 6px;border-radius:999px;background:#292a23e6;color:#fffefa;font-family:system-ui,sans-serif;pointer-events:none`);cardFace=$(`img`,`width:44px;height:44px;border-radius:50%;background:${Gc};object-fit:cover`);cardName=$(`b`,`display:block;font-size:15px`);cardAccount=$(`span`,`font-size:11px;opacity:.7`);constructor(e){this.h=e,this.root.append(this.lobby,this.results,this.pause),document.body.append(this.root);let t=$(`div`);t.append(this.cardName,this.cardAccount),this.card.append(this.cardFace,t),document.body.append(this.card),this.buildPause()}setCard(e){if(!e){this.card.style.display=`none`;return}let t=innerWidth<600;this.cardFace.style.width=this.cardFace.style.height=t?`34px`:`44px`,this.cardName.style.cssText=`display:block;font-size:${t?13:15}px;max-width:${t?84:180}px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`,this.card.style.padding=t?`4px 10px 4px 4px`:`6px 16px 6px 6px`,this.card.style.maxWidth=t?`160px`:`320px`,this.cardFace.src=e.face,this.cardName.textContent=e.name,this.cardAccount.textContent=e.account?`@${e.account}`:`Not signed in`,this.card.style.display=`flex`}showLobby(e,t,n,r){this.hideAll(),this.lobby.replaceChildren();let i=innerWidth<innerHeight?`46vh`:`20px`;Kc(this.lobby,`position:absolute;inset:0;display:flex;flex-wrap:wrap;align-content:flex-start;gap:16px;padding:${i} 20px 20px;overflow:auto;pointer-events:none`);let a=$(`div`,`pointer-events:auto;width:min(380px,100%);display:flex;flex-direction:column;gap:12px`);a.append($(`div`,`font:800 clamp(34px,6vw,52px)/1 system-ui;letter-spacing:1px;text-shadow:0 4px 18px #000`,`Boju Boju`),$(`div`,`font:600 16px system-ui;opacity:.92;text-shadow:0 2px 8px #000;margin-top:-6px`,`Hide from the masquerade`));let o=$(`div`,`display:flex;align-items:center;gap:12px;padding:10px 14px;background:#150c0acc;border-radius:16px`),s=$(`img`,`width:64px;height:64px;border-radius:50%;background:${Gc};object-fit:cover`);s.src=e.face,s.alt=``;let c=$(`div`);c.append($(`div`,`font:800 22px system-ui`,e.name),$(`div`,`font:12px system-ui;opacity:.75`,e.account?`@${e.account}`:e.signedIn?``:`Playing as a guest`)),o.append(s,c),a.append(o),a.append($(`div`,`padding:8px 14px;background:#150c0acc;border-radius:12px;font:600 14px system-ui`,t?`Your best run: ${t.rounds} round${t.rounds===1?``:`s`} · ${qc(t.hidden)} hidden · ${t.camo}% camo`:e.signedIn?`No run saved yet. Go on, hide!`:`Sign in to save your best run.`));let l=$(`button`,Jc+`;font-size:20px;min-height:56px`,`Play`);if(l.onclick=()=>this.h.play(),a.append(l),r&&!e.signedIn){let e=$(`button`,Yc,`Sign in to save your score`);e.onclick=()=>this.h.signIn(),a.append(e)}a.append(this.howToPlay()),this.lobby.append(a),n?.length&&this.lobby.append(this.boardPanel(`Top hiders`,n,e.id,`pointer-events:auto;width:min(420px,100%);align-self:flex-start;margin-left:auto`)),this.lobby.style.display=`flex`}hideLobby(){this.lobby.style.display=`none`}howToPlay(){let e=$(`div`,`background:#150c0acc;border-radius:16px;padding:12px 14px;font:13px/1.55 system-ui`),t=matchMedia(`(pointer: coarse)`).matches;e.append($(`div`,`font:800 15px system-ui;margin-bottom:6px`,`How to play`));let n=t?[`The masquerade counts with its eyes covered. Hide before the chant ends, then press Ready (or let the timer run out).`,`Drag anywhere to walk. Jump climbs low things; walking into a prop hops you up.`,`Eyedropper: tap it, then tap a surface within 4 m to copy its colour onto your clothes.`,`Zone switches between your top and your trousers. Palette picks a swatch.`,`Stiff, Crouch, Wall and Ball are poses: Wall presses you flat to the nearest wall.`,`Stay still and blended until the hourglass runs out. Moving breaks a pose and gives you away.`]:[`The masquerade counts with its eyes covered. Hide before the chant ends, then press Ready (Enter) or let the timer run out.`,`W A S D walk, Shift runs, Space jumps. Walking into a low prop hops you up onto it.`,`E turns the eyedropper on: click a surface within 4 m to copy its colour onto your clothes. Q switches top or trousers, P opens the palette.`,`1 Stiff, 2 Crouch, 3 Wall (presses you flat to the nearest wall), 4 Ball. Moving breaks a pose.`,`Stay still and blended until the hourglass runs out. Esc pauses.`];for(let t of n)e.append($(`div`,`margin:3px 0`,t));return e}boardPanel(e,t,n,r=``){let i=$(`div`,`background:#150c0acc;border-radius:16px;padding:12px 14px;${r}`);i.append($(`div`,`font:800 15px system-ui;margin-bottom:6px`,e));let a=$(`table`,`width:100%;border-collapse:collapse;font:13px system-ui`),o=$(`tr`,`opacity:.6;font-size:11px;text-align:right`);for(let[e,t]of[`#`,`Hider`,`Rounds`,`Hidden`,`Camo`].entries())o.append($(`td`,`padding:2px 6px;${e<2?`text-align:left`:``}`,t));a.append(o);for(let e of t.slice(0,10)){let t=$(`tr`,`text-align:right;${n!==null&&e.player_id===n?`background:${Gc};color:#1f2118;font-weight:800`:``}`);[String(e.rank),e.name,String(e.stats.rounds??e.score),qc(e.stats.hidden??0),`${e.stats.camo??0}%`].forEach((e,n)=>t.append($(`td`,`padding:3px 6px;${n<2?`text-align:left`:``}${n===1?`;max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`:``}`,e))),a.append(t)}return i.append(a),i}showResults(e,t,n,r,i,a){this.hideAll(),this.results.replaceChildren();let o=$(`div`,`display:flex;flex-wrap:wrap;gap:16px;justify-content:center;padding:20px;max-width:900px`),s=$(`div`,`background:#291410f2;border:1px solid #fff3;border-radius:20px;padding:20px 22px;width:min(420px,100%);display:flex;flex-direction:column;gap:10px`);s.append($(`div`,`font:800 34px system-ui;letter-spacing:1px`,`Run over`));let c=[[`Rounds survived`,String(e.rounds)],[`Time hidden`,qc(e.hiddenSeconds)],[`Best camo`,`${e.bestCamo}%`],[`Points`,String(e.points)]];for(let[e,t]of c){let n=$(`div`,`display:flex;justify-content:space-between;font:600 16px system-ui;padding:4px 0;border-bottom:1px solid #fff2`);n.append($(`span`,`opacity:.8`,e),$(`b`,``,t)),s.append(n)}s.append($(`div`,`font:italic 600 15px/1.45 system-ui;margin:6px 0`,`"${t}"`)),n&&s.append($(`div`,`font:700 13px system-ui;color:${Gc}`,n));let l=$(`div`,`display:flex;gap:10px;flex-wrap:wrap;margin-top:4px`),u=$(`button`,Jc,`Play again`);u.onclick=()=>this.h.again();let d=$(`button`,Yc,`Back to lobby`);if(d.onclick=()=>this.h.lobby(),l.append(u,d),a){let e=$(`button`,Yc,`Sign in to save`);e.onclick=()=>this.h.signIn(),l.append(e)}s.append(l),o.append(s),r?.length&&o.append(this.boardPanel(`Top hiders`,r,i,`width:min(420px,100%);align-self:flex-start`)),this.results.append(o),this.results.style.display=`flex`}buildPause(){let e=$(`div`,`background:#291410f2;border-radius:20px;padding:22px 26px;display:flex;flex-direction:column;gap:12px;align-items:center;min-width:240px`);e.append($(`div`,`font:800 32px system-ui;letter-spacing:2px`,`Paused`));let t=$(`button`,Jc,`Resume`);t.onclick=()=>this.h.resume();let n=$(`button`,Yc,`Quit run`);n.onclick=()=>this.h.quit(),e.append(t,n,$(`div`,`font:12px system-ui;opacity:.7`,`Esc resumes`)),this.pause.append(e)}showPause(e){this.pause.style.display=e?`flex`:`none`}get pausedVisible(){return this.pause.style.display!==`none`}hideAll(){this.lobby.style.display=`none`,this.results.style.display=`none`,this.pause.style.display=`none`}},Zc=!1,Qc={seekerStart:{x:13.2,z:0,yaw:-Math.PI/2},lobbyPos:{x:.5,z:.5},lobbyTurnRate:.55,lobbyCamera:{x:1.3,y:1.5,z:4.8,lookX:-.9,lookY:1},celebrateColors:[`#f4a300`,`#2fa59b`,`#d13b2e`,`#2a5db0`,`#e8dcb8`],hopInterval:.7};function $c(e){let t=document.createElement(`div`);return t.style.cssText=`position:fixed;z-index:6;font:13px/1.4 system-ui,sans-serif;color:#fff;text-shadow:0 1px 3px #000;${e}`,document.body.appendChild(t),t}async function el(e=at()){let t=new URLSearchParams(location.search),n=e=>Zc,r=matchMedia(`(pointer: coarse)`).matches;document.body.style.cssText=`margin:0;overflow:hidden;background:#d9b88f;overscroll-behavior:none`;let i=new ra({antialias:!r,powerPreference:`high-performance`});Ra(i),r&&i.setPixelRatio(Math.min(1.5,window.devicePixelRatio||1)),i.setSize(innerWidth,innerHeight),i.shadowMap.enabled=!0,i.shadowMap.type=1,document.body.appendChild(i.domElement);let a=$c(`inset:0;display:flex;align-items:center;justify-content:center;font-size:18px;z-index:30;background:#d9b88f`);a.textContent=`Loading the compound…`;let o=new C,[s,c]=await Promise.all([nc(),e.identity()]),l=c;o.add(s.group);let u=rc(o,r?1024:2048),d=Qc,f=s.spawn,m=new q(d.lobbyPos.x,.1,d.lobbyPos.z),h=e=>{let t=Ke(e.style);return t.group.traverse(e=>{e instanceof Pt&&(e.castShadow=!0)}),t},g=h(l);o.add(g.group);let _=f.clone(),v=new Pt(new Ze(.85,.95,.1,28),new p({color:`#4a2f1d`}));v.position.set(m.x,.05,m.z),v.receiveShadow=!0,v.castShadow=!0,o.add(v);let y=new Pc(innerWidth/innerHeight);y.snapTo(_);let b=new xo(i.domElement),x=new to(o),S=new dc(s.colliders);o.add(S.group);let w=null,T=new Oc({level:s,player:g,fx:x,camera:y.camera,scene:o,input:b,pos:_,touch:r||n(`buttons`),hunt:!1,eye:()=>w?.eye??null});w=new Wc({colliders:s.colliders,bounds:s.bounds,spots:s.hidingSpots.map(e=>({id:e.id,position:e.position,facing:e.facing})),blocked:(e,t)=>T.probe.blocked(e,t)},x,o),w.blind=!0,w.reset(d.seekerStart),n(`ai`)&&w.setDebug(!0),T.show(!1);let E=$c(`left:8px;bottom:8px;font:11px monospace;background:#0008;padding:4px 6px;border-radius:4px;display:none;pointer-events:none`),D=$c(`left:74px;top:214px;font:11px/1.45 monospace;background:#000b;padding:6px 8px;border-radius:6px;display:none;pointer-events:none;white-space:pre`);$c(`left:8px;top:250px;max-width:340px;max-height:calc(100% - 300px);overflow:auto;background:#000b;padding:8px 10px;border-radius:6px;font:11px/1.5 monospace;display:none`);let O=n(`stats`)||t.get(`perf`)===`1`;O&&(E.style.display=`block`),addEventListener(`resize`,()=>{i.setSize(innerWidth,innerHeight),y.setAspect(innerWidth/innerHeight),j===`lobby`&&de()});let k=Mc(),ee=Ac(),A={...Fc,prepSeconds:Fc.prepSeconds,huntSeconds:Fc.huntSeconds},j=`lobby`,M=!1,N=1,P=Lc(),te=0,F=0,ne=0,I=0,re=1,L=-1,R=!1,ie=0,ae=0,oe=0,z=null,se=null,ce=``,le={position:_,speed:0,landed:!1,camo:0,pose:null},ue=async()=>{z=await e.board(),se=await e.best()},B=new Xc({play:()=>void ge(),again:()=>void ge(),lobby:()=>pe(),resume:()=>Ce(!1),quit:()=>{Ce(!1),Se()},signIn:()=>{let t=e.signInUrl();t&&(location.href=t)}});function de(){B.showLobby(l,se,z,e.signInUrl()!==null&&!t.has(`guest`))}function fe(){g.setHuntMode(!1),T.resetPaint(l.style.primaryColor,l.style.secondaryColor),T.setPaletteTop(8)}function pe(){j=`lobby`,M=!1,ga.cancelChant(),ga.setSuspicion(0),ee.hide(),k.show(!1),k.banner(null),T.show(!1),B.setCard(null),fe(),Te.vx=Te.vz=Te.vy=0,_.copy(f),w&&(w.blind=!0,w.frustrated=!1,w.applyDifficulty(Ic(1)),w.reset(d.seekerStart)),v.visible=!0,ae=0,ue().then(()=>j===`lobby`&&de()),de()}let me=!1;function he(){me||(me=!0,ga.preload([`amb_market`,`amb_generator`,`sfx_rooster_01`,`sfx_paint`,`jingle_win`,`jingle_caught`]).then(()=>{ga.loop(`amb_market`,{volume:.22});let e=s.generator;ga.loop(`amb_generator`,{volume:1,spatial:{position:{x:e.x,y:e.y,z:e.z},refDistance:2.5,maxDistance:32,rolloff:1.7}});let t=()=>{ga.playOnce(`sfx_rooster_01`,{volume:.7,distant:{gain:.6}}),window.setTimeout(t,12e3+Math.random()*18e3)};window.setTimeout(t,5e3+Math.random()*6e3)}))}async function ge(){await ga.unlock(),he(),N=1,P=Lc(),ce=``,B.hideAll(),_e()}function _e(){j=`prep`,v.visible=!1,te=A.prepSeconds,L=-1,R=!1,re=1,k.banner(null),ee.hide(),Te.vx=Te.vz=Te.vy=0,_.copy(f),Ee=0,fe(),w&&(w.applyDifficulty(Ic(N,A)),w.frustrated=!1,w.blind=!0,w.reset(d.seekerStart)),B.setCard(null),k.show(!0),T.show(!0),y.snapTo(_),ga.startChant({timeoutMs:(A.prepSeconds+6)*1e3,onLine:(e,t)=>ee.sing(e,t),onPhase:e=>{e===`hunt`&&j===`prep`&&ye()}}).then(e=>{e!==`cancelled`&&j===`prep`&&L<0&&(L=0)})}function ve(e){j!==`prep`||L>=0||(e&&(P.points+=Math.floor(te)*A.readyBonusPerSecond),L=A.chantTimeoutSeconds,ga.unlocked&&ga.chantState!==`idle`?ga.chantReady():L=.5)}function ye(){j===`prep`&&(j=`hunt`,F=A.huntSeconds,L=-1,g.setHuntMode(!0),B.setCard(l),T.setPaletteTop(72),w&&(w.blind=!1,w.reset()))}function be(){j=`cleared`,ne=A.clearedSeconds,ie=0,P.rounds++,P.points+=A.clearPoints,k.banner(`ROUND ${N} CLEARED!`,`#1c7a3a55`),x.caughtBurst(new q(_.x,_.y+1.4,_.z),d.celebrateColors,90),ga.playOnce(`jingle_win`,{volume:.8}),ga.setSuspicion(0),w&&(w.frustrated=!0),T.clearPose()}function xe(){j===`hunt`&&(j=`dying`,I=A.slowMoSeconds,re=A.slowMoScale,R=!1,ga.unlock().then(async()=>{let e=await ga.playOnce(`caught`,{volume:.9});ee.sing(`caught`,e?.duration??.9)}))}function Se(){if(j===`results`)return;j=`results`,re=1,M=!1,ga.cancelChant(),ga.setSuspicion(0),ee.hide(),k.show(!1),k.banner(null),T.show(!1),B.setCard(null),fe(),P.hiddenSeconds=Math.round(P.hiddenSeconds),P.bestCamo=Math.round(P.bestCamo),P.points=Math.round(P.points);let t=zc(P);ga.playOnce(`jingle_caught`,{volume:.6}),(async()=>{let n=await e.submit(P);await ue(),ce=n.message,j===`results`&&B.showResults(P,t,ce,z,l.id,!l.signedIn&&e.signInUrl()!==null)})(),B.showResults(P,t,``,z,l.id,!l.signedIn&&e.signInUrl()!==null)}function Ce(e){e!==M&&(!e||j!==`lobby`&&j!==`results`)&&(M=e,B.showPause(e),e?(ga.setSuspicion(0),ga.suspend()):ga.resume())}async function we(){let t=await e.refresh();if(!t)return;let n=JSON.stringify(t.style)!==JSON.stringify(l.style)||t.id!==l.id||t.name!==l.name||t.signedIn!==l.signedIn||t.face!==l.face;l=t,n&&(o.remove(g.group),g.dispose(),g=h(l),o.add(g.group),T.setPlayer(g),g.play(`idle`,.01),V=`idle`,j===`lobby`?(ue().then(()=>j===`lobby`&&de()),de()):(j===`prep`||j===`hunt`)&&(fe(),j===`hunt`&&(g.setHuntMode(!0),B.setCard(l))))}addEventListener(`focus`,()=>void we()),addEventListener(`keydown`,e=>{if(e.code===`Enter`&&j===`prep`&&!M&&ve(!0),e.code===`Escape`){if(T.escUsed){T.escUsed=!1;return}(j===`prep`||j===`hunt`||j===`cleared`||j===`dying`)&&Ce(!M)}}),document.addEventListener(`visibilitychange`,()=>{document.hidden?Ce(!0):we()}),k.onReady=()=>ve(!0);let Te=new So(_),V=`idle`;g.play(`idle`,.01);let Ee=0,De=!0;w&&(w.onCatchStart=xe,w.onCaught=()=>{x.caughtBurst(new q(_.x,_.y+1.2,_.z)),R=!0});let Oe=()=>j===`prep`?`HIDE! THE MASQUERADE IS COUNTING`:j===`hunt`?`THE HUNT IS ON`:j===`cleared`?`ROUND CLEARED`:j===`dying`?`CAUGHT`:``;function ke(e){if(j===`lobby`||j===`results`)return j===`lobby`?(ae+=e*d.lobbyTurnRate,oe+=e,g.group.position.copy(m),g.group.rotation.y=ae,g.play(`idle`,.3),g.update(e)):(g.group.position.copy(_),g.group.rotation.y=Ee,g.update(e)),w&&w.update(e,{...le,camo:100,speed:0}),S.update(e,[]),{speed:0};let t=j===`dying`||j===`cleared`?{x:0,y:0,run:!1}:b.read();j===`cleared`&&(ie+=e,ie>=d.hopInterval&&(ie=0,t={...t,jump:!0})),Te.radius=T.pose===`wall_flat`?.2:oo;let n=Te.update(t,e,s.colliders,s.bounds),r=1-Math.exp(-e*16);n.heading!==null&&(Ee+=Math.atan2(Math.sin(n.heading-Ee),Math.cos(n.heading-Ee))*r);let i=!n.grounded,a=n.grounded&&!De;De=n.grounded;let o=n.speed>.35||i,c=T.update(e,{speed:o?Math.max(n.speed,i?io:0):0,yaw:Ee});c.yaw!==null&&(Ee+=Math.atan2(Math.sin(c.yaw-Ee),Math.cos(c.yaw-Ee))*r);let l=i?`jump`:n.speed>.35?n.speed>3.6?`run`:`walk`:c.state;return l!==V&&(V=l,g.play(V,V===`jump`?.08:.2)),g.animator.speed=V===`walk`?Math.min(1.35,Math.max(.5,n.speed/io)):V===`run`?Math.min(1.25,n.speed/ao):1,g.group.position.copy(_),g.group.rotation.y=Ee,g.update(e),w&&(le.speed=o?n.speed:0,le.landed=a,le.camo=T.camo.breakdown.total,le.pose=T.pose,w.update(e,le)),S.update(e,[{x:_.x,z:_.z,running:n.speed>3.6},...w?[{x:w.position.x,z:w.position.z,running:!1}]:[]]),j===`prep`?(te-=e,te<=0&&ve(!1),L>0?(L-=e,L<=0&&(ga.cancelChant(),ye())):L===0&&(ga.cancelChant(),ye())):j===`hunt`?(F-=e,P.hiddenSeconds+=e,P.points+=e*A.hiddenPointsPerSecond,P.bestCamo=Math.max(P.bestCamo,T.camo.breakdown.total),F<=0&&be()):j===`cleared`&&(ne-=e,ne<=0&&(N++,_e())),n}function H(e){if(M)return;let t=Math.min(.05,e);j===`dying`&&(I-=t,I<=0&&(re=1),I<=0&&R||I<-3)?Se():(ke(t*re),j!==`lobby`&&j!==`results`&&k.update({label:Oe(),seconds:j===`prep`?te:j===`hunt`?F:0,round:N,ready:j===`prep`&&L<0?{bonus:Math.floor(te)*A.readyBonusPerSecond}:null,hiders:1,caught:+(j===`dying`),points:Math.round(P.points)}))}a.remove(),pe(),l.source===`local guest`&&bt()&&(window.setTimeout(()=>void we(),3e3),window.setTimeout(()=>void we(),8e3));let Ae=performance.now(),U=0,W=0,G=0;i.setAnimationLoop(e=>{let t=Math.max(0,(e-Ae)/1e3);Ae=e,H(t);let n=M?0:Math.min(.05,t);if(w?.debug&&(D.textContent=w.describe(le)),D.style.display=w?.debug?`block`:`none`,x.update(n*re,y.camera,i),j===`lobby`){let e=d.lobbyCamera,t=innerWidth<innerHeight;y.camera.position.set(m.x+(t?.4:e.x)+Math.sin(oe*.25)*.25,t?1.4:e.y,m.z+(t?5.4:e.z)),y.camera.lookAt(m.x+(t?0:e.lookX),t?-.05:e.lookY,m.z),u.follow(m)}else if(j===`results`){let e=w?.position??_;y.camera.position.set(e.x-3.2,3.4,e.z+6.4),y.camera.lookAt(e.x,1.4,e.z),u.follow(e)}else y.update(n,_,Te.vx,Te.vz),y.fade(s.fadeGroups,_,n),u.follow(_),ga.setListener(_.x,1.2,_.z,0,0,-1);i.render(o,y.camera),U++,W+=t,W>=.5&&(G=U/W,U=W=0,O&&(E.textContent=`${G.toFixed(0)} fps · ${i.info.render.calls} draw calls (incl. shadow pass) · ${(i.info.render.triangles/1e3).toFixed(0)}k tris`))})}export{Qc as GAME_CONFIG,el as startGame};