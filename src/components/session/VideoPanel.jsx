import React, { useState, useRef, useEffect } from 'react';
import { Camera, CameraOff, Sparkles, RefreshCw, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export function VideoPanel({
  title = 'Signer Video (Deaf Student)',
  isSigner = true,
  showLandmarks = true,
  onToggleLandmarks,
  currentGloss = 'HELLO',
  confidence = 94,
  className = ''
}) {
  const [cameraActive, setCameraActive] = useState(true);
  const [isMirrored, setIsMirrored] = useState(true);
  const canvasRef = useRef(null);

  // Landmark simulation animation on HTML5 Canvas
  useEffect(() => {
    if (!showLandmarks || !cameraActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let frameCount = 0;

    const renderLandmarks = () => {
      frameCount += 0.05;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Simulated Hand & Face Landmark Keypoints
      const centerX = width * 0.5 + Math.sin(frameCount * 0.8) * 15;
      const centerY = height * 0.42 + Math.cos(frameCount * 0.6) * 10;

      // Face Oval Points
      ctx.strokeStyle = 'rgba(72, 201, 176, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.fillStyle = '#48c9b0';

      const facePoints = [
        { x: centerX, y: centerY - 45 },
        { x: centerX - 25, y: centerY - 20 },
        { x: centerX + 25, y: centerY - 20 },
        { x: centerX - 28, y: centerY + 10 },
        { x: centerX + 28, y: centerY + 10 },
        { x: centerX, y: centerY + 35 }
      ];

      ctx.beginPath();
      facePoints.forEach((pt, i) => {
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();
      ctx.stroke();

      facePoints.forEach((pt) => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Left & Right Hand Joints
      const leftHandX = centerX - 60 + Math.sin(frameCount * 1.5) * 20;
      const leftHandY = centerY + 70 + Math.cos(frameCount * 1.8) * 15;

      const rightHandX = centerX + 60 + Math.cos(frameCount * 1.6) * 25;
      const rightHandY = centerY + 65 + Math.sin(frameCount * 1.4) * 20;

      // Draw hand skeletal connections
      const drawHand = (hx, hy, isRight) => {
        ctx.strokeStyle = isRight ? 'rgba(240, 139, 118, 0.8)' : 'rgba(123, 228, 149, 0.8)';
        ctx.fillStyle = isRight ? '#f08b76' : '#7be495';
        ctx.lineWidth = 2;

        const palm = { x: hx, y: hy };
        const fingers = [
          { x: hx - 14, y: hy - 25 },
          { x: hx - 7, y: hy - 35 },
          { x: hx, y: hy - 38 },
          { x: hx + 8, y: hy - 33 },
          { x: hx + 15, y: hy - 22 }
        ];

        fingers.forEach((f) => {
          ctx.beginPath();
          ctx.moveTo(palm.x, palm.y);
          ctx.lineTo(f.x, f.y);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(f.x, f.y, 3.5, 0, Math.PI * 2);
          ctx.fill();
        });

        // Palm center dot
        ctx.beginPath();
        ctx.arc(palm.x, palm.y, 4.5, 0, Math.PI * 2);
        ctx.fill();
      };

      drawHand(leftHandX, leftHandY, false);
      drawHand(rightHandX, rightHandY, true);

      animationFrameId = requestAnimationFrame(renderLandmarks);
    };

    renderLandmarks();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [showLandmarks, cameraActive]);

  return (
    <div
      className={`card-dark relative overflow-hidden flex flex-col ${className}`}
      style={{
        padding: 0,
        backgroundColor: '#122621',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        minHeight: '340px'
      }}
    >
      {/* Video Header Bar */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b border-subtle"
        style={{ backgroundColor: 'rgba(18, 38, 33, 0.85)', backdropFilter: 'blur(8px)', zIndex: 3 }}
      >
        <div className="flex items-center gap-2">
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: cameraActive ? 'var(--color-mint-400)' : 'var(--color-coral-500)',
              boxShadow: cameraActive ? '0 0 8px var(--color-mint-400)' : 'none'
            }}
          />
          <span className="text-sm font-semibold text-primary">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          {isSigner && (
            <Badge variant="mint" style={{ fontSize: '0.7rem' }}>
              <Sparkles size={12} className="mr-1" />
              MediaPipe Holistic (Client)
            </Badge>
          )}
          <Badge variant="forest" style={{ fontSize: '0.7rem' }}>
            30 FPS · 720p
          </Badge>
        </div>
      </div>

      {/* Main Video Viewport */}
      <div
        className="relative flex-1 flex items-center justify-center overflow-hidden"
        style={{ minHeight: '280px', background: 'radial-gradient(circle at center, #1b3830 0%, #10241f 100%)' }}
      >
        {cameraActive ? (
          <>
            {/* Visual Silhouette Avatar */}
            <div
              className="flex flex-col items-center justify-center opacity-85 select-none"
              style={{
                transform: isMirrored ? 'scaleX(-1)' : 'none',
                transition: 'transform var(--transition-normal)'
              }}
            >
              <div
                style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(72, 201, 176, 0.3), rgba(240, 139, 118, 0.25))',
                  border: '2px dashed var(--border-medium)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}
              >
                <span style={{ fontSize: '42px' }}>🤟</span>
              </div>
              <div className="text-xs text-muted" style={{ transform: isMirrored ? 'scaleX(-1)' : 'none' }}>
                ISL Webcam Stream Active
              </div>
            </div>

            {/* Simulated MediaPipe Canvas Overlay */}
            {showLandmarks && (
              <canvas
                ref={canvasRef}
                width={480}
                height={320}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  zIndex: 2,
                  transform: isMirrored ? 'scaleX(-1)' : 'none'
                }}
              />
            )}

            {/* Floating Live Landmark Detected Pill */}
            {isSigner && showLandmarks && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  zIndex: 4,
                  backgroundColor: 'rgba(16, 36, 31, 0.88)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--border-coral)',
                  borderRadius: 'var(--radius-full)',
                  padding: '6px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <div
                  className="pulse-bloom"
                  style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-coral-400)' }}
                />
                <span className="text-xs font-semibold text-primary">Live Gloss:</span>
                <span className="gloss-tag gloss-tag-coral">{currentGloss}</span>
                <span className="text-xs text-mint font-mono">({confidence}%)</span>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center gap-2">
            <CameraOff size={36} className="text-dim" />
            <p className="text-sm font-medium text-muted">Webcam feed paused</p>
          </div>
        )}
      </div>

      {/* Control Footer */}
      <div
        className="flex items-center justify-between px-4 py-3 border-t border-subtle"
        style={{ backgroundColor: 'rgba(18, 38, 33, 0.9)' }}
      >
        <div className="flex items-center gap-2">
          <Button
            variant={cameraActive ? 'ghost' : 'coral'}
            size="sm"
            icon={cameraActive ? <CameraOff size={15} /> : <Camera size={15} />}
            onClick={() => setCameraActive(!cameraActive)}
          >
            {cameraActive ? 'Mute Video' : 'Resume'}
          </Button>

          {isSigner && (
            <Button
              variant={showLandmarks ? 'mint' : 'outline'}
              size="sm"
              icon={showLandmarks ? <Eye size={15} /> : <EyeOff size={15} />}
              onClick={onToggleLandmarks}
            >
              {showLandmarks ? 'Landmarks ON' : 'Show Mesh'}
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon={<RefreshCw size={14} />}
            onClick={() => setIsMirrored(!isMirrored)}
            title="Mirror webcam feed"
          >
            Mirror
          </Button>
        </div>
      </div>
    </div>
  );
}
