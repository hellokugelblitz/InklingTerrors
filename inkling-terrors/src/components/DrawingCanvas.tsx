'use client'// components/DrawingCanvas.tsx''

import React, { useRef, useEffect } from 'react';
import { Stage, Layer, Line } from 'react-konva';

const DrawingCanvas: React.FC = () => {
  const layerRef = useRef<any>(null); // Ref for accessing the Konva layer
  const isDrawing = useRef<boolean>(false);
  const lines = useRef<any[]>([]); // Store drawn lines

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    lines.current.push({
      tool: 'pen',
      points: [pos.x, pos.y],
    });
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) {
      return;
    }

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines.current[lines.current.length - 1];

    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // Update the layer
    layerRef.current.batchDraw();
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  useEffect(() => {
    if (!layerRef.current) return;

    const layer = layerRef.current;

    layer.on('mousedown', handleMouseDown);
    layer.on('mousemove', handleMouseMove);
    layer.on('mouseup', handleMouseUp);

    return () => {
      layer.off('mousedown', handleMouseDown);
      layer.off('mousemove', handleMouseMove);
      layer.off('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer ref={layerRef}>
        {lines.current.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke="black"
            strokeWidth={5}
            tension={0.5}
            lineCap="round"
            globalCompositeOperation={
              line.tool === 'eraser' ? 'destination-out' : 'source-over'
            }
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default DrawingCanvas;
