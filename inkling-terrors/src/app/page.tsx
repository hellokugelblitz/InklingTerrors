'use client'

import { FC, useState } from 'react'
import { useDraw } from '../hooks/useDraw'
import ColorPicker from '@/components/ColorPicker'
import { getStorage, listAll, ref, uploadBytes } from "firebase/storage";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [color, setColor] = useState<string>('#000')
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine)

  function uploadImage() {
    const canvas = document.getElementById('painting') as HTMLCanvasElement | null;
    if (canvas) {
      // Convert data URL to Blob
      canvas.toBlob(async (blob) => {
        if (blob) {
          // Create a root reference
          const storage = getStorage();

          //listRef is for the number of files
          const listRef = ref(storage, 'images');
          const actualList = await listAll(listRef);

          // Specify the file path and name
          const filePath = 'images/' + (actualList.items.length + 1) + '.png';

          // Create a reference to the file
          const fileRef = ref(storage, filePath);

          // Upload the Blob to Firebase Storage
          await uploadBytes(fileRef, blob);

          console.log('Image uploaded successfully!');
        }
      }, 'image/png');
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

        <button type='button' className='p-2 rounded-md border border-black' onClick={uploadImage}>
          Export Drawing
        </button>
      </div>

    </div>
  )
}

export default page