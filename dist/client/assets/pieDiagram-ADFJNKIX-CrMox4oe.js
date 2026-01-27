import{Y as S,a1 as z,aB as j,g as q,s as H,a as Y,b as Z,q as J,p as K,_ as u,l as F,c as Q,D as X,H as tt,N as et,e as at,y as rt,E as nt}from"./mermaid.core-Cogbpw4p.js";import{p as it}from"./chunk-4BX2VUAB-DxpvjZdq.js";import{p as ot}from"./treemap-KMMF4GRG-vVWnAvK4.js";import{d as I}from"./arc-ch2S0jzW.js";import{o as st}from"./ordinal-Cboi1Yqb.js";import"./main-BmsFRsaK.js";import"./purify.es-HRjpPm7y.js";import"./mermaid-VLURNSYL-BlonqQZz.js";import"./ai-prompt-input-DzbMbHio.js";import"./button-DJ-Cxum1.js";import"./tooltip-DeX6-8qH.js";import"./scroll-area-YKy8vm1B.js";import"./input-group-uuLhmziD.js";import"./input-CDNHPQYg.js";import"./x-BXoxoqTj.js";import"./proxy-DrepNqOW.js";import"./badge-DJJw0nsz.js";import"./min-BUXs-Tht.js";import"./_baseUniq-CDh_LgzU.js";import"./init-Gi6I4Gst.js";function lt(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function ct(t){return t}function pt(){var t=ct,a=lt,f=null,y=S(0),o=S(z),l=S(0);function s(e){var n,c=(e=j(e)).length,d,x,h=0,p=new Array(c),i=new Array(c),v=+y.apply(this,arguments),w=Math.min(z,Math.max(-z,o.apply(this,arguments)-v)),m,C=Math.min(Math.abs(w)/c,l.apply(this,arguments)),$=C*(w<0?-1:1),g;for(n=0;n<c;++n)(g=i[p[n]=n]=+t(e[n],n,e))>0&&(h+=g);for(a!=null?p.sort(function(A,D){return a(i[A],i[D])}):f!=null&&p.sort(function(A,D){return f(e[A],e[D])}),n=0,x=h?(w-c*$)/h:0;n<c;++n,v=m)d=p[n],g=i[d],m=v+(g>0?g*x:0)+$,i[d]={data:e[d],index:n,value:g,startAngle:v,endAngle:m,padAngle:C};return i}return s.value=function(e){return arguments.length?(t=typeof e=="function"?e:S(+e),s):t},s.sortValues=function(e){return arguments.length?(a=e,f=null,s):a},s.sort=function(e){return arguments.length?(f=e,a=null,s):f},s.startAngle=function(e){return arguments.length?(y=typeof e=="function"?e:S(+e),s):y},s.endAngle=function(e){return arguments.length?(o=typeof e=="function"?e:S(+e),s):o},s.padAngle=function(e){return arguments.length?(l=typeof e=="function"?e:S(+e),s):l},s}var ut=nt.pie,N={sections:new Map,showData:!1},T=N.sections,G=N.showData,dt=structuredClone(ut),gt=u(()=>structuredClone(dt),"getConfig"),ft=u(()=>{T=new Map,G=N.showData,rt()},"clear"),mt=u(({label:t,value:a})=>{if(a<0)throw new Error(`"${t}" has invalid value: ${a}. Negative values are not allowed in pie charts. All slice values must be >= 0.`);T.has(t)||(T.set(t,a),F.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),ht=u(()=>T,"getSections"),vt=u(t=>{G=t},"setShowData"),St=u(()=>G,"getShowData"),L={getConfig:gt,clear:ft,setDiagramTitle:K,getDiagramTitle:J,setAccTitle:Z,getAccTitle:Y,setAccDescription:H,getAccDescription:q,addSection:mt,getSections:ht,setShowData:vt,getShowData:St},yt=u((t,a)=>{it(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),xt={parse:u(async t=>{const a=await ot("pie",t);F.debug(a),yt(a,L)},"parse")},wt=u(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),At=wt,Dt=u(t=>{const a=[...t.values()].reduce((o,l)=>o+l,0),f=[...t.entries()].map(([o,l])=>({label:o,value:l})).filter(o=>o.value/a*100>=1).sort((o,l)=>l.value-o.value);return pt().value(o=>o.value)(f)},"createPieArcs"),Ct=u((t,a,f,y)=>{F.debug(`rendering pie chart
`+t);const o=y.db,l=Q(),s=X(o.getConfig(),l.pie),e=40,n=18,c=4,d=450,x=d,h=tt(a),p=h.append("g");p.attr("transform","translate("+x/2+","+d/2+")");const{themeVariables:i}=l;let[v]=et(i.pieOuterStrokeWidth);v??=2;const w=s.textPosition,m=Math.min(x,d)/2-e,C=I().innerRadius(0).outerRadius(m),$=I().innerRadius(m*w).outerRadius(m*w);p.append("circle").attr("cx",0).attr("cy",0).attr("r",m+v/2).attr("class","pieOuterCircle");const g=o.getSections(),A=Dt(g),D=[i.pie1,i.pie2,i.pie3,i.pie4,i.pie5,i.pie6,i.pie7,i.pie8,i.pie9,i.pie10,i.pie11,i.pie12];let E=0;g.forEach(r=>{E+=r});const W=A.filter(r=>(r.data.value/E*100).toFixed(0)!=="0"),b=st(D);p.selectAll("mySlices").data(W).enter().append("path").attr("d",C).attr("fill",r=>b(r.data.label)).attr("class","pieCircle"),p.selectAll("mySlices").data(W).enter().append("text").text(r=>(r.data.value/E*100).toFixed(0)+"%").attr("transform",r=>"translate("+$.centroid(r)+")").style("text-anchor","middle").attr("class","slice"),p.append("text").text(o.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const O=[...g.entries()].map(([r,M])=>({label:r,value:M})),k=p.selectAll(".legend").data(O).enter().append("g").attr("class","legend").attr("transform",(r,M)=>{const R=n+c,B=R*O.length/2,V=12*n,U=M*R-B;return"translate("+V+","+U+")"});k.append("rect").attr("width",n).attr("height",n).style("fill",r=>b(r.label)).style("stroke",r=>b(r.label)),k.append("text").attr("x",n+c).attr("y",n-c).text(r=>o.getShowData()?`${r.label} [${r.value}]`:r.label);const _=Math.max(...k.selectAll("text").nodes().map(r=>r?.getBoundingClientRect().width??0)),P=x+e+n+c+_;h.attr("viewBox",`0 0 ${P} ${d}`),at(h,d,P,s.useMaxWidth)},"draw"),$t={draw:Ct},qt={parser:xt,db:L,renderer:$t,styles:At};export{qt as diagram};
