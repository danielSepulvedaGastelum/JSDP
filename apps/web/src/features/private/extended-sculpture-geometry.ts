export interface SculptureOptions{referenceWidth:number;referenceHeight:number;hostHeight:number;menuWidth?:number;sideTop?:number;sideLeft?:number;photoFraction?:number;alignTop?:boolean;theme?:string;skyEnd?:number;anchor?:string;targetCenterX?:number}
// Registration maps former source pixels into the newly supplied photo. Files remain untouched.
export const PHOTO_REGISTRATION={
  "light": {
    "mse": 212.35374125374838,
    "scale": 0.9268,
    "translateX": 3.5999999999999996,
    "translateY": 3.3999999999999995,
    "old": [
      971,
      1619
    ],
    "new": [
      1064,
      1478
    ],
    "landmark": "old statue crop 290,640 to 885,1390",
    "method": "read-only affine registration, Pillow bilinear MSE"
  },
  "dark": {
    "mse": 132.08175067828074,
    "scale": 0.91544,
    "translateX": -1.84,
    "translateY": -1,
    "old": [
      971,
      1619
    ],
    "new": [
      1064,
      1478
    ],
    "landmark": "old statue crop 290,640 to 885,1390",
    "method": "read-only affine registration, Pillow bilinear MSE"
  }
};
// Subject bounds exclude the appended wall and the wider pedestal.
export const STATUE_SOURCE_BOUNDS={left:290,right:905};
export const STATUE_ANCHORS={base:565,face:484};
export function extendedSculptureGeometry({referenceWidth,referenceHeight,hostHeight,menuWidth=referenceWidth*1.15,sideTop=0,sideLeft=0,photoFraction=.54,alignTop=false,theme='light',skyEnd=.22,anchor='base',targetCenterX}:SculptureOptions){
 const originalWidth=971,originalHeight=1619,photoHeight=referenceHeight*photoFraction;
 const originalScale=Math.max(referenceWidth/originalWidth,photoHeight/originalHeight);
 const anchorX=STATUE_ANCHORS[anchor==='face'?'face':'base'];
 const targetCenter=targetCenterX??sideLeft+menuWidth/2;
 const originalX=targetCenter-sideLeft-anchorX*originalScale;
 const originalY=alignTop?0:photoHeight-originalHeight*originalScale;
 const registration=PHOTO_REGISTRATION[theme==='dark'?'dark':'light'];
 const scale=originalScale/registration.scale;
 const left=sideLeft+originalX-registration.translateX*scale;
 const imageTop=originalY-registration.translateY*scale;
 const top=sideTop+referenceHeight-photoHeight,height=hostHeight-top;
 const imageWidth=registration.new[0]*scale,imageHeight=registration.new[1]*scale;
 // Only the pedestal below the woman and eagle extends vertically to the browser floor.
 const floorTop=Math.max(0,originalY+1415*originalScale);
 const floorHeight=Math.max(0,height-floorTop);
 const originalFloorHeight=Math.max(1,imageTop+imageHeight-floorTop);
 const floorBackgroundHeight=imageHeight*floorHeight/originalFloorHeight;
 const fadeStart=sideLeft+originalX+905*originalScale,fadeEnd=left+imageWidth;
 const skyFade=Math.max(0,originalY+636*originalScale);
 const skyMask=theme==='dark'?
  'linear-gradient(to bottom,transparent 0px,#0003 '+(photoHeight*.06)+'px,#0009 '+(photoHeight*.13)+'px,#000 '+(photoHeight*skyEnd)+'px,#000 100%)':
  'linear-gradient(to bottom,transparent 0px,#000 '+skyFade+'px,#000 100%)';
 return{top,height,left,imageTop,imageWidth,imageHeight,floorTop,floorHeight,floorBackgroundHeight,fadeStart,fadeEnd,skyFade,skyMask,originalScale,originalX,originalY,scale,anchorX,targetCenter};
}
