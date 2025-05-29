const pipelineData = [
  {
    id: 1,
    title: "Car Tracking Pipeline",
    input: {
      naturalLanguage: {
        text: "Film a tracking shot of the car from left to right, maintaining focus on the driver's side.",
        icon: "user",
      },
      rawVideo: {
        label: "Raw Video Input",
        asset: "/car/moving-car.svg",
        icon: "video",
      },
    },
    processing: [
      {
        label: "LLM Translation",
        color: "#3498db",
      },
      {
        label: "Object Detection",
        color: "#e74c3c",
      },
    ],
    intermediateOutput: {
      structuredCommands: {
        label: "Structured Commands",
        icon: "document",
        cinematographyPrompt: {
          initial: {
            cameraAngle: "eye",
            shotSize: "mediumShot",
            subjectView: "left",
            subjectFraming: "center",
          },
          movement: {
            type: "track",
            speed: "constant",
          },
          final: {
            subjectView: "right",
          },
        },
      },
      objectRecognition: {
        label: "Object Recognition",
        asset: "/car/detected-car.svg",
        icon: "image",
      },
    },
    finalProcessing: {
      label: "LensCraft Model",
      color: "#27ae60",
    },
    finalOutput: {
      label: "Final Output",
      asset: "/camera/follow.svg",
      caption:
        "Tracking Shot: Camera follows subject laterally while maintaining consistent distance",
      icon: "camera",
    },
  },
  {
    id: 2,
    title: "Dramatic Tilt Pipeline",
    input: {
      naturalLanguage: {
        text: "Start with a high angle view of the car and slowly tilt down to ground level, creating a dramatic reveal effect.",
        icon: "user",
      },
      rawVideo: {
        label: "Raw Video Input",
        asset: "/car/moving-car.svg",
        icon: "video",
      },
    },
    processing: [
      {
        label: "LLM Translation",
        color: "#3498db",
      },
      {
        label: "Object Detection",
        color: "#9b59b6",
      },
    ],
    intermediateOutput: {
      structuredCommands: {
        label: "Structured Commands",
        icon: "document",
        cinematographyPrompt: {
          initial: {
            cameraAngle: "high",
            shotSize: "fullShot",
            subjectView: "front",
            subjectFraming: "center",
          },
          movement: {
            type: "tiltDown",
            speed: "slowToFast",
          },
          final: {
            cameraAngle: "eye",
          },
        },
      },
      objectRecognition: {
        label: "Object Recognition",
        asset: "/car/detected-car.svg",
        icon: "image",
      },
    },
    finalProcessing: {
      label: "LensCraft Model",
      color: "#27ae60",
    },
    finalOutput: {
      label: "Final Output",
      asset: "/camera/tilt-down.svg",
      caption:
        "Tilt Down Shot: Camera rotates downward from high angle to eye level for dramatic effect",
      icon: "camera",
    },
  },
  {
    id: 3,
    title: "Dynamic Arc Pipeline",
    input: {
      naturalLanguage: {
        text: "Circle around the car in a smooth arc while keeping it centered in frame, showing all angles dynamically.",
        icon: "user",
      },
      rawVideo: {
        label: "Raw Video Input",
        asset: "/car/moving-car.svg",
        icon: "video",
      },
    },
    processing: [
      {
        label: "LLM Translation",
        color: "#3498db",
      },
      {
        label: "Object Detection",
        color: "#f39c12",
      },
    ],
    intermediateOutput: {
      structuredCommands: {
        label: "Structured Commands",
        icon: "document",
        cinematographyPrompt: {
          initial: {
            cameraAngle: "eye",
            shotSize: "mediumShot",
            subjectView: "left",
            subjectFraming: "center",
          },
          movement: {
            type: "arcRight",
            speed: "smoothStartStop",
          },
          final: {
            subjectView: "right",
          },
        },
      },
      objectRecognition: {
        label: "Object Recognition",
        asset: "/car/detected-car.svg",
        icon: "image",
      },
    },
    finalProcessing: {
      label: "LensCraft Model",
      color: "#27ae60",
    },
    finalOutput: {
      label: "Final Output",
      asset: "/camera/arc-shot.svg",
      caption:
        "Arc Shot: Camera moves in a circular path around the subject while maintaining focus",
      icon: "camera",
    },
  },
];

function getIconSVG(iconType) {
  const icons = {
    user: `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />`,
    video: `<polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />`,
    document: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10,9 9,9 8,9" />`,
    image: `<rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21,15 16,10 5,21" />`,
    camera: `<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />`,
  };
  return icons[iconType] || icons.document;
}

function createPipelineSlide(pipeline) {
  return `
    <div class="carousel-slide">
      <style>
        .cinematography-compact {
          width: 100%;
        }
        
        .command-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 12px;
          width: 100%;
        }
        
        .command-card {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 12px;
          border-left: 4px solid #ddd;
        }
        
        .command-card.initial {
          border-left-color: #3498db;
          grid-column: 1 / -1;
        }
        
        .command-card.movement {
          border-left-color: #e74c3c;
        }
        
        .command-card.final {
          border-left-color: #27ae60;
        }
        
        .card-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 8px;
          font-weight: 600;
          font-size: 13px;
          color: #2c3e50;
        }
        
        .card-header svg {
          opacity: 0.7;
        }
        
        .command-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        
        .badge {
          background: #fff;
          border: 1px solid #e1e8ed;
          border-radius: 16px;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 500;
          color: #5a6c7d;
          text-transform: capitalize;
          white-space: nowrap;
        }
        
        .badge.angle {
          background: #e3f2fd;
          border-color: #2196f3;
          color: #1565c0;
        }
        
        .badge.size {
          background: #f3e5f5;
          border-color: #9c27b0;
          color: #6a1b9a;
        }
        
        .badge.view {
          background: #e8f5e8;
          border-color: #4caf50;
          color: #2e7d32;
        }
        
        .badge.frame {
          background: #fff3e0;
          border-color: #ff9800;
          color: #ef6c00;
        }
        
        .badge.primary {
          background: #ffebee;
          border-color: #f44336;
          color: #c62828;
          font-weight: 600;
        }
        
        .badge.secondary {
          background: #fafafa;
          border-color: #9e9e9e;
          color: #424242;
        }
        
        .badge.change {
          background: #e8f5e8;
          border-color: #4caf50;
          color: #2e7d32;
          position: relative;
        }
        
        .badge.change::before {
          content: "→";
          margin-right: 4px;
          font-weight: bold;
        }
      </style>
      <div class="pipeline-flow">
        <div class="pipeline-header">
          <h3>${pipeline.title}</h3>
        </div>
        
        <div class="pipeline-row">
          <div class="input-container">
            <div class="icon-container">
              <div class="icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  ${getIconSVG(pipeline.input.naturalLanguage.icon)}
                </svg>
              </div>
              <span class="icon-label">Natural Language</span>
            </div>
            <div class="user-prompt">
              <p>"${pipeline.input.naturalLanguage.text}"</p>
            </div>
          </div>

          <div class="input-container">
            <div class="icon-container">
              <div class="icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  ${getIconSVG(pipeline.input.rawVideo.icon)}
                </svg>
              </div>
              <span class="icon-label">${pipeline.input.rawVideo.label}</span>
            </div>
            <div class="output-preview">
              <object data="${
                pipeline.input.rawVideo.asset
              }" type="image/svg+xml" style="width: 100%; height: 120px"></object>
            </div>
          </div>
        </div>

        <div class="pipeline-arrows">
          <div class="processing-flow">
            ${pipeline.processing
              .map(
                (process) => `
              <div class="arrow-container">
                <div class="process-label">${process.label}</div>
                <svg class="down-arrow" width="40" height="40" viewBox="0 0 40 40">
                  <path d="M20 5 L20 30 M10 25 L20 35 L30 25" stroke="${process.color}" stroke-width="3" fill="none" />
                </svg>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <div class="pipeline-row">
          <div class="output-container">
            <div class="icon-container">
              <div class="icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  ${getIconSVG(
                    pipeline.intermediateOutput.structuredCommands.icon
                  )}
                </svg>
              </div>
              <span class="icon-label">${
                pipeline.intermediateOutput.structuredCommands.label
              }</span>
            </div>
            <div class="cinematic-output">
              <div class="cinematography-compact">
                <div class="command-grid">
                  <div class="command-card initial">
                    <div class="card-header">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12,6 12,12 16,14"/>
                      </svg>
                      <span>Start</span>
                    </div>
                    <div class="command-badges">
                      <span class="badge angle">${
                        pipeline.intermediateOutput.structuredCommands
                          .cinematographyPrompt.initial.cameraAngle
                      }</span>
                      <span class="badge size">${
                        pipeline.intermediateOutput.structuredCommands
                          .cinematographyPrompt.initial.shotSize
                      }</span>
                      <span class="badge view">${
                        pipeline.intermediateOutput.structuredCommands
                          .cinematographyPrompt.initial.subjectView
                      }</span>
                      <span class="badge frame">${
                        pipeline.intermediateOutput.structuredCommands
                          .cinematographyPrompt.initial.subjectFraming
                      }</span>
                    </div>
                  </div>
                  
                  <div class="command-card movement">
                    <div class="card-header">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 15l-6-6-6 6"/>
                      </svg>
                      <span>Action</span>
                    </div>
                    <div class="command-badges">
                      <span class="badge primary">${
                        pipeline.intermediateOutput.structuredCommands
                          .cinematographyPrompt.movement.type
                      }</span>
                      <span class="badge secondary">${
                        pipeline.intermediateOutput.structuredCommands
                          .cinematographyPrompt.movement.speed
                      }</span>
                    </div>
                  </div>

                  
                  <div class="command-card final">
                    <div class="card-header">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 11l3 3 8-8"/>
                      </svg>
                      <span>End</span>
                    </div>
                    <div class="command-badges">
                      ${Object.entries(
                        pipeline.intermediateOutput.structuredCommands
                          .cinematographyPrompt.final
                      )
                        .map(
                          ([key, value]) =>
                            `<span class="badge change">${value}</span>`
                        )
                        .join("")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="output-container">
            <div class="icon-container">
              <div class="icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  ${getIconSVG(
                    pipeline.intermediateOutput.objectRecognition.icon
                  )}
                </svg>
              </div>
              <span class="icon-label">${
                pipeline.intermediateOutput.objectRecognition.label
              }</span>
            </div>
            <div class="output-preview">
              <object data="${
                pipeline.intermediateOutput.objectRecognition.asset
              }" type="image/svg+xml" style="width: 100%; height: 120px"></object>
            </div>
          </div>
        </div>

        <div class="pipeline-arrows">
          <div class="final-processing">
            <div class="process-label">${pipeline.finalProcessing.label}</div>
            <svg class="down-arrow" width="40" height="40" viewBox="0 0 40 40">
              <path d="M20 5 L20 30 M10 25 L20 35 L30 25" stroke="${
                pipeline.finalProcessing.color
              }" stroke-width="3" fill="none" />
            </svg>
          </div>
        </div>

        <div class="pipeline-row final-row">
          <div class="output-container">
            <div class="icon-container">
              <div class="icon-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  ${getIconSVG(pipeline.finalOutput.icon)}
                </svg>
              </div>
              <span class="icon-label">${pipeline.finalOutput.label}</span>
            </div>
            <div class="output-preview">
              <object data="${
                pipeline.finalOutput.asset
              }" type="image/svg+xml" style="width: 100%; height: 150px"></object>
            </div>
            <div class="output-caption">
              ${pipeline.finalOutput.caption}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
