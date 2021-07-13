(self.webpackChunkionic_docs=self.webpackChunkionic_docs||[]).push([[18019],{16239:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var a=n(22122),o=n(19756),r=n(86010),i=n(67294),l="docsButton_2Emz",s="docsButtonRound_3i9G";function c(e){var t,n=e.href,c=e.round,u=void 0!==c&&c,d=(0,o.Z)(e,["href","round"]);return d.className=(0,r.Z)(((t={})[d.className]=Boolean(d.className),t[l]=!0,t["docs-button"]=!0,t[s]=u,t["docs-button--round"]=u,t)),n?i.createElement("a",(0,a.Z)({href:n,className:"docsButton"},d),d.children):i.createElement("button",(0,a.Z)({className:"docsButton"},d),d.children)}},77708:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return d},metadata:function(){return m},toc:function(){return p},default:function(){return h}});var a=n(22122),o=n(19756),r=(n(67294),n(3905)),i=n(28312),l=n(16239),s=n(41395),c=n(58215),u=n(81840),d={title:"Call Number"},m={unversionedId:"native/plugins/call-number",id:"native/plugins/call-number",isDocsHomePage:!1,title:"Call Number",description:"Call a number directly from your Cordova/Ionic application.",source:"@site/docs/native/plugins/call-number.md",sourceDirName:"native/plugins",slug:"/native/plugins/call-number",permalink:"/docs/native/plugins/call-number",editUrl:"https://github.com/ionic-team/ionic-docs/edit/main/docs/native/plugins/call-number.md",version:"current",frontMatter:{title:"Call Number"},sidebar:"native",previous:{title:"Call Log",permalink:"/docs/native/plugins/call-log"},next:{title:"Camera Preview",permalink:"/docs/native/plugins/camera-preview"}},p=[{value:"Supported Platforms",id:"supported-platforms",children:[]},{value:"Usage",id:"usage",children:[{value:"React",id:"react",children:[]},{value:"Angular",id:"angular",children:[]}]}],v={toc:p};function h(e){var t=e.components,n=(0,o.Z)(e,["components"]);return(0,r.kt)("wrapper",(0,a.Z)({},v,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Call a number directly from your Cordova/Ionic application.\n",(0,r.kt)("strong",{parentName:"p"},"NOTE"),": The iOS Simulator (and maybe Android Simulators) do not provide access to the phone subsystem."),(0,r.kt)("p",null,(0,r.kt)("a",{href:"https://github.com/Rohfosho/CordovaCallNumberPlugin",target:"_blank",rel:"noopener",className:"git-link"},(0,r.kt)("svg",{viewBox:"0 0 512 512"},(0,r.kt)("path",{d:"M416 160c0-35.3-28.7-64-64-64s-64 28.7-64 64c0 23.7 12.9 44.3 32 55.4v8.6c0 19.9-7.8 33.7-25.3 44.9-15.4 9.8-38.1 17.1-67.5 21.5-14 2.1-25.7 6-35.2 10.7V151.4c19.1-11.1 32-31.7 32-55.4 0-35.3-28.7-64-64-64S96 60.7 96 96c0 23.7 12.9 44.3 32 55.4v209.2c-19.1 11.1-32 31.7-32 55.4 0 35.3 28.7 64 64 64s64-28.7 64-64c0-16.6-6.3-31.7-16.7-43.1 1.9-4.9 9.7-16.3 29.4-19.3 38.8-5.8 68.9-15.9 92.3-30.8 36-22.8 55-57 55-98.8v-8.6c19.1-11.1 32-31.7 32-55.4zM160 56c22.1 0 40 17.9 40 40s-17.9 40-40 40-40-17.9-40-40 17.9-40 40-40zm0 400c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm192-256c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"}))," https://github.com/Rohfosho/CordovaCallNumberPlugin")),(0,r.kt)("h2",null,"Stuck on a Cordova issue?"),(0,r.kt)(i.Z,{className:"cordova-ee-card",header:"Don't waste precious time on plugin issues.",href:"https://ionicframework.com/sales?product_of_interest=Ionic%20Native",mdxType:"DocsCard"},(0,r.kt)("div",null,(0,r.kt)("img",{src:"/docs/icons/native-cordova-bot.png",class:"cordova-ee-img"}),(0,r.kt)("p",null,"If you're building a serious project, you can't afford to spend hours troubleshooting. Ionic\u2019s experts offer premium advisory services for both community plugins and premier plugins."),(0,r.kt)(l.Z,{className:"native-ee-detail",mdxType:"DocsButton"},"Contact Us Today!"))),(0,r.kt)("h2",{id:"installation"},(0,r.kt)("a",{href:"#installation"},"Installation")),(0,r.kt)(s.Z,{defaultValue:"Capacitor",values:[{value:"Capacitor",label:"Capacitor"},{value:"Cordova",label:"Cordova"},{value:"Enterprise",label:"Enterprise"}],mdxType:"Tabs"},(0,r.kt)(c.Z,{value:"Capacitor",mdxType:"TabItem"},(0,r.kt)(u.Z,{className:"language-shell",mdxType:"CodeBlock"},"$ npm install call-number ","\n","$ npm install @ionic-native/call-number ","\n","$ ionic cap sync")),(0,r.kt)(c.Z,{value:"Cordova",mdxType:"TabItem"},(0,r.kt)(u.Z,{className:"language-shell",mdxType:"CodeBlock"},"$ ionic cordova plugin add call-number ","\n","$ npm install @ionic-native/call-number ","\n")),(0,r.kt)(c.Z,{value:"Enterprise",mdxType:"TabItem"},(0,r.kt)("blockquote",null,"Ionic Enterprise comes with fully supported and maintained plugins from the Ionic Team. \xa0",(0,r.kt)("a",{class:"btn",href:"https://ionic.io/docs/premier-plugins"},"Learn More")," or if you're interested in an enterprise version of this plugin ",(0,r.kt)("a",{class:"btn",href:"https://ionicframework.com/sales?product_of_interest=Ionic%20Enterprise%20Engine"},"Contact Us")))),(0,r.kt)("h2",{id:"supported-platforms"},"Supported Platforms"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Android"),(0,r.kt)("li",{parentName:"ul"},"iOS")),(0,r.kt)("h2",{id:"usage"},"Usage"),(0,r.kt)("h3",{id:"react"},"React"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/docs/native/community#react"},"Learn more about using Ionic Native components in React")),(0,r.kt)("h3",{id:"angular"},"Angular"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"import { CallNumber } from '@ionic-native/call-number/ngx';\n\nconstructor(private callNumber: CallNumber) { }\n\n...\n\n\nthis.callNumber.callNumber(\"18001010101\", true)\n  .then(res => console.log('Launched dialer!', res))\n  .catch(err => console.log('Error launching dialer', err));\n\n")))}h.isMDXComponent=!0}}]);