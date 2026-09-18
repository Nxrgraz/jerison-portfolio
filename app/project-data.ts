export type ProjectSection = {
  title: string;
  summary: string;
  bullets: string[];
};

export type ProjectDownload = {
  name: string;
  format: string;
  size: string;
  path: string;
  description: string;
};

export type Project = {
  slug: string;
  title: string;
  type: string;
  status: string;
  role: string;
  period: string;
  summary: string;
  overview: string;
  problem: string;
  engineering: ProjectSection[];
  validation: ProjectSection[];
  stack: string[];
  metrics: {value: string; label: string}[];
  downloads: ProjectDownload[];
  source: string;
  highlights?: string[];
  video?: {id:string; title:string};
  repository?: string;
};

export const projects: Project[] = [
  {
    slug: 'drone-pursuit',
    title: 'Autonomous Drone Pursuit',
    type: 'NSERC RESEARCH',
    status: 'TESTED / ONBOARD DEPLOYMENT IN PROGRESS',
    role: 'NSERC Undergraduate Student Researcher — University of Alberta',
    period: 'May 2026–present · Supervisor: Prof. Martin Barczyk',
    video: {id:'P0rEn2qfZdM', title:'Autonomous Drone Tracking'},
    highlights: [
      'Raised sustained perception throughput from approximately 9 to 30 FPS with a modular ROS 2 pipeline and C++ / CUDA inference.',
      'Generated a 428-image, eight-keypoint training dataset from Vicon geometry, compensating for approximately 110 ms of video latency.',
      'Validated autonomous 3D following, settling and target reacquisition in controlled flight. Final Phase 60 testing recorded 93.6% target freshness and approximately 8 px median vertical image error.'
    ],
    summary: 'A single end-to-end research system for vision-based drone detection, 3D estimation, predictive pursuit control and real-flight validation.',
    overview: 'A camera-equipped pursuer detects another drone, estimates its relative three-dimensional position and generates motion commands to follow it in real time. My work spanned the complete robotics stack: perception, ROS 2, C++ optimization, cameras, MPC, simulation, Vicon validation and controlled flight testing.',
    problem: 'Continuously perceive and pursue a moving drone without allowing inference latency, communication mismatches, noisy geometry, control overshoot or physical hardware faults to break the autonomy loop.',
    engineering: [
      {
        title: 'FPV platform and flight-hardware integration',
        summary: 'Prepared the research platform for future onboard autonomy through propulsion, power and telemetry diagnostics.',
        bullets: [
          'Used ArduPilot, MAVProxy and MAVLink for controlled motor tests with propellers removed, comparing baseline, active-test and shutdown telemetry.',
          'Examined yaw, yaw rate and arm/disarm state to distinguish propulsion faults from sensor drift, vibration and flight-controller configuration.',
          'Checked LiPo balance connections, charger configuration, polarity and individual-cell monitoring during power-system troubleshooting.',
          'This hardware work supports the NSERC drone-tracking system. Jetson deployment and full onboard integration remain in progress.'
        ]
      },
      {
        title: 'Automated labels from motion capture',
        summary: 'Projected known 3D drone geometry into camera images to train an eight-keypoint YOLO pose model.',
        bullets: [
          'Created 428 camera-specific images: approximately 388 training and 40 validation images, split by capture session to reduce leakage.',
          'Calibrated camera intrinsics and mounting geometry, then checked projected keypoints with visual QA overlays.',
          'Matched frames to historical Vicon poses to compensate for approximately 110 ms of effective FPV video latency; fine-tuned the model on an RTX 3090.'
        ]
      },
      {
        title: 'Measured dynamics and predictive braking',
        summary: 'Used physical flight response to design axis-specific MPC and stopping behavior.',
        bullets: [
          'Identified lateral input delay of approximately 0.32 s and a 2.48 s time constant; vertical delay was approximately 0.12 s with a 0.34 s time constant.',
          'Combined relative vision estimates with pursuer telemetry to distinguish target motion from the pursuing drone’s own movement.',
          'Used closing velocity, measured delay and estimated braking acceleration to anticipate stopping distance.',
          'Developed asynchronous MPC solving and stale-data supervision; later development reduced effective state age to approximately 29 ms.'
        ]
      },
      {
        title: 'ROS 2 perception architecture',
        summary: 'Separated expensive perception tasks so one slow component could not block the full system.',
        bullets: [
          'Worked across four Python/C++ ROS 2 components for YOLO keypoints, 3D position estimation and controller-facing publishers/subscribers.',
          'Built and maintained CMakeLists.txt, package.xml, custom messages, include/library linking, executable targets, launch files, topic remapping and QoS settings.',
          'Moved performance-sensitive work from Python toward C++ and raised sustained tracking throughput from roughly 9 FPS to 30 FPS.'
        ]
      },
      {
        title: 'C++ computer vision and neural inference',
        summary: 'Integrated real-time vision directly into ROS 2 rather than treating inference as a separate demo.',
        bullets: [
          'Developed C++ nodes using OpenCV, cv_bridge, ROS image messages and custom KpYolo/PnPDataYolo interfaces.',
          'Worked directly with YOLO ONNX tensors, bounding boxes, keypoints and the target-position message consumed by the controller.',
          'Investigated OpenCV DNN parser limitations, then used ONNX Runtime and CUDA while diagnosing unexpected CPU fallback.',
          'Improved optimized neural inference from about 15 FPS to around 30 FPS.'
        ]
      },
      {
        title: 'Camera and sensor integration',
        summary: 'Made the perception pipeline work across laboratory, webcam and aircraft-mounted image sources.',
        bullets: [
          'Configured Intel RealSense D425 streams and traced a 30 FPS limitation to a USB 2.x connection; USB 3 restored 640×480 at 30 FPS.',
          'Investigated RealSense T265 driver/device-recognition problems and used a Logitech C920 to isolate vision issues from drone hardware.',
          'Integrated the Parrot ANAFI camera stream through /anafi/frames and evaluated resolution-versus-frame-rate tradeoffs.'
        ]
      },
      {
        title: '3D target-position estimation',
        summary: 'Converted image-space detections into geometry the flight controller could use.',
        bullets: [
          'Connected detected YOLO keypoints to relative X, Y and Z/depth estimates plus a target-validity state.',
          'Worked on a C++ position-estimation path linking the custom keypoint message to the controller-facing target-position message.',
          'Treated detection as only the first stage of a perception-to-control system, not the final result.'
        ]
      },
      {
        title: 'ROS 2 communication debugging',
        summary: 'Resolved failures caused by middleware configuration rather than algorithms.',
        bullets: [
          'Traced inconsistent downstream data delivery to incompatible ROS 2 reliability policies.',
          'Applied SensorDataQoS-style behaviour to high-rate camera/perception streams where fresh measurements mattered more than delivery of old frames.',
          'Used topic inspection and component isolation to separate node-level correctness from system-level communication faults.'
        ]
      },
      {
        title: 'Model Predictive Control',
        summary: 'Evolved pursuit from stop-and-chase behaviour toward motion-aware tracking.',
        bullets: [
          'Studied and modified a CasADi-based 3D MPC controller for X/Y/Z target position and pursuer commands.',
          'Added target-motion estimation, pursuer/target velocity, velocity matching, predictive braking and latency awareness.',
          'Diagnosed overshoot, oscillation, chase–brake cycling, vertical bobbing, lateral sway, stationary-target drift and loss of detection.',
          'Improved tracking so the pursuer moved with the target instead of repeatedly braking at the target’s previous position.'
        ]
      },
      {
        title: 'Parrot Sphinx and Gazebo simulation',
        summary: 'Used simulation as an integration environment while diagnosing failures across several software layers.',
        bullets: [
          'Worked with Parrot Sphinx, Gazebo 11, Olympe, simulated ANAFI models, camera streams and PCMD control.',
          'Debugged Olympe/native library installation, libpdraw, virtual networking, drone IP access, firmware services and zero-valued commands.',
          'Investigated missing Unreal components, target models falling through the scene and ANAFI/Bebop platform differences.',
          'Published alternative simulated camera streams into ROS 2 when the normal video path was unavailable.'
        ]
      },
      {
        title: 'Physical aircraft debugging',
        summary: 'Separated autonomy faults from aircraft, camera, motor and SDK problems.',
        bullets: [
          'Investigated yaw drift, unstable behaviour, unreliable camera hardware, suspected motor issues and differences between aircraft units.',
          'Compared command and telemetry behaviour across Parrot platforms before changing controller code.',
          'Learned to debug software, sensors, networking, physical hardware and control algorithms as one coupled system.'
        ]
      }
    ],
    validation: [
      {
        title: 'Controlled real-world flight testing',
        summary: 'Moved from isolated components and simulation to supervised tests in a controlled/netted environment.',
        bullets: [
          'Recorded keypoints, target estimates, reference states, MPC outputs, PCMD commands, ANAFI telemetry and controller-debug topics in ROS bags.',
          'Used recorded internal state—not only visual observation—to distinguish perception, control and hardware failures.',
          'Maintained manual takeover during controlled physical experiments.'
        ]
      },
      {
        title: 'Vicon ground-truth workflow',
        summary: 'Compared vision estimates against an independent motion-capture measurement.',
        bullets: [
          'Configured the Vicon ROS 2 receiver and corrected a subject-naming issue that prevented expected pose updates.',
          'Synchronized ROS bags, Vicon pose, target-position estimates, telemetry and controller logs.',
          'Built a repeatable workflow for validating the algorithm instead of relying on whether flight merely looked correct.'
        ]
      },
      {
        title: 'Measured results',
        summary: 'The optimized system reached useful real-time throughput and produced quantitative flight-test evidence.',
        bullets: [
          'Perception throughput increased from approximately 9 FPS to 30 FPS.',
          'One recorded test showed about 8 px median vertical tracking error, 93.6% detection freshness and zero incorrect target associations.',
          'Stationary and moving targets were tracked more smoothly after motion-aware MPC changes.'
        ]
      },
      {
        title: 'Current development',
        summary: 'The research system was developed and experimentally tested; onboard deployment is the next integration step.',
        bullets: [
          'The optimized tracking stack has not yet been deployed to the NVIDIA Jetson-based onboard computing platform.',
          'The FPV platform and Jetson integration remain active work and are not represented as complete.'
        ]
      }
    ],
    stack: ['ROS 2 Jazzy','C++','Python','YOLO','OpenCV','ONNX Runtime','CUDA','CasADi','MPC','Intel RealSense','Parrot ANAFI','Vicon','ROS bags','Gazebo','Parrot Sphinx','Olympe','Linux'],
    metrics: [{value:'9→30',label:'PIPELINE FPS'},{value:'8 PX',label:'MEDIAN VERTICAL ERROR'},{value:'93.6%',label:'DETECTION FRESHNESS'}],
    downloads: [],
    source: 'Research source and experiment data are private. A public technical summary is provided here.'
  },
  {
    slug: 'pan-tilt',
    title: 'Predictive Face-Tracking Camera',
    type: 'INDEPENDENT ROBOTICS',
    status: 'COMPLETED',
    role: 'Designer and developer — independent project',
    period: 'Completed system · latest CAD export Rev M',
    summary: 'A physical two-axis camera that follows an enrolled face using custom YOLO inference and delay-aware predictive control.',
    overview: 'I designed, printed and assembled a robotic camera, trained a detector for one enrolled face, and built the C++ perception and predictive control loop that drives its Arduino-controlled servos.',
    video: {id:'-N-iI8u7ksU', title:'Webcam Tracker Demo'},
    repository: 'https://github.com/Nxrgraz/Webcam-Tracker',
    highlights: [
      'Trained a custom YOLO model with PyTorch / Ultralytics and deployed ONNX inference directly in C++ with OpenCV DNN.',
      'Built independent pan and tilt MPC controllers at approximately 20 Hz with a 10-step, 0.5-second prediction horizon.',
      'Integrated delay compensation, target-motion estimation, stationary hold and acceleration limits with a SolidWorks-designed, 3D-printed mechanism.'
    ],
    problem: 'Convert a laptop-based detector into a dependable physical robot where vision, embedded control, electronics and mechanics operate together with low enough latency to track a person.',
    engineering: [
      {
        title: 'YOLO detection in C++',
        summary: 'Implemented the inference path directly with OpenCV DNN and an ONNX model.',
        bullets: [
          'Built webcam capture, preprocessing, input-blob creation, forward inference, confidence filtering, box reconstruction, NMS, target selection and visualization.',
          'Trained a custom enrolled-face detector; decoded ONNX outputs and mapped letterboxed detections back to the original camera frame.',
          'Used the target centre as the measured state for the physical feedback loop.'
        ]
      },
      {
        title: 'Delay-aware predictive control',
        summary: 'Replaced reactive PID tracking with lightweight MPC implemented directly in C++.',
        bullets: [
          'Evaluated candidate angular velocities over 10 steps at approximately 20 Hz, penalizing tracking error, control effort, command changes and terminal error.',
          'Used independent first-order servo models and delayed-command queues. Model parameters are starting estimates, not experimentally identified dynamics.',
          'Estimated target motion after compensating for camera-induced image movement; used hysteresis and stationary hold to reduce hunting.',
          'Limited velocity to approximately 18°/s and acceleration to 45°/s²; handled target loss, manual control and smooth recentering.'
        ]
      },
      {
        title: 'Arduino and servo electronics',
        summary: 'Built a compact embedded command path for two SG90 actuators.',
        bullets: [
          'Used an Arduino Uno, two SG90 servos, external 5 V servo power and a shared electrical ground.',
          'Parsed compact pan,tilt commands at 115200 baud.',
          'Assigned pan to D9, tilt to D10 and used an initial neutral pose near 90° / 90°.',
          'Reduced unnecessary serial timeout latency.'
        ]
      },
      {
        title: 'C++ to Arduino integration',
        summary: 'Automated commands from the tracking application instead of using manual input.',
        bullets: [
          'Integrated a C++ serial library and synchronized command generation with the microcontroller parser.',
          'Debugged incorrect/changing COM ports, upload failures caused by an occupied port, timeouts and message formatting.',
          'Joined desktop software, firmware, electronics and mechanical motion into one working system.'
        ]
      },
      {
        title: 'SolidWorks and fabrication',
        summary: 'Designed the mechanism around real servo, camera, wiring and printing constraints.',
        bullets: [
          'Created the base, servo holders, pan mechanism, tilt arms, camera support, wiring clearances and mounting features.',
          'Iterated wall thickness, rigidity, camera weight, fastener access, assembly order, interference and achievable tilt angle.',
          'Prepared the design for additive manufacturing, then 3D printed and assembled the final mechanism.'
        ]
      }
    ],
    validation: [
      {
        title: 'Completed system results',
        summary: 'The finished robot closes the loop from machine learning to physical motion.',
        bullets: [
          'Built a working real-time ML camera-tracking robot.',
          'Implemented raw ONNX decoding, image-error control, UART communication and dual-servo firmware.',
          'Completed the SolidWorks assembly, printed the mechanism and integrated the complete system independently.'
        ]
      },
      {
        title: 'Integration lessons',
        summary: 'The project demonstrated that every layer must be reliable for a robot to work.',
        bullets: [
          'Debugged camera, C++ software, firmware, serial communication, electronics and mechanical fit.',
          'Connected machine learning → computer vision → software → communication → embedded control → fabrication → motion.'
        ]
      }
    ],
    stack: ['C++','MPC','OpenCV DNN','YOLO','PyTorch','ONNX','Arduino Uno','Embedded C++','UART','2× SG90','SolidWorks','3D Printing'],
    metrics: [{value:'20 HZ',label:'CONTROL LOOP'},{value:'0.5 S',label:'PREDICTION HORIZON'},{value:'2',label:'CONTROL AXES'}],
    downloads: [
      {name:'Pan–Tilt Full Assembly',format:'STEP',size:'1.73 MB',path:'/cad-assemblies/pan-tilt-revm-full-assembly.step',description:'Rev M assembly including the visual camera and servo references.'},
      {name:'Pan–Tilt Printable Assembly',format:'STEP',size:'1.21 MB',path:'/cad-assemblies/pan-tilt-revm-printable-assembly.step',description:'Rev M printable mechanism assembled without loose reference parts.'}
    ],
    source: 'Demo and complete CAD assemblies are available here. Quantitative MPC-versus-PID performance comparison and measured servo identification remain future work.'
  },
  {
    slug: 'steady-spoon',
    title: 'Tremor-Stabilizing Spoon',
    type: 'ASSISTIVE MECHATRONICS',
    status: 'IN PROGRESS / IMU INTEGRATION',
    highlights: [
      'Developed a two-axis SolidWorks mechanism around handheld weight, actuator geometry, moving clearances and electronics packaging.',
      'Validated STM32 firmware flashing and GPIO operation; MPU6050 integration over I2C is underway.',
      'Sensor fusion, closed-loop stabilization and measured tremor reduction remain under development.'
    ],
    role: 'Designer and developer — independent assistive-device project',
    period: 'Prototype development · latest CAD export V3.9',
    summary: 'A compact assistive eating device intended to reduce how much hand tremor reaches the utensil.',
    overview: 'I am developing a two-axis spoon stabilizer combining a custom mechanical assembly, STM32 firmware, MPU6050 inertial sensing and servo actuation. The goal is to counter unwanted hand rotation while keeping the device lightweight and comfortable. Full stabilization has not yet been demonstrated.',
    problem: 'Stabilize a spoon without creating a device that is too heavy, bulky, uncomfortable, difficult to assemble or unsafe for everyday use.',
    engineering: [
      {
        title: 'STM32 firmware and inertial sensing',
        summary: 'Validated the embedded toolchain and began integrating the sensor path.',
        bullets: [
          'Successfully built, flashed and ran STM32 firmware; verified GPIO operation with simple hardware tests.',
          'Began MPU6050 wiring and I2C peripheral integration before attempting sensor fusion.',
          'Next steps are reliable continuous sensor reads, bias calibration, filtering, two-axis servo control and controlled stabilization tests.'
        ]
      },
      {
        title: 'Human-centred design priorities',
        summary: 'Optimized for practical use rather than maximum autonomous performance.',
        bullets: [
          'Balanced user comfort, low weight, compact packaging, stability, safe motion and ease of assembly.',
          'Treated the mechanism as a product that must be held and used, not a collection of isolated parts.',
          'Kept manufacturability and everyday practicality central to design decisions.'
        ]
      },
      {
        title: 'Mechanical architecture',
        summary: 'Developed the complete geometry and internal packaging in SolidWorks.',
        bullets: [
          'Designed the spoon interface, stabilizing mechanism, structural load paths and ergonomic handle packaging.',
          'Managed component placement, internal volume, stiffness, moving clearances and assembly access.',
          'Reserved practical space for electronics and serviceability while maintaining a handheld form.'
        ]
      },
      {
        title: 'Design for additive manufacturing',
        summary: 'Iterated the mechanism as a manufacturable prototype.',
        bullets: [
          'Considered print orientation, wall thickness, support requirements, strength and tolerances.',
          'Checked component fit, assembly sequence and ways to reduce unnecessary material.',
          'Prepared low-cost prototype geometry with enough mechanical stability for validation.'
        ]
      }
    ],
    validation: [
      {
        title: 'Current status',
        summary: 'CAD, STM32 flashing and GPIO are established; IMU communication and feedback control are the next milestones.',
        bullets: [
          'The device remains an in-progress assistive prototype until final integration and validation are finished.',
          'Architecture and performance claims are intentionally conservative until controlled testing is complete.',
          'A custom PCB is planned to consolidate the electronics after the mechanism is validated.'
        ]
      },
      {
        title: 'Why the project matters',
        summary: 'It extends my robotics work from autonomy into direct everyday usability.',
        bullets: [
          'The design asks not only whether the mechanism works, but whether a person could comfortably use it every day.',
          'It combines mechanical packaging, prototyping, human factors and future embedded control in one product-scale problem.'
        ]
      }
    ],
    stack: ['STM32','MPU6050','I2C','Embedded Firmware','SolidWorks','3D Printing','Servo Control','PCB Planned'],
    metrics: [{value:'2',label:'STABILIZATION AXES'},{value:'STM32',label:'CONTROL PLATFORM'},{value:'IMU',label:'INTEGRATION STAGE'}],
    downloads: [
      {name:'SteadyHand Packaging Assembly',format:'STEP',size:'5.11 MB',path:'/cad-assemblies/steadyhand-v3-9-packaging-assembly.step',description:'V3.9 complete packaging assembly for component placement and envelope review.'},
      {name:'SteadyHand Mechanical Audit Assembly',format:'STEP',size:'4.97 MB',path:'/cad-assemblies/steadyhand-v3-9-mechanical-audit-assembly.step',description:'V3.9 complete mechanism assembly for fit and clearance inspection.'}
    ],
    source: 'The latest complete assembly exports are public. Individual printable parts are intentionally not published here.'
  },
  {
    slug: 'traffic-glasses',
    title: 'Traffic-Light Glasses',
    type: 'FUTURE CONCEPT',
    status: 'NOT BUILT YET',
    role: 'Early-stage personal concept',
    period: 'Future work',
    summary: 'An unbuilt wearable idea connecting signal timing, distance and speed to useful feedback.',
    overview: 'This remains a future concept—not a completed prototype. The idea is to combine countdown recognition, movement context, embedded timing and wearable feedback.',
    problem: 'Recognizing a number is not enough; a future device would need to relate remaining time to distance, speed and a safe, understandable decision.',
    engineering: [
      {
        title: 'Concept direction',
        summary: 'A possible edge-vision and wearable-computing project.',
        bullets: [
          'Explore traffic-light/countdown recognition as an edge-vision task.',
          'Compare movement speed and distance with remaining signal time.',
          'Investigate audio or heads-up feedback and RTOS task separation.'
        ]
      }
    ],
    validation: [
      {
        title: 'Build status',
        summary: 'No prototype exists yet.',
        bullets: ['No hardware, code, PCB or validated system has been built.','All technologies shown for this project are planned rather than implemented.']
      }
    ],
    stack: ['Planned: Edge CV','Planned: RTOS','Planned: Wearables','Planned: Sensor Fusion','Planned: Embedded Feedback'],
    metrics: [{value:'0',label:'BUILT PROTOTYPES'},{value:'IDEA',label:'CURRENT STAGE'},{value:'FUTURE',label:'BUILD STATUS'}],
    downloads: [],
    source: 'Concept only—no hardware, code or repository exists yet.'
  }
];

export const getProject = (slug: string) => projects.find(project => project.slug === slug);
