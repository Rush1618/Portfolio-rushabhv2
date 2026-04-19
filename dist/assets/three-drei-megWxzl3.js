import{a as x,r as e}from"./ui-vendor-BwDqsHYE.js";import{g as A,M as _,h as C,i as R,c as z,j as F,k}from"./three-core-CSYpcuuC.js";import{u as w}from"./three-fiber-CVMm10J-.js";var E={},S=x;E.createRoot=S.createRoot,E.hydrateRoot=S.hydrateRoot;const $="modulepreload",L=function(s){return"/"+s},b={},q=function(u,t,m){let f=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),a=i?.nonce||i?.getAttribute("nonce");f=Promise.allSettled(t.map(r=>{if(r=L(r),r in b)return;b[r]=!0;const o=r.endsWith(".css"),v=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${v}`))return;const n=document.createElement("link");if(n.rel=o?"stylesheet":$,o||(n.as="script"),n.crossOrigin="",n.href=r,a&&n.setAttribute("nonce",a),document.head.appendChild(n),o)return new Promise((d,c)=>{n.addEventListener("load",d),n.addEventListener("error",()=>c(new Error(`Unable to preload CSS for ${r}`)))})}))}function l(i){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=i,window.dispatchEvent(a),!a.defaultPrevented)throw i}return f.then(i=>{for(const a of i||[])a.status==="rejected"&&l(a.reason);return u().catch(l)})},U=()=>parseInt(A.replace(/\D+/g,"")),j=U(),B=e.forwardRef(({children:s,enabled:u=!0,speed:t=1,rotationIntensity:m=1,floatIntensity:f=1,floatingRange:l=[-.1,.1],autoInvalidate:i=!1,...a},r)=>{const o=e.useRef(null);e.useImperativeHandle(r,()=>o.current,[]);const v=e.useRef(Math.random()*1e4);return w(n=>{var d,c;if(!u||t===0)return;i&&n.invalidate();const p=v.current+n.clock.elapsedTime;o.current.rotation.x=Math.cos(p/4*t)/8*m,o.current.rotation.y=Math.sin(p/4*t)/8*m,o.current.rotation.z=Math.sin(p/4*t)/20*m;let h=Math.sin(p/4*t)/10;h=_.mapLinear(h,-.1,.1,(d=l?.[0])!==null&&d!==void 0?d:-.1,(c=l?.[1])!==null&&c!==void 0?c:.1),o.current.position.y=h*f,o.current.updateMatrix()}),e.createElement("group",a,e.createElement("group",{ref:o,matrixAutoUpdate:!1},s))});class N extends k{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`,fragmentShader:`
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${j>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const T=s=>new z().setFromSpherical(new F(s,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),H=e.forwardRef(({radius:s=100,depth:u=50,count:t=5e3,saturation:m=0,factor:f=4,fade:l=!1,speed:i=1},a)=>{const r=e.useRef(),[o,v,n]=e.useMemo(()=>{const c=[],p=[],h=Array.from({length:t},()=>(.5+.5*Math.random())*f),g=new C;let M=s+u;const P=u/t;for(let y=0;y<t;y++)M-=P*Math.random(),c.push(...T(M).toArray()),g.setHSL(y/t,m,.9),p.push(g.r,g.g,g.b);return[new Float32Array(c),new Float32Array(p),new Float32Array(h)]},[t,u,f,s,m]);w(c=>r.current&&(r.current.uniforms.time.value=c.clock.elapsedTime*i));const[d]=e.useState(()=>new N);return e.createElement("points",{ref:a},e.createElement("bufferGeometry",null,e.createElement("bufferAttribute",{attach:"attributes-position",args:[o,3]}),e.createElement("bufferAttribute",{attach:"attributes-color",args:[v,3]}),e.createElement("bufferAttribute",{attach:"attributes-size",args:[n,1]})),e.createElement("primitive",{ref:r,object:d,attach:"material",blending:R,"uniforms-fade-value":l,depthWrite:!1,transparent:!0,vertexColors:!0}))});export{B as F,H as S,q as _,E as c};
