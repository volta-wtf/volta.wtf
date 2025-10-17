# https://codepen.io/mullany/pen/xxPOoX

<filter id="f1" x="-20%" y="-20%" width="160%" height="160%">
    <feGaussianBlur in="SourceAlpha" result="blurOut" stdDeviation="8"/>
    <feOffset in="blurOut" result="dropBlur" dx="0" dy="0"/>

  <feComponentTransfer in="dropBlur" result="dropBlur2">
    <feFuncA id="alphaFunc" type="gamma" amplitude="2" exponent="1.5" offset="0"/>
  </feComponentTransfer>

    <feComposite operator="over" in="SourceGraphic" in2="dropBlur2"/>
</filter>