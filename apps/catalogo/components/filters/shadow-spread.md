<filter id="drop-shadow">
    <feMorphology operator="dilate" radius="6" in="SourceAlpha" result="dilated"/>

    <feGaussianBlur stdDeviation="3" in="dilated" result="blurred"/>

    <feFlood flood-color="rgba(255,255,255,0.5)" in="blurred" result="flooded"/>

    <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
    </feMerge>
</filter>
