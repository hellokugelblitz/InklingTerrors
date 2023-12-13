'use client'

import { FC, useState } from 'react'
import { useDraw } from '../hooks/useDraw'
import ColorPicker from '@/components/ColorPicker'

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [color, setColor] = useState<string>('#000')
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine)

  function getImageUrl(){
    const canvas = document.getElementById('painting') as HTMLCanvasElement | null;
    if (canvas) {
      const dataURL = canvas.toDataURL('image/png');
      console.log(dataURL); // Check the data URL in the console
  
      const downloadLink = document.createElement('a');
      downloadLink.href = dataURL;
      downloadLink.download = 'drawing.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }

  // FOR PNG
  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint
    const lineColor = color
    const lineWidth = 5

    let startPoint = prevPoint ?? currentPoint
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(currX, currY)
    ctx.stroke()

    ctx.fillStyle = lineColor
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
    ctx.fill()
  }

  return (
    <div className='w-screen h-screen bg-white flex justify-center items-center'>
      <div className='flex flex-col gap-5'>
        <canvas
          id='painting'
          ref={canvasRef}
          onMouseDown={onMouseDown}
          width={450}
          height={450}
          className='border border-black rounded-md'
        />

        {/* <ChromePicker color={color} onChange={(e: any) => setColor(e.hex)} /> */}
        {/* Color picker */}
        <ColorPicker setColor={setColor} colors={["red", "yellow", "orange", "green", "blue", "purple", "black"]} />

        <button type='button' className='p-2 rounded-md border border-black' onClick={clear}>
          Clear canvas
        </button>

        <button type='button' className='p-2 rounded-md border border-black' onClick={getImageUrl}>
          Export Drawing
        </button>
      </div>

    </div>
  )
}

export default page